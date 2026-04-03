# Glossaire

## ACV (Analyse du Cycle de Vie)

Méthodologie normalisée (ISO 14040/14044) permettant l'évaluation des impacts environnementaux d'un produit, service ou organisation sur l'ensemble de son cycle de vie : extraction des matières premières, fabrication, transport, utilisation et fin de vie.

## Allocation

Règle d'affectation qui permet d'attribuer à un objet d'étude sa part des impacts d'une ressource partagée. Les principales familles d'allocation sont : temporelle, volumétrique, par capacité réservée, par nombre d'utilisateurs ou forfaitaire documentée. Voir [Allocation et partage des impacts](../regles/allocation-et-partage-des-impacts).

## Allocation forfaitaire

Part fixe conventionnelle attribuée à un service en l'absence de données d'usage mesurées. Utilisée en dernier recours et toujours documentée.

## Allocation temporelle

Affectation des impacts proportionnellement à la durée d'usage du service par rapport à la durée de vie totale de l'équipement. Règle par défaut pour les terminaux et serveurs dédiés.

## Allocation volumétrique

Affectation des impacts proportionnellement au volume de données transférées. Règle de référence pour les réseaux.

## Approche end-point

Méthode orientée « dommages » qui estime l'impact à la fin de la chaîne de causalité. Elle permet d'estimer les dommages potentiels en allouant plusieurs catégories intermédiaires à des catégories de dommages (climat, écosystèmes, santé humaine, ressources).

## Approche mid-point

Méthode orientée « problème » qui estime l'impact au milieu de la chaîne de causalité. Les résultats d'inventaire ayant des effets similaires sont regroupés dans des catégories d'impact intermédiaires (GWP, acidification, etc.).

## CDN (Content Delivery Network)

Réseau de diffusion de contenu constitué de serveurs répartis géographiquement qui coopèrent pour mettre à disposition du contenu au plus près des utilisateurs. Le CDN réduit la distance de transfert et met en cache une partie des données, réduisant la charge sur le serveur d'origine.

## Donnée primaire

Donnée collectée directement dans le périmètre d'étude ou fournie par un acteur directement concerné. Se distingue d'une donnée secondaire (issue de la littérature ou d'un référentiel générique).

## Double comptabilisation

Erreur méthodologique consistant à compter le même impact physique plusieurs fois dans des périmètres d'évaluation qui se superposent. Voir [Double comptabilisation](../regles/double-comptabilisation).

## Durée de vie nominale

Durée de vie minimum attendue pour un équipement, fixée par l'organisation. Utilisée pour l'amortissement de l'impact intrinsèque en l'absence de durée de vie réelle observée.

## Durée de vie réelle

Durée de vie moyenne effectivement observée sur les équipements d'un parc. Calculée à partir des populations d'équipements vivants et sortis. Voir [Temporalité et vieillissement](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

## Empreinte environnementale

Indicateur qui permet d'évaluer la pression qu'exerce l'homme ou une activité sur les ressources et les écosystèmes. Exprimée au travers de plusieurs indicateurs mid-point.

## Équipement

Tout dispositif électronique qui compose les trois tiers du numérique : terminaux utilisateurs, équipements réseau, équipements des datacenters. Utilisé pour visualiser, traiter, stocker ou transmettre des données.

## Hyperviseur

Couche logicielle qui permet de créer et gérer des machines virtuelles sur un serveur physique. Exemples : VMware ESXi, KVM, Hyper-V, Xen. Introduit un overhead de consommation de ressources.

## Impact intrinsèque

Impacts environnementaux liés à la création et à l'élimination d'un équipement matériel, correspondant aux phases ACV d'extraction des matières premières, fabrication, transport et fin de vie. La part attribuée à un usage donné dépend de la règle d'allocation retenue.

## Impact opérationnel

Impact résultant de la phase d'utilisation d'un équipement, reposant sur la consommation d'électricité nécessaire à son fonctionnement.

## Indicateur environnemental

Valeur observée représentative d'un phénomène environnemental. La méthode retient 9 indicateurs mid-point : GWP, AP, CTUe, CTUh-nc, CTUh-c, PM, IR, WU, ADPe.

## Matrice de robustesse

Outil d'évaluation de la qualité d'une donnée selon six dimensions (périmètre, géographie, temporalité, granularité, traçabilité, stabilité méthodologique), chacune notée de 1 à 5. Voir [Qualité des données](../regles/qualite-des-donnees-et-matrice-de-robustesse).

## Mutualisation

Partage de ressources matérielles entre plusieurs services ou utilisateurs via la virtualisation ou la conteneurisation, permettant de réduire le nombre d'équipements physiques nécessaires.

## PUE (Power Usage Effectiveness)

Indicateur mesurant l'efficacité énergétique d'un datacenter. Il rapporte l'énergie totale consommée par le centre à l'énergie utilisée uniquement par les équipements informatiques. Un PUE de 1,0 signifie que toute l'énergie sert au calcul ; la valeur moyenne mondiale est de 1,58.

## RCP (Référentiel par Catégorie de Produit)

Document décrivant les principes pour l'évaluation environnementale d'une catégorie de produits. Dans le contexte numérique, le RCP mère sur les services numériques (ADEME/ARCEP) fournit le cadre de référence.

## Score de robustesse

Moyenne des six dimensions de la matrice de robustesse, entre 1 (donnée insuffisante) et 5 (donnée fiable). Utilisé pour arbitrer entre sources et documenter le niveau de confiance.

## Terminal

Équipement électronique permettant à un utilisateur d'interagir avec un système informatique : ordinateurs, smartphones, tablettes, terminaux de paiement, guichets automatiques, etc.

## vCPU

Unité de processeur virtuel attribuée à une machine virtuelle. Correspond à un thread d'un processeur physique. Par exemple, 8 vCPU correspondent à un processeur 4 cœurs hyperthreadés.

## Versionnement

Pratique consistant à tracer la version des données, facteurs et méthodes utilisés dans une évaluation, afin de garantir la reproductibilité et la comparabilité des résultats dans le temps.
