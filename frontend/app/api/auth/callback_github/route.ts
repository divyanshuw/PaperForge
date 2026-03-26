import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(req:NextRequest){
    const code = req.nextUrl.searchParams.get("code");

    
    const tokenData = await fetch("https://github.com/login/oauth/access_token",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: `${ process.env.BASE_URL}/api/auth/callback_github`,
            grant_type: "authorization_code",
        }),
    })

    const tokenjson = await tokenData.json();
    const access_token = tokenjson.access_token;

    const userRes = await fetch("https://api.github.com/user",{
        headers:{
            Authorization: `Bearer ${access_token}`,
        }
    })

    const userData = await userRes.json();

    const emailRes = await fetch("https://api.github.com/user/emails",{
        headers:{
            Authorization: `Bearer ${access_token}`,
        }
    })

    const emailData = await emailRes.json();

    const email = emailData.find((email: any) => email.primary && email.verified);

    const user = {
        name: userData.name,
        email: email.email,
        image: userData.avatar_url,
    }

    const session = {
        user,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
    
    const cookiestore = await cookies();

    cookiestore.set("session",JSON.stringify(session),{
        httpOnly:true,
        secure: true,
        maxAge: 60*60*24*7,
        path: "/",
    })

    return NextResponse.redirect(`${process.env.BASE_URL}/console`);

}