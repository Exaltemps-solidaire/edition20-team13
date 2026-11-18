import { describe, expect, it } from "vitest";
import { rechercherRagSimule } from "./rag-simule";
import { fiches } from "../fiches-data";

describe("rechercherRagSimule", () => {
  it("retrouve les fiches pertinentes et synthétise leurs extraits", () => {
    const reponse = rechercherRagSimule(fiches, "avis médical");
    expect(reponse.fichesPertinentes[0]?.id).toBe("demande-avis-medical");
    expect(reponse.synthese).toContain("ENDOmind n'émet jamais d'avis médical");
  });

  it("renvoie un message de repli quand aucune fiche ne correspond", () => {
    const reponse = rechercherRagSimule(fiches, "zzz-inexistant");
    expect(reponse.fichesPertinentes).toEqual([]);
    expect(reponse.synthese).toContain("à faire remonter à l'association");
  });
});
