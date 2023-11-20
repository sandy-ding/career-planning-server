import { Types } from "mongoose";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Answer {
  @Field()
  questionId: string;

  @Field({ nullable: true })
  answer?: string;

  @Field({ nullable: true })
  isCorrect?: boolean;

  @Field({ nullable: true })
  numOfSubmission?: number;

  @Field({ nullable: true })
  time?: number;
}

@ObjectType()
export class Submission {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => [Answer])
  answers: Answer[];
}
