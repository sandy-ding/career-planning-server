import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Token {
  @Field()
  accessToken: string;
}

@ObjectType()
export class User {
  @Field()
  username: string;

  @Field()
  password: string;
}
