import "./globals.css";
// Alle Schriften als lokales Paket, nicht ueber ein CDN: die Seite laedt damit
// ohne fremde Anfrage, und die Datenschutzerklaerung darf genau das behaupten
// (content/seite.ts, Abschnitt "Cookies und eingebundene Inhalte"). Der Build,
// aus dem die Startseite stammt, holte Fraunces, Archivo und JetBrains Mono
// noch von fonts.googleapis.com. Genau diese drei Anfragen waeren auf einer
// Seite, die mit dem eigenen Netzwerk-Panel argumentiert, das teuerste Detail
// gewesen; der <link> ist deshalb ersatzlos gestrichen.
//
// HIER stehen nur die Schriften, die JEDE Route braucht: Inter und Newsreader
// tragen die deutschen Rechts- und Fallstudienseiten, JetBrains Mono beide
// Welten. Fraunces und Archivo braucht nur die Startseite und werden deshalb
// in app/page.tsx geladen.
//
// Bei Newsreader bewusst opsz.css statt der Standarddatei: nur damit traegt
// die Schrift ihre optische Achse, und font-optical-sizing in globals.css
// bekommt bei den Displaystufen ueberhaupt etwas zu tun.
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import type { Metadata } from "next";
import { seite } from "@/content/seite";
import { start } from "@/content/start";

/**
 * Das Wurzel-Layout traegt nur noch, was wirklich global ist: html, body,
 * Schriften, Theme-Skript und die Sprungmarke.
 *
 * WARUM HIER KEINE KOPFLEISTE, KEIN FUSS UND KEIN <main> MEHR STEHT: die
 * Startseite bringt beides selbst mit (eine eigene .site-bar und einen Fuss,
 * der im Schlussakt in der Buehne steckt). Zwei Kopfleisten waeren falsch, und
 * ein <main> im <main> ist ungueltiges HTML. Die Chrome ist deshalb in die
 * Route Group app/(mit-chrome)/ gewandert und gilt dort fuer /impressum,
 * /datenschutz und /arbeit/[slug].
 */
export const metadata: Metadata = {
  // Ohne metadataBase erzeugt Next relative Adressen fuer og:image und
  // canonical, und ein relatives og:image zeigt in keinem Vorschaudienst ein
  // Bild. Die Adresse steht in content/seite.ts, damit sie nicht an drei
  // Stellen gepflegt werden muss.
  metadataBase: new URL(seite.adresse),
  alternates: { canonical: "/" },
  title: {
    default: start.meta.title,
    // Unterseiten (Fallstudie, Impressum, Datenschutz) setzen nur ihren
    // eigenen Titel und bekommen die Marke von hier dazu.
    template: `%s | ${seite.kopfleiste.marke}`,
  },
  description: start.meta.description,
  openGraph: {
    title: start.meta.title,
    description: start.meta.description,
    locale: start.meta.locale,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Setzt die Modusklasse vor dem ersten Bild, damit nichts nachtraeglich
  // umspringt.
  //
  // WAS SICH AM 2026-08-31 GEAENDERT HAT UND WARUM: die Vorgaengerfassung las
  // ausschliesslich localStorage. Wer sein Geraet auf dunkel gestellt und
  // diese Seite noch nie besucht hatte, bekam sie hell, und zwar dauerhaft,
  // weil ohne Besuch auch nie ein Wert gespeichert wurde. Die
  // Systemeinstellung trug niemand.
  //
  // Jetzt gilt: eine GESPEICHERTE Wahl schlaegt alles, sonst entscheidet das
  // Geraet. Die Klasse wird in beiden Faellen gesetzt, auch die helle. Das
  // ist Bedingung und kein Zierrat: app/globals.css traegt die dunklen
  // Tokens zusaetzlich unter @media (prefers-color-scheme: dark) fuer den
  // Fall ohne JavaScript, und nur `:root.light` kann diese Medienabfrage
  // wieder schlagen, wenn jemand ausdruecklich hell gewaehlt hat.
  //
  // Ohne JavaScript passiert hier nichts, und die Seite ist trotzdem im
  // richtigen Modus. Das ist der eigentliche Gewinn.
  const themeScript =
    "try{var s=localStorage.getItem('theme');" +
    "var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;" +
    "document.documentElement.classList.add(d?'dark':'light')}catch(e){}";

  const { sprungmarke } = start;

  return (
    // lang="en", weil die Startseite englisch ist. Die deutschen Unterseiten
    // korrigieren das in app/(mit-chrome)/layout.tsx auf ihrem eigenen
    // Wrapper: ohne das liest ein Screenreader das Impressum mit englischer
    // Stimme, und die Silbentrennung aus globals.css trennt nach den falschen
    // Regeln.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* .nur-mit-js traegt jedes Bedienelement, das ohne JavaScript nichts
            tut: der Umschalter zwischen alter und neuer Fassung
            (components/showcase/vorher-nachher.tsx) ist so eines. Ein Knopf,
            der auf nichts reagiert, ist schlimmer als kein Knopf, also
            verschwindet er, und der <noscript>-Block daneben liefert
            stattdessen beide Fassungen untereinander. Die Regel steht in
            einem <noscript>: der Browser wendet sie nur an, wenn JavaScript
            wirklich aus ist. */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: ".nur-mit-js{display:none !important}" }} />
        </noscript>
      </head>
      <body className="min-h-screen">
        {/* Sprungmarke fuer Tastatur und Screenreader: erst beim Fokus
            sichtbar. Der Grund fuer bg-sheet ist nicht Gestaltung, sondern
            Lesbarkeit: ohne eigene Flaeche stuende der Link ueber dem Inhalt.
            Das Ziel #top existiert auf jeder Route: auf der Startseite als
            <main id="top"> in app/page.tsx, auf allen anderen als
            <main id="top"> in app/(mit-chrome)/layout.tsx. */}
        <a
          href={`#${sprungmarke.zielId}`}
          className="sr-only rounded-sm border border-line3 bg-sheet px-3 py-2 text-small text-ink focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          {sprungmarke.label}
        </a>

        {children}
      </body>
    </html>
  );
}
