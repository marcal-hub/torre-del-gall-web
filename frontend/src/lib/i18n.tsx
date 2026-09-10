import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ca" | "es" | "en";
export const LANGS: Lang[] = ["ca", "es", "en"];

const ca = {
  nav: {
    espai: "Espai",
    esdeveniments: "Esdeveniments",
    galeria: "Galeria",
    contacte: "Contacte",
    cta: "Sol·licitar informació",
    menu: "Menú",
    close: "Tancar",
  },
  hero: {
    kicker: "Una masia a Catalunya",
    line1: "Un espai per celebrar",
    line2: "el que importa.",
    subline: "Bodes · Esdeveniments · Empreses",
    cta: "Descobreix l'espai",
    scroll: "Fes scroll",
  },
  marquee: ["Natura", "Arquitectura", "Celebracions", "Gastronomia", "Privacitat", "Llum mediterrània"],
  espai: {
    chapter: "01 — L'espai",
    title: "Una masia. Moltes possibilitats.",
    lead: "Un espai envoltat de natura pensat per celebrar, reunir-se i crear moments especials.",
    quote: "Pedra, llum i silenci.",
    captions: ["El pati de la masia", "Pedra i buguenvíl·lea", "Racons amb caràcter", "L'entorn natural", "Detalls que expliquen", "Vistes de la finca"],
  },
  esdeveniments: {
    chapter: "02 — Esdeveniments",
    title: "Molt més que casaments.",
    intro: "La Torre del Gall s'adapta a cada celebració: íntima o gran, familiar o corporativa.",
    discover: "Descobreix",
    items: [
      { num: "01", title: "Bodes", desc: "Cerimònies, banquets i festes envoltades de natura." },
      { num: "02", title: "Esdeveniments", desc: "Celebracions privades, trobades i moments especials." },
      { num: "03", title: "Empreses", desc: "Reunions, menjars d'empresa, presentacions i team building." },
    ],
  },
  galeria: {
    chapter: "03 — Galeria",
    title: "Moments a La Torre del Gall",
    filters: ["Tots", "Espais", "Bodes", "Gastronomia", "Celebracions"],
    items: [
      { filter: 1, label: "Exterior" },
      { filter: 3, label: "Gastronomia" },
      { filter: 4, label: "Esdeveniment privat" },
      { filter: 2, label: "Boda · Juny" },
      { filter: 1, label: "Espais" },
      { filter: 4, label: "Celebració" },
      { filter: 3, label: "Gastronomia" },
      { filter: 4, label: "Esdeveniment corporatiu" },
      { filter: 1, label: "Exterior" },
    ],
  },
  contacte: {
    chapter: "04 — Contacte",
    title: "Tens alguna cosa per celebrar?",
    lead: "Explica'ns què tens en ment i descobrim junts com fer-ho possible a La Torre del Gall.",
    emailLabel: "Correu",
    phoneLabel: "Telèfon",
    instagramLabel: "Instagram",
    locationLabel: "Ubicació",
    locationValue: "Catalunya · Espanya",
    maps: "Veure a Google Maps",
    formTitle: "Sol·licita informació",
    name: "Nom i cognoms",
    email: "Correu electrònic",
    phone: "Telèfon (opcional)",
    eventType: "Tipus d'esdeveniment",
    eventTypes: ["Boda", "Esdeveniment privat", "Esdeveniment d'empresa", "Altres"],
    date: "Data aproximada (opcional)",
    datePlaceholder: "p. ex. juny 2027",
    guests: "Nombre de convidats (opcional)",
    message: "Explica'ns la teva idea",
    messagePlaceholder: "Què t'agradaria celebrar?",
    submit: "Enviar sol·licitud",
    sending: "Enviant…",
    successTitle: "Sol·licitud rebuda",
    successText: "Gràcies per escriure'ns. Et respondrem el més aviat possible.",
    successAgain: "Enviar una altra sol·licitud",
    error: "No s'ha pogut enviar. Torna-ho a provar o escriu-nos per correu.",
  },
  footer: {
    tagline: "Masia per a bodes, esdeveniments i empreses · Catalunya",
    rights: "Tots els drets reservats.",
  },
};

type Dict = typeof ca;

const es: Dict = {
  nav: {
    espai: "Espacio",
    esdeveniments: "Eventos",
    galeria: "Galería",
    contacte: "Contacto",
    cta: "Solicitar información",
    menu: "Menú",
    close: "Cerrar",
  },
  hero: {
    kicker: "Una masía en Cataluña",
    line1: "Un espacio para celebrar",
    line2: "lo que importa.",
    subline: "Bodas · Eventos · Empresas",
    cta: "Descubre el espacio",
    scroll: "Desliza",
  },
  marquee: ["Naturaleza", "Arquitectura", "Celebraciones", "Gastronomía", "Privacidad", "Luz mediterránea"],
  espai: {
    chapter: "01 — El espacio",
    title: "Una masía. Muchas posibilidades.",
    lead: "Un espacio rodeado de naturaleza pensado para celebrar, reunirse y crear momentos especiales.",
    quote: "Piedra, luz y silencio.",
    captions: ["El patio de la masía", "Piedra y buganvilla", "Rincones con carácter", "El entorno natural", "Detalles que cuentan", "Vistas de la finca"],
  },
  esdeveniments: {
    chapter: "02 — Eventos",
    title: "Mucho más que bodas.",
    intro: "La Torre del Gall se adapta a cada celebración: íntima o grande, familiar o corporativa.",
    discover: "Descubrir",
    items: [
      { num: "01", title: "Bodas", desc: "Ceremonias, banquetes y fiestas rodeadas de naturaleza." },
      { num: "02", title: "Eventos", desc: "Celebraciones privadas, encuentros y momentos especiales." },
      { num: "03", title: "Empresas", desc: "Reuniones, comidas de empresa, presentaciones y team building." },
    ],
  },
  galeria: {
    chapter: "03 — Galería",
    title: "Momentos en La Torre del Gall",
    filters: ["Todos", "Espacios", "Bodas", "Gastronomía", "Celebraciones"],
    items: [
      { filter: 1, label: "Exterior" },
      { filter: 3, label: "Gastronomía" },
      { filter: 4, label: "Evento privado" },
      { filter: 2, label: "Boda · Junio" },
      { filter: 1, label: "Espacios" },
      { filter: 4, label: "Celebración" },
      { filter: 3, label: "Gastronomía" },
      { filter: 4, label: "Evento corporativo" },
      { filter: 1, label: "Exterior" },
    ],
  },
  contacte: {
    chapter: "04 — Contacto",
    title: "¿Tienes algo que celebrar?",
    lead: "Cuéntanos qué tienes en mente y descubrimos juntos cómo hacerlo posible en La Torre del Gall.",
    emailLabel: "Correo",
    phoneLabel: "Teléfono",
    instagramLabel: "Instagram",
    locationLabel: "Ubicación",
    locationValue: "Cataluña · España",
    maps: "Ver en Google Maps",
    formTitle: "Solicita información",
    name: "Nombre y apellidos",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    eventType: "Tipo de evento",
    eventTypes: ["Boda", "Evento privado", "Evento de empresa", "Otros"],
    date: "Fecha aproximada (opcional)",
    datePlaceholder: "p. ej. junio 2027",
    guests: "Número de invitados (opcional)",
    message: "Cuéntanos tu idea",
    messagePlaceholder: "¿Qué te gustaría celebrar?",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    successTitle: "Solicitud recibida",
    successText: "Gracias por escribirnos. Te responderemos lo antes posible.",
    successAgain: "Enviar otra solicitud",
    error: "No se ha podido enviar. Inténtalo de nuevo o escríbenos por correo.",
  },
  footer: {
    tagline: "Masía para bodas, eventos y empresas · Cataluña",
    rights: "Todos los derechos reservados.",
  },
};

const en: Dict = {
  nav: {
    espai: "Estate",
    esdeveniments: "Events",
    galeria: "Gallery",
    contacte: "Contact",
    cta: "Request information",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    kicker: "A country estate in Catalonia",
    line1: "A place to celebrate",
    line2: "what matters.",
    subline: "Weddings · Events · Corporate",
    cta: "Discover the estate",
    scroll: "Scroll",
  },
  marquee: ["Nature", "Architecture", "Celebrations", "Gastronomy", "Privacy", "Mediterranean light"],
  espai: {
    chapter: "01 — The estate",
    title: "One estate. Endless possibilities.",
    lead: "A space surrounded by nature, made for celebrating, gathering and creating special moments.",
    quote: "Stone, light and silence.",
    captions: ["The estate courtyard", "Stone and bougainvillea", "Corners with character", "The natural surroundings", "Details that tell stories", "Views over the grounds"],
  },
  esdeveniments: {
    chapter: "02 — Events",
    title: "Far more than weddings.",
    intro: "La Torre del Gall adapts to every celebration: intimate or grand, family or corporate.",
    discover: "Discover",
    items: [
      { num: "01", title: "Weddings", desc: "Ceremonies, banquets and parties surrounded by nature." },
      { num: "02", title: "Events", desc: "Private celebrations, gatherings and special moments." },
      { num: "03", title: "Corporate", desc: "Meetings, business lunches, presentations and team building." },
    ],
  },
  galeria: {
    chapter: "03 — Gallery",
    title: "Moments at La Torre del Gall",
    filters: ["All", "Spaces", "Weddings", "Gastronomy", "Celebrations"],
    items: [
      { filter: 1, label: "Exterior" },
      { filter: 3, label: "Gastronomy" },
      { filter: 4, label: "Private event" },
      { filter: 2, label: "Wedding · June" },
      { filter: 1, label: "Spaces" },
      { filter: 4, label: "Celebration" },
      { filter: 3, label: "Gastronomy" },
      { filter: 4, label: "Corporate event" },
      { filter: 1, label: "Exterior" },
    ],
  },
  contacte: {
    chapter: "04 — Contact",
    title: "Something to celebrate?",
    lead: "Tell us what you have in mind and let's discover together how to make it happen at La Torre del Gall.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    instagramLabel: "Instagram",
    locationLabel: "Location",
    locationValue: "Catalonia · Spain",
    maps: "View on Google Maps",
    formTitle: "Request information",
    name: "Full name",
    email: "Email address",
    phone: "Phone (optional)",
    eventType: "Type of event",
    eventTypes: ["Wedding", "Private event", "Corporate event", "Other"],
    date: "Approximate date (optional)",
    datePlaceholder: "e.g. June 2027",
    guests: "Number of guests (optional)",
    message: "Tell us your idea",
    messagePlaceholder: "What would you like to celebrate?",
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Request received",
    successText: "Thank you for reaching out. We will get back to you as soon as possible.",
    successAgain: "Send another request",
    error: "Could not send. Please try again or email us directly.",
  },
  footer: {
    tagline: "A country estate for weddings, events and companies · Catalonia",
    rights: "All rights reserved.",
  },
};

const DICTS: Record<Lang, Dict> = { ca, es, en };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  d: Dict;
}

const Ctx = createContext<LangCtx>({ lang: "ca", setLang: () => {}, d: ca });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ca");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang, d: DICTS[lang] }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
