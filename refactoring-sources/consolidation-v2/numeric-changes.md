# Changements numériques des illustrations

Version : `d4b-components-illustration-2026.10.19`. Les valeurs ci-dessous décrivent des scénarios pédagogiques, pas des mesures ni une calibration.

## Correction de la DDR5

La page Mémoire vive appliquait déjà un packaging DDR5 de 1,1. Les assemblages ne l’appliquaient pas. Le modèle partagé conserve cette convention et l’utilise partout :

`modules × ((capacité par module / densité) × 2,20 + 5,22) × packaging`

| Cas | Avant, kg CO₂e | Après, kg CO₂e | Nature |
|---|---:|---:|---|
| 16 modules DDR5 de 32 Go | 1 209,920 | 1 330,912 | Application uniforme de 1,1 |
| 1 module DDR5 de 16 Go | 40,420 | 44,462 | Même correction |
| Laptop complet de l’exemple | 144,219 | 148,261 | Seule la RAM change |

Le multiplicateur reste exploratoire. Son uniformisation n’est pas une preuve de sa valeur physique. CPU, stockage, écran, batterie et résiduel conservent leurs coefficients.

## Remplacement des profils de terminaux

Les exemples web, mail et application native utilisent désormais des profils calculés à partir des configurations illustratives. Ils n’utilisent plus les forfaits du fichier historique `src/data/terminal-profiles.json`, conservé pour la comparaison.

La puissance provient de 50 % du TDP CPU, de l’écran et d’un auxiliaire de 2 W. La fabrication est la somme des composants, allouée sur `durée de vie × 8 760 × 3 600` secondes. Les mélanges sont des hypothèses d’exercice : 60 % portable et 40 % fixe pour l’ordinateur ; 95 % smartphone et 5 % tablette pour le mobile, pondérés par le temps d’usage. Ils ne décrivent pas une audience observée.

| Exemple par défaut, facteurs France inchangés | Avant, kg CO₂e | Après, kg CO₂e |
|---|---:|---:|
| Web | 34,5915 | 31,2842 |
| Mail | 24,1412 | 24,0155 |
| Application native | 25,6652 | 25,5592 |

Ces sommes couvrent les postes de l’illustration, pas une ACV exhaustive. Le rapport JSON détaille puissances, fabrication, contributions et paramètres. La baisse n’est pas revendiquée comme un gain environnemental : elle résulte d’un changement de modèle et de scénario.

## Conventions et absence de changement

- Les profils de service conservent l’année conventionnelle de 8 760 heures. Les exemples de composants et l’IA utilisent 365,25 jours. Cette différence préexistante reste explicite ; son harmonisation devra être versionnée séparément.
- Les facteurs électriques, les facteurs réseau et les formules IA ne changent pas.
- Le registre IA est extrait du code sans modification des valeurs. Le proxy agrégé GPU ne s’additionne pas au modèle puce + mémoire.
- Le score agrégé reste une proposition historique non validée et désactivée pour cette version.
- Aucun résultat historique n’est réécrit dans Open Data ou Fruggr.

## Critères de non-régression

La RAM et le stockage d’un assemblage donnent le même résultat que leurs modules ou disques évalués séparément. Une VM répartit un impact physique sans ajouter un équipement. Les pondérations des profils conservent leurs bornes et leurs contributions. Une absence de facteur reste un poste non évalué, distinct d’une activité réellement nulle.
