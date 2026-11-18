"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { personas, type Persona } from "./personas-data";

type RoleContextValue = {
  persona: Persona | null;
  choisirPersona: (id: string) => void;
  changerDeRole: () => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona | null>(null);

  return (
    <RoleContext.Provider
      value={{
        persona,
        choisirPersona: (id) => setPersona(personas.find((p) => p.id === id) ?? null),
        changerDeRole: () => setPersona(null),
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole doit être utilisé à l'intérieur de RoleProvider");
  return ctx;
}
