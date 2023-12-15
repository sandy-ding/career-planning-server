import { Schema, Types, model } from "mongoose";

const submissionSchema = new Schema({
  _id: Types.ObjectId,
  activeQuestionId: String,
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
