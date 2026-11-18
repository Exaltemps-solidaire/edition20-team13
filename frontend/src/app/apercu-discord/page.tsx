import styles from "./page.module.css";

export default function ApercuDiscord() {
  return (
    <div className={styles.page}>
      <h1>Aperçu du bot Discord (maquette)</h1>
      <p className={`card ${styles.avertissement}`}>
        ⚠️ Maquette statique pour le pitch, pas un écran connecté à un vrai serveur Discord :
        le bot n&rsquo;est pas encore codé (jeton Discord et URL du site source à agréger non
        fournis à ce stade). Ceci illustre le parcours prévu (itérations 3 à 5 de{" "}
        <code>ITERATIONS.md</code>).
      </p>

      <div className={styles.discord}>
        <div className={styles.sidebar}>
          <div className={styles.serveur}>ENDOmind</div>
          <div className={styles.canal}># fiches-memo</div>
          <div className={`${styles.canal} ${styles.canalActif}`}># formation-camille</div>
          <div className={styles.canal}># formateurs-benevoles</div>
        </div>

        <div className={styles.main}>
          <div className={styles.entete}># formation-camille</div>
          <div className={styles.messages}>
            <div className={styles.message}>
              <div className={`${styles.avatar} ${styles.avatarSysteme}`}>i</div>
              <div className={styles.corps}>
                <div className={styles.auteur}>
                  Système <span>aujourd&rsquo;hui</span>
                </div>
                <div className={styles.texte}>Camille a rejoint le serveur et ce canal a été créé pour son parcours de formation.</div>
              </div>
            </div>

            <div className={styles.message}>
              <div className={styles.avatar}>EB</div>
              <div className={styles.corps}>
                <div className={styles.auteur}>
                  ENDOmind Bot <span>aujourd&rsquo;hui</span>
                </div>
                <div className={styles.texte}>
                  Bienvenue Camille ! Voici ton parcours d&rsquo;auto-formation : 2 modules à valider
                  avant la visio avec une représentante.
                </div>
                <div className={styles.carte}>
                  📘 Module 1 — Accueil et écoute d&rsquo;une personne concernée
                  <br />
                  📘 Module 2 — Orienter vers la filière de soins et les ressources
                </div>
              </div>
            </div>

            <div className={styles.message}>
              <div className={styles.avatar}>EB</div>
              <div className={styles.corps}>
                <div className={styles.auteur}>
                  ENDOmind Bot <span>aujourd&rsquo;hui</span>
                </div>
                <div className={styles.texte}>
                  Camille vient de valider le module « Accueil et écoute ». Plus qu&rsquo;un module !
                </div>
              </div>
            </div>

            <div className={styles.message}>
              <div className={styles.avatar}>EB</div>
              <div className={styles.corps}>
                <div className={styles.auteur}>
                  ENDOmind Bot <span>aujourd&rsquo;hui</span>
                </div>
                <div className={styles.texte}>
                  @formatrices-benevoles Camille a validé tous ses modules, elle est prête pour la
                  visio de validation. 🎉
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
