import { ApolloServer } from "apollo-server-express";
import conncectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import ioRedis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import { HelloResolver } from "./resolvers/hello";
import { NoteResolver } from "./resolvers/note";
import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";
import { Note } from "./entities/Note";
import { User } from "./entities/User";
import { graphqlUploadExpress } from "graphql-upload";
import { Image } from "./entities/Image";
import { ImageResolver } from "./resolvers/image";
import path from "path";
const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "wasted",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Note, User, Image],
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  await conn.runMigrations();
  const app = express();
  const RedisStore = conncectRedis(session);
  const redis = new ioRedis();
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only work in https
      },
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const appolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, NoteResolver, UserResolver, ImageResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    uploads: false,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  // //Create a GCP Bucket
  // const bucketName = "wasted-314906";
  // // Imports the Google Cloud client library

  // // Creates a client
  // // The bucket in the sample below will be created in the project associated with this client.
  // // For more information, please see https://cloud.google.com/docs/authentication/production or https://googleapis.dev/nodejs/storage/latest/Storage.html
  // const storage = new Storage({
  //   keyFilename: "wasted.json",
  // });
  // await storage.bucket(bucketName).upload(filePath, {});
  // const filePathGS = `${bucketName}/${fileName}`;
  // console.log({ filePathGS });

  //create a graphQL ep ON EXPRESS
  appolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(4200, () => {
    console.log("server running on port 4200");
  });
  app.get("/", (_, res) => {
    res.send("hello");
  });
};
main().catch((err) => {
  console.error(err);
});
