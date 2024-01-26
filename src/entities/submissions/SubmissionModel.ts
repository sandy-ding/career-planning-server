import { Schema, model } from "mongoose";

const submissionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  activeQuestionId: String,
  createdOn: Number,
  updatedAt: Number,
  answers: [
    {
      questionId: {
        type: String,
        required: true,
      },
      answer: String,
      startTime: Number,
      endTime: Number,
      duration: Number,
      isCorrect: Boolean,
      numOfSubmission: Number,
    },
  ],
});

const Submission = model("Submission", submissionSchema);
export default Submission;
