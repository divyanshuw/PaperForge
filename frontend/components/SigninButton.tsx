"use client";

import {signIn} from "next-auth/react";

export default function SigninButton(){
    return(
    <button className="santa-fe-gradient text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 hover:cursor-pointer" onClick={() => signIn("google")}>
        Sign In with google
    </button>
    )
   
}