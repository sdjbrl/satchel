import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Saïd | Création de Sites Web partout dans le monde",
  description:
    "Développeur web freelance disponible partout dans le monde. Sites web sur-mesure, rapides et optimisés pour le référencement. Devis gratuit pour artisans, commerçants et TPE.",
  keywords: [
    "développeur web freelance",
    "création site web",
    "freelance web international",
    "site internet artisan",
    "site web TPE PME",
    "Next.js freelance",
  ],
  authors: [{ name: "Saïd AHMED MOUSSA" }],
  openGraph: {
    title: "Saïd | Création de Sites Web partout dans le monde",
    description:
      "Sites web sur-mesure, ultra-rapides et optimisés pour la conversion. Disponible partout dans le monde pour les artisans, commerçants et TPE.",
    locale: "fr_FR",
    type: "website",
    siteName: "Saïd Web — Développeur Freelance",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Saïd AHMED MOUSSA — Développeur Web Freelance",
              description:
                "Création de sites web sur-mesure pour artisans, commerçants et TPE partout dans le monde.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
              },
              areaServed: "Partout dans le monde",
              email: "pro.saidahmed@yahoo.com",
              priceRange: "Sur devis",
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
