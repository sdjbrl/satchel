import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Satchel",
  description: "Comment Satchel traite vos données personnelles.",
};

const LAST_UPDATED = "17 avril 2026";
const CONTACT_EMAIL = "legal@saiddev.fr";
const SITE_URL = "https://satchel.saiddev.fr";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0d0f17] text-white/80 px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <p className="text-[#FF4655] text-xs font-bold tracking-[0.4em] uppercase mb-3">
            Satchel
          </p>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-white/30 text-sm">
            Dernière mise à jour : {LAST_UPDATED}
          </p>
        </div>

        <Section title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données est l'exploitant du site{" "}
            <strong className="text-white">{SITE_URL}</strong>. Pour toute
            question relative à vos données personnelles, contactez-nous à :{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#FF4655] underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>

        <Section title="2. Données collectées">
          <p>Satchel collecte uniquement les données strictement nécessaires :</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>
              <strong className="text-white">Nom de joueur & tag Riot</strong>{" "}
              (ex. : Said#EUW) — transmis par Riot Games via le flux
              d'authentification RSO.
            </li>
            <li>
              <strong className="text-white">PUUID</strong> — identifiant
              anonymisé Riot, utilisé pour les appels API. Il ne permet pas
              d'identifier une personne physique directement.
            </li>
            <li>
              <strong className="text-white">Token d'accès RSO</strong> —
              jeton temporaire utilisé pour récupérer les données de boutique
              et d'inventaire en votre nom.
            </li>
          </ul>
          <p className="mt-3 text-white/50 text-sm">
            Aucune adresse e-mail, numéro de téléphone, adresse IP persistante
            ni donnée de paiement n'est collectée.
          </p>
        </Section>

        <Section title="3. Finalité et base légale">
          <table className="w-full text-sm border-collapse mt-2">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 text-white/50 font-normal">Finalité</th>
                <th className="text-left py-2 text-white/50 font-normal">Base légale (RGPD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <Row a="Authentification via Riot SSO" b="Consentement (Art. 6.1.a)" />
              <Row a="Affichage des statistiques personnelles" b="Consentement (Art. 6.1.a)" />
              <Row a="Affichage de la boutique quotidienne" b="Consentement (Art. 6.1.a)" />
              <Row a="Affichage de l'inventaire" b="Consentement (Art. 6.1.a)" />
            </tbody>
          </table>
        </Section>

        <Section title="4. Durée de conservation">
          <p>
            <strong className="text-white">Aucune donnée n'est conservée de manière permanente.</strong>
          </p>
          <p className="mt-2">
            Les données (nom, tag, PUUID, token RSO) sont stockées
            exclusivement dans un cookie de session chiffré, côté serveur,
            inaccessible au JavaScript client (flag <code className="text-[#FF4655]">httpOnly</code>).
            Ce cookie est automatiquement supprimé à la déconnexion ou à
            l'expiration de la session.
          </p>
          <p className="mt-2">
            Aucune base de données, aucun fichier de log, aucun service
            analytique ne stocke vos données personnelles.
          </p>
        </Section>

        <Section title="5. Transferts vers des pays tiers">
          <p>Satchel fait appel aux services tiers suivants :</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>
              <strong className="text-white">Riot Games, Inc.</strong> (États-Unis)
              — fournisseur du système d'authentification RSO et des données de
              jeu. Soumis aux{" "}
              <a
                href="https://www.riotgames.com/en/privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF4655] underline"
              >
                clauses contractuelles types UE
              </a>
              .
            </li>
            <li>
              <strong className="text-white">HenrikDev API</strong> (service
              communautaire) — utilisé pour récupérer les statistiques
              publiques. Seul le nom/tag public est transmis pour les recherches
              non authentifiées.
            </li>
            <li>
              <strong className="text-white">Vercel, Inc.</strong> (États-Unis)
              — hébergement de l'application. Certifié SOC 2 Type II. Les
              données en transit sont chiffrées via TLS 1.3.
            </li>
          </ul>
        </Section>

        <Section title="6. Vos droits (RGPD)">
          <p>Conformément au Règlement (UE) 2016/679, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong className="text-white">Accès</strong> — consulter les données vous concernant.</li>
            <li><strong className="text-white">Rectification</strong> — corriger des données inexactes.</li>
            <li><strong className="text-white">Effacement</strong> — demander la suppression de vos données (en pratique : déconnectez-vous, le cookie est immédiatement détruit).</li>
            <li><strong className="text-white">Portabilité</strong> — recevoir vos données dans un format structuré.</li>
            <li><strong className="text-white">Opposition</strong> — s'opposer au traitement.</li>
            <li><strong className="text-white">Réclamation</strong> — introduire une réclamation auprès de la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#FF4655] underline">CNIL</a>.
            </li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits :{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF4655] underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>
            Satchel utilise un unique cookie de session technique (
            <code className="text-[#FF4655]">authjs.session-token</code>),
            indispensable au fonctionnement de l'authentification. Ce cookie
            n'est pas un cookie de traçage ou publicitaire. Aucun cookie tiers
            n'est déposé.
          </p>
        </Section>

        <Section title="8. Modifications">
          <p>
            Cette politique peut être mise à jour. La date de dernière
            modification est indiquée en haut de page. L'utilisation continue
            du service vaut acceptation des modifications.
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

function Row({ a, b }: { a: string; b: string }) {
  return (
    <tr>
      <td className="py-2 pr-4 text-white/70">{a}</td>
      <td className="py-2 text-white/50">{b}</td>
    </tr>
  );
}
