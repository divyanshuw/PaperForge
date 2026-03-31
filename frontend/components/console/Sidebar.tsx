import { LayoutGrid, FileText, FolderOpen, Sparkles, HistoryIcon, Upload, HelpCircle, Settings } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-[220px] h-full flex flex-col bg-siam-50 border-r border-desert-storm-200 p-4 shrink-0">
      {/* Branding */}
      <div className="mb-8 pl-1">
        <h1 className="font-dmserif text-xl text-desert-storm-950 italic">Archivist</h1>
        <p className="text-[10px] text-desert-storm-600 font-medium">Digital Archivist</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <a href="#" className="flex items-center gap-2 px-3 py-2 bg-white text-santa-fe-700 text-xs font-semibold rounded-lg shadow-sm border border-santa-fe-100">
          <LayoutGrid size={14} className="text-santa-fe-500" />
          Workspace
        </a>
        <a href="#" className="flex items-center gap-2 px-3 py-2 text-desert-storm-700 text-xs hover:bg-white hover:text-desert-storm-900 rounded-lg transition-all font-medium">
          <FileText size={14} />
          Sources
        </a>
        <a href="#" className="flex items-center gap-2 px-3 py-2 text-desert-storm-700 text-xs hover:bg-white hover:text-desert-storm-900 rounded-lg transition-all font-medium">
          <FolderOpen size={14} />
          Collections
        </a>
        <a href="#" className="flex items-center gap-2 px-3 py-2 text-desert-storm-700 text-xs hover:bg-white hover:text-desert-storm-900 rounded-lg transition-all font-medium">
          <Sparkles size={14} />
          Insights
        </a>
        <a href="#" className="flex items-center gap-2 px-3 py-2 text-desert-storm-700 text-xs hover:bg-white hover:text-desert-storm-900 rounded-lg transition-all font-medium">
          <HistoryIcon size={14} />
          History
        </a>
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 text-xs bg-santa-fe-600 hover:bg-santa-fe-700 text-white py-2 px-3 rounded-full font-medium transition-colors shadow-md">
          Upload Documents
        </button>
        <div className="pt-2 space-y-0.5">
          <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-xs text-desert-storm-600 hover:text-desert-storm-900 transition-colors font-medium">
            <HelpCircle size={14} />
            Help
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-xs text-desert-storm-600 hover:text-desert-storm-900 transition-colors font-medium">
            <Settings size={14} />
            Settings
          </a>
        </div>
      </div>
    </aside>
  );
};
