import jwt from "jsonwebtoken";

const JWT_SECRET = "Password123";

export function generateToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "10m",
  });
  return token;
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return new Error("Invalid Token");
  }
}
