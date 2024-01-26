import { Field, InputType } from "type-graphql";

@InputType("ProfileMutationRequest")
export class ProfileMutationRequest {
  @Field(() => String)
  name: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  yearOfBirth: string;

  @Field(() => String)
  nation: string;

  @Field(() => String)
  schoolRoll: string;

  @Field(() => String)
  studentType: string;

  @Field(() => String)
  school: string;

  @Field(() => String)
  grade: string;

  @Field(() => String)
  colorVision: string;

  @Field(() => String)
  vision: string;

  @Field(() => String, { nullable: true })
  speciality: string;

  @Field(() => String, { nullable: true })
  interest: string;

  @Field(() => String)
  fathersYearOfBirth: string;

  @Field(() => String)
  fathersWork: string;

  @Field(() => String)
  fathersEducation: string;

  @Field(() => String)
  fathersMonthlyIncome: string;

  @Field(() => String)
  mothersYearOfBirth: string;

  @Field(() => String)
  mothersWork: string;

  @Field(() => String)
  mothersEducation: string;

  @Field(() => String)
  mothersMontylyIncome: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String)
  telephone: string;

  @Field(() => String, { nullable: true })
  address: string;
}
