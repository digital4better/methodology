# Mail

## Résumé

Ce chapitre sert à évaluer l'impact environnemental d'un usage de courrier électronique en combinant terminal, réseau, stockage et infrastructure de traitement.

### Périmètre évalué

Le périmètre couvre l'envoi, la réception, la synchronisation et le stockage des messages. Ce cas d’usage peut s'appliquer à un message unitaire, à une campagne, ou à un volume annuel d'usage.

## Paramètres d'entrée

- Un nombre de messages envoyés, reçus ou stockés
- Une taille moyenne des messages et pièces jointes
- Une durée de conservation ou un volume de stockage associé
- Une hypothèse sur les terminaux et le mode d'accès
- Le type d'hébergement ou de service mail

### Dépendances tierces

La messagerie repose souvent sur un service tiers ou sur une suite collaborative intégrée. Les services annexes, comme l'archivage, l'antispam ou les passerelles de sécurité, doivent être inclus s'ils font partie du service étudié.

### Règle d'allocation

L'allocation combine généralement :

- le temps d'utilisation côté terminal
- le volume de données transférées côté réseau
- le volume stocké et la durée de conservation côté infrastructure

### Risque de double comptage

Le risque principal apparaît si le stockage des pièces jointes, l'archivage ou une suite cloud de productivité sont déjà évalués ailleurs. La frontière exacte du service mail doit être documentée.

### Hypothèses temporelles

La conservation des messages change fortement le résultat. Il faut distinguer ce qui relève du flux annuel de messages de ce qui relève du stock historique conservé.

## Principe

1. Définir l'unité fonctionnelle, par exemple un message traité ou un volume annuel de messagerie.
2. Estimer les volumes réellement transférés et stockés.
3. Affecter une part terminal au temps d'usage ou au nombre d'interactions.
4. Affecter une part réseau au volume de données.
5. Affecter une part hébergement et stockage à la messagerie.

## Évaluation des impacts

### Parcours fonctionnel d'un mail

L'évaluation d'un mail ne se limite pas au moment où l'utilisateur clique sur `Envoyer`. Un même message mobilise généralement plusieurs étapes :

- rédaction et envoi par l'expéditeur
- transmission initiale vers le serveur de messagerie de l'expéditeur
- acheminement éventuel par des serveurs intermédiaires
- filtrage, tri et stockage côté destinataire
- consultation, synchronisation et conservation dans le temps

Ce parcours explique pourquoi l'évaluation d'un mail doit distinguer les terminaux, le réseau et les environnements d'hébergement. Il explique aussi pourquoi le stockage peut rester significatif bien après l'envoi initial.

### Terminaux

La méthode distingue les terminaux des expéditeurs et ceux des destinataires. Dans la pratique, il est utile de séparer au minimum :

- les usages `desktop`
- les usages `mobile`

Les impacts terminal peuvent alors être ramenés à deux grandeurs simples :

- un temps de rédaction côté expéditeur
- un temps de lecture ou de consultation côté destinataire

Ce temps d'usage est ensuite combiné :

- au nombre de messages
- au nombre de destinataires
- au ratio d'ouverture ou de consultation
- à la répartition mobile / desktop

Cette approche permet d'imputer une part d'impact embarqué et une part d'impact d'usage aux terminaux, sans prétendre connaître l'équipement exact de chaque utilisateur.

### Réseau

Le réseau d'un service mail est plus complexe qu'un simple aller-retour entre deux boîtes de messagerie. La méthode historique distingue trois segments :

1. de l'expéditeur au datacenter de messagerie émetteur
2. du datacenter émetteur au datacenter destinataire
3. du datacenter destinataire au destinataire final

Cette décomposition est utile pour deux raisons :

- les mix réseau et les distances peuvent différer entre expéditeur, transit et destinataire
- la consultation des messages peut générer des flux supplémentaires, par exemple lors d'interrogations répétées de type webmail ou IMAP

Quand les données sont disponibles, la méthode peut aussi distinguer :

- le ratio réseau fixe / réseau mobile côté expéditeur
- le ratio réseau fixe / réseau mobile côté destinataire
- le poids du message initial
- le poids des pièces jointes
- le trafic additionnel lié aux consultations et synchronisations

### Environnements d'hébergement

Quand l'infrastructure de messagerie est connue, il est possible de modéliser les environnements d'hébergement à partir :

- des serveurs de traitement
- des composants réseau internes, comme firewalls, switches et routeurs
- des capacités de stockage nécessaires à la conservation des messages
- des redondances appliquées aux boîtes et sauvegardes

Quand ce niveau de détail n'est pas accessible, une approche forfaitaire reste possible. Le document de travail historique s'aligne alors sur la logique publiée par `Impact CO2` pour la partie datacenter mail, notamment pour répartir les impacts d'équipements mutualisés entre les messages et les utilisateurs.

Dans tous les cas, il faut distinguer :

- la part liée au traitement d'un message
- la part liée au stockage persistant
- la part liée aux redondances et sauvegardes

### Cas particulier d'une campagne marketing

Le cas d'une campagne marketing n'est pas réductible à un simple message unitaire envoyé en masse. Il ajoute souvent :

- une phase de préparation et de segmentation
- une phase de conception graphique et éditoriale
- une diffusion à grande échelle
- une phase d'analyse et d'optimisation post-campagne

Ce cas d'usage peut donc être traité de deux façons :

- soit en restant sur le coeur `mail` si l'on veut uniquement évaluer la diffusion et la consultation des messages
- soit en élargissant le périmètre pour inclure les outils de création, de CRM, de routage et d'analyse

Le choix doit être explicite, sinon on risque de comparer des résultats qui ne couvrent pas le même service.

## Hypothèses & limites

### Hypothèses retenues

Les usages mail sont très variables selon l'organisation, notamment sur la taille des pièces jointes, la durée de conservation et l'intensité des synchronisations. Ce cas d’usage est donc sensible aux hypothèses d'usage.

### Limitations connues

Quelques points de vigilance sont particulièrement importants :

- le protocole utilisé côté consultation change le volume réel d'échanges
- la durée de stockage des messages et pièces jointes peut dominer le résultat
- les suites collaboratives intègrent parfois d'autres fonctions déjà évaluées ailleurs
- les campagnes marketing ne doivent pas être confondues avec un usage transactionnel simple

## Références

### Données mobilisées

- `digital4better/data`: familles `data/hardware/*`, `data/equipment/*`, `data/energy/*`, `data/factor/*`, et selon le contexte `data/cloud/*`
- Données d'usage de messagerie
- Hypothèses de stockage et de conservation
- Répartition expéditeur / destinataires, mobile / desktop, fixe / mobile
- Taille moyenne des messages, pièces jointes, durée de rédaction et durée de lecture
- Si disponible, données d'hébergement de la messagerie ou paramètres forfaitaires documentés

### Sources

- Note méthodologique interne sur l'impact mail
- Littérature sur l'impact environnemental des usages de messagerie
- Corpus méthodologique `inputs/md`
- Référentiel `Impact CO2` pour certaines hypothèses datacenter mail
- [digital4better/data](https://github.com/digital4better/data)
