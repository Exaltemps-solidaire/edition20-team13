import type { Fiche } from "../fiches-data";

export type ReponseSimulee = {
  question: string;
  fichesPertinentes: Fiche[];
  synthese: string;
};

export function rechercherRagSimule(fiches: Fiche[], question: string): ReponseSimulee {
  const motsCles = question
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const fichesPertinentes = fiches
    .map((fiche) => {
      const texte = `${fiche.titre} ${fiche.theme} ${fiche.extrait}`.toLowerCase();
      const score = motsCles.filter((mot) => texte.includes(mot)).length;
      return { fiche, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.fiche);

  const synthese =
    fichesPertinentes.length === 0
      ? "Aucune fiche mémo ne couvre cette question pour l'instant — à faire remonter à l'association."
      : fichesPertinentes.map((f) => f.extrait).join(" ");

  return { question, fichesPertinentes, synthese };
}
