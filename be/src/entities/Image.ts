import { GraphQLBoolean, GraphQLScalarType, GraphQLString } from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MyOCR } from "../type";
import { Note } from "./Note";

// /**
//  * @ObjectType()
//  * @Field()
//  * its for the graphQL
//  */

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  filename!: string;

  @Field()
  @Column()
  filepath!: string;

  @Field(() => GraphQLJSONObject)
  @Column({
    type: "json",
  })
  ocr: any;

  @Field()
  @Column()
  event: string;

  @Field()
  @Column()
  noteId: number;

  @ManyToOne(() => Note, (note) => note.images)
  note: Note;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
