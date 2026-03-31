import { Search, LayoutGrid, FolderHeart, History } from "lucide-react";

export const CommandCenter = () => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-6 py-4 flex items-center gap-6 ambient-shadow border border-desert-storm-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
    <label className="group flex items-center gap-2 pr-6 border-r border-desert-storm-200 cursor-pointer">
      <Search className="text-santa-fe-600 transition-transform duration-300 group-focus-within:rotate-12 group-focus-within:scale-110" size={18} />
      <input 
        className="bg-transparent border-none focus:outline-none text-sm font-medium w-40 placeholder:text-desert-storm-700/50 transition-all duration-300 focus:w-48 cursor-text" 
        placeholder="Search archive..." 
        type="text" 
      />
    </label>
    <div className="flex items-center gap-4">
      <button className="cursor-pointer text-desert-storm-700 hover:text-santa-fe-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:rotate-6 active:scale-95 active:rotate-0 active:translate-y-0">
        <LayoutGrid size={20} />
      </button>
      <button className="cursor-pointer text-desert-storm-700 hover:text-santa-fe-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:-rotate-6 active:scale-95 active:rotate-0 active:translate-y-0">
        <FolderHeart size={20} />
      </button>
      <button className="cursor-pointer text-desert-storm-700 hover:text-santa-fe-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:rotate-6 active:scale-95 active:rotate-0 active:translate-y-0">
        <History size={20} />
      </button>
    </div>
  </div>
);
