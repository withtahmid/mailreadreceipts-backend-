import { verifiedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import Email from "../models/emailModel";
const addEmailProcedure = verifiedProcedure
.input(z.object({ label: z.string().min(3).max(20) }))
.mutation(async( { ctx, input }) => {
    const { user } = ctx;
    const { label } = input;
    const newEmail = new Email({
        label: label,
        createTime: Date.now(),
        invokes: []
    });

    try {
        await newEmail.save();
        user.emails.push(newEmail);
        await user.save()
    } catch (error) {
        throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
    }
    return { _id: newEmail._id as string, label, createTime: newEmail.createTime, invokes: [] };
})

export default addEmailProcedure;