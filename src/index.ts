import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { CardResolver } from "./entities/cards/CardResolver";
import { SubmissionResolver } from "./entities/submissions/SubmissionResolver";
import { ProfileResolver } from "./entities/profiles/ProfileResolver";
import { parseContextFromHeaders } from "./auth/parseContextFromHeaders";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  dotenv.config();
  const schema = await buildSchema({
    resolvers: [CardResolver, SubmissionResolver, ProfileResolver],
    validate: { forbidUnknownValues: false },
  });

  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.on("error", (e) => console.error(e));
  db.once("open", () => console.log("Connected to database"));

  const server = new ApolloServer({
    schema,
    context: parseContextFromHeaders,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);

  // other initialization code, like creating http server
}

bootstrap(); // actually run the async function
