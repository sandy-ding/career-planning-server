import { Answer } from "../../entities/submissions/Submission";

const QTotal = 144;
export const QSection = {
  Q: {
    Q1: true,
    Q2: false,
    Q3: true,
    Q4: true,
    Q5: false,
    Q6: false,
    Q7: false,
    Q8: true,
    Q9: true,
    Q10: true,
    Q11: true,
    Q12: true,
    Q13: true,
    Q14: false,
    Q15: true,
    Q16: true,
    Q17: true,
    Q18: false,
    Q19: true,
    Q20: false,
    Q21: true,
    Q22: false,
    Q23: false,
    Q24: true,
    Q25: true,
    Q26: true,
    Q27: false,
    Q28: true,
    Q29: false,
    Q30: false,
    Q31: false,
    Q32: false,
    Q33: true,
    Q34: false,
    Q35: false,
    Q36: false,
    Q37: false,
    Q38: true,
    Q39: true,
    Q40: false,
    Q41: true,
    Q42: true,
    Q43: true,
    Q44: true,
    Q45: true,
    Q46: false,
    Q47: true,
    Q48: true,
    Q49: false,
    Q50: true,
    Q51: true,
    Q52: true,
    Q53: true,
    Q54: true,
    Q55: false,
    Q56: true,
    Q57: false,
    Q58: true,
    Q59: false,
    Q60: false,
    Q61: true,
    Q62: false,
    Q63: true,
    Q64: false,
    Q65: true,
    Q66: false,
    Q67: false,
    Q68: false,
    Q69: true,
    Q70: false,
    Q71: false,
    Q72: false,
    Q73: false,
    Q74: true,
    Q75: true,
    Q76: true,
    Q77: false,
    Q78: true,
    Q79: true,
    Q80: false,
    Q81: true,
    Q82: true,
    Q83: true,
    Q84: true,
    Q85: true,
    Q86: true,
    Q87: true,
    Q88: false,
    Q89: true,
    Q90: false,
    Q91: true,
    Q92: false,
    Q93: false,
    Q94: true,
    Q95: true,
    Q96: true,
    Q97: true,
    Q98: true,
    Q99: true,
    Q100: true,
    Q101: false,
    Q102: true,
    Q103: true,
    Q104: true,
    Q105: true,
    Q106: false,
    Q107: true,
    Q108: false,
    Q109: true,
    Q110: true,
    Q111: true,
    Q112: true,
    Q113: false,
    Q114: true,
    Q115: false,
    Q116: true,
    Q117: true,
    Q118: false,
    Q119: true,
    Q120: true,
    Q121: false,
    Q122: false,
    Q123: false,
    Q124: false,
    Q125: false,
    Q126: false,
    Q127: true,
    Q128: false,
    Q129: false,
    Q130: false,
    Q131: true,
    Q132: true,
    Q133: true,
    Q134: true,
    Q135: true,
    Q136: true,
    Q137: true,
    Q138: false,
    Q139: true,
    Q140: true,
    Q141: false,
    Q142: false,
    Q143: true,
    Q144: false,
  },
};

export const getQTableColumns = () => {
  const key = "Q";
  const tColumns = [];
  for (let i = 1; i < QTotal + 1; i++) {
    tColumns.push(`${key}.${i}_RESP`, `${key}.${i}_SCR`, `${key}.${i}_RT`);
  }
  tColumns.push(`${key}_SCR`, `${key}_RT`);
  return tColumns;
};

export const getQTableData = (answers: Answer[]) => {
  const tdata = [];
  const key = "Q";
  let totalDuration = 0;
  let totalScore = 0;
  for (let i = 1; i < QTotal + 1; i++) {
    const k = `${key}${i}`;
    const findAnswer = answers?.find((i) => i.questionId === k);
    const answer = findAnswer?.answer;
    const score = QSection.Q[k] ? Number(answer) : 6 - Number(answer);
    totalScore += score;
    tdata.push(findAnswer?.answer, score, findAnswer?.duration || 0);
  }
  tdata.push(totalScore, totalDuration);
  return tdata;
};
