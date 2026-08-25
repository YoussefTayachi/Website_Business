import { start } from "@/content/start";

/**
 * AKT 3, SCHARNIER. data-sc-act="flow".
 *
 * Ein fast leerer, dunkler Bildschirm mit einem einzigen Satz. Das ist
 * beabsichtigte Stille und keine Luecke: die Ruhe unmittelbar vor dem
 * Hoehepunkt. Wer hier etwas hinzufuegt, nimmt Akt 4 seine Wirkung.
 */
export default function AktScharnier() {
  return (
    <section className="hinge" data-sc-act="flow" data-sc-drift="#0D0E11">
      <p data-sc-in="">{start.scharnier.satz}</p>
    </section>
  );
}
