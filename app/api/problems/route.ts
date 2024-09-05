import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    const JWT = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        raw: true
    })
    console.log("JWT IS", JWT)
    const payload = jwt.verify(JWT, process.env.NEXTAUTH_SECRET || "something")
    console.log("PAYLOAD IS", payload);
    return Response.json({
        "jwt_token": JWT
    })
}