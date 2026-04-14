import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/50 bg-white/80 dark:bg-[#0a0a0f]/80 py-10 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Link href="/" className="text-lg font-bold text-slate-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200">
              Saïd<span className="text-cyan-500 dark:text-cyan-400">.</span>
            </Link>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
              Développeur Web Freelance — Nice, Côte d&apos;Azur
            </p>
          </div>

          <address className="not-italic">
            <a
              href="mailto:pro.saidahmed@yahoo.com"
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200"
            >
              <Mail size={14} aria-hidden="true" />
              pro.saidahmed@yahoo.com
            </a>
          </address>

          <nav aria-label="Navigation pied de page">
            <ul className="flex items-center gap-6">
              {[
                { label: "Services", href: "#services" },
                { label: "Méthode", href: "#methode" },
                { label: "Références", href: "#portfolio" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50">
          <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed max-w-2xl">
            Saïd AHMED MOUSSA &mdash; SIREN&nbsp;: 103 730 669 &mdash; Dispensé d&rsquo;immatriculation au RCS et au RM &mdash; TVA non applicable, art. 293 B du CGI.
          </p>
          <p className="mt-2 text-xs text-slate-300 dark:text-slate-700">
            &copy; {currentYear} Saïd AHMED MOUSSA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
