import React, { useId, useState } from 'react';
import { structuralShare } from '../hardware-models';

export function InlineStructureExample({ lang = 'fr' }: { lang?: string }) {
  const fr = lang.startsWith('fr'), id = useId();
  const [residual, setResidual] = useState(8);
  const result = structuralShare(140, residual, 5);
  const format = (n: number) => new Intl.NumberFormat(fr ? 'fr' : 'en', {maximumFractionDigits: 1}).format(n);
  return <>
    <div className="inline-allocation-example">
      <label htmlFor={id}>{fr ? 'Complément structurel' : 'Structural residual'} : {residual} kg CO₂e</label>
      <input id={id} type="range" min="0" max="30" step="1" value={residual} onChange={e => setResidual(Number(e.target.value))} />
      <output htmlFor={id} aria-live="polite">
        {format(result.total)} kg CO₂e · {format(result.share * 100)} % {fr ? 'de structure' : 'structure'} · {format(result.annual)} kg CO₂e/{fr ? 'an' : 'year'}
      </output>
    </div>
    <small className="simulator-context">{fr
      ? 'Exemple fictif : 140 kg CO₂e de composants déjà comptés, complétés par un résiduel sans recouvrement, puis répartis sur cinq ans. Le curseur illustre la sensibilité ; il ne calibre pas le résiduel.'
      : 'Fictional example: 140 kg CO₂e of inventoried components plus a non-overlapping residual, allocated over five years. The slider illustrates sensitivity; it does not calibrate the residual.'}</small>
  </>;
}
