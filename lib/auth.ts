import jwt from "jsonwebtoken";

export function getUserFromRequest(req: any) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  const token = auth.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    return payload.userId;
  } catch {
    throw new Error("Invalid token");
  }
} 