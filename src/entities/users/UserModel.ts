import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: String,
  username: String,
  password: String,
});

const User = model("User", userSchema);
export default User;
