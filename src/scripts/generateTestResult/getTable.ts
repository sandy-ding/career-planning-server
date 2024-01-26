import { Submission } from "../../entities/submissions/Submission";
import { AvgSection, getAvgTableColumns, getAvgTableData } from "./getAvgTable";
import {
  ScoreSection,
  getScoreTableColumns,
  getScoreTableData,
} from "./getScoreTable";
import { getPTableColumns, getPTableData } from "./getPTable";
import { getCTableColumns, getCTableData } from "./getCTable";
import { getFTableColumns, getFTableData } from "./getFTable";
import { getHTableColumns, getHTableData } from "./getHTable";
import { getITableColumns, getITableData } from "./getITable";
import { getQTableColumns, getQTableData } from "./getQTable";
import { getRTableColumns, getRTableData } from "./getRTable";
import { getOTableColumns, getOTableData } from "./getOTable";

export const getTableColumns = () => {
  const tColumns: string[] = ["userId"];
  for (let i = 0; i < 18; i++) {
    const skey = String.fromCharCode(65 + i);
    if (skey in AvgSection) {
      tColumns.push(...getAvgTableColumns(skey));
    } else if (skey in ScoreSection) {
      tColumns.push(...getScoreTableColumns(skey));
    } else if (skey === "C") {
      tColumns.push(...getCTableColumns());
    } else if (skey === "F") {
      tColumns.push(...getFTableColumns());
    } else if (skey === "H") {
      tColumns.push(...getHTableColumns());
    } else if (skey === "I") {
      tColumns.push(...getITableColumns());
    } else if (skey === "O") {
      tColumns.push(...getOTableColumns());
    } else if (skey === "P") {
      tColumns.push(...getPTableColumns());
    } else if (skey === "Q") {
      tColumns.push(...getQTableColumns());
    } else if (skey === "R") {
      tColumns.push(...getRTableColumns());
    }
  }
  return tColumns;
};

export const getTableData = (submission: Submission) => {
  const { _id, answers } = submission;
  const tData: any[] = [_id.toString()];
  for (let i = 0; i < 18; i++) {
    const skey = String.fromCharCode(65 + i);
    if (skey in AvgSection) {
      tData.push(...getAvgTableData(skey, answers));
    } else if (skey in ScoreSection) {
      tData.push(...getScoreTableData(skey, answers));
    } else if (skey === "C") {
      tData.push(...getCTableData(answers));
    } else if (skey === "F") {
      tData.push(...getFTableData(answers));
    } else if (skey === "H") {
      tData.push(...getHTableData(answers));
    } else if (skey === "I") {
      tData.push(...getITableData(answers));
    } else if (skey === "O") {
      tData.push(...getOTableData(answers));
    } else if (skey === "P") {
      tData.push(...getPTableData(answers));
    } else if (skey === "Q") {
      tData.push(...getQTableData(answers));
    } else if (skey === "R") {
      tData.push(...getRTableData(answers));
    }
  }
  return tData;
};
