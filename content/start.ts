// Aller sichtbare Text der Startseite.
//
// STAND 2026-08-31: Die Seite wird auf die Formensprache von frostbreaker.app
// umgebaut und zieht auf marketing.frostbreaker.app. Der designatives-Klon
// davor (Archivo Black, Mint, Koenigsblau) ist entfallen. Dies ist der Text
// des ABNAHME-AUSSCHNITTS: Kopfleiste, Hero, Beweisstreifen und eine
// Fallkarte. Die uebrigen Flaechen (Problem, Vorgehen, Wer die Arbeit macht,
// Schluss) kommen nach der Abnahme dazu, der Aufbau dieser Datei ist darauf
// schon angelegt.
//
// SPRACHE: Englisch, wie die ganze Startseite. Die Fallstudien blieben
// deutsch, sind aber mit dem Umbau entfallen.
//
// REGELN, die auch nach einer Ueberarbeitung gelten muessen:
//   - Keine Gedankenstriche in sichtbarem Text (Doppelpunkt, Komma, Klammer).
//   - Kein Agentur-Plural. Es ist eine Person, also erste Person Singular.
//     Die Marke ist Frostbreaker, die Person dahinter ist Youssef, und die
//     Seite sagt "I", nicht "we".
//   - Keine erfundenen Zahlen, Ladezeiten, Kundenzahlen oder Referenzen.
//   - Die Demo-Betriebe sind fiktiv, ihr Kennzeichen bleibt auf jeder Karte.
//   - Der EINZIGE echte Beleg ist Frostbreaker selbst. Es gibt keinen
//     zugestimmten Kundenfall (siehe Website_Business/README.md), also wird
//     auch keiner behauptet.
//
// Muster wie in content/seite.ts: erst der Inhalt als literales Objekt
// (`as const`), die Typen danach als `typeof`-Ableitung.

/** Eine Adresse, ein Weg. Steht als Konstante hier, weil Leiste, Hero und
 *  spaeter der Schlussblock dieselbe brauchen. */
const CALL = "https://calendly.com/youssef-tayachi-frostbreaker/30min";
const EMAIL = "youtaybusiness@gmail.com";

export const start = {
  meta: {
    title: "Frostbreaker Marketing: websites that get the call",
    description:
      "I rebuild the one page that gets your business the call, and you see it working, not described.",
    locale: "en_US",
  },

  /**
   * Sprungmarke im Wurzel-Layout. Gilt fuer ALLE Routen, auch die deutschen
   * Rechtsseiten: sie steht im Wurzel-Layout und kann deshalb nur eine
   * Sprache haben. Englisch, weil die Startseite den Ton setzt.
   */
  sprungmarke: {
    label: "Skip to content",
    zielId: "top",
  },

  /** app/not-found.tsx, das globale 404. */
  notFound: {
    title: "This page doesn't exist.",
    ctaLabel: "Back to the homepage",
  },

  /**
   * Die Kopfleiste. Ab 768px traegt sie Wortmarke, zwei Ankerlinks, die
   * Modus-Gruppe und den Pill-CTA. Darunter nur Wortmarke und CTA, die
   * Modus-Gruppe steht dann im Fuss (Begruendung in PLAN.md, Abschnitt 5:
   * drei Ziele zu 44px sind allein 132px, und bei 390px stehen insgesamt
   * rund 350px zur Verfuegung).
   */
  leiste: {
    marke: "frostbreaker",
    markeZusatz: "marketing",
    markeHref: "#top",
    anker: [
      { label: "Work", href: "#work" },
      { label: "How it works", href: "#how" },
    ],
    cta: { label: "Book a call", href: CALL },
  },

  /**
   * Die Modus-Gruppe. Drei native Radios in einem fieldset, nicht drei
   * Knoepfe mit ARIA daruebergelegt: der Browser bringt Gruppensemantik,
   * Pfeiltasten, wandernden Fokus und die Ansage von sich aus mit.
   */
  modus: {
    legende: "Theme",
    optionen: [
      { wert: "system", label: "Auto" },
      { wert: "light", label: "Light" },
      { wert: "dark", label: "Dark" },
    ],
  },

  /**
   * HERO. Die Ueberschrift traegt genau ein kursives Akzentwort, wie auf
   * frostbreaker.app. Es steht auf dem Teil, der die Aussage traegt, nicht
   * auf einem Fuellwort: verloren wird der Kunde VOR dem Anruf, und genau
   * das ist der Satzteil in Sky.
   */
  hero: {
    augenbraue: "Web design for local businesses",
    headline: { vor: "Stop losing customers ", akzent: "before they call", nach: "." },
    lead: "I look at your website the way your customer does: on a phone, in a hurry. Then I rebuild the page that brings the call.",
    cta: { label: "Book a call", href: CALL },
    zweitCta: { label: "See the work", href: "#work" },
    /** Steht klein unter den Knoepfen, wie auf frostbreaker.app. Nimmt dem
     *  Klick das Risiko, ohne etwas zu versprechen, das nicht eingehalten
     *  werden kann. */
    ctaZusatz: "30 minutes. We look at your site together and I tell you what I would change.",
    geraet: {
      /** Das Bild im Telefonrahmen: die fertige Fassung von Elektro
       *  Musterhaus, aufgenommen bei 390px. */
      bildAlt:
        "The rebuilt Elektro Musterhaus website on a phone: a call bar with the phone number sits above the headline, followed by the services.",
      pause: "Pause the preview",
      weiter: "Play the preview",
    },
  },

  /**
   * BEWEISSTREIFEN. Der einzige Ort auf dieser Seite, an dem etwas
   * Nachpruefbares steht, deshalb sind beide Adressen echte Links.
   */
  beweis: {
    satz: "The site you are on, the app that emailed you and the pages below: I built all of them.",
    links: [
      { label: "frostbreaker.app", href: "https://www.frostbreaker.app/", zusatz: "Product site" },
      { label: "app.frostbreaker.app", href: "https://app.frostbreaker.app/", zusatz: "The software" },
    ],
  },

  /**
   * ARBEITEN. Fall 1 von dreien, der Rest kommt nach der Abnahme.
   *
   * DER VERGLEICH IST DAS ARGUMENT dieser Seite, deshalb steht er hier und
   * nicht in einer Mail. Die Regel "kein Vorher/Nachher-Regler" aus
   * Lehren/checkliste.md gilt fuer den Entwurf, der an einen LEAD geht, wo
   * der Prototyp die Website ist. Hier ist es umgekehrt.
   */
  arbeiten: {
    id: "work",
    augenbraue: "Selected work",
    titel: "Same business, one rebuilt page.",
    kennzeichen: "Fictional demo. Not a real business.",
    regler: {
      label: "Compare the old and the new page",
      vorher: "Before",
      nachher: "After",
      /** aria-valuetext, damit ein Screenreader den ZUSTAND ansagt und nicht
       *  eine nackte Zahl. Die Mitte bekommt den Prozentwert eingesetzt. */
      ansageVorher: "Before, the old page",
      ansageNachher: "After, the rebuilt page",
      ansageMitte: (p: number) => `${p} percent of the rebuilt page`,
    },
    faelle: [
      {
        slug: "elektro",
        name: "Elektro Musterhaus",
        gewerk: "Electrician",
        /** Adresszeile im Browserrahmen. `.example` ist eine reservierte
         *  Endung und kann niemandem gehoeren: eine erfundene Domain, die es
         *  wirklich gibt, waere genau der Fund, den diese Zielgruppe macht. */
        adresse: "elektro-musterhaus.example",
        zeile: "The phone number was a picture, not a link. Now it is the first thing you can tap.",
        tags: ["Web design", "Mobile first", "Speed"],
        bildAltVorher:
          "The old Elektro Musterhaus website: a wall of grey text, the phone number sits inside an image, no visible way to get in touch.",
        bildAltNachher:
          "The rebuilt Elektro Musterhaus website: a tappable call bar with the phone number, a clear headline and the four services as tiles.",
      },
    ],
  },

  /** Fuss des Ausschnitts. Der vollstaendige Schlussblock kommt mit den
   *  restlichen Flaechen. */
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
