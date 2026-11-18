"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type EntreeRoster = {
  id: string;
  nom: string;
  statuts: Record<string, boolean>;
};

const rosterInitial: EntreeRoster[] = [
  { id: "camille", nom: "Camille", statuts: {} },
  { id: "lea", nom: "Léa", statuts: { "accueil-ecoute": true, "orientation-ressources": true } },
  { id: "nadia", nom: "Nadia", statuts: { "accueil-ecoute": true, "orientation-ressources": false } },
];

type FormationContextValue = {
  roster: EntreeRoster[];
  validerModule: (personaId: string, moduleId: string, valide: boolean) => void;
};

const FormationContext = createContext<FormationContextValue | null>(null);

export function FormationProvider({ children }: { children: ReactNode }) {
  const [roster, setRoster] = useState<EntreeRoster[]>(rosterInitial);

  function validerModule(personaId: string, moduleId: string, valide: boolean) {
    setRoster((r) =>
      r.map((entree) =>
        entree.id === personaId
          ? { ...entree, statuts: { ...entree.statuts, [moduleId]: valide } }
          : entree,
      ),
    );
  }

  return (
    <FormationContext.Provider value={{ roster, validerModule }}>{children}</FormationContext.Provider>
  );
}

export function useFormation(): FormationContextValue {
  const ctx = useContext(FormationContext);
  if (!ctx) throw new Error("useFormation doit être utilisé à l'intérieur de FormationProvider");
  return ctx;
}
