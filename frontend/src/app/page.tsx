"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { fiches } from "./fiches-data";
import { filtrerFiches } from "./filtrer-fiches";

export default function Home() {
  const [motCle, setMotCle] = useState("");
  const resultats = filtrerFiches(fiches, motCle);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Fiches mémo ENDOmind</h1>
        <p className={styles.intro}>
          Retrouvez la réponse juste en 2 minutes, avec la formulation
          recommandée par l&rsquo;association.
        </p>
        <input
          className={styles.recherche}
          type="search"
          placeholder="Rechercher un mot-clé (ex. filière de soins)"
          value={motCle}
          onChange={(e) => setMotCle(e.target.value)}
        />
        {resultats.length === 0 ? (
          <p className={styles.aucunResultat}>
            Aucune fiche ne correspond à « {motCle} ».
          </p>
        ) : (
          <ul className={styles.liste}>
            {resultats.map((fiche) => (
              <li key={fiche.id} className={styles.fiche}>
                <span className={styles.theme}>{fiche.theme}</span>
                <h2>{fiche.titre}</h2>
                <p>{fiche.extrait}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
