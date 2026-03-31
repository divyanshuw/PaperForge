import { BookOpen } from "lucide-react";

export const DocumentViewer = () => {
  return (
    <div className="w-[340px] bg-white border-r border-desert-storm-200 shadow-sm h-full overflow-y-auto shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 text-santa-fe-600 text-[10px] font-bold tracking-wider mb-3 uppercase">
          <BookOpen size={12} />
          Source Document
        </div>

        <h2 className="font-dmserif text-2xl text-desert-storm-950 leading-[1.2] mb-3">
          The Evolution of Digital Archiving in the 21st Century
        </h2>

        <p className="text-desert-storm-500 italic text-[11px] mb-6">
          Dr. Alistair Vance, 2023 &bull; Page 42 of 128
        </p>

        <div className="bg-desert-storm-50/50 rounded-2xl p-5 border border-desert-storm-100/50 relative">
          <p className="text-desert-storm-800 text-[13px] leading-relative mb-4 font-serif">
            <span className="float-left text-4xl font-dmserif text-santa-fe-600 leading-[0.8] pr-2.5 mt-1.5">
              I
            </span>
            n the wake of rapid technological expansion, the preservation of digital artifacts has moved beyond mere storage. We are entering an era of "Fluid Curation," where the relationship between data points is more significant than the data itself.
          </p>

          <p className="text-desert-storm-800 text-[13px] leading-relaxed mb-5 font-serif">
            Traditional databases fail to capture the serendipity of human intuition. By employing tactile interface paradigms, researchers can navigate complex ontological networks through spatial arrangement rather than linear indexing.
          </p>

          <blockquote className="border-l-[3px] border-santa-fe-400 bg-santa-fe-50/40 pl-4 py-3 mb-5 italic text-desert-storm-700 font-serif text-[13px] leading-relaxed">
            "The archivist of the future is not a gatekeeper, but a cartographer of meaning."
          </blockquote>

          <p className="text-desert-storm-800 text-[13px] leading-relaxed font-serif">
            As we look toward the horizon of 2030, the integration of generative AI into archival systems will empower users...
          </p>
        </div>
      </div>
    </div>
  );
};
