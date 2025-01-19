import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import useragent from "useragent";
import axios from "axios";
import ReceiptEmail from "./emailModel";

dotenv.config();

(async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Failed to connect to MongoDB`, error);
        process.exit(1);
    }    
})();

const invoke = async(req:Request) => {
    const emailId = req.params.emailId;
    const ua = useragent.parse(req.headers['user-agent']);
    const browser = ua.family ?? "Unknown";
    const time = Date.now();
    try {
        const email = await ReceiptEmail.findById(emailId);
        if(email){
            email.invokes.push({time, browser });
            email.save();
        }
    } catch (error) {
        console.error(error)
    }
    
}

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/:emailId", async (req: Request, res: Response) => {
    try {
        invoke(req);
    } catch (error) {
        console.error("Error fetching image:", error);
    }
    try {
        const imageResponse = await axios.get(
            "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png",
            { responseType: "stream" }
        );
        res.setHeader("Content-Type", "image/png");
        imageResponse.data.pipe(res);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(200).send();
    }
});
app.listen(PORT, () => console.log(`Listenig on port: ${PORT}`));
export default app;