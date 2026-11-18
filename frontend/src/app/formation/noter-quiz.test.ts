import { describe, expect, it } from "vitest";
import { noterQuiz } from "./noter-quiz";
import { modules } from "./formations-data";

describe("noterQuiz", () => {
  const premierModule = modules[0];
  const bonnesReponses = premierModule.questions.map((q) => q.bonneReponse);

  it("valide le module quand les 5 réponses sont correctes", () => {
    expect(noterQuiz(premierModule, bonnesReponses)).toEqual({ score: 5, valide: true });
  });

  it("ne valide pas le module si une réponse est fausse", () => {
    const uneReponseFausse = [...bonnesReponses];
    uneReponseFausse[0] = (uneReponseFausse[0] + 1) % premierModule.questions[0].options.length;
    const resultat = noterQuiz(premierModule, uneReponseFausse);
    expect(resultat.valide).toBe(false);
    expect(resultat.score).toBe(4);
  });
});
