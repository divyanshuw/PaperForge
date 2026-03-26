import { NextResponse } from "next/server";

export async function GET(){
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUrl = "http://localhost:3000/api/auth/callback_github";
    const state = crypto.randomUUID();
    const url = "https://github.com/login/oauth/authorize?" + new URLSearchParams({
        client_id: clientId || " ",
        redirect_uri: redirectUrl,
        scope: "user:email",
        state: state,
    })
    return NextResponse.redirect(url);
}