import { Resolver, Arg, Mutation, Ctx, Query, Int } from "type-graphql";
import { Submission, Answer } from "./Submission";
import submissionModel from "./SubmissionModel";
import { AnswerMutationRequest } from "./AnswerMutationRequest";
import { Types } from "mongoose";

@Resolver(Submission)
export class SubmissionResolver {
  @Query(() => Answer, { nullable: true })
  public async answer(
    @Ctx("userId") userId: string,
    @Arg("questionId") questionId?: string
  ): Promise<Answer> {
    let submission = await submissionModel.findById(userId);
    return submission?.answers?.find((i) => i.questionId === questionId);
  }

  @Query(() => [Answer], { nullable: true })
  public async answers(
    @Ctx("userId") userId: string,
    @Arg("questionId") questionId?: string
  ): Promise<Answer[]> {
    let submission = await submissionModel.findById(userId);
    return submission?.answers?.filter(
      (i) => i.questionId.indexOf(questionId) === 0
    );
  }

  @Query(() => [Submission], { nullable: true })
  public async submissions(
    @Arg("cursor", { nullable: true }) cursor?: string,
    @Arg("limit", (type) => Int, { nullable: true }) limit: number = 20
  ): Promise<Submission[]> {
    let submissions = await submissionModel
      .find({
        ...(cursor && {
          _id: { $lt: cursor },
        }),
      })
      .sort({
        _id: -1,
      })
      .limit(limit);
    return submissions;
  }

  @Mutation(() => Answer)
  public async submitAnswer(
    @Ctx("userId") userId: string,
    @Arg("input")
    input: AnswerMutationRequest
  ): Promise<Answer> {
    const { questionId } = input;
    let submission = await submissionModel.findById(userId);
    if (!submission) {
      submission = await submissionModel.create<Submission>({
        _id: new Types.ObjectId(userId),
        answers: [input],
        createdOn: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      const { answers } = submission;
      const previousAnswerIndex = answers.findIndex(
        (i) => i.questionId === questionId
      );
      if (previousAnswerIndex !== -1) {
        answers[previousAnswerIndex] = Object.assign(
          answers[previousAnswerIndex],
          input
        );
      } else {
        answers.push(input);
      }
      submission = await submissionModel.findByIdAndUpdate(
        userId,
        {
          answers,
          activeQuestionId: questionId,
          updatedAt: Date.now(),
        },
        { new: true }
      );
    }

    return submission.answers.find((i) => i.questionId === questionId);
  }
}
