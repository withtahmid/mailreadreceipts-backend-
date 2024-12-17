import { UserSchema } from "../models/userModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user: UserSchema) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
}
export const authenticateToken = (token: string) => {
    if (!token) return null;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as string;
      return decoded;
    } catch (e) {
      // console.log(e);
      return null;
    }
  };
