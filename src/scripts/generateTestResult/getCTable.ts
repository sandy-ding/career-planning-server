import { Answer } from "../../entities/submissions/Submission";
import { verticalSum } from "../../utils";

const C2ScoreMap = {
  "C2.1": 4,
  "C2.2": 4,
  "C2.3": 5,
  "C2.4": 5,
  "C2.5": 6,
  "C2.6": 6,
  "C2.7": 7,
  "C2.8": 7,
  "C2.9": 8,
  "C2.10": 8,
  "C2.11": 9,
  "C2.12": 9,
  "C2.13": 10,
  "C2.14": 10,
  "C2.15": 11,
  "C2.16": 11,
  "C2.17": 12,
  "C2.18": 12,
};

export const CSection = {
  C: {
    C1: {
      "C1.1": {
        "C1.1": "386",
        "C1.2": "3517",
        "C1.3": "84259",
        "C1.4": "386174",
        "C1.5": "5174268",
        "C1.6": "16429763",
        "C1.7": "538418469",
        "C1.8": "7361529386",
        "C1.9": "37925186416",
        "C1.10": "852736948574",
        "C1.11": "4915283759436",
      },
      "C1.2": {
        "C1.21": "475",
        "C1.22": "6927",
        "C1.23": "75314",
        "C1.24": "392861",
        "C1.25": "2462958",
        "C1.26": "85736196",
        "C1.27": "283147539",
        "C1.28": "3614972485",
        "C1.29": "92752847163",
        "C1.30": "864728364917",
        "C1.31": "9704743398121",
      },
    },
    C2: {
      "C2.1": "[[0,1,0],[0,1,0],[1,0,1]]",
      "C2.2": "[[0,1,1],[0,0,1],[1,0,0]]",
      "C2.3": "[[0,1,1,0],[0,0,0,0],[0,1,1,0],[0,0,0,1]]",
      "C2.4": "[[0,1,0,0],[1,0,0,1],[0,0,1,0],[0,1,0,0]]",
      "C2.5": "[[1,0,0,1],[1,0,0,1],[0,1,0,0],[1,0,0,0]]",
      "C2.6": "[[0,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,0,1]]",
      "C2.7": "[[1,0,0,1,1],[0,0,1,0,0],[0,0,1,0,0],[1,0,1,0,0],[0,0,0,0,0]]",
      "C2.8": "[[0,1,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,0,1],[0,0,0,0,0]]",
      "C2.9": "[[0,0,0,1,1],[0,0,0,1,0],[0,1,1,1,0],[0,1,1,0,0],[0,0,0,0,0]]",
      "C2.10": "[[0,1,0,0,1],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0],[1,0,1,1,1]]",
      "C2.11": "[[1,0,0,0,0],[1,1,1,0,0],[0,0,1,0,1],[0,1,0,0,0],[0,1,1,0,0]]",
      "C2.12": "[[0,0,0,1,0],[0,0,1,0,1],[0,0,0,1,0],[0,1,0,1,0],[0,1,1,1,0]]",
      "C2.13": "[[0,1,0,0,1],[0,0,1,1,0],[0,1,0,0,0],[0,1,0,0,1],[0,1,0,1,1]]",
      "C2.14": "[[1,1,0,0,0],[0,1,0,0,1],[0,0,0,1,1],[1,1,0,0,1],[0,0,0,0,1]]",
      "C2.15": "[[1,0,0,0,1],[1,0,0,1,0],[0,1,1,0,0],[0,1,1,0,0],[1,0,0,1,1]]",
      "C2.16": "[[1,0,0,0,1],[0,1,1,1,1],[1,0,0,0,0],[0,1,0,1,1],[0,0,1,0,0]]",
      "C2.17": "[[1,0,0,0,1],[1,1,0,0,0],[1,0,0,1,0],[0,1,1,1,1],[0,0,1,1,0]]",
      "C2.18": "[[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,0],[0,1,0,0,1],[1,0,1,1,1]]",
    },
  },
};

export const getCTableColumns = () => {
  const getCTableColumnsHelper = (sec, key, columns) => {
    if (typeof sec[key] === "string") {
      columns.push(
        `${key}_CRESP`,
        `${key}_RESP`,
        `${key}_ACC`,
        `${key}_SCR`,
        `${key}_RT`
      );
    } else {
      for (const k of Object.keys(sec[key])) {
        getCTableColumnsHelper(sec[key], k, columns);
      }
      if (key === "C1.1" || key === "C1.2") {
        const [unit, part] = key.split(".");
        columns.push(`${unit}_HSCR${part}`, `${unit}_RT${part}`);
      } else {
        columns.push(`${key}_HSCR`, `${key}_RT`);
      }
    }
    return columns;
  };

  const tColumns = getCTableColumnsHelper(CSection, "C", []);
  return tColumns;
};

export const getCTableData = (answers: Answer[]) => {
  const getCDataHelper = (sec, key, data, parentData) => {
    if (typeof sec[key] === "string") {
      const correctAnswer = sec[key];
      const findAnswer = answers?.find((i) => i.questionId === key);
      const answer = {
        isCorrect: findAnswer?.isCorrect || false,
        answer: findAnswer?.answer || "",
        duration: findAnswer?.duration || 0,
      };
      const isCorrect = answer?.isCorrect || answer?.answer === correctAnswer;
      const score = isCorrect
        ? key.startsWith("C1")
          ? correctAnswer.length
          : C2ScoreMap[key]
        : 0;
      data.push(
        correctAnswer,
        answer?.answer,
        isCorrect,
        score,
        answer?.duration
      );
      parentData.push([score, answer?.duration]);
    } else {
      const unitData = [];
      for (const k of Object.keys(sec[key])) {
        getCDataHelper(sec[key], k, data, unitData);
      }
      const [unitScore, unitDuration] = unitData.reduce(verticalSum);
      const highestScore =
        unitData?.findLast((element) => !!element[0])?.[0] || 0;
      const score = key === "C" || key === "C1" ? unitScore : highestScore;
      data.push(score, unitDuration);
      parentData.push([score, unitDuration]);
    }
    return data;
  };

  const tdata = getCDataHelper(CSection, "C", [], []);
  return tdata;
};
