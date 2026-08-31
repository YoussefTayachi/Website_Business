/** @type {import('next').NextConfig} */

// ERFASSUNGSSEITEN, und warum das ueber pageExtensions laeuft.
//
// Die Fallkarten und der Geraeterahmen im Hero zeigen echte Aufnahmen der
// Demo-Seiten aus components/showcase/demos/. Um die aufnehmen zu koennen,
// muss jede Fassung einzeln unter einer Adresse stehen, ohne Kopfleiste und
// ohne Fuss. Diese Adressen duerfen in einem Produktionsbau nicht existieren.
//
// Der naheliegende Weg waere ein Ordner mit Unterstrich gewesen. Der ist
// unter app/ ein PRIVATER Ordner und erzeugt ueberhaupt keine Route, die
// Aufnahme haette also nie funktioniert. Der zweitnaheliegende Weg waere
// notFound() in der Produktion: dann existiert die Route weiterhin, sie
// antwortet nur mit 404, und ein vergessenes Flag laesst sie wieder auf.
//
// pageExtensions loest es strukturell. Die Erfassungsseiten heissen
// page.capture.tsx. Ohne CAPTURE=1 ist diese Endung fuer Next keine
// Seitenendung, die Datei ist damit kein Seitenmodul und kann gar nicht in
// den Bau geraten. Aufnehmen also mit:
//     CAPTURE=1 npm run dev -- -p 3200
const capture = process.env.CAPTURE === "1";

export default {
  pageExtensions: capture ? ["capture.tsx", "tsx", "ts"] : ["tsx", "ts"],

  // Der Dev-Indikator von Next ist eine feste Einblendung unten links. Bei
  // einem gewoehnlichen Dev-Lauf ist er nuetzlich, in einer Aufnahme ist er
  // ein schwarzer Kreis mitten auf der Website des Kunden. Deshalb genau
  // dann aus, wenn aufgenommen wird, und sonst an.
  devIndicators: capture ? false : undefined,

  // Die Quelldateien der Aufnahmen bleiben PNG. Was ausgeliefert wird,
  // aushandelt next/image. Bewusst kein handgebautes <picture> und keine
  // zweite, parallel gepflegte Ableitung: gemessen wird ohnehin, was beim
  // Besucher ankommt, und nicht was im Ordner liegt.
  images: { formats: ["image/avif", "image/webp"] },
};
