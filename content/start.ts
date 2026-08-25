// Aller sichtbare Text der Startseite, gegliedert nach den neun Akten der
// Scroll-Inszenierung. Eine Aenderung hier ist die einzige, die noetig ist, um
// die Seite umzuformulieren: die Komponenten unter components/start/ enthalten
// keinen einzigen Satz.
//
// SPRACHE: Englisch. Das ist eine bewusste Festlegung fuer die Startseite und
// hebt die alte Deutsch-Regel aus CLAUDE.md fuer den Seiteninhalt auf. Die
// Fallstudien (/arbeit/[slug]) sind weiter deutsch, ihr Text steht unveraendert
// in content/seite.ts. Impressum und Datenschutz sind seit dem redaktionellen
// Durchgang vom 2026-08-25 ebenfalls Englisch (siehe Kommentar dort), damit
// eine englische Startseite nicht auf halb deutsche Rechtsseiten verlinkt.
//
// STAND: redaktionell ueberarbeitet am 2026-08-25, gegenueber dem
// urspruenglich uebernommenen Text aus dem verifizierten Build
// (scrollcraft/builds/casefile/index.html) gekuerzt und praezisiert. Wer
// weiter ueberarbeitet, arbeitet ausschliesslich in dieser Datei.
//
// REGELN, die auch nach einer Ueberarbeitung gelten muessen:
//   - Keine Gedankenstriche in sichtbarem Text (Doppelpunkt, Komma, Klammer).
//   - Kein Agentur-Plural. Es ist eine Person, also erste Person Singular.
//   - Keine erfundenen Zahlen, Ladezeiten, Kundenzahlen oder Referenzen.
//   - Die drei Demo-Betriebe sind fiktiv. Ihr Kennzeichen
//     ("Fictional demo. Not a real business.") bleibt an jeder Stelle stehen.
//
// Muster wie in content/seite.ts: erst der Inhalt als literales Objekt
// (`as const`), die Typen danach als `typeof`-Ableitung. So kann kein Typ vom
// tatsaechlichen Text abweichen.

/**
 * Die eine Adresse, an die alles auf dieser Seite fuehrt. Steht als eigene
 * Konstante hier, weil drei Stellen sie brauchen (Leiste, Schluss-CTA, Fuss)
 * und sie an allen dreien dieselbe sein muss.
 */
const EMAIL = "youtaybusiness@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Website%20audit`;

export const start = {
  /** Metadaten fuer app/layout.tsx. Englisch, wie die ganze Startseite. */
  meta: {
    title: "Youssef Tayachi: web design, measured not sold",
    description:
      "A cold read of your website, then the same site rebuilt. Scroll it and feel which one is which.",
    /** openGraph.locale in app/layout.tsx haengt daran. */
    locale: "en_US",
  },

  /**
   * Sprungmarke im Wurzel-Layout. Gilt fuer ALLE Routen, auch die deutschen
   * Rechtsseiten: sie steht im Wurzel-Layout und kann deshalb nur eine Sprache
   * haben. Englisch, weil die Startseite den Ton setzt.
   *
   * zielId ist ein Vertrag mit zwei Stellen: dem <main id="top"> der
   * Startseite (components/start ist ohne, das id sitzt in app/page.tsx) und
   * dem <main id="top"> des Layouts app/(mit-chrome)/layout.tsx. Wer das id
   * aendert, muss beide mitziehen.
   */
  sprungmarke: {
    label: "Skip to content",
    zielId: "top",
  },

  /**
   * app/not-found.tsx, das globale 404. Aus demselben Grund englisch wie
   * `sprungmarke` direkt darueber: die Seite haengt am Wurzel-Layout
   * (lang="en") und greift fuer jede Adresse, auch die deutschen
   * Unterseiten, die keine eigene 404-Seite haben.
   */
  notFound: {
    title: "This page doesn't exist.",
    ctaLabel: "Back to the homepage",
  },

  /**
   * Die eigene Kopfleiste der Startseite (.site-bar). Nicht zu verwechseln mit
   * components/chrome/kopfleiste.tsx: die traegt die deutschen Unterseiten.
   */
  leiste: {
    marke: "Youssef Tayachi",
    markeHref: "#top",
    ctaLabel: "Email me",
    ctaHref: MAILTO,
  },

  /**
   * AKT 1, HERO (pin, Iris-Enthuellung, kinetische Schlagzeile).
   * Der kalte Blick, bevor gesagt wird, worauf geblickt wird. Ein Standbild,
   * kein Video (Begruendung im Budgetabschnitt von BRIEF.md).
   */
  hero: {
    label: "Cold read",
    headline: "Every website has a fault. Most owners have never had theirs measured.",
    lede: "I read yours the way an inspector reads a building. Then I show you the fix, built, not described.",
    bildAlt:
      "A steel dial caliper and a ruler laid across a dark mechanical keyboard, lit by one hard light.",
  },

  /**
   * AKT 2, BEFUND (flow, drei nacheinander auftauchende Befunde).
   * Wachsendes Unbehagen: drei gemessene Feststellungen in der Sprache eines
   * Pruefberichts, ohne Adjektive.
   */
  befund: {
    label: "Three things I check first",
    headline: "Before I write to anyone, I measure this.",
    befunde: [
      {
        tag: "01 · contrast",
        text: "Text that fails at arm's length, on the page meant to make someone trust you.",
        stat: "The standard for body text is 4.5:1.",
      },
      {
        tag: "02 · tap target",
        text: "A phone number nobody can hit on the first try, on a screen most visitors are holding in one hand.",
        stat: "A comfortable tap target is at least 44 pixels tall.",
      },
      {
        tag: "03 · the ask",
        text: "A homepage that lists every service and never says what happens after you call.",
        stat: "Nothing invented, only missing: no next step, no hours, no way to reach a person.",
      },
    ],
    abschluss: "Not opinions. Measurements.",
  },

  /**
   * AKT 3, SCHARNIER (flow, gewollte Stille).
   * Ein einziger Satz auf fast leerem Bildschirm. Die Ruhe vor dem Hoehepunkt.
   * Wer hier Text ergaenzt, nimmt dem Akt seine Aufgabe.
   */
  scharnier: {
    satz: "So I built the same site twice.",
  },

  /**
   * AKT 4, VERGLEICH (pin, groesste Spanne der Seite, DER HOEHEPUNKT).
   * Hier laeuft der Signature Move aus public/scrollcraft/page.js: die
   * schlechte Demo ruckelt beim Scrollen wirklich, die gute laeuft 1:1 mit.
   * Die beiden Mini-Websites sind echtes Markup, kein Bild, deshalb steht ihr
   * Text auch hier und nicht in einer Grafik.
   */
  vergleich: {
    label: "Case one, live in this frame",
    headline: "Scroll it. You will feel which one is which.",
    kennzeichen: "Fictional demo. Not a real business.",
    bildunterschrift: "Same business. Same content. Rebuilt.",
    /** Die Adresszeile im Browserrahmen. .example ist eine reservierte TLD. */
    url: "volkmann-electric.example",

    /** Die absichtlich schlechte Fassung. Ihre Maengel sind der Inhalt. */
    alt: {
      // Geschuetzte Leerzeichen, keine gewoehnlichen: .db-nav ist ein
      // Flex-Container mit einem einzigen Textknoten darin, gewoehnliche
      // Leerzeichen fielen dort zu einem zusammen und aus der Navigation
      // wuerde ein Wortbrei. Drei nbsp je Luecke, genau wie im Build.
      nav: "Home   Services   About   Contact",
      headline: "WELCOME TO VOLKMANN ELECTRIC",
      unterzeile: "Your certified electrician since 1998",
      telefon: "030 1234567",
      absatz1Vor: "We offer everything around electrical work for your home and business. Contact us for a ",
      absatz1Link: "no obligation quote",
      absatz1Nach:
        ", we look forward to your enquiry and are happy to help by phone or by email, whichever suits you best.",
      absatz2:
        "Wiring, fuse boxes, lighting and emergency callouts around the clock, across the whole region and every town nearby, for homes and for businesses alike.",
      fuss: "Copyright Volkmann Electric 2011. All rights reserved.",
      status: "Response: delayed",
      /**
       * Die Marker, die waehrend des Akts auf- und wieder abblenden. Die zwei
       * Zahlen in `checkpoint` sind der Fortschritt des Akts (0 bis 1),
       * zwischen dem der Marker steht. Sie sind Mechanik, kein Text: wer sie
       * aendert, verschiebt den Marker gegenueber dem, was gerade zu sehen ist.
       */
      marker: [
        { checkpoint: "0.03 0.17", text: "Contrast 2.1:1" },
        { checkpoint: "0.17 0.29", text: "Tap target 18px" },
        { checkpoint: "0.29 0.42", text: "Phone number: an image, not text" },
      ],
    },

    /** Dieselbe Firma, dieselben Inhalte, neu gebaut. */
    neu: {
      navMarke: "Volkmann Electric",
      navLinks: ["Services", "Contact"],
      headline: "Volkmann Electric",
      unterzeile: "Certified electrician, on call across the region.",
      ctaLabel: "Call 030 1234567",
      absatz1:
        "Wiring, fuse boxes, lighting and emergency callouts. Book a visit below or call directly: the number above is a real link on every device.",
      absatz2: "Licensed, insured, and on site within the hour for anything that cannot wait.",
      fuss: "Volkmann Electric. Licensed and insured.",
      status: "Response: immediate",
      marker: [
        { checkpoint: "0.58 0.71", text: "Contrast 5.9:1" },
        { checkpoint: "0.71 0.83", text: "Tap target 44px" },
        { checkpoint: "0.83 0.97", text: "Phone number: a real link" },
      ],
    },
  },

  /**
   * AKT 5, WEITERE FAELLE (pan, seitlicher Lauf).
   * Zwei weitere fiktive Betriebe, damit der erste Fall nicht als Einzelstueck
   * dasteht. Jede Karte traegt ihr eigenes Kennzeichen.
   */
  weitereFaelle: {
    label: "Two more, so the first was not a trick",
    headline: "The same read, different trades.",
    vorherLabel: "Before",
    nachherLabel: "After",
    kennzeichen: "Fictional demo. Not a real business.",
    karten: [
      {
        titel: "Brandt Construction",
        text: "The quote request was buried in a paragraph of company history. Now it is one line, at the top: call or write.",
      },
      {
        titel: "Holzner Roofing",
        text: "Estimates were printed pale grey on white, hard to read outdoors on a phone. Now the text holds up in daylight.",
      },
    ],
    notiz: "Same process every time: read the site, measure it, rebuild the one page that actually gets clicked.",
  },

  /**
   * AKT 6, LEISTUNGEN (flow).
   * Drei schlichte Aussagen, kein Kartengitter, keine Symbole.
   */
  leistungen: {
    label: "What I build",
    headline: "Nothing you have to take my word for.",
    punkte: [
      {
        index: "01",
        titel: "Fast, and clear on a phone.",
        text: "One page, not a template with twelve sections you will never fill in.",
      },
      {
        index: "02",
        titel: "Contrast, type and tap targets: measured, not guessed.",
        text: "The same checks you just watched, run on your own site before anything is built.",
      },
      {
        index: "03",
        titel: "One clear next step, not three.",
        text: "A phone number that is a link, a form that goes somewhere, or both.",
      },
    ],
  },

  /**
   * AKT 7, PROZESS (pan, Haarlinien-Zeitachse).
   * Vier Schritte, die seitlich vorbeilaufen. Kein Drama.
   */
  prozess: {
    label: "How it runs",
    headline: "Four steps, no mystery.",
    schritte: [
      {
        mark: "01",
        titel: "Look",
        text: "I read your site the way a visitor does, then measure it.",
      },
      {
        mark: "02",
        titel: "Plan",
        text: "One page, scoped in writing, before anything gets built.",
      },
      {
        mark: "03",
        titel: "Build",
        text: "Built once, checked on an actual phone before you see it.",
      },
      {
        mark: "04",
        titel: "Hand over",
        text: "You get the files and the login. Nothing rented back to you every month.",
      },
    ],
  },

  /**
   * AKT 8, UEBER (flow).
   * Erste Person, kein Team, kein Stockfoto einer Person. Das Bild zeigt
   * Werkzeug auf einem Tisch, bewusst kein gestelltes Portrait.
   */
  ueber: {
    label: "Who does the work",
    bildAlt:
      "A mechanical pencil, a steel ruler and a pair of dial calipers on an open notebook with a hand drawn grid, lit by one hard light.",
    absaetze: [
      "I'm Youssef. I build one site at a time, by hand, and I check it on a real phone before it goes anywhere near yours.",
      "No studio, no account manager, no handoff to someone junior. The person who wrote your audit email is the person who builds the fix.",
    ],
  },

  /**
   * AKT 9, KONTAKT (pin, Zeiger-Spotlight, der Schluss).
   * Genau ein CTA. Der Fuss steckt in derselben Buehne, damit nach dem
   * Schlusssatz nichts mehr nachlaeuft.
   */
  kontakt: {
    label: "Last thing",
    headline: "Tell me which one felt like your site.",
    ctaLabel: "Email me",
    ctaHref: MAILTO,
    fussSatz: "Youssef Tayachi. Web design for trades: shown, not sold.",
    fussEmail: EMAIL,
    fussEmailHref: `mailto:${EMAIL}`,
  },
} as const;

export type StartContent = typeof start;
