# Annexes techniques

## Calcul des durées de vie réelles

### Définitions

Le terme « durée de vie » est utilisé dans les organisations pour recouvrir différentes notions. Il est important de bien distinguer de quoi on parle pour comprendre les mécanismes mis en jeu et à quel moment utiliser quelle donnée.

#### L’âge

C’est la durée depuis laquelle l’équipement est présent dans l’inventaire de l’organisation, c’est-à-dire la durée écoulée depuis sa date d’entrée dans l’inventaire et la date d’aujourd’hui, ou à défaut sa date de sortie.

#### La durée de vie réelle

Une durée totale n'est observée que lorsque l'équipement est sorti. Pour les équipements encore présents, la convention historique ci-dessous estime une durée d'allocation à partir d'un âge et d'une durée attendue. Elle ne constitue ni une moyenne statistique de durées toutes observées ni une preuve de qualité d'entretien. Voir les limites de censure dans [Temporalité](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

#### La durée de vie nominale

C’est la durée de vie minimum attendue pour un équipement qui entre dans le parc de l’organisation. Elle est fixée par l’organisation en lien avec ses ambitions et peut être revue en fonction des progrès réalisés.

La durée de vie nominale peut être utilisée dans les évaluations d’impact en l’absence des durées de vie réelles et pour mettre en place un mécanisme d’amortissement de l’impact intrinsèque.

Exemple :

- une organisation fixe la durée de vie nominale de ses smartphones à 4 ans.
- un nouveau smartphone est acheté en 2023.
- son empreinte intrinsèque sera divisée en 4 et comptabilisée dans les empreintes 2023, 2024, 2025 et 2026.
- ce calendrier décrit une écriture d'inventaire historique ; dans une ACV de service, continuer à allouer la fabrication selon la durée de vie retenue, sans la rendre nulle au seul motif que l'âge nominal est dépassé. Documenter toute révision et le traitement des exercices antérieurs.

:::note
Les durées de vie nominales peuvent être mises à jour par l’organisation, mais cela impacte le calcul d’empreintes[^1]. Ces mises à jour doivent donc rester ponctuelles et justifiées.

:::

#### Équipement vivant

Équipement recensé dans l’inventaire sans date de sortie et toujours en état de fonctionnement.

#### Équipement sorti

Équipement disposant dans l’inventaire d’une date de sortie dans l’année en cours et/ou qui n’est plus en état de fonctionnement, de façon temporaire ou définitive.

### Calcul de la durée de vie réelle d’un équipement

#### Méthodologie

Selon le contexte, la durée de vie réelle est calculée par modèle, par catégorie d’équipements, ou sur l’ensemble du parc.

La méthodologie de calcul repose sur la décomposition des équipements du parc en 4 populations. Dans chacune d’elle, on applique une règle adaptée pour déterminer la durée de vie individuelle d’un équipement du parc :

| Population | Profil | Durée de vie prise en compte |
| --- | --- | --- |
| A | Équipements vivants à la durée nominale ou au-delà | Âge |
| B | Équipements sortis avant la durée nominale | Âge à la sortie |
| C | Équipements vivants avant la durée nominale | Durée nominale[^2] |
| D | Équipements sortis à la durée nominale ou au-delà | Âge à la sortie |

La durée de vie réelle sera calculée à partir d’une moyenne des durées de vie obtenues sur les 4 populations, pondérée par le volume d’équipement relevant de chaque population.

Exemple :

Le tableau ci-dessous représente l’inventaire de 4 smartphones pour lesquels la durée nominale a été fixée à 4 ans.

| Année d’achat | Statut | Âge (an) | Durée nominale (an) | Population | Durée de vie pour le calcul |
| --- | --- | --- | --- | --- | --- |
| 2018 | Stock | 6 | 4 | A | 6 |
| 2019 | Parc | 5 | 4 | A | 5 |
| 2021 | Broke | 3 | 4 | B | 3 |
| 2022 | Parc | 2 | 4 | C | 4 |

Durée de vie moyenne par population :

- population A : `(6 + 5) / 2 = 5,5 ans/équipement`.
- population B : `3 ans/équipement`.
- population C : `4 ans/équipement`.

Durée de vie de la catégorie « smartphone » :

`(5,5 * 2 + 3 * 1 + 4 * 1) / 4 = 4,5 ans`

La durée d’allocation estimée « smartphone » est donc de `4,5 ans`.

#### Influence du matériel acheté en reconditionné

L’intérêt d’un achat en reconditionné est de prolonger la durée de vie de l’équipement et réduire ainsi les empreintes intrinsèques en freinant l’achat d’équipements neufs.

Pour parfaitement prendre en compte cette réduction d’impact, il est nécessaire de connaître la durée d’utilisation de l’équipement avant son arrivée dans l’organisation. Cette durée est ajoutée à la durée de vie individuelle et influencera ainsi la durée de vie finale du modèle.

Exemple :

Le tableau ci-dessous reprend l’exemple des smartphones vus précédemment en ajoutant un achat de modèle reconditionné en 2023, qui a déjà 3 ans d’existence.

Sa durée d’utilisation dans l’organisation étant inférieure à la durée nominale, on retient la durée nominale pour le calcul de la durée de vie. On y ajoute la durée d’utilisation avant arrivée dans l’organisation pour obtenir une durée de vie finale de 7 ans pour cet item.

| Année d’achat | Statut | Durée d’utilisation dans l’organisation (an) | Durée nominale (an) | Durée d’utilisation avant arrivée (an) | Population | Durée de vie |
| --- | --- | --- | --- | --- | --- | --- |
| 2018 | Stock | 6 | 4 | 0 | A | 6 |
| 2019 | Parc | 5 | 4 | 0 | A | 5 |
| 2021 | Broke | 3 | 4 | 0 | B | 3 |
| 2022 | Parc | 2 | 4 | 0 | C | 4 |
| 2023 | Stock | 1 | 4 | 3 | C | 7 |

La durée d'allocation estimée passe à 5 ans. Le calcul suppose que les quatre ans nominaux désignent une **seconde vie supplémentaire**, après trois ans d'usage antérieur. S'ils désignent la vie totale, l'addition serait incorrecte. Inclure les opérations de reconditionnement et préciser l'allocation entre propriétaires ; un temps en stock n'est pas un temps de service.

## Proposition autour du single score

### Cadre

Les impacts environnementaux ne permettent pas toujours à l’utilisateur d’avoir une information synthétique des résultats, ni de comparer des systèmes entre eux. Une restitution complémentaire sous forme de scores peut donc être utile. La proposition historique ci-dessous est une convention de restitution D4B sur les indicateurs sélectionnés. Elle ne représente ni l'ensemble des catégories EF, ni un modèle de dommages end-point, ni une preuve de conformité PEF.[^source-1]

Chaque sous-score regroupe alors un ou plusieurs critères :

- biodiversité, en lien avec la qualité des écosystèmes.
- santé environnementale, pour les conséquences sur la santé humaine.
- ressources, pour les éléments biotiques ou abiotiques mobilisés.
- changement climatique, pour un impact environnemental particulièrement lisible.

### Formules et calcul des scores

La normalisation et la pondération s'inspirent du principe de score EF. Les regroupements et poids adaptés ci-dessous sont **historiques et non validés pour cette version**. Leur millésime et leur compatibilité avec les facteurs utilisés doivent être établis avant activation. Aucun score agrégé n'est calculé dans les simulateurs actuels.

Normalisation des impacts :

$$
\begin{align*}
&I_{norm_i} = \frac{I_i}{C_{norm_i}}
\end{align*}
$$

Pondération des impacts normalisés :

$$
\begin{align*}
&Score = \sum_i {I_{norm_i}} \times {C_{pond_i}}
\end{align*}
$$

Le tableau ci-dessous reprend les coefficients historiques de normalisation et de pondération mobilisés dans la méthode :

| Regroupement éditorial D4B | Impacts "mid-point" | Coeff de normalisation | Coef de pondération global | Coef de pondération groupe |
| --- | --- | --- | --- | --- |
| Climat | Changement climatique total | 8,10E+03 kg CO2e | 33,33 % | 100,00 % |
| Écosystèmes (regroupement) | Acidification | 5,56E+01 mol H+eq | 9,81 % | 76,35 % |
| Écosystèmes (regroupement) | Ecotoxicité des eaux douces | 4,27E+04 CTUe | 3,04 % | 23,65 % |
| Santé (regroupement) | Toxicité humaine (non-cancérigène) | 2,30E-04 CTUh | 2,91 % | 10,26 % |
| Santé (regroupement) | Toxicité humaine (cancérigène) | 1,69E-05 CTUh | 3,37 % | 11,87 % |
| Santé (regroupement) | Emissions de particules fines | 5,95E-04 disease occ. | 14,18 % | 49,94 % |
| Santé (regroupement) | Emissions de substances ionisantes | 4,22E+03 kBq U-235 eq | 7,93 % | 27,93 % |
| Ressources (regroupement) | Utilisation de la ressource en eau | 1,15E+04 m³ eq. (méthode à confirmer) | 13,47 % | 52,99 % |
| Ressources (regroupement) | Épuisement des ressources naturelles | 6,36E-02 kg Sb eq | 11,95 % | 47,01 % |

Les unités doivent être identiques au numérateur et au dénominateur. L'incohérence IR historique (masse d'uranium contre activité équivalente en kBq) interdit d'utiliser directement les facteurs non réconciliés. Les valeurs manquantes ne doivent pas être remplacées par zéro. Les poids arrondis peuvent ne pas sommer exactement à 100 %.

### Changement d’échelle

Les scores environnementaux peuvent ensuite être définis à l’aide d’une fonction de distribution cumulative de type log-normal :

$$
\begin{align*}
&C(x) = \frac{1}{2} \times (1 - E_{rf}(\frac{ln(x)-\mu}{\sqrt{2}\times\sigma})) \\
Avec\\
&C(x) = \text{Complementary Log-Normal CDF} \\
&\mu = ln(m) = \text{Location} \\
&\sigma = \frac{\lvert ln(p_{10}) - \mu \rvert}{\sqrt{2} \times 0.9061938024368232} = \text{Shape} \\
&m = \text{Médiane}
\end{align*}
$$

Ici $E_{rf}$ désigne la fonction d'erreur, $x>0$, $m>0$, $0<p_{10}<m$ et $\sigma>0$. La fonction est une **survie log-normale** : elle vaut 0,5 en $m$ et 0,9 en $p_{10}$. Multiplier par 100 pour un affichage de 0 à 100. Les paramètres doivent provenir d'une population comparable et versionnée. Les scores négatifs issus de crédits, les valeurs nulles et les données manquantes nécessitent une convention distincte ; ne pas appliquer silencieusement $\ln(x)$ ni une valeur plancher.

Cette approche combine deux idées :

- changer de référentiel pour exprimer un impact relativement à d’autres services.
- introduire une non-linéarité entre l’échelle du score et l’échelle d’affichage.

[^1]: En reprenant l’exemple du smartphone : si on passe sa durée de vie nominale à 5 ans, son empreinte intrinsèque annuelle diminue mais doit être déclarée une année de plus.

[^2]: On suppose que les équipements de la population C auront une durée de vie réelle au moins égale à la durée de vie nominale, c’est l’ambition de l’organisation.

[^source-1]: Commission européenne, méthodologie `single score EF` Voir le [corpus documentaire](sources-et-corpus).


## Profils de génération des médias {#formules-des-profils-image-et-vidéo}

### Formules des profils image et vidéo

Le profil spatial ramène largeur et hauteur à un espace latent de facteur 8. Pour un patch de côté $p$, le nombre de positions image est :

$$
N=\left\lceil\frac{\lfloor w/8\rfloor}{p}\right\rceil
  \left\lceil\frac{\lfloor h/8\rfloor}{p}\right\rceil
$$

Pour $k$ images, $S$ étapes, $L$ couches et une dimension cachée $d$, le proxy DiT/hybride implémenté est :

$$
F=F_p+kS(2PN+4LN^2d)
$$

Le terme d’attention est explicite. L’expression reste une approximation du graphe, pas une équation universelle validée par DiT[^ai-source-2]. Les profils U-Net utilisent $F=F_p+kS\,2P\lfloor w/8\rfloor\lfloor h/8\rfloor$ ; ce proxy ne représente pas chaque convolution ni le décodage VAE.

Pour la vidéo, $k$ désigne le nombre d’images temporelles, pas le nombre de vidéos. Un profil peut arrondir ce nombre à un bloc de $b$ images : $k'=\lceil k/b\rceil b$. Avec une compression temporelle $c$, le nombre de positions devient :

$$
N_v=\left(\left\lfloor\frac{k'-1}{c}\right\rfloor+1\right)N
$$

Le proxy DiT/hybride utilise alors $F=F_p+S(2PN_v+4LN_v^2d)$. Le profil U-Net multiplie le coût spatial par $k'$. À durée identique, fréquence d’images et résolution changent donc la charge. Les résultats doivent être calibrés pour l’architecture, les étapes et le moteur d’exécution retenus.

### Formules des profils audio

La durée $t$ en secondes et la fréquence d’échantillonnage $f_s$ donnent $N_a=\lceil t f_s/c_t\rceil$ positions latentes, avec $c_t$ la réduction temporelle du profil.

- Profil autorégressif : $F=F_p+2PN_aq$, où $q$ est le nombre de codebooks du proxy.
- Profil de diffusion : $F=F_p+S(2PN_a+4LN_a^2d)$, avec les étapes et dimensions du profil.

Le multiplicateur de codebooks ne représente pas nécessairement leur exécution réelle, séquentielle ou parallèle. Le profil MusicGen demande une calibration spécifique. MusicGen[^ai-ref-1] et Stable Audio Open[^ai-ref-2] documentent les architectures, pas les émissions de ces simulations. Les codecs, le décodage et les traitements de sortie ne sont pas détaillés.

[^ai-ref-2]: [Stability AI, Stable Audio Open, 2024](https://arxiv.org/abs/2407.14358).

[^ai-source-2]: Médias : [Peebles et Xie, Scalable Diffusion Models with Transformers, 2022](https://arxiv.org/abs/2212.09748), [Clockwork Diffusion, 2023](https://arxiv.org/abs/2312.08128), [Meta, Simple and Controllable Music Generation, 2023](https://arxiv.org/abs/2306.05284), [Stability AI, Stable Audio Open, 2024](https://arxiv.org/abs/2407.14358).

[^ai-ref-1]: [Meta, Simple and Controllable Music Generation, 2023](https://arxiv.org/abs/2306.05284).

## Profils d’analyse des médias {#calcul-des-entrées-visuelles-et-audio}

### Calcul des entrées visuelles et audio

**Images et vidéo.** Le profil reprend la configuration Qwen2.5-VL[^ai-ref-3] : patches de 14 pixels, fusion spatiale 2 × 2, regroupement temporel par deux pour la vidéo, encodeur de 32 couches dont quatre à attention globale. Les dimensions traitées sont arrondies au multiple supérieur de 28 ; une image fixe est répétée pour former la paire temporelle attendue. Le rapport Qwen2.5-VL[^ai-ref-4] décrit ces mécanismes.

Avec $N=(w/14)(h/14)$ patches par image traitée et $U$ images indépendantes ou paires vidéo, le nombre de positions transmis au langage est $T_m=UN/4$. Le proxy compte les projections des patches, les projections linéaires de l’encodeur, son attention globale ou par fenêtres, puis la fusion. Une multiplication suivie d’une addition compte pour deux FLOP.

$$
F=F_{encodeur}+2P_{lang}(T_{in,effectif}+T_m+T_{out})
$$

Le cœur langage utilise environ 7,61 milliards de paramètres, séparément de l’encodeur. Le cache de préfixe réduit **le texte de la consigne seulement** : l’encodage et les positions du média restent comptés. L’attention longue du modèle de langage, les normalisations et les opérations non linéaires ne sont pas détaillées dans ce proxy.

**Audio.** La configuration Whisper base[^ai-ref-5] fixe six couches d’encodeur et six de décodeur, de dimension 512. Le prétraitement Whisper[^ai-ref-6] utilise des fenêtres de 30 secondes. Le scénario retient $C=\lceil t/30\rceil$ blocs complétés, chacun avec 1 500 positions après convolution ; une durée nulle donne zéro bloc.

Le calcul compte les convolutions d’entrée, l’encodeur, l’attention croisée et le décodage autorégressif avec cache KV. La transcription totale est répartie également entre blocs ; au-delà de 448 jetons par bloc, le scénario est signalé hors limites. Le décodage suit une seule hypothèse de texte : recherche en faisceau, essais supplémentaires, détection de silence et adaptation dynamique du découpage sont exclus.

Le découpage audio peut produire des paliers de coût : 10 et 30 secondes occupent un même bloc dans ce scénario. Le coût réel dépend du moteur, du padding et de la segmentation. Ces comptes d’opérations demandent une calibration du MFU et de la puissance ; ils ne constituent pas des benchmarks Qwen ou Whisper.

[^ai-ref-3]: [Qwen, configuration Qwen2.5-VL-7B-Instruct, commit cc594898](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/blob/cc594898137f460bfe9f0759e9844b3ce807cfb5/config.json).

[^ai-ref-5]: [OpenAI, configuration Whisper base, commit e37978b](https://huggingface.co/openai/whisper-base/blob/e37978b90ca9030d5170a5c07aadb050351a65bb/config.json).

[^ai-ref-4]: [Qwen, Qwen2.5-VL Technical Report, 2025](https://arxiv.org/abs/2502.13923).

[^ai-ref-6]: [prétraitement Whisper](https://github.com/openai/whisper/blob/main/whisper/audio.py).
