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
            <button key={p.id} className={styles.persona} onClick={() => choisirPersona(p.id)}>
              <strong>{p.nom}</strong>
              <div>{p.description}</div>
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
        </nav>
        <div>
          {persona.nom} ({persona.description}){" "}
          <button onClick={changerDeRole}>Changer de rôle</button>
        </div>
      </div>
      {children}
    </>
  );
}
