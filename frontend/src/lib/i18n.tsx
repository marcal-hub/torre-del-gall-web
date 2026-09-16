import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ca" | "es" | "en";
export const LANGS: Lang[] = ["ca", "es", "en"];

const ca = {
  nav: {
    espai: "Espai",
    esdeveniments: "Esdeveniments",
    gastronomia: "Gastronomia",
    galeria: "Galeria",
    quiSom: "Qui som",
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
    chapter: "L'espai",
    title: "Una masia. Moltes possibilitats.",
    lead: "Un espai envoltat de natura pensat per celebrar, reunir-se i crear moments especials.",
    quote: "Pedra, llum i silenci.",
    captions: ["El pati de la masia", "Pedra i buguenvíl·lea", "Racons amb caràcter", "L'entorn natural", "Detalls que expliquen", "Vistes de la finca"],
  },
  esdeveniments: {
    chapter: "Esdeveniments",
    title: "Molt més que casaments.",
    intro: "La Torre del Gall s'adapta a cada celebració: íntima o gran, familiar o corporativa.",
    discover: "Descobreix",
    items: [
      { num: "01", title: "Bodes", desc: "Cerimònies, banquets i festes envoltades de natura." },
      { num: "02", title: "Esdeveniments", desc: "Celebracions privades, trobades i moments especials." },
      { num: "03", title: "Empreses", desc: "Reunions, menjars d'empresa, presentacions i team building." },
    ],
  },
  gastronomia: {
    kicker: "Cuina pròpia",
    title: "Gastronomia pròpia",
    lead: "La nostra cuina també forma part de l’experiència.",
    support: "Oferim gastronomia pròpia per als vostres esdeveniments: menús pensats per acompanyar cada celebració, del primer brindis a l’últim plat.",
    ctaQ: "Vols conèixer els nostres menús?",
    cta: "Més informació",
    captions: ["El brindis", "El plat", "La cuina", "La taula parada"],
  },
  galeria: {
    chapter: "Galeria",
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
    chapter: "Contacte",
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
  quiSom: {
    kicker: "La nostra història",
    title: "Qui som",
    alt: "La masia de La Torre del Gall",
    paragraphs: [
      "Tot va començar l’any 1969, amb una petita botiga de 40 metres quadrats a Vilafranca del Penedès.",
      "En Josep Soler i la Rosa Cuscó, amb només 25 anys, van decidir emprendre aquella aventura.",
      "Amb els anys, aquella botigueta va créixer i vam passar a una masia del segle XVII, on vam començar a fer plats cuinats, càtering i casaments.",
      "El 2019 vam celebrar 50 anys d’història.",
      "50 anys de canvis, de feina i, sobretot, de persones.",
    ],
    closing: "Perquè si alguna cosa no ha canviat és la nostra manera de fer: ser propers i fer-vos sentir com a casa.",
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
    gastronomia: "Gastronomía",
    galeria: "Galería",
    quiSom: "Quiénes somos",
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
    chapter: "El espacio",
    title: "Una masía. Muchas posibilidades.",
    lead: "Un espacio rodeado de naturaleza pensado para celebrar, reunirse y crear momentos especiales.",
    quote: "Piedra, luz y silencio.",
    captions: ["El patio de la masía", "Piedra y buganvilla", "Rincones con carácter", "El entorno natural", "Detalles que cuentan", "Vistas de la finca"],
  },
  esdeveniments: {
    chapter: "Eventos",
    title: "Mucho más que bodas.",
    intro: "La Torre del Gall se adapta a cada celebración: íntima o grande, familiar o corporativa.",
    discover: "Descubrir",
    items: [
      { num: "01", title: "Bodas", desc: "Ceremonias, banquetes y fiestas rodeadas de naturaleza." },
      { num: "02", title: "Eventos", desc: "Celebraciones privadas, encuentros y momentos especiales." },
      { num: "03", title: "Empresas", desc: "Reuniones, comidas de empresa, presentaciones y team building." },
    ],
  },
  gastronomia: {
    kicker: "Cocina propia",
    title: "Gastronomía propia",
    lead: "Nuestra cocina también forma parte de la experiencia.",
    support: "Ofrecemos gastronomía propia para vuestros eventos: menús pensados para acompañar cada celebración, del primer brindis al último plato.",
    ctaQ: "¿Quieres conocer nuestros menús?",
    cta: "Más información",
    captions: ["El brindis", "El plato", "La cocina", "La mesa puesta"],
  },
  galeria: {
    chapter: "Galería",
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
    chapter: "Contacto",
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
  quiSom: {
    kicker: "Nuestra historia",
    title: "Quiénes somos",
    alt: "La masía de La Torre del Gall",
    paragraphs: [
      "Todo empezó en 1969, con una pequeña tienda de 40 metros cuadrados en Vilafranca del Penedès.",
      "Josep Soler y Rosa Cuscó, con solo 25 años, decidieron emprender aquella aventura.",
      "Con los años, aquella tiendecita creció y pasamos a una masía del siglo XVII, donde empezamos a hacer platos cocinados, cátering y bodas.",
      "En 2019 celebramos 50 años de historia.",
      "50 años de cambios, de trabajo y, sobre todo, de personas.",
    ],
    closing: "Porque si algo no ha cambiado es nuestra manera de hacer: ser cercanos y haceros sentir como en casa.",
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
    gastronomia: "Gastronomy",
    galeria: "Gallery",
    quiSom: "About us",
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
    chapter: "The estate",
    title: "One estate. Endless possibilities.",
    lead: "A space surrounded by nature, made for celebrating, gathering and creating special moments.",
    quote: "Stone, light and silence.",
    captions: ["The estate courtyard", "Stone and bougainvillea", "Corners with character", "The natural surroundings", "Details that tell stories", "Views over the grounds"],
  },
  esdeveniments: {
    chapter: "Events",
    title: "Far more than weddings.",
    intro: "La Torre del Gall adapts to every celebration: intimate or grand, family or corporate.",
    discover: "Discover",
    items: [
      { num: "01", title: "Weddings", desc: "Ceremonies, banquets and parties surrounded by nature." },
      { num: "02", title: "Events", desc: "Private celebrations, gatherings and special moments." },
      { num: "03", title: "Corporate", desc: "Meetings, business lunches, presentations and team building." },
    ],
  },
  gastronomia: {
    kicker: "Our own kitchen",
    title: "Our own gastronomy",
    lead: "Our kitchen is also part of the experience.",
    support: "We offer our own gastronomy for your events: menus designed to accompany every celebration, from the first toast to the last dish.",
    ctaQ: "Want to discover our menus?",
    cta: "More information",
    captions: ["The toast", "The dish", "The kitchen", "The table set"],
  },
  galeria: {
    chapter: "Gallery",
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
    chapter: "Contact",
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
  quiSom: {
    kicker: "Our story",
    title: "About us",
    alt: "The La Torre del Gall farmhouse",
    paragraphs: [
      "It all began in 1969, with a small 40-square-metre shop in Vilafranca del Penedès.",
      "Josep Soler and Rosa Cuscó, only 25 years old, decided to embark on that adventure.",
      "Over the years, that little shop grew and we moved to a 17th-century farmhouse, where we began making cooked dishes, catering and weddings.",
      "In 2019 we celebrated 50 years of history.",
      "50 years of changes, of work and, above all, of people.",
    ],
    closing: "Because if anything has not changed, it is our way of doing things: staying close and making you feel at home.",
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
