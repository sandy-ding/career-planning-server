import { Answer } from "../../entities/submissions/Submission";

export const RSection = {
  R: {
    R1: 90,
    R2: 90,
  },
};

export const getRTableColumns = () => {
  const key = "R";
  const tColumns = [];
  for (let [k, v] of Object.entries(RSection.R)) {
    for (let i = 1; i < v + 1; i++) {
      tColumns.push(`${k}.${i}_RESP`, `${k}.${i}_SCR`, `${k}.${i}_RT`);
    }
    tColumns.push(`${k}_SCR`, `${k}_RT`);
  }
  tColumns.push(`${key}_SCR`, `${key}_RT`);
  return tColumns;
};

export const getRTableData = (answers: Answer[]) => {
  const tdata = [];
  let totalDuration = 0;
  let totalRScore = 0;
  let totalScore = 0;
  for (let [k, v] of Object.entries(RSection.R)) {
    for (let i = 1; i < v + 1; i++) {
      const key = `${k}.${i}`;
      const findAnswer = answers?.find((i) => i.questionId === key);
      const score = Number(findAnswer?.answer);
      totalScore += score;
      tdata.push(findAnswer?.answer || "", score, findAnswer?.duration || 0);
    }
    if (k === "R1") {
      totalRScore = totalScore;
    } else {
      totalRScore = totalScore - totalRScore;
    }
    tdata.push(totalRScore, totalDuration);
  }
  tdata.push(totalScore, totalDuration);
  return tdata;
};
