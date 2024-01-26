import { Answer } from "../../entities/submissions/Submission";
import { verticalSum } from "../../utils";

const JScoreMap = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

const M2ScoreMap = {
  A: 5,
  B: 0,
};

export const ScoreSection = {
  J: {
    J1: JScoreMap,
    J2: JScoreMap,
    J3: JScoreMap,
    J4: JScoreMap,
    J5: JScoreMap,
    J6: JScoreMap,
    J7: JScoreMap,
    J8: JScoreMap,
    J9: JScoreMap,
    J10: JScoreMap,
    J11: JScoreMap,
    J12: JScoreMap,
    J13: JScoreMap,
    J14: JScoreMap,
    J15: JScoreMap,
  },
  M: {
    M1: {
      "M1.1": {
        A: 3,
        B: 5,
        C: 1,
      },
      "M1.2": {
        A: 3,
        B: 1,
        C: 5,
      },
      "M1.3": {
        A: 5,
        B: 3,
        C: 1,
      },
      "M1.4": {
        A: 5,
        B: 3,
        C: 1,
      },
      "M1.5": {
        A: 3,
        B: 5,
        C: 1,
      },
      "M1.6": {
        A: 5,
        B: 3,
        C: 1,
      },
      "M1.7": {
        A: 1,
        B: 3,
        C: 5,
      },
      "M1.8": {
        A: 5,
        B: 3,
        C: 1,
      },
      "M1.9": {
        A: 1,
        B: 5,
        C: 3,
      },
      "M1.10": {
        A: 1,
        B: 5,
        C: 3,
      },
    },
    M2: {
      "M2.1": M2ScoreMap,
      "M2.2": M2ScoreMap,
      "M2.3": M2ScoreMap,
      "M2.4": M2ScoreMap,
      "M2.5": M2ScoreMap,
      "M2.6": M2ScoreMap,
      "M2.7": M2ScoreMap,
      "M2.8": M2ScoreMap,
      "M2.9": M2ScoreMap,
      "M2.10": M2ScoreMap,
    },
    M3: {
      "M3.1": {
        A: 2,
        B: 0,
      },
      "M3.2": {
        A: 2,
        B: 0,
      },
      "M3.3": {
        A: 2,
        B: 0,
      },
      "M3.4": {
        A: 2,
        B: 0,
      },
      "M3.5": {
        A: 2,
        B: 0,
      },
      "M3.6": {
        A: 5,
        B: 3,
        C: 1,
      },
      "M3.7": {
        A: 3,
        B: 5,
        C: 1,
      },
      "M3.8": {
        A: 5,
        B: 1,
        C: 3,
      },
      "M3.9": {
        A: 3,
        B: 5,
        C: 1,
      },
      "M3.10": {
        A: 5,
        B: 3,
        C: 3,
      },
    },
  },
};

export const getScoreTableColumns = (skey, section: any = ScoreSection) => {
  const getAvgTableColumnsHelper = (sec, key, columns) => {
    if ("A" in sec[key]) {
      columns.push(`${key}_RESP`, `${key}_SCR`, `${key}_RT`);
    } else {
      for (const k of Object.keys(sec[key])) {
        getAvgTableColumnsHelper(sec[key], k, columns);
      }
      columns.push(`${key}_SCR`, `${key}_RT`);
    }
    return columns;
  };

  const tColumns = getAvgTableColumnsHelper(section, skey, []);
  return tColumns;
};

export const getScoreTableData = (
  skey: string,
  answers: Answer[],
  section: any = ScoreSection
) => {
  const getScoreDataHelper = (sec, key, data, parentData) => {
    if ("A" in sec[key]) {
      const findAnswer = answers?.find((i) => i.questionId === key);
      const answer = {
        isCorrect: findAnswer?.isCorrect || false,
        answer: findAnswer?.answer || "",
        duration: findAnswer?.duration || 0,
      };
      const score = sec[key][answer?.answer];
      data.push(answer?.answer, score, answer?.duration);
      parentData.push([score, answer?.duration]);
    } else {
      const unitData = [];
      for (const k of Object.keys(sec[key])) {
        getScoreDataHelper(sec[key], k, data, unitData);
      }
      const [unitScore, unitDuration] = unitData.reduce(verticalSum);
      data.push(unitScore, unitDuration);
      parentData.push([unitScore, unitDuration]);
    }
    return data;
  };

  const tdata = getScoreDataHelper(section, skey, [], []);
  return tdata;
};
