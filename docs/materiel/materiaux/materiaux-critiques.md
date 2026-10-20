# Matériaux critiques

Les matériaux d’un équipement n’ont pas tous le même impact. Leur contribution dépend des quantités, des procédés de production et de l’indicateur retenu. La criticité décrit principalement un risque d’approvisionnement ; elle ne remplace pas une évaluation environnementale.

## Distinguer trois questions

| Question | Ce qu’elle renseigne | Ce qu’elle ne démontre pas |
|---|---|---|
| Quelle quantité est présente ? | L’inventaire physique du produit | Sa contribution aux impacts |
| Quels impacts produit sa chaîne de fabrication ? | Extraction, transformation et autres procédés inclus | Le risque de rupture d’approvisionnement |
| Le matériau est-il critique ? | Importance économique et risque d’approvisionnement | Un impact carbone ou hydrique élevé par définition |

La méthode européenne de criticité repose principalement sur l’importance économique et le risque d’approvisionnement. Concentration, substitution et recyclage interviennent dans cette analyse. Voir la Commission européenne[^ref-1].

## Relier les matériaux aux équipements

Le cuivre intervient notamment dans les circuits et le câblage, l’or dans certains contacts, et le lithium dans les batteries rechargeables concernées. Leur contribution environnementale dépend de la chaîne réellement représentée dans l’inventaire. Une faible masse peut contribuer fortement à un indicateur de ressources ; elle ne suffit pas à établir un pourcentage d’impact.[^ref-2]

Ex: comparer deux batteries demande leur capacité, leur chimie et des inventaires compatibles. Remplacer un matériau ne démontre pas à lui seul un gain global : masse, durée de vie et procédés peuvent également changer.

Les modèles [Batterie](../composants/alimentation-et-batterie), [Affichage](../composants/affichage) et [Éléments structurels](../composants/elements-structurels) relient ces questions aux composants. Un inventaire de métaux ne s’ajoute pas à un facteur d’équipement qui inclut déjà leur fabrication.

## Choisir les données utilisables

Une composition doit identifier le produit, la masse de chaque matériau, la forme chimique et les parties non décrites. Un facteur par kilogramme doit préciser les procédés, la part de matière secondaire et la règle d’allocation. Les anciennes compositions illustratives et plages de GWP non vérifiées ne servent pas de valeurs par défaut dans la v2.

L’ADPe décrit l’épuisement des ressources abiotiques selon une méthode de caractérisation. Les résultats dépendent fortement de cette méthode et de sa version. Un facteur appliqué à un flux d’extraction n’est pas l’empreinte d’un kilogramme de métal raffiné acheté.

### Comparer deux versions historiques de facteurs ADP

Les valeurs ci-dessous illustrent la sensibilité à la méthode. Elles ne constituent pas un catalogue de facteurs produit et ne doivent pas être mélangées dans une même évaluation.

| Matière | ADP (ILCD CF v1.0.10, août 2016) | ADP (ILCD CF EF-v2.0, mars 2019) | Unité | Lecture |
|---|---|---|---|---|
| **Indium** | 5,55E+02 | 6,89E-03 | kg Sb eq. / kg | Très sensible à la méthode |
| **Or** | 3,60E+01 | 5,20E+01 | kg Sb eq. / kg | Fort impact quelle que soit la méthode |
| **Argent** | 8,42E+00 | 1,18E+00 | kg Sb eq. / kg | Important dans les cartes électroniques |
| **Tantale** | 1,15E+01 | 4,06E-05 | kg Sb eq. / kg | Écart majeur entre méthodes |
| **Cobalt** | 2,56E-02 | 1,57E-05 | kg Sb eq. / kg | Pertinent pour les batteries |
| **Lithium** | 1,33E-02 | 1,15E-05 | kg Sb eq. / kg | À lire avec la chaîne batterie |
| **Cuivre** | 2,50E-03 | 1,37E-03 | kg Sb eq. / kg | Structurant par les volumes |

Source : annexe de Green Cloud Computing (UBA, 2021), tables ILCD CF v1.0.10 (août 2016) et ILCD CF EF-v2.0 (mars 2019), vérifiées dans le corpus. Il s'agit de facteurs de caractérisation de flux d'extraction, pas d'impacts ACV par kg de matériau raffiné acheté. Leur application demande la correspondance exacte du flux élémentaire.[^ref-3]

## Interpréter le recyclage

Collecte, récupération du métal et qualité de la matière obtenue décrivent trois aspects distincts. Un rendement de séparation industriel ne décrit pas le taux global de recyclage en fin de vie. Les crédits éventuels dépendent de la convention d’allocation retenue ; ils ne sont pas soustraits automatiquement.

Le calcul repose sur un [modèle d’équipement](../../modelisation/modelisation-d-un-equipement) alimenté par des données compatibles et rattaché au cas d’usage concerné. Cette page sert à interpréter les résultats, pas à calculer une empreinte matière avec des coefficients universels.

## Passer d’une composition à un inventaire

| Famille | Présence possible | Question méthodologique |
|---|---|---|
| Métaux conducteurs | Cuivre des pistes et câbles, or et argent de certains contacts | Masse, pureté, production primaire ou secondaire |
| Matériaux des batteries | Lithium, graphite, cobalt ou nickel selon la chimie | Cellule ou pack, capacité et formulation exacte |
| Semi-conducteurs | Silicium et matériaux des étapes de fabrication | Distinguer masse finale et intrants de procédé |
| Affichage et aimants | Indium ou terres rares selon la technologie | Identifier la technologie avant d’appliquer un facteur |
| Structures | Acier, aluminium, verre et polymères | Masse, alliage, recyclé et procédés de transformation |

Cette liste guide la collecte ; elle ne fournit pas une composition moyenne universelle. Une nomenclature partielle ne décrit ni les consommables de procédé ni les pertes de production. Les masses finales seules peuvent donc sous-estimer des flux amont.

Pour chaque matière, conserver une référence de composition, la quantité et le facteur compatible. Additionner les contributions caractérisées dans une même méthode et une même unité. Les résultats GWP, ADPe, eau ou toxicité peuvent mettre en évidence des matières différentes : ni la rareté ni la faible masse ne prédisent seules l’indicateur dominant.

Ex: un inventaire de cuivre de câble doit couvrir la forme achetée et les transformations nécessaires. Un facteur d’extraction de minerai ne remplace pas le facteur de production du conducteur. Si une ACV de câble inclut déjà ces étapes, l’extraction ne constitue pas un poste supplémentaire.

[^ref-1]: [Commission européenne](https://single-market-economy.ec.europa.eu/sectors/raw-materials/areas-specific-interest/critical-raw-materials_en).

[^ref-2]: [Nuss et Eckelman, Life Cycle Assessment of Metals: A Scientific Synthesis, 2014](https://doi.org/10.1371/journal.pone.0101298).

[^ref-3]: [Green Cloud Computing, UBA](https://www.umweltbundesamt.de/publikationen/green-cloud-computing).
