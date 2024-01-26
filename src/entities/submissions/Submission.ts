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
  startTime?: number;

  @Field({ nullable: true })
  endTime?: number;

  @Field({ nullable: true })
  duration?: number;
}

@ObjectType()
export class Submission {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String, { nullable: true })
  activeQuestionId?: string;

  @Field(() => Number, { nullable: true })
  createdOn?: number;

  @Field(() => Number, { nullable: true })
  updatedAt?: number;

  @Field(() => [Answer], { nullable: true })
  answers?: Answer[];
}
