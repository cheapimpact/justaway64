import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Mutation,
  UseMiddleware,
  Arg,
  Int,
  Ctx,
  Resolver,
  ObjectType,
  Field,
  Query,
} from "type-graphql";
import { Image } from "../entities/Image";
import { Note } from "../entities/Note";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../type";
import { doOCR } from "../utils/ocr";
import { gcsBucket, bucketName } from "../utils/storageGCS";

@ObjectType()
class UploadImageResponse {
  @Field(() => Image, { nullable: true })
  image?: Image;

  @Field({ nullable: true })
  error?: string;
}

@Resolver()
export class ImageResolver {
  @Mutation(() => UploadImageResponse)
  // @UseMiddleware(isAuth)
  async UploadImage(
    @Arg("file", () => GraphQLUpload)
    { filename, mimetype, createReadStream }: FileUpload,
    @Arg("noteId", () => Int) noteId: number,
    @Arg("event", { nullable: true }) event: string,
    @Ctx() { req }: MyContext
  ): Promise<UploadImageResponse> {
    const userId = req.session.userId;
    let filepath, ocr;
    await new Promise(async (resolve, reject) => {
      const stream = createReadStream();
      const timestamp = Math.round(new Date().getTime() / 1000); // unix timestamp
      const folderName = "note-images";
      const newFileName = `${userId}-${noteId}-${timestamp}-${filename}`;
      const newFile = `${folderName}/${newFileName}`;
      const _buf = Array<any>();
      let _bufferImage: Buffer;
      stream
        .on("data", (chunk) => _buf.push(chunk))
        .on("end", () => (_bufferImage = Buffer.concat(_buf)))
        .pipe(
          gcsBucket().file(newFile).createWriteStream({
            resumable: false,
            gzip: true,
            public: true,
          })
        )
        .on("finish", async () => {
          console.log("finish");
          const encodedImage = Buffer.from(_bufferImage).toString("base64");
          filepath = `https://storage.googleapis.com/${bucketName}/${newFile}`;
          console.log({ filepath });

          ocr = (await doOCR(encodedImage, mimetype)) as JSON;
          // console.log({ ocr });
          resolve({ filepath, ocr });
          // console.log(JSON.stringify(ocr, null, 2));
        })
        .on("error", (err) => {
          console.log({ err });
          // this need to be refactored
          reject(err.message);
        });
    });
    const image = await Image.create({
      filepath,
      ocr,
      noteId,
      event,
      filename,
    }).save();
    return { image };
  }

  @Query(() => [Image])
  @UseMiddleware(isAuth)
  async images(
    @Arg("noteId", () => Int) noteId: number,
    @Ctx() { req }: MyContext
  ): Promise<Image[]> {
    const creatorId = req.session.userId;
    const note = await Note.findOne({ id: noteId });
    if (note?.creatorId !== creatorId) {
      return [];
    }
    return Image.find({ where: { noteId } });
  }
}
