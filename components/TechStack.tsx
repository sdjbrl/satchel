const technologies = [
  "React", "Next.js", "Tailwind CSS", "TypeScript", "Figma",
  "Node.js", "Vercel", "PostgreSQL",
];

const duplicatedTechs = [...technologies, ...technologies];

export default function TechStack() {
  return (
    <section
      className="py-16 border-y border-slate-200 dark:border-slate-800/50 overflow-hidden"
      aria-label="Technologies utilisées"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
          Technologies utilisées
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-slate-50 dark:from-[#0a0a0f] to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-slate-50 dark:from-[#0a0a0f] to-transparent pointer-events-none" aria-hidden="true" />

        <ul className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap" aria-label="Liste des technologies">
          {duplicatedTechs.map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              className="inline-flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 dark:bg-cyan-400/60" aria-hidden="true" />
              <span className="text-sm font-semibold tracking-wide">{tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
