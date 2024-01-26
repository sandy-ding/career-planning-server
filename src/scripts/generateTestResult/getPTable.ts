import { Answer } from "../../entities/submissions/Submission";
import { getAvgTableColumns, getAvgTableData } from "./getAvgTable";
import { getScoreTableColumns, getScoreTableData } from "./getScoreTable";

const P2ScoreMap = {
  A: 2,
  B: 4,
  C: 3,
  D: 1,
};

export const PSection = {
  P: {
    P1: {
      "P1.1": "B",
      "P1.2": "C",
      "P1.3": "C",
      "P1.4": "C",
      "P1.5": "B",
      "P1.6": "A",
      "P1.7": "A",
      "P1.8": "A",
      "P1.9": "B",
      "P1.10": "A",
    },
    P2: {
      "P2.1": P2ScoreMap,
      "P2.2": P2ScoreMap,
      "P2.3": P2ScoreMap,
      "P2.4": P2ScoreMap,
      "P2.5": P2ScoreMap,
      "P2.6": P2ScoreMap,
      "P2.7": P2ScoreMap,
      "P2.8": P2ScoreMap,
    },
  },
};

export const getPTableColumns = () => {
  const tColumns = [];
  tColumns.push(...getAvgTableColumns("P1", PSection.P));
  tColumns.push(...getScoreTableColumns("P2", PSection.P));
  tColumns.push("P_RT");
  return tColumns;
};

export const getPTableData = (answers: Answer[]) => {
  const tdata = [];
  const avgData = getAvgTableData("P1", answers, PSection.P);
  const scoreData = getScoreTableData("P2", answers, PSection.P);
  tdata.push(
    ...avgData,
    ...scoreData,
    avgData[avgData.length - 1] + scoreData[scoreData.length - 1]
  );
  return tdata;
};
