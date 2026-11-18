import { describe, expect, it } from "vitest";
import { filtrerFiches } from "./filtrer-fiches";
import { fiches } from "./fiches-data";

describe("filtrerFiches", () => {
  it("remonte la fiche correspondant au mot-clé sur le titre", () => {
    const resultat = filtrerFiches(fiches, "filière de soins");
    expect(resultat[0]?.id).toBe("filiere-soins-regionale");
  });

  it("renvoie une liste vide quand aucun mot-clé ne correspond", () => {
    expect(filtrerFiches(fiches, "zzz-inexistant")).toEqual([]);
  });
});
