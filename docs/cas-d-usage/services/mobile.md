---
sidebar_label: Applications natives
---

import { MethodIllustration } from '@site/src/components/method-illustrations';

# Applications natives : mobiles et ordinateurs

Une [application native](../../references/glossaire#application-native) s’exécute sur un smartphone, une tablette ou un ordinateur. Son évaluation relie distribution, activité du terminal, réseaux et hébergement éventuel. La fonction de référence peut être une consultation de compte, un trajet calculé ou un document produit, à service comparable.

Le même cadre couvre les applications installées hybrides ou multiplateformes. Leur langage ne détermine pas leur impact : les ressources réellement mobilisées font foi. Le contenu exécuté dans une vue web suit [Service web](./service-web), sans ajouter deux évaluations complètes du même parcours.

## Préparer les données

| Activité | Données nécessaires |
|---|---|
| Sessions | Nombre, durée active, octets échangés |
| Installations | Nombre de téléchargements et poids réellement téléchargé |
| Mises à jour | Nombre et poids des téléchargements, différentiels si disponibles |
| Terminal | Famille mobile ou ordinateur, système, puissance et durée de vie |
| Infrastructure | Énergie et fabrication allouées à l’application |

Les notifications, SDK, publicités et appels tiers appartiennent aux flux observés ou à un inventaire séparé. La part cellulaire décrit le réseau utilisé : un smartphone en Wi-Fi relève du trajet fixe, tandis qu’un ordinateur peut utiliser une connexion cellulaire.

<span id="comprendre-le-calcul" />

Les transferts valent `sessions × Mo/session + installations × Mo/installation + mises à jour × Mo/mise à jour`. La division par 1 000 donne des Go décimaux.

Le profil moyen applique un facteur de fabrication déjà alloué par seconde. En mode personnalisé, la fabrication est répartie sur le temps actif rapporté à la durée de vie calendaire. Son électricité est calculée à partir de la puissance moyenne du profil. L’écran, les capteurs et les traitements intensifs peuvent nécessiter des profils distincts.

## Méthode détaillée et cas particuliers

### Séparer distribution, sessions et arrière-plan

Pour $N$ sessions, $n_i$ installations et $n_u$ mises à jour, le volume transféré en Go est :

$$
G=\frac{N s_s+n_i s_i+n_u s_u}{1000}
$$

Les tailles $s_s,s_i,s_u$ sont en Mo réellement téléchargés. Une mise à jour différentielle ne représente pas nécessairement le poids complet du package. Un utilisateur conservant une version ancienne ne reçoit pas automatiquement toutes les mises à jour.

Le temps actif vaut $H=N t/3600$. Le profil moyen sélectionné fournit une puissance et une fabrication allouée par seconde. Pour un profil personnalisé, la fabrication se répartit sur la durée de vie calendaire. Des mesures distinctes décrivent les fonctions fortement consommatrices : caméra, GPS, rendu 3D ou inférence locale. Une moyenne smartphone ne les décrit pas fidèlement.

| Activité | Mesure à privilégier | Traitement |
|---|---|---|
| Premier lancement | Téléchargement, décompression, initialisation | Ajouter aux sessions ou isoler un parcours |
| Cache local | Octets réellement transférés, durée et taille du stockage | Ne pas déduire deux fois les hits de cache |
| Notifications et synchronisation | Réveils, octets, temps CPU et énergie en arrière-plan | Ajouter une activité distincte |
| SDK et services tiers | Appels, publicités, télémétrie, cartographie | Inclure dans les flux ou inventorier séparément |
| Infrastructure | Énergie et fabrication allouées | Inclure le repos et les ressources réservées |

<MethodIllustration kind="native-app" lang="fr" />

### Spécificités mobiles et ordinateurs {#specificites-mobiles-et-ordinateurs}

La décomposition reste commune ; les observations diffèrent selon la plateforme.

| Point observé | Applications mobiles | Applications sur ordinateur |
|---|---|---|
| Terminal et affichage | Smartphone ou tablette, luminosité, écran actif ou éteint | Portable ou fixe, écran intégré ou externe, périphériques mobilisés |
| Traitements locaux | GPS, caméra, capteurs, rendu et inférence locale | Calcul CPU/GPU, rendu, indexation et traitements de fichiers |
| Arrière-plan | Notifications, synchronisations et restrictions iOS/Android | Services résidents, synchronisations, veille et gestion d’énergie du système |
| Distribution | Package adapté au terminal, store, mises à jour différentielles | Installateur, store ou déploiement d’entreprise ; téléchargements et caches effectivement utilisés |

**Sur mobile**, l’activation des radios, des capteurs et les réveils du terminal peuvent contribuer au-delà du seul volume de données. Les conditions de réseau, de luminosité et d’usage des capteurs accompagnent donc les mesures.[^energie-mobile] Les restrictions d’arrière-plan du système influencent l’activité réellement exécutée : une synchronisation programmée n’équivaut pas toujours à une synchronisation réalisée.[^arriere-plan-android]

**Sur ordinateur**, une application ouverte n’est pas nécessairement active en continu. Le scénario distingue travail, attente, traitements en arrière-plan et veille ; la gestion d’énergie peut limiter une application inactive.[^energie-mac] Les écrans ou périphériques déjà inclus dans le profil ne sont pas ajoutés une seconde fois.

Un fonctionnement hors ligne conserve les calculs et le stockage locaux. Seuls les transferts et traitements distants réellement absents sont exclus. La conception, les tests et la maintenance suivent le [cycle de vie du service](../../fondations/principes-acv-appliques-au-numerique), au-delà de cet exemple d’exploitation.

### Mesurer le surcoût d’une fonction et traiter les usages simultanés

La comparaison repose sur des mesures répétées avec et sans la fonction, à luminosité, réseau, batterie et état thermique comparables. Une différence énergétique mesure un surcoût dans ce protocole ; elle ne répartit pas automatiquement la fabrication ni l’énergie commune du terminal.

Une session combinant audio, navigation et écran nécessite une règle d’allocation des ressources communes. La somme attribuée aux applications ne doit pas dépasser l’inventaire du terminal. Le temps d’arrière-plan ne peut pas être assimilé sans correction à un écran allumé.

Le simulateur n’ajoute pas automatiquement ces activités. Lorsqu’elles sont significatives, leur estimation constitue un complément explicite au sous-total. Une application hybride partageant du contenu web doit éviter de compter deux fois le même parcours.

### Audience, notifications et continuité avec le modèle historique

L’inventaire distingue les systèmes et leurs versions : iOS et Android sur mobile, Windows, macOS ou Linux sur ordinateur. Les pays et les familles de terminaux complètent ces groupes. Le nombre de sessions mesure une activité ; le nombre d’utilisateurs décrit une population. La répartition des sessions par pays n’est assimilable à celle des utilisateurs que si leur fréquence d’usage est comparable.

Pour les notifications, le volume dépend de la population ayant accepté leur réception, du nombre effectivement délivré et de leur taille. Un taux d’acceptation déjà inclus dans le nombre délivré ne s’applique pas une seconde fois. L’évolution de l’audience pendant l’année influence aussi les mises à jour reçues. Le poids d’un package adapté au terminal peut différer du poids annoncé sur le store.

Le modèle historique mobile décrit séparément distribution, sessions et hébergement. L’extension aux ordinateurs conserve cette décomposition, avec des profils matériels, des activités et des données de distribution propres à chaque plateforme. Ses conversions binaires et son allocation d’une consommation annuelle [TEC](../../references/glossaire#tec) restent distinctes des Mo décimaux et des puissances moyennes de l’exemple ci-dessous. Une reprise de résultats nécessite ces métadonnées ; les deux calculs ne sont pas présentés comme équivalents.

### Choisir l’unité de restitution

Le total de période additionne la distribution, les sessions et l’infrastructure. Un impact par session peut inclure une part de distribution, mais ce choix doit être annoncé. Une comparaison fonctionnelle porte sur une tâche accomplie, à taux de réussite, qualité et disponibilité constants.

## Périmètre à compléter

Le calcul ne déduit pas l’énergie réelle d’une application à partir du seul type de terminal. Les valeurs préremplies sont un exercice ; des mesures de parcours représentatifs permettent de les remplacer. Les facteurs réseau sont à renseigner et les services tiers non inventoriés restent exclus.

Une audience variée se décrit par profils de terminaux, réseaux et pays distincts. Les usages simultanés demandent une règle d’allocation qui ne dépasse pas l’impact total du terminal. Un même parcours ne s’additionne pas à sa propre évaluation dans [Service web](./service-web).

<span id="règles-et-sources" />

Pour cadrer le résultat : [périmètre et unité d’analyse](../../fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse), [allocation](../../regles/allocation-et-partage-des-impacts) et [double comptage](../../regles/double-comptabilisation).

Les facteurs électriques sont issus de l’instantané D4B 2025[^ref-1]. Les activités et données d’hébergement préremplies sont des hypothèses de l’exercice. Les facteurs et conventions sont consultables sous le simulateur.

<span id="lire-leffet-des-paramètres" />

Le poids des mises à jour et les transferts par session contribuent séparément au trafic dans le simulateur. Réduire la durée d’une session n’est un progrès comparable que si la même fonction est accomplie.

L’énergie d’hébergement reste une entrée indépendante. Elle ne diminue pas automatiquement avec les octets transférés ou le temps d’écran.

## Exemple interactif {#simuler-votre-situation}

Le choix du terminal illustre une application mobile ou sur ordinateur. Le smartphone présélectionné reste un scénario pédagogique ; changer de profil ne mesure pas la consommation réelle de l’application.

Ex: 10 000 sessions à 2 Mo, 1 000 installations à 50 Mo et 2 000 mises à jour à 20 Mo donnent **110 Go**. À trois minutes actives par session, le temps terminal vaut **500 h**.

import { ScenarioPlayground } from '@site/src/components/scenario-playground';

<div className="inline-example">

<ScenarioPlayground kind="mobile" lang="fr" />

</div>

[^ref-1]: Digital4Better, [instantané D4B 2025](https://github.com/digital4better/data/blob/77cae4a58fadd5deb3b8d4e5577020da08f780d8/data/factor/country-yearly.csv). Instantané 77cae4a, données 2025 ; revue du 16 octobre 2026.

[^energie-mobile]: Apple, [Energy Efficiency Guide for iOS Apps, « Fundamental Concepts »](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/EnergyGuide-iOS/FundamentalConcepts.html), mise à jour du 13 septembre 2016, sections « Networking operations », « Location » et « Fixed Cost and Dynamic Cost ». Guide archivé ; principes physiques, sans reprise de ses coefficients numériques.

[^arriere-plan-android]: Google, [Background tasks overview](https://developer.android.com/develop/background-work/background-tasks), mise à jour du 26 février 2026, sections « Terminology » et « Task scheduling APIs ». Les règles d’exécution dépendent de la version du système.

[^energie-mac]: Apple, [Energy Efficiency Guide for Mac Apps, « Extend App Nap »](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/power_efficiency_guidelines_osx/AppNap.html), mise à jour du 13 septembre 2016, guide archivé, sections « What App Nap Does » et « How App Nap Works ». Exemple de gestion de l’inactivité sur macOS, sans généralisation aux autres systèmes.
