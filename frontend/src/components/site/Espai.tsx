import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/lib/site";
import { FadeUp, Chapter } from "./Reveal";

function Framed({ src, alt, caption, className, ratio }: { src: string; alt: string; caption: string; className?: string; ratio: string }) {
  return (
    <figure className={className}>
      <div className={`group overflow-hidden ${ratio}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

export function Espai() {
  const { d } = useLang();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="espai" data-testid="section-espai" className="bg-ivory pt-24 lg:pt-40">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <FadeUp className="col-span-12 lg:col-span-7">
            <Chapter>{d.espai.chapter}</Chapter>
            <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {d.espai.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="col-span-12 flex items-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm font-sans text-base leading-relaxed text-ink-muted sm:text-lg">{d.espai.lead}</p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-24">
          <FadeUp className="col-span-12 lg:col-span-8">
            <Framed src={IMG.courtyard} alt={d.espai.captions[0]} caption={d.espai.captions[0]} ratio="aspect-[4/3]" />
          </FadeUp>
          <FadeUp delay={0.1} className="col-span-12 flex items-center lg:col-span-3 lg:col-start-10">
            <p className="font-heading text-2xl italic leading-snug text-olive lg:text-3xl">“{d.espai.quote}”</p>
          </FadeUp>

          <FadeUp className="col-span-12 sm:col-span-6 lg:col-span-4 lg:mt-20">
            <Framed src={IMG.facade} alt={d.espai.captions[1]} caption={d.espai.captions[1]} ratio="aspect-[3/4]" />
          </FadeUp>
          <FadeUp delay={0.1} className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-6 lg:mt-40">
            <Framed src={IMG.patioPlants} alt={d.espai.captions[2]} caption={d.espai.captions[2]} ratio="aspect-[3/4]" />
          </FadeUp>
        </div>
      </div>

      <div ref={parallaxRef} className="relative mt-20 h-[55vh] overflow-hidden lg:mt-32 lg:h-[70vh]">
        <motion.img
          src={IMG.landscape}
          alt={d.espai.captions[3]}
          loading="lazy"
          style={{ y }}
          className="absolute inset-0 h-[124%] w-full -translate-y-[12%] object-cover"
        />
      </div>
    </section>
  );
}
