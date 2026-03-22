import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { CommandCenter } from "@/components/CommandCenter";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-santa-fe-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
      <CommandCenter />
    </div>
  );
}
