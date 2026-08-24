// Alle Texte der Portfolio-Seite außer den Demo-Projekten (siehe projekte.ts).
//
// Muster: erst der Inhalt als literales Objekt (`as const`), danach die
// Typen als `typeof`-Ableitung davon. So bleibt der Inhalt die einzige
// Quelle der Wahrheit, und kein Typ kann vom tatsächlichen Text abweichen.
//
// Sprache: ausschließlich Deutsch (siehe PLAN.md Abschnitt 10, kein
// Sprachumschalter). Ich-Form, kein Agentur-Plural, keine Gedankenstriche,
// keine erfundenen Zahlen oder Referenzen.

export const seite = {
  /**
   * Metadaten für layout.tsx / generateMetadata. `ogTitle` und
   * `ogDescription` sind bewusst eigene Felder statt einer Wiederverwendung
   * von `title`/`description`: Suchergebnis und Social-Card dürfen leicht
   * unterschiedlich formuliert sein, ohne dass eine Änderung am einen Text
   * automatisch das andere mitzieht.
   */
  meta: {
    title: "Youssef Tayachi: Website-Neubau für Betriebe, die einen zweiten Blick verdienen",
    description:
      "Zwei Fassungen derselben Beispielseite, nebeneinander: die alte Bauweise und die neue. Website-Neubau für Handwerk, Gastronomie und Kanzleien, gebaut von einer Person.",
    ogTitle: "Alt und neu, nebeneinander: Website-Neubau von Youssef Tayachi",
    ogDescription:
      "Der Befund stand in der Mail. Hier steht die Korrektur: eine Beispielseite in zwei Fassungen, zum Selbstprüfen.",
  },

  /**
   * Kopfleiste. Bewusst wenige Ankerlinks (siehe PLAN.md Abschnitt 5:
   * "keine Navigation über sieben Punkte"): nur die zwei Sprünge, die für
   * einen Kaltklick zählen, der Beweis und der nächste Schritt.
   */
  kopfleiste: {
    marke: "Youssef Tayachi",
    ankerlinks: [
      { label: "Vergleich", href: "#showcase" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },

  hero: {
    kicker: "Ein Entwickler, keine Agentur",
    headline: "Der Befund aus der Mail, hier eingelöst.",
    unterzeile: "Zwei Fassungen derselben Seite, direkt darunter: die alte Bauweise und die neue.",
    primaerCta: { label: "Fassungen vergleichen", href: "#showcase" },
    sekundaerCta: { label: "Kontakt aufnehmen", href: "#kontakt" },
    // Die Messleiste im "Messlauf" (components/sections/hero.tsx) zeigt genau
    // diese zwei Werte, gerechnet und nachgerechnet, in der Form der
    // Befund-tag-Zeilen aus content/projekte.ts. Wer Farben oder die Hoehe des
    // primaeren Knopfes aendert, muss diese zwei Zeilen mitziehen (Rechenweg
    // steht im Dateikopf von hero.tsx).
    messwerte: ["Kontrast über 15:1", "Tap-Ziel 48 Pixel"] as const,
  },

  befund: {
    eyebrow: "Der Befund",
    headline: "Vier Befunde, die sich wiederholen",
    intro: "Vier Fehler tauchen bei alten Websites immer wieder auf, alle stecken in der Beispielseite weiter unten.",
    items: [
      {
        label: "Tempo ungeprüft",
        text: "Unverkleinerte Bilder kosten Zeit, bevor der erste Satz zu lesen ist.",
      },
      {
        label: "Unlesbar am Handy",
        text: "Was sich auf dem Handy nicht lesen lässt, wird dort auch nicht gelesen.",
      },
      {
        label: "Design ohne Datum",
        text: "Schrift, Farben und Aufbau verraten das Baujahr, bevor ein Satz gelesen ist.",
      },
      {
        label: "Kein nächster Schritt",
        text: "Ein Kontaktweg, der erst gesucht werden muss, wird selten gefunden.",
      },
    ],
  },

  /**
   * Herzstück der Seite. `bedienhinweis` beschreibt sowohl Ziehen als auch
   * die Tastaturbedienung, weil beides für denselben Regler gelten muss
   * (siehe PLAN.md Abschnitt 8: "Tastaturbedienung überall").
   */
  showcase: {
    eyebrow: "Der Vergleich",
    headline: "Alt und neu, im selben Fenster",
    intro: "Drei fiktive Betriebe, je zwei Fassungen: wie es heute oft aussieht, und wie es aussehen könnte.",
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
    zurueckLabel: "Zurück zu allen Vergleichen",
    zurueckHref: "/#showcase",
    abschnitte: {
      ausgangslage: "Ausgangslage",
      entscheidungen: "Entscheidungen",
      ergebnis: "Ergebnis",
    },
  },

  leistungen: {
    eyebrow: "Leistungen",
    headline: "Was ich baue",
    intro: "Vier Bausteine für eine Website, die tatsächlich genutzt wird.",
    items: [
      {
        titel: "Website-Neubau",
        text: "Neu von Grund auf, für Handwerk, Gastronomie, Kanzleien und Praxen: auf dem Handy so bedienbar wie am Schreibtisch.",
      },
      {
        titel: "Inhalt und Struktur",
        text: "Erst die Struktur, dann der Code: weniger Text, aber der, der zählt.",
      },
      {
        titel: "Tempo und Technik",
        text: "Bilder in der richtigen Größe, Schrift ohne fremde Server, sauberer Code darunter: das macht die Seite schnell.",
      },
      {
        titel: "Übergabe und Pflege",
        text: "Nach dem Livegang verstehst du deine Website, oder ich betreue sie weiter: deine Entscheidung.",
      },
    ],
  },

  prozess: {
    eyebrow: "Prozess",
    headline: "Wie es abläuft",
    intro: "Vier Schritte, keiner davon eine Überraschung.",
    schritte: [
      {
        nummer: "01",
        titel: "Erstgespräch",
        text: "Klärt, was deine Website leisten soll und wo die jetzige das nicht tut.",
      },
      {
        nummer: "02",
        titel: "Entwurf",
        text: "Struktur und Ton, bevor Technik dazukommt: du siehst, wohin es geht.",
      },
      {
        nummer: "03",
        titel: "Umsetzung",
        text: "Die Website entsteht mit regelmäßigen Zwischenständen, keine Überraschung am Ende.",
      },
      {
        nummer: "04",
        titel: "Übergabe",
        text: "Die Website geht live, mit Zugriff und Erklärung: keine Blackbox.",
      },
    ],
  },

  /**
   * Erwähnt Frostbreaker bewusst: es ist der reale Grund, warum der
   * Besucher gerade hier ist (die Kaltakquise-Mail kam aus diesem
   * selbstgebauten Werkzeug). Das ist Fakt, keine Referenz im Sinne der
   * verbotenen Kundenreferenzen, und es ist der ehrlichste Beleg für
   * technisches Können, den es gibt.
   */
  ueber: {
    eyebrow: "Über",
    headline: "Warum ausgerechnet ich",
    absaetze: [
      "Ich baue Websites und die Werkzeuge, mit denen ich sie an die richtigen Betriebe bringe. Die Mail kam aus Frostbreaker, meinem eigenen Kaltakquise-Programm.",
      "Ich arbeite allein: wer mir schreibt, bekommt Antwort von der Person, die auch baut.",
      "Ich sage lieber, was nicht funktioniert, als was gut aussieht, wie schon in der Mail und in jeder Fallstudie hier.",
    ],
  },

  /**
   * `mailtoBetreff` ist der vorbereitete Betreff für den mailto-Link.
   * `emailAdresse` ist Youssefs bestehende geschäftliche Adresse; nichts
   * hier ist ein Platzhalter. `terminlinkHinweis` markiert dagegen bewusst
   * eine Lücke: es gibt noch keinen Terminlink, dafür einen sichtbaren,
   * unaufgeregten Platzhalter statt eines toten Buttons.
   */
  kontakt: {
    eyebrow: "Kontakt",
    headline: "Der nächste Schritt",
    intro: "Schreib mir, was an deiner Website nicht funktioniert, ich sage dir ehrlich, ob ich helfen kann.",
    emailLabel: "E-Mail schreiben",
    emailAdresse: "youtaybusiness@gmail.com",
    mailtoBetreff: "Anfrage: Website-Neubau",
    terminlinkHinweis: "Ein Terminlink folgt, bis dahin genügt eine E-Mail.",
  },

  fuss: {
    marke: "Youssef Tayachi",
    tagline: "Websites für Betriebe, die einen zweiten Blick verdient haben.",
    rechtLinks: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
    // {jahr} wird von der Komponente durch das aktuelle Jahr ersetzt.
    copyrightVorlage: "© {jahr} Youssef Tayachi",
  },

  kleintexte: {
    sprungmarke: { label: "Zum Inhalt springen", zielId: "inhalt" },
    nachtmodusSchalter: {
      ariaLabelZuDunkel: "Dunkelmodus aktivieren",
      ariaLabelZuHell: "Hellmodus aktivieren",
    },
    demoKennzeichen: {
      label: "Demo, fiktives Beispiel",
      beschreibung: "Kein realer Kunde, eigens gebaut, um Vorher und Nachher zu zeigen.",
    },
    platzhalterWarnung:
      "Platzhalter: Diese Angaben sind unvollständig und werden vor dem Livegang durch echte Daten ersetzt.",
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
   */
  impressum: {
    titel: "Impressum",
    abschnitte: [
      {
        ueberschrift: "Angaben gemäß § 5 TMG",
        text: "[Vollständiger Name]\n[Straße und Hausnummer]\n[Postleitzahl und Ort]",
      },
      {
        ueberschrift: "Kontakt",
        text: "E-Mail: [E-Mail-Adresse einsetzen]\nTelefon: [Telefonnummer einsetzen, sofern gewünscht]",
      },
      {
        ueberschrift: "Umsatzsteuer-ID",
        text: "[Umsatzsteuer-Identifikationsnummer einsetzen, sofern vorhanden]",
      },
      {
        ueberschrift: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        text: "[Vollständiger Name]\n[Anschrift wie oben]",
      },
      {
        ueberschrift: "EU-Streitschlichtung",
        text: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: [Link zur Plattform einsetzen]. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle ist [Name] nicht verpflichtet und nicht bereit.",
      },
    ],
  },

  datenschutz: {
    titel: "Datenschutzerklärung",
    abschnitte: [
      {
        ueberschrift: "Verantwortlicher",
        text: "[Vollständiger Name]\n[Straße und Hausnummer]\n[Postleitzahl und Ort]\nE-Mail: [E-Mail-Adresse einsetzen]",
      },
      {
        ueberschrift: "Hosting und Server-Logdaten",
        text: "[Name und Anschrift des Hosting-Anbieters einsetzen, sobald die Seite live ist]. Beim Aufruf dieser Website erhebt der Hosting-Anbieter automatisch Zugriffsdaten, wie sie technisch für die Auslieferung der Seite notwendig sind.",
      },
      {
        ueberschrift: "Cookies und eingebundene Inhalte",
        text: "Diese Website setzt keine Cookies und bindet keine Inhalte von Drittanbietern ein. Schriften sind lokal eingebunden, nicht von einem externen Server geladen.",
      },
      {
        ueberschrift: "Kontaktaufnahme per E-Mail",
        text: "Schreibst du mir per E-Mail, verarbeite ich deine Angaben ausschließlich, um deine Anfrage zu beantworten.",
      },
      {
        ueberschrift: "Deine Rechte",
        text: "Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie das Recht, dich bei einer Aufsichtsbehörde zu beschweren.",
      },
    ],
  },
} as const;

export type SeiteContent = typeof seite;
export type MetaContent = typeof seite.meta;
export type KopfleisteContent = typeof seite.kopfleiste;
export type HeroContent = typeof seite.hero;
export type BefundContent = typeof seite.befund;
export type ShowcaseContent = typeof seite.showcase;
export type FallstudieContent = typeof seite.fallstudie;
export type LeistungenContent = typeof seite.leistungen;
export type ProzessContent = typeof seite.prozess;
export type UeberContent = typeof seite.ueber;
export type KontaktContent = typeof seite.kontakt;
export type FussContent = typeof seite.fuss;
export type KleintexteContent = typeof seite.kleintexte;
export type LegalPageContent = typeof seite.impressum;
