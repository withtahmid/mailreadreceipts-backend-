import { comparePassword } from "../auth/bcrypt";
import User from "../models/userModel";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { generateToken } from "../auth/jwt";
const signUpInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

const loginProcedure = publicProcedure
.input(signUpInputSchema)
.mutation(async( { input }) => {
    const { email, password } = input;
    const user = await User.findOne({email});
    if(!user){
        throw new TRPCError({ code: "FORBIDDEN", message: "Incorrect Credintials" });
    }

    const isPassValid = await comparePassword(password, user.password);
    if(!isPassValid){
        throw new TRPCError({ code: "FORBIDDEN", message: "Incorrect Credintials" });
    }
    return generateToken(user);
})

export default loginProcedure;