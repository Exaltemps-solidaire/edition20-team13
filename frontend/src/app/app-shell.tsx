"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useRole } from "./role-context";
import { personas } from "./personas-data";
import styles from "./app-shell.module.css";

export function AppShell({ children }: { children: ReactNode }) {
  const { persona, choisirPersona, changerDeRole } = useRole();

  if (!persona) {
    return (
      <div className={styles.selecteur}>
        <h1>Qui êtes-vous ?</h1>
        <p>Incarnez un rôle pour découvrir l&rsquo;application.</p>
        <div className={styles.personas}>
          {personas.map((p) => (
            <button
              key={p.id}
              className={`card ${styles.persona}`}
              onClick={() => choisirPersona(p.id)}
            >
              <span className={styles.avatar}>{p.nom[0]}</span>
              <span className={styles.personaTexte}>
                <strong>{p.nom}</strong>
                <span>{p.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.barre}>
        <nav className={styles.nav}>
          <Link href="/">Accueil</Link>
          {persona.role === "benevole" && <Link href="/formation">Ma formation</Link>}
          {persona.role === "representante" && <Link href="/representante">Bénévoles prêtes</Link>}
          <Link href="/recherche-avancee">Question libre</Link>
          <Link href="/apercu-discord">Aperçu Discord</Link>
        </nav>
        <div className={styles.qui}>
          <span>
            {persona.nom} · {persona.description}
          </span>
          <button className="btn btnSecondary" onClick={changerDeRole}>
            Changer de rôle
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
