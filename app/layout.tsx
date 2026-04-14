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
  title: "Saïd | Création de Sites Web à Nice",
  description:
    "Développeur web freelance à Nice et sur la Côte d'Azur. Sites web sur-mesure, rapides et optimisés pour le référencement local. Devis gratuit pour artisans, commerçants et TPE.",
  keywords: [
    "développeur web Nice",
    "création site web Nice",
    "freelance web Côte d'Azur",
    "site internet artisan Nice",
    "référencement local Nice",
    "agence web PACA",
    "Alpes-Maritimes",
    "site web TPE PME",
    "Next.js freelance Nice",
  ],
  authors: [{ name: "Saïd AHMED MOUSSA" }],
  openGraph: {
    title: "Saïd | Création de Sites Web à Nice",
    description:
      "Sites web sur-mesure, ultra-rapides et optimisés pour la conversion. Basé à Nice, je travaille avec les artisans, commerçants et TPE de la Côte d'Azur.",
    locale: "fr_FR",
    type: "website",
    siteName: "Saïd Web — Développeur Freelance Nice",
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
                "Création de sites web sur-mesure pour artisans, commerçants et TPE à Nice et sur la Côte d'Azur.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nice",
                addressRegion: "Alpes-Maritimes",
                addressCountry: "FR",
              },
              areaServed: ["Nice", "Côte d'Azur", "PACA", "Alpes-Maritimes"],
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
