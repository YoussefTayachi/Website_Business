// DIE ENTWUERFE. Sechs Website-Gestaltungen, die auf der Startseite als
// Galerie stehen und jede fuer sich unter /work/<slug> als eigene Seite.
//
// ══ WARUM DIESE DATEI AM 2026-09-01 UMGEBAUT WURDE ═════════════════════════
// Youssefs Mentor hat die Galerie geprueft und den Kern getroffen: "These 6
// websites have a similar layout, likely a template, which isn't a good look.
// If you use a template it'll feel cheap."
//
// Er hatte recht, und der Fehler stand hier. Es gab DREI Bauformen fuer SECHS
// Entwuerfe (split, band, kachel), also zweimal dieselbe Seite in anderen
// Farben. Wer sechs Gestaltungen zeigt, um Gestaltung zu verkaufen, und in
// Wahrheit drei zeigt, beweist das Gegenteil von dem, was er behauptet.
//
// Jetzt hat JEDER ENTWURF SEINE EIGENE BAUFORM, und die Unterschiede liegen
// nicht in der Farbe, sondern im Skelett:
//
//   northline   Held randlos mit Text darin, Navigation im Bild
//   voltas      senkrechte Leiste links, Inhalt rechts daneben
//   ridge       alles mittig, Zeitschriftensatz, Serife
//   clearflow   Notdienststreifen oben, Bildspalte links, Leistungen als Zeilen
//   stoneleaf   Bild laeuft rechts aus dem Bild, Karte ueberlappt es von links
//   foxandco    kein Held-Bild, reine Typografie, Farbband als Abschluss
//
// Der Preis dafuer ist Absicht: sechs Bauformen driften leichter auseinander
// als drei. Dagegen steht, dass alle sechs aus DENSELBEN Bausteinen kommen
// (components/entwuerfe/formen/, gemeinsame Knoepfe und Typografie in
// entwurf.css) und in einem Durchlauf zusammen geprueft werden.
//
// WARUM JEDER ENTWURF SEINE EIGENE PALETTE UND SCHRIFT HAT: eine Galerie, in
// der alle sechs die Farben der Portfolio-Seite tragen, zeigt sechsmal
// dieselbe Seite. Die Portfolio-Tokens (--c-*) haben hier nichts zu suchen.
//
// KEINE FOTOS. Die Bildflaechen sind Verlaeufe und Formen aus CSS und SVG.
// Ein Entwurf, der ohne gekauftes Bildmaterial gut aussieht, ist der bessere
// Beweis: er zeigt Gestaltung statt Einkauf.
//
// ══ WARUM DIE BETRIEBE ERFUNDEN SIND ═══════════════════════════════════════
// Der Mentor riet zusaetzlich, die Entwuerfe auf ECHTE, existierende Betriebe
// zu setzen. Das ist fuer den Prototyp, der IN EINER KALTAKQUISE-MAIL an
// genau diesen Betrieb geht, genau richtig, und so arbeitet Frostbreaker auch.
// In einer oeffentlichen Galerie ist es etwas anderes: dort steht der Name
// eines fremden Unternehmens unter einer Gestaltung, die es nie beauftragt
// hat. Youssef hat denselben Fall bei CTS Cement schon entschieden (kein
// Einbau ohne Zustimmung, siehe Website_Business/README.md), und diese
// Entscheidung gilt hier weiter. Sobald ein echter Betrieb zustimmt, gehoert
// er hier herein und dieser Absatz gestrichen.
//
// SPRACHE: Englisch, wie die ganze Startseite.

/** Sechs Entwuerfe, sechs Bauformen. Die Bauform IST die Gestaltung. */
export type Bauform = "overlay" | "seitenleiste" | "mitte" | "streifen" | "ueberlappung" | "typo";

export type Entwurf = {
  slug: string;
  bauform: Bauform;
  /** Name des Betriebs im Entwurf. */
  marke: string;
  /** Kurzform der Marke fuer enge Stellen (senkrechte Leiste, Fuss). */
  markeKurz: string;
  /** Bildunterschrift der Karte in der Galerie. */
  branche: string;
  /** Eine Zeile ueber die Gestaltung, fuer /work/<slug>. */
  kurz: string;
  /** Drei Entscheidungen, die diesen Entwurf ausmachen. Fuer /work/<slug>. */
  notizen: { titel: string; text: string }[];
  /** Die Farben dieses Entwurfs. Nur hier stehen sie, nie in der Komponente. */
  farbe: {
    grund: string;
    flaeche: string;
    tinte: string;
    leise: string;
    linie: string;
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
  /** Zeile im Fuss des Entwurfs. Ort statt Adresse: eine erfundene Domain
   *  in einem Entwurf sieht aus wie ein Versehen, ein Ort wie Inhalt. */
  ort: string;
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
  /* ── 1. NORTHLINE ────────────────────────────────────────────────────────
     Held randlos, Navigation IM Bild, Schlagzeile unten links. Die Bauform
     einer Baufirma: das Bauwerk traegt die Seite, die Schrift steht darin. */
  {
    slug: "northline",
    bauform: "overlay",
    marke: "Northline Builders",
    markeKurz: "Northline",
    branche: "Construction",
    kurz: "A builder whose work fills the screen before a word is read.",
    notizen: [
      {
        titel: "The picture is the page",
        text: "Navigation sits inside the image, so nothing competes with the build itself.",
      },
      {
        titel: "One line, very large",
        text: "A builder is judged on trust. A short promise at that size reads as confidence.",
      },
      {
        titel: "Dark, because sites are dirty",
        text: "Charcoal and amber survive being looked at outdoors on a cracked phone.",
      },
    ],
    farbe: {
      grund: "#12151a",
      flaeche: "#1b1f26",
      tinte: "#f4f2ee",
      leise: "#a8aeb9",
      linie: "#2c323c",
      akzent: "#ffb020",
      aufAkzent: "#12151a",
      bild1: "#2b3444",
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
    ort: "Yorkshire and the North East",
  },

  /* ── 2. VOLTAS ───────────────────────────────────────────────────────────
     Senkrechte Leiste links, Inhalt rechts. Die Nummer klebt unten in der
     Leiste und laeuft damit auf jeder Bildschirmhoehe mit: ein Elektriker
     wird angerufen, nicht angeschrieben. */
  {
    slug: "voltas",
    bauform: "seitenleiste",
    marke: "Voltas Electric",
    markeKurz: "Voltas",
    branche: "Electrician",
    kurz: "A rail down the left that never lets go of the phone number.",
    notizen: [
      {
        titel: "The number never scrolls away",
        text: "It sits at the foot of the rail, in reach on every screen.",
      },
      {
        titel: "Four tiles, no paragraphs",
        text: "People scanning in an emergency read four words faster than four sentences.",
      },
      {
        titel: "White and one blue",
        text: "Certified trades look safer in clean colour than in a busy palette.",
      },
    ],
    farbe: {
      grund: "#ffffff",
      flaeche: "#f1f5fc",
      tinte: "#0d1a31",
      leise: "#55637d",
      linie: "#dde5f3",
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
    ort: "Greater Manchester",
  },

  /* ── 3. RIDGE & EAVES ────────────────────────────────────────────────────
     Alles mittig, Serife, Haarlinien. Zeitschriftensatz fuer einen Betrieb,
     der mit Bestand und Handwerk wirbt und nicht mit Tempo. */
  {
    slug: "ridge",
    bauform: "mitte",
    marke: "Ridge & Eaves",
    markeKurz: "Ridge & Eaves",
    branche: "Roofing",
    kurz: "Centred, set in a serif, closer to a magazine than a brochure.",
    notizen: [
      {
        titel: "Centred on purpose",
        text: "Three generations of roofers sell heritage. Symmetry says settled.",
      },
      {
        titel: "A serif carries the promise",
        text: "The one place on the page where the typeface does the arguing.",
      },
      {
        titel: "Hairlines, not boxes",
        text: "Thin rules separate the sections without adding another card.",
      },
    ],
    farbe: {
      grund: "#fbf7f1",
      flaeche: "#ffffff",
      tinte: "#211a13",
      leise: "#6d5e51",
      linie: "#e6dccd",
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
    ort: "Oxfordshire",
  },

  /* ── 4. CLEARFLOW ────────────────────────────────────────────────────────
     Notdienststreifen ueber der ganzen Breite, darunter Bildspalte links und
     Leistungen als Zeilen. Keine Kacheln: eine Liste liest sich schneller,
     wenn im Bad das Wasser steht. */
  {
    slug: "clearflow",
    bauform: "streifen",
    marke: "Clearflow",
    markeKurz: "Clearflow",
    branche: "Plumbing",
    kurz: "An emergency strip across the top and services as scannable rows.",
    notizen: [
      {
        titel: "The strip comes first",
        text: "Above the logo, because a burst pipe outranks a brand.",
      },
      {
        titel: "Rows beat tiles",
        text: "A list is read top to bottom in one pass. A grid asks you to choose.",
      },
      {
        titel: "Colour on one edge only",
        text: "Teal marks the urgent parts, so the urgent parts are the ones you see.",
      },
    ],
    farbe: {
      grund: "#f3faf9",
      flaeche: "#ffffff",
      tinte: "#0c2a29",
      leise: "#486664",
      linie: "#d5e8e5",
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
    ort: "Bristol and Bath",
  },

  /* ── 5. STONELEAF ────────────────────────────────────────────────────────
     Das Bild laeuft rechts aus dem Fenster, eine Karte ueberlappt es von
     links. Die einzige Bauform mit einer Ueberschneidung, und sie hat einen
     Grund: ein Garten hat keine Kanten. */
  {
    slug: "stoneleaf",
    bauform: "ueberlappung",
    marke: "Stoneleaf",
    markeKurz: "Stoneleaf",
    branche: "Landscaping",
    kurz: "The image runs off the edge and the text sits on top of it.",
    notizen: [
      {
        titel: "Nothing is squared off",
        text: "The picture leaves the frame on the right, the way a garden leaves the plot.",
      },
      {
        titel: "The card overlaps",
        text: "One deliberate overlap gives the page depth without a single shadow effect.",
      },
      {
        titel: "Four seasons in a row",
        text: "Tall narrow tiles below, because planting is sold as a year, not a day.",
      },
    ],
    farbe: {
      grund: "#f6f7f2",
      flaeche: "#ffffff",
      tinte: "#192317",
      leise: "#586a53",
      linie: "#dde3d3",
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
      { titel: "Upkeep", text: "Four visits a year, same two people." },
    ],
    ruf: "01223 774 208",
    ort: "Cambridgeshire",
  },

  /* ── 6. FOX & CO ─────────────────────────────────────────────────────────
     Kein Held-Bild. Die Schlagzeile IST das Bild, und der Abschluss ist ein
     Farbband ueber die volle Breite. Der Gegenbeweis zur Annahme, eine gute
     Seite brauche oben ein Foto. */
  {
    slug: "foxandco",
    bauform: "typo",
    marke: "Fox & Co",
    markeKurz: "Fox & Co",
    branche: "Painting",
    kurz: "No hero image at all. The headline does the whole job.",
    notizen: [
      {
        titel: "Type instead of a photograph",
        text: "A painter has no stock photo that is not a lie. So the words carry it.",
      },
      {
        titel: "One band of colour",
        text: "The only saturated area on the page is the one that asks for the job.",
      },
      {
        titel: "Fast, because there is nothing to load",
        text: "A page with no hero image is readable before a photograph would have arrived.",
      },
    ],
    farbe: {
      grund: "#faf7f5",
      flaeche: "#ffffff",
      tinte: "#1b1917",
      leise: "#6a615b",
      linie: "#e7e0da",
      akzent: "#d94f26",
      aufAkzent: "#ffffff",
      bild1: "#1b1917",
      bild2: "#d94f26",
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
    ort: "Manchester and Cheshire",
  },
];

export const entwurfNach = (slug: string) => entwuerfe.find((e) => e.slug === slug);
