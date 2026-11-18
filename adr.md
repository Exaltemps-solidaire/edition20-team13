# Architecture Decision Record (ADR)

Journal des décisions d'architecture prises pendant le hackathon (dépendance nouvelle, stockage, pattern structurant).

Une entrée par décision, ajoutée à la fin, au format :

```
### AAAA-MM-JJ — <titre court>

- **Décision** : ce qui a été choisi
- **Contexte** : le problème à résoudre
- **Alternatives envisagées** : les autres options, et pourquoi elles sont écartées
- **Conséquences** : les compromis acceptés
```

Le fichier est un journal : on ajoute, on ne réécrit pas. Pour revenir sur une décision, une nouvelle entrée le dit explicitement.

---

## Décisions

### 2026-11-18 — Extension de périmètre validée : bot Discord d'agrégation + formation des bénévoles

- **Décision** : ajouter au build deux pistes que le PRD v1 (`passation/cadrage/7-prd.md`) excluait explicitement — un bot Discord qui agrège des informations d'une source externe et les publie dans le canal dédié, et un parcours de formation/certification des bénévoles (modules, quiz, validation). Validé avec les cadreurs le 2026-11-18, confirmé par le développeur.
- **Contexte** : le PRD retenu excluait ces deux pistes (« Les notifications et le flux Discord », « L'administration des documents », « La montée en compétences dans la durée », « La gestion des certifications »). Les deux viennent de l'idée non retenue par la squad (« L'idée de Maestro »), pas de l'idée choisie. Le développeur a confirmé que ce n'est pas un oubli mais un pivot validé.
- **Alternatives envisagées** : rester strictement sur le PRD v1 (fiches + question documentée) ; n'ajouter qu'une seule des deux pistes pour limiter le risque. Écartées à la demande explicite du développeur.
- **Conséquences** : nouvelle dépendance (librairie client Discord), nouveau secret (jeton de bot Discord — jamais commité, posé en variable d'environnement), un service supplémentaire à déployer (pas de port à publier, le bot ne sert aucune route HTTP). L'URL exacte du site à agréger reste à préciser (❓, voir `ITERATIONS.md`). Le temps restant annoncé pour cette session (30 min, tour de test 2 min) ne permet pas de coder ces itérations maintenant : elles sont détaillées à l'avance dans `ITERATIONS.md` pour être prêtes dès qu'une fenêtre de build plus longue s'ouvre.
