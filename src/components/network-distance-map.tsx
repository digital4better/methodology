import React, { useEffect, useId, useRef, useState } from 'react';
import map from '../data/network-map.json';
import figureStyles from './network-illustrations.module.css';
import styles from './network-distance-map.module.css';

/** Projected geometry is bundled locally: no map provider or runtime geodata request. */
export function NetworkDistanceMap({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const fr = lang === 'fr';
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(620);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const height = width < 400 ? 385 : 440;
  const [[left, top], [right, bottom]] = map.bounds;
  const scale = Math.min((width - 48) / (right - left), (height - 40) / (bottom - top));
  const tx = width / 2 - scale * (left + right) / 2;
  const ty = (height - scale * (bottom - top)) / 2 - scale * top;
  const point = ([x, y]: number[]) => [x * scale + tx, y * scale + ty];
  const route = map.route.map(point);
  const countryNames: Record<string, string> = fr
    ? { ES: 'Espagne', FR: 'France', DE: 'Allemagne' }
    : { ES: 'Spain', FR: 'France', DE: 'Germany' };
  const countryFills: Record<string, string> = {
    ESP: styles.spain, FRA: styles.france, DEU: styles.germany,
  };
  const [mx, my] = point(map.distanceLabel);
  const boxWidth = fr ? 146 : 160;
  const compact = width < 290;
  const bx = compact ? (width - boxWidth) / 2 : Math.min(width - boxWidth - 8, mx + 24);
  // Keep the callout above the device label, including on narrow translated layouts.
  const by = compact ? height - 58 : Math.min(my + 27, route[0][1] - 50);
  const distance = Math.round(map.distanceKm).toLocaleString(fr ? 'fr-FR' : 'en-GB');
  const routePath = route.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('');
  const endpointLabels = [
    { p: route[0], text: fr ? 'Terminal' : 'Device', dy: 20 },
    { p: route[route.length - 1], text: fr ? 'Serveur' : 'Server', dy: -12 },
  ];

  return <figure className={`${figureStyles.figure} ${styles.figure}`} aria-labelledby={`${id}-caption`}>
    <figcaption id={`${id}-caption`} className={figureStyles.title}>
      {fr ? 'Du trajet physique à la distance estimée' : 'From the physical path to estimated distance'}
    </figcaption>
    <div ref={container} className={styles.canvas}>
      <svg viewBox={`0 0 ${width} ${height}`} height={height} className={styles.map}
        role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>{fr
          ? 'Trajet réseau illustratif et distances du modèle entre Espagne et Allemagne'
          : 'Illustrative network path and model distances between Spain and Germany'}</title>
        <desc id={`${id}-description`}>{fr
          ? 'La ligne bleue illustre le trajet entre les équipements, sans reproduire un itinéraire mesuré. Les pointillés corail relient les barycentres de référence sur 1 615 km. Les cercles légers matérialisent les rayons équivalents : 401 km pour l’Espagne et 337 km pour l’Allemagne. La France est visible entre les deux pays ; son barycentre n’ajoute pas une étape au calcul.'
          : 'The blue line illustrates a path through equipment, not a measured route. Coral dashes connect the reference barycentres over 1,615 km. Light circles show equivalent radii: 401 km for Spain and 337 km for Germany. France is visible between the two countries; its barycentre is not an additional step in the calculation.'}</desc>
        <defs><clipPath id={`${id}-clip`}><rect width={width} height={height} rx="6" /></clipPath></defs>
        <g clipPath={`url(#${id}-clip)`} aria-hidden="true">
          <rect width={width} height={height} className={styles.ocean} />
          <g transform={`translate(${tx},${ty}) scale(${scale})`}>
            {map.countries.map(country => <path key={country.code} d={country.path}
              className={`${styles.country} ${countryFills[country.code] || ''}`} vectorEffect="non-scaling-stroke" />)}
            {map.circles.map(circle => <g key={circle.code}>
              <path d={circle.circle} className={styles.equivalentCircle} vectorEffect="non-scaling-stroke" />
              <path d={circle.radius} className={styles.radius} vectorEffect="non-scaling-stroke" />
            </g>)}
          </g>
          <path d={routePath} className={styles.halo} />
          <path d={routePath} className={styles.route} />
          {route.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className={styles.node} />)}
          <g transform={`translate(${tx},${ty}) scale(${scale})`}>
            <path d={map.distance} className={styles.halo} vectorEffect="non-scaling-stroke" />
            <path d={map.distance} className={styles.distance} vectorEffect="non-scaling-stroke" />
          </g>
          {map.labels.map(label => {
            const [x, projectedY] = point(label.p);
            const y = label.code === 'ES' ? Math.max(projectedY, point(map.circles[0].centre)[1] + 42) : projectedY;
            return <text key={label.code} x={x} y={y} textAnchor="middle" className={styles.countryLabel}>
              {countryNames[label.code]}
            </text>;
          })}
          {endpointLabels.map(({ p: [x, y], text, dy }) =>
            <text key={text} x={x} y={y + dy} textAnchor="middle" className={styles.label}>{text}</text>)}
          {map.circles.map(circle => {
            const [x, y] = point(circle.centre);
            const [lx, ly] = point(circle.label);
            return <g key={circle.code}>
              <text x={lx} y={ly + (circle.code === 'DE' ? 20 : -9)} textAnchor="middle" className={styles.label}>
                {Math.round(circle.radiusKm)} km
              </text>
              <path d={`M${x} ${y - 9}L${x + 9} ${y}L${x} ${y + 9}L${x - 9} ${y}Z`} className={styles.barycentre} />
              <text x={circle.code === 'DE' ? x - 12 : x} y={y + 23}
                textAnchor={circle.code === 'DE' ? 'end' : 'middle'} className={styles.label}>{circle.code}</text>
            </g>;
          })}
          {!compact && <path d={`M${mx} ${my}L${bx + 10} ${by + 7}`} className={styles.leader} />}
          <rect x={bx} y={by} width={boxWidth} height="48" rx="6" className={styles.callout} />
          <text x={bx + 12} y={by + 20} className={styles.value}>{distance} km</text>
          <text x={bx + 12} y={by + 36} className={styles.valueLabel}>
            {fr ? 'entre les barycentres' : 'between barycentres'}
          </text>
        </g>
      </svg>
    </div>
    <div className={figureStyles.legend}>
      <span><i className={styles.routeKey} aria-hidden="true" />{fr ? 'Trajet réseau illustratif' : 'Illustrative network path'}</span>
      <span><i className={styles.distanceKey} aria-hidden="true" />{fr ? 'Distance interpays du modèle' : 'Model distance between countries'}</span>
      <span><i className={styles.barycentreKey} aria-hidden="true" />Barycentre</span>
      <span><i className={styles.circleKey} aria-hidden="true" />{fr ? 'Rayon équivalent du pays' : 'Equivalent country radius'}</span>
    </div>
    <p className={figureStyles.note}>{fr
      ? 'Le trait bleu représente l’acheminement entre équipements ; son tracé est illustratif, non mesuré. Le calcul s’appuie sur la distance entre barycentres et les rayons équivalents.'
      : 'The blue line represents delivery through equipment; its path is illustrative, not measured. The calculation uses the distance between barycentres and equivalent radii.'}</p>
  </figure>;
}
