import React, { useId, useState } from 'react';
import { defaults, evaluateScenario } from '../scenarios';

/** A single-variable illustration using the same allocation as the fleet example. */
export function InlineAllocationExample({ lang = 'fr' }: { lang?: string }) {
  const fr = lang === 'fr';
  const id = useId();
  const [life, setLife] = useState(5);
  const result = evaluateScenario('fleet', { ...defaults('fleet'), years: 1 }, [
    { name: 'Example', quantity: 1, embodied: 200, life, energy: 0 },
  ], 0, 0);
  return <><div className="inline-allocation-example">
    <label htmlFor={id}>{fr ? 'Durée de vie de l’équipement' : 'Equipment lifetime'} : {life} {fr ? 'ans' : 'years'}</label>
    <input id={id} type="range" min="2" max="10" step="1" value={life}
      onChange={event => setLife(Number(event.target.value))} />
    <output htmlFor={id} aria-live="polite">
      {new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(result.subtotal)} kg CO₂e/{fr ? 'an de fabrication allouée' : 'year of allocated manufacturing'}
    </output>
  </div>
    <small className="simulator-context">{fr
      ? 'Exemple : un équipement fabriqué pour 200 kg CO₂e, répartis sur sa durée de vie. Usage exclu ; ce calcul ne mesure pas des émissions évitées.'
      : 'Example: 200 kg CO₂e of equipment manufacturing allocated over its lifetime. Use excluded; this calculation does not measure avoided emissions.'}</small>
  </>;
}
