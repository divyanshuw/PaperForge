import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
import { POST } from "../[...nextauth]/route";

export async function GET(req: NextRequest){
    const code = req.nextUrl.searchParams.get("code");
    
    const token = await fetch("https://oauth2.googleapis.com/token",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${ process.env.GOOGLE_REDIRECT_URL}/api/auth/callback`,
            grant_type: "authorization_code",
        }),
    })

    const tokenData = await token.json();

    const userRes = await fetch("https://www.googlapis.com/oauth2/v3/userinfo",{
        headers:{
            Authorization: `Bearer ${tokenData.access_token}`
        },
    });

    const userdata = await userRes.json();
    
    // Session
    const session = {
        email: userdata.email,
        name: userdata.name,
        image: userdata.picture,
        id: userdata.sub,
    }

    const cookieStore =await cookies();

    cookieStore.set("session",JSON.stringify(session),{
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.redirect(`${process.env.BASE_URL}/console`)
}   