# SCREENS.md — Les écrans, pour les rejouer en image

Ce fichier décrit chaque écran prévu dans [ITERATIONS.md](./ITERATIONS.md) de façon assez précise pour être **rejoué à l'identique** (mêmes données d'exemple, même état) et capturé en image.

❗️ Rappel : la génération d'image par IA n'est pas disponible sur cette machine (pas de route `task:image` en mode anthropic, voir `/srv/team13/CLAUDE.md`). La méthode de capture retenue ici est la **capture d'écran automatisée** (ex. Playwright, déjà dans le projet via `e2e/`), pas un générateur IA. Ce fichier sert de guide à cette capture, et reste réutilisable si une vraie génération d'image devient possible un jour (le contenu décrit est indépendant de la méthode).

Chaque écran est décrit avec : sa route, les données d'exemple à utiliser (toujours les mêmes, pour des captures reproductibles), les états à capturer, et des notes de capture (taille d'écran, sélecteur stable à viser).

---

## Accueil — liste des fiches mémo

- **Route** : `/`
- **Itération source** : 1 (écran + données en dur), 9 (ajoute la recherche)
- **Statut** : à construire (itération 1)
- **Personas** : tous
- **Objectif** : montrer la liste des fiches mémo disponibles.
- **Données d'exemple à utiliser** (fixes, pour des captures reproductibles) :
  1. « Filière de soins régionale » — thème *Parcours de soins*
  2. « Que répondre sur le diagnostic tardif ? » — thème *Information patiente*
  3. « Qui contacter en cas de question médicale ? » — thème *Limites du rôle bénévole*
- **États à capturer** :
  - Nominal : les 3 fiches visibles, sans recherche.
  - Recherche (itération 9) : champ rempli avec « filière de soins », une seule fiche en tête de liste.
  - Recherche sans résultat (itération 9) : mot-clé « xyz », message « aucune fiche trouvée ».
- **Notes de capture** : cibler le conteneur de liste (`data-testid="liste-fiches"` à poser dans le composant), viewport mobile (375×812) — l'usage principal est sur stand, au téléphone.

## Qui êtes-vous ?

- **Route** : `/qui-etes-vous` (affiché avant `/` tant qu'aucun rôle n'est choisi)
- **Itération source** : 2
- **Statut** : à construire
- **Personas** : aucun (c'est l'écran qui en choisit un)
- **Objectif** : choisir le rôle incarné pour la session.
- **Données d'exemple à utiliser** :
  1. « Camille, coordinatrice régionale » — rôle *bénévole sur le terrain*
  2. « Leïla, représentante ENDOmind » — rôle *représentante de l'association*
- **États à capturer** :
  - Nominal : la liste des deux personas, aucun sélectionné.
  - Rôle choisi : « Camille » sélectionnée, bouton de changement visible en haut.
- **Notes de capture** : viewport mobile (375×812).

## Fiche mémo (détail)

- **Route** : `/fiches/:id` (ex. `/fiches/filiere-de-soins-regionale`)
- **Itération source** : à venir (non encore planifiée en détail)
- **Statut** : à venir
- **Personas** : tous
- **Objectif** : afficher la réponse complète et la formulation recommandée par l'association pour une fiche.
- **Données d'exemple à utiliser** : la fiche « Filière de soins régionale » de l'accueil, avec sa réponse complète.
- **États à capturer** : nominal uniquement pour l'instant.
- **Notes de capture** : à préciser une fois l'itération détaillée.

## Ma formation — liste des modules

- **Route** : `/formation`
- **Itération source** : 6
- **Statut** : à construire
- **Personas** : bénévole sur le terrain (persona « Camille »)
- **Objectif** : voir les modules de formation et leur statut.
- **Données d'exemple à utiliser** :
  1. « Livret d'accueil bénévoles » — statut *fait*
  2. « Certification Guide Diag » — statut *à faire*
  3. « Certification Endo&Ados » — statut *à faire*
- **États à capturer** :
  - Nominal : les 3 modules avec leurs statuts mélangés (fait / à faire).
  - Tout validé : les 3 modules à *fait*, pour la capture qui précède la vue représentante.
- **Notes de capture** : viewport mobile (375×812).

## Quiz de validation d'un module

- **Route** : `/formation/:moduleId/quiz` (ex. `/formation/certification-guide-diag/quiz`)
- **Itération source** : 7
- **Statut** : à construire
- **Personas** : bénévole sur le terrain
- **Objectif** : répondre à un QCM de validation et voir le résultat.
- **Données d'exemple à utiliser** : 5 questions fixes du module « Certification Guide Diag », réponses correctes connues à l'avance pour rejouer le cas « 5/5 ».
- **États à capturer** :
  - En cours : question affichée, aucune réponse encore soumise.
  - Validé (5/5) : message de validation, module repassé à *fait*.
  - À refaire (score < 5) : score affiché, message invitant à refaire.
- **Notes de capture** : viewport mobile (375×812).

## Vue représentante — bénévoles à valider

- **Route** : `/representante`
- **Itération source** : 8
- **Statut** : à construire
- **Personas** : représentante de l'association (persona « Leïla »)
- **Objectif** : voir les bénévoles ayant terminé tous leurs modules, prêtes pour la visio de validation.
- **Données d'exemple à utiliser** :
  1. « Camille, coordinatrice régionale » — tous modules validés → apparaît dans la liste
  2. « Nina, nouvelle bénévole » — un module non validé → n'apparaît pas
- **États à capturer** :
  - Nominal : Camille dans la liste « à valider », Nina absente.
  - Liste vide : aucune bénévole prête (message clair, pas une liste vide muette).
- **Notes de capture** : viewport desktop (1280×800) — écran pensé pour une représentante au bureau, pas sur un stand.

## Question libre — réponse documentée

- **Route** : `/question`
- **Itération source** : à venir, **bloquée** tant que `OPENAI_API_KEY` n'est pas posée dans le shell qui démarre la plateforme (voir `/srv/team13/CLAUDE.md`, section Embeddings)
- **Statut** : hors périmètre de ce build
- **Personas** : tous
- **Objectif** : poser une question en langage naturel, obtenir une réponse sourcée sans avis médical.
- **Données d'exemple à utiliser** : non définies — écran non construit.
- **Notes de capture** : à écrire une fois l'itération débloquée et détaillée.

---

**À tenir à jour** : quand une itération change le contenu ou l'état d'un écran, mettre à jour l'entrée correspondante ici — c'est ce fichier que la capture rejoue, pas `ITERATIONS.md`.
