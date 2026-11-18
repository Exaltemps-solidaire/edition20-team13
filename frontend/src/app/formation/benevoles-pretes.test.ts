import { describe, expect, it } from "vitest";
import { benevolesPretes } from "./benevoles-pretes";

const modules = [{ id: "m1" }, { id: "m2" }];

describe("benevolesPretes", () => {
  it("retient une bénévole dont tous les modules sont validés", () => {
    const roster = [{ id: "a", nom: "A", statuts: { m1: true, m2: true } }];
    expect(benevolesPretes(roster, modules)).toEqual(roster);
  });

  it("écarte une bénévole avec au moins un module non validé", () => {
    const roster = [
      { id: "a", nom: "A", statuts: { m1: true, m2: true } },
      { id: "b", nom: "B", statuts: { m1: true, m2: false } },
    ];
    expect(benevolesPretes(roster, modules)).toEqual([roster[0]]);
  });
});
