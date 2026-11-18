import type { Module } from "./formations-data";

export function noterQuiz(module: Module, reponses: number[]): { score: number; valide: boolean } {
  const score = module.questions.reduce(
    (acc, question, i) => acc + (reponses[i] === question.bonneReponse ? 1 : 0),
    0,
  );
  return { score, valide: score === module.questions.length };
}
