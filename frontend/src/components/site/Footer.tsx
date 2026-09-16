import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { FadeUp } from "./Reveal";

export function Footer() {
  const { d } = useLang();
  return (
    <footer data-testid="site-footer" className="bg-night pb-10 pt-20 text-ivory lg:pt-28">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-night-line pb-12 sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-night-muted">{d.footer.tagline}</p>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-night-muted">
            <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-ivory">{CONTACT.email}</a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-ivory">Instagram</a>
          </div>
        </div>
        <FadeUp className="overflow-hidden py-14 lg:py-20">
          <img
            src="/logo.png"
            alt="La Torre del Gall"
            className="mx-auto mb-10 h-12 w-auto invert lg:h-16"
          />
          <p className="whitespace-nowrap text-center font-heading text-[10.5vw] leading-none tracking-tight text-ivory/90">
            LA TORRE DEL GALL
          </p>
        </FadeUp>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-night-line pt-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-night-muted">
            © {new Date().getFullYear()} La Torre del Gall
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-night-muted">{d.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
