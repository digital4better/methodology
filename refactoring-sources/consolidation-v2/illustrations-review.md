# Revue des illustrations historiques

20 octobre 2026. Revue interne, non publiée dans la méthodologie.

Les trois images matricielles référencées par l’ancienne page Web ont été retrouvées dans la v1, dans les fichiers conservés de la v2 et dans la copie éditoriale du 16 octobre. Les copies de chaque image sont identiques par SHA-256. Leur introduction apparaît dans l’historique Git (`c9633c4`, puis `240a708`).

| Illustration | Intérêt pédagogique | Décision pour la v2 |
|---|---|---|
| `web.png` | Rend immédiatement visibles les contributions terminal, réseau et hébergement | Recréation vectorielle, en remplacement du graphe Mermaid équivalent dans Service web. La VM devient une part de ressources physiques ; les services tiers et la frontière sont explicites. |
| `network-operational-map.png` | Distingue livraison à l’utilisateur, CDN et trajet vers l’origine | Carte européenne redessinée avec barycentres, rayons équivalents et trajet réseau illustratif ; figure séparée pour les volumes avec CDN. |
| `impact-scores.png` | Décrit l’ancien passage des impacts à un score de site | Non réintroduit dans la v2 : sa présence laisserait croire que le score historique est validé. Image conservée dans la v1. |

## Carte retenue : légende compacte

La carte historique reliait pays utilisateur, pays traversé et pays d’hébergement. Un tel dessin peut faire confondre distance entre pays, trajet physique et géographie électrique. La v2 n’applique une distance qu’à un facteur dont l’unité et le modèle la demandent.

Après comparaison des propositions, la présentation « Légende compacte » est retenue. La carte continue montre l’Espagne, la France et l’Allemagne, avec les frontières issues de Natural Earth (1:110 millions, domaine public). Le trait bleu illustre le chemin physique entre équipements ; il ne représente pas un itinéraire mesuré. Les losanges corail sont les barycentres de référence ES et DE, reliés par la distance orthodromique.

La distance ESDE de 1 615,380 km et les rayons équivalents ES = 401,311 km et DE = 337,254 km sont vérifiés dans Open Data, révision `e0335ad`, et dans la dépendance installée du code Fruggr. Les valeurs affichées sont arrondies au kilomètre. Les cercles sont tracés à partir des rayons angulaires `r / 6371` sur la sphère, puis projetés en Mercator avec le fond géographique. Ils ne sont ni des frontières ni des zones de couverture réseau. La France traversée dans l’illustration ne crée pas un segment supplémentaire dans le calcul interpays.

Le second exemple traite séparément le cache : sur 200 Go livrés, 80 % des octets sont disponibles au CDN, donc 40 Go viennent de l’origine et 200 Go restent livrés aux terminaux. Ce n’est ni un taux de requêtes avec hit appliqué à des objets de tailles différentes, ni un résultat d’énergie. Le cache est déjà alimenté ; les requêtes et revalidations sont hors exemple.

## Présentation

La carte est rendue par `src/components/network-distance-map.tsx`, réexportée par `network-illustrations.tsx`. `src/data/network-map.json` contient les contours préprojetés, leurs métadonnées de provenance et les points de référence. La préparation utilise `d3-geo` 3.1.1 ; le rendu React ne nécessite ni bibliothèque cartographique supplémentaire ni requête externe. La transformation ajuste la géométrie à la largeur disponible ; les textes conservent leur taille. Les légendes restent en HTML. Le style reprend la palette commune, en clair et sombre.

Le schéma distance possède un titre et une description accessibles ; les icônes décoratives sont masquées aux technologies d’assistance. Les figures sont nommées par leur légende. Les trajets se distinguent aussi par leur trait, pas seulement leur couleur.

Les figures sont placées près des explications concernées. Les autres diagrammes actuels, notamment la vue en couches du cycle de vie, restent en place lorsqu’ils apportent déjà la même information. Aucun ajout de simulateur ni modification de calcul.

## Illustrations complémentaires intégrées

Les neuf propositions approuvées sont intégrées à la v2 en français et en anglais : cycle de vie d’une tâche RAG, MFU, carte accélératrice, double comptage, seconde vie, virtualisation, PUE, activités mobiles et données manquantes. La carte accélératrice conserve la représentation de la puce centrale entourée de mémoire. La simplification porte sur les annotations plutôt que sur cette composition.

`src/components/method-illustrations.tsx` et son module CSS assurent un rendu commun et responsive. Les schémas utilisent du texte HTML et des pictogrammes vectoriels décoratifs, sans téléchargement d’image ni bibliothèque supplémentaire. Chaque figure possède une légende accessible ; ses précisions restent sous la carte. Les exemples fictifs sont identifiés comme tels. Les valeurs ne sont pas des facteurs transmis aux calculateurs.

Les figures suivent les explications ou équations qu’elles illustrent. Le texte de l’exemple MFU est remplacé par sa représentation, en conservant les 400 TFLOP et les 10 secondes. Les autres hypothèses, sources, limitations et formules sont conservées. Aucune figure n’est ajoutée à la v1.

Les titres décrivent directement le sujet ou le mécanisme. Les constructions répétitives comme « Une durée passée, une durée attendue » sont remplacées par « Durée de vie retenue après reconditionnement ». Cette règle concerne les titres de pages, de sections et de figures de la v2 ; une énumération technique utile n’est pas supprimée au seul motif qu’elle contient une virgule. Les titres de l’allocation, du périmètre web et des volumes avec cache ont été corrigés, avec conservation des ancres.

| Page | Illustration | Apport et emplacement |
|---|---|---|
| Couches logicielles et virtualisation | Deux VM reliées aux ressources d’un même serveur | Après l’approche par ressources virtuelles ; rendre visible le partage physique sans imposer une clé identique au CPU, à la RAM et au stockage. |
| Datacenter | Barre de consommation IT et auxiliaires | Après l’équation du PUE ; reprendre l’exemple existant de 1 000 kWh IT et PUE 1,2, sans appliquer le PUE à la fabrication. |
| Applications natives | Installation, session et synchronisation en arrière-plan | Après la décomposition des activités ; illustrer un parcours mobile, sans assimiler la longueur des étapes à une énergie ou une durée. |
| Indicateurs environnementaux | Sous-total connu avec un poste non évalué | Après la règle de couverture ; exemple fictif explicitement identifié, sans transformer l’absence de facteur en zéro. |

### Remplacement de passages denses

Cinq illustrations supplémentaires approuvées sont intégrées en FR/EN dans le même composant : eau du datacenter, médias en entrée, conversion du facteur réseau par trajet, états de fonctionnement du parc et campagne mail.

Elles remplacent les exemples et explications redondants. Les équations, frontières, hypothèses et sources sont conservées. Le parcours multimédia reste un exemple composé, distinct d’un modèle audio-vidéo natif et de la capacité du simulateur actuel. Le facteur réseau fictif ne remplace pas la méthode par Go·km. Les puissances du terminal et les volumes de campagne sont explicitement pédagogiques.

Le paragraphe sur les auxiliaires et les unités des composants est placé près des équations de consommation du datacenter. Les limites de la virtualisation sont regroupées par sujet dans des paragraphes courts, sans accordéon.

Autres pistes non intégrées : distinguer volume logique et copies physiques dans le stockage cloud ; représenter le rendement d’un wafer sans coefficients universels. Ces pistes nécessitent encore une proposition visuelle. Les schémas de cycle de vie, réseau et cache déjà présents ne demandent pas un doublon.

## Vérification

- Typage, notes et versionnement : succès.
- Compilation complète FR/EN : succès.
- Illustrations complémentaires : 18 rendus présents sur les 16 pages FR/EN concernées, contrôlés à 1 440 et 320 px sans débordement des figures ni erreur JavaScript. Contrôle supplémentaire à 390 px ; contrastes des aplats ajustés dans le thème sombre. Les figures statiques n’ajoutent aucun arrêt dans la navigation au clavier.
- Calculs existants : tests réussis ; aucun facteur ou modèle numérique modifié.
- Deuxième lot : dix rendus supplémentaires FR/EN vérifiés à 1 440 et 320 px, sans débordement ni erreur JavaScript ; contrôle visuel du thème sombre. Compilation, typage, 361 appels de notes et préservation de la v1 vérifiés après intégration.
- Liens locaux des 82 pages v2 : aucune cible ou ancre manquante.
- Anciennes ancres de titres : préservées.
- Revue visuelle des nouvelles figures à 1 440 et 390 px, thèmes clair et sombre, français et anglais : texte lisible, mise en colonne sur mobile, aucun débordement de page observé.
- Images et documents v1 inchangés ; aucun déploiement.

## Relecture de la page IA du 20 octobre 2026

Les treize annotations sont reprises en FR/EN : paramètres actifs distincts des poids entraînables ou gelés, formules des médias visibles près de leurs profils, détails Qwen/Whisper réintégrés, portée des caches et allocation au repos reformulées sans description de réglages. Le futur calcul paramétrique du MFU est présenté comme un chantier à calibrer et valider.

Une quinzième illustration distingue un doublage en étapes séparées d’une génération vidéo conditionnée par une image. Les limites des architectures conjointes restent visibles sous la figure. Les mentions de MFU dans la page, l’illustration et l’exemple interactif renvoient au glossaire ; ces liens sont accessibles au clavier. Le glossaire distingue paramètres actifs, entraînables et gelés, et définit espace latent, codebook et diffusion.

Validation : compilation FR/EN, typage, calculs, 377 appels de notes sans anomalie et préservation des 37 fichiers v1. Navigation réelle au clavier vers le glossaire, avec et sans barre oblique finale, et aller-retour des nouvelles notes vérifiés. Rendus contrôlés à 1 440, 502 et 320 px en FR/EN, sans erreur KaTeX ou JavaScript. Le positionnement du MathML accessible est corrigé pour supprimer un débordement à 320 px, sans masquer les formules aux lecteurs d’écran. Les calculs et facteurs restent inchangés ; aucun déploiement.

## Périmètre applicatif et services tiers

Deux illustrations FR/EN remplacent les paragraphes d’agrégation et la liste des exemples de services tiers : impacts des parcours multipliés par les volumes, complétés sans double compte ; services inclus en trait plein et services sans contribution au scénario en pointillés. Les données manquantes restent dans le périmètre. Le texte sur les exclusions et l’arbre de décision sont alignés sur cette distinction. Les sept cas d’usage du tableau disposent de liens directs.

Compilation, typage, notes et préservation v1 validés. Contrôle des deux figures à 1 440, 546 et 320 px en FR/EN, thèmes clair et sombre, sans débordement de page ni erreur JavaScript. Les quatorze liens FR/EN vers les cas d’usage répondent correctement. Aucun calcul ni facteur modifié.
