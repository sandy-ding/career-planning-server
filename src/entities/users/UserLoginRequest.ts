import { Field, InputType } from "type-graphql";

@InputType("UserLoginRequest")
export class UserLoginRequest {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
