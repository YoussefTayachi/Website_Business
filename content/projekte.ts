// Die drei fiktiven Demo-Projekte für die Showcase-Sektion und
// /arbeit/[slug]. Jeder Firmenname trägt bewusst "Muster" (wie in
// Mustermann, Musterstadt): auch ohne das Kennzeichen "Demo, fiktives
// Beispiel" aus seite.ts erkennt jeder deutschsprachige Leser sofort, dass
// hier kein echter Betrieb gemeint ist. Adressen aus derselben Familie
// ("Musterstraße 1, 12345 Musterstadt") tragen das bis in die Fußzeilen der
// gebauten Demo-Fassungen weiter.
//
// Die Messschild-Befunde (`findings`) sind zugleich Baubeschreibung: die
// genannten Werte (Schriftgröße, Kontrastwert, Tap-Ziel in Pixeln) sind
// keine gemessenen Zahlen einer echten Website, sondern die Vorgabe, nach
// der die ".alt-fassung" tatsächlich gebaut werden muss (siehe PLAN.md
// Abschnitt 7). Nur so bleibt jede Zahl wahr: sie beschreibt, was auf der
// Seite tatsächlich zu sehen ist, weil die Seite genau danach gebaut wurde.

export const projekte = {
  "elektro-musterhaus": {
    slug: "elektro-musterhaus",
    firma: "Voltas Electric",
    branche: "Electrical",
    kurzbeschreibung:
      "Baukasten-Website aus den frühen 2010ern: Telefonnummer als Bild, kein Formular, kaum bedienbar am Handy.",
    findings: [
      {
        tag: "Telefonnummer als Grafik",
        text: "Die Nummer steht als Bild in der Kopfzeile: kein Antippen zum Anrufen, kein Kopieren, keine Sprachausgabe.",
      },
      {
        tag: "Kein Kontaktweg sichtbar",
        text: "Eine E-Mail-Adresse steht mitten im Fließtext, dazu ein blasser Textlink am Ende der Seite: kein Formular, kein Knopf.",
      },
      {
        tag: "Tap-Ziel 26 Pixel",
        text: "Die Menüpunkte messen 26 mal 26 Pixel, deutlich unter der von den WCAG empfohlenen Mindestgröße von 44 Pixeln.",
      },
      {
        tag: "Kontrast 2,9:1",
        text: "Hellgraue Schrift auf weißem Grund erreicht 2,9:1, die WCAG verlangen für Fließtext mindestens 4,5:1.",
      },
    ],
    fallstudie: {
      ausgangslage:
        "Elektro Musterhaus, fiktiver Betrieb mit fünf Mitarbeitenden: Die Website stammt aus einem Baukasten von 2012, kaum bedienbar am Handy.",
      entscheidungen: [
        {
          titel: "Ein Kontaktweg statt drei Sackgassen",
          text: "Anruf, E-Mail und Formular führen alle zum selben Ziel, direkt sichtbar.",
        },
        {
          titel: "Telefonnummer als Text, nicht als Bild",
          text: "Die Nummer lässt sich auf dem Handy antippen und direkt anrufen, ohne Umweg.",
        },
        {
          titel: "Tap-Ziele nach WCAG-Maß",
          text: "Menüpunkte und Buttons messen mindestens 44 mal 44 Pixel.",
        },
      ],
      ergebnis: "Aus einer Website zum Suchen wird eine, die am Handy in einem Tap zum Anruf führt.",
    },
    alteFassung: {
      navigation: [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "About us", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ueberschrift: "Welcome to the website of Voltas Electric",
      unterzeile: "Your partner for electrical engineering in the region, for many years now.",
      absaetze: [
        "We offer you a comprehensive range of services in the field of electrical installation, from new installations through to the maintenance of existing systems.",
        "Competence, reliability and customer satisfaction are at the heart of everything that we do.",
      ],
      ctaLabel: "Please contact us",
      // Text, der in der Kopfzeile als Bild statt als Text dargestellt wird
      // (siehe Finding "Telefonnummer als Grafik").
      telefonBildText: "Tel. 0800 / 000 000",
      // Ein Satz mitten im Fließtext, der eine E-Mail-Adresse als reinen Text
      // trägt, ohne Aufforderung und ohne Knopfcharakter (siehe Finding "Kein
      // Kontaktweg sichtbar"). Ergänzt den blassen Textlink von `ctaLabel`
      // um den zweiten Teil des Befunds: die Adresse selbst.
      emailZeile:
        "For enquiries please contact us by e-mail at enquiries@voltas-electric.example and we will attend to your request as soon as possible.",
      fusszeile: "Voltas Electric, 14 Mill Lane, Bradford BD1 2AB. All rights reserved.",
    },
    neueFassung: {
      navigation: [
        { label: "Services", href: "#" },
        { label: "How it works", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ueberschrift: "Electrical work from a single source",
      unterzeile: "From the first call to sign off: one contact, one way to get in touch.",
      absaetze: [
        "Voltas Electric handles new installations, maintenance and emergency call outs for businesses and households across the region.",
        "One enquiry is enough: you get an answer with a date in it, not another question.",
      ],
      ctaLabel: "Send an enquiry",
      fusszeile: "Voltas Electric, 14 Mill Lane, Bradford BD1 2AB.",
    },
  },

  "bau-mustergrund": {
    slug: "bau-mustergrund",
    firma: "Baubetrieb Mustergrund",
    branche: "Hochbau",
    kurzbeschreibung:
      "Baukasten-Website ohne ein einziges Baustellenfoto, feste Breite von 980 Pixel, am Handy nur mit Zoom lesbar.",
    // Branchenmotiv Bau (siehe Auftrag): der Beweis ist das Thema, was wurde
    // tatsächlich gebaut, plus eine Seite, die am Handy nicht mitwächst. Zwei
    // der vier Befunde sind messbar (feste Breite, Kontrastwert), zwei
    // beschreiben das Fehlen von Belegen. Jeder Satz nennt zuerst die Folge
    // für den suchenden Kunden, danach erst die Messung.
    findings: [
      {
        tag: "Keine Referenz sichtbar",
        text: "Der Kunde sieht kein einziges fertiges Projekt und geht ohne Vertrauen weiter.",
      },
      {
        tag: "Feste Breite 980 Pixel",
        text: "Am Handy bleibt die Seite winzig, sie wächst nicht mit, feste Breite 980 Pixel.",
      },
      {
        // Farbpaar fuer den Bauenden: Text #808080 auf Hintergrund #F0EFE8
        // (warmes Beton-Weiss), errechneter Kontrast rund 3,4:1 nach der
        // Formel fuer relative Luminanz. Beide Werte sind neu gegenueber
        // Elektro (2,9:1) und dem fruehreren Gasthof-Eintrag (3,1:1).
        tag: "Kontrast 3,4:1",
        text: "Der Text ist auf dem Handy kaum zu lesen, Grauton auf Grauton, Kontrast 3,4:1.",
      },
      {
        tag: "Keine laufende Baustelle",
        text: "Der Kunde weiß nicht, ob der Betrieb gerade überhaupt baut, es fehlt jeder Hinweis.",
      },
    ],
    fallstudie: {
      ausgangslage:
        "Baubetrieb Mustergrund, fiktiver Betrieb mit acht Mitarbeitenden: keine einzige Baustelle auf der Seite, fest in 980 Pixel Breite gebaut.",
      entscheidungen: [
        {
          titel: "Referenzen sichtbar gemacht",
          text: "Abgeschlossene und laufende Bauprojekte stehen mit Titel und Ort auf der Seite.",
        },
        {
          titel: "Eine Seite, die mitwächst",
          text: "Layout und Schrift passen sich jeder Bildschirmbreite an, ohne Zoomen.",
        },
        {
          titel: "Kontrast nach WCAG-Maß",
          text: "Schrift und Hintergrund erreichen jetzt mindestens 4,5:1.",
        },
      ],
      ergebnis: "Aus einer Seite ohne ein einziges Bild wird eine, die zeigt, was der Betrieb tatsächlich gebaut hat.",
    },
    alteFassung: {
      navigation: [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "About us", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ueberschrift: "Willkommen bei Baubetrieb Mustergrund",
      unterzeile: "Ihr zuverlässiger Partner für Hochbau in der Region.",
      absaetze: [
        "Wir realisieren Bauvorhaben jeder Größenordnung und stehen Ihnen als kompetenter Partner in allen Phasen des Bauprozesses zur Seite, von der Planung bis zur schlüsselfertigen Übergabe.",
        "Qualität, Termintreue und eine partnerschaftliche Zusammenarbeit stehen bei uns im Mittelpunkt unseres unternehmerischen Handelns.",
      ],
      ctaLabel: "Please contact us",
      // Reine Aufzaehlung von Leistungsbegriffen ohne ein einziges Projekt
      // dahinter (siehe Finding "Keine Referenz sichtbar" und "Keine laufende
      // Baustelle"): der Kunde liest vier Woerter, aber sieht nichts, was der
      // Betrieb damit tatsaechlich gebaut hat.
      leistungenListe: ["Hochbau", "Sanierung", "Rohbau", "Erdarbeiten"],
      fusszeile: "Baubetrieb Mustergrund, Musterstraße 1, 12345 Musterstadt. Alle Rechte vorbehalten.",
    },
    neueFassung: {
      navigation: [
        { label: "Referenzen", href: "#" },
        { label: "Services", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ueberschrift: "Hochbau mit sichtbaren Ergebnissen",
      unterzeile: "Abgeschlossene und laufende Projekte aus der Region, direkt auf der Seite.",
      absaetze: [
        "Baubetrieb Mustergrund übernimmt Rohbau, Sanierung und Erdarbeiten für Betriebe und private Bauherren in der Region.",
        "Jedes Projekt steht mit Ort und einem Satz auf dieser Seite, abgeschlossen oder gerade im Bau.",
      ],
      ctaLabel: "Projekt anfragen",
      // Die Aufloesung von "Keine Referenz sichtbar" und "Keine laufende
      // Baustelle" in einem Feld: drei Projekte mit Titel und Ort, das letzte
      // ausdruecklich als laufend markiert.
      referenzen: [
        { titel: "Einfamilienhaus, Rohbau", ort: "Musterstadt" },
        { titel: "Lagerhalle, Erweiterung", ort: "Musterstadt" },
        { titel: "Mehrfamilienhaus, im Bau", ort: "Musterstadt" },
      ],
      fusszeile: "Baubetrieb Mustergrund, Musterstraße 1, 12345 Musterstadt.",
    },
  },

  "dach-musterhoehe": {
    slug: "dach-musterhoehe",
    firma: "Dachdecker Musterhöhe",
    branche: "Dachdeckerei",
    kurzbeschreibung:
      "Baukasten-Website ohne Notdienst-Hinweis, Anruf-Knopf kaum zu treffen, alte Jahreszahl in der Fußzeile.",
    // Branchenmotiv Dach (siehe Auftrag): der Notfall ist das Thema, Sturm,
    // nachts, sofort anrufen koennen, plus das sichtbare Baujahr der Seite.
    // Zwei der vier Befunde sind messbar (Schriftgroesse, Tap-Ziel), beide
    // andere Werte als bei Elektro (Tap-Ziel 26 Pixel) und Bau.
    findings: [
      {
        tag: "Kein Notdienst sichtbar",
        text: "Beim Sturm in der Nacht findet der Kunde keinen Hinweis auf einen Notdienst.",
      },
      {
        tag: "Schrift 12 Pixel",
        text: "Die Nummer für den Notfall liest sich kaum, Fließtext läuft in 12 Pixel Schrift.",
      },
      {
        tag: "Tap-Ziel 30 Pixel",
        text: "Der Anruf-Knopf lässt sich mit dem Daumen kaum treffen, er misst 30 mal 30 Pixel.",
      },
      {
        tag: "Baujahr in der Fußzeile",
        text: "Eine alte Jahreszahl in der Fußzeile verrät das Baujahr der Seite, nicht der Firma.",
      },
    ],
    fallstudie: {
      ausgangslage:
        "Dachdecker Musterhöhe, fiktiver Betrieb mit vier Mitarbeitenden: kein Notdienst-Hinweis, der Anruf-Knopf kaum zu treffen.",
      entscheidungen: [
        {
          titel: "Notdienst sofort sichtbar",
          text: "Ein Hinweis auf den Notdienst steht direkt im Kopf der Seite, jederzeit sichtbar.",
        },
        {
          titel: "Ein Anruf-Knopf nach Maß",
          text: "Der Knopf zum Anrufen misst jetzt mindestens 44 mal 44 Pixel, nach WCAG-Maß.",
        },
        {
          titel: "Aktuelles Jahr in der Fußzeile",
          text: "Die Fußzeile zeigt das laufende Jahr, keine veraltete Jahreszahl mehr.",
        },
      ],
      ergebnis: "Aus einer Seite ohne Notdienst wird eine, die nachts in einem Tap zum Anruf führt.",
    },
    alteFassung: {
      navigation: [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "About us", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ueberschrift: "Herzlich willkommen bei Dachdecker Musterhöhe",
      unterzeile: "Ihr zuverlässiger Partner rund ums Dach, seit vielen Jahren.",
      absaetze: [
        "Wir bieten Ihnen ein umfassendes Leistungsspektrum rund um die Dacheindeckung, von der Neueindeckung bis zur regelmäßigen Wartung Ihres Daches.",
        "Zuverlässigkeit und Kundenzufriedenheit stehen bei uns im Mittelpunkt unseres Handelns.",
      ],
      ctaLabel: "Please contact us",
      // Nur die gewoehnlichen Geschaeftszeiten, kein Wort zum Notdienst
      // (siehe Finding "Kein Notdienst sichtbar"): wer nachts sucht, findet
      // hier nur eine Uhrzeit, zu der ohnehin niemand rangeht.
      oeffnungszeiten: "Öffnungszeiten: Montag bis Freitag, 8 bis 17 Uhr.",
      // Traegt die alte Jahreszahl aus Finding "Baujahr in der Fußzeile"
      // woertlich in die Fusszeile, statt sie nur zu behaupten.
      fusszeile: "Dachdecker Musterhöhe, Musterstraße 1, 12345 Musterstadt. © 2013 Alle Rechte vorbehalten.",
    },
    neueFassung: {
      navigation: [
        { label: "Notdienst", href: "#" },
        { label: "Services", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ueberschrift: "Dacharbeiten aus einer Hand",
      unterzeile: "Neueindeckung, Reparatur und Wartung für Dächer in der Region.",
      absaetze: [
        "Dachdecker Musterhöhe deckt neu ein, repariert und übernimmt den Notdienst bei Sturmschaden, Tag und Nacht.",
        "Der Anruf-Knopf steht auf jeder Seite an derselben Stelle, groß genug für den Daumen.",
      ],
      ctaLabel: "Jetzt anrufen",
      // Die Aufloesung von "Kein Notdienst sichtbar": der Satz, der in der
      // alten Fassung fehlt, steht hier als eigenes Feld.
      notdienstHinweis: "Notdienst rund um die Uhr: sofort anrufen.",
      fusszeile: "Dachdecker Musterhöhe, Musterstraße 1, 12345 Musterstadt.",
    },
  },
} as const;

export type ProjektSlug = keyof typeof projekte;
export type DemoProjekt = (typeof projekte)[ProjektSlug];
export type Finding = DemoProjekt["findings"][number];
export type Fallstudie = DemoProjekt["fallstudie"];
export type DemoFassung = DemoProjekt["alteFassung"] | DemoProjekt["neueFassung"];

// Bequemer Iterations-Zugriff für Komponenten, die alle drei Projekte in
// fester Reihenfolge auflisten (z. B. die Showcase-Sektion).
export const projekteListe: DemoProjekt[] = Object.values(projekte);
