// Aller sichtbare Text der Startseite.
//
// STAND 2026-08-31: Die Seite steht auf marketing.frostbreaker.app. Sie hat
// die Farben von frostbreaker.app, aber NICHT dessen Schrift: gesetzt ist
// Wix Madefor, nach dem Vorbild von wix.com/website/templates. Der Aufbau
// folgt derselben Idee wie dort: eine Galerie aus Gestaltungen, damit ein
// Betrieb sieht, was moeglich ist, statt es zu lesen.
//
// SPRACHE: Englisch, auch in den Entwuerfen (content/entwuerfe.ts) und in
// der alten Vergleichsfassung (content/projekte.ts).
//
// REGELN, die auch nach einer Ueberarbeitung gelten muessen:
//   - Keine Gedankenstriche in sichtbarem Text (Doppelpunkt, Komma, Klammer).
//   - Kein Agentur-Plural. Es ist eine Person, also erste Person Singular.
//   - Keine erfundenen Zahlen, Ladezeiten, Kundenzahlen oder Referenzen.
//   - WENIG TEXT. Wo ein Satz reicht, stehen nicht drei. Die Seite
//     argumentiert mit Bildern, nicht mit Absaetzen.
//
// WAS HIER BEWUSST NICHT MEHR STEHT: das Kennzeichen "Fictional demo".
// Der Grund ist keine Nachlaessigkeit, sondern ein geaenderter Aufbau. Die
// Galerie behauptet keinen Kunden und keinen Auftrag; sie heisst "what your
// page could look like" und zeigt Gestaltungen. Damit gibt es nichts
// klarzustellen. Wer den Abschnitt spaeter in eine Fallstudie umbaut ("built
// for", "our client"), behauptet etwas und muss diese Entscheidung neu
// treffen.

/** Eine Adresse, ein Weg. Leiste, Hero und Schlussblock brauchen dieselbe. */
const CALL = "https://calendly.com/youssef-tayachi-frostbreaker/30min";
const EMAIL = "youtaybusiness@gmail.com";

export const start = {
  meta: {
    title: "Frostbreaker Marketing: websites that get the call",
    description:
      "I design and build the one page that gets your business the call. See what yours could look like.",
    locale: "en_US",
  },

  sprungmarke: { label: "Skip to content", zielId: "top" },

  notFound: {
    title: "This page doesn't exist.",
    ctaLabel: "Back to the homepage",
  },

  leiste: {
    marke: "frostbreaker",
    markeZusatz: "marketing",
    markeHref: "#top",
    anker: [
      { label: "Designs", href: "#designs" },
      { label: "How it works", href: "#how" },
    ],
    cta: { label: "Book a call", href: CALL },
  },

  modus: {
    legende: "Theme",
    optionen: [
      { wert: "system", label: "Auto" },
      { wert: "light", label: "Light" },
      { wert: "dark", label: "Dark" },
    ],
  },

  hero: {
    augenbraue: "Web design for local businesses",
    headline: { vor: "Stop losing customers ", akzent: "before they call", nach: "." },
    lead: "I look at your website the way your customer does: on a phone, in a hurry. Then I design and build the page that brings the call.",
    cta: { label: "Book a call", href: CALL },
    zweitCta: { label: "See the designs", href: "#designs" },
    ctaZusatz: "30 minutes. We look at your site together and I tell you what I would change.",
    geraet: {
      bildAlt:
        "A rebuilt electrician website on a phone: the phone number sits in a coloured card near the top, above the services.",
      pause: "Pause the preview",
      weiter: "Play the preview",
    },
  },

  beweis: {
    satz: "The site you are on, the app that emailed you and every design below: I built all of them.",
    links: [
      { label: "frostbreaker.app", href: "https://www.frostbreaker.app/", zusatz: "Product site" },
      { label: "app.frostbreaker.app", href: "https://app.frostbreaker.app/", zusatz: "The software" },
    ],
  },

  /**
   * DIE GALERIE. Der Kern der Seite und der Grund fuer ihren Umbau: ein
   * Betrieb soll sehen, was moeglich ist, und nicht darueber lesen.
   *
   * Die Karten sind Aufnahmen echter, gebauter Seiten (components/entwuerfe/),
   * keine Bildschirmfotos fremder Vorlagen. Deshalb steht hier "I built" und
   * nicht "inspired by", und deshalb braucht keine Karte einen Hinweis.
   */
  galerie: {
    id: "designs",
    augenbraue: "Designs",
    titel: "What your page could look like.",
    lead: "Six directions, each one built from scratch. Yours ends up looking like your business, not like a template someone else is also using.",
    /** Reihenfolge und Beschriftung der Karten. Die Bilder kommen aus dem
     *  Manifest, die Zuordnung macht components/start/galerie.tsx. */
    karten: [
      { slug: "northline", name: "Northline Builders", art: "Construction" },
      { slug: "voltas", name: "Voltas Electric", art: "Electrician" },
      { slug: "ridge", name: "Ridge & Eaves", art: "Roofing" },
      { slug: "clearflow", name: "Clearflow", art: "Plumbing" },
      { slug: "stoneleaf", name: "Stoneleaf", art: "Landscaping" },
      { slug: "foxandco", name: "Fox & Co", art: "Painting" },
    ],
  },

  /**
   * DER VERGLEICH. Das eigentliche Verkaufsargument: dieselbe Firma, dieselben
   * Leistungen, eine neu gebaute Seite. Zwei Aufnahmen, ein Regler.
   */
  vergleich: {
    augenbraue: "Before and after",
    titel: "Same business. One rebuilt page.",
    lead: "The old site still loads. It just doesn't get the call.",
    adresse: "voltas-electric.example",
    regler: {
      label: "Compare the old and the new page",
      vorher: "Before",
      nachher: "After",
      ansageVorher: "Before, the old page",
      ansageNachher: "After, the rebuilt page",
      ansageMitte: (p: number) => `${p} percent of the rebuilt page`,
    },
    bildAltVorher:
      "The old website: a narrow box of grey text on a plain background, the phone number sitting inside an image, no clear way to get in touch.",
    bildAltNachher:
      "The rebuilt website: a bold headline, the phone number in a coloured card, and four services as tiles.",
  },

  /** DER ABLAUF. Drei Schritte, ein Satz je Schritt. */
  ablauf: {
    id: "how",
    augenbraue: "How it works",
    titel: "Three steps, no surprises.",
    schritte: [
      {
        nr: "01",
        titel: "We talk",
        text: "Thirty minutes on a call. I go through your site with you and say what I would change and why.",
      },
      {
        nr: "02",
        titel: "You see it before you decide",
        text: "I design and build the page, then send you the link. You judge the real thing on your own phone, not a sketch.",
      },
      {
        nr: "03",
        titel: "It goes live and it is yours",
        text: "You get the files and the logins. Nothing is rented back to you, and you are not tied to me afterwards.",
      },
    ],
  },

  /** DER SCHLUSS. Eine Zeile, ein Knopf. */
  schluss: {
    titel: "Let's look at your site together.",
    lead: "Thirty minutes, no pitch. Worst case you leave with a list of things to fix yourself.",
    cta: { label: "Book a call", href: CALL },
  },

  fuss: {
    kontaktLabel: "Contact",
    mail: EMAIL,
    rechtLinks: [
      { label: "Imprint", href: "/impressum" },
      { label: "Privacy", href: "/datenschutz" },
    ],
    copyright: "© 2026 Youssef Tayachi",
  },
} as const;

export type StartContent = typeof start;
