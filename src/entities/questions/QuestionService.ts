import questionModel from "./QuestionModel";

export async function getQuestions({ page, size, category2, category3 }) {
  return questionModel
    .find({
      ...(category2 && { category2 }),
      ...(category3 && { category3 }),
    })
    .sort({ no: 1 })
    .limit(size * 1)
    .skip((page - 1) * size);
}
