import crypto from "crypto";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cardModel from "../entities/cards/CardModel";

const main = async (size: number = 50) => {
  dotenv.config();

  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.on("error", (e) => console.error(e));
  db.once("open", () => console.log("Connected to database"));

  const cards = [];
  for (let i = 0; i < size; i++) {
    const uuid = crypto.randomUUID().split("-");
    const key = uuid[0];
    const code = uuid[uuid.length - 1];
    cards.push({ key, code });
  }
  const res = await cardModel.insertMany(cards);

  mongoose.connection.close();

  return res;
};

main();
