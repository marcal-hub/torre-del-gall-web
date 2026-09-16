import { useLang } from "@/lib/i18n";
import { IMG } from "@/lib/site";
import { FadeUp, Chapter } from "./Reveal";

export function QuiSom() {
  const { d } = useLang();
  const q = d.quiSom;

  return (
    <section id="qui-som" data-testid="section-qui-som" className="bg-sand py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 items-center gap-x-6 gap-y-14 px-5 lg:px-12">
        <FadeUp className="col-span-12 lg:col-span-6">
          <div className="group overflow-hidden">
            <img
              src={IMG.quiSom}
              alt={q.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </FadeUp>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <FadeUp>
            <Chapter>{q.kicker}</Chapter>
            <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {q.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.12} className="mt-10 space-y-6">
            {q.paragraphs.map((p) => (
              <p key={p} className="font-sans text-base leading-[1.85] text-ink-muted">
                {p}
              </p>
            ))}
            <p className="pt-4 font-heading text-xl italic leading-relaxed text-olive lg:text-2xl">
              {q.closing}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
