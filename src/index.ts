import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { createExpressMiddleware} from "@trpc/server/adapters/express"
import { appRouter } from "./routes";
import { createContext } from "./trpc";
import mongoose from "mongoose";
import invoke from "./routes/express/invoke";
import User from "./models/userModel";
import Email from "./models/emailModel";
dotenv.config();


const clearDB = async () =>{
    await User.deleteMany({});
    await Email.deleteMany({});
    console.log("!!! DB Cleared !!!");
} 

(async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Failed to connect to MongoDB`, error);
        process.exit(1);
    }    
})();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({message: "Hacker?"});
})

app.use("/invoke", invoke)
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext: createContext }))

app.listen(PORT, () => console.log(`Listenig on port: ${PORT}`));

export default app;