"use client";
import { motion } from "motion/react";
import { Sparkles, Link as LinkIcon } from "lucide-react";

export const Hero = () => (
  <section className="relative px-8 pt-20 pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-desert-storm-950 leading-[1.1] mb-8">
          Deep thought, <br /><span className="italic text-santa-fe-600">digitally archived.</span>
        </h1>
        <p className="text-lg text-desert-storm-700 max-w-lg mb-12 leading-relaxed">
          Transform fragmented notes into a cohesive knowledge base. Archivist uses advanced RAG technology to synthesize your research into actionable insights.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="santa-fe-gradient text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all hover:cursor-pointer active:translate-y-0">
            Begin Your Research
          </button>
          <button className="px-10 py-4 rounded-full text-lg font-semibold border-2 border-desert-storm-200 hover:bg-desert-storm-100 transition-colors hover:cursor-pointer">
            View Demo
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full md:w-1/2 relative aspect-square"
      >
        <div className="absolute inset-0 bg-santa-fe-600/5 rounded-full blur-[100px]"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-xl rotate-12 bg-white ambient-shadow p-8 flex flex-col justify-between border border-desert-storm-200 paper-edge">
            <div className="flex justify-between items-start">
              <Sparkles className="text-santa-fe-600" size={40} />
              <div className="w-12 h-12 rounded-full bg-siam-500/10 flex items-center justify-center text-siam-500">
                <LinkIcon size={24} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-3/4 bg-desert-storm-100 rounded-full"></div>
              <div className="h-2 w-1/2 bg-desert-storm-100 rounded-full"></div>
              <div className="h-2 w-5/6 bg-desert-storm-100 rounded-full"></div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-64 h-48 rounded-xl -rotate-6 bg-desert-storm-100 ambient-shadow p-6 border border-desert-storm-200 paper-edge">
            <div className="h-32 w-full rounded-lg bg-white mb-4 overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale opacity-50"
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80"
                alt="Classic library book shelves"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-2 w-2/3 bg-desert-storm-200 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
