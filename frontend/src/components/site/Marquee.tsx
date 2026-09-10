import { useLang } from "@/lib/i18n";

export function Marquee() {
  const { d } = useLang();
  const words = [...d.marquee, ...d.marquee, ...d.marquee, ...d.marquee];
  return (
    <div data-testid="marquee" className="overflow-hidden border-y border-stone-line bg-sand py-5" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-heading text-lg italic text-ink/70 lg:text-xl">{w}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-olive/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
