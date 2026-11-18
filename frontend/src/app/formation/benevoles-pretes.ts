import type { EntreeRoster } from "./statut-context";

export function benevolesPretes(roster: EntreeRoster[], modules: { id: string }[]): EntreeRoster[] {
  return roster.filter((benevole) => modules.every((m) => benevole.statuts[m.id] === true));
}
