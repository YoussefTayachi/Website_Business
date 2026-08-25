import SiteHeader from "@/components/chrome/kopfleiste";
import SiteFooter from "@/components/chrome/fuss";
import { start } from "@/content/start";

/**
 * Layout fuer alles ausser der Startseite: /impressum, /datenschutz und
 * /arbeit/[slug].
 *
 * Diese Route Group existiert aus einem einzigen Grund. Die neue Startseite
 * bringt ihre eigene Kopfleiste, ihr eigenes <main> und ihren eigenen Fuss
 * mit. Stuende die Chrome weiter im Wurzel-Layout, haette die Startseite zwei
 * Kopfleisten und ein <main> im <main>, und Letzteres ist ungueltiges HTML.
 * Die Klammern im Ordnernamen halten "mit-chrome" aus der URL heraus: die
 * Adressen bleiben /impressum und /datenschutz, unveraendert.
 */
export default function MitChromeLayout({ children }: { children: React.ReactNode }) {
  return (
    // KEIN lang="de" auf dieser Ebene, obwohl hier bis 2026-08-25 eines stand.
    // Damals waren alle drei Routen deutsch. Inzwischen sind /impressum und
    // /datenschutz mituebersetzt, und auch die Chrome ist englisch beschriftet
    // ("Contact", "Legal notice", "Privacy", "Skip to content"). Ein lang="de"
    // ueber englischem Text ist doppelt falsch: ein Screenreader spricht ihn
    // mit deutscher Stimme, und hyphens: auto aus globals.css trennt englische
    // Woerter nach deutschen Regeln. Deutsch ist nur noch die Fallstudie, und
    // die kennzeichnet sich selbst (app/(mit-chrome)/arbeit/[slug]/page.tsx).
    <div>
      <SiteHeader />

      {/* id="top" ist das Ziel der Sprungmarke aus app/layout.tsx. Es traegt
          dasselbe id wie das <main> der Startseite, damit die Sprungmarke
          nicht je nach Route ein anderes Ziel braucht.
          tabIndex -1, damit der Sprung den Fokus wirklich hierher setzt und
          die Tastatur nicht weiter oben in der Kopfleiste weiterlaeuft. */}
      <main id={start.sprungmarke.zielId} tabIndex={-1}>
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
