import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLang, LANGS, type Lang } from "@/lib/i18n";
import { scrollToId } from "@/lib/scroll";

export function Nav() {
  const { d, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const links = [
    { id: "espai", label: d.nav.espai },
    { id: "esdeveniments", label: d.nav.esdeveniments },
    { id: "experiencies", label: d.nav.experiencies },
    { id: "gastronomia", label: d.nav.gastronomia },
    { id: "galeria", label: d.nav.galeria },
    { id: "qui-som", label: d.nav.quiSom },
    { id: "contacte", label: d.nav.contacte },
  ];

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const dark = scrolled || open;

  return (
    <>
      <header
        data-testid="main-navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          dark
            ? "border-b border-stone-line/80 bg-ivory/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:h-20 lg:px-12">
          <button
            data-testid="nav-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="La Torre del Gall — inici"
            className="flex items-center"
          >
            <img
              src="/logo.png"
              alt="La Torre del Gall"
              className={`h-10 w-auto transition-[filter] duration-500 lg:h-12 ${dark ? "" : "invert"}`}
            />
          </button>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
            {links.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-500 hover:opacity-60 ${
                  dark ? "text-ink" : "text-ivory"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <div data-testid="language-switcher" className="flex items-center gap-2">
              {LANGS.map((l: Lang) => (
                <button
                  key={l}
                  data-testid={`lang-${l}`}
                  onClick={() => setLang(l)}
                  className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                    lang === l
                      ? dark
                        ? "text-olive"
                        : "text-ivory"
                      : dark
                        ? "text-ink-muted hover:text-ink"
                        : "text-ivory/50 hover:text-ivory"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              data-testid="nav-cta-button"
              onClick={() => go("contacte")}
              className={`hidden border px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 lg:block ${
                dark
                  ? "border-ink bg-ink text-ivory hover:bg-olive hover:border-olive"
                  : "border-ivory/70 text-ivory hover:bg-ivory hover:text-ink"
              }`}
            >
              {d.nav.cta}
            </button>
            <button
              data-testid="mobile-menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? d.nav.close : d.nav.menu}
              className={`transition-colors duration-500 lg:hidden ${dark ? "text-ink" : "text-ivory"}`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ivory px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {links.map((l, i) => (
                <span key={l.id} className="block overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
                    onClick={() => go(l.id)}
                    className="font-heading text-5xl text-ink"
                  >
                    {l.label}
                  </motion.button>
                </span>
              ))}
            </nav>
            <motion.button
              data-testid="mobile-menu-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => go("contacte")}
              className="mt-10 w-fit border border-ink bg-ink px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory"
            >
              {d.nav.cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
