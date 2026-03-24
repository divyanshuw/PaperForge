import ColoredLine from "@/components/Coloredhline";
import Card from "@/components/SignupCard";
import SocialLoginIcons from "@/components/SocialLoginIcons";
import Link from "next/link";
import SigninFooter from "@/components/SignupFooter";

export default function Signin() {
    return (
        <div className="flex flex-col gap-2">
            {/* Header section */}
            <div className="absolute flex justify-between items-center top-0 left-0 z-1 w-full px-10 py-2 font-serif">
                <div className="text-2xl italic text-santa-fe-600">
                    Archivist
                </div>
                <div className="text-md ">
                    Already have an account? <Link href="/signin" className="text-santa-fe-600">Sign in</Link>
                </div>
            </div>   
            {/* Main content section */}
            <div className="min-h-screen flex items-center justify-around bg-desert-storm-100 px-10 gap-10 z-0">
            <div className="w-[30%]">
                <Card></Card>
            </div>
            <div className="shadow-xl flex flex-col gap-6 p-10 rounded-[15px] bg-desert-storm-50 h-[95%]">
                <div className="text-4xl font-bold text-santa-fe-600 font-dmserif text-left">
                    Begin your own Archive  
                </div>
                <div className="flex flex-col gap-4">
                    <input placeholder="email" className="focus:outline-none border-desert-storm-300 border px-4 py-2 rounded-md">
                    </input>
                    <input type="password" placeholder="password" className="focus:outline-none border-desert-storm-300 border px-4 py-2 rounded-md">
                    </input>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="tnc"></input>
                    <label htmlFor="tnc" className="text-xs text-desert-storm-900">I agree to the <span className="text-santa-fe-600 underline">terms & conditions</span></label>
                </div>
                <button className="santa-fe-gradient text-white px-6 py-2.5 rounded-full font-medium flex items-center justify-center hover:shadow-lg transition-all active:scale-95 hover:cursor-pointer">Log In</button>
                <ColoredLine color="#2b231f"></ColoredLine>
                <div className="text-sm text-center">Or login with</div>
                <SocialLoginIcons />
                <div className="text-xs text-desert-storm-800 text-center">
                    if you don't have an account, <Link href="/signup" className="text-santa-fe-600 underline">create an account</Link>
                </div>
            </div>
        </div>
        {/* footer section */}
        <SigninFooter></SigninFooter>
        </div>
        
    )
}