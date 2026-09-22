import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";
import { IMG } from "@/lib/site";
import { FadeUp, Chapter } from "./Reveal";

const PANEL_IMAGES = [IMG.bodes, IMG.esdeveniments, IMG.empreses];
const PANEL_FOCUS = ["", "", ""];
const OFFSETS = ["lg:mt-0", "lg:mt-16", "lg:mt-32"];

export function Esdeveniments() {
  const { d } = useLang();

  return (
    <section id="esdeveniments" data-testid="section-esdeveniments" className="bg-night py-24 text-ivory lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <FadeUp className="col-span-12 lg:col-span-7">
            <Chapter dark>{d.esdeveniments.chapter}</Chapter>
            <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {d.esdeveniments.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="col-span-12 flex items-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm font-sans text-base leading-relaxed text-night-muted sm:text-lg">
              {d.esdeveniments.intro}
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6">
          {d.esdeveniments.items.map((item, i) => (
            <FadeUp key={item.num} delay={i * 0.12} className={OFFSETS[i]}>
              <button
                data-testid={`event-panel-${item.num}`}
                onClick={() => scrollToId("contacte")}
                className="group relative block w-full overflow-hidden text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={PANEL_IMAGES[i]}
                    alt={item.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${PANEL_FOCUS[i]}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10 transition-opacity duration-500 group-hover:from-black/85" />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/70">{item.num}</p>
                    <h3 className="mt-2 font-heading text-3xl tracking-tight text-ivory lg:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-500 group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0">
                      {item.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory">
                      {d.esdeveniments.discover}
                      <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
