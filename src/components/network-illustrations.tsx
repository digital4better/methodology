import React, { useId } from 'react';
import styles from './network-illustrations.module.css';

type LocaleProps = { lang?: 'fr' | 'en' };

function Icon({ kind }: { kind: 'device' | 'network' | 'server' | 'cache' }) {
  return <svg viewBox="0 0 64 48" className={styles.icon} aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'device' && <>
        <rect x="3" y="5" width="39" height="27" rx="3" /><path d="M22 32v9m-11 0h22" />
        <rect x="46" y="14" width="15" height="29" rx="3" /><path d="M52 37h3" />
      </>}
      {kind === 'network' && <>
        <path d="M12 24L32 9l20 15-20 15-20-15h40M32 9v30" />
        {[ [12, 24], [32, 9], [52, 24], [32, 39] ].map(([x,y]) =>
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="var(--ifm-background-surface-color)" />)}
      </>}
      {kind === 'server' && <>
        {[4,19,34].map(y => <g key={y}><rect x="10" y={y} width="44" height="11" rx="3" /><path d={`M17 ${y+5.5}h1m7 0h1m10 0h11`} /></g>)}
      </>}
      {kind === 'cache' && <>
        <ellipse cx="32" cy="9" rx="21" ry="7" /><path d="M11 9v28c0 9 42 9 42 0V9M11 23c0 9 42 9 42 0" />
        <path d="M25 29h14m-5-5 5 5-5 5" />
      </>}
    </g>
  </svg>;
}

export function WebBoundaryFigure({ lang = 'fr' }: LocaleProps) {
  const fr = lang === 'fr', id = useId();
  const items = [
    {kind: 'device' as const, title: fr ? 'Terminaux' : 'User devices',
      text: fr ? 'Fabrication allouée et électricité pendant l’usage.' : 'Allocated manufacture and electricity during use.'},
    {kind: 'network' as const, title: fr ? 'Réseaux' : 'Networks',
      text: fr ? 'Accès, transit et livraison CDN dans la frontière retenue.' : 'Access, transit and CDN delivery within the selected boundary.'},
    {kind: 'server' as const, title: fr ? 'Hébergement et tiers' : 'Hosting and third parties',
      text: fr ? 'Ressources physiques allouées aux applications, VM et services tiers.' : 'Physical resources allocated to applications, VMs and third-party services.'},
  ];
  return <figure className={styles.figure} aria-labelledby={id}>
    <figcaption id={id} className={styles.title}>{fr ? 'Périmètre d’un service web' : 'Web service boundary'}</figcaption>
    <div className={`${styles.cards} ${styles.sum}`}>
      {items.map(item => <div className={styles.card} key={item.kind}>
        <Icon kind={item.kind} /><strong>{item.title}</strong><p>{item.text}</p>
      </div>)}
    </div>
    <p className={styles.result}>{fr
      ? 'Une somme par indicateur, pour la même fonction et la même période.'
      : 'A sum for each indicator, for the same function and period.'}</p>
    <p className={styles.note}>{fr
      ? 'Une VM est une part de matériel physique. Un service tiers déjà inclus dans un poste ne s’ajoute pas une seconde fois.'
      : 'A VM is a share of physical hardware. A third-party service already included in a contribution is not added again.'}</p>
  </figure>;
}

export { NetworkDistanceMap as NetworkDistanceFigure } from './network-distance-map';

export function CdnTrafficFigure({ lang = 'fr' }: LocaleProps) {
  const fr = lang === 'fr', id = useId(), unit = fr ? 'Go' : 'GB';
  return <figure className={styles.figure} aria-labelledby={id}>
    <figcaption id={id} className={styles.title}>{fr ? 'Effet du cache sur les volumes transférés' : 'Effect of caching on transferred data volumes'}</figcaption>
    <p className={styles.intro}>{fr
      ? 'Exemple : 200 Go de contenu livrés, dont 80 % des octets sont disponibles en cache.'
      : 'Example: 200 GB of delivered content, with 80% of bytes available in cache.'}</p>
    <div className={`${styles.cards} ${styles.flow}`}>
      <div className={styles.card}><Icon kind="server" /><strong>{fr ? 'Serveur d’origine' : 'Origin server'}</strong>
        <b className={styles.quantity}>40 {unit}</b><p>{fr ? 'transférés vers le CDN' : 'transferred to the CDN'}</p></div>
      <div className={styles.card}><Icon kind="cache" /><strong>{fr ? 'Cache CDN' : 'CDN cache'}</strong>
        <b className={styles.quantity}>160 + 40 {unit}</b><p>{fr ? 'en cache + reçus de l’origine' : 'cached + received from origin'}</p></div>
      <div className={styles.card}><Icon kind="device" /><strong>{fr ? 'Lecteurs' : 'Readers'}</strong>
        <b className={styles.quantity}>200 {unit}</b><p>{fr ? 'toujours livrés aux terminaux' : 'still delivered to user devices'}</p></div>
    </div>
    <p className={styles.result}>{fr
      ? 'Origine → CDN : 200 × (1 − 0,80) = 40 Go. CDN → lecteurs : 200 Go.'
      : 'Origin → CDN: 200 × (1 − 0.80) = 40 GB. CDN → readers: 200 GB.'}</p>
    <p className={styles.note}>{fr
      ? 'Exemple de volumes, pas de gain d’impact calculé. Le stockage et le calcul du CDN restent à évaluer. Hypothèses : contenu identique, cache déjà alimenté, hors requêtes et revalidation. Les deux trajets demandent des facteurs compatibles avec leurs frontières.'
      : 'Traffic example, not a calculated impact saving. CDN storage and computation still require assessment. Assumptions: identical content, a warm cache, excluding requests and revalidation. Both paths require factors with matching boundaries.'}</p>
  </figure>;
}
