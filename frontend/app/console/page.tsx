import { Sidebar } from "@/components/console/Sidebar";
import { DocumentViewer } from "@/components/console/DocumentViewer";
import { Canvas } from "@/components/console/Canvas";

export default function ConsolePage() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-desert-storm-50 font-sans">
      <Sidebar />
      <DocumentViewer />
      <Canvas />
    </div>
  );
}
