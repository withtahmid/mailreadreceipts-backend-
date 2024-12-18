import { Document, model, Schema, Types } from "mongoose";

interface InvokeSchema{
    time: number;
    browser: string;
}
export interface EmailSchemaFrontEnd {
    _id: string; 
    label: string;
    createTime: number;
    invokes: InvokeSchema[];
}


export interface EmailSchema extends Omit<EmailSchemaFrontEnd, "_id">, Document {
    _id: Types.ObjectId;
}


const emailModel = new Schema<EmailSchema>({
    label: { type: String, required: true },
    createTime: { type: Number, required: true, default: Date.now },
    invokes: [{ time:{ type: Number, require: true }, browser: { type: String } }],
    // lastCount: { type: Number, required: true }
});
const Email = model("Email", emailModel);
export default Email;