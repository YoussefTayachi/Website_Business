import Hero from "@/components/sections/hero";
import Befund from "@/components/sections/befund";
import Showcase from "@/components/sections/showcase";
import Leistungen from "@/components/sections/leistungen";
import Prozess from "@/components/sections/prozess";
import Ueber from "@/components/sections/ueber";
import Kontakt from "@/components/sections/kontakt";

/**
 * Der One-Pager (Plan 5).
 *
 * Diese Datei setzt nur zusammen und haelt die Anker fest. Die ids sind der
 * Vertrag mit der Kopfleiste (components/chrome/kopfleiste.tsx) und mit jedem
 * Link aus einer Kaltakquise-Mail: wer sie umbenennt, bricht beides.
 *
 * aria-labelledby zeigt jeweils auf die Ueberschrift INNERHALB der Sektion.
 * Die ids dafuer stehen in den Sektionsdateien.
 *
 * Sektion 8 aus dem Plan (Fuss) steht nicht hier, sondern in app/layout.tsx,
 * damit sie auch auf /impressum, /datenschutz und /arbeit/[slug] erscheint.
 */
export default function Home() {
  return (
    <>
      <section id="hero" aria-labelledby="hero-titel">
        <Hero />
      </section>

      <section id="befund" aria-labelledby="befund-titel">
        <Befund />
      </section>

      <section id="showcase" aria-labelledby="showcase-titel">
        <Showcase />
      </section>

      <section id="leistungen" aria-labelledby="leistungen-titel">
        <Leistungen />
      </section>

      <section id="prozess" aria-labelledby="prozess-titel">
        <Prozess />
      </section>

      <section id="ueber" aria-labelledby="ueber-titel">
        <Ueber />
      </section>

      <section id="kontakt" aria-labelledby="kontakt-titel">
        <Kontakt />
      </section>
    </>
  );
}
