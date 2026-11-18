import type { Fiche } from "./fiches-data";

export function filtrerFiches(fiches: Fiche[], motCle: string): Fiche[] {
  const q = motCle.trim().toLowerCase();
  if (!q) return fiches;
  return fiches.filter(
    (f) => f.titre.toLowerCase().includes(q) || f.theme.toLowerCase().includes(q),
  );
}
