import { Schema, Types, model } from "mongoose";

const questionSchema = new Schema({
  _id: String,
  category1: String,
  category2: String,
  category3: String,
  category4: String,
  label: String,
  description: String,
  options: [
    {
      value: String,
      label: String,
    },
  ],
  answer: String,
  fileUrl: String,
  type: String,
  isTest: Boolean,
});

const Question = model("Question", questionSchema);
export default Question;
