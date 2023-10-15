"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const RecipeResolver_1 = require("./resolvers/recipes/RecipeResolver");
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [RecipeResolver_1.RecipeResolver],
    });
    mongoose_1.default.connect("mongodb://localhost:27017/career-planning");
    const db = mongoose_1.default.connection;
    db.on("error", (e) => console.error(e));
    db.once("open", () => console.log("Connected to database"));
    const server = new apollo_server_1.ApolloServer({
        schema,
    });
    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
    // other initialization code, like creating http server
}
bootstrap(); // actually run the async function
