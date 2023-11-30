import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { Submission, Answer } from "./Submission";
import submissionModel from "./SubmissionModel";
import { SubmissionMutationRequest } from "./SubmissionMutationRequest";
import { Types } from "mongoose";

@Resolver(Submission)
export class SubmissionResolver {
  @Mutation(() => Answer)
  public async submitAnswer(
    @Ctx("userId") userId: string,
    @Arg("input")
    { questionId, answer, time, isCorrect }: SubmissionMutationRequest
  ): Promise<Answer> {
    const data = {
      time,
      answer,
      questionId,
      numOfSubmission: 1,
      isCorrect,
    };

    let submission = await submissionModel.findById(userId);
    if (!submission) {
      submission = await submissionModel.create<Submission>({
        _id: new Types.ObjectId(userId),
        answers: [data],
      });
    } else {
      const { answers } = submission;
      const previousAnswerIndex = answers.findIndex(
        (i) => i.questionId === questionId
      );
      console.log("previousAnswerIndex", previousAnswerIndex);
      if (previousAnswerIndex !== -1) {
        data.numOfSubmission = answers[previousAnswerIndex].numOfSubmission + 1;
        answers[previousAnswerIndex] = data;
      } else {
        answers.push(data);
      }
      submission = await submissionModel.findByIdAndUpdate(userId, {
        answers,
      });
    }

    return data;
  }
}
