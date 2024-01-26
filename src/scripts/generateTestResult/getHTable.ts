import { Answer } from "../../entities/submissions/Submission";
import { verticalSum } from "../../utils";

export const HSection = {
  H: {
    H1: {
      "H1.1": "F",
      "H1.2": "J",
      "H1.3": "J",
      "H1.4": "F",
      "H1.5": "F",
      "H1.6": "J",
      "H1.7": "J",
      "H1.8": "F",
      "H1.9": "J",
      "H1.10": "F",
      "H1.11": "F",
      "H1.12": "J",
      "H1.13": "F",
      "H1.14": "J",
      "H1.15": "F",
      "H1.16": "J",
      "H1.17": "J",
      "H1.18": "F",
      "H1.19": "F",
      "H1.20": "J",
    },
    H3: {
      "H3.1": "[[1,0,0,0,0],[0,0,0,0,0],[1,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0]]",
      "H3.2": "[[0,0,0,0,0],[0,1,0,0,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]]",
      "H3.3": "[[0,0,0,0,0],[0,0,1,0,0],[1,1,0,0,0],[0,0,0,1,0],[0,0,0,0,1]]",
    },
  },
};

export const getH1TableColumns = () => {
  const k = "H1";
  const tColumns = [];
  const { H1 } = HSection.H;
  for (const key of Object.keys(H1)) {
    tColumns.push(`${key}_CRESP`, `${key}_RESP`, `${key}_ACC`, `${key}_RT`);
  }
  for (let i = 0; i < 2; i++) {
    const key = String.fromCharCode(97 + i);
    tColumns.push(`${k}.${key}_RN`, `${k}.${key}_ACC`, `${k}.${key}_RT`);
  }
  tColumns.push(`${k}_RN`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

export const getH1TableData = (answers: Answer[]) => {
  const tData = [];
  let partData = [];
  const { H1 } = HSection.H;
  for (let [key, correctAnswer] of Object.entries(H1)) {
    const index = correctAnswer === "F" ? 0 : 1;
    const findAnswer = answers?.find((i) => i.questionId === key);
    const answer = {
      isCorrect: findAnswer?.isCorrect || false,
      answer: findAnswer?.answer || "",
      duration: findAnswer?.duration || 0,
    };
    const isCorrect =
      answer.isCorrect || answer.answer === correctAnswer ? 1 : 0;
    tData.push(correctAnswer, answer.answer, isCorrect, answer.duration);
    if (!partData[index]) {
      partData[index] = [];
    }
    partData[index].push([isCorrect, 1, answer.duration]);
  }
  for (let i = 0; i < 2; i++) {
    const [unitCorrect, unitLength, unitDuration] =
      partData[i].reduce(verticalSum);
    tData.push(unitCorrect, unitCorrect / unitLength, unitDuration);
    partData[i] = [unitCorrect, unitLength, unitDuration];
  }
  const [partCorrect, partLength, partDuration] = partData.reduce(verticalSum);
  tData.push(partCorrect, partCorrect / partLength, partDuration);
  return tData;
};

const getH2TableColumns = () => {
  const k = "H2";
  const tColumns = [];
  for (let i = 1; i < 16; i++) {
    tColumns.push(`${k}.${i}_ACC`, `${k}.${i}_RT`);
  }
  tColumns.push(`${k}_RN`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

const getH2TableData = (answers: Answer[]) => {
  const k = "H2";
  let totalDuration = 0;
  let totalCorrect = 0;
  const tData = [];
  for (let i = 1; i < 16; i++) {
    const key = `${k}.${i}`;
    const findAnswer = answers.find((i) => i.questionId === key);
    const duration = findAnswer?.duration || 0;
    const isCorrect = duration > 0 ? 1 : 0;
    tData.push(isCorrect, duration);
    totalDuration += duration;
    totalCorrect += isCorrect;
  }
  tData.push(totalCorrect, totalCorrect / 15, totalDuration);
  return tData.flat();
};

export const getH3TableColumns = () => {
  const k = "H3";
  const tColumns = [];
  const { H3 } = HSection.H;
  for (const key of Object.keys(H3)) {
    tColumns.push(`${key}_CRESP`, `${key}_RESP`, `${key}_ACC`, `${key}_RT`);
  }
  tColumns.push(`${k}_RN`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

export const getH3TableData = (answers: Answer[]) => {
  const k = "H3";
  const tData = [];
  const { H3 } = HSection.H;
  let totalScore = 0;
  let totalDuration = 0;
  for (let [key, correctAnswer] of Object.entries(H3)) {
    const findAnswer = answers?.find((i) => i.questionId === key);
    const answer = {
      isCorrect: findAnswer?.isCorrect || false,
      answer: findAnswer?.answer || "",
      duration: findAnswer?.duration || 0,
    };
    let score = 0;
    // for (let i = 0; i < correctAnswer.length; i++) {
    //   if (correctAnswer[i] === "1" && answer?.[i] === "1") {
    //     score += 1;
    //   }
    // }
    if (answer?.isCorrect) {
      score = 5;
    }
    tData.push(correctAnswer, answer?.answer, score / 5, answer.duration);
    totalScore += score;
    totalDuration += answer.duration;
  }
  tData.push(totalScore, totalScore / 15, totalDuration);
  return tData;
};

export const getHTableColumns = () => {
  const key = "H";
  const tColumns = [];
  tColumns.push(...getH1TableColumns());
  tColumns.push(...getH2TableColumns());
  tColumns.push(...getH3TableColumns());
  tColumns.push(`${key}_RN`, `${key}_ACC`, `${key}_RT`);
  return tColumns;
};

export const getHTableData = (answers: Answer[]) => {
  const tdata = [];
  const H1Data = getH1TableData(answers);
  const H2Data = getH2TableData(answers);
  const H3Data = getH3TableData(answers);
  const totalCorrect =
    H1Data[H1Data.length - 3] +
    H2Data[H2Data.length - 3] +
    H3Data[H3Data.length - 3];
  const totalLength = 20 + 15 + 15;
  const totalDuration =
    H1Data[H1Data.length - 1] +
    H2Data[H2Data.length - 1] +
    H3Data[H3Data.length - 1];
  tdata.push(
    ...H1Data,
    ...H2Data,
    ...H3Data,
    totalCorrect,
    totalCorrect / totalLength,
    totalDuration
  );
  return tdata;
};
