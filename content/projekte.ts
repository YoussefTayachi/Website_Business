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
    firma: "Elektro Musterhaus",
    branche: "Elektrohandwerk",
    kurzbeschreibung:
      "Ein Elektrobetrieb mit Baukasten-Auftritt aus den frühen 2010er-Jahren: Telefonnummer als Bild, kein Kontaktformular, auf dem Handy kaum zu bedienen.",
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
        "Elektro Musterhaus ist ein fiktiver Betrieb mit fünf Mitarbeitenden. Die bestehende Website (alte Fassung im Vergleich oben) stammt aus einem Baukasten von 2012: Telefonnummer als Bild, kein Kontaktformular, auf dem Handy kaum zu bedienen.",
      entscheidungen: [
        {
          titel: "Ein Kontaktweg statt drei Sackgassen",
          text: "Anruf, E-Mail und ein kurzes Formular führen alle zum selben Ziel, direkt unter der ersten Bildschirmhöhe.",
        },
        {
          titel: "Telefonnummer als Text, nicht als Bild",
          text: "Die Nummer lässt sich auf dem Handy antippen und direkt anrufen, ohne Umweg.",
        },
        {
          titel: "Tap-Ziele nach WCAG-Maß",
          text: "Menüpunkte und Buttons messen mindestens 44 mal 44 Pixel, auch auf dem kleinsten getesteten Bildschirm.",
        },
      ],
      ergebnis:
        "Aus einer Website, die zuerst gelesen und dann irgendwo angerufen werden musste, wird eine, die auf dem Handy in einem Tap zum Anruf führt.",
    },
    alteFassung: {
      navigation: [
        { label: "Startseite", href: "#" },
        { label: "Leistungen", href: "#" },
        { label: "Über uns", href: "#" },
        { label: "Kontakt", href: "#" },
      ],
      ueberschrift: "Willkommen bei Elektro Musterhaus",
      unterzeile: "Ihr Partner für Elektrotechnik in der Region, seit vielen Jahren.",
      absaetze: [
        "Wir bieten Ihnen ein umfangreiches Leistungsspektrum rund um die Elektroinstallation, von der Neuinstallation bis zur Wartung bestehender Anlagen.",
        "Kompetenz, Zuverlässigkeit und Kundenzufriedenheit stehen bei uns im Mittelpunkt unseres Handelns.",
      ],
      ctaLabel: "Kontaktieren Sie uns",
      // Text, der in der Kopfzeile als Bild statt als Text dargestellt wird
      // (siehe Finding "Telefonnummer als Grafik").
      telefonBildText: "Tel. 0800 / 000 000",
      // Ein Satz mitten im Fließtext, der eine E-Mail-Adresse als reinen Text
      // trägt, ohne Aufforderung und ohne Knopfcharakter (siehe Finding "Kein
      // Kontaktweg sichtbar"). Ergänzt den blassen Textlink von `ctaLabel`
      // um den zweiten Teil des Befunds: die Adresse selbst.
      emailZeile:
        "Für Anfragen wenden Sie sich bitte per E-Mail an anfrage@elektro-musterhaus.beispiel, wir kümmern uns umgehend um Ihr Anliegen.",
      fusszeile: "Elektro Musterhaus, Musterstraße 1, 12345 Musterstadt. Alle Rechte vorbehalten.",
    },
    neueFassung: {
      navigation: [
        { label: "Leistungen", href: "#" },
        { label: "Ablauf", href: "#" },
        { label: "Kontakt", href: "#" },
      ],
      ueberschrift: "Elektroinstallation aus einer Hand",
      unterzeile: "Von der Erstberatung bis zur Abnahme: ein Ansprechpartner, ein Weg zur Anfrage.",
      absaetze: [
        "Elektro Musterhaus übernimmt Neuinstallationen, Wartung und Störungsdienst für Betriebe und private Haushalte in der Region.",
        "Eine Anfrage genügt: Rückmeldung mit einem konkreten Termin, nicht mit einer weiteren Frage.",
      ],
      ctaLabel: "Anfrage senden",
      fusszeile: "Elektro Musterhaus, Musterstraße 1, 12345 Musterstadt.",
    },
  },

  "gasthof-mustertal": {
    slug: "gasthof-mustertal",
    firma: "Gasthof Mustertal",
    branche: "Gastronomie",
    kurzbeschreibung:
      "Ein Landgasthof mit Website aus dem Baukasten: Speisekarte nur als PDF, ein Startbild mit 4 Megabyte, aktuelle Öffnungszeiten nur auf Facebook.",
    findings: [
      {
        tag: "Speisekarte als PDF",
        text: "Die Karte öffnet als 2 Megabyte großer PDF-Download, zum Lesen auf dem Handy zweimal zoomen und seitlich schieben.",
      },
      {
        tag: "Startbild 4 Megabyte",
        text: "Ein einzelnes Foto beim Aufruf wiegt 4 Megabyte und lädt vor jedem anderen Inhalt.",
      },
      {
        tag: "Öffnungszeiten veraltet",
        text: "Auf der Website stehen alte Öffnungszeiten, aktuell gepflegt wird nur die Facebook-Seite.",
      },
      {
        tag: "Kontrast 3,1:1",
        text: "Weiße Schrift auf hellem Verlauf erreicht 3,1:1, unter dem Mindestwert der WCAG für Fließtext.",
      },
    ],
    fallstudie: {
      ausgangslage:
        "Gasthof Mustertal ist ein fiktiver Landgasthof. Die bestehende Website zeigt die Karte nur als PDF-Download, das Startbild lädt mit 4 Megabyte vor allem anderen, und aktuelle Öffnungszeiten stehen nur auf Facebook.",
      entscheidungen: [
        {
          titel: "Speisekarte als Text, nicht als Datei",
          text: "Die Karte steht direkt auf der Seite, durchsuchbar und ohne Download.",
        },
        {
          titel: "Ein Bild in Ladegröße",
          text: "Das Startbild ist auf die tatsächliche Anzeigegröße zugeschnitten, statt in Originalauflösung eingebunden.",
        },
        {
          titel: "Öffnungszeiten an einer Stelle",
          text: "Die Zeiten stehen auf der Website selbst und müssen nur dort gepflegt werden, nicht zusätzlich auf einer zweiten Plattform.",
        },
      ],
      ergebnis:
        "Aus einer Website, die zum Nachschlagen der Öffnungszeiten auf eine andere Plattform verwies, wird eine, die die Antwort selbst gibt.",
    },
    alteFassung: {
      navigation: [
        { label: "Start", href: "#" },
        { label: "Speisekarte", href: "#" },
        { label: "Anfahrt", href: "#" },
        { label: "Kontakt", href: "#" },
      ],
      ueberschrift: "Herzlich willkommen im Gasthof Mustertal",
      unterzeile: "Gutbürgerliche Küche in gemütlicher Atmosphäre.",
      absaetze: [
        "Bei uns erwartet Sie regionale Küche mit Tradition, zubereitet mit frischen Zutaten aus der Umgebung.",
        "Unsere Speisekarte finden Sie zum Download weiter unten.",
      ],
      ctaLabel: "Speisekarte herunterladen",
      // Beschriftung des Download-Buttons für die PDF-Speisekarte
      // (siehe Finding "Speisekarte als PDF"). Die Dateigröße steht bewusst
      // deutlich unter den 4 Megabyte des Startbilds (Finding "Startbild 4
      // Megabyte"): zwei unterschiedliche Zahlen, jede für sich plausibel.
      speisekarteDateiLabel: "Speisekarte.pdf (2 MB, Stand unbekannt)",
      fusszeile: "Gasthof Mustertal, Musterstraße 1, 12345 Musterstadt. Öffnungszeiten siehe Facebook.",
    },
    neueFassung: {
      navigation: [
        { label: "Speisekarte", href: "#" },
        { label: "Öffnungszeiten", href: "#" },
        { label: "Kontakt", href: "#" },
      ],
      ueberschrift: "Gasthof Mustertal",
      unterzeile: "Regionale Küche, mitten im Ort.",
      absaetze: [
        "Die Speisekarte steht direkt auf dieser Seite, nach Gängen sortiert und ohne Download.",
        "Öffnungszeiten und Ruhetage stehen an einer Stelle und werden nur dort gepflegt.",
      ],
      ctaLabel: "Tisch anfragen",
      fusszeile: "Gasthof Mustertal, Musterstraße 1, 12345 Musterstadt.",
    },
  },

  "kanzlei-musterberg": {
    slug: "kanzlei-musterberg",
    firma: "Kanzlei Musterberg",
    branche: "Rechtsberatung",
    kurzbeschreibung:
      "Eine Kanzlei-Website als reine Textwüste: 11 Pixel Serifenschrift, kein Terminweg, eine generische Handschlag-Grafik auf der Startseite.",
    findings: [
      {
        tag: "Textwüste ohne Absätze",
        text: "Der gesamte Fließtext läuft als ein einziger Block ohne Absatz und ohne Zwischenüberschrift durch, im Blocksatz gesetzt: eine Wand aus Text ohne jede Gliederung.",
      },
      {
        tag: "Schrift 11 Pixel",
        text: "Der Haupttext läuft in 11 Pixel Serifenschrift, auf dem Handy kaum ohne Zoom zu lesen.",
      },
      {
        tag: "Kein Terminweg vorhanden",
        text: "Eine Beratung lässt sich nirgends buchen, nur eine Telefonnummer im Fließtext, ohne Sprechzeiten.",
      },
      {
        tag: "Stockfoto-Klischee",
        text: "Eine gestellte Grafik zweier Hände beim Handschlag, ohne Bezug zur Kanzlei, füllt die halbe Startseite.",
      },
    ],
    fallstudie: {
      ausgangslage:
        "Kanzlei Musterberg ist eine fiktive Zwei-Personen-Kanzlei. Die bestehende Website ist eine einzige Textwüste in 11 Pixel Serifenschrift, ohne Zwischenüberschriften, ohne Terminweg, mit einer generischen Handschlag-Grafik auf der Startseite.",
      entscheidungen: [
        {
          titel: "Struktur statt Fließtext",
          text: "Zwischenüberschriften und Absätze gliedern die Rechtsgebiete, lesbar auch beim schnellen Überfliegen.",
        },
        {
          titel: "Ein sichtbarer Terminweg",
          text: "Ein einzelner, gut sichtbarer Weg zur Kontaktaufnahme ersetzt die im Text versteckte Telefonnummer.",
        },
        {
          titel: "Eine Startseite ohne Stockfoto-Klischee",
          text: "Statt einer austauschbaren Handschlag-Grafik zeigt die Startseite, welche Rechtsgebiete die Kanzlei tatsächlich bearbeitet.",
        },
      ],
      ergebnis:
        "Aus einer Seite, die erst gelesen werden musste, um überhaupt einen Kontaktweg zu finden, wird eine, die diesen Weg von Anfang an zeigt.",
    },
    alteFassung: {
      navigation: [
        { label: "Startseite", href: "#" },
        { label: "Rechtsgebiete", href: "#" },
        { label: "Kanzlei", href: "#" },
        { label: "Kontakt", href: "#" },
      ],
      ueberschrift: "Kanzlei Musterberg",
      unterzeile: "Rechtsanwälte und Notare",
      // Bewusst als Bandwurmdeutsch verfasst: Schachtelsätze, Substantivierungen
      // und Floskeln ("im Rahmen einer umfassenden Mandatsbetreuung", "unter
      // Berücksichtigung der jeweiligen Interessenlage") ohne eine einzige
      // konkrete Information. Sechs Einträge, gemeinsam rund 1750 Zeichen, damit
      // aus zwei Sätzen im .alt-fliess--11-Block (siehe kanzlei-musterberg-alt.tsx)
      // tatsächlich die Textwüste wird, die Finding [0] beschreibt.
      absaetze: [
        "Die Kanzlei Musterberg berät im Rahmen einer umfassenden Mandatsbetreuung Mandantinnen und Mandanten in den Bereichen Arbeitsrecht, Mietrecht und Familienrecht, wobei jedes einzelne Mandat unter Berücksichtigung der jeweiligen Interessenlage und mit der gebotenen Sorgfalt bearbeitet wird.",
        "Im Bereich des Arbeitsrechts erstreckt sich die anwaltliche Tätigkeit auf sämtliche Fragestellungen, die sich im Rahmen eines bestehenden oder beabsichtigten Arbeitsverhältnisses ergeben können, wobei sowohl die außergerichtliche als auch die gerichtliche Durchsetzung der jeweils betroffenen Interessen übernommen wird.",
        "Auf dem Gebiet des Mietrechts umfasst die Beratung sämtliche Konstellationen des Wohnraum- und Gewerbemietverhältnisses, angefangen bei Fragen der Vertragsgestaltung bis hin zur Begleitung einer etwaigen Beendigung des jeweiligen Mietverhältnisses, stets im Rahmen einer umfassenden Interessenabwägung.",
        "Im Familienrecht erfolgt die Betreuung unter besonderer Berücksichtigung der emotionalen Belastung, die mit derartigen Verfahren regelmäßig einhergeht, wobei stets versucht wird, eine einvernehmliche Lösung herbeizuführen, soweit dies unter Berücksichtigung der jeweiligen Interessenlage der Beteiligten möglich erscheint.",
        "Dieses Vorgehen versteht sich als Ausdruck eines Selbstverständnisses, das für die außergerichtliche Beratung ebenso gilt wie für die Vertretung vor den zuständigen Gerichten und Behörden, unabhängig davon, in welchem der genannten Rechtsgebiete sich das jeweilige Mandat bewegt.",
        "Für ein Erstgespräch wenden Sie sich bitte telefonisch an unser Sekretariat während der üblichen Geschäftszeiten, wobei um Verständnis gebeten wird, dass eine Terminvergabe ausschließlich nach vorheriger Rücksprache erfolgen kann.",
      ],
      ctaLabel: "Telefonisch anfragen",
      // Bildunterschrift der gebauten Platzhalter-Grafik (kein echtes Foto,
      // siehe PLAN.md Abschnitt 8: "keine fremden Stockfotos").
      stockGrafikBeschriftung: "Grafik: zwei Hände beim Handschlag",
      fusszeile: "Kanzlei Musterberg, Musterstraße 1, 12345 Musterstadt.",
    },
    neueFassung: {
      navigation: [
        { label: "Rechtsgebiete", href: "#" },
        { label: "Ablauf", href: "#" },
        { label: "Kontakt", href: "#" },
      ],
      ueberschrift: "Kanzlei Musterberg",
      unterzeile: "Beratung in Arbeitsrecht, Mietrecht und Familienrecht.",
      absaetze: [
        "Jedes Rechtsgebiet steht für sich, mit einem kurzen Absatz, was die Kanzlei dort tatsächlich übernimmt.",
        "Ein Termin lässt sich direkt anfragen, ohne Umweg über ein Sekretariat.",
      ],
      ctaLabel: "Termin anfragen",
      fusszeile: "Kanzlei Musterberg, Musterstraße 1, 12345 Musterstadt.",
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
