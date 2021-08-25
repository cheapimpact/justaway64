import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { ObjectType, Field } from "type-graphql";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
};

export type MyOCR = {
  paragraphs?: [
    {
      text: string;
      boundingPoly?: any;
    }
  ];
  form?: [{ key: string; value: any; boundingPoly: any }];
  table?: [{ header: string; body: string }];
  text?: string[];
};

// @ObjectType()
// export class MyOCR {
//   @Field()
//   paragraphs?: [
//     {
//       text: string;
//       boundingPoly?: any;
//     }
//   ];

//   @Field()
//   form?: [{ key: string; value: any; boundingPoly: any }];

//   @Field()
//   table?: [{ header: string; body: string }];

//   @Field()
//   text?: string[];
// }
