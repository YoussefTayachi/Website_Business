// Aller sichtbare Text der Startseite und der Entwurfsseiten.
//
// STAND 2026-09-02: zweite Ueberarbeitung. Die Seite argumentiert jetzt
// entlang dreier Fragen, die ein Betrieb aus einer Kaltakquise-Mail in
// dieser Reihenfolge stellt:
//
//   SCHMERZ    was kostet mich meine jetzige Seite     (Hero-Schlagzeile)
//   PERSON     ist das fuer mich gemeint                (Augenbraue, Galerie)
//   VERSPRECHEN was bekomme ich, von wem                (Lead, Arbeit, Person)
//
// Dabei ist die Wortzahl GESUNKEN, nicht gestiegen: 506 auf 499 Woerter
// ueber alle Zeichenketten dieser Datei, obwohl ein zweiter Fall im Abschnitt
// "Arbeit" und eine Telefonleiste dazugekommen sind. Gekuerzt wurden die
// Leads: wo ein Satz reicht, stehen nicht zwei.
//
// STAND 2026-09-01: ueberarbeitet nach dem Review von Youssefs Mentor. Was
// sich dadurch geaendert hat und warum, steht jeweils am Abschnitt. Die
// groesste Aenderung: der Vorher/Nachher-Vergleich ist ERSATZLOS GESTRICHEN
// und durch echte, laufende Arbeit ersetzt (Abschnitt `arbeit`).
//
// SPRACHE: Englisch, auch in den Entwuerfen (content/entwuerfe.ts).
//
// REGELN, die auch nach einer Ueberarbeitung gelten muessen:
//   - Keine Gedankenstriche in sichtbarem Text (Doppelpunkt, Komma, Klammer).
//   - Kein Agentur-Plural. Es ist eine Person, also erste Person Singular.
//   - Keine erfundenen Zahlen, Ladezeiten, Kundenzahlen oder Referenzen.
//   - WENIG TEXT. Wo ein Satz reicht, stehen nicht drei. Die Seite
//     argumentiert mit Bildern, nicht mit Absaetzen.
//
// WAS HIER BEWUSST NICHT STEHT: das Kennzeichen "Fictional demo". Die
// Galerie behauptet keinen Kunden und keinen Auftrag; sie heisst "what your
// page could look like" und zeigt Gestaltungen. Damit gibt es nichts
// klarzustellen. Wer den Abschnitt spaeter in eine Fallstudie umbaut ("built
// for", "our client"), behauptet etwas und muss diese Entscheidung neu
// treffen.

/** Eine Adresse, ein Weg. Leiste, Hero und Schlussblock brauchen dieselbe. */
const CALL = "https://calendly.com/youssef-tayachi-frostbreaker/30min";
/** Die Geschaeftsadresse. Frueher stand hier eine Gmail-Adresse; wer eine
 *  Website verkauft und selbst von einem Freemail-Konto schreibt, widerlegt
 *  sich in der Absenderzeile. */
const EMAIL = "youssef.tayachi@frostbreaker.app";

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
    markeHref: "/#top",
    anker: [
      { label: "Designs", href: "/#designs" },
      { label: "How it works", href: "/#how" },
    ],
    cta: { label: "Book a call", href: "/#book" },
    /** Beschriftung des Zurueckwegs auf /work/[slug]. */
    zurueck: "All designs",
  },

  /**
   * DER MODUS-SCHALTER. Seit dem 2026-09-01 ZWEI Zustaende statt drei.
   *
   * Der Mentor: "remove the 'Auto' and make it choose automatically by
   * default, then have 2 logo for dark and light themed."
   *
   * Genau so ist es jetzt gebaut, und das Argument gegen den frueheren
   * dritten Zustand traegt: "Auto" war ein sichtbarer Knopf fuer etwas, das
   * ohne jeden Knopf schon passiert. Wer nichts anfasst, bekommt weiterhin
   * die Einstellung seines Geraets, und zwar nicht als Vorauswahl, sondern
   * mitlaufend: schaltet das Telefon abends um, schaltet die Seite mit.
   * Erst ein Klick legt sie fest.
   *
   * Die Beschriftungen sind fuer Vorleser da, sichtbar sind zwei Zeichen.
   */
  modus: {
    legende: "Theme",
    optionen: [
      { wert: "light", label: "Light" },
      { wert: "dark", label: "Dark" },
    ],
  },

  /**
   * DER HERO, in drei Zeilen die drei Fragen: die Augenbraue nennt die
   * PERSON (Handwerk und lokale Betriebe), die Schlagzeile den SCHMERZ
   * (Kunden, die abspringen, bevor sie anrufen), der Lead das VERSPRECHEN.
   *
   * Der Lead ist von zwei Saetzen auf zwei kuerzere geschrumpft: der erste
   * beschreibt, wie der Kunde die Seite sieht, der zweite, was ich daraus
   * mache. Alles andere stand doppelt.
   *
   * `anruf` ist die Karte, die neben dem Telefon aufspringt: ein
   * eingehender Anruf. Sie ZEIGT das Versprechen der Schlagzeile, statt es
   * ein drittes Mal zu sagen, und ist Zierde (aria-hidden), weil das
   * Telefon daneben das Bild schon beschreibt.
   */
  hero: {
    augenbraue: "Websites for trades and local businesses",
    headline: { vor: "Stop losing customers ", akzent: "before they call", nach: "." },
    lead: "Your customer checks you on a phone, in a hurry. I build the page that makes them call.",
    cta: { label: "Book a call", href: "#book" },
    zweitCta: { label: "See the designs", href: "#designs" },
    ctaZusatz: "30 minutes. We look at your site, I tell you what I would change.",
    anruf: { titel: "Incoming call", text: "New customer" },
    geraet: {
      bildAlt:
        "A rebuilt electrician website on a phone: the phone number sits in a coloured card near the top, above the services.",
      pause: "Pause the preview",
      weiter: "Play the preview",
    },
  },

  beweis: {
    satz: "This site, the app that emailed you, every design below: all built by me.",
    links: [
      { label: "frostbreaker.app", href: "https://www.frostbreaker.app/", zusatz: "Product site" },
      { label: "app.frostbreaker.app", href: "https://app.frostbreaker.app/", zusatz: "The software" },
    ],
    /** Steht vor jedem Chip als gruener Punkt: beide Adressen laufen. */
    live: "Live",
  },

  /**
   * DIE GALERIE. Der Kern der Seite: ein Betrieb soll sehen, was moeglich
   * ist, und nicht darueber lesen.
   *
   * NEU AM 2026-09-01: jede Karte fuehrt auf eine eigene Seite (/work/<slug>),
   * auf der der Entwurf als ECHTE, bedienbare Seite steht und nicht als Bild.
   * Der Mentor hatte beides angemerkt: eine Seite je Entwurf, und beim
   * Ueberfahren eine Karte mit dem Namen des Betriebs und dem Weg dorthin.
   *
   * ENTFALLEN IST DER FENSTERRAHMEN mit den drei Punkten ("remove the fake
   * computer button"). Er war Dekoration, die einen Browser behauptet, und er
   * kostete oben in jeder Karte 40 Pixel, die dem Entwurf gehoerten.
   *
   * Der Lead ist auf einen Satz geschrumpft. "Six trades" nennt nebenbei die
   * PERSON: wer Dachdecker ist, findet sich in der Liste.
   */
  galerie: {
    id: "designs",
    augenbraue: "Designs",
    titel: "What your page could look like.",
    lead: "Six trades, six different layouts. Open any of them.",
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
    /** Beschriftung des Knopfes auf der Karte. */
    oeffnen: "Open the design",
  },

  /**
   * ECHTE ARBEIT. Seit dem 2026-09-02 ZWEI Faelle statt einem.
   *
   * WARUM DER VERGLEICH WEG IST (2026-09-01): "remove 'Before and after'
   * because it doesn't really mean anything, showing your previous is much
   * more meaningful than a before and after." Der Einwand ist richtig: die
   * alte Fassung im Vergleich war SELBST GEBAUT, und eine Seite, die man
   * absichtlich schlecht baut, um sie danach zu schlagen, beweist nichts.
   *
   * WAS JETZT DA STEHT:
   *
   * 1. Frostbreaker. Eigene Software, eigene Produktseite, beide oeffentlich
   *    erreichbar und verlinkt.
   *
   * 2. DER PROTOTYP FUER EINEN ZEMENTHERSTELLER. Der Betrieb hat am
   *    2026-09-02 zugestimmt, dass der Entwurf gezeigt wird, unter einer
   *    Bedingung: OHNE SEINEN NAMEN. Deshalb steht hier die Branche und
   *    nicht die Firma, die Aufnahme ist anonymisiert (Logo, Telefonnummer
   *    und Produktname sind bei der Aufnahme ausgeblendet, siehe
   *    scripts/aufnahmen.mjs), und es gibt KEINEN LINK auf den Entwurf: die
   *    veroeffentlichte Fassung traegt das Logo. Wer den Namen dazuschreibt
   *    oder verlinkt, bricht die Zusage.
   *
   *    Es ist auch KEIN ZITAT dabei. Der Betrieb hat der Darstellung
   *    zugestimmt, er hat keinen Satz dazu gesagt. Ein erfundenes Zitat
   *    waere genau die Sorte Referenz, die diese Seite nicht traegt.
   */
  arbeit: {
    id: "work",
    augenbraue: "Real work",
    titel: "Built, shipped, still running.",
    lead: "My own software, and a prototype for a real manufacturer, shown with their permission.",
    faelle: [
      {
        slug: "frostbreaker",
        name: "frostbreaker.app",
        art: "Product site and web app",
        text: "Designed and built by me, front to back. The software behind it sent you here.",
        href: "https://www.frostbreaker.app/",
        bildAlt:
          "The Frostbreaker product site: a large headline, a dark preview of the app, and the navigation across the top.",
        knopf: "Open frostbreaker.app",
      },
      {
        slug: "cement",
        name: "Cement manufacturer",
        art: "Redesign prototype, USA",
        text: "Built on their real product data. Name withheld at their request.",
        bildAlt:
          "Prototype homepage for a cement manufacturer: a night photo of a road crew pouring concrete, a large headline, three figures in a row.",
      },
    ],
  },

  /**
   * DER ABLAUF. Seit dem 2026-09-01 SECHS benannte Stufen statt drei Saetze.
   *
   * Der Mentor: "For 'How it works' it's much better to have a title like
   * 'Onboarding; Research; Branding; Design; Launch; Maintenance' instead of
   * having a sentence."
   *
   * DIE ZEILE UNTER JEDER STUFE BLEIBT KURZ. Der Titel traegt, der Satz
   * erklaert. Wo er laenger wird als eine Zeile, ist die Stufe falsch
   * benannt.
   */
  ablauf: {
    id: "how",
    augenbraue: "How it works",
    titel: "Six stages. You see every one of them.",
    schritte: [
      { nr: "01", titel: "Onboarding", text: "One call. I learn the trade and the goal." },
      { nr: "02", titel: "Research", text: "Your area, your competitors, what customers search for." },
      { nr: "03", titel: "Branding", text: "Colour, type and logo that fit the trade." },
      { nr: "04", titel: "Design", text: "You see the real page on your own phone." },
      { nr: "05", titel: "Launch", text: "Live on your domain. Files and logins are yours." },
      { nr: "06", titel: "Maintenance", text: "Changes when you need them. You email me." },
    ],
  },

  /**
   * WER DAHINTERSTECKT. Ein echtes Foto und zwei Saetze.
   *
   * Die Zielgruppe kauft von einer Person, nicht von einer Marke. Ein
   * Gesicht beantwortet in einer Sekunde, wer da schreibt, und ob hier eine
   * Agentur mit Kundenbetreuern sitzt oder ein Mensch.
   *
   * Der zweite Absatz ist von 24 auf 13 Woerter geschrumpft und sagt
   * dasselbe: kein Zwischenmensch, und das gilt auch in einem Jahr.
   *
   * KEIN STOCKFOTO. Es ist sein eigenes Portraet, dasselbe wie auf
   * frostbreaker.app.
   */
  person: {
    augenbraue: "Who builds it",
    titel: "You deal with the person who does the work.",
    absaetze: [
      "I'm Youssef. I design the page, I build it, and I answer when you write back.",
      "No account manager, no handover. A year from now, you still email me.",
    ],
    name: "Youssef Tayachi",
    rolle: "Frostbreaker Marketing",
    bildAlt: "Youssef Tayachi, portrait.",
  },

  /**
   * DER SCHLUSS, MIT KALENDER AUF DER SEITE.
   *
   * Der Mentor: "For the CTA, have the calendar integrated with your website
   * to reduce friction." Richtig: jeder Wechsel auf eine fremde Domain
   * kostet Buchungen, und calendly.com sieht nicht aus wie diese Seite.
   *
   * WARUM TROTZDEM EIN KLICK DAVOR STEHT: der Kalender kommt von Calendly,
   * einem Dritten, und setzt beim Laden dessen Cookies. Ein deutscher Betrieb
   * mit Impressum und Datenschutzerklaerung darf so etwas nach TDDDG Paragraf
   * 25 nicht ungefragt nachladen. Der Klick IST die Einwilligung, und er
   * kostet einen Klick statt eines Seitenwechsels.
   *
   * Wer das anders bewerten will, aendert genau eine Zeile in
   * components/start/kalender.tsx (`geladen` von Anfang an true) und
   * streicht den Absatz in content/seite.ts, Datenschutz.
   */
  schluss: {
    id: "book",
    augenbraue: "Book a call",
    titel: "Let's look at your site together.",
    lead: "Thirty minutes, no pitch. Worst case you leave with a list of fixes.",
    fakten: ["30 minutes", "Video call", "Costs nothing"],
    kalender: {
      /** Beschriftung des Rahmens fuer Vorleser. */
      rahmen: "Booking calendar",
      knopf: "Open the calendar",
      hinweis: "The calendar is loaded from Calendly and sets their cookies.",
      direkt: { label: "Or book on calendly.com", href: CALL },
      laedt: "Loading the calendar",
    },
  },

  /**
   * DIE TELEFONLEISTE. Auf dem Telefon steht der Knopf aus der Kopfleiste
   * nicht (nachgerechnet in start.css), und der Hero-Knopf ist nach zwei
   * Bildschirmen aus dem Bild. Diese Leiste haengt unten fest, sobald der
   * Hero vorbei ist, und verschwindet, sobald der Kalender im Bild steht:
   * dort steht der Weg schon.
   */
  mobilCta: { label: "Book a call", href: "#book" },

  /**
   * DIE ENTWURFSSEITEN unter /work/[slug]. Der Mentor wollte je Prototyp eine
   * eigene Seite, auf der mehr steht als der Name.
   *
   * Was dort steht, ist bewusst nicht mehr Text ueber den Betrieb (den gibt
   * es nicht), sondern die drei GESTALTUNGSENTSCHEIDUNGEN dieses Entwurfs.
   * Das ist der Unterschied zwischen einer Galerie und einem Portfolio: die
   * Galerie zeigt, wie es aussieht, das Portfolio sagt, warum.
   */
  werk: {
    augenbraueNotizen: "Design decisions",
    vorschau: "Full design, live on this page",
    hinweis:
      "A design study, not a client site. The business is invented so nothing here claims work I was not asked to do.",
    weiter: { titel: "The other designs", knopf: "Open" },
    cta: {
      titel: "Want one that fits your trade?",
      lead: "Thirty minutes on a call and you will know what yours should look like.",
      knopf: "Book a call",
    },
  },

  fuss: {
    kontaktLabel: "Contact",
    mail: EMAIL,
    rechtLinks: [
      { label: "Imprint", href: "/impressum" },
      { label: "Privacy", href: "/datenschutz" },
    ],
    copyright: "© 2026 Youssef Tayachi",
    nachOben: "Back to top",
  },
} as const;

export type StartContent = typeof start;
