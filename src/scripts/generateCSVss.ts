import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { stringify } from "csv-stringify";
import submissionModel from "../entities/submissions/SubmissionModel";

const filename = "test_results.csv";
const writableStream = fs.createWriteStream(filename);
const columns = ["userId", "answers"];

const main = async () => {
  dotenv.config();

  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.on("error", (e) => console.error(e));
  db.once("open", () => console.log("Connected to database"));

  const results = await submissionModel.find({}, [
    "_id",
    "answers.questionId",
    "answers.answer",
    "answers.duration",
    "answers.isCorrect",
  ]);

  mongoose.connection.close();

  const stringifier = stringify({ header: true, columns: columns });

  for (const result of results) {
    const { _id, answers } = result;
    for (const answer of answers) {
      if (!columns.includes(answer.questionId)) {
        columns.push(answer.questionId);
      }
    }
    stringifier.write({
      userId: _id.toString().replace(/'/g, ""),
      answers: answers.sort((a, b) => a.questionId.localeCompare(b.questionId)),
    });
  }

  stringifier.pipe(writableStream);

  console.log("Finished writing data");
};

main();
