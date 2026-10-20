# Mail

import { MethodIllustration } from '@site/src/components/method-illustrations';

L’évaluation d’un message, d’une campagne ou d’un volume de messagerie distingue rédaction, lecture, transfert et conservation. Un chiffre universel par mail masquerait les différences de taille, de destinataires et de durée de stockage.

## Préparer les données

| Donnée | Ce qu’elle couvre |
|---|---|
| Messages, destinataires et taux de lecture | Activité de la campagne ou de la période |
| Taille des messages | Corps, pièces jointes et données effectivement transmises |
| Durées de rédaction et de lecture | Temps terminal, séparé du traitement serveur |
| Copies physiques et conservation | Stockage, sauvegardes comprises une seule fois |
| Hébergement | Traitement alloué, hors stockage évalué séparément |

Le scénario suppose un comportement moyen des destinataires. Pour une messagerie annuelle avec un stock ancien, ce stock fait partie de l’inventaire de stockage ; le nombre de nouveaux messages ne le décrit pas.

<span id="comprendre-le-calcul" />

Le temps terminal vaut `messages × (temps de rédaction + destinataires × part de lecture × temps de lecture)`. Le calcul de l’électricité et de la fabrication allouée repose sur une durée convertie en heures.

Le modèle de transfert additionne une transmission d’envoi, une livraison par destinataire et les téléchargements des lecteurs. Ce parcours simplifié ne décrit pas tous les protocoles : une synchronisation différente nécessite des flux mesurés.

## Méthode détaillée et cas particuliers

### Décomposer le parcours d’un message

| Étape | Activité à compter | Point de contrôle |
|---|---|---|
| Rédaction | Temps actif de l’émetteur | Une fois par message composé, pas par destinataire |
| Envoi et livraison | Message, pièces jointes, enveloppes et destinataires | Distinguer message logique et octets transmis |
| Lecture et synchronisation | Taux de lecture, durée, téléchargements et terminaux | Les synchronisations peuvent avoir lieu sans lecture |
| Conservation | Capacité physique et durée, copies et sauvegardes | Éviter de recompter une réplication incluse dans le facteur |
| Traitement | Antispam, antivirus, indexation, serveur de messagerie | Allouer les ressources mutualisées |

Avec $N$ messages, $R$ destinataires, une part de lecture $l$, des durées $t_e,t_l$ en minutes et un poids $s$ en Mo :

$$
H_{terminal}=\frac{N(t_e+Rl t_l)}{60}
$$

$$
G_{réseau}=\frac{Ns}{1000}(1+R+Rl d),\qquad
S_{stockage}=\frac{Ns}{1000}c m
$$

$d$ désigne les téléchargements par lecteur, $c$ les copies physiques totales et $m$ les mois. Le modèle de synchronisation est simplifié : pour des clients téléchargeant tous les messages, la mesure des octets ou un parcours adapté distingue taux de lecture et taux de téléchargement.

La fabrication du terminal utilise le profil moyen par seconde ou, en mode personnalisé, la fabrication unitaire divisée par la durée de vie. Le facteur stockage en kg CO₂e/Go.mois doit couvrir les phases annoncées. L’hébergement exclut ce stockage lorsqu’il est calculé séparément.

### Campagne marketing, stock ancien et pièces jointes

La rédaction d’une campagne constitue un poste séparé ou une part de temps répartie entre les messages envoyés.

<MethodIllustration kind="mail-campaign" lang="fr" />

Pour un parc de boîtes aux lettres, le stockage annuel inclut le stock préexistant. L’intégration de la capacité au cours du temps peut reposer sur la moyenne de chaque mois multipliée par sa durée. Le simulateur représente un lot conservé pendant une durée fixe ; il ne reconstitue pas automatiquement un historique de boîte.

Un lien de téléchargement remplace une pièce jointe par d’autres transferts et un stockage distant. Son évaluation dépend des accès réels, de la durée de conservation et du service de partage. L’effet dépend du nombre de lecteurs ; aucun gain fixe n’est présumé.

### Expéditeur, destinataires et protocoles de messagerie

Le parcours historique distingue terminal expéditeur, serveur expéditeur, serveur destinataire et terminal destinataire. Chaque segment peut relever d’un pays et d’un réseau différents. Les échanges d’en-têtes, la synchronisation IMAP et les téléchargements POP ne se déduisent pas du seul taux de lecture.

La copie envoyée, les copies reçues et les sauvegardes peuvent avoir des durées de conservation différentes. Leur capacité physique est suivie séparément avant agrégation en Go.mois. Le paramètre unique de conservation de l’exemple correspond donc à une simplification, pas à une règle commune à toutes les boîtes.

La note historique s’appuie sur l’approche ADEME Impact CO₂ pour l’hébergement. L’exemple ci-dessous utilise des entrées séparées de traitement et de stockage : il ne reproduit pas ce forfait. Les facteurs complets et leurs composantes ne sont jamais additionnés.

### Interpréter un résultat

Ex: avec les paramètres initiaux, le temps terminal vaut 46,67 h, les transferts 2,8 Go et le stockage 36 Go.mois. Les facteurs réseau et stockage manquants empêchent d’en déduire un total complet. Le résultat distingue les postes mesurés, inférés et exclus ; il se rapporte à un message envoyé ou à une campagne clairement définie.

## Périmètre à compléter

Les facteurs réseau et stockage restent vides tant qu’aucune donnée compatible n’est fournie. Le sous-total ne les traite pas comme nuls. Les outils de création, CRM et analyse d’une campagne restent à ajouter si la fonction étudiée les inclut.

Un facteur de messagerie complet inclut déjà ses composantes. Dans une suite collaborative, la part attribuée au mail relève d’une allocation documentée. La disponibilité d’un chiffre publié ne suffit pas : sa période, son périmètre et son unité conditionnent son utilisation.

<span id="règles-et-sources" />

Pour cadrer le résultat : [périmètre et unité d’analyse](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) et [double comptage](../../regles/double-comptabilisation).

Les facteurs électriques sont issus de l’instantané D4B 2025[^ref-1]. Les activités et données d’hébergement préremplies sont des hypothèses de l’exercice. Les facteurs et conventions sont consultables sous le simulateur.

<span id="lire-leffet-des-paramètres" />

La taille des pièces jointes et leur durée de conservation affectent différemment le trafic et le stockage. Une suppression de messages diminue ici une quantité allouée ; elle ne prouve pas une réduction immédiate de la consommation d’un serveur qui reste allumé.

## Exemple interactif {#simuler-votre-situation}

Cet exemple met en application les calculs et les limites présentés ci-dessus.

Ex: 1 000 messages de 1 Mo conservés en trois copies physiques pendant douze mois représentent **36 Go.mois**. C’est une quantité d’activité, pas une empreinte carbone. Le facteur de stockage doit correspondre à une capacité physique et couvrir les phases déclarées.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="mail" lang="fr" />

</div>

[^ref-1]: Digital4Better, [instantané D4B 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.
