export const Footer = () => (
  <footer className="w-full py-12 px-8 bg-desert-storm-50 border-t border-desert-storm-200 flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-xs uppercase tracking-widest text-desert-storm-700/60">
      © 2024 The Digital Archivist. Built for deep thought.
    </div>
    <div className="flex flex-wrap justify-center gap-8">
      {["Privacy Policy", "Terms of Service", "Research Ethics", "Contact"].map((link) => (
        <a key={link} className="text-xs uppercase tracking-widest text-desert-storm-700/60 hover:text-santa-fe-600 transition-colors" href="#">
          {link}
        </a>
      ))}
    </div>
  </footer>
);
