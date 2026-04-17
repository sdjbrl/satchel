import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — Satchel",
  description: "Conditions générales d'utilisation de Satchel.",
};

const LAST_UPDATED = "17 avril 2026";
const CONTACT_EMAIL = "legal@saiddev.fr";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0d0f17] text-white/80 px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <p className="text-[#FF4655] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Satchel
          </p>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Conditions d'utilisation
          </h1>
          <p className="text-white/30 text-sm">
            Dernière mise à jour : {LAST_UPDATED}
          </p>
        </div>

        <Section title="1. Présentation du service">
          <p>
            Satchel est une application web communautaire et non commerciale
            permettant aux joueurs de <strong className="text-white">Valorant</strong>{" "}
            de consulter leurs statistiques personnelles, leur boutique
            quotidienne et leur inventaire, via leur compte Riot Games.
          </p>
          <p>
            Satchel n'est pas affilié à, approuvé par, ni associé à{" "}
            <strong className="text-white">Riot Games, Inc.</strong> Valorant
            et tous les assets associés sont la propriété intellectuelle de
            Riot Games, Inc.
          </p>
        </Section>

        <Section title="2. Accès au service">
          <p>
            L'accès à Satchel est gratuit et ouvert à tout joueur disposant
            d'un compte Riot Games. Aucune inscription propre à Satchel n'est
            requise.
          </p>
          <p>
            Satchel se réserve le droit de suspendre ou d'interrompre le
            service à tout moment, sans préavis, notamment en cas de
            maintenance, de modification des API tierces, ou de révocation des
            autorisations Riot Games.
          </p>
        </Section>

        <Section title="3. Utilisation acceptable">
          <p>En utilisant Satchel, vous vous engagez à :</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Ne pas tenter de contourner les mécanismes d'authentification.</li>
            <li>Ne pas utiliser le service à des fins commerciales sans autorisation écrite.</li>
            <li>Ne pas scraper, automatiser ou abuser les API exposées par Satchel.</li>
            <li>Respecter les{" "}
              <a
                href="https://www.riotgames.com/en/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF4655] underline"
              >
                Conditions d'utilisation de Riot Games
              </a>
              .
            </li>
          </ul>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p>
            Les visuels, noms d'agents, skins, logos et marques relatifs à{" "}
            <strong className="text-white">Valorant</strong> sont la propriété
            exclusive de <strong className="text-white">Riot Games, Inc.</strong>{" "}
            et sont utilisés dans le cadre de la{" "}
            <a
              href="https://www.riotgames.com/en/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF4655] underline"
            >
              politique de contenu tiers de Riot Games
            </a>
            .
          </p>
          <p>
            Le code source de Satchel est un projet personnel. Toute
            reproduction partielle ou totale sans autorisation est interdite.
          </p>
        </Section>

        <Section title="5. Limitation de responsabilité">
          <p>
            Satchel est fourni{" "}
            <strong className="text-white">« en l'état »</strong>, sans
            garantie d'aucune sorte, expresse ou implicite. En particulier :
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>
              La disponibilité du service dépend des API tierces (Riot Games,
              HenrikDev) et ne peut être garantie.
            </li>
            <li>
              Les données affichées (stats, boutique, inventaire) sont issues
              d'API externes et peuvent comporter des inexactitudes.
            </li>
            <li>
              Satchel ne saurait être tenu responsable de toute perte ou
              dommage résultant de l'utilisation ou de l'impossibilité
              d'utiliser le service.
            </li>
          </ul>
        </Section>

        <Section title="6. Données personnelles">
          <p>
            Le traitement de vos données personnelles est décrit dans notre{" "}
            <a href="/privacy" className="text-[#FF4655] underline">
              Politique de confidentialité
            </a>
            , conforme au Règlement Général sur la Protection des Données
            (RGPD — UE 2016/679).
          </p>
        </Section>

        <Section title="7. Droit applicable & juridiction">
          <p>
            Les présentes conditions sont régies par le{" "}
            <strong className="text-white">droit français</strong>. En cas de
            litige, et à défaut de résolution amiable, les tribunaux français
            seront seuls compétents.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            Pour toute question :{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#FF4655] underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">
        {title}
      </h2>
      <div className="text-white/60 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
