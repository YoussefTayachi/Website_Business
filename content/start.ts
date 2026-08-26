// Aller sichtbare Text der Startseite. Die Seite ist seit dem Redesign vom
// 2026-08-26 kein neunaktiges Scroll-Erlebnis mehr, sondern ein heller
// One-Pager im Stil von designatives.com: riesige fette Headlines, ein
// Fiktiv-Kennzeichen auf jeder Fallkarte, ein mintgruener Fuss. Der Text hier
// ist die einzige Quelle dafuer, die Komponenten unter components/start/
// enthalten keinen einzigen Satz.
//
// SPRACHE: Englisch, wie die ganze Startseite seit CLAUDE.md Abschnitt
// "Sprache". Die Fallstudien (/arbeit/[slug]) bleiben deutsch, siehe dort.
//
// WARUM KEIN "WE": Youssef ist eine Person, kein Studio. Jeder Satz steht in
// der ersten Person Singular, auch wenn der designatives-Rhythmus (kurz,
// selbstbewusst) den Agentur-Plural nahelegt.
//
// WARUM DAS KENNZEICHEN PRO KARTE STEHT statt einmal ueber der Gruppe: wer
// nur die erste Karte einer Reihe sieht (etwa beim schnellen Scrollen oder
// mit einem Screenreader, der Abschnittsweise vorliest), soll trotzdem lesen,
// dass der Betrieb fiktiv ist. Einmal ueber der Gruppe waere das an genau der
// Stelle unsichtbar, an der es am meisten zaehlt.
//
// REGELN, die auch nach einer Ueberarbeitung gelten muessen:
//   - Keine Gedankenstriche in sichtbarem Text (Doppelpunkt, Komma, Klammer).
//   - Kein Agentur-Plural. Es ist eine Person, also erste Person Singular.
//   - Keine erfundenen Zahlen, Ladezeiten, Kundenzahlen oder Referenzen.
//   - Die drei Demo-Betriebe sind fiktiv, ihr Kennzeichen bleibt auf jeder
//     Karte stehen.
//
// Muster wie in content/seite.ts: erst der Inhalt als literales Objekt
// (`as const`), die Typen danach als `typeof`-Ableitung.

/**
 * Die eine Adresse, an die alles auf dieser Seite fuehrt. Steht als eigene
 * Konstante hier, weil mehrere Stellen sie brauchen (Leiste, Leistungen-Link,
 * Fuss) und sie an jeder derselbe sein muss.
 */
const EMAIL = "youtaybusiness@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Website%20check`;

export const start = {
  /** Metadaten fuer app/layout.tsx. Englisch, wie die ganze Startseite. */
  meta: {
    title: "Youssef Tayachi: web design for trades, built not sold",
    description:
      "I find what's costing your trade business calls, then build the fix. See it working, not just described.",
    /** openGraph.locale in app/layout.tsx haengt daran. */
    locale: "en_US",
  },

  /**
   * Sprungmarke im Wurzel-Layout. Gilt fuer ALLE Routen, auch die deutschen
   * Rechtsseiten: sie steht im Wurzel-Layout und kann deshalb nur eine
   * Sprache haben. Englisch, weil die Startseite den Ton setzt.
   *
   * zielId ist ein Vertrag mit app/layout.tsx und dem <main id="top"> der
   * Startseite. Wer das id aendert, muss beide mitziehen.
   */
  sprungmarke: {
    label: "Skip to content",
    zielId: "top",
  },

  /**
   * app/not-found.tsx, das globale 404. Englisch, weil es am Wurzel-Layout
   * (lang="en") haengt und fuer jede Adresse greift, auch die deutschen
   * Unterseiten ohne eigene 404-Seite.
   */
  notFound: {
    title: "This page doesn't exist.",
    ctaLabel: "Back to the homepage",
  },

  /** Die Kopfleiste: Pill-CTA links, Marke mittig, rundes Icon rechts. */
  leiste: {
    cta: { label: "Email me", href: MAILTO },
    marke: "Youssef Tayachi",
    menu: { label: "See the work", href: "#work" },
  },

  /**
   * HERO. Headline riesig und kurz, genau zwei Zeilen, damit sie bei ~130px
   * noch in eine Bildschirmbreite passt. Die zwei Intro-Absaetze tragen die
   * Erklaerung, die die Headline sich bewusst spart.
   */
  hero: {
    headline: ["Stop losing", "customers online"],
    intro: [
      "I check your website the way a customer does: fast, on a phone, in a hurry. Most trade sites fail right there.",
      "So I rebuild the one page that gets you the call, and show you the working page, not a mockup.",
    ],
    bildAlt:
      "A sketched collage of a website redesign: a phone screen, a laptop screen, and a checkmark.",
  },

  /**
   * Der grosse Zwischensatz, zwei Zeilen. Kontrastform statt Behauptung:
   * nicht "schoen", sondern "bringt den Anruf".
   */
  statement: {
    zeilen: ["Built to get calls,", "not just look nice."],
  },

  /**
   * Vier Leistungen, ein Wort bis zwei pro Titel, ein Satz Erklaerung.
   * Kein Kartengitter, keine Icons: die Nummer traegt die Struktur.
   */
  leistungen: {
    titel: "What I build",
    punkte: [
      {
        nr: "01",
        titel: "Mobile first",
        text: "Most of your customers find you on a phone, so that's the screen I design for first.",
      },
      {
        nr: "02",
        titel: "Fast pages",
        text: "A page that loads slow loses the visitor before they read a word.",
      },
      {
        nr: "03",
        titel: "One click",
        text: "Your phone number and address are a tap away, not buried in a menu.",
      },
      {
        nr: "04",
        titel: "No rent",
        text: "You get the files and the login. Nothing rented back to you every month.",
      },
    ],
    /** Keine Unterseite fuer "Leistungen", also kein "read more": der Link
     *  geht direkt in die Mail. */
    link: { label: "Ask about your website", href: MAILTO },
  },

  /**
   * Drei fiktive Fallbeispiele. Jede Zeile beschreibt in einem Satz, was
   * kaputt war und was jetzt anders ist, statt Adjektive zu haeufen.
   *
   * DAS FELD `mock` IST DER TEXT IN DER ZEICHNUNG. Die Fallkarten zeigen seit
   * dem 2026-08-26 keine leeren Balkenmuster mehr, sondern die fertige Website
   * des jeweiligen Betriebs: Navigation, Schlagzeile, Knopfbeschriftung,
   * Telefonnummer. Das ist sichtbarer Seitentext und steht deshalb hier, nicht
   * in components/start/zeichnungen.tsx. Wer ihn dort hineinschreibt, versteckt
   * ihn vor dem naechsten, der die Texte durchgeht.
   *
   * JEDE ZEICHNUNG MUSS GENAU DAS ZEIGEN, WAS `zeile` DARUEBER BEHAUPTET.
   * Fall 1 behauptet einen tippbaren Anruf, also traegt der Mock oben einen
   * Anrufbalken mit Nummer. Fall 2 behauptet die Anfrage ganz oben, also steht
   * `cta` zweimal weit oben. Fall 3 behauptet Tempo auf dem Handy, also ist es
   * eine Handy-Ansicht mit Kontakt in Sichtweite. Wer eine Zeile umschreibt,
   * schreibt den Mock mit um.
   *
   * DIE TELEFONNUMMERN SIND MUSTER, kein Anschluss: Ortsvorwahl plus eine
   * durchgezaehlte Ziffernfolge, wie sie in jedem Formularbeispiel steht.
   * Erfundene Kennzahlen, Sterne oder Kundenzahlen stehen hier nicht, auch
   * nicht als Zierde in einem Mock: die Zielgruppe prueft so etwas nach.
   */
  arbeiten: {
    titel: ["Selected", "work"],
    kennzeichen: "Fictional demo. Not a real business.",
    faelle: [
      {
        name: "Elektro Musterhaus",
        zeile: "The phone number wasn't a link. Now it's the first thing you can tap.",
        tags: ["WEB DESIGN", "MOBILE FIRST", "ELECTRICIAN"],
        bildAlt:
          "The Elektro Musterhaus website on a phone: a green call bar with the number 030 1234567 sits above the headline 24/7 emergency electrician, followed by a fuse box photo and service tiles for wiring, fuse boxes, EV chargers and fault finding.",
        mock: {
          marke: "ELEKTRO MUSTERHAUS",
          nav: ["Services", "Emergency", "Contact"],
          ruf: { label: "Call 030 1234567", zusatz: "24 hours, 7 days a week" },
          headline: ["24/7 emergency", "electrician"],
          kacheln: ["Wiring", "Fuse boxes", "EV chargers", "Fault finding"],
        },
      },
      {
        name: "Bau Mustergrund",
        zeile: "The quote request was buried in a wall of text. Now it's one line, at the top.",
        tags: ["WEB DESIGN", "COPY", "CONSTRUCTION"],
        bildAlt:
          "The Bau Mustergrund homepage on a laptop: a green Get a quote button sits in the header and again under the headline Building work you can plan around, above a row of site photos.",
        mock: {
          marke: "BAU MUSTERGRUND",
          adresse: "bau-mustergrund.example",
          nav: ["Projects", "Services", "About"],
          cta: "Get a quote",
          zweitCta: "See projects",
          headline: ["Building work", "you can plan around"],
          lead: "Tell me what you need. You get a written price.",
          leistungen: ["New builds", "Extensions", "Renovation"],
          projekte: ["Hall extension", "Family home", "Facade work"],
        },
      },
      {
        name: "Dach Musterhoehe",
        zeile:
          "The old site loaded slow and looked broken on a phone. The new one loads fast and looks like a real business.",
        tags: ["WEB DESIGN", "SPEED", "ROOFING"],
        bildAlt:
          "The Dach Musterhoehe website on a phone: the headline Roof repairs done right, a green call button with the number 030 7654321, a roof photo and a bar at the bottom with Call now and Directions.",
        mock: {
          marke: "DACH MUSTERHOEHE",
          nav: ["Roofs", "Repairs", "Contact"],
          headline: ["Roof repairs", "done right"],
          lead: "Leaks, tiles and gutters.",
          ruf: "Call 030 7654321",
          leistungen: ["New roofs", "Leak repair", "Gutters"],
          leiste: { ruf: "Call now", weg: "Directions" },
        },
      },
    ],
  },

  /** Kein Team, kein Stockfoto einer Person: nur der eine Satz, der sagt,
   *  wer die Mail schreibt und wer danach baut, ist dieselbe Person. */
  ueber: {
    titel: "Who does the work",
    absaetze: [
      "I'm Youssef. I build one site at a time, by hand, and check it on a real phone before you ever see it.",
      "No studio, no account manager. The person who found the problem on your site is the person who fixes it.",
    ],
  },

  /** Der mintgruene Schlussblock: eine letzte grosse Zeile, dann die
   *  Kontaktdaten und die Marke seitenfuellend. */
  fuss: {
    headline: ["Let's fix", "your website"],
    /** Versalien macht das CSS (text-transform), hier steht Schreibschrift. */
    kontakt: { label: "Contact", mail: EMAIL },
    rechtliches: {
      label: "Legal",
      links: [
        { label: "Imprint", href: "/impressum" },
        { label: "Privacy", href: "/datenschutz" },
      ],
    },
    marke: "Youssef Tayachi",
    /** Ein einzelnes Jahr, keine erfundene Spanne seit einem Startjahr. */
    copyright: "© 2026 Youssef Tayachi. All rights reserved.",
  },
} as const;

export type StartContent = typeof start;
