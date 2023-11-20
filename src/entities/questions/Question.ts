import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Option {
  @Field()
  value: string;

  @Field()
  label: string;
}

@ObjectType()
export class Question {
  @Field()
  _id: string;

  @Field({ nullable: true })
  category1: string;

  @Field({ nullable: true })
  category2: string;

  @Field({ nullable: true })
  category3: string;

  @Field({ nullable: true })
  category4: string;

  @Field({ nullable: true })
  isTest: boolean;

  @Field()
  label: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [Option], { nullable: true })
  options: Option[];

  @Field({ nullable: true })
  answer: string;

  @Field({ nullable: true })
  fileUrl: string;

  @Field({ nullable: true })
  type: string;
}
