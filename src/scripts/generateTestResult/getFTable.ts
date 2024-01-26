import { Answer } from "../../entities/submissions/Submission";
import { verticalSum } from "../../utils";
import { getAvgTableColumns, getAvgTableData } from "./getAvgTable";

export const FSection = {
  F: {
    F1: {
      "F1.1": { angleIndex: 5, answer: "F" },
      "F1.2": { angleIndex: 5, answer: "F" },
      "F1.3": { angleIndex: 4, answer: "J" },
      "F1.4": { angleIndex: 1, answer: "F" },
      "F1.5": { angleIndex: 3, answer: "J" },
      "F1.6": { angleIndex: 3, answer: "J" },
      "F1.7": { angleIndex: 0, answer: "J" },
      "F1.8": { angleIndex: 4, answer: "J" },
      "F1.9": { angleIndex: 0, answer: "J" },
      "F1.10": { angleIndex: 1, answer: "F" },
      "F1.11": { angleIndex: 1, answer: "F" },
      "F1.12": { angleIndex: 4, answer: "J" },
      "F1.13": { angleIndex: 3, answer: "J" },
      "F1.14": { angleIndex: 0, answer: "F" },
      "F1.15": { angleIndex: 4, answer: "F" },
      "F1.16": { angleIndex: 2, answer: "F" },
      "F1.17": { angleIndex: 5, answer: "J" },
      "F1.18": { angleIndex: 2, answer: "F" },
      "F1.19": { angleIndex: 1, answer: "J" },
      "F1.20": { angleIndex: 3, answer: "J" },
      "F1.21": { angleIndex: 5, answer: "J" },
      "F1.22": { angleIndex: 3, answer: "F" },
      "F1.23": { angleIndex: 5, answer: "J" },
      "F1.24": { angleIndex: 0, answer: "F" },
      "F1.25": { angleIndex: 0, answer: "J" },
      "F1.26": { angleIndex: 2, answer: "F" },
      "F1.27": { angleIndex: 3, answer: "F" },
      "F1.28": { angleIndex: 2, answer: "F" },
      "F1.29": { angleIndex: 3, answer: "F" },
      "F1.30": { angleIndex: 5, answer: "J" },
      "F1.31": { angleIndex: 5, answer: "J" },
      "F1.32": { angleIndex: 0, answer: "J" },
      "F1.33": { angleIndex: 3, answer: "F" },
      "F1.34": { angleIndex: 0, answer: "F" },
      "F1.35": { angleIndex: 0, answer: "F" },
      "F1.36": { angleIndex: 2, answer: "F" },
      "F1.37": { angleIndex: 1, answer: "J" },
      "F1.38": { angleIndex: 2, answer: "F" },
      "F1.39": { angleIndex: 3, answer: "F" },
      "F1.40": { angleIndex: 5, answer: "J" },
      "F1.41": { angleIndex: 4, answer: "J" },
      "F1.42": { angleIndex: 2, answer: "F" },
      "F1.43": { angleIndex: 1, answer: "F" },
      "F1.44": { angleIndex: 4, answer: "F" },
      "F1.45": { angleIndex: 1, answer: "F" },
      "F1.46": { angleIndex: 4, answer: "J" },
      "F1.47": { angleIndex: 1, answer: "J" },
      "F1.48": { angleIndex: 1, answer: "F" },
      "F1.49": { angleIndex: 5, answer: "J" },
      "F1.50": { angleIndex: 2, answer: "J" },
      "F1.51": { angleIndex: 4, answer: "F" },
      "F1.52": { angleIndex: 4, answer: "J" },
      "F1.53": { angleIndex: 2, answer: "J" },
      "F1.54": { angleIndex: 5, answer: "J" },
      "F1.55": { angleIndex: 1, answer: "F" },
      "F1.56": { angleIndex: 4, answer: "J" },
      "F1.57": { angleIndex: 1, answer: "F" },
      "F1.58": { angleIndex: 4, answer: "F" },
      "F1.59": { angleIndex: 3, answer: "F" },
      "F1.60": { angleIndex: 5, answer: "J" },
      "F1.61": { angleIndex: 0, answer: "F" },
      "F1.62": { angleIndex: 0, answer: "J" },
      "F1.63": { angleIndex: 2, answer: "J" },
      "F1.64": { angleIndex: 0, answer: "F" },
      "F1.65": { angleIndex: 0, answer: "F" },
      "F1.66": { angleIndex: 3, answer: "F" },
      "F1.67": { angleIndex: 1, answer: "J" },
      "F1.68": { angleIndex: 5, answer: "F" },
      "F1.69": { angleIndex: 2, answer: "J" },
      "F1.70": { angleIndex: 2, answer: "J" },
      "F1.71": { angleIndex: 3, answer: "J" },
      "F1.72": { angleIndex: 4, answer: "J" },
    },
    F2: {
      "F2.1": '["A","D"]',
      "F2.2": '["B","D"]',
      "F2.3": '["A","C"]',
      "F2.4": '["B","D"]',
    },
    F3: {
      "F3.1": "B",
      "F3.2": "C",
      "F3.3": "D",
      "F3.4": "C",
    },
  },
};

export const getF1TableColumns = () => {
  const k = "F1";
  const tColumns = [];
  const { F1 } = FSection.F;
  for (const key of Object.keys(F1)) {
    tColumns.push(`${key}_CRESP`, `${key}_RESP`, `${key}_ACC`, `${key}_RT`);
  }
  for (let i = 0; i < 6; i++) {
    const key = String.fromCharCode(97 + i);
    tColumns.push(`${k}.${key}_RN`, `${k}.${key}_ACC`, `${k}.${key}_RT`);
  }
  tColumns.push(`${k}_RN`, `${k}_ACC`, `${k}_RT`);
  return tColumns;
};

export const getF1TableData = (answers: Answer[]) => {
  const tData = [];
  let partData = [];
  const { F1 } = FSection.F;
  for (let [key, value] of Object.entries(F1)) {
    const { angleIndex, answer: correctAnswer } = value;
    const findAnswer = answers?.find((i) => i.questionId === key);
    const answer = {
      isCorrect: findAnswer?.isCorrect || false,
      answer: findAnswer?.answer || "",
      duration: findAnswer?.duration || 0,
    };
    const isCorrect =
      answer.isCorrect || answer.answer === correctAnswer ? 1 : 0;
    tData.push(correctAnswer, answer.answer, isCorrect, answer.duration);
    if (!partData[angleIndex]) {
      partData[angleIndex] = [];
    }
    partData[angleIndex].push([isCorrect, 1, answer.duration]);
  }
  for (let i = 0; i < 6; i++) {
    const [unitCorrect, unitLength, unitDuration] =
      partData[i].reduce(verticalSum);
    tData.push(unitCorrect, unitCorrect / unitLength, unitDuration);
    partData[i] = [unitCorrect, unitLength, unitDuration];
  }
  const [partCorrect, partLength, partDuration] = partData.reduce(verticalSum);
  tData.push(partCorrect, partCorrect / partLength, partDuration);
  return tData;
};

export const getFTableColumns = () => {
  const key = "F";
  const tColumns = [];
  tColumns.push(...getF1TableColumns());
  tColumns.push(...getAvgTableColumns("F2", FSection.F));
  tColumns.push(...getAvgTableColumns("F3", FSection.F));
  tColumns.push(`${key}_RN`, `${key}_ACC`, `${key}_RT`);
  return tColumns;
};

export const getFTableData = (answers: Answer[]) => {
  const tdata = [];
  const F1Data = getF1TableData(answers);
  const F2Data = getAvgTableData("F2", answers, FSection.F);
  const F3Data = getAvgTableData("F3", answers, FSection.F);
  const totalCorrect =
    F1Data[F1Data.length - 3] +
    F2Data[F2Data.length - 3] +
    F3Data[F3Data.length - 3];
  const totalLength = 80;
  const totalDuration =
    F1Data[F1Data.length - 1] +
    F2Data[F2Data.length - 1] +
    F3Data[F3Data.length - 1];
  tdata.push(
    ...F1Data,
    ...F2Data,
    ...F3Data,
    totalCorrect,
    totalCorrect / totalLength,
    totalDuration
  );
  return tdata;
};
