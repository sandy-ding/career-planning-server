import jwt from "jsonwebtoken";

export async function parseContextFromHeaders(context) {
  const { req } = context;
  const { authorization } = req.headers;
  if (authorization?.startsWith("Bear ")) {
    const token = authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return { userId };
  }
  return {
    userId: undefined,
  };
}
