import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Image } from "../entities/Image";
import { Note } from "../entities/Note";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../type";
import { isEmpty } from "../utils/validation";
import { FieldError } from "./responseShape";
@InputType()
class NoteInput {
  @Field()
  title: string;

  @Field()
  text: string;

  @Field()
  isPublic: boolean;
}

@ObjectType()
class NoteResponse {
  @Field(() => Note, { nullable: true })
  note?: Note;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
class PaginatedNotes {
  @Field(() => [Note])
  notes: Note[];

  @Field()
  hasMore: boolean;
}

@Resolver(Note)
export class NoteResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() note: Note) {
    return note.text.replace(/<[^>]+>/g, "").slice(0, 500);
  }

  @FieldResolver(() => Boolean)
  canEdit(@Root() note: Note, @Ctx() { req }: MyContext) {
    if (req.session.userId === note.creatorId) return true;
    return false;
  }

  @Query(() => PaginatedNotes)
  // @UseMiddleware(isAuth)
  async notes(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedNotes> {
    const creatorId = req.session.userId;
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    // #2
    // kenapa pake query builder karena mungkin kekompleksan meningkat
    // const qb = getConnection()
    //   .getRepository(Note)
    //   .createQueryBuilder("n")
    //   // .innerJoinAndSelect("n.creator", "u", 'u.id = n."creatorId"')
    //   .orderBy('n."createdAt"', "DESC")
    //   .take(realLimitPlusOne);
    // if (cursor) {
    //   qb.where(`n."createdAt" < :cursor`, {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }
    // const notes = await qb.getMany();

    const values: any[] = [realLimitPlusOne];

    if (cursor) {
      values.push(new Date(parseInt(cursor)));
    }

    const notes = await getConnection().query(
      `
    select n.*,
    json_build_object(
      'id', u.id,
      'username',u.username,
      'email', u.email
      ) creator
    from note n
    inner join public.user u on u.id = n."creatorId" 
    where n."isPublic" = true 
    ${(cursor && ` and n."createdAt" < $2`) || ""}
    ${
      (creatorId &&
        ` or n."creatorId" = ${creatorId}  ${
          (cursor && ` and n."createdAt" < $2`) || ""
        }`) ||
      ""
    }
   
    order by n."createdAt" DESC
    limit $1
    `,
      values
    );

    return {
      notes: notes.slice(0, realLimit),
      hasMore: notes.length === realLimitPlusOne,
    };
    // return Note.find();
  }

  @Query(() => Note, { nullable: true })
  async note(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Note | undefined> {
    try {
      const creatorId = req.session.userId;
      // let note = await Note.findOne(id);
      // if (note) {
      //   const images = await Image.find({ where: { noteId: id } });
      //   if (images.length > 0) {
      //     note.images = images;
      //   }
      // }

      // const note = await Note.findOne(id);
      // const qbNote = getConnection()
      //   .getRepository(Note)
      //   .createQueryBuilder("n")
      //   .select(`"n".*`)
      //   .addSelect(
      //     (subQuery) =>
      //       subQuery
      //         .select("i.*", "images")
      //         .from(Image, "i")
      //         .where(`i."noteId" = :noteId`, {
      //           noteId: "n.id",
      //         }),
      //     "images"
      //   )
      //   .from(Image, "i")
      //   .where(`n."id" = 200`);

      // 1 QUERY
      const [note] = await getConnection().query(
        `
        SELECT
          n.*,
          case when i."noteId" is null then null else json_agg(
            json_build_object(
              'filename', i.filename, 'filepath',
              i.filepath, 'ocr', i.ocr, 'event',
              i."event"
            )
          ) end AS "images"
        FROM
          public."note" n
          left join public.image i on i."noteId" = n.id
        WHERE
          n."id" = $1
        GROUP BY
          n.id,
          i."noteId"
      `,
        [id]
      );

      if (note?.creatorId === creatorId) {
        return note;
      } else if (note?.isPublic) {
        // note.images = null;
        return note;
      }
      return undefined;
    } catch (error) {
      console.log({ error });
      return undefined;
    }
  }

  @Mutation(() => NoteResponse)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg("input") input: NoteInput,
    @Ctx() { req }: MyContext
  ): Promise<NoteResponse> {
    let errors: FieldError[] = [];
    const empty = isEmpty(input);
    if (empty.length > 0) {
      empty.map((value) => {
        errors.push({ field: value, message: `${value} is required` });
      });
      return { errors };
    }

    const note = await Note.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
    console.log(note);
    return { note };
  }

  @Mutation(() => NoteResponse)
  @UseMiddleware(isAuth)
  async updateNote(
    @Arg("input") input: NoteInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<NoteResponse | null> {
    const find = await Note.findOne(id);
    if (!find) return null;
    let errors: FieldError[] = [];
    const empty = isEmpty(input);
    if (empty.length > 0) {
      empty.map((value) => {
        errors.push({ field: value, message: `${value} is required` });
      });
      return { errors };
    }
    // const note = await Note.update({ id }, { ...input });
    const result = await getConnection()
      .createQueryBuilder()
      .update(Note)
      .set({ ...input })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    const note = result.raw[0];
    return { note };
  }

  @Mutation(() => Boolean)
  async deleteNote(@Arg("id") id: number): Promise<boolean> {
    try {
      await Note.delete(id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
