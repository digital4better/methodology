# Revue avant publication — 20 octobre 2026

## Avis

Publication recommandée comme **v2 bêta**, en parallèle de la v1 conservée par défaut. Aucun blocage technique identifié après les corrections ci-dessous. Cet avis porte sur le contenu local contrôlé ; aucune publication, validation CI distante ou vérification du futur site déployé n’a été effectuée.

La cohérence des calculs ne vaut pas calibration scientifique. Les coefficients exploratoires, les approximations matérielles et les limites du modèle IA restent explicitement documentés. Une qualification de version scientifiquement validée demanderait le travail décrit dans `calibration.md`.

## Corrections réalisées pendant cette revue

- Cinq URL de sources (cloud et réseau, FR/EN) pointaient vers la révision locale non publiée `e0335adf`. Elles utilisent maintenant la révision publique `77cae4a58fadd5deb3b8d4e5577020da08f780d8`. Les cinq pages répondent HTTP 200. Les distances citées ES–DE (1 615,380 km), ES (401,311 km) et DE (337,254 km), ainsi que le calcul au rayon terrestre de 6 371 km, sont présents dans cette source publique. Le fichier de facteurs renouvelables est également accessible.
- Le registre des hypothèses renvoie à la convention cloud pour la part renouvelable au lieu de présenter le mix moyen comme une règle sans exception.
- Une cellule HDD vide, remplacée par un point-virgule, est renseignée ; cinq titres du glossaire anglais retrouvent une ponctuation normale, sans changer leurs ancres.
- L’unité mémoire du démonstrateur cloud affichait `Go.h.h` en français : la sélection de l’unité traduite est corrigée. Le rendu est vérifié en FR (`Go.h`) et EN (`GB.h`).
- Le workflow ajoute les contrôles existants des modèles et des notes de bas de page avant publication.

## Vérifications finales

| Contrôle | Résultat |
|---|---|
| Build FR/EN avec Node 20.19.5 | Réussi |
| Typage TypeScript | Réussi |
| Tests des calculs | Réussis |
| Tests des modèles | Réussis ; calibration explicitement non établie |
| Couverture documentaire | 41/41 pages FR/EN ; ce contrôle de présence ne certifie pas la fidélité intégrale des traductions |
| Préservation v1 | 37 fichiers identiques à la référence déployée `4e40ae8e5e792b676c55d5586f59e6fb3c7181b4` |
| Site compilé | 110 pages, 6 930 liens locaux contrôlés, aucune erreur de lien, ancre ou formule détectée |
| Notes de bas de page | 82 pages, 395 appels, aucune erreur |
| Navigateur mobile | 82 routes v2 FR/EN chargées à 390 px, sans débordement horizontal global, image cassée détectée ni erreur KaTeX |
| Interactions | Les six exemples de scénarios et l’exemple IA réagissent aux changements de paramètres et reviennent au résultat initial |
| Navigation | Passage FR → EN sur la page IA, puis v2 → v1 avec repli sur l’accueil v1 ; appel et retour d’une note cloud vérifiés |
| Revue visuelle ciblée | Accueil sombre sur ordinateur/mobile et arbre cloud clair sur mobile lisibles |
| Hygiène du diff | `git diff --check` réussi |

Les tests d’interaction sont des essais ciblés, pas une exploration exhaustive de toutes les combinaisons de paramètres. La vérification mobile automatisée n’est pas un audit complet d’accessibilité.

## Sources externes

92 URL externes extraites des liens Markdown FR ont été contrôlées. Après correction des cinq références et nouvelle tentative en GET, 89 répondent HTTP 200. Trois sources refusent les requêtes automatisées (HTTP 403 : DOI Wiley, UNECE et ScienceDirect) ; leur accessibilité n’est donc pas confirmée par ce contrôle, et elles ne sont pas considérées comme des liens cassés prouvés. Les liens présents uniquement dans des composants ou en anglais ne sont pas couverts par ce décompte.

## Au moment de publier

Suivre `RELEASING.md` : faire passer la CI sur le commit retenu, publier l’artefact des deux versions, puis vérifier les routes publiques v1/v2 et FR/EN sur le SHA effectivement déployé. Les modifications locales préexistantes sont conservées ; aucun commit, push ni déploiement n’a été réalisé pendant cette revue.
