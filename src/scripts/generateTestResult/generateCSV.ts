import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { stringify } from "csv-stringify";
import submissionModel from "../../entities/submissions/SubmissionModel";
import { getTableColumns, getTableData } from "./getTable";

const filename = "test_results.csv";
const writableStream = fs.createWriteStream(filename);

const main = async () => {
  dotenv.config();

  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.on("error", (e) => console.error(e));
  db.once("open", () => console.log("Connected to database"));

  let submissions = await submissionModel.find({}, [
    "_id",
    "answers.questionId",
    "answers.answer",
    "answers.duration",
    "answers.isCorrect",
  ]);

  mongoose.connection.close();

  const columns = getTableColumns();

  const stringifier = stringify({ header: true, columns: columns });

  submissions = submissions.filter(({ answers }) => answers.length > 600);
  for (const submission of submissions) {
    const data = getTableData(submission);
    stringifier.write(data);
  }

  stringifier.pipe(writableStream);

  console.log("Finished writing data");
};

main();
