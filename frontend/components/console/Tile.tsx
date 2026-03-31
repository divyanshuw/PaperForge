import Image from "next/image";
import { ExternalLink, X } from "lucide-react";

export type TileProps = {
  id: string;
  type: "concept" | "insight";
  category: string;
  title?: string;
  content: string;
  description: string;
  x: number;
  y: number;
  externalRef?: string;
  onClose?: () => void;
};

export default function Tile({
  type,
  category,
  title,
  description,
  x,
  y,
  externalRef,
  onClose
}: TileProps) {
  const isConcept = type === "concept";

  return (
    <div 
      className={`absolute glass-card rounded-2xl p-4 shadow-xl border border-desert-storm-100 bg-white z-10 w-[240px] hover:shadow-2xl transition-shadow`}
      style={{ left: x, top: y }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`${isConcept ? 'bg-siam-100 text-siam-700' : 'bg-santa-fe-50 text-santa-fe-700'} text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase`}>
          {category}
        </span>
        <button 
          onClick={onClose}
          className="text-desert-storm-300 hover:text-desert-storm-600 transition-colors"
        >
          <X size={12} />
        </button>
      </div>
      
      {title && (
        <h3 className="font-dmserif text-lg text-santa-fe-600 italic mb-2">{title}</h3>
      )}
      
      <div className={`text-[11px] text-desert-storm-700 leading-relaxed ${!title ? 'font-medium mt-1' : ''} mb-1`}>
        
      </div>
    </div>
  );
}