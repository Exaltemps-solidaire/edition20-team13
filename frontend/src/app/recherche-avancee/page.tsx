"use client";

import { useState } from "react";
import { fiches } from "../fiches-data";
import { rechercherRagSimule, type ReponseSimulee } from "./rag-simule";
import styles from "./page.module.css";

export default function RechercheAvancee() {
  const [question, setQuestion] = useState("");
  const [reponse, setReponse] = useState<ReponseSimulee | null>(null);

  function chercher() {
    setReponse(rechercherRagSimule(fiches, question));
  }

  return (
    <div className={styles.page}>
      <h1>Question libre (simulation)</h1>
      <p className={`card ${styles.avertissement}`}>
        ⚠️ Simulation locale, sans connexion à un service externe : la recherche ne fait que
        comparer des mots-clés aux fiches mémo existantes. La vraie version (embeddings) est
        bloquée tant que <code>OPENAI_API_KEY</code> n&rsquo;est pas fournie à la plateforme.
      </p>
      <div className={styles.recherche}>
        <input
          className="input"
          type="search"
          placeholder="Ex. une personne demande un avis médical"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && chercher()}
        />
        <button className="btn btnPrimary" onClick={chercher}>
          Chercher
        </button>
      </div>
      {reponse && (
        <div className={`card ${styles.reponse}`}>
          <p className={styles.synthese}>{reponse.synthese}</p>
          {reponse.fichesPertinentes.length > 0 && (
            <ul className={styles.sources}>
              {reponse.fichesPertinentes.map((f) => (
                <li key={f.id}>
                  <span className="badge">{f.theme}</span> {f.titre}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
