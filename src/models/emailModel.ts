import { Document, model, Schema } from "mongoose";

interface InvokeSchema{
    time: number;
    os: string;
    browser: string;
    device: string;
}
export interface EmailSchema extends Document{
    label: string;
    createTime: number;
    invokes: InvokeSchema[];
}

const emailModel = new Schema<EmailSchema>({
    label: { type: String, required: true },
    createTime: { type: Number, required: true, default: Date.now },
    invokes: [{ time:{ type: Number, require: true }, os: { type: String }, browser: { type: String }, device: { type: String } }]  
});
const Email = model("Email", emailModel);
export default Email;