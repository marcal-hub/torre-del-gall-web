import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { IMG } from "@/lib/site";
import { FadeUp, Chapter } from "./Reveal";

export function Galeria() {
  const { d } = useLang();
  const [filter, setFilter] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = d.galeria.items.map((item, i) => ({ ...item, src: IMG.gallery[i] }));
  const visible = items.filter((it) => filter === 0 || it.filter === filter);

  return (
    <section id="galeria" data-testid="section-galeria" className="bg-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <FadeUp className="col-span-12 lg:col-span-8">
            <Chapter>{d.galeria.chapter}</Chapter>
            <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {d.galeria.title}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="col-span-12 flex flex-wrap items-end gap-x-5 gap-y-2 lg:col-span-4">
            {d.galeria.filters.map((f, i) => (
              <button
                key={f}
                data-testid={`gallery-filter-${i}`}
                onClick={() => setFilter(i)}
                className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  filter === i ? "text-olive underline underline-offset-4" : "text-ink-muted hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </FadeUp>
        </div>

        <motion.div layout className="mt-14 columns-1 gap-5 sm:columns-2 lg:mt-20 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.figure
                layout
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group mb-5 break-inside-avoid"
              >
                <button
                  data-testid={`gallery-item-${i}`}
                  onClick={() => setLightbox(i)}
                  className="relative block w-full overflow-hidden"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {item.label}
                  </figcaption>
                </button>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && visible[lightbox] && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night/95 p-5"
            onClick={() => setLightbox(null)}
          >
            <button
              data-testid="lightbox-close"
              aria-label="Close"
              className="absolute right-5 top-5 text-ivory/70 transition-colors hover:text-ivory"
            >
              <X size={26} />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              src={visible[lightbox].src.replace("w=900", "w=1600")}
              alt={visible[lightbox].label}
              className="max-h-[85vh] max-w-full object-contain"
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-ivory/70">
              {visible[lightbox].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
