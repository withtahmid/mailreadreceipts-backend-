import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { authenticateToken } from "../auth/jwt";
import User, { UserSchema } from "../models/userModel";
export const createContext = async(opts : CreateExpressContextOptions) => {
    const { req } = opts;
    try {
        var token = req.headers.authorization?.split(' ')[1];
        const _id = authenticateToken(token as string);
        var user =  _id ? (await User.findById(_id).populate("emails").exec() ?? null) : null;
    } catch (error) {
        console.log(`Error to ceate Context`)
        user = null;
    }
    return { user }
}


type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async({ctx, next}) => {
    if(ctx.user === null){
        throw new TRPCError({ code :"UNAUTHORIZED" });
    }
    const result = await next({ ctx: { user: ctx.user as UserSchema }});
    return result;
})
export const verifiedProcedure = t.procedure.use(async({ctx, next}) => {
    if(ctx.user === null || !ctx.user.isVerified){
        throw new TRPCError({ code :"UNAUTHORIZED" });
    }
    const result = await next({ ctx: { user: ctx.user as UserSchema }});
    return result;
})
export const adminProcedure = t.procedure;
