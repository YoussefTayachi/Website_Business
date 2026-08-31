// DIE ENTWUERFE. Sechs Website-Gestaltungen, die auf der Startseite als
// Galerie stehen und zeigen, was moeglich ist.
//
// WARUM SIE HIER ALS DATEN STEHEN UND NICHT ALS SECHS KOMPONENTEN: sechs
// handgeschriebene Seiten driften auseinander. Eine bekommt einen Knopf mit
// 40px, die naechste eine Ueberschrift, die auf 390px umbricht, und keiner
// merkt es, weil niemand sechs Seiten nebeneinander prueft. Hier gibt es
// DREI Bauformen (components/entwuerfe/) und sechs Fuellungen. Was an der
// Bauform stimmt, stimmt in allen Entwuerfen, die sie benutzen.
//
// WARUM JEDER ENTWURF SEINE EIGENE PALETTE HAT: eine Galerie, in der alle
// sechs Entwuerfe die Farben der Portfolio-Seite tragen, zeigt sechsmal
// dieselbe Seite. Sie sollen aussehen wie sechs verschiedene Betriebe, also
// bringt jeder seine eigenen Farben und seine eigene Schrift mit. Die
// Portfolio-Tokens (--c-*) haben in den Entwuerfen nichts zu suchen.
//
// KEINE FOTOS. Die Bildflaechen sind Verlaeufe und Formen, gebaut aus CSS
// und SVG. Fremde Stockfotos sind in diesem Projekt ausgeschlossen, und ein
// Entwurf, der ohne gekauftes Bildmaterial gut aussieht, ist der bessere
// Beweis: er zeigt Gestaltung statt Einkauf.
//
// SPRACHE: Englisch. Die Betriebe tragen englische Namen, damit die Entwuerfe
// zur Seite passen, auf der sie stehen.
//
// KEIN KENNZEICHEN, KEIN KLEINGEDRUCKTES. Diese Entwuerfe behaupten keinen
// Kunden und keinen Auftrag. Der Abschnitt, in dem sie stehen, heisst "so
// koennte deine Seite aussehen", und damit ist alles gesagt, was gesagt
// werden muss. Wer sie als Fallstudie ausgibt, muss das hier neu bewerten.

/** Die drei Bauformen. Jede hat ihre eigene Komponente. */
export type Bauform = "split" | "band" | "kachel";

export type Entwurf = {
  slug: string;
  bauform: Bauform;
  /** Name des Betriebs im Entwurf. */
  marke: string;
  /** Steht in der Adresszeile des Browserrahmens. `.example` ist reserviert. */
  adresse: string;
  /** Bildunterschrift der Karte in der Galerie. */
  titel: string;
  branche: string;
  /** Die Farben dieses Entwurfs. Nur hier stehen sie, nie in der Komponente. */
  farbe: {
    grund: string;
    flaeche: string;
    tinte: string;
    leise: string;
    akzent: string;
    aufAkzent: string;
    /** Zwei Toene fuer die Bildflaeche, als Verlauf. */
    bild1: string;
    bild2: string;
  };
  /** Schriftstapel. Kommt aus den lokal installierten Paketen, nie vom CDN. */
  schrift: { display: string; text: string };
  nav: string[];
  augenbraue: string;
  headline: string;
  lead: string;
  cta: string;
  zweit: string;
  leistungen: { titel: string; text: string }[];
  /** Kontaktzeile, die in jeder Bauform an anderer Stelle sitzt. */
  ruf: string;
};

const MADEFOR = {
  display: '"Wix Madefor Display Variable", ui-sans-serif, system-ui, sans-serif',
  text: '"Wix Madefor Text Variable", ui-sans-serif, system-ui, sans-serif',
};
const INTER = {
  display: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
  text: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
};
const NEWSREADER = {
  display: '"Newsreader Variable", ui-serif, Georgia, serif',
  text: '"Inter Variable", ui-sans-serif, system-ui, sans-serif',
};

export const entwuerfe: Entwurf[] = [
  {
    slug: "northline",
    bauform: "split",
    marke: "Northline Builders",
    adresse: "northline-builders.example",
    titel: "Construction",
    branche: "Builder",
    farbe: {
      grund: "#12151a",
      flaeche: "#1b1f26",
      tinte: "#f4f2ee",
      leise: "#a2a8b3",
      akzent: "#ffb020",
      aufAkzent: "#12151a",
      bild1: "#2a3240",
      bild2: "#ffb020",
    },
    schrift: MADEFOR,
    nav: ["Projects", "Services", "About", "Contact"],
    augenbraue: "Building since 1994",
    headline: "Solid work, on the day we said.",
    lead: "Extensions, new builds and renovation across the county. One team, one contact, a written price before we start.",
    cta: "Get a price",
    zweit: "See projects",
    leistungen: [
      { titel: "Extensions", text: "Plans, permits and build, handled end to end." },
      { titel: "New builds", text: "From the empty plot to the handover key." },
      { titel: "Renovation", text: "Old buildings brought up to today's standard." },
    ],
    ruf: "01632 960 118",
  },
  {
    slug: "voltas",
    bauform: "kachel",
    marke: "Voltas Electric",
    adresse: "voltas-electric.example",
    titel: "Electrician",
    branche: "Electrician",
    farbe: {
      grund: "#ffffff",
      flaeche: "#f2f5fb",
      tinte: "#0e1b33",
      leise: "#5a6780",
      akzent: "#1d4ed8",
      aufAkzent: "#ffffff",
      bild1: "#1d4ed8",
      bild2: "#7dd3fc",
    },
    schrift: INTER,
    nav: ["Services", "Emergency", "Reviews", "Contact"],
    augenbraue: "24 hour call out",
    headline: "Power back on, same day.",
    lead: "Fault finding, rewiring and EV chargers. Certified work, tidy sites, and a number that a person actually answers.",
    cta: "Call now",
    zweit: "Book a visit",
    leistungen: [
      { titel: "Fault finding", text: "We find it before we quote it." },
      { titel: "Rewiring", text: "Whole house or one room, to current regs." },
      { titel: "EV chargers", text: "Installed, tested and registered." },
      { titel: "Fuse boards", text: "Upgrades with a certificate on the day." },
    ],
    ruf: "0800 018 4420",
  },
  {
    slug: "ridge",
    bauform: "band",
    marke: "Ridge & Eaves",
    adresse: "ridge-and-eaves.example",
    titel: "Roofing",
    branche: "Roofer",
    farbe: {
      grund: "#fbf7f1",
      flaeche: "#ffffff",
      tinte: "#221a14",
      leise: "#6b5c50",
      akzent: "#a83b1e",
      aufAkzent: "#ffffff",
      bild1: "#c2542f",
      bild2: "#f3d9c4",
    },
    schrift: NEWSREADER,
    nav: ["Roofs", "Repairs", "Gutters", "Contact"],
    augenbraue: "Roofing, three generations",
    headline: "A roof you stop thinking about.",
    lead: "Leaks found the same week. Full replacements planned around your calendar, not ours.",
    cta: "Book a survey",
    zweit: "See our work",
    leistungen: [
      { titel: "Leak repair", text: "Traced, fixed and photographed." },
      { titel: "New roofs", text: "Tile, slate and flat, guaranteed." },
      { titel: "Gutters", text: "Cleared, realigned or replaced." },
    ],
    ruf: "01865 220 041",
  },
  {
    slug: "clearflow",
    bauform: "kachel",
    marke: "Clearflow",
    adresse: "clearflow-plumbing.example",
    titel: "Plumbing",
    branche: "Plumber",
    farbe: {
      grund: "#f4faf9",
      flaeche: "#ffffff",
      tinte: "#0d2b2a",
      leise: "#4d6c6a",
      akzent: "#0f766e",
      aufAkzent: "#ffffff",
      bild1: "#0f766e",
      bild2: "#99f6e4",
    },
    schrift: MADEFOR,
    nav: ["Services", "Boilers", "Emergency", "Contact"],
    augenbraue: "No call out fee",
    headline: "Water where it should be.",
    lead: "Boilers, bathrooms and the leak under the sink. Fixed price agreed before anyone lifts a spanner.",
    cta: "Get a fixed price",
    zweit: "Emergency line",
    leistungen: [
      { titel: "Boiler service", text: "Annual check with a written report." },
      { titel: "Bathrooms", text: "Designed, fitted and tiled by one team." },
      { titel: "Leaks", text: "Located without taking your floor apart." },
      { titel: "Drainage", text: "Cameras first, digging only if we must." },
    ],
    ruf: "0800 555 0142",
  },
  {
    slug: "stoneleaf",
    bauform: "band",
    marke: "Stoneleaf",
    adresse: "stoneleaf-gardens.example",
    titel: "Landscaping",
    branche: "Landscaper",
    farbe: {
      grund: "#f6f7f2",
      flaeche: "#ffffff",
      tinte: "#1a2418",
      leise: "#5b6b56",
      akzent: "#2f6b3a",
      aufAkzent: "#ffffff",
      bild1: "#2f6b3a",
      bild2: "#d8e6c4",
    },
    schrift: NEWSREADER,
    nav: ["Gardens", "Paving", "Planting", "Contact"],
    augenbraue: "Gardens and grounds",
    headline: "A garden that works in February.",
    lead: "Planting, paving and the structure underneath. Drawn first, so you see it before you buy it.",
    cta: "Request a drawing",
    zweit: "See gardens",
    leistungen: [
      { titel: "Design", text: "A plan you can hold, before any digging." },
      { titel: "Paving", text: "Stone laid to last a generation." },
      { titel: "Planting", text: "Chosen for your soil and your light." },
    ],
    ruf: "01223 774 208",
  },
  {
    slug: "foxandco",
    bauform: "split",
    marke: "Fox & Co",
    adresse: "foxandco-painters.example",
    titel: "Painting",
    branche: "Painter",
    farbe: {
      grund: "#faf7f5",
      flaeche: "#ffffff",
      tinte: "#1c1917",
      leise: "#6b625c",
      akzent: "#e0562d",
      aufAkzent: "#ffffff",
      bild1: "#1c1917",
      bild2: "#e0562d",
    },
    schrift: INTER,
    nav: ["Interiors", "Exteriors", "Process", "Contact"],
    augenbraue: "Painting and decorating",
    headline: "Clean lines, no mess left behind.",
    lead: "Interiors and exteriors, prepared properly. We cover, we sand, we finish, and you get your room back the same week.",
    cta: "Book an estimate",
    zweit: "How we work",
    leistungen: [
      { titel: "Interiors", text: "Walls, woodwork and ceilings, dust controlled." },
      { titel: "Exteriors", text: "Rendered, weatherproofed, guaranteed five years." },
      { titel: "Preparation", text: "The part that decides how long it lasts." },
    ],
    ruf: "0161 496 0233",
  },
];

export const entwurfNach = (slug: string) => entwuerfe.find((e) => e.slug === slug);
