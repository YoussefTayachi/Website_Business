/**
 * Klassennamen zusammensetzen, ohne Abhaengigkeit.
 *
 * Bewusst nur das, was clsx auch koennte, und bewusst NICHT tailwind-merge:
 * das Projekt hat keine Komponentenbibliothek, in der sich Utility-Klassen
 * gegenseitig ueberschreiben. Wer in einer Sektion einen Konflikt baut,
 * loest ihn an Ort und Stelle statt zur Laufzeit.
 */
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
      continue;
    }

    for (const [key, active] of Object.entries(input)) {
      if (active) out.push(key);
    }
  }

  return out.join(" ");
}
