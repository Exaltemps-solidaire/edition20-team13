export type Persona = {
  id: string;
  nom: string;
  role: "benevole" | "representante";
  description: string;
};

export const personas: Persona[] = [
  {
    id: "camille",
    nom: "Camille",
    role: "benevole",
    description: "Coordinatrice régionale, bénévole sur le terrain",
  },
  {
    id: "morgane",
    nom: "Morgane",
    role: "representante",
    description: "Représentante de l'association",
  },
];
