import { Types } from "mongoose";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Profile {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => Number, { nullable: true })
  createdOn?: number;

  @Field(() => Number, { nullable: true })
  updatedAt?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  yearOfBirth?: string;

  @Field(() => String, { nullable: true })
  nation?: string;

  @Field(() => String, { nullable: true })
  schoolRoll?: string;

  @Field(() => String, { nullable: true })
  studentType?: string;

  @Field(() => String, { nullable: true })
  school?: string;

  @Field(() => String, { nullable: true })
  grade?: string;

  @Field(() => String, { nullable: true })
  colorVision?: string;

  @Field(() => String, { nullable: true })
  vision?: string;

  @Field(() => String, { nullable: true })
  speciality?: string;

  @Field(() => String, { nullable: true })
  interest?: string;

  @Field(() => String, { nullable: true })
  fathersYearOfBirth?: string;

  @Field(() => String, { nullable: true })
  fathersWork?: string;

  @Field(() => String, { nullable: true })
  fathersEducation?: string;

  @Field(() => String, { nullable: true })
  fathersMonthlyIncome?: string;

  @Field(() => String, { nullable: true })
  mothersYearOfBirth?: string;

  @Field(() => String, { nullable: true })
  mothersWork?: string;

  @Field(() => String, { nullable: true })
  mothersEducation?: string;

  @Field(() => String, { nullable: true })
  mothersMontylyIncome?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  telephone?: string;

  @Field(() => String, { nullable: true })
  address?: string;
}
