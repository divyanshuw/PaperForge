import { Mic, Paperclip, Send } from "lucide-react";

export const FloatingInputBar = () => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div className="glass-card shadow-lg rounded-full px-3 py-2 flex items-center gap-3 w-[450px] border border-desert-storm-200/50">
        <input 
          type="text" 
          placeholder="Ask the archive anything..." 
          className="flex-1 bg-transparent border-none outline-none text-xs text-desert-storm-800 placeholder:text-desert-storm-400 font-medium px-3 w-full"
        />
        <button className="text-desert-storm-400 hover:text-santa-fe-500 transition-colors p-1.5">
          <Mic size={14} />
        </button>
        <button className="text-desert-storm-400 hover:text-santa-fe-500 transition-colors p-1.5">
          <Paperclip size={14} />
        </button>
        <button className="bg-santa-fe-600 hover:bg-santa-fe-700 text-white p-2 text-sm rounded-full shadow-md transition-transform active:scale-95">
          <Send size={14} />
        </button>
      </div>
      
      <div className="mt-3 flex gap-4 text-[9px] font-bold tracking-widest text-desert-storm-400">
        <button className="hover:text-santa-fe-600 transition-colors">SYNTHESIZE SELECTION</button>
        <span>&bull;</span>
        <button className="hover:text-santa-fe-600 transition-colors">FIND CONTRADICTIONS</button>
        <span>&bull;</span>
        <button className="hover:text-santa-fe-600 transition-colors">DRAFT SUMMARY</button>
      </div>
    </div>
  );
};
