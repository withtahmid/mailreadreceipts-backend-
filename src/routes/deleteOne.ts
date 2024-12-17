import { verifiedProcedure} from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import Email from "../models/emailModel";
const deleteEmailProcedure = verifiedProcedure
.input(z.object({ _id: z.string().length(24)}))
.mutation(async( { ctx, input }) => {
    const { user } = ctx;
    const { _id } = input;
    try {
        await Email.findByIdAndDelete(_id);
        user.emails = user.emails.filter(e => e._id !== _id);
        await user.save()
    } catch (error) {
        throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
    }
    return _id;
});
export default deleteEmailProcedure;