import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Instagram, MapPin, ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { useLang } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { FadeUp, Chapter } from "./Reveal";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_type: string | null;
  event_date: string | null;
  guests: number | null;
  message: string;
  language: string | null;
  created_at: string;
}

const inputCls =
  "w-full border border-stone-line bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus:border-olive focus:outline-none transition-colors duration-300";

export function Contacte() {
  const { d, lang } = useLang();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "", date: "", guests: "", message: "" });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await apiPost<Inquiry>("/inquiries", {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        event_type: form.eventType || null,
        event_date: form.date || null,
        guests: form.guests ? Number(form.guests) : null,
        message: form.message,
        language: lang,
      });
      setSent(true);
      toast.success(d.contacte.successTitle);
    } catch {
      toast.error(d.contacte.error);
    } finally {
      setSending(false);
    }
  }

  const rows = [
    { icon: Mail, label: d.contacte.emailLabel, value: CONTACT.email, href: `mailto:${CONTACT.email}`, testid: "contact-email" },
    { icon: Phone, label: d.contacte.phoneLabel, value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}`, testid: "contact-phone" },
    { icon: Instagram, label: d.contacte.instagramLabel, value: "@latorredelgall", href: CONTACT.instagram, testid: "contact-instagram" },
    { icon: MapPin, label: d.contacte.locationLabel, value: d.contacte.locationValue, href: CONTACT.maps, testid: "contact-location" },
  ];

  return (
    <section id="contacte" data-testid="section-contacte" className="border-t border-stone-line bg-ivory py-24 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-16 px-5 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <FadeUp>
            <Chapter>{d.contacte.chapter}</Chapter>
            <h2 className="mt-5 font-heading text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {d.contacte.title}
            </h2>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ink-muted sm:text-lg">
              {d.contacte.lead}
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-12">
            <ul className="divide-y divide-stone-line border-y border-stone-line">
              {rows.map((r) => (
                <li key={r.testid}>
                  <a
                    data-testid={r.testid}
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors duration-300 hover:text-olive"
                  >
                    <span className="flex items-center gap-4">
                      <r.icon size={16} className="text-olive" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">{r.label}</span>
                    </span>
                    <span className="flex items-center gap-2 font-sans text-sm text-ink group-hover:text-olive">
                      {r.value}
                      <ArrowUpRight size={13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              data-testid="contact-maps"
              href={CONTACT.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-olive underline-offset-4 hover:underline"
            >
              {d.contacte.maps} <ArrowUpRight size={14} />
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="border border-stone-line bg-sand p-6 sm:p-10 lg:p-12">
            {sent ? (
              <motion.div
                data-testid="inquiry-success-message"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-olive text-olive">
                  <Check size={22} />
                </span>
                <h3 className="mt-6 font-heading text-3xl text-ink">{d.contacte.successTitle}</h3>
                <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-muted">{d.contacte.successText}</p>
                <button
                  data-testid="inquiry-again-button"
                  onClick={() => setSent(false)}
                  className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-olive underline-offset-4 hover:underline"
                >
                  {d.contacte.successAgain}
                </button>
              </motion.div>
            ) : (
              <form data-testid="contact-inquiry-form" onSubmit={onSubmit} className="space-y-5">
                <h3 className="font-heading text-2xl text-ink">{d.contacte.formTitle}</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input data-testid="inquiry-name-input" required value={form.name} onChange={set("name")} placeholder={d.contacte.name} aria-label={d.contacte.name} className={inputCls} />
                  <input data-testid="inquiry-email-input" required type="email" value={form.email} onChange={set("email")} placeholder={d.contacte.email} aria-label={d.contacte.email} className={inputCls} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input data-testid="inquiry-phone-input" value={form.phone} onChange={set("phone")} placeholder={d.contacte.phone} aria-label={d.contacte.phone} className={inputCls} />
                  <select
                    data-testid="inquiry-event-type-select"
                    value={form.eventType}
                    onChange={set("eventType")}
                    aria-label={d.contacte.eventType}
                    className={`${inputCls} ${form.eventType ? "" : "text-ink-muted/60"}`}
                  >
                    <option value="">{d.contacte.eventType}</option>
                    {d.contacte.eventTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input data-testid="inquiry-date-input" value={form.date} onChange={set("date")} placeholder={d.contacte.datePlaceholder} aria-label={d.contacte.date} className={inputCls} />
                  <input data-testid="inquiry-guests-input" type="number" min={1} value={form.guests} onChange={set("guests")} placeholder={d.contacte.guests} aria-label={d.contacte.guests} className={inputCls} />
                </div>
                <textarea
                  data-testid="inquiry-message-input"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder={d.contacte.messagePlaceholder}
                  aria-label={d.contacte.message}
                  className={`${inputCls} resize-none`}
                />
                <button
                  data-testid="inquiry-submit-button"
                  type="submit"
                  disabled={sending}
                  className="group relative w-full overflow-hidden border border-ink bg-ink px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors duration-500 disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-olive transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">{sending ? d.contacte.sending : d.contacte.submit}</span>
                </button>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
