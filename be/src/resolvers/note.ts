import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  Field,
  InputType,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Note } from "../entities/Note";
import { MyContext } from "../type";
import { isAuth } from "../middleware/isAuth";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
class NoteInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver()
export class NoteResolver {
  @Query(() => [Note])
  notes(): Promise<Note[]> {
    return Note.find(Note);
  }
  @Query(() => Note, { nullable: true })
  note(@Arg("id", () => Int) id: number): Promise<Note | undefined> {
    return Note.findOne(id);
  }

  @Mutation(() => Note)
  @UseMiddleware(isAuth)
  async createNote(
    @Arg("input") input: NoteInput,
    @Arg("isPublic", { nullable: true }) isPublic: boolean,
    @Ctx() { req }: MyContext
  ): Promise<Note> {
    const note = Note.create({
      ...input,
      creatorId: req.session.userId,
      isPublic,
    }).save();
    return note;
  }

  /**
   * TODO
   */
  // @Mutation()
  // @UseMiddleware(isAuth)
  // async pasteImage(
  //   @Arg("file", () => GraphQLUpload)
  //   { createReadStream, filename }: FileUpload
  // ) {}

  @Mutation(() => Note)
  async updateNote(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Note | null> {
    const note = await Note.findOne(id);
    if (!note) return null;
    if (typeof title !== "undefined") {
      await Note.update({ id }, { title });
    }
    return note;
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
