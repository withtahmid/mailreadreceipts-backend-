import { router } from "../trpc";
import addEmailProcedure from "./addEmail";
import deleteEmailProcedure from "./deleteOne";
import fetchUserProcedure from "./fetchUser";
import loginProcedure from "./login";
import signUpProcedure from "./signup";
import verifyAccountProcedure from "./verifyAccount";

export const appRouter = router({
    login: loginProcedure,
    signup: signUpProcedure,
    fetch: fetchUserProcedure,
    addEmail: addEmailProcedure,
    deleteEmail: deleteEmailProcedure,
    verifyAccount: verifyAccountProcedure,
});

export type AppRouter = typeof appRouter;