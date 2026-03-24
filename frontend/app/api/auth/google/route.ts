import { NextResponse } from "next/server";

export async function GET(){

    const clientId = process.env.GOOGLE_CLIENT_ID;

    const redirectUrl = "http://localhost:3000/api/auth/callback";

    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
        client_id: clientId || " ",
        redirect_uri: redirectUrl,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent"
    })

    return NextResponse.redirect(url);
}

