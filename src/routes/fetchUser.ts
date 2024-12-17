import { protectedProcedure } from "../trpc";
import { EmailSchema } from "../models/emailModel";
const fetchUserProcedure = protectedProcedure
.query(async( { ctx }) => {
    const { user } = ctx;
    const ret = {
        email: user.email,
        isVerified: user.isVerified,
        emails: user.isVerified ? user.emails as EmailSchema[] : []
    }
    return ret;
})

export default fetchUserProcedure;