import { start } from "@/content/start";

/**
 * Die eigene Kopfleiste der Startseite (.site-bar aus page.css). Sie steht
 * ausserhalb des <main> und traegt nur zwei Dinge: die Marke als Weg nach oben
 * und den einen CTA der Seite.
 *
 * Nicht zu verwechseln mit components/chrome/kopfleiste.tsx. Die traegt die
 * deutschen Unterseiten, hat einen Nachtmodus-Schalter und eine Navigation,
 * und genau deshalb bekommt die Startseite ihre eigene: zwei Kopfleisten im
 * selben Dokument waren der Grund fuer die Route Group (mit-chrome).
 */
export default function StartLeiste() {
  const { marke, markeHref, ctaLabel, ctaHref } = start.leiste;

  return (
    <header className="site-bar">
      <a className="site-bar__mark" href={markeHref}>
        {marke}
      </a>
      <a className="site-bar__cta" href={ctaHref}>
        {ctaLabel}
      </a>
    </header>
  );
}
