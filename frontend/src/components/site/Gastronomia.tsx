import { ArrowDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";
import { IMG } from "@/lib/site";
import { FadeUp, Chapter } from "./Reveal";

function Frame({ src, alt, caption, ratio, className }: { src: string; alt: string; caption: string; ratio: string; className?: string }) {
  return (
    <figure className={className}>
      <div className={`group overflow-hidden ${ratio}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

export function Gastronomia() {
  const { d } = useLang();
  const g = d.gastronomia;

  return (
    <section id="gastronomia" data-testid="section-gastronomia" className="bg-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <FadeUp className="col-span-12 lg:col-span-7">
            <Chapter>{g.kicker}</Chapter>
            <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {g.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="col-span-12 flex flex-col justify-end gap-4 lg:col-span-4 lg:col-start-9">
            <p className="font-heading text-xl italic leading-snug text-olive lg:text-2xl">{g.lead}</p>
            <p className="max-w-sm font-sans text-base leading-relaxed text-ink-muted">{g.support}</p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-12 items-start gap-x-6 gap-y-12 lg:mt-24">
          <FadeUp className="col-span-12 lg:col-span-7">
            <Frame src={IMG.gastro[0]} alt={g.captions[0]} caption={g.captions[0]} ratio="aspect-[4/3]" />
          </FadeUp>
          <FadeUp delay={0.12} className="col-span-12 flex flex-col justify-center self-center lg:col-span-4 lg:col-start-9">
            <p className="font-heading text-2xl leading-snug tracking-tight text-ink lg:text-3xl">{g.ctaQ}</p>
            <button
              data-testid="gastronomia-cta-button"
              onClick={() => scrollToId("contacte")}
              className="group relative mt-7 w-fit overflow-hidden border border-ink px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-500 hover:text-ivory"
            >
              <span className="absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                {g.cta}
                <ArrowDown size={14} className="transition-transform duration-500 group-hover:translate-y-0.5" />
              </span>
            </button>
          </FadeUp>

          <FadeUp className="col-span-12 sm:col-span-6 lg:col-span-4 lg:mt-6">
            <Frame src={IMG.gastro[1]} alt={g.captions[1]} caption={g.captions[1]} ratio="aspect-[3/4]" />
          </FadeUp>
          <FadeUp delay={0.08} className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-6 lg:mt-24">
            <Frame src={IMG.gastro[2]} alt={g.captions[2]} caption={g.captions[2]} ratio="aspect-[3/4]" />
          </FadeUp>
          <FadeUp delay={0.16} className="col-span-10 col-start-2 sm:col-span-5 sm:col-start-5 lg:col-span-3 lg:col-start-11 lg:mt-10">
            <Frame src={IMG.gastro[3]} alt={g.captions[3]} caption={g.captions[3]} ratio="aspect-[4/3]" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
