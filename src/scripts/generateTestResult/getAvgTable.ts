import { Answer } from "../../entities/submissions/Submission";
import { verticalSum } from "../../utils";

export const AvgSection = {
  A: {
    A1: {
      "A1.1": "B",
      "A1.2": "C",
      "A1.3": "A",
      "A1.4": "B",
      "A1.5": "A",
      "A1.6": "A",
      "A1.7": "A",
      "A1.8": "A",
      "A1.9": "D",
      "A1.10": "A",
    },
    A2: {
      "A2.1": "B",
      "A2.2": "C",
      "A2.3": "B",
      "A2.4": "C",
      "A2.5": "B",
      "A2.6": "C",
      "A2.7": "B",
      "A2.8": "A",
      "A2.9": "B",
      "A2.10": "B",
    },
    A3: {
      "A3.1": "B",
      "A3.2": "A",
    },
    A4: {
      "A4.1": "C",
      "A4.2": "D",
    },
    A5: {
      "A5.1": "C",
      "A5.2": "D",
    },
  },
  B: {
    B1: {
      "B1.1": "D",
      "B1.2": "B",
      "B1.3": "C",
      "B1.4": "D",
      "B1.5": "E",
      "B1.6": "G",
      "B1.7": "F",
      "B1.8": "A",
      "B1.9": "D",
      "B1.10": "E",
    },
    B2: {
      "B2.1": "A",
      "B2.2": "C",
      "B2.3": "B",
      "B2.4": "C",
      "B2.5": "C",
      "B2.6": "B",
      "B2.7": "C",
      "B2.8": "C",
      "B2.9": "B",
      "B2.10": "A",
    },
  },
  D: {
    D1: {
      "D1.1": "E",
      "D1.2": "C",
      "D1.3": "B",
      "D1.4": "A",
      "D1.5": "B",
      "D1.6": "B",
      "D1.7": "D",
      "D1.8": "C",
    },
    D2: {
      "D2.1": "C",
      "D2.2": "B",
      "D2.3": "C",
      "D2.4": "B",
      "D2.5": "A",
      "D2.6": "D",
      "D2.7": "D",
      "D2.8": "B",
    },
  },
  E: {
    E1: {
      "E1.1": "C",
      "E1.2": "D",
      "E1.3": "C",
      "E1.4": "A",
      "E1.5": "B",
    },
    E2: {
      "E2.1": "D",
      "E2.2": "C",
      "E2.3": "C",
      "E2.4": "D",
      "E2.5": "A",
    },
  },
  G: {
    G1: "A",
    G2: "B",
    G3: "A",
    G4: "C",
    G5: "A",
    G6: "C",
    G7: "A",
    G8: "B",
    G9: "B",
    G10: "A",
  },
  L: {
    L1: {
      "L1.1": "D",
      "L1.2": "C",
      "L1.3": "C",
      "L1.4": "D",
      "L1.5": "C",
      "L1.6": "C",
      "L1.7": "C",
    },
    L2: {
      "L2.1": "A",
      "L2.2": "C",
      "L2.3": "C",
    },
  },
  N: {
    N1: {
      "N1.1": "F",
      "N1.2": "J",
      "N1.3": "J",
      "N1.4": "F",
      "N1.5": "J",
      "N1.6": "J",
      "N1.7": "F",
      "N1.8": "F",
      "N1.9": "F",
      "N1.10": "J",
    },
    N2: {
      "N2.1": "C",
      "N2.2": "A",
      "N2.3": "A",
      "N2.4": "B",
      "N2.5": "C",
      "N2.6": "A",
      "N2.7": "C",
      "N2.8": "A",
      "N2.9": "B",
      "N2.10": "B",
    },
  },
};

export const getAvgTableColumns = (skey, section: any = AvgSection) => {
  const getAvgTableColumnsHelper = (sec, key, columns) => {
    if (typeof sec[key] === "string") {
      columns.push(`${key}_CRESP`, `${key}_RESP`, `${key}_ACC`, `${key}_RT`);
    } else {
      for (const k of Object.keys(sec[key])) {
        getAvgTableColumnsHelper(sec[key], k, columns);
      }
      columns.push(`${key}_RN`, `${key}_ACC`, `${key}_RT`);
    }
    return columns;
  };

  const tColumns = getAvgTableColumnsHelper(section, skey, []);
  return tColumns;
};

export const getAvgTableData = (
  skey: string,
  answers: Answer[],
  section: any = AvgSection
) => {
  const getAvgDataHelper = (sec, key, data, parentData) => {
    if (typeof sec[key] === "string") {
      const correctAnswer = sec[key];
      const findAnswer = answers?.find((i) => i.questionId === key);
      const answer = {
        isCorrect: findAnswer?.isCorrect || false,
        answer: findAnswer?.answer || "",
        duration: findAnswer?.duration || 0,
      };
      const isCorrect =
        answer?.isCorrect || answer?.answer === correctAnswer ? 1 : 0;
      data.push(correctAnswer, answer?.answer, isCorrect, answer?.duration);
      parentData.push([isCorrect, 1, answer?.duration]);
    } else {
      const unitData = [];
      for (const k of Object.keys(sec[key])) {
        getAvgDataHelper(sec[key], k, data, unitData);
      }
      const [unitCorrect, unitLength, unitDuration] =
        unitData.reduce(verticalSum);
      data.push(unitCorrect, unitCorrect / unitLength, unitDuration);
      parentData.push([unitCorrect, unitLength, unitDuration]);
    }
    return data;
  };

  const tdata = getAvgDataHelper(section, skey, [], []);
  return tdata;
};
