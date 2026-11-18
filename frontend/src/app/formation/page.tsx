"use client";

import { useState } from "react";
import { useRole } from "../role-context";
import { useFormation } from "./statut-context";
import { modules } from "./formations-data";
import { noterQuiz } from "./noter-quiz";
import styles from "./page.module.css";

export default function MaFormation() {
  const { persona } = useRole();
  const { roster, validerModule } = useFormation();
  const [moduleOuvertId, setModuleOuvertId] = useState<string | null>(null);
  const [reponses, setReponses] = useState<number[]>([]);
  const [resultat, setResultat] = useState<{ moduleId: string; score: number; valide: boolean } | null>(
    null,
  );

  if (!persona || persona.role !== "benevole") {
    return (
      <div className={styles.page}>
        <p>Incarnez une bénévole sur le terrain (bouton « Changer de rôle » en haut) pour accéder à votre formation.</p>
      </div>
    );
  }

  const statuts = roster.find((b) => b.id === persona.id)?.statuts ?? {};

  function ouvrirModule(moduleId: string) {
    setModuleOuvertId(moduleId);
    setReponses([]);
    setResultat(null);
  }

  function soumettreQuiz(moduleId: string) {
    const mod = modules.find((m) => m.id === moduleId)!;
    const { score, valide } = noterQuiz(mod, reponses);
    validerModule(persona!.id, moduleId, valide);
    setResultat({ moduleId, score, valide });
  }

  return (
    <div className={styles.page}>
      <h1>Ma formation</h1>
      {modules.map((mod) => {
        const estValide = statuts[mod.id] === true;
        const estOuvert = moduleOuvertId === mod.id;
        return (
          <div key={mod.id} className={`card ${styles.module}`}>
            <span className={`badge ${estValide ? styles.valide : styles.aFaire}`}>
              {estValide ? "Validé" : "À faire"}
            </span>
            <h2>{mod.titre}</h2>
            {!estOuvert && (
              <button className="btn btnPrimary" onClick={() => ouvrirModule(mod.id)}>
                {estValide ? "Repasser le quiz" : "Faire le quiz"}
              </button>
            )}
            {estOuvert && (
              <>
                {mod.questions.map((q, i) => (
                  <div key={q.id} className={styles.question}>
                    <p>{q.enonce}</p>
                    {q.options.map((option, optionIndex) => (
                      <label key={optionIndex}>
                        <input
                          type="radio"
                          name={`${mod.id}-${q.id}`}
                          checked={reponses[i] === optionIndex}
                          onChange={() =>
                            setReponses((r) => {
                              const copie = [...r];
                              copie[i] = optionIndex;
                              return copie;
                            })
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ))}
                <button className="btn btnPrimary" onClick={() => soumettreQuiz(mod.id)}>
                  Valider mes réponses
                </button>
                {resultat?.moduleId === mod.id && (
                  <p className={styles.resultat}>
                    Score {resultat.score}/{mod.questions.length} —{" "}
                    {resultat.valide ? "module validé" : "module à refaire"}
                  </p>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
