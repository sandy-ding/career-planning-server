import { Schema, model } from "mongoose";

const cardSchema = new Schema({
  _id: String,
  code: String,
  key: String,
  isRedeemed: Boolean,
  udpatedAt: Number,
});

const Card = model("Card", cardSchema);
export default Card;
