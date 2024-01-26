import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Card, Token } from "./Card";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cardModel from "./CardModel";
import { CardVerifyRequest } from "./CardVerifyRequest";

@Resolver(Card)
export class CardResolver {
  private generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  }

  @Query(() => [Card])
  async generateCards(@Arg("size") size: number = 10) {
    const cards = [];
    for (let i = 0; i < size; i++) {
      const uuid = crypto.randomUUID().split("-");
      const key = uuid[0];
      const code = uuid[uuid.length - 1];
      cards.push({ key, code });
    }
    const res = await cardModel.insertMany(cards);
    return res;
  }

  @Mutation(() => Token)
  public async login(
    @Arg("input") { code, key }: CardVerifyRequest
  ): Promise<Token> {
    const card = await cardModel.findOne({ code, key });

    if (!card.isRedeemed) {
      await cardModel.findOneAndUpdate(
        { code, key },
        { isRedeemed: true, updatedAt: Date.now() }
      );
    }
    const accessToken = this.generateAccessToken({ userId: card._id });
    return { accessToken };
  }
}
