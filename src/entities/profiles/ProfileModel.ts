import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  _id: Schema.Types.ObjectId,
  createdOn: Number,
  updatedAt: Number,
  name: String,
  gender: String,
  yearOfBirth: String,
  nation: String,
  schoolRoll: String,
  studentType: String,
  school: String,
  grade: String,
  colorVision: String,
  vision: String,
  speciality: String,
  interest: String,
  fathersYearOfBirth: String,
  fathersWork: String,
  fathersEducation: String,
  fathersMonthlyIncome: String,
  mothersYearOfBirth: String,
  mothersWork: String,
  mothersEducation: String,
  mothersMontylyIncome: String,
  email: String,
  telephone: String,
  address: String,
});

const Profile = model("Profile", profileSchema);
export default Profile;
