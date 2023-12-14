import { Field, InputType } from "type-graphql";

@InputType()
export class AnswerMutationRequest {
  @Field(() => String)
  questionId: string;

  @Field(() => String, { nullable: true })
  answer: string;

  @Field(() => Number, { nullable: true })
  startTime: number;

  @Field(() => Number, { nullable: true })
  endTime: number;

  @Field(() => Number, { nullable: true })
  duration: number;

  @Field(() => Boolean, { nullable: true })
  isCorrect: boolean;
}
