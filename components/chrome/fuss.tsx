import Link from "next/link";
import { seite } from "@/content/seite";

/**
 * Fuss der Seite (Sektion 8 im Plan).
 *
 * Server Component: hier gibt es nichts zu klicken ausser Links. Der
 * Nachtmodus-Schalter sitzt bewusst nur in der Kopfleiste und nicht zusaetzlich
 * hier. Zwei Schalter haetten je einen eigenen Zustand und wuerden sich beim
 * Umschalten gegenseitig widersprechen. Wer ihn lieber unten haette,
 * verschiebt ihn, statt ihn zu verdoppeln.
 *
 * Kein eigener Abstand nach oben: jede Seite bringt ihren unteren Rand selbst
 * mit (pb-section). Der Fuss beginnt deshalb direkt an seiner Haarlinie, und
 * es gibt keine zwei Abstaende, die sich addieren.
 */
export default function SiteFooter() {
  const { marke, tagline, rechtLinks, copyrightVorlage, rechtNavLabel } = seite.fuss;

  // Das Jahr wird beim Bauen eingesetzt, nicht beim Aufruf. Vor dem Livegang
  // pruefen, ob der Build aktuell genug ist.
  const jahr = new Date().getFullYear();
  const copyright = copyrightVorlage.replace("{jahr}", String(jahr));

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-gutter py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-text">
          {/* Die Wortmarke in der Displayschrift, wie oben in der Kopfleiste.
              Kein <p> mit Ueberschriftenoptik: der Fuss ist keine Gliederung
              der Seite und bekommt deshalb auch keine Ueberschrift. */}
          <p className="font-display text-title text-ink">{marke}</p>
          <p className="mt-2 text-small text-soft">{tagline}</p>
        </div>

        <div className="flex flex-col gap-1 sm:items-end">
          <nav aria-label={rechtNavLabel}>
            <ul className="flex items-center gap-6">
              {rechtLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-rule inline-flex min-h-11 items-center text-small text-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-caption text-faint">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
