import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";
import { HERO_VIDEO, IMG } from "@/lib/site";
import { MaskedLines } from "./Reveal";

export function Hero() {
  const { d } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} data-testid="section-hero" className="grain relative h-[100svh] min-h-[620px] overflow-hidden bg-night">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.12]">
        <video
          data-testid="hero-video"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          src={HERO_VIDEO}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 flex flex-col justify-end px-5 pb-24 sm:pb-28 lg:px-12 lg:pb-32"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-ivory/80"
        >
          {d.hero.kicker}
        </motion.p>
        <h1 className="font-heading text-[11vw] leading-[1.04] tracking-tight text-ivory sm:text-6xl lg:text-8xl">
          <MaskedLines lines={[d.hero.line1, d.hero.line2]} delay={0.35} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-6 font-sans text-sm tracking-[0.08em] text-ivory/85 sm:text-base"
        >
          {d.hero.subline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-10"
        >
          <button
            data-testid="hero-cta-button"
            onClick={() => scrollToId("espai")}
            className="group relative overflow-hidden border border-ivory/70 px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors duration-500 hover:text-ink"
          >
            <span className="absolute inset-0 -translate-x-full bg-ivory transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">{d.hero.cta}</span>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 right-5 flex items-center gap-3 lg:right-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/60">{d.hero.scroll}</span>
        <span className="block h-10 w-px overflow-hidden bg-ivory/20">
          <span className="animate-scroll-pulse block h-full w-px bg-ivory/80" />
        </span>
      </motion.div>
    </section>
  );
}
