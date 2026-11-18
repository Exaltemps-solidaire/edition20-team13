export type Question = {
  id: string;
  enonce: string;
  options: string[];
  bonneReponse: number;
};

export type Module = {
  id: string;
  titre: string;
  questions: Question[];
};

export const modules: Module[] = [
  {
    id: "accueil-ecoute",
    titre: "Accueil et écoute d'une personne concernée",
    questions: [
      {
        id: "q1",
        enonce: "Une personne vous confie son parcours. Votre première posture ?",
        options: ["L'écouter sans juger", "Lui donner votre avis sur son traitement", "Changer de sujet"],
        bonneReponse: 0,
      },
      {
        id: "q2",
        enonce: "Ce qui est confié par une personne concernée doit rester...",
        options: ["Partagé sur les réseaux de l'association", "Confidentiel", "Public dans le canal Discord"],
        bonneReponse: 1,
      },
      {
        id: "q3",
        enonce: "Une bénévole peut-elle donner un avis médical ?",
        options: ["Oui, si elle a lu des fiches", "Non, jamais", "Oui, en cas d'urgence seulement"],
        bonneReponse: 1,
      },
      {
        id: "q4",
        enonce: "Face à une question délicate sans réponse en fiche, la bonne réaction est...",
        options: [
          "Inventer une réponse plausible",
          "Orienter vers une formatrice bénévole ou un professionnel",
          "Ignorer la question",
        ],
        bonneReponse: 1,
      },
      {
        id: "q5",
        enonce: "L'écoute active, c'est avant tout...",
        options: ["Reformuler pour montrer qu'on a compris", "Couper la parole", "Proposer un diagnostic"],
        bonneReponse: 0,
      },
    ],
  },
  {
    id: "orientation-ressources",
    titre: "Orienter vers la filière de soins et les ressources",
    questions: [
      {
        id: "q1",
        enonce: "Une personne cherche un spécialiste près de chez elle. Vous...",
        options: [
          "Recommandez un médecin précis de mémoire",
          "L'orientez vers la filière de soins régionale",
          "Dites qu'il n'y a pas de solution",
        ],
        bonneReponse: 1,
      },
      {
        id: "q2",
        enonce: "Pour une demande d'avis médical précis, la bonne pratique est...",
        options: [
          "Répondre avec une fiche mémo générale",
          "Rediriger vers un professionnel de santé",
          "Deviner la réponse",
        ],
        bonneReponse: 1,
      },
      {
        id: "q3",
        enonce: "Une personne mentionne une autre association pouvant l'aider. Vous...",
        options: [
          "Ignorez, ce n'est pas votre rôle",
          "Vérifiez la fiche dédiée et orientez si pertinent",
          "Dites que les autres associations ne sont pas fiables",
        ],
        bonneReponse: 1,
      },
      {
        id: "q4",
        enonce: "L'annuaire des médecins sert à...",
        options: [
          "Donner un avis médical à la place d'un médecin",
          "Aider à trouver un praticien adapté",
          "Remplacer la filière de soins régionale",
        ],
        bonneReponse: 1,
      },
      {
        id: "q5",
        enonce: "Si aucune fiche ne couvre la question posée, vous...",
        options: [
          "Improvisez une réponse",
          "Signalez le manque à l'association",
          "Supprimez la question",
        ],
        bonneReponse: 1,
      },
    ],
  },
];
