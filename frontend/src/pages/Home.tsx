import { useEffect } from "react";
import { initLenis } from "@/lib/scroll";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Espai } from "@/components/site/Espai";
import { Esdeveniments } from "@/components/site/Esdeveniments";
import { Gastronomia } from "@/components/site/Gastronomia";
import { Galeria } from "@/components/site/Galeria";
import { QuiSom } from "@/components/site/QuiSom";
import { Contacte } from "@/components/site/Contacte";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <main className="bg-ivory">
      <Nav />
      <Hero />
      <Marquee />
      <Espai />
      <Esdeveniments />
      <Gastronomia />
      <Galeria />
      <QuiSom />
      <Contacte />
      <Footer />
    </main>
  );
}
