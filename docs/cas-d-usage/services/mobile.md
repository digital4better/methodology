# Mobile

## Résumé

Ce chapitre sert à évaluer un service numérique consommé via une application mobile native ou un usage mobile dominant. Il accorde une attention particulière au terminal, au réseau d'accès mobile et au partage du smartphone entre plusieurs usages.

### Périmètre évalué

Le périmètre couvre :

- le terminal mobile lui-même
- les flux réseau, en distinguant si possible Wi-Fi et réseau d'accès mobile
- l'infrastructure d'hébergement du service

Ce cas d’usage est adapté aux applications mobiles natives, mais peut aussi servir pour des usages web mobile lorsque la part du terminal et du réseau mobile est structurante.

## Paramètres d'entrée

- Le nombre d'utilisateurs, sessions ou événements clés
- Le temps moyen passé dans l'application
- Les volumes de données transférés
- Le poids du package d'installation et des mises à jour, ainsi que leur fréquence
- Le volume ou le nombre de notifications push quand elles font partie du service
- La répartition Wi-Fi / réseau mobile si elle est connue
- La répartition smartphone / tablette si elle est connue
- La répartition géographique de l'audience
- Les grandes caractéristiques de l'hébergement

### Dépendances tierces

Les applications mobiles embarquent souvent de nombreux SDK et services tiers : analytics, push, authentification, publicité, cartographie, paiement, IA ou stockage externe. Ces dépendances doivent être recensées, car elles déplacent parfois une grande partie du traitement hors du backend principal.

### Règle d'allocation

La question d'allocation la plus importante concerne le terminal. Un smartphone sert simultanément à de nombreux usages ; il faut donc n'imputer au service étudié qu'une fraction cohérente du temps ou de l'activité de l'équipement.

### Risque de double comptage

Le double comptage peut survenir si :

- l'application est comptée à la fois comme usage mobile et comme service web identique
- des SDK tiers sont comptés séparément alors que leurs flux sont déjà inclus dans le volume global mesuré

### Hypothèses temporelles

Les usages mobiles sont souvent cycliques, avec des fréquences d’ouverture et des durées de session très variables. La période d'observation doit donc être documentée, notamment si l'on extrapole un comportement journalier à une année.

## Principe

1. Définir l'unité fonctionnelle, par exemple une session mobile ou un utilisateur actif sur une période.
2. Estimer la part terminal à partir du temps d'usage et du partage du smartphone entre usages.
3. Estimer la part réseau en distinguant autant que possible LAN et RAN.
4. Estimer la part infrastructure à partir de l'environnement d'hébergement.
5. Agréger les couches en évitant les doubles comptes entre réseau et hébergement.

## Évaluation des impacts

### Spécificités d'un service mobile natif

Un service mobile natif ne se résume pas à un écran plus petit qu'un service web. Il présente plusieurs spécificités qui changent la modélisation :

- il est développé pour un système d'exploitation donné, comme `iOS` ou `Android`
- il mobilise des fonctions propres au terminal, par exemple notifications, caméra, GPS ou capteurs
- il suppose souvent une phase d'installation initiale depuis un store
- il peut générer des mises à jour régulières du package applicatif
- il peut être utilisé avec ou sans connexion réseau selon les fonctions activées

Ces spécificités expliquent pourquoi la méthode doit intégrer non seulement les sessions d'usage, mais aussi les téléchargements initiaux, les mises à jour et le partage du terminal entre plusieurs usages.

Dans l'état actuel de la méthode, cela conduit à distinguer au moins deux familles de flux :

- les flux d'utilisation courante pendant les sessions
- les flux de distribution, c'est-à-dire installation, mises à jour et notifications

### Terminaux

Le terminal est souvent la couche dominante d'un service mobile. La méthode historique repose sur des profils d'utilisateurs établis à partir des analytics, puis rapprochés d'archétypes de terminaux.

Les variables les plus utiles sont :

- le système d'exploitation ou la grande famille d'équipement
- le temps d'utilisation annuel ou par session
- le nombre d'utilisateurs ou de sessions
- la répartition entre smartphone, tablette et autres terminaux mobiles

Cette modélisation permet d'imputer :

- une part d'impact embarqué, annualisée sur la durée de vie de l'équipement
- une part d'impact d'usage, liée à la consommation électrique pendant le temps d'utilisation

Elle reste compatible avec un niveau de détail modeste, à condition de documenter clairement l'archétype retenu pour chaque profil.

En pratique, deux niveaux de précision peuvent coexister :

- des facteurs génériques par type d'équipement, par exemple `smartphone` et `tablette`
- des facteurs spécifiques quand un modèle connu peut être rattaché à une donnée constructeur ou à un référentiel plus précis

La méthode actuelle sait aussi croiser ces profils avec la géographie de l'audience. On peut ainsi affecter à chaque pays ou région :

- une part de l'audience
- un type de terminal générique
- ou, si l'information existe, un modèle plus précis

### Réseau

Le réseau d'un service mobile diffère de celui d'un service web sur un point important : il faut souvent intégrer des flux supplémentaires liés à l'installation et aux mises à jour de l'application.

La méthode recommande donc de distinguer au minimum :

- les flux de téléchargement initial du package
- les flux de mise à jour
- les flux d'usage courant pendant les sessions
- les flux liés aux notifications push quand ils sont significatifs

Elle recommande aussi de séparer autant que possible :

- le réseau d'accès mobile
- le réseau fixe ou Wi-Fi

Cette distinction est importante, car les facteurs de réseau et les hypothèses d'usage ne sont pas les mêmes. Quand la répartition exacte n'est pas connue, une hypothèse de mix réseau peut être utilisée, mais elle doit apparaître explicitement.

Le modèle de calcul actuellement utilisé distingue aussi :

- un réseau d'utilisation, lié aux sessions
- un réseau de distribution, lié à l'installation, aux mises à jour et aux notifications

Pour les flux de distribution, le calcul peut être segmenté sur plusieurs distances successives, par exemple :

1. de l'utilisateur à la frontière réseau la plus proche
2. de frontière à frontière
3. de la frontière au centre de données ou au point d'origine du service

Cette segmentation permet de mieux tenir compte de la géographie de l'audience, de la localisation de l'hébergement et du rôle éventuel du cache ou du CDN.

### Hébergement

Pour la partie hébergement, le service mobile suit une logique proche d'un service web : il faut relier les sessions, appels API et volumes de données à une infrastructure d'exécution.

Deux niveaux d'entrée sont possibles :

- un niveau détaillé, avec des machines ou des environnements connus
- un niveau plus forfaitaire, avec des profils de serveurs ou de machines virtuelles

L'évaluation doit alors tenir compte :

- du temps de sollicitation des serveurs
- du niveau de mise en cache
- du `PUE` du site d'hébergement, ou d'une valeur par défaut documentée si l'information manque
- du facteur d'électricité associé à la zone concernée

Le modèle actuel utilise aussi des archétypes simples de machines virtuelles, par exemple `petite`, `moyenne` et `grande VM`, avec :

- une consommation annuelle de référence
- un impact embarqué annualisé
- un taux d'allocation à l'application
- un taux d'allocation à la plateforme évaluée

Cette approche est utile quand l'infrastructure réelle n'est pas décrite assez finement pour faire une modélisation détaillée par composant.

### Répartition des couches

Comme pour les autres services numériques, le résultat final agrège trois couches principales :

- les terminaux utilisateurs
- le réseau
- les environnements d'hébergement

L'allocation des terminaux et de l'hébergement est généralement pilotée par la durée d'utilisation. L'allocation du réseau est plutôt pilotée par les volumes transférés.

Le modèle actuellement en usage ajoute une lecture plus fine de ces couches en distinguant, à l'intérieur du réseau :

- les flux de consultation
- les flux de distribution
- la part évitée ou déplacée par le cache ou le CDN quand un `hit ratio` est disponible

## Hypothèses & limites

### Hypothèses retenues

Ce cas d’usage est sensible au partage du terminal entre usages et au manque de visibilité sur les traitements côté système d'exploitation, notifications, synchronisations ou SDK tiers. Le réseau d'accès mobile reste aussi un poste incertain selon la qualité des données disponibles.

### Limitations connues

Quelques limites spécifiques doivent être gardées en tête :

- les téléchargements depuis les stores restent difficiles à observer précisément
- les mises à jour automatiques peuvent être importantes sans apparaître dans les analytics applicatives
- les profils utilisateurs sont des archétypes, pas des équipements réellement observés un par un
- la consommation côté terminal dépend fortement du matériel, de la luminosité, du réseau et des fonctions mobilisées
- la distribution géographique de l'audience influence fortement les impacts réseau, surtout si l'hébergement est éloigné
- le rôle du cache et des stores est souvent approché par hypothèses plutôt que mesuré directement

## Références

### Données mobilisées

- `digital4better/data`: familles `data/hardware/*`, `data/equipment/*`, `data/factor/*`, `data/energy/*`
- Données d'usage mobile
- Hypothèses de répartition entre Wi-Fi et réseau mobile
- Selon l'hébergement, éventuelle mobilisation de `data/cloud/*`
- Données analytics sur OS, sessions, durées d'usage, téléchargements et mises à jour quand elles existent
- Archétypes de terminaux mobiles et hypothèses de durée de vie
- Répartition géographique de l'audience et localisation du centre de données
- Paramètres de distribution : poids du package, nombre d'installations, nombre de versions, notifications et `opt-in`
- Paramètres de cache ou de `hit ratio` quand ils existent
- Profils d'hébergement de type VM et taux d'allocation à l'application

### Sources

- ADEME / Arcep
- Note méthodologique interne sur les services mobiles natifs
- Modèle de calcul interne des applications mobiles
- Corpus `inputs/md`
- [digital4better/data](https://github.com/digital4better/data)
