---
sidebar_position: 2
sidebar_label: Principes
---

# Principes méthodologiques

## Une approche Cycle de vie

L'analyse du cycle de vie (ACV) est une méthodologie permettant l’évaluation des impacts environnementaux de produits, de services ou d'organisations . L’ ACV a été choisie pour cadrer les bases de l’évaluation des impacts environnementaux du numérique , on parle alors d’ « ACV numérique ». Les méthodologies proposées par Digital4Better reprennent les mêmes principes que l’ACV numérique :

- L’évaluation porte sur l’ensemble du cycle de vie, de la fabrication à la fin de vie en passant par l’étape d’utilisation.
- La méthodologie intègre une analyse multicritère : un ensemble d’indicateurs environnementaux sont étudiés systématiquement et correspondent aux indicateurs environnementaux préconisés pour les ACV numériques. (cf. [Indicateurs environnementaux](#indicateurs-pris-en-compte-dans-lévaluation))
- L’évaluation porte sur l'ensemble des équipements qui composent les trois tiers (équipements utilisateurs, transferts réseaux, datacenters).

### Impact intrinsèque et impact opérationnel

L’impact d’une activité numérique est évalué à partir de 2 composantes :
- L’impact intrinsèque (Embodied Impact) : ces impacts sont ceux qui s’opèrent lors de la création et de l’élimination d’un périphérique matériel (qui correspondent aux phases ACV : extraction des matières premières, fabrication, transport et fin de vie). Ces impacts reposent sur une fraction des impacts intrinsèques totaux qui doit être allouée à la quantité particulière d'utilisation.
- L’impact opérationnel (Operational Impact) : cet impact résulte de la phase d’utilisation, cet impact repose sur la consommation d‘électricité nécessaire au fonctionnement.

L’impact global est alors :

$$
\begin{align*}
&I_{global} = I_{operational} + I_{embodied}  
\end{align*}
$$

### Approche multi-composants

Notre approche intègre l’ensemble des équipements et infrastructures caractérisés en 3 tiers : terminaux, réseaux de télécommunication et centres informatiques en respectant la définition du RCP [Référentiel méthodologique d’évaluation environnementale des services numériques](https://librairie.ademe.fr/produire-autrement/6022-referentiel-methodologique-d-evaluation-environnementale-des-services-numeriques.html).

>Un service numérique est une activité se caractérisant par la réalisation d’une prestation ou la mise à disposition d’une information mobilisant un ensemble d’équipements, infrastructures numériques et d’autres services numériques pour capter, faire circuler, traiter, analyser, restituer et stocker des données. Ces équipements et infrastructures étant caractérisés en 3 tiers : terminaux, réseaux de télécommunication et centres informatiques ; un ensemble de logiciels étant utilisés à différents niveaux pour I orchestrer J les équipements physiques et délivrer le service attendu. Bien que cette activité soit liée à un ou plusieurs produits physiques (terminaux, réseaux, serveurs), elle est transitoire, souvent intangible.

## Indicateurs pris en compte dans l’évaluation

Quel que soit l’objet d’étude, notre méthodologie aboutit à l’évaluation de l’impact sous la forme d’indicateurs environnementaux.
Ces indicateurs ont été choisis conformément aux préconisations du §7 du RCP mère sur les services numériques.
Sont pris en compte à la fois les indicateurs obligatoires et les indicateurs facultatifs.

Les 9 indicateurs environnementaux mid-point sont caractérisés en 4 catégories d’impact : dommage climatique, dommage écologique, dommage sur la santé humaine et dommage sur la diminution des ressources.

Le tableau ci-dessous décrit chacun des indicateurs d’impact environnementaux retenus.

L’ensemble de ces indicateurs d’impact environnementaux sont compatibles avec les calculs d’impacts environnementaux présentés ci-dessous.
Toutes les formules de calcul vues ensuite sont applicables avec l’ensemble des indicateurs environnementaux identifiés ici.

Un indicateur de flux supplémentaire vient aider à l’interprétation des résultats : la consommation d’électricité.

| Impacts<br/>"mid-point"              | Abréviation | Unité             | Dommages<br/>"end-point"                 | Définition                                                                                                                                                                                                                                                                                                                                                                                               |
|--------------------------------------|-------------|-------------------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Changement climatique total          | GWP         | kg CO2 eq.        | Dommage climatique                       | Potentiel de changement climatique induit par les émissions de gaz à effet de serre (GES). Les GES sont des composés gazeux qui absorbent le rayonnement infrarouge émis par la surface de la Terre. L'augmentation de leur concentration dans l'atmosphère terrestre contribue au réchauffement climatique.                                                                                             |
| Acidification                        | AP          | mol H+ eq.        | Dommage écologique                       | Potentiel d’acidification des milieux (sols et eaux de surface) induit par les émissions de substances acidifiantes. L'acidification est liée aux émissions d'oxydes d'azote, d'oxydes de soufre, d'ammoniac et d'acide chlorhydrique qui se transforment en acides en présence d'humidité. Leurs retombées peuvent endommager les matériaux, les écosystèmes forestiers et les écosystèmes d'eau douce. |
| Ecotoxicité des eaux douces          | CTUe        | CTUe              | Dommage écologique                       | Potentiel de toxicité apporté aux milieux aquatiques (eaux douces de surface) par l’émission dans l’environnement de substances toxiques. L’écotoxicité déstabilise et menace la qualité et la variété des écosystèmes (faune et flore).                                                                                                                                                                 |
| Toxicité humaine (non-cancérigène)   | CTUh-nc     | CTUh              | Dommage sur la santé humaine             | Potentiel de toxicité sur l’homme induit par l’émission dans l’environnement de substances susceptibles de créer des dommages sur la santé de type non cancérigène.                                                                                                                                                                                                                                      |
| Toxicité humaine (cancérigène)       | CTUh-c      | CTUh              | Dommage sur la santé humaine             | Effets toxicologiques chroniques sur la santé humaine dus aux émissions de substances cancérigènes.                                                                                                                                                                                                                                                                                                      |
| Emissions de particules fines        | PM          | disease occurence | Dommage sur la santé humaine             | La présence de particules fines de petit diamètre dans l'air - en particulier celles d'un diamètre inférieur à 10 microns - représente un problème de santé humaine, car leur inhalation peut provoquer des problèmes respiratoires et cardiovasculaires                                                                                                                                                 |
| Emissions de substances ionisantes   | IR          | kg U235 eq.       | Dommage sur la santé humaine             | Effet des émissions radioactives sur la santé humaine. Les radionucléides peuvent être libérés lors de plusieurs activités humaines. Lorsque les radionucléides se désintègrent, ils libèrent des rayonnements ionisants. L'exposition humaine aux rayonnements ionisants provoque des dommages à l'ADN, qui à leur tour peuvent conduire à divers types de cancer et de malformations congénitales      |
| Utilisation de la ressource en eau   | WU          | m3 eq.            | Dommage sur la diminution des ressources | Quantité totale d’eau consommée. Il s’agit d’un indicateur de flux exprimé en m3 (consommation brute d’eau prélevée dans les milieux) et non d’un indicateur d’impact du prélèvement sur les milieux en fonction de leur spécificité locale, notamment le type d’eau prélevée et le stress hydrique.                                                                                                     |
| Épuisement des ressources naturelles | ADPe        | kg SB eq.         | Dommage sur la diminution des ressources | Quantité de ressources minérales et métalliques extraites de la nature comme s'il s'agissait d'antimoine (SB). L'exploitation industrielle entraîne une diminution des ressources disponibles dont les réserves sont limitées.                                                                                                                                                                           |

## Approche équipement et approche système

Le RCP mère distingue 2 approches pour réaliser l’évaluation d’un service numérique :
- Approche équipement : chaque équipement utilisé par le service numérique constitue une donnée primaire ou secondaire. Le service numérique est considéré comme une somme d’usage de chaque équipement, chaque usage étant défini à travers une règle d’allocation par rapport aux impacts totaux de l’équipement. (…)
- Approche système : un certain nombre d’équipements peuvent être regroupés en un système physique (exemple : datacenter) ou virtuel (exemple : machine virtuelle), au niveau duquel les impacts environnementaux ont été déterminés et qui constitue une donnée primaire ou secondaire. Le service numérique est considéré comme une somme d’usages de chaque système, chaque usage étant défini à travers une règle d’allocation par rapport aux impacts totaux du système. (…)

L’approche équipement sera plus précise mais plus complexe que l’approche système à mettre en œuvre.

Il est recommandé d’utiliser une approche équipement sur le périmètre maîtrisé par l’opérateur de service numérique et une approche système sur le périmètre non maîtrisé. »

Conformément à ces principes, la méthodologie présentée aura recours de manière préférentielle à l’approche équipement et se tournera vers une approche système lorsque cela s’avère pertinent. 

## Organisation du document de restitution

Les méthodologies présentées dans le présent document sont reprises à différents niveaux dans les activités de Digital4Better, que ce soit dans les activités de conseil aux clients ou via notre outil fruggr qui permet d’automatiser et restituer les calculs. Dans les activités de conseil, on constate que le déroulement de ces évaluations doit systématiquement s’adapter au contexte de l’organisation évaluée.

Toutefois, des bases communes existent dans toutes ces mises en application. C’est pourquoi le choix a été fait d’organiser le présent document en 3 divisions, représentant une progression du global vers le spécifique : 

| Division                 | Chapitres concernés                                                                                                                       | Description                                                                                                                                        |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Informations transverses | [Principes méthodologiques](principles.md)<br/>[Notions transverses](concepts.md)                                                         | Cette division reprend les bases méthodologiques de notre approche ainsi que les concepts communs à toutes les déclinaisons suivantes.             |
| Méthodologies générales  | [Méthodologies d’évaluation des impacts environnementaux](methodology/general.md)                                                         | Cette division présente les formules de calcul générales pour chaque tiers composant un service numérique : équipement, réseau, centre de données. |
| Méthodologies appliquées | [Méthodologie appliquée aux services web](methodology/web.md)<br/>[Méthodologie appliquée aux parcs informatiques](methodology/assets.md) | Cette division illustre des déclinaisons des méthodologies générales sur des périmètres spécifiques.                                               |

Pour chaque chapitre présentant une méthodologie, celle-ci est présentée autant que possible selon le plan suivant :
- Spécificités du périmètre 
- Evaluation de l’impact intrinsèque 
- Evaluation de l’impact opérationnel

Les équations sont présentées en anglais, avec leurs unités. Elles sont toutes applicables quel que soit l’indicateur environnemental évalué parmi les 9 évoqués au paragraphe [Indicateurs pris en compte dans l’évaluation](#indicateurs-pris-en-compte-dans-lévaluation). C’est pourquoi il est fait référence à un indicateur « X » dans les variables en lien avec ces indicateurs environnementaux, associé à une unité en « x ». Le X peut être remplacé par n’importe quel indicateur parmi ceux retenus dans notre méthodologie. L’unité « x » sera à mettre à jour avec l’unité de l’indicateur choisi.  



		
	


	

	


