import { Schema, Types, model } from "mongoose";

const submissionSchema = new Schema({
  _id: Types.ObjectId,
  answers: [
    {
      questionId: String,
      answer: String,
      isCorrect: Boolean,
      numOfSubmission: Number,
      time: Number,
    },
  ],
});

const Submission = model("Submission", submissionSchema);
export default Submission;
