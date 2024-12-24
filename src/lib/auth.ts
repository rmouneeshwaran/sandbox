import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Generate a JWT token

export const generateToken = (payload: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "d4bde82c8ef726b74b6f9bc08e41e8ff34f2157dbf84aef4c645c4f69b29c70a88ff407c620d01e9f9a9d74235878b7fdd4a81a7f24e3b8d1aa8d50191e6e314", // Use a secure key
      { expiresIn: "1h" }, // Token expiry time
      (err, token) => {
        if (err) reject(err);
        resolve(token as string);
      }
    );
  });
};

// Verify a JWT token
export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Narrowing the type
    if (typeof decoded === "object" && decoded !== null) {
      return decoded as JwtPayload; // Return the decoded object
    }
    return null; // Return null if it's not an object
  } catch (err) {
    return null; // Return null if verification fails
  }
};
