import React from 'react';
import styles from './service-lifecycle.module.css';

/** A single hardware life cycle underpins the resources used in every service phase. */
export function ServiceLifecycle({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const fr = lang === 'fr';
  const phases = fr
    ? ['Conception et développement', 'Déploiement', 'Exploitation', 'Arrêt ou migration']
    : ['Design and development', 'Deployment', 'Operation', 'Retirement or migration'];
  const resources = fr
    ? ['Terminaux', 'Réseaux', 'Centres de données']
    : ['User devices', 'Networks', 'Data centres'];
  const stages = fr
    ? ['Extraction', 'Fabrication', 'Transport', 'Utilisation', 'Fin de vie']
    : ['Extraction', 'Manufacture', 'Transport', 'Use', 'End of life'];

  return <figure className={styles.diagram}>
    <p className={styles.title}><strong>
      {fr ? 'Du service au cycle de vie du matériel' : 'From services to the hardware life cycle'}
    </strong></p>
    <p className={styles.label}>{fr ? 'Phases du service' : 'Service phases'}</p>
    <ol className={styles.phases} aria-label={fr ? 'Phases du service' : 'Service phases'}>
      {phases.map(phase => <li key={phase}>{phase}</li>)}
    </ol>
    <div className={styles.bridge} aria-hidden="true" />
    <p className={styles.relation}>
      {fr ? 'À chaque phase : des ressources mobilisées' : 'Every phase uses physical resources'}
    </p>
    <ul className={styles.resources}>
      {resources.map(resource => <li key={resource}>{resource}</li>)}
    </ul>
    <p className={styles.relation}>
      <span className={styles.down} aria-hidden="true">↓</span>
      {fr ? 'Leur évaluation couvre le cycle matériel' : 'Their assessment covers the hardware life cycle'}
    </p>
    <ol className={styles.stages} aria-label={fr ? 'Cycle de vie du matériel' : 'Hardware life cycle'}>
      {stages.map((stage, index) => <li key={stage} className={index === 3 ? styles.use : undefined}>
        {stage}
      </li>)}
    </ol>
    <div className={styles.key}>
      <span><i className={styles.swatch} aria-hidden="true" />{fr ? 'Hors usage : parts attribuées' : 'Non-use phases: allocated shares'}</span>
      <span><i className={`${styles.swatch} ${styles.use}`} aria-hidden="true" />{fr ? 'Usage : impacts attribués' : 'Use: allocated impacts'}</span>
    </div>
    <figcaption>
      {fr
        ? 'Le matériel peut être partagé entre plusieurs phases et services : ses impacts sont répartis sans double comptage. L’arrêt du service ne signifie pas la fin de vie du matériel.'
        : 'Hardware may be shared across phases and services: its impacts are allocated without double counting. Retiring the service does not imply retiring its hardware.'}
    </figcaption>
    <p className={styles.iteration}>
      {fr
        ? 'Évolutions et maintenance : retour au développement, puis au déploiement.'
        : 'Updates and maintenance return to development, then deployment.'}
    </p>
  </figure>;
}
