import { Document, Types, Schema, model} from "mongoose";
import { EmailSchema } from "./emailModel";

export interface UserSchema extends Document{
    _id: Types.ObjectId;
    email: string;
    password: string;
    isVerified: boolean;
    emails: EmailSchema[];
    verificationCode: string;
}
const userModel = new Schema<UserSchema>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    verificationCode: { type: String, required: true },
    emails: [ { type: Types.ObjectId, ref: "Email" } ]    
});
const User = model("User", userModel);
export default User;