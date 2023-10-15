import { Resolver, Arg, Query, Int, FieldResolver, Root } from "type-graphql";
import { Question } from "./Question";
import questionModel from "./QuestionModel";
import { getQuestions } from "./QuestionService";

@Resolver(() => Question)
export class QuestionResolver {
  @Query(() => Question)
  async question(@Arg("id") id: string) {
    const question = await questionModel.findById(id);
    return question;
  }

  // @FieldResolver(() => String)
  // answer(@Root() question: any) {
  //   console.log("question answer", question.isTest, question?.answer);
  //   return question.isTest ? question?.answer : "";
  // }

  @Query(() => [Question])
  async questions(
    @Arg("page", () => Int) page: number = 1,
    @Arg("size", () => Int) size: number = 10,
    @Arg("category2", () => String, { nullable: true }) category2,
    @Arg("category3", () => String, { nullable: true }) category3
  ) {
    return await getQuestions({ page, size, category2, category3 });
  }
}
