import NextAuth from "next-auth"
import { getToken } from "next-auth/jwt"
import Github from "next-auth/providers/github"

const handler = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            if(account){
                token.accessToken = account.access_token
            }
            return token
        },
        async session({session, token, user}){
            if(token.accessToken){
                session.accessToken = token.accessToken
            }
            return session
        }
    },
})



export { handler as GET, handler as POST }