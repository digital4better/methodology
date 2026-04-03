# Positionnement par rapport aux référentiels existants

## En bref

Cette méthode n'est ni une rupture totale ni une simple synthèse. Elle reprend des acquis solides de plusieurs référentiels et les assemble dans une structure plus modulaire, plus explicite sur les hypothèses et plus progressive dans la lecture. Cette page clarifie ce qui est repris, ce qui est adapté et ce qui est nouveau.

## Cartographie des référentiels

Le paysage des méthodologies d'évaluation environnementale du numérique est riche mais fragmenté. Le tableau ci-dessous positionne les principaux référentiels selon leur couverture :

| Référentiel | Couverture | Forces | Limites |
|---|---|---|---|
| **ADEME / ARCEP (RCP mère)** | Services numériques FR | Cadre normatif officiel, multicritère, 3 tiers | Granularité limitée pour certains équipements, centré France |
| **Boavizta** | Matériel (composants, équipements) | Décomposition matérielle fine, open source | Couverture partielle des cas d'usage, pas de cadrage service |
| **GreenIT** | Sensibilisation, cas d'usage concrets | Pédagogie, sobriété numérique | Peu de formalisme méthodologique |
| **Green Software Foundation (SCI)** | Intensité carbone logicielle | Frontières explicites, unité d'analyse claire | Mono-indicateur (carbone), peu de matériel |
| **PAIA (MIT)** | Électronique grand public | Modèle paramétrique transparent | Centré produit, pas de service |
| **IMEC NetZero** | Semi-conducteurs, composants | Profondeur technique sur la fabrication | Très spécialisé, peu accessible |
| **Cloud Carbon Footprint** | Cloud (IaaS) | Coefficients de puissance par composant, open source | Mono-indicateur (carbone), centré cloud |
| **UBA Green Cloud Computing** | Cloud et datacenters | Allocation par ressources virtuelles, multicritère | Centré Allemagne, approche datacenter |

## Ce que cette méthode reprend

### Du cadre ADEME / ARCEP

- Le **cadrage ACV** appliqué au numérique (ISO 14040/14044) ;
- la lecture **multicritère** à 9 indicateurs mid-point ;
- la structuration en **trois tiers** : terminaux, réseaux, centres informatiques ;
- la distinction **approche équipement / approche système** selon le niveau de maîtrise du périmètre.

### De Boavizta

- L'attention à la **décomposition matérielle** : la chaîne matériaux → composants → équipements ;
- la logique **composant vers équipement** plutôt que facteur forfaitaire unique ;
- l'importance de distinguer **modèles explicatifs et facteurs forfaitaires** ;
- la transparence des données et le choix de l'**open source**.

### Du Green Cloud Computing (UBA)

- L'**allocation par ressources virtuelles** (vCPU, vDisk, vNIC) pour les environnements virtualisés ;
- la prise en compte de l'**infrastructure support** (PUE, refroidissement) via une allocation composite ;
- l'approche **multicritère** (GWP, ADP, CED, eau).

### De la Green Software Foundation (SCI)

- Le besoin de **frontières explicites** pour chaque évaluation ;
- la clarification de l'**unité d'analyse** et son lien avec la fonction rendue ;
- la relation directe entre **usage, infrastructure et impact**.

### De GreenIT

- L'attention aux **cas d'usage concrets** et au parcours utilisateur ;
- l'importance de la **sobriété** comme levier de réduction ;
- la nécessité d'un **discours accessible** au-delà des spécialistes ACV.

## Ce que cette méthode adapte

| Dimension | Ce qui existe | Ce que cette méthode fait différemment |
|---|---|---|
| **Structure documentaire** | Souvent monolithique ou implicite | Séparation explicite en Fondations, Règles, Modélisation, Matériel, Cas d'usage |
| **Allocation** | Souvent implicite dans les facteurs | Règles d'allocation documentées et justifiées ([Allocation](../regles/allocation-et-partage-des-impacts)) |
| **Double comptabilisation** | Rarement traitée formellement | Matrice de frontière et protocole de vérification ([Double comptabilisation](../regles/double-comptabilisation)) |
| **Qualité des données** | Souvent absente ou binaire | Matrice de robustesse à 6 dimensions ([Qualité des données](../regles/qualite-des-donnees-et-matrice-de-robustesse)) |
| **Temporalité** | Peu explicitée | 4 dimensions temporelles, correction TL/RL, versionnement ([Temporalité](../regles/temporalite-vieillissement-et-versionnement-des-donnees)) |
| **Matériaux** | Absents ou réduits à un facteur | Section dédiée (semi-conducteurs, matériaux critiques) en amont des composants |
| **Hypothèses** | Dispersées ou cachées | Registre central unique ([Registre](../references/registre-des-hypotheses-et-valeurs-par-defaut)) |

## Ce qui la différencie

1. **Architecture modulaire** conçue pour plusieurs profils de lecture (découverte, cadrage, implémentation).
2. **Registre central** d'hypothèses et de valeurs par défaut, évitant la dispersion.
3. **Lien explicite** avec le référentiel de données [`digital4better/data`](https://github.com/digital4better/data) comme source canonique versionnée.
4. **Chaîne matérielle complète** : matériaux → composants → équipements → infrastructure → service.
5. **Couches méthodologiques rendues visibles** : allocation, double comptabilisation, robustesse, temporalité — souvent implicites ailleurs.

## Hypothèses et limites

- Cette page positionne la méthode à un niveau éditorial et méthodologique ; elle ne prétend pas faire une comparaison normative exhaustive de tous les référentiels.
- Les convergences et divergences devront être enrichies au fil des révisions, notamment lorsque de nouveaux référentiels seront publiés.
- Certains référentiels (PAIA, IMEC) couvrent des périmètres très spécialisés qui ne sont que partiellement repris dans cette méthode.

## Données mobilisées

- Corpus de référence `inputs/md` (Pathfinder Framework, Green Cloud Computing UBA, PAIA)
- Documentation Boavizta et SCI

## Sources

- [Boavizta Documentation](https://doc.api.boavizta.org/)
- [Green Software Foundation SCI](https://sci.greensoftware.foundation/)
- [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/docs/methodology/)
- Référentiel ADEME / ARCEP sur les services numériques
- [IMEC NetZero](https://www.imec-int.com/en/expertise/netzero)
- Corpus `inputs/md`
