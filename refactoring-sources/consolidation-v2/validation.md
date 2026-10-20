# Vérifications du lot de consolidation

Vérifications locales du 19 octobre 2026, Node 20.19.5, build servi sur le port 3016.

| Contrôle | Résultat |
|---|---|
| Calculs et scénarios | `yarn test:calculations` passe : unités, allocations, frontières, données manquantes, profils et IA/médias/caches |
| Modèles partagés | `yarn test:models` passe : égalité composants/assemblages, résultats finis, deltas et contre-exemples IA |
| Notes | 82 pages FR/EN, 348 appels, aucune anomalie signalée |
| Documentation | 41 pages canoniques traduites sur 41 ; les présences ne prouvent pas à elles seules la fidélité scientifique |
| Liens locaux après compilation | 82 pages v2 contrôlées ; aucune page cible ou ancre manquante |
| Anciennes ancres | Anciennes ancres de titres conservées, avec alias lorsque le contenu a été réorganisé |
| Typage et compilation | `yarn typecheck` et build complet FR/EN passent |
| v1 et inputs | Contrôle de versionnement réussi ; 85 fichiers protégés identiques au début de ce lot |
| Diff | `git diff --check` passe |

## Contrôles dans le navigateur

Les pages web, mémoire, serveurs et IA ont été contrôlées à 390 px en français et en anglais : aucun débordement horizontal de la page ; champs visibles nommés ; aucune saisie de texte libre dans les illustrations vérifiées.

Les notes web fonctionnent dans les deux sens. Les libellés de retour sont « Retour à l’appel de note 1 » en français et « Back to reference 1 » en anglais. Les liens du composant vers la modélisation d’un équipement conservent langue et version.

Le nouvel exemple structurel a été vérifié sur ordinateur et mobile, en thèmes clair et sombre. La flèche droite au clavier passe le résiduel de 8 à 9 kg, actualise le résultat à 149 kg et conserve le focus visible. La note explicative reste sous la carte.

Le formulaire mémoire réglé sur 16 modules DDR5 de 32 Go restitue 266,18 kg CO₂e/an sur cinq ans. Le serveur avec 512 Go DDR5 affiche le même total de fabrication RAM, arrondi à 1,33 t. Le web par défaut affiche 31,28 kg CO₂e et signale le réseau non évalué.

## Limites de ces contrôles

Il s’agit d’une validation technique et d’un échantillonnage visuel, pas d’un audit exhaustif d’accessibilité ni d’une calibration scientifique. Les liens externes ne sont pas tous retestés par le contrôle des liens locaux. Les modèles exploratoires restent signalés comme tels. Aucun déploiement ni changement dans les dépôts Fruggr ou Open Data n’est réalisé.
