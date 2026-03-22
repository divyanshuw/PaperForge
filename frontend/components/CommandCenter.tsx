import { Search, LayoutGrid, FolderHeart, History } from "lucide-react";

export const CommandCenter = () => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-6 py-4 flex items-center gap-6 ambient-shadow border border-desert-storm-200">
    <div className="flex items-center gap-2 pr-6 border-r border-desert-storm-200">
      <Search className="text-santa-fe-600" size={18} />
      <input 
        className="bg-transparent border-none focus:outline-none text-sm font-medium w-40 placeholder:text-desert-storm-700/50" 
        placeholder="Search archive..." 
        type="text" 
      />
    </div>
    <div className="flex items-center gap-4">
      <button className="text-desert-storm-700 hover:text-santa-fe-600 transition-colors">
        <LayoutGrid size={20} />
      </button>
      <button className="text-desert-storm-700 hover:text-santa-fe-600 transition-colors">
        <FolderHeart size={20} />
      </button>
      <button className="text-desert-storm-700 hover:text-santa-fe-600 transition-colors">
        <History size={20} />
      </button>
    </div>
  </div>
);
