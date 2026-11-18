# Plan d'itérations — ENDOmind (équipe JTW97B)

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation — `cadrage/2-idees-priorisees.md` et `passation.json` ne contiennent pas de plan chiffré).
- **Temps restant annoncé** : 30 minutes, à 2026-11-18 17:34.
- **Tour de test de l'équipe** : 2 minutes.
- **Capacité** : chaque itération coûte (codage ≤ 10 min) + publication (~5 min) + tour de test (2 min), soit 7 à 17 minutes. Avec 30 minutes, la marge est très faible : **une itération complète (codage 10 min) en consomme déjà 17, n'en laissant que 13 pour le reste**. Voir ⚠️ plus bas.
- **Reprioritisation du 2026-11-18** : le développeur a demandé de faire passer le bot Discord et la formation des bénévoles (validés avec les cadreurs, voir [adr.md](./adr.md)) devant le reste du cœur fiches/recherche. L'ordre ci-dessous en tient compte. Le sélecteur de persona, qui était en « à venir », est remonté en itération 2 : la formation (itération 6) et la vue représentante (itération 8) en dépendent.

## ✂️ Ce qui sort du périmètre de ce build

- **La question libre documentée (RAG)** : hors de portée dans ce temps, et de toute façon bloquée indépendamment du temps — ❗️ `OPENAI_API_KEY` n'est pas définie dans l'environnement de cette machine, et la route `task:embed` en dépend (voir `/srv/team13/CLAUDE.md`, section Embeddings). Sans cette clé posée dans le shell qui démarre la plateforme, toute tentative échouera en `401`. Je ne la code pas tant qu'elle n'est pas confirmée disponible.
- **La recherche par mot-clé dans les fiches** : reportée en itération 9 (voir plus bas), désormais après le bot Discord et la formation suite à la reprioritisation.

## ⚠️ Point d'attention sur le temps

Avec 30 minutes et un tour de test de 2 minutes seulement (valeur inhabituellement courte — à confirmer que ce n'est pas 20 min mal saisi), la capacité réelle est d'environ **1 itération pleine** pour cette session. Seule l'itération 1 ci-dessous est garantie de tenir dans le temps restant ; toutes les suivantes (y compris la 2, désormais detaillée) attendent une fenêtre de build plus longue, et seront reconfirmées avec le temps restant réellement demandé au début de chaque `/iteration`.

---

## Itération 1 : L'application est en ligne et montre l'accueil des fiches mémo ENDOmind

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` à la racine (le reste du squelette — Dockerfiles, `/health`, `/sante` — existe déjà dans `api/` et `frontend/`).
  - L'écran d'accueil du front (`frontend/src/app/page.tsx`) remplace le placeholder Next.js par la liste des fiches mémo ENDOmind, avec 3 à 4 fiches **en dur** (titre, thème, extrait de réponse) représentatives du scénario (ex. filière de soins régionale).
  - Pas d'appel à l'API pour cette itération : les données en dur suffisent à monter l'écran principal.
- **Hors périmètre** : sélecteur de persona, recherche, ouverture d'une fiche détaillée, appel API.
- **Critères d'acceptation** :
  - Étant donné l'URL publique de l'application, quand une personne l'ouvre, alors elle voit une liste de fiches mémo ENDOmind (pas le placeholder Next.js).
  - Étant donné l'application déployée, quand on vérifie `/health` et `/sante` sur le port 8080, alors les deux répondent 200.
  - Étant donné `scripts/verifier-deployabilite.sh`, quand on le lance, alors il ne signale aucune borne et les alarmes `.env.example`/`DEPLOIEMENT.md` ont disparu.
- **Hypothèse de l'équipe couverte** : aucune mesurable à ce stade (pas encore de recherche ni de chronométrage possible) — prépare le terrain pour l'itération qui mesurera les 2 minutes.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`, `frontend/src/app/fiches-data.ts` (données en dur).
- **Tests unitaires prévus** : aucun — pas de logique métier dans cette itération (balisage pur). Point 2 de la DoD à reconfirmer en DoR de l'itération 1.
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir l'URL publique, vérifier que la liste de fiches est visible.
- **Bilan** : Codage réel ~8 min (dépassement non négligeable, poursuivi sur demande explicite du développeur : « osef, lance » puis consigne de ne plus s'arrêter sur les paliers de routine). Les 3 critères d'acceptation sont satisfaits (vérifié en local : `curl localhost:8080/` montre les fiches, `/health` et `/sante` répondent 200 sur 8080, `verifier-deployabilite.sh` ne signale plus rien). Démarrage de la plateforme bloqué ~15 min par un rate-limit Docker Hub anonyme (images `registry`, `pgvector`, `seaweedfs`) ; débloqué par une connexion `podman login docker.io` avec le compte personnel du développeur. Pas de test unitaire (balisage pur, comme prévu).
  - **Modifications** : `.env.example` (créé, règle 2 du contrat) ; `DEPLOIEMENT.md` (créé, règle 8) ; `frontend/src/app/fiches-data.ts` (créé, 4 fiches en dur) ; `frontend/src/app/page.tsx` (remplace le placeholder Next.js par la liste de fiches) ; `frontend/src/app/page.module.css` (styles de la liste) ; `frontend/src/app/layout.tsx` (titre/description) ; `api/Dockerfile`, `frontend/Dockerfile` (images de base qualifiées `docker.io/library/...`, exigé par le `CLAUDE.md` du serveur) ; `/srv/team13/app/podman-compose.yml` (créé, recette de déploiement du serveur).

## Itération 2 : Le sélecteur de rôle « Qui êtes-vous ? »

- **Dans le périmètre** : l'écran d'ouverture qui demande d'incarner un rôle avant tout autre écran, une liste de personas d'exemple avec nom + rôle (au moins « la bénévole sur le terrain », ex. une coordinatrice régionale, et « la représentante de l'association », nécessaire pour l'itération 8), un bouton en haut d'écran pour changer de rôle à tout moment.
- **Hors périmètre** : connexion réelle, mot de passe, persistance du rôle entre deux sessions (pas de compte, conforme au PRD : « ne codez ni connexion, ni création de comptes, ni mot de passe »).
- **Critères d'acceptation** :
  - Étant donné l'ouverture de l'application, quand aucun rôle n'a encore été choisi, alors l'écran « Qui êtes-vous ? » s'affiche avant tout autre écran.
  - Étant donné un rôle déjà choisi, quand on clique le bouton de changement de rôle, alors on peut en choisir un autre à tout moment.
- **Hypothèse de l'équipe couverte** : aucune hypothèse mesurée spécifique ; débloque les itérations suivantes (formation, vue représentante) qui en dépendent.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : écran de sélection de rôle, état du rôle courant (contexte/store), bouton de changement de rôle (~4 fichiers).
- **Tests unitaires prévus** : aucun — sélection pure, pas de règle métier à ce stade.
- **Étapes ajoutées à la démo** : ouvrir l'app, choisir un rôle, vérifier que le bouton de changement fonctionne.
- ❗️ Le rôle « représentante de l'association » n'existe pas dans le scénario du PRD d'origine (qui ne nomme que « la bénévole sur le terrain » et « la personne rencontrée »). Il est ajouté ici en conséquence directe de l'extension validée (formation + vue représentante, itérations 6 et 8).
- **Bilan** : _à remplir en fin d'itération_

## Itération 3 : Le bot Discord se connecte et poste un message de test dans le canal dédié

- **Dans le périmètre** : un service bot séparé (nouveau dossier, nouveau conteneur sans port publié), connexion au serveur Discord avec un jeton lu en variable d'environnement, publication d'un message fixe dans le canal des fiches mémo pour valider la connectivité.
- **Hors périmètre** : scraping du site source, agrégation, mise à jour automatique des fiches (itérations 4 et 5).
- **Critères d'acceptation** :
  - Étant donné le bot démarré avec un jeton valide, quand il se connecte, alors un message de test apparaît dans le canal dédié.
  - Étant donné l'absence du jeton en variable d'environnement, quand le bot démarre, alors il échoue clairement au démarrage (pas d'échec silencieux).
- **Hypothèse de l'équipe couverte** : aucune — pose l'infrastructure pour les itérations suivantes.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `bot/` (point d'entrée), `bot/Dockerfile`, entrée `bot` dans `podman-compose.yml`, `.env.example` complété avec `DISCORD_BOT_TOKEN`.
- **Tests unitaires prévus** : aucun — connectivité pure, pas de logique métier.
- **Étapes ajoutées à la démo** : aucune — le canal Discord est hors navigateur, hors de `e2e/demo.spec.ts`.
- ❗️ **Nouvelle dépendance** : librairie client Discord (ex. `discord.js`). **Nouveau secret** : jeton de bot Discord — jamais commité, à poser en variable d'environnement (voir le contrat de déployabilité pour l'emplacement attendu).
- ❓ Qui fournit le jeton et quel serveur/canal Discord cibler (celui de l'association, ou un serveur de test pour la démo) ?
- **Bilan** : _à remplir en fin d'itération_

## Itération 4 : Le bot récupère et agrège les informations du site source

- **Dans le périmètre** : un module qui va chercher le contenu du site source et l'agrège en une liste de fiches structurées (titre, thème, extrait de réponse).
- **Hors périmètre** : publication sur Discord (itération 5), relecture humaine du contenu agrégé.
- **Critères d'acceptation** :
  - Étant donné l'URL du site source, quand le module s'exécute, alors il produit une liste de fiches structurées sans erreur.
  - Étant donné une page introuvable côté source, quand le module s'exécute, alors il le signale sans planter le bot.
- **Hypothèse de l'équipe couverte** : aucune directement — prépare la donnée qui alimentera la même hypothèse que les fiches (retrouver la réponse juste en moins de 2 minutes), désormais disponible aussi via Discord.
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `bot/scraper`, `bot/agregation`, test associé (~3 fichiers).
- **Tests unitaires prévus** : 1 à 2, sur la fonction d'agrégation (regroupement/déduplication des fiches extraites), avec des données mockées — pas d'appel réseau dans le test.
- **Étapes ajoutées à la démo** : aucune.
- ❓ **Bloquant pour coder cette itération** : quelle est l'URL exacte du « site évoqué » ? La seule mention dans la passation est « le site sous Wix » de l'association (`contexte/association.md`, ligne 43), citée comme un outil dispersé parmi d'autres — pas une source nommée avec une URL. À confirmer avec les cadreurs avant de lancer cette itération.
- **Bilan** : _à remplir en fin d'itération_

## Itération 5 : Le bot publie et met à jour les fiches agrégées sur Discord

- **Dans le périmètre** : le bot poste les fiches de l'itération 4 dans le canal dédié ; une fiche déjà publiée est modifiée en place plutôt que republiée (respecte « sans flux de messages parasite »).
- **Hors périmètre** : édition manuelle depuis Discord, planification récurrente (cron) — à ajouter plus tard si besoin.
- **Critères d'acceptation** :
  - Étant donné une liste de fiches agrégées, quand le bot s'exécute, alors chaque fiche apparaît comme message unique dans le canal dédié.
  - Étant donné une fiche déjà publiée et changée côté source, quand le bot ré-exécute, alors le message existant est modifié plutôt que dupliqué.
- **Hypothèse de l'équipe couverte** : « une bénévole retrouve la réponse juste en moins de 2 minutes » — vraie aussi depuis Discord, pas seulement depuis l'application.
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `bot/publier`, réutilise `bot/agregation`.
- **Tests unitaires prévus** : 1, sur la détection « fiche déjà publiée → mise à jour » vs « nouvelle fiche → publication ».
- **Étapes ajoutées à la démo** : aucune.
- ❗️ Aucun filtrage automatique du contenu agrégé contre l'avis médical dans cette itération : la règle de l'association (« pas d'avis médical ») impose une relecture humaine avant mise en prod, à faire par le pôle Vie bénévoles — pas une vérification codée ici.
- **Bilan** : _à remplir en fin d'itération_

## Itération 6 : Écran « Ma formation » — liste des modules avec statut

- **Dans le périmètre** : un nouvel écran qui liste les modules de formation (données en dur, titres repris de `documents-association/formations-et-contenus-existants.pdf`) avec un statut par bénévole (à faire / fait).
- **Hors périmètre** : contenu détaillé d'un module, quiz (itération 7).
- **Critères d'acceptation** :
  - Étant donné une bénévole incarnée via le sélecteur de rôle (itération 2), quand elle ouvre « Ma formation », alors elle voit la liste des modules avec son statut.
- **Hypothèse de l'équipe couverte** : aucune — `cadrage/5-hypotheses.md` ne porte que sur les fiches mémo ; aucune hypothèse mesurée n'existe pour la formation. ❓ à signaler aux cadreurs si une mesure doit être ajoutée pour ce nouveau périmètre.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : écran front dédié, fichier de données des modules en dur (~3 fichiers).
- **Tests unitaires prévus** : aucun — affichage pur, pas de logique métier.
- **Étapes ajoutées à la démo** : ouvrir « Ma formation », vérifier que la liste des modules s'affiche.
- Dépend de l'itération 2 (sélecteur de rôle), désormais positionnée avant — plus de blocage de séquencement.
- **Bilan** : _à remplir en fin d'itération_

## Itération 7 : Quiz de validation d'un module de formation

- **Dans le périmètre** : un quiz (QCM en dur) à la fin d'un module, calcul du score, module validé si 5/5.
- **Hors périmètre** : banque de questions dynamique, plusieurs tentatives avec délai d'attente.
- **Critères d'acceptation** :
  - Étant donné un quiz répondu entièrement juste, quand il est soumis, alors le module passe au statut « validé ».
  - Étant donné une réponse fausse, quand le quiz est soumis, alors le module reste « à refaire » et le score s'affiche.
- **Hypothèse de l'équipe couverte** : aucune (pas d'hypothèse mesurée dans la passation pour la formation).
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : composant quiz, fonction de notation + son test (~3 fichiers).
- **Tests unitaires prévus** : 1 à 2, sur la fonction de notation (calcul du score, seuil de validation à 5/5).
- **Étapes ajoutées à la démo** : répondre correctement à un quiz, vérifier le passage au statut « validé ».
- **Bilan** : _à remplir en fin d'itération_

## Itération 8 : Les représentantes voient les bénévoles prêtes pour la visio de validation

- **Dans le périmètre** : quand tous les modules d'une bénévole sont validés, elle apparaît dans une liste « à valider » visible par la représentante (rôle introduit en itération 2). Pas de notification push/email réelle dans cette itération.
- **Hors périmètre** : organisation réelle de la visio, emailing, notification push.
- **Critères d'acceptation** :
  - Étant donné une bénévole ayant validé tous ses modules, quand une représentante ouvre son écran, alors cette bénévole apparaît dans la liste « à valider ».
  - Étant donné une bénévole avec au moins un module non validé, quand la représentante ouvre son écran, alors elle n'apparaît pas dans cette liste.
- **Hypothèse de l'équipe couverte** : aucune.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : écran représentante, fonction de filtrage + son test (~3 fichiers).
- **Tests unitaires prévus** : 1, sur le filtrage « tous les modules validés ».
- **Étapes ajoutées à la démo** : parcours complet persona → formation → vue représentante, une fois ces écrans en place.
- ❓ Le canal de notification réel (email, Discord, autre) n'est pas précisé dans la passation — à trancher avec les cadreurs avant d'aller au-delà de l'indicateur visuel.
- **Bilan** : _à remplir en fin d'itération_

## Itération 9 : La bénévole retrouve une fiche par mot-clé

- **Dans le périmètre** : un champ de recherche sur l'accueil qui filtre les fiches en dur par mot-clé (titre/thème), tri simple, résultat affiché sans rechargement.
- **Hors périmètre** : fiche détaillée cliquable.
- **Critères d'acceptation** :
  - Étant donné la liste de fiches, quand on tape « filière de soins », alors la fiche correspondante apparaît en tête de liste.
  - Étant donné un mot-clé sans résultat, quand on le tape, alors un message clair l'indique (pas de liste vide muette).
- **Hypothèse de l'équipe couverte** : « une bénévole retrouve la réponse juste en moins de 2 minutes » — première mesure possible (temps pour taper le mot-clé et voir la fiche remonter).
- **Codage estimé** : 5 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : 1 à 2, sur la fonction de filtrage (logique métier : correspondance mot-clé → fiche).
- **Étapes ajoutées à la démo** : taper un mot-clé, vérifier que la fiche attendue remonte.
- ⚠️ Cette itération portait l'hypothèse centrale de la passation (« retrouver la réponse en 2 minutes ») ; elle est désormais mesurée en neuvième position suite à la reprioritisation du développeur, après le bot Discord et la formation.
- **Bilan** : Codée et déployée avant que la reprioritisation ci-dessus (qui la renumérote en itération 9) n'apparaisse sur le disque — une autre session travaillait sur ce même dépôt en parallèle pendant le déploiement de l'itération 1. Les 2 critères d'acceptation sont satisfaits (vérifié en local sur le conteneur déployé). 2 tests unitaires sur `filtrerFiches` (mot-clé correspondant → fiche en tête ; mot-clé sans résultat → liste vide), `npm test` passe.
  - **Modifications** : `frontend/src/app/filtrer-fiches.ts` (créé, fonction pure de filtrage) ; `frontend/src/app/filtrer-fiches.test.ts` (créé, 2 tests) ; `frontend/src/app/page.tsx` (champ de recherche, composant client, message « aucun résultat ») ; `frontend/src/app/page.module.css` (styles du champ et du message).

## À venir (à détailler au fil de l'eau, selon le temps restant confirmé à chaque itération)

1. Ouverture d'une fiche mémo (écran dédié avec réponse complète et formulation recommandée).
2. Déplacement des fiches en dur vers l'API (`GET /api/v1/fiches`), pour préparer une vraie source de données.
3. Question libre documentée (RAG) — **bloquée tant que `OPENAI_API_KEY` n'est pas posée dans le shell qui démarre la plateforme**.

---

**Développeur : valide ce plan avec les cadreurs avant `/iteration 1`.** Je m'arrête ici — je n'ai rien codé.
