---
sidebar_label: Méthodologie services web
sidebar_position: 5
---

# Méthodologie appliquée aux services web

## Spécificités des services web

### Définition de l’utilisation d’un service web

On peut caractériser une consultation de service web comme tel :
- Un utilisateur peut accéder à une ou plusieurs pages d’un site web, depuis n’importe où dans le monde, une ou plusieurs fois et à partir de différents types de terminaux. 
- Quand l’utilisateur souhaite afficher une page du service, des requêtes sont envoyées via le réseau vers les serveurs qui renvoient les informations, via le réseau, sur le terminal utilisateur. 
- L’utilisateur consulte le contenu des pages pendant un temps variable.

### Périmètre de l’évaluation des impacts

On distingue le cycle de vie d’un service web et le cycle de vie des équipements et infrastructures permettant l’exécution de ce service. Notre méthodologie intègre les impacts de l’ensemble des phases du cycle de vie  des équipements et infrastructures impliqués dans la phase d’utilisation du service web. Les phases de fabrication (conception, développement, validation) et de fin de vie (décommissionnement) du site web ne sont pas pris en compte ici. 

### Approche ACV

L’approche multi-composant énoncée au paragraphe [Approche multi-composants](principles.md#approche-multi-composants) est mise en œuvre en décomposant le service en 3 couches d’équipements et infrastructures numériques impliquées dans l’utilisation d’un service web :
- Terminaux utilisateur final : comprend les équipements utilisés par les utilisateurs pour consulter le service. 
- Réseau : comprend les infrastructures réseau internet pour les échanges de données entre les terminaux des utilisateurs finaux et les centres de données. 
- Datacenters : comprend les équipements liés à l’hébergement et au traitement des données.
     
L’allocation des terminaux et des centres de données est basée sur la durée d’utilisation du service, le réseau sur les octets transférés. Les impacts d’un service web résultent de la somme de ces 3 composantes :

![web.png](web.png)

L’évaluation des impacts d’un service web est une agrégation des impacts par page, la méthodologie d’évaluation présentée ici s’applique au niveau d’une page.

### Simulation du nombre de vues par page

L’impact d’un site web est directement lié au nombre de fois où ses pages sont consultées. Le nombre de vues par page est donc un indicateur essentiel pour estimer l’impact du service. Il est récupérable au travers des services d’analyses d’audience qui tracent les interactions du site et existent sur une grande majorité de services.

Dans le cas où le nombre de vues par page n’est pas connu, le nombre de vues total du service est réparti entre les différentes pages du service selon ce qu’on appelle leur « chance de vue », un indice basé sur plusieurs variables caractéristiques de la page (profondeur, nombre de pages « enfants »…). 

À l’aide d’un modèle de régression linéaire et de notre base de données interne, le travail de R&D a permis d’obtenir des coefficients associés à chaque variable. Sur la base de ces coefficients, nous calculons l’ensemble des pourcentages de chance de vue pour chaque page du site web, à l’aide de l’équation suivante

$$
\begin{align*}
&V(p) = 0,26822 \times N - 241,08179 \times dist(p) + 12,89528 \times desc(p) + 160,37288 \times children(p) + 1049,3743 \\
Avec\\
&V(p) = \text{Probabilité de vues de la page}\textit{ p}\\
&N = \text{Nombre total de pages du service numérique}\\
&dist(p) \in \{1,4\} = \text{Distance à parcourir depuis la page d'accueil pour trouver la page}\\
&desc(p) = \text{Nombre de pages descendants de cette page}\\
&children(p) = \text{Nombre de pages enfant de cette page, descendant direct}\\
\end{align*}
$$

Nous réalisons, ensuite, une normalisation des pourcentages de vues au projet selon la formule suivante, nous permettant d’obtenir des pourcentages de vues compris entre 0 et 1. :

$$
\begin{align*}
&V_{norm}(p) = \frac{V(p) - \min\limits_{\forall p' \in P}V(p')}{\max\limits_{\forall p' \in P}V(p') - \min\limits_{\forall p' \in P}V(p')} \\
Avec\\
&V_{norm}(p) = \text{Probabilité normalisée de vues de la page}\textit{ p}\\
&V(p) = \text{Probabilité de vues de la page}\textit{ p}\\
&P = \text{Ensemble des pages du service numérique}\\
\end{align*}
$$

Cependant, une fois cette transformation réalisée, nous faisons face à une seconde difficulté : la somme des pourcentages de vues pour chaque projet n’est pas systématiquement égale à 1. Or, il est nécessaire de répartir l’ensemble des chances de vues entre l’ensemble des pages, et donc avoir une somme des chances de vues qui soit égale à 1.

Pour pallier cette nouvelle difficulté, nous décidons de réaliser une nouvelle normalisation, en divisant chacun des pourcentages de vues (compris entre 0 et 1) par la somme des pourcentages de vues du projet concerné. Cela permet de dispatcher l’ensemble des chances de vues entre les différentes pages, et d’obtenir une somme des chances de vues qui soit égale à 1.

In fine, nous obtenons une chance de vues par page comprise entre 0 et 1, et la somme des chances de vues de l’ensemble des pages de chaque service est égale à 1.

Pour chaque page, en multipliant le résultat final par le nombre de vues totales, on a alors les vues prédites par pages.

## Evaluation des impacts environnementaux d’une page web – Terminal

### Paramètres 

| Nom                  | Définition                                                                                                                                    | Valeur    par défaut                                                                       |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Views                | Nombre de vues de la page, déclinable en en fonction du type de terminal en Views_mobile et Views_desktop                                     | Répartition par page à partir des vues totales (cf. Simulation du nombre de vues par page) |
| UsageDurationPerView | Durée moyenne d’une vue de la page, déclinable en fonction du type de terminal en UsageDurationPerView_mobile et UsageDurationPerView_desktop | Desktop : 69 secondes[^1]<br/>Mobile : 34 secondes[^2]                                     |
| RatioMobileUser      | Proportion d’utilisateurs sur mobile par rapport aux utilisateurs totaux                                                                      | 0,59[^3]                                                                                   |
| RatioDesktopUser     | Proportion d’utilisateur sur desktop par rapport aux utilisateurs totaux                                                                      | 1 - RatioMobileUser                                                                        |

[^1]: Source : https://explore.contentsquare.com/digital-experience-benchmark-2023/2023-benchmark-fr
[^2]: Source : https://explore.contentsquare.com/digital-experience-benchmark-2023/2023-benchmark-fr
[^3]: Source : https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/#:~:text=Mobile%20accounts%20for%20approximately%20half,permanently%20surpassing%20it%20in%202020

### Facteurs d’impacts

Les facteurs fournis par la Base Empreinte font l’objet d’une transformation pour :
- Passer dans des unités de temps à la seconde pour coller aux ordres de grandeur des temps d’utilisation d’un service web
- Obtenir un impact énergie qui prend en compte le temps d’utilisation moyen de chaque typologie d’équipement

Les facteurs sont calculés :
- Par équipement : mobile ou desktop 
- Puis par catégorie d’équipement :
  - Smartphone et tablette pour mobile 
  - Laptop, ordinateur fixe et écran pour le desktop, avec pour chacun une distinction entre un usage professionnel et un usage personnel

Les facteurs par équipement sont obtenus à partir d’une pondération des facteurs de chaque catégorie. Ces coefficients de pondération sont extraits du rapport de l’ADEME/Arcep « Evaluation environnementale des équipements et infrastructures numériques en France, 2ème volet » de janvier 2022.

Le tableau ci-dessous présente les données utilisées pour cette adaptation ainsi que les facteurs obtenus :
- Les facteurs d’impact opérationnels sont à récupérer sur la ligne « Impact énergie en kWh/sec» 
- Les facteurs d’impact intrinsèques sont à récupérer en fonction de l’indicateur environnemental étudié, dans les autres lignes du tableau

<table>
<tbody>
<tr>
<td>
<p><strong>Equipement</strong></p>
</td>
<td colspan="3">
<p><strong>Mobile</strong></p>
</td>
<td colspan="10">
<p><strong>Desktop</strong></p>
</td>
</tr>
<tr>
<td>
<p><strong>Cat&eacute;gorie</strong></p>
</td>
<td>
<p>&nbsp;</p>
</td>
<td rowspan="2">
<p>Tablette</p>
</td>
<td rowspan="2">
<p>Smartphone</p>
</td>
<td>
<p>&nbsp;</p>
</td>
<td colspan="3">
<p>Laptop</p>
</td>
<td colspan="3">
<p>Ordinateur fixe (sans &eacute;cran)</p>
</td>
<td colspan="3">
<p>Ecran d'ordinateur</p>
</td>
</tr>
<tr>
<td>
<p><strong>D&eacute;tail</strong></p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>
<p>perso</p>
</td>
<td>
<p>pro</p>
</td>
<td>&nbsp;</td>
<td>
<p>perso</p>
</td>
<td>
<p>pro</p>
</td>
<td>&nbsp;</td>
<td>
<p>perso</p>
</td>
<td>
<p>pro</p>
</td>
</tr>
<tr>
<td>
<p><strong>R&eacute;partition</strong></p>
</td>
<td>&nbsp;</td>
<td>
<p><em>0,1</em></p>
</td>
<td>
<p><em>0,9</em></p>
</td>
<td>&nbsp;</td>
<td>
<p><em>0,6</em></p>
</td>
<td>
<p><em>0,545</em></p>
</td>
<td>
<p><em>0,455</em></p>
</td>
<td>
<p><em>0,4</em></p>
</td>
<td>
<p><em>0,47</em></p>
</td>
<td>
<p><em>0,53</em></p>
</td>
<td>
<p><em>0,4</em></p>
</td>
<td>
<p><em>0,47</em></p>
</td>
<td>
<p><em>0,53</em></p>
</td>
</tr>
<tr>
<td>
<p><strong>Quantit&eacute; &nbsp;d'&eacute;lectricit&eacute; n&eacute;cessaire pour le proc&eacute;d&eacute; (kWh/an)[^4]</strong></p>
</td>
<td>&nbsp;</td>
<td>
<p>18,6</p>
</td>
<td>
<p>3,9</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>
<p>30,96</p>
</td>
<td>
<p>30,96</p>
</td>
<td>&nbsp;</td>
<td>
<p>100</p>
</td>
<td>
<p>151</p>
</td>
<td>&nbsp;</td>
<td>
<p>54</p>
</td>
<td>
<p>54,5</p>
</td>
</tr>
<tr>
<td>
<p><strong>Temps d&rsquo;utilisation par jour (h/j)</strong></p>
</td>
<td>&nbsp;</td>
<td>
<p>2,60[^5]</p>
</td>
<td>
<p>3,40[^6]</p>
</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>
<p>3,15[^6]</p>
</td>
<td>
<p>8,00[^7]</p>
</td>
<td>&nbsp;</td>
<td>
<p>3,15[^5]</p>
</td>
<td>
<p>8,00[^6]</p>
</td>
<td>&nbsp;</td>
<td>
<p>3,15[^5]</p>
</td>
<td>
<p>8,00[^6]</p>
</td>
</tr>
<tr>
<td>
<p><strong>Impact &eacute;nergie en kWh/sec</strong></p>
</td>
<td>
<p>1,33E-06</p>
</td>
<td>
<p>5,44E-06</p>
</td>
<td>
<p>8,73E-07</p>
</td>
<td>
<p>1,44E-05</p>
</td>
<td>
<p>5,42E-06</p>
</td>
<td>
<p>7,48E-06</p>
</td>
<td>
<p>2,95E-06</p>
</td>
<td>
<p>1,90E-05</p>
</td>
<td>
<p>2,42E-05</p>
</td>
<td>
<p>1,44E-05</p>
</td>
<td>
<p>8,88E-06</p>
</td>
<td>
<p>1,30E-05</p>
</td>
<td>
<p>5,18E-06</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-ADPe (kg SB eq./sec)</strong></p>
</td>
<td>
<p>2,73E-11</p>
</td>
<td>
<p>3,96E-11</p>
</td>
<td>
<p>2,60E-11</p>
</td>
<td>
<p>7,40E-11</p>
</td>
<td>
<p>5,87E-11</p>
</td>
<td>
<p>5,07E-11</p>
</td>
<td>
<p>6,82E-11</p>
</td>
<td>
<p>4,50E-11</p>
</td>
<td>
<p>4,50E-11</p>
</td>
<td>
<p>4,50E-11</p>
</td>
<td>
<p>5,20E-11</p>
</td>
<td>
<p>5,20E-11</p>
</td>
<td>
<p>5,20E-11</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-AP (mol H+ eq./sec)</strong></p>
</td>
<td>
<p>5,97E-09</p>
</td>
<td>
<p>4,92E-09</p>
</td>
<td>
<p>6,09E-09</p>
</td>
<td>
<p>8,34E-09</p>
</td>
<td>
<p>7,20E-09</p>
</td>
<td>
<p>6,31E-09</p>
</td>
<td>
<p>8,28E-09</p>
</td>
<td>
<p>8,21E-09</p>
</td>
<td>
<p>8,21E-09</p>
</td>
<td>
<p>8,21E-09</p>
</td>
<td>
<p>1,84E-09</p>
</td>
<td>
<p>1,84E-09</p>
</td>
<td>
<p>1,84E-09</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-CTUe (CTUe/sec)</strong></p>
</td>
<td>
<p>1,69E-05</p>
</td>
<td>
<p>1,62E-05</p>
</td>
<td>
<p>1,69E-05</p>
</td>
<td>
<p>2,34E-05</p>
</td>
<td>
<p>2,11E-05</p>
</td>
<td>
<p>1,93E-05</p>
</td>
<td>
<p>2,31E-05</p>
</td>
<td>
<p>2,45E-05</p>
</td>
<td>
<p>2,45E-05</p>
</td>
<td>
<p>2,45E-05</p>
</td>
<td>
<p>2,29E-06</p>
</td>
<td>
<p>2,29E-06</p>
</td>
<td>
<p>2,29E-06</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-CTUh-c (CTUh/sec)</strong></p>
</td>
<td>
<p>2,08E-16</p>
</td>
<td>
<p>1,89E-16</p>
</td>
<td>
<p>2,10E-16</p>
</td>
<td>
<p>1,21E-16</p>
</td>
<td>
<p>3,00E-16</p>
</td>
<td>
<p>2,87E-16</p>
</td>
<td>
<p>3,15E-16</p>
</td>
<td>
<p>-1,50E-16</p>
</td>
<td>
<p>-1,50E-16</p>
</td>
<td>
<p>-1,50E-16</p>
</td>
<td>
<p>2,19E-18</p>
</td>
<td>
<p>2,19E-18</p>
</td>
<td>
<p>2,19E-18</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-CTUh-nc (CTUh/sec)</strong></p>
</td>
<td>
<p>7,19E-15</p>
</td>
<td>
<p>7,39E-15</p>
</td>
<td>
<p>7,17E-15</p>
</td>
<td>
<p>9,33E-15</p>
</td>
<td>
<p>8,41E-15</p>
</td>
<td>
<p>6,85E-15</p>
</td>
<td>
<p>1,03E-14</p>
</td>
<td>
<p>7,86E-15</p>
</td>
<td>
<p>7,86E-15</p>
</td>
<td>
<p>7,86E-15</p>
</td>
<td>
<p>2,85E-15</p>
</td>
<td>
<p>2,85E-15</p>
</td>
<td>
<p>2,85E-15</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-GWP (kg CO2 eq./sec)</strong></p>
</td>
<td>
<p>1,04E-06</p>
</td>
<td>
<p>8,02E-07</p>
</td>
<td>
<p>1,07E-06</p>
</td>
<td>
<p>1,46E-06</p>
</td>
<td>
<p>1,26E-06</p>
</td>
<td>
<p>1,11E-06</p>
</td>
<td>
<p>1,44E-06</p>
</td>
<td>
<p>1,46E-06</p>
</td>
<td>
<p>1,46E-06</p>
</td>
<td>
<p>1,46E-06</p>
</td>
<td>
<p>3,11E-07</p>
</td>
<td>
<p>3,11E-07</p>
</td>
<td>
<p>3,11E-07</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-IR (kg U235 eq./sec)</strong></p>
</td>
<td>
<p>1,90E-07</p>
</td>
<td>
<p>3,42E-07</p>
</td>
<td>
<p>1,73E-07</p>
</td>
<td>
<p>2,43E-06</p>
</td>
<td>
<p>5,26E-07</p>
</td>
<td>
<p>4,79E-07</p>
</td>
<td>
<p>5,83E-07</p>
</td>
<td>
<p>4,60E-06</p>
</td>
<td>
<p>4,60E-06</p>
</td>
<td>
<p>4,60E-06</p>
</td>
<td>
<p>6,94E-07</p>
</td>
<td>
<p>6,94E-07</p>
</td>
<td>
<p>6,94E-07</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-PM (Disease occurrence/sec)</strong></p>
</td>
<td>
<p>3,36E-14</p>
</td>
<td>
<p>2,77E-14</p>
</td>
<td>
<p>3,42E-14</p>
</td>
<td>
<p>5,05E-14</p>
</td>
<td>
<p>4,22E-14</p>
</td>
<td>
<p>3,71E-14</p>
</td>
<td>
<p>4,82E-14</p>
</td>
<td>
<p>5,07E-14</p>
</td>
<td>
<p>5,07E-14</p>
</td>
<td>
<p>5,07E-14</p>
</td>
<td>
<p>1,23E-14</p>
</td>
<td>
<p>1,23E-14</p>
</td>
<td>
<p>1,23E-14</p>
</td>
</tr>
<tr>
<td>
<p><strong>PEF-WU (m3 eq./sec)</strong></p>
</td>
<td>
<p>-1,31E-06</p>
</td>
<td>
<p>-8,94E-07</p>
</td>
<td>
<p>-1,35E-06</p>
</td>
<td>
<p>-1,42E-05</p>
</td>
<td>
<p>-5,76E-06</p>
</td>
<td>
<p>-5,20E-06</p>
</td>
<td>
<p>-6,44E-06</p>
</td>
<td>
<p>-2,38E-05</p>
</td>
<td>
<p>-2,38E-05</p>
</td>
<td>
<p>-2,38E-05</p>
</td>
<td>
<p>-3,08E-06</p>
</td>
<td>
<p>-3,08E-06</p>
</td>
<td>
<p>-3,08E-06</p>
</td>
</tr>
</tbody>
</table>

[^4]:La quantité d'électricité nécessaire pour le procédé et les impacts intrinsèques PEF-ADPe, PEF-AP, PEF-CTUe, PEF-CTUh-c, PEF-CTUh-nc, PEF-GWP, PEF-I, PEF-P, PEF-WU ont été extraits de la base Empreinte ADEME en décembre 2023.
[^5]:Back Flexion and Extension: The Effects of Static Posture on Children Using Mobile Devices, Regina Pope-Ford, January 2019, DOI:10.1007/978-3-319-94589-7_33, In book: Advances in Safety Management and Human Factors (pp.342-351)
[^6]:https://www.comparitech.com/tv-streaming/screen-time-statistics/ consulté en décembre 2023
[^7]:8h par jour estimé sur la base d’une journée de travail type

### Impact intrinsèque du terminal

L’impact intrinsèque du terminal s’évalue avec des facteurs propres à la nature du terminal. On a donc : 
