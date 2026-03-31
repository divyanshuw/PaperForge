"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut, Layers } from "lucide-react";
import { FloatingInputBar } from "./FloatingInputBar";
import Tile, { TileProps } from "./Tile";

const INITIAL_TILES: TileProps[] = [
  {
    id: "1",
    type: "concept",
    category: "Defining: Fluid Curation",
    title: "Ontological Networks",
    description: "Physical spatiality in traditional libraries as a precursor to digital tactile interfaces.",
    content: "Physical spatiality in traditional libraries as a precursor to digital tactile interfaces.",
    x: 100,
    y: 80
  },
  {
    id: "2",
    type: "insight",
    category: "Related Insight",
    description: "The \"Desk\" metaphor actually hinders deep analysis by forcing 2D file hierarchies.",
    content: "The \"Desk\" metaphor actually hinders deep analysis by forcing 2D file hierarchies.",
    x: 420,
    y: 240
  }
];

export const Canvas = () => {
  const [tiles, setTiles] = useState<TileProps[]>(INITIAL_TILES);

  const removeTile = (id: string) => {
    setTiles(tiles.filter(t => t.id !== id));
  };

  return (
    <div 
      className="flex-1 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #dcd6cc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundColor: '#fbfbf9'
      }}
    >
      {/* Top Controls */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="glass-card shadow-sm rounded-full flex items-center gap-1.5 px-1.5 py-1.5 border border-desert-storm-200 bg-white/60 backdrop-blur-md">
          <button className="p-1.5 hover:bg-desert-storm-100 rounded-full transition-colors">
            <ZoomIn size={14} className="text-desert-storm-700" />
          </button>
          <button className="p-1.5 hover:bg-desert-storm-100 rounded-full transition-colors">
            <ZoomOut size={14} className="text-desert-storm-700" />
          </button>
          <div className="h-4 w-px bg-desert-storm-200 mx-1" />
          <span className="text-xs font-medium text-desert-storm-500 px-1 min-w-[70px] text-center">
            Canvas: 100%
          </span>
        </div>
        
        <button className="glass-card shadow-sm rounded-full p-2.5 border border-desert-storm-200 bg-white/60 hover:bg-white transition-colors">
          <Layers size={14} className="text-desert-storm-700" />
        </button>
      </div>

      {/* Connection line (Static SVG) */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full z-0" aria-hidden="true">
        <path 
          d="M 230 250 Q 380 200 450 350" 
          fill="none" 
          stroke="#ce8669" 
          strokeWidth="1.5" 
          strokeDasharray="4 4" 
        />
      </svg>

      {/* Dynamic Component Cards */}
      {tiles.map(tile => (
        <Tile 
          key={tile.id} 
          {...tile} 
          onClose={() => removeTile(tile.id)} 
        />
      ))}

      {/* Bottom Floating Bar */}
      <FloatingInputBar />
    </div>
  );
};
