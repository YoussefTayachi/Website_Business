// Die Texte aller Seiten ausser der Startseite: Kopfleiste, Fuss, Fallstudie,
// Impressum, Datenschutz und die Kleintexte. Die Demo-Projekte stehen in
// projekte.ts, die englische Startseite in start.ts. Ueberwiegend Deutsch,
// mit zwei Ausnahmen seit dem 2026-08-25: `impressum` und `datenschutz` sind
// englisch, weil die Startseite dorthin verlinkt und beide Seiten deshalb
// englisch sein muessen (Begruendung im Kommentar bei `impressum`). Damit
// englisch beschriftet ist auch die Chrome, die auf allen drei Seiten
// erscheint, die von der englischen Startseite aus erreichbar sind
// (/impressum, /datenschutz, /arbeit/[slug]): `kopfleiste.ankerlinks`,
// `fuss.tagline`, `fuss.rechtLinks` und `kleintexte.platzhalterWarnung`.
// Alles andere hier bleibt Deutsch.
//
// STAND 2026-08-25: Die Startseite ist eine Scroll-Inszenierung auf Englisch
// (app/page.tsx, content/start.ts). Mit ihr sind die sieben alten Sektionen
// und ihre Komponenten unter components/sections/ weggefallen, und damit auch
// die Abschnitte meta, hero, befund, leistungen, prozess, ueber und kontakt
// aus dieser Datei: sie wurden nachweislich von nichts mehr gelesen. Was hier
// steht, wird gelesen.
//
// Drei Strings in `showcase` (eyebrow, intro, fallstudieLinkLabel) liest
// derzeit ebenfalls niemand. Sie bleiben trotzdem stehen, weil der Abschnitt
// als Ganzes noch gebraucht wird und noch nicht entschieden ist, ob und in
// welcher Form es die Fallstudien weiter gibt.
//
// Muster: erst der Inhalt als literales Objekt (`as const`), danach die
// Typen als `typeof`-Ableitung davon. So bleibt der Inhalt die einzige
// Quelle der Wahrheit, und kein Typ kann vom tatsächlichen Text abweichen.
//
// Sprache: Deutsch, ausser den zwei oben genannten Ausnahmen. Ich-Form, kein
// Agentur-Plural, keine Gedankenstriche, keine erfundenen Zahlen oder
// Referenzen. Gilt auch fuer die englischen Abschnitte.

export const seite = {
  /**
   * Die Adresse, unter der die Seite steht. Sie ist die Grundlage fuer
   * `metadataBase` in app/layout.tsx und damit fuer jedes canonical und
   * jedes og:image: ohne sie erzeugt Next relative Adressen, und ein
   * relatives og:image zeigt in keinem Vorschaudienst ein Bild.
   *
   * Sie steht hier und nicht im Layout, weil sie mehrere Stellen betrifft
   * (Metadaten, Impressum, spaeter das OG-Bild) und an jeder dieselbe sein
   * muss. Ohne Schraegstrich am Ende, den haengt Next selbst an.
   */
  adresse: "https://marketing.frostbreaker.app",

  /**
   * Kopfleiste, sichtbar auf allen Seiten ausser der Startseite (Impressum,
   * Datenschutz, /arbeit/[slug]). Die Wortmarke selbst ist bereits der Weg
   * zurueck zur Startseite (href="/" in kopfleiste.tsx), darum bleibt hier
   * nur der eine Sprung, den eine Unterseite sonst nicht bietet: der Kontakt.
   * "#kontakt" ist ein echtes Ziel auf der neuen Startseite (id="kontakt"
   * am Mint-Fuss in components/start/fuss.tsx). Ein fruehered zweiter Eintrag
   * zeigte auf "#showcase", das es seit dem Umbau nicht mehr gibt, und ist
   * ersatzlos entfernt: ein Punkt ohne echtes Ziel ist keiner wert.
   *
   * Englisch, nicht Deutsch: die Leiste erscheint auch auf den jetzt
   * englischen Seiten /impressum und /datenschutz, eine deutsche
   * Beschriftung dort saehe halb uebersetzt aus.
   */
  kopfleiste: {
    marke: "Youssef Tayachi",
    ankerlinks: [{ label: "Contact", href: "#kontakt" }],
    navLabel: "Main navigation",
  },

  /**
   * Herzstück der Seite. `bedienhinweis` beschreibt sowohl Ziehen als auch
   * die Tastaturbedienung, weil beides für denselben Regler gelten muss
   * (siehe PLAN.md Abschnitt 8: "Tastaturbedienung überall").
   */
  showcase: {
    eyebrow: "Der Vergleich",
    headline: "Alt und neu, im selben Fenster",
    intro: "Drei fiktive Betriebe aus Bau, Elektro und Dach, je zwei Fassungen: wie es oft aussieht, wie es sein könnte.",
    bedienhinweis: "Regler ziehen oder mit den Pfeiltasten zwischen alter und neuer Fassung wechseln.",
    vorherLabel: "Alte Fassung",
    nachherLabel: "Neue Fassung",
    fallstudieLinkLabel: "Fallstudie lesen",
  },

  /**
   * Texte für /arbeit/[slug] (siehe app/arbeit/[slug]/page.tsx). Standen
   * bisher hart in der Route: die drei Zwischenüberschriften in einer lokalen
   * Konstante `ABSCHNITTE`, der Zurück-Link ohne eigenen Text, ersatzweise mit
   * `kopfleiste.ankerlinks[0]` beschriftet ("Vergleich" statt eines Satzes,
   * der sagt, wohin es geht). Beides gehört inhaltlich hierher, nicht in eine
   * Komponente: die Route soll nur noch Struktur und Datenfluss bauen, kein
   * Deutsch mehr enthalten (siehe PLAN.md Abschnitt 10).
   */
  fallstudie: {
    // "/#work" ist die Fallkarten-Sektion der neuen Startseite
    // (id="work" in components/start/arbeiten.tsx).
    zurueckLabel: "Zurück zur Übersicht",
    zurueckHref: "/#work",
    abschnitte: {
      ausgangslage: "Ausgangslage",
      entscheidungen: "Entscheidungen",
      ergebnis: "Ergebnis",
    },
  },

  fuss: {
    marke: "Youssef Tayachi",
    // Englisch seit 2026-08-25, aus demselben Grund wie `rechtLinks` direkt
    // darunter (siehe Kommentar bei `impressum` unten). Nennt bewusst die
    // drei Gewerke, statt allgemein zu bleiben: der andere Fuss, der im
    // Schlussakt der Startseite steckt (content/start.ts, kontakt.fussSatz),
    // ist der allgemeinere Satz. Beide stehen nie auf derselben Seite,
    // sollen sich aber auch nicht widersprechen.
    tagline: "Websites for construction, electrical and roofing companies that earn a second look.",
    // Labels englisch, seit Impressum und Datenschutz selbst englisch sind
    // (Entscheidung vom 2026-08-25, siehe Kommentar bei `impressum` unten).
    // Die URLs bleiben deutsch: /impressum und /datenschutz aendern sich nicht.
    rechtLinks: [
      { label: "Legal notice", href: "/impressum" },
      { label: "Privacy", href: "/datenschutz" },
    ],
    // {jahr} wird von der Komponente durch das aktuelle Jahr ersetzt.
    copyrightVorlage: "© {jahr} Youssef Tayachi",
    // Englisch aus demselben Grund wie `tagline` und `rechtLinks` oben.
    rechtNavLabel: "Legal",
  },

  kleintexte: {
    sprungmarke: { label: "Zum Inhalt springen", zielId: "inhalt" },
    // Englisch aus demselben Grund wie kopfleiste.navLabel: der Schalter
    // sitzt in der Kopfleiste und laeuft damit auch auf /impressum und
    // /datenschutz.
    nachtmodusSchalter: {
      ariaLabelZuDunkel: "Turn on dark mode",
      ariaLabelZuHell: "Turn on light mode",
    },
    demoKennzeichen: {
      label: "Demo, fiktives Beispiel",
      beschreibung: "Kein realer Kunde, eigens gebaut, um Vorher und Nachher zu zeigen.",
    },
    // Englisch, weil sie nur auf /impressum und /datenschutz erscheint und
    // beide seit dem 2026-08-25 englisch sind. Die anderen Kleintexte in
    // diesem Abschnitt bleiben deutsch: sie bedienen die deutschen
    // Fallstudienseiten und die Seitenchrome, nicht diese beiden Seiten.
    platzhalterWarnung:
      "Placeholder: this information is incomplete and will be replaced with real details before launch.",
    fehlertexte: {
      seiteNichtGefunden: {
        titel: "Diese Seite gibt es nicht",
        text: "Der Link zeigt entweder auf eine Seite, die nie existiert hat, oder auf eine, die verschoben wurde.",
        ctaLabel: "Zur Startseite",
        ctaHref: "/",
      },
      technischerFehler: {
        titel: "Etwas ist hier stehengeblieben",
        text: "Ein unerwarteter Fehler hat das Laden dieser Seite unterbrochen. Das liegt nicht an einer falschen Eingabe.",
        ctaLabel: "Seite neu laden",
      },
      keinJavascript:
        "Für den Vergleich zwischen alter und neuer Fassung wird JavaScript gebraucht. Ohne JavaScript stehen hier beide Fassungen direkt untereinander.",
    },
  },

  /**
   * Roh-Inhalt für Impressum und Datenschutz. Jede Klammer [...] markiert
   * eine Stelle, an der Youssefs echte Daten fehlen. Die Banner-Warnung
   * dafür steht zentral in `kleintexte.platzhalterWarnung`, damit beide
   * Seiten denselben Text zeigen und eine spätere Änderung nur an einer
   * Stelle passiert.
   *
   * SPRACHE: Englisch seit 2026-08-25, wie die Startseite, auf die diese
   * beiden Seiten von jedem Aufruf entfernt sind: eine deutsche Rechtsseite
   * hinter einer englischen Startseite sah abgebrochen aus. Nur Platzhalter
   * gehen hier verloren, keine echten Angaben. Die Paragraphen (§ 5 TMG,
   * § 18 Abs. 2 MStV) bleiben deutsch benannt, weil sie deutsches Recht
   * zitieren, das sich durch die Uebersetzung nicht aendert.
   *
   * OFFEN vor dem Livegang: Youssefs Kunden sind deutsche Gewerbebetriebe,
   * fuer die ein deutsches Impressum ueblich ist. Pruefen, ob zusaetzlich
   * zur englischen Fassung eine deutsche noetig ist, bevor die Platzhalter
   * durch echte Daten ersetzt werden.
   */
  impressum: {
    titel: "Legal notice",
    abschnitte: [
      {
        ueberschrift: "Information according to § 5 TMG",
        text: "[Full name]\n[Street and house number]\n[Postal code and city]",
      },
      {
        ueberschrift: "Contact",
        text: "Email: youssef.tayachi@frostbreaker.app\nPhone: [insert phone number, if you want one listed]",
      },
      {
        ueberschrift: "VAT ID",
        text: "[Insert VAT identification number, if applicable]",
      },
      {
        ueberschrift: "Responsible for content under § 18 (2) MStV",
        text: "[Full name]\n[Address as above]",
      },
      {
        ueberschrift: "EU dispute resolution",
        text: "The European Commission provides a platform for online dispute resolution: [insert link to the platform]. [Name] is not obliged and not willing to take part in dispute resolution proceedings before a consumer arbitration board.",
      },
    ],
  },

  datenschutz: {
    titel: "Privacy",
    abschnitte: [
      {
        ueberschrift: "Controller",
        text: "[Full name]\n[Street and house number]\n[Postal code and city]\nEmail: youssef.tayachi@frostbreaker.app",
      },
      {
        ueberschrift: "Hosting and server log data",
        text: "[Insert name and address of the hosting provider once the site is live]. When you visit this website, the hosting provider automatically collects the access data technically required to deliver the page.",
      },
      {
        ueberschrift: "Cookies and embedded content",
        text: "This website sets no cookies and loads no content from third-party servers. Fonts are bundled locally, not fetched from an external domain.",
      },
      {
        ueberschrift: "Contact by email",
        text: "If you write to me by email, I use your details only to answer your message.",
      },
      {
        ueberschrift: "Your rights",
        text: "You have the right to access, correct, delete and restrict the processing of your personal data, and the right to lodge a complaint with a supervisory authority.",
      },
    ],
  },
} as const;

export type SeiteContent = typeof seite;
export type KopfleisteContent = typeof seite.kopfleiste;
export type ShowcaseContent = typeof seite.showcase;
export type FallstudieContent = typeof seite.fallstudie;
export type FussContent = typeof seite.fuss;
export type KleintexteContent = typeof seite.kleintexte;
export type LegalPageContent = typeof seite.impressum;
