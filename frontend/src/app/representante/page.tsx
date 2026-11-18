"use client";

import { useRole } from "../role-context";
import { useFormation } from "../formation/statut-context";
import { modules } from "../formation/formations-data";
import { benevolesPretes } from "../formation/benevoles-pretes";
import styles from "./page.module.css";

export default function VueRepresentante() {
  const { persona } = useRole();
  const { roster } = useFormation();

  if (!persona || persona.role !== "representante") {
    return (
      <div className={styles.page}>
        <p>Incarnez la représentante de l&rsquo;association (bouton « Changer de rôle » en haut) pour voir cet écran.</p>
      </div>
    );
  }

  const pretes = benevolesPretes(roster, modules);

  return (
    <div className={styles.page}>
      <h1>Bénévoles prêtes pour la visio de validation</h1>
      {pretes.length === 0 ? (
        <p>Aucune bénévole n&rsquo;a encore validé tous ses modules.</p>
      ) : (
        <ul className={styles.liste}>
          {pretes.map((b) => (
            <li key={b.id} className={`card ${styles.benevole}`}>
              {b.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
