import "./globals.css";
// Alle drei Schriften als lokales Paket, nicht ueber ein CDN: die Seite laedt
// damit ohne fremde Anfrage, und die Datenschutzerklaerung darf genau das
// behaupten (content/seite.ts, Abschnitt "Cookies und eingebundene Inhalte").
//
// Bei Newsreader bewusst opsz.css statt der Standarddatei: nur damit traegt
// die Schrift ihre optische Achse, und font-optical-sizing in globals.css
// bekommt bei den Displaystufen ueberhaupt etwas zu tun.
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import type { Metadata } from "next";
import SiteHeader from "@/components/chrome/kopfleiste";
import SiteFooter from "@/components/chrome/fuss";
import { seite } from "@/content/seite";

export const metadata: Metadata = {
  title: {
    default: seite.meta.title,
    // Unterseiten (Fallstudie, Impressum, Datenschutz) setzen nur ihren
    // eigenen Titel und bekommen die Marke von hier dazu.
    template: `%s | ${seite.kopfleiste.marke}`,
  },
  description: seite.meta.description,
  openGraph: {
    title: seite.meta.ogTitle,
    description: seite.meta.ogDescription,
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Setzt .dark vor dem ersten Bild, damit der Nachtmodus nicht nachtraeglich
  // umspringt. Gleiche Fassung wie im Hauptprojekt, damit sich beide Projekte
  // beim Zusammenfuehren nicht widersprechen.
  const themeScript =
    "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}";

  const { sprungmarke } = seite.kleintexte;

  return (
    <html lang="de" suppressHydrationWarning>
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
            Lesbarkeit: ohne eigene Flaeche stuende der Link ueber dem Inhalt. */}
        <a
          href={`#${sprungmarke.zielId}`}
          className="sr-only rounded-sm border border-line3 bg-sheet px-3 py-2 text-small text-ink focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          {sprungmarke.label}
        </a>

        <SiteHeader />

        {/* tabIndex -1, damit der Sprung den Fokus wirklich hierher setzt und
            die Tastatur nicht weiter oben in der Kopfleiste weiterlaeuft. */}
        <main id={sprungmarke.zielId} tabIndex={-1}>
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
