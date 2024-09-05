import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        accessToken?: any
        user: {
            id?: string
        } & DefaultSession["user"]
    }

    interface JWT {
        accessToken?: string
        id?: string
    }
}