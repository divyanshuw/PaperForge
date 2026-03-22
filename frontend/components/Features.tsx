import { motion } from "motion/react";
import { FileText, BrainCircuit, Database, UploadCloud, CheckCircle2 } from "lucide-react";

export const Features = () => (
  <section className="bg-desert-storm-100 py-32 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for the modern intellectual.</h2>
        <p className="text-desert-storm-700 max-w-2xl">We focus on the tactile experience of organization. No clutter, just clarity.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-7 bg-white rounded-xl p-10 ambient-shadow paper-edge"
        >
          <div className="flex flex-col h-full">
            <FileText className="text-santa-fe-600 mb-6" size={40} />
            <h3 className="text-3xl font-bold mb-4">Intelligent Retrieval (RAG)</h3>
            <p className="text-desert-storm-700 mb-8 max-w-md">Your documents aren't just files; they are a living dialogue. Archivist understands the context of your entire library to answer deep research queries.</p>
            <div className="mt-auto bg-desert-storm-100 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-santa-fe-600/10 flex items-center justify-center text-santa-fe-600">
                  <BrainCircuit size={14} />
                </div>
                <div className="flex-1 h-2 bg-white rounded-full"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-siam-500/10 flex items-center justify-center text-siam-500">
                  <Database size={14} />
                </div>
                <div className="flex-1 h-2 bg-white rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-5 bg-white rounded-xl p-10 ambient-shadow paper-edge flex flex-col text-center items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-desert-storm-100 flex items-center justify-center mb-6">
            <UploadCloud className="text-santa-fe-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Seamless Ingestion</h3>
          <p className="text-desert-storm-700 text-sm px-4">PDFs, EPUBs, and handwritten scans. We process it all with zero friction.</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="md:col-span-12 bg-white rounded-xl p-12 ambient-shadow paper-edge relative overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h3 className="text-4xl font-bold mb-6 italic">The Relate Canvas</h3>
              <p className="text-desert-storm-700 text-lg leading-relaxed mb-8">
                A boundless space to map connections. Drag document snippets, synthesize themes, and watch the Archivist suggest links you might have missed.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-santa-fe-600" size={20} />
                  <span className="font-medium">Non-linear spatial organization</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-santa-fe-600" size={20} />
                  <span className="font-medium">Automated theme clustering</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-desert-storm-100 p-6 rounded-lg ambient-shadow rotate-2 group-hover:rotate-0 transition-transform duration-500 paper-edge">
                <p className="text-xs font-serif italic mb-2 text-santa-fe-600">Source: Heidegger (1927)</p>
                <div className="h-2 w-full bg-white rounded-full mb-2"></div>
                <div className="h-2 w-3/4 bg-white rounded-full"></div>
              </div>
              <div className="bg-desert-storm-100 p-6 rounded-lg ambient-shadow -rotate-3 group-hover:rotate-0 transition-transform duration-500 mt-8 paper-edge">
                <p className="text-xs font-serif italic mb-2 text-santa-fe-600">Source: Merleau-Ponty</p>
                <div className="h-2 w-full bg-white rounded-full mb-2"></div>
                <div className="h-2 w-5/6 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-santa-fe-600/5 blur-3xl rounded-full translate-x-1/2"></div>
        </motion.div>
      </div>
    </div>
  </section>
);
