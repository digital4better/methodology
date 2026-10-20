import { ELECTRICITY_SOURCE } from '../electricity';

export function ModelNotice({ lang = 'fr' }: { lang?: string }) {
  const fr = lang.startsWith('fr');
  return <p>{fr ? 'Électricité d’usage : ' : 'Use-phase electricity: '}
      <a href={ELECTRICITY_SOURCE}>{fr ? 'instantané D4B, moyennes annuelles 2025' : 'D4B snapshot, 2025 annual averages'}</a>.
      {' '}{fr ? 'Le pays sélectionné concerne l’usage ; il ne relocalise pas les facteurs de fabrication.' : 'The selected country applies to use; it does not relocate manufacturing factors.'}</p>;
}
