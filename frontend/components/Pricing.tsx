export const Pricing = () => (
  <section className="py-32 px-8">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-16">Simple, focused pricing.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-desert-storm-100 p-12 rounded-xl text-left flex flex-col hover:-translate-y-2 transition-transform duration-300 paper-edge">
          <h4 className="text-xs uppercase tracking-widest text-desert-storm-700 mb-4 font-bold">Independent Scholar</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-bold">$12</span>
            <span className="text-desert-storm-700">/month</span>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Up to 500 documents", "Relate Canvas access", "Standard AI Model"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-santa-fe-600" />
                {item}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-full border-2 border-santa-fe-600 text-santa-fe-600 font-bold hover:bg-santa-fe-600/5 transition-colors">
            Select Plan
          </button>
        </div>

        <div className="bg-white p-12 rounded-xl text-left flex flex-col ambient-shadow border border-santa-fe-600/20 hover:-translate-y-2 transition-transform duration-300 relative paper-edge">
          <div className="absolute top-6 right-6 bg-santa-fe-600/10 text-santa-fe-600 px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>
          <h4 className="text-xs uppercase tracking-widest text-santa-fe-600 mb-4 font-bold">Professional Researcher</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-bold">$29</span>
            <span className="text-desert-storm-700">/month</span>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Unlimited documents", "Priority AI Synthesis", "Export to LaTeX & Obsidian", "100GB secure cloud storage"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-santa-fe-600" />
                {item}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-full santa-fe-gradient text-white font-bold hover:shadow-lg transition-all">
            Begin Professional Project
          </button>
        </div>
      </div>
    </div>
  </section>
);
