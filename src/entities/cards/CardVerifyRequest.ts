import { Field, InputType } from "type-graphql";

@InputType("CardVerifyRequest")
export class CardVerifyRequest {
  @Field(() => String)
  code: string;

  @Field(() => String)
  key: string;
}
