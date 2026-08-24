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
    title: "Youssef Tayachi: Website-Neubau für Bau, Elektro und Dach",
    description:
      "Zwei Fassungen derselben Beispielseite, nebeneinander: die alte Bauweise und die neue. Website-Neubau für Bauunternehmen, Elektriker und Dachdecker, gebaut von einer Person.",
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
    // Kicker macht die Zielgruppe zur ersten Zeile, die jemand liest (siehe
    // Auftrag: "das bin ja ich" beim ersten Bildschirm). Das Vertrauenssignal
    // "ein Entwickler, keine Agentur" steht dafuer jetzt in ueber.absaetze.
    kicker: "Für Bauunternehmen, Elektriker, Dachdecker",
    headline: "Deine Arbeit ist gut. Deine Website soll das zeigen.",
    unterzeile: "Direkt darunter: eine Beispielseite, einmal wie viele sie bauen, einmal neu.",
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
    // Vorher: "Vier Befunde, die sich wiederholen" (neutrale Pruefberichtssprache).
    // Jetzt aus Sicht des suchenden Kunden: nicht was am Betrieb falsch ist,
    // sondern was der Kunde erlebt, bevor er weiterzieht (siehe Regel 1 des
    // Auftrags: der Schmerz gehoert dem Kunden, nie dem Betrieb).
    headline: "Was der Kunde erlebt, bevor er weiterzieht",
    intro: "Vier Gründe, warum ein Kunde wieder geht, ohne dass du es merkst.",
    items: [
      {
        // Neu gegenueber der alten Fassung ("Tempo ungeprueft"): der fehlende
        // Beleg der eigenen Arbeit ist fuer Bau, Elektro und Dach der staerkere
        // Aufhaenger als ungeprueftes Ladetempo. Tafel 01 in befund.tsx zeigt
        // bisher einen Bilder-Wasserfall ueber einem Maszstab; das Thema hat
        // gewechselt und muss neu gezeichnet werden (siehe Bericht).
        label: "Kein Beweis der Arbeit",
        text: "Ohne ein Bild von der Baustelle sucht der Kunde beim nächsten weiter.",
      },
      {
        label: "Unlesbar am Handy",
        text: "Der Kunde sucht dich am Handy, die Seite lässt sich dort kaum bedienen.",
      },
      {
        label: "Design ohne Datum",
        text: "Der Kunde hält den Betrieb für geschlossen, nur weil die Seite alt aussieht.",
      },
      {
        // Gleiches Thema wie zuvor ("Kein naechster Schritt"), nur zugespitzt:
        // fuer die neue Zielgruppe ist der fehlende naechste Schritt fast immer
        // der fehlende Anruf im Notfall, nicht ein abstraktes Formular.
        label: "Kein Weg zum Anruf",
        text: "Beim Sturmschaden zählt nur ein Klick zum Anruf, den die Seite nicht bietet.",
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
    intro: "Vier Bausteine für eine Website, die Aufträge bringt statt nur zu stehen.",
    items: [
      {
        titel: "Website-Neubau",
        text: "Neu gebaut für Bau, Elektro und Dach, am Handy so leicht wie am Tisch.",
      },
      {
        // Neu gegenueber der alten Fassung ("Inhalt und Struktur", Thema:
        // viel Text auf wenig verdichten). Fuer Bau, Elektro und Dach zaehlt
        // staerker der fehlende Beleg der eigenen Arbeit (siehe befund.items[0]
        // und PLAN.md-Auftrag: "kein sichtbarer Beweis"). Abbildung 02 in
        // leistungen.tsx zeigt bisher verdichteten Flieszstext; das Thema hat
        // gewechselt und braucht eine neue Zeichnung (siehe Bericht).
        titel: "Beweis deiner Arbeit",
        text: "Fotos von der Baustelle, sichtbar statt versteckt im Aktenordner.",
      },
      {
        titel: "Tempo und Technik",
        text: "Bilder in Ladegröße, schlanker Code: die Seite steht, bevor er weiterzieht.",
      },
      {
        titel: "Übergabe und Pflege",
        text: "Nach dem Start verstehst du die Seite selbst, oder ich pflege sie weiter.",
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
        text: "Ich kläre, was deine Seite können muss und was heute fehlt.",
      },
      {
        nummer: "02",
        titel: "Entwurf",
        text: "Du siehst Aufbau und Text, bevor die Technik beginnt.",
      },
      {
        nummer: "03",
        titel: "Umsetzung",
        text: "Du siehst Zwischenstände, keine Überraschung am Ende.",
      },
      {
        nummer: "04",
        titel: "Übergabe",
        text: "Die Seite geht live, mit Zugriff und einer Erklärung dazu.",
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
    // Von drei auf zwei Absaetze gekuerzt (Auftrag: "radikal weniger"). Das
    // dritte Argument von vorher ("ich sage lieber, was nicht funktioniert")
    // steckt jetzt in der Haltung des zweiten Satzes statt in einem eigenen
    // Absatz.
    absaetze: [
      "Die Mail kam aus Frostbreaker, meinem eigenen Kaltakquise-Programm. Websites und Werkzeuge baue ich selbst.",
      "Ich arbeite allein: Wer schreibt, bekommt Antwort von der Person, die auch baut, und ehrliche Worte dazu.",
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
    intro: "Schreib mir, was an deiner Seite nicht funktioniert, ich sage dir ehrlich, ob ich helfen kann.",
    emailLabel: "E-Mail schreiben",
    emailAdresse: "youtaybusiness@gmail.com",
    mailtoBetreff: "Anfrage: Website-Neubau",
    terminlinkHinweis: "Ein Terminlink folgt, bis dahin genügt eine E-Mail.",
  },

  fuss: {
    marke: "Youssef Tayachi",
    tagline: "Websites für Bau, Elektro und Dach, die einen zweiten Blick verdienen.",
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
