# Consolidation v2 et référentiel par composants

Suivi interne du 19 octobre 2026. Ce dossier n’est pas publié dans le site et ne constitue pas une source scientifique.

La v2 décrit la méthode cible, y compris lorsqu’elle dépasse les capacités de Fruggr. Une hypothèse présente dans une illustration n’acquiert pas pour autant le statut de facteur validé.

| Lot | Réalisation | Suite distincte |
|---|---|---|
| Cohérence documentaire | Chaîne composants, configurations et allocation ; forfaits VM historiques écartés de la cible ; couverture des indicateurs ; statut du score ; conventions temporelles ; FR/EN | Enrichissement au fil des nouvelles preuves |
| Consolidation paramétrique | Fonctions partagées, registres versionnés, DDR5 cohérente, profils de terminaux dérivés, cas de référence et écarts reproductibles | Calibration indépendante des coefficients exploratoires |
| Open Data | Organisation cible, correspondances, compatibilité et étapes de migration documentées | Migration des fichiers, exports et consommateurs dans leurs dépôts |
| Convergence | Écarts du code local relevés et critères de validation définis | Évolutions Fruggr versionnées après qualification des modèles |

- [Changements numériques](./numeric-changes.md) et [résultats structurés](./numerical-changes.json).
- [Protocole de calibration](./calibration.md), [observations IA](./ai-measurements.json) et [confrontation reproductible](./ai-validation.json).
- [Migration Open Data](./open-data-migration.md).
- [Convergence Fruggr](./fruggr-convergence.md).
- [Résultats des vérifications](./validation.md).

Les profils matériels de l’IA restent dans un registre distinct : leur proxy GPU agrégé n’a pas la même frontière que le modèle de puce. Les fusionner sans inventaire produirait des omissions ou des doubles comptes.

## Vérification reproductible

Sous Node 20.19.5 : `yarn test:calculations`, `yarn test:models`, `yarn test:footnotes`, `yarn audit:docs`, `yarn test:versioning`, `yarn typecheck`, `yarn build`.

`node scripts/review-models.cjs --write` régénère les deux rapports numériques. Sans cette option, le script vérifie les calculs sans écrire de données. Les tests établissent une cohérence technique, pas la validité scientifique des paramètres.

La v1, les inputs et les dépôts Open Data et Fruggr ne sont pas modifiés par ce chantier. Aucune publication automatique.
