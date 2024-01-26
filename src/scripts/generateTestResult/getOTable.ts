import { Answer } from "../../entities/submissions/Submission";

const OTotal = 96;

export const getOTableColumns = () => {
  const key = "O";
  const tColumns = [];
  for (let i = 1; i < OTotal + 1; i++) {
    tColumns.push(
      `${key}.${i}_CRESP`,
      `${key}.${i}_RESP`,
      `${key}.${i}_ACC`,
      `${key}.${i}_RT`
    );
  }
  tColumns.push(`${key}_RN`, `${key}_ACC`, `${key}_RT`);
  return tColumns;
};

export const getOTableData = (answers: Answer[]) => {
  const tdata = [];
  const key = "O";
  let totalDuration = 0;
  let totalCorrect = 0;
  for (let i = 1; i < OTotal + 1; i++) {
    const k = `${key}${i}`;
    const findAnswer = answers?.find((i) => i.questionId === k);
    const answer = {
      isCorrect: findAnswer?.isCorrect || false,
      answer: findAnswer?.answer || "",
      duration: findAnswer?.duration || 0,
    };
    const isCorrect = answer?.isCorrect ? 1 : 0;
    const correctAnswer =
      answer.answer === "F" ? (isCorrect ? "F" : "J") : isCorrect ? "J" : "F";
    totalCorrect += isCorrect;
    totalDuration += answer?.duration;
    tdata.push(
      correctAnswer,
      findAnswer?.answer,
      isCorrect,
      findAnswer?.duration
    );
  }
  tdata.push(totalCorrect, totalCorrect / OTotal, totalDuration);
  return tdata;
};
