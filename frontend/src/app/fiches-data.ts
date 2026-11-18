// Données en dur pour l'itération 1 : 3-4 fiches représentatives du scénario de la passation
// (coordinatrice sur un stand, question sur la filière de soins régionale). Seront remplacées
// par un appel à l'API dans une itération ultérieure (voir ITERATIONS.md, "À venir").

export type Fiche = {
  id: string;
  titre: string;
  theme: string;
  extrait: string;
};

export const fiches: Fiche[] = [
  {
    id: "filiere-soins-regionale",
    titre: "Filière de soins régionale",
    theme: "Orientation",
    extrait:
      "Orientez vers le centre de référence endométriose le plus proche, sans citer de praticien en particulier : la liste à jour est tenue par le pôle Vie bénévoles.",
  },
  {
    id: "demande-avis-medical",
    titre: "Une personne demande un avis médical",
    theme: "Questions délicates",
    extrait:
      "ENDOmind n'émet jamais d'avis médical. Formulation recommandée : « Je ne peux pas me prononcer sur votre cas, mais je peux vous orienter vers un professionnel. »",
  },
  {
    id: "autres-associations",
    titre: "Que dire des autres associations ?",
    theme: "Questions délicates",
    extrait:
      "Rester factuelle et bienveillante : ENDOmind ne se positionne pas contre une autre association. Rediriger vers la mission propre à ENDOmind si la question insiste.",
  },
  {
    id: "annuaire-medecins",
    titre: "Annuaire des médecins partenaires",
    theme: "Ressources",
    extrait:
      "L'annuaire est mis à jour par le pôle Vie bénévoles. Ne pas en donner de copie figée : renvoyer vers la fiche à jour, pas vers un export imprimé.",
  },
];
