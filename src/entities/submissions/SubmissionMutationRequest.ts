import { Field, InputType } from "type-graphql";

@InputType()
export class SubmissionMutationRequest {
  @Field(() => String)
  questionId: string;

  @Field(() => String)
  answer: string;

  @Field(() => Number, { nullable: true })
  time: number;

  @Field(() => Boolean, { nullable: true })
  isCorrect: boolean;
}
