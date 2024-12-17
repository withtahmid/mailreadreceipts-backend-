import express, { Request, Response } from "express";
import useragent from "useragent";
import axios from "axios";
import Email from "../../models/emailModel";
const router = express.Router();
router.get("/:emailId", async (req: Request, res: Response) => {
    const emailId = req.params.emailId;
    const ua = useragent.parse(req.headers['user-agent']);
    console.log(emailId)
    const browser = ua.family ?? "Unknown";
    const os = ua.os.family ?? "Unknown";
    const device = ua.device.family ?? "Unknown";
    const time = Date.now();
    try {
        const email = await Email.findById(emailId);
        if(email){
            email.invokes.push({time, os, browser, device });
            email.save();
        }
    } catch (error) {
        console.error(error)
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
        res.status(500).send("Failed to fetch the image.");
    }
});

export default router;
