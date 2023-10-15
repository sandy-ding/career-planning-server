import { Resolver, Arg, Mutation } from "type-graphql";
import { User, Token } from "./User";
import { UserLoginRequest } from "./UserLoginRequest";
import jwt from "jsonwebtoken";

@Resolver(User)
export class UserResolver {
  // private generateAccessToken(user) {
  //   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // }
  // @Mutation(() => Token)
  // public async login(
  //   @Arg("input") { username }: UserLoginRequest
  // ): Promise<Token> {
  //   const accessToken = this.generateAccessToken({ username });
  //   return { accessToken };
  // }
}
