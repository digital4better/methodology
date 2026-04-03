import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'index',
        'introduction/comment-lire-cette-methodologie',
        'introduction/positionnement-par-rapport-aux-referentiels-existants',
      ],
    },
    {
      type: 'category',
      label: 'Fondations',
      items: [
        'fondations/principes-acv-appliques-au-numerique',
        'fondations/perimetre-frontieres-services-tiers-et-unite-d-analyse',
        'fondations/indicateurs-environnementaux',
        'fondations/impacts-de-la-consommation-d-energie',
      ],
    },
    {
      type: 'category',
      label: 'Règles',
      items: [
        'regles/allocation-et-partage-des-impacts',
        'regles/double-comptabilisation',
        'regles/temporalite-vieillissement-et-versionnement-des-donnees',
        'regles/qualite-des-donnees-et-matrice-de-robustesse',
        'regles/prise-en-compte-des-couches-logicielles-et-de-la-virtualisation',
        'regles/hypotheses-valeurs-par-defaut-et-hierarchie-des-sources',
      ],
    },
    {
      type: 'category',
      label: 'Modélisation',
      items: [
        'modelisation/strategies-de-modelisation',
        'modelisation/modelisation-d-un-equipement',
        'modelisation/modelisation-d-un-service',
      ],
    },
    {
      type: 'category',
      label: 'Matériel',
      items: [
        'materiel/vue-d-ensemble-du-materiel',
        {
          type: 'category',
          label: 'Matériaux',
          items: [
            'materiel/materiaux/semi-conducteurs',
            'materiel/materiaux/materiaux-critiques',
          ],
        },
        {
          type: 'category',
          label: 'Composants',
          items: [
            'materiel/composants/processeurs-et-accelerateurs',
            'materiel/composants/memoire-vive',
            'materiel/composants/stockage',
            'materiel/composants/affichage',
            'materiel/composants/alimentation-et-batterie',
            'materiel/composants/elements-structurels',
          ],
        },
        {
          type: 'category',
          label: 'Équipements',
          items: [
            'materiel/equipements/terminaux',
            'materiel/equipements/serveurs',
            'materiel/equipements/equipements-reseau-actifs',
          ],
        },
        {
          type: 'category',
          label: 'Réseau et infrastructure',
          items: [
            'materiel/reseau-et-infrastructure/reseau-d-acces-mobile-ran',
            'materiel/reseau-et-infrastructure/reseau-lan',
            'materiel/reseau-et-infrastructure/reseau-wan',
            'materiel/reseau-et-infrastructure/cdn-et-caches',
            'materiel/reseau-et-infrastructure/datacenter',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Cas d’usage',
      items: [
        {
          type: 'category',
          label: 'Environnements',
          items: [
            'cas-d-usage/environnements/parc-informatique',
            'cas-d-usage/environnements/infrastructure-d-hebergement',
            'cas-d-usage/environnements/cloud',
          ],
        },
        {
          type: 'category',
          label: 'Services',
          items: [
            'cas-d-usage/services/service-web',
            'cas-d-usage/services/mail',
            'cas-d-usage/services/mobile',
            'cas-d-usage/services/ia-generative',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Références',
      items: [
        'references/glossaire',
        'references/sources-et-corpus',
        'references/registre-des-hypotheses-et-valeurs-par-defaut',
        'references/processus-de-mise-a-jour',
        'references/annexes-techniques',
      ],
    },
  ],
};

export default sidebars;
