import { Answer } from "../../entities/submissions/Submission";

const I1Total = 14;
const I2Total = 10;
const I3Total = 3;
export const ISection = {
  I: {
    I3: {
      "I3.1": 9,
      "I3.2": 9,
      "I3.3": 16,
    },
  },
};

export const getI1TableColumns = () => {
  const k = "I1";
  const tColumns = [];
  for (let i = 1; i < I1Total + 1; i++) {
    tColumns.push(`${k}.${i}_ACC`, `${k}.${i}_RT`);
  }
  tColumns.push(`${k}_CNUM`, `${k}_NUM`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

export const getI1TableData = (answers: Answer[]) => {
  const findAnswer = answers?.find((i) => i.questionId === "I1.1");
  const answer = {
    answer: findAnswer?.answer || "[]",
    duration: findAnswer?.duration || 0,
  };
  const arr = JSON.parse(answer?.answer);
  let totalCorrect = 0;
  const tData = [];
  for (let i = 1; i < I1Total + 1; i++) {
    const isCorrect = arr.find((n) => n === i) ? 1 : 0;
    tData.push(isCorrect, 0);
    totalCorrect += isCorrect;
  }
  tData.push(I1Total, totalCorrect, totalCorrect / I1Total, answer.duration);
  return tData;
};

const getI2TableColumns = () => {
  const k = "I2";
  const tColumns = [];
  for (let i = 1; i < I2Total + 1; i++) {
    tColumns.push(`${k}.${i}_ACC`, `${k}.${i}_RT`);
  }
  tColumns.push(`${k}_CNUM`, `${k}_NUM`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

const getI2TableData = (answers: Answer[]) => {
  const findAnswer = answers?.find((i) => i.questionId === "I2.1");
  const answer = {
    answer: findAnswer?.answer || "[]",
    duration: findAnswer?.duration || 0,
  };
  const arr = JSON.parse(answer?.answer);
  let totalCorrect = 0;
  const tData = [];
  for (let i = 1; i < I2Total + 1; i++) {
    const isCorrect = arr.find((n) => n === `${i}`) ? 1 : 0;
    tData.push(isCorrect, 0);
    totalCorrect += isCorrect;
  }
  tData.push(I2Total, totalCorrect, totalCorrect / I2Total, answer.duration);
  return tData;
};

const getI3TableColumns = () => {
  const k = "I3";
  const tColumns = [];
  for (let i = 1; i < I3Total + 1; i++) {
    tColumns.push(
      `${k}.${i}_CNUM`,
      `${k}.${i}_NUM`,
      `${k}.${i}_ACC`,
      `${k}.${i}_RT`
    );
  }
  tColumns.push(`${k}_CNUM`, `${k}_NUM`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

export const getI3TableData = (answers: Answer[]) => {
  const tData = [];
  const { I3 } = ISection.I;
  let totalScore = 0;
  let totalDuration = 0;
  for (let [key, total] of Object.entries(I3)) {
    const findAnswer = answers?.find((i) => i.questionId === key);
    const answer = {
      isCorrect: findAnswer?.isCorrect || false,
      answer: findAnswer?.answer || "",
      duration: findAnswer?.duration || 0,
    };
    const arr = JSON.parse(answer?.answer);
    const score = arr.length;
    tData.push(total, score, score / total, answer.duration);
    totalScore += score;
    totalDuration += answer.duration;
  }
  tData.push(34, totalScore, totalScore / 34, totalDuration);
  return tData;
};

export const getITableColumns = () => {
  const key = "I";
  const tColumns = [];
  tColumns.push(...getI1TableColumns());
  tColumns.push(...getI2TableColumns());
  tColumns.push(...getI3TableColumns());
  tColumns.push(`${key}_RN`, `${key}_ACC`, `${key}_RT`);
  return tColumns;
};

export const getITableData = (answers: Answer[]) => {
  const tdata = [];
  const I1Data = getI1TableData(answers);
  const I2Data = getI2TableData(answers);
  const I3Data = getI3TableData(answers);
  const totalCorrect =
    I1Data[I1Data.length - 3] +
    I2Data[I2Data.length - 3] +
    I3Data[I3Data.length - 3];
  const totalLength =
    I1Total +
    I2Total +
    ISection.I.I3["I3.1"] +
    ISection.I.I3["I3.2"] +
    ISection.I.I3["I3.3"];
  const totalDuration =
    I1Data[I1Data.length - 1] +
    I2Data[I2Data.length - 1] +
    I3Data[I3Data.length - 1];
  tdata.push(
    ...I1Data,
    ...I2Data,
    ...I3Data,
    totalCorrect,
    totalCorrect / totalLength,
    totalDuration
  );
  return tdata;
};
