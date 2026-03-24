import { Bell, Settings, Plus } from "lucide-react";
import Link from "next/link";

export const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-desert-storm-100/80 backdrop-blur-md flex justify-between items-center px-8 py-4 w-full">
    <div className="text-2xl font-bold italic text-santa-fe-600 font-serif">
      PaperForge
    </div>
    <div className="hidden md:flex items-center gap-8">
      <a className="text-santa-fe-600 font-semibold border-b-2 border-santa-fe-600 font-serif text-lg tracking-tight" href="#">Research</a>
      <a className="text-desert-storm-700 hover:text-santa-fe-600 transition-colors font-serif text-lg tracking-tight" href="#">Library</a>
      <a className="text-desert-storm-700 hover:text-santa-fe-600 transition-colors font-serif text-lg tracking-tight" href="#">Canvas</a>
      <a className="text-desert-storm-700 hover:text-santa-fe-600 transition-colors font-serif text-lg tracking-tight" href="#">Archive</a>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-full transition-colors text-desert-storm-700 hover:bg-desert-storm-200 hover:cursor-pointer active:text-desert-storm-900">
        <Bell size={20} />
      </button>
      <button className="p-2 rounded-full transition-colors text-desert-storm-700 hover:bg-desert-storm-200 hover:cursor-pointer active:text-desert-storm-900">
        <Settings size={20} />
      </button>
      <Link href="/signin">
        <button className="santa-fe-gradient text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 hover:cursor-pointer">
            <Plus size={18} />
            New Project
        </button>
      </Link>

    </div>
  </nav>
);
