import { hashPassword } from "../auth/bcrypt";
import User from "../models/userModel";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { generateToken } from "../auth/jwt";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../email/sendVerificationCode";
dotenv.config();
const signUpInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})
const signUpProcedure = publicProcedure
.input(signUpInputSchema)
.mutation(async( { input }) => {
    const { email, password } = input;
    console.log(email, password);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        const user = new User({
            email: email, 
            password: await hashPassword(password),
            isVerified: false,
            verificationCode: verificationCode,
        });

        try {
            await sendVerificationEmail(email, verificationCode);
        } catch (error) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
        await user.save();
        return generateToken(user);
    } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
})

export default signUpProcedure;