import { protectedProcedure } from "../trpc";
import {z } from "zod";
import { TRPCError } from "@trpc/server";
const verifyAccountProcedure = protectedProcedure
.input(z.object({ verificationCode: z.string().length(6)}))
.mutation(async( { ctx, input }) => {
    const { user } = ctx;
    const { verificationCode } = input;

    if(user.verificationCode !== verificationCode && !user.isVerified){
        throw new TRPCError({code: "FORBIDDEN" });
    }
    try {
        user.isVerified = true;
        user.verificationCode = "null";
        await user.save()
    } catch (error) {
        throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
    }
    return true;
})

export default verifyAccountProcedure;