import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";
import { FadeUp, Chapter } from "./Reveal";

export function Experiencies() {
  const { d } = useLang();
  const x = d.experiencies;

  return (
    <section id="experiencies" data-testid="section-experiencies" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-12 px-5 lg:px-12">
        <FadeUp className="col-span-12 lg:col-span-5">
          <Chapter>{x.kicker}</Chapter>
          <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {x.title}
          </h2>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink-muted sm:text-lg">{x.lead}</p>
          <button
            data-testid="experiencies-cta"
            onClick={() => scrollToId("contacte")}
            className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-olive underline-offset-4 transition-colors duration-300 hover:underline"
          >
            {x.cta} <ArrowUpRight size={14} />
          </button>
        </FadeUp>
        <FadeUp delay={0.15} className="col-span-12 flex items-center lg:col-span-6 lg:col-start-7">
          <ul className="w-full divide-y divide-stone-line border-y border-stone-line">
            {x.items.map((item, i) => (
              <li key={item} className="flex items-baseline gap-6 py-4 lg:py-5">
                <span className="font-mono text-[10px] tracking-[0.25em] text-olive">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-xl tracking-tight text-ink lg:text-2xl">{item}</span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
