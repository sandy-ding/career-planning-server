import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Token {
  @Field()
  accessToken: string;
}

@ObjectType()
export class Card {
  @Field()
  _id: string;

  @Field()
  code: string;

  @Field()
  key: string;

  @Field({ nullable: true })
  isRedeemed: boolean;
}
