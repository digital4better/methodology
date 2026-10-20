# Publier la v2 beta avec la v1

Le build produit les deux versions dans un seul artefact GitHub Pages. La v1 reste la version par défaut. La configuration est préparée localement ; elle ne signifie pas que la beta a déjà été publiée.

| Version | Français | Anglais |
|---|---|---|
| v1 | `/methodology/` | `/methodology/en/` |
| v2 beta | `/methodology/v2-beta/` | `/methodology/en/v2-beta/` |

Le sélecteur indique la version de la page affichée. Il conserve une page équivalente lorsqu’elle existe avec le même identifiant ; sinon, il rejoint l’accueil de la version choisie. L’entrée du site reste la v1.

## Préservation de la v1

Le contenu et les composants de calcul proviennent du commit de production `4e40ae8e5e792b676c55d5586f59e6fb3c7181b4`, dont le workflow de déploiement était réussi au 16 octobre 2026.

- `versioned_docs/version-v1` : contenu français et images.
- `i18n/en/docusaurus-plugin-content-docs/version-v1` : traduction et images.
- `src/v1` : composants et formatage figés, isolés des calculs beta.
- `versioned_sidebars` et `versions.json` : navigation native Docusaurus.

Le thème et la navigation sont partagés. Les seules réécritures dans le contenu figé concernent les imports, dirigés vers `src/v1`. `yarn test:versioning` vérifie la correspondance avec le commit d’origine. Une évolution volontaire de la v1 demande une nouvelle référence de production documentée.

## Vérifier avant publication

Avec Node 20.19.5 et Yarn 1 :

```sh
yarn --frozen-lockfile
yarn typecheck
yarn test:calculations
yarn test:versioning
yarn audit:docs
yarn build
python3 scripts/audit-built-site.py
```

Le contrôle de version exige l’historique Git contenant le commit de référence. Le workflow utilise `fetch-depth: 0`.

Servir le build et vérifier le sélecteur, les deux langues, les sept simulateurs, les profils de terminaux et un écran mobile. Les contrôles de calcul valident notamment les exemples publiés, les unités, les valeurs manquantes, les entrées nulles, le PUE et les six modalités IA. Ils ne constituent pas une calibration scientifique indépendante des modèles.

## Déploiement

La fusion de la branche de travail dans `main` déclenche le workflow `Documentation generation`. Celui-ci vérifie et construit les deux versions avant de publier l’artefact complet. Une relance manuelle est possible depuis `main`. Les pull requests sont vérifiées sans déploiement ; un lancement manuel depuis une autre branche ne remplace pas la production.

Après publication, vérifier les quatre routes du tableau et les anciennes routes v1, notamment `/methodology/ai`. Tester le sélecteur sur ordinateur et mobile. Confirmer le SHA du workflow déployé avant d’annoncer la mise en ligne.

## Retour arrière

Réexécuter le déploiement d’un commit validé antérieur, ou rétablir la configuration et le contenu par un commit de retour arrière. Les URL v1 restent inchangées dans le build à deux versions. Ne pas publier un artefact contenant seulement la beta à la racine du site.
