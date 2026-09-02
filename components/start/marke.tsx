import Link from "next/link";

import { start } from "@/content/start";

/**
 * DIE WORTMARKE MIT BILDMARKE, seit dem 2026-09-02.
 *
 * Vorher stand in der Kopfleiste nur das Wort. Jetzt steht davor das f im
 * abgerundeten Quadrat, dieselbe Geometrie wie app/icon.svg und wie die
 * Bildmarke auf frostbreaker.app. Ein Logo, das im Tab, in der Leiste und
 * auf der Produktseite dasselbe ist, ist der billigste Beweis dafuer, dass
 * hier eine Marke steht und nicht ein Freelancer mit Wordart.
 *
 * Beim Ueberfahren kippt die Bildmarke kurz und richtet sich wieder auf
 * (start.css, .st-marke:hover .st-marke__zeichen). Das ist die einzige
 * Bewegung am Logo, und sie ist absichtlich klein: ein Logo, das tanzt,
 * verliert.
 *
 * Farben als Klasse und nicht als Attribut: Praesentationsattribute in SVG
 * loesen CSS-Variablen nicht auf.
 */
export default function Marke({ inFuss = false }: { inFuss?: boolean }) {
  const { marke, markeZusatz, markeHref } = start.leiste;

  const zeichen = (
    <svg className="st-marke__zeichen" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <rect className="st-marke__grund" width="512" height="512" rx="118" />
      <g className="st-marke__f" fill="none" strokeWidth="62">
        <path d="M 262 400 V 228 A 74 74 0 0 1 336 154" />
        <path d="M 182 252 H 342" />
      </g>
    </svg>
  );

  if (inFuss) {
    return (
      <p className="st-marke st-fuss__marke">
        {zeichen}
        <span className="st-marke__wort">{marke}</span>
        <span className="st-marke__zusatz">{markeZusatz}</span>
      </p>
    );
  }

  return (
    <Link className="st-marke" href={markeHref}>
      {zeichen}
      <span className="st-marke__wort">{marke}</span>
      <span className="st-marke__zusatz">{markeZusatz}</span>
    </Link>
  );
}
