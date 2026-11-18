# Déploiement — ENDOmind, fiches mémo

ENDOmind aide ses bénévoles à retrouver en 2 minutes la réponse juste sur un
stand, sans donner d'avis médical. Cette itération montre l'écran d'accueil
des fiches mémo, avec des données en dur.

## Services

- `frontend/` : export statique Next.js servi par nginx, port 80 dans le
  conteneur, publié sur **8080**. Sert l'écran unique (liste des fiches).
- `api/` : Node, port 8081 dans le conteneur, publié sur **8081**. Sert pour
  l'instant uniquement `/health` et `/sante` ; aucune route métier n'est
  encore appelée par le front (les fiches sont en dur côté front).

Le front est le service exposé pour la navigation ; l'API répond directement
sous `/api/` sur sa propre adresse publiée (voir le `CLAUDE.md` du serveur).

## Services externes appelés

Aucun à ce stade. Pas de base de données, pas de stockage d'objets, pas
d'appel au modèle d'IA : tout casse uniquement si le conteneur `frontend` ou
`api` ne démarre pas.

## Fragile / inachevé

- Les fiches mémo sont en dur dans `frontend/src/app/fiches-data.ts`, pas
  encore servies par l'API ni par une base de données.
- Pas de recherche par mot-clé, pas d'ouverture de fiche détaillée, pas de
  sélecteur de persona (reporté, voir `ITERATIONS.md`).

## Contacts

- Équipe (build) : Équipe 13.
- Association : pôle Vie bénévoles ENDOmind (coordonnées dans la passation,
  non reprises ici — voir `passation/contexte/association.md`, non commité).
