"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import SectionNav from "@/components/SectionNav";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStack from "@/components/TechStack";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <main
        className={`relative overflow-x-hidden transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        <HeroSection />
        <TechStack />
        <ServicesSection />
        <ProcessSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
        <SectionNav />
      </main>
    </>
  );
}
