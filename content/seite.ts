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
    headline: "Der Befund stand in der Mail. Die Korrektur steht hier.",
    unterzeile:
      "Darunter liegen zwei Fassungen derselben Beispielseite: die alte Bauweise, wie sie noch auf vielen echten Betriebsseiten steht, und die neue daneben.",
    primaerCta: { label: "Fassungen vergleichen", href: "#showcase" },
    sekundaerCta: { label: "Kontakt aufnehmen", href: "#kontakt" },
  },

  befund: {
    eyebrow: "Der Befund",
    headline: "Vier Befunde, die sich wiederholen",
    intro:
      "Nicht jede veraltete Website hat denselben Fehler. Diese vier tauchen trotzdem immer wieder auf, und in der Beispielseite weiter unten stecken sie alle.",
    items: [
      {
        label: "Tempo ungeprüft",
        text: "Bilder, die niemand verkleinert hat, kosten Zeit, bevor der erste Satz zu lesen ist.",
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
    intro:
      "Drei fiktive Betriebe, jeweils in zwei Fassungen: wie ihre Website heute oft aussieht, und wie sie aussehen könnte. Jede Karte ist ein Beispiel, kein echter Kunde.",
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
    intro: "Vier Bausteine, die zusammen eine Website ergeben, die jemand tatsächlich nutzt.",
    items: [
      {
        titel: "Website-Neubau",
        text: "Eine neue Website von Grund auf, für Handwerk, Gastronomie, Kanzleien und Praxen: verständlich aufgebaut, auf dem Handy genauso bedienbar wie am Schreibtisch.",
      },
      {
        titel: "Inhalt und Struktur",
        text: "Bevor eine Zeile Code entsteht, steht fest, was auf die Seite gehört und in welcher Reihenfolge. Weniger Text, aber der, der zählt.",
      },
      {
        titel: "Tempo und Technik",
        text: "Bilder in der richtigen Größe, Schrift ohne Umweg über fremde Server, sauberer Code darunter. Das macht den Unterschied zwischen einer schnellen und einer langsamen Seite aus.",
      },
      {
        titel: "Übergabe und Pflege",
        text: "Nach dem Livegang bekommst du eine Website, die du verstehst, oder die Möglichkeit, dass ich sie weiter betreue. Deine Entscheidung.",
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
        text: "Ein kurzes Gespräch, in dem klar wird, was deine Website leisten soll und wo die jetzige das nicht tut.",
      },
      {
        nummer: "02",
        titel: "Entwurf",
        text: "Ein erster Entwurf mit Struktur und Ton, bevor Technik dazukommt. Du siehst, wohin es geht, bevor etwas gebaut ist.",
      },
      {
        nummer: "03",
        titel: "Umsetzung",
        text: "Die Website entsteht, mit regelmäßigen Zwischenständen statt einer einzigen großen Überraschung am Ende.",
      },
      {
        nummer: "04",
        titel: "Übergabe",
        text: "Die neue Website geht live. Du bekommst Zugriff und eine Erklärung, keine Blackbox.",
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
      "Ich baue Websites und die Werkzeuge, mit denen ich sie an die richtigen Betriebe bringe. Die Mail, die dich hierhergeführt hat, kam aus Frostbreaker, einem Programm für Kaltakquise, das ich selbst geschrieben habe.",
      "Ich arbeite allein, ohne Zwischenstationen. Wer mit mir schreibt, bekommt eine Antwort von der Person, die auch baut.",
      "Ich sage lieber, was an einer Website nicht funktioniert, als was daran gut aussieht. Das stand schon in der Mail, und das steht auch in jeder Fallstudie hier.",
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
    intro: "Ein Weg genügt: schreib mir, was an deiner Website nicht funktioniert, und ich sage dir ehrlich, ob und wie ich helfen kann.",
    emailLabel: "E-Mail schreiben",
    emailAdresse: "youtaybusiness@gmail.com",
    mailtoBetreff: "Anfrage: Website-Neubau",
    terminlinkHinweis: "Ein Terminlink folgt. Bis dahin genügt eine E-Mail.",
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
      beschreibung: "Kein realer Kunde. Diese Fassung ist eigens für diese Seite gebaut, um Vorher und Nachher zu zeigen.",
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
