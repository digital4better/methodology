import React, { useId } from 'react';
import Link from '@docusaurus/Link';
import styles from './method-illustrations.module.css';

type Kind = 'rag' | 'mfu' | 'accelerator' | 'double-counting' | 'second-life'
  | 'virtualization' | 'pue' | 'native-app' | 'missing-data'
  | 'water' | 'input-media' | 'combined-media' | 'network-factor' | 'operating-states' | 'mail-campaign'
  | 'application-scope' | 'third-party-scope' | 'cloud-billing' | 'cloud-monetary';
type Props = { kind: Kind; lang?: 'fr' | 'en' };

/** Static teaching examples. They do not provide factors to the calculation models. */
export function MethodIllustration({ kind, lang = 'fr' }: Props) {
  const id = useId();
  const t = (fr: string, en: string) => lang === 'fr' ? fr : en;
  const arrow = <span className={styles.arrow} aria-hidden="true">→</span>;
  let title: string;
  let note: React.ReactNode;
  let content: React.ReactNode;

  switch (kind) {
    case 'cloud-monetary':
      title = t('Faut-il utiliser un facteur monétaire ?', 'Should a monetary factor be used?');
      note = t('Pour un service sans correspondance matérielle. L’estimation est identifiée séparément, puis remplacée par le calcul matériel lorsqu’il devient disponible, sans cumul.',
        'For a service without a hardware mapping. The estimate is reported separately, then replaced by the hardware calculation when available, without adding both.');
      content = <div className={styles.decisionTree}>
        <div className={styles.decisionRow}>
          <strong className={styles.decisionQuestion}>{t('Licence, support ou frais sans activité matérielle ?', 'Licence, support or charges without hardware activity?')}</strong>
          <div className={styles.decisionExit}>
            <span className={styles.decisionAnswer}>{t('Oui', 'Yes')} <span aria-hidden="true">→</span></span>
            <span>{t('Exclus de ce calcul monétaire', 'Excluded from this monetary calculation')}</span>
          </div>
        </div>
        <div className={styles.decisionNext}>{t('Non', 'No')} <span aria-hidden="true">↓</span></div>
        <div className={styles.decisionRow}>
          <strong className={styles.decisionQuestion}>{t('Facteur adapté au service et à l’indicateur disponible ?', 'Suitable factor available for the service and indicator?')}</strong>
          <div className={styles.decisionExit}>
            <span className={styles.decisionAnswer}>{t('Non', 'No')} <span aria-hidden="true">→</span></span>
            <span>{t('Impact non évalué', 'Impact unassessed')}</span>
          </div>
        </div>
        <div className={styles.decisionNext}>{t('Oui', 'Yes')} <span aria-hidden="true">↓</span></div>
        <div className={styles.decisionResult}>
          <strong>{t('Estimation monétaire provisoire', 'Interim monetary estimate')}</strong>
          <span>{t('Dépense × facteur de l’indicateur', 'Spending × indicator factor')}</span>
        </div>
      </div>;
      break;
    case 'cloud-billing':
      title = t('Relier les usages cloud aux impacts', 'Connecting cloud usage to impacts');
      note = t('Une ligne est évaluée par une seule voie. La correspondance matérielle remplace l’estimation monétaire dès qu’elle devient disponible.',
        'Each line is assessed through one route. Hardware mapping replaces the monetary estimate when available.');
      content = <>
        <ol className={styles.steps}>
          {[
            ['write', t('Facturation et usage', 'Billing and usage'), t('Service, région, quantité, durée', 'Service, region, quantity, duration')],
            ['server', t('Matériel associé', 'Mapped hardware'), t('Parts de CPU, RAM, stockage ou GPU', 'Shares of CPU, RAM, storage or GPU')],
            ['power', t('Énergie et fabrication', 'Energy and manufacture'), t('Consommation et fabrication allouées', 'Allocated consumption and manufacture')],
            ['check', t('Impacts', 'Impacts'), t('Facteurs compatibles, par indicateur', 'Compatible factors for each indicator')],
          ].map(([icon, label, detail]) => <li key={icon}>
            <span className={styles.symbol}><Symbol name={icon} /></span>
            <span><strong>{label}</strong><span className={styles.stepDetail}>{detail}</span></span>
          </li>)}
        </ol>
        <div className={styles.cloudFallback}>
          <strong>{t('Service non reconnu : estimation provisoire', 'Unmapped service: interim estimate')}</strong>
          <span>{t('Dépense admissible × facteur monétaire → impact estimé', 'Eligible spend × monetary factor → estimated impact')}</span>
          <span>{t('Licences et support exclus de cette voie. Sans facteur adapté : impact non évalué.', 'Licences and support excluded from this route. Without a suitable factor: impact unassessed.')}</span>
        </div>
      </>;
      break;
    case 'application-scope':
      title = t('Assembler l’évaluation d’une application', 'Assembling an application assessment');
      note = t('Seules les contributions non déjà couvertes sont ajoutées. Un hébergement partagé est compté une fois, puis réparti entre les usages.',
        'Only contributions not already covered are added. Shared hosting is counted once, then allocated across uses.');
      content = <>
        <div className={styles.scopeSum}>
          <div className={styles.scopeContribution}>
            <Symbol name="monitor" />
            <strong>{t('Impacts par parcours × volumes', 'Impacts per journey × volumes')}</strong>
            <span>{t('Pages vues · sessions · requêtes', 'Page views · sessions · requests')}</span>
          </div>
          <span className={styles.scopePlus} aria-label={t('plus', 'plus')}>+</span>
          <div className={styles.scopeContribution}>
            <Symbol name="server" />
            <strong>{t('Contributions complémentaires', 'Additional contributions')}</strong>
            <span>{t('Arrière-plan · ressources communes · développement', 'Background processing · shared resources · development')}</span>
          </div>
        </div>
        <Down />
        <div className={styles.destination}>
          <strong>{t('Application sur la période étudiée', 'Application over the study period')}</strong>
          <span>{t('Fonctions, utilisateurs et contextes d’usage couverts', 'Functions, users and usage contexts covered')}</span>
        </div>
      </>;
      break;
    case 'third-party-scope':
      title = t('La frontière suit le service rendu', 'The boundary follows the service delivered');
      note = t('Trait plein : inclus dans l’étude. Pointillés : hors périmètre, sans contribution au scénario. Une prestation externalisée peut rester dans le périmètre.',
        'Solid border: included in the study. Dashed border: outside the boundary, with no contribution to the scenario. Outsourced services can remain within the boundary.');
      content = <>
        <div className={styles.scopeIncluded}>
          <strong>{t('Dans le périmètre du service étudié', 'Within the assessed service boundary')}</strong>
          <p>{t('Services nécessaires ou exécutés dans le scénario', 'Services required or executed in the scenario')}</p>
          <div className={styles.scopeServices}>
            {[
              [t('API métier', 'Business API'), t('Ex. paiement d’une commande', 'E.g. payment for an order'), t('Impact non évalué', 'Impact not assessed')],
              [t('SaaS intégré', 'Integrated SaaS'), t('Une étape du parcours', 'A step in the user journey')],
              [t('Modèle IA externe', 'External AI model'), t('Traitement de la requête', 'Request processing')],
              ['CDN / DNS', t('Distribution et accès au service', 'Service delivery and access')],
            ].map(([label, detail, status]) => <div key={label}>
              <strong>{label}</strong><span>{detail}</span>
              {status && <span className={styles.scopeStatus}>
                <strong>{status}</strong>
                <span>{t('Données manquantes dans cet exemple', 'Missing data in this example')}</span>
              </span>}
            </div>)}
          </div>
        </div>
        <div className={styles.scopeExcluded}>
          <strong>{t('Hors périmètre', 'Outside the boundary')}</strong>
          <span>{t('Ex. outil RH sans lien avec le parcours étudié et non sollicité', 'E.g. an HR tool unrelated to the assessed journey and not used')}</span>
        </div>
      </>;
      break;
    case 'rag':
      title = t('Contributions au cycle de vie d’une tâche RAG', 'Life-cycle contributions of a RAG task');
      note = t('Exemple RAG simplifié. Outils et nouvelles tentatives complètent le parcours si nécessaire.',
        'Simplified RAG example. Tools and retries extend the sequence when needed.');
      content = <>
        <div className={styles.shared}>
          <span>{t('Entraînement du modèle', 'Model training')}</span>
          <span>{t('Indexation des documents', 'Document indexing')}</span>
        </div>
        <div className={styles.allocation}><span aria-hidden="true">↓</span> {t('Une part attribuée à la tâche', 'A share allocated to the task')}</div>
        <ol className={styles.steps}>
          {[
            ['question', t('Question', 'Question')],
            ['search', t('Recherche', 'Retrieval')],
            ['chip', t('Modèle IA', 'AI model')],
            ['check', t('Tâche achevée', 'Completed task')],
          ].map(([icon, label]) => <li key={icon}>
            <span className={`${styles.symbol} ${icon === 'chip' ? styles.selected : ''}`}><Symbol name={icon} /></span>
            <span>{label}</span>
          </li>)}
        </ol>
        <div className={styles.support}>
          {[
            t('Matériel', 'Hardware'), t('Électricité', 'Electricity'),
            t('Réseau', 'Network'), t('Stockage', 'Storage'),
          ].map(label => <span key={label}>{label}</span>)}
        </div>
      </>;
      break;
    case 'mfu':
      title = t('Du débit théorique au débit utile', 'From theoretical to useful throughput');
      note = <>{t('Exemple pédagogique. Le ', 'Teaching example. ')}
        <Link to={'/v2-beta/references/glossaire#mfu'}>MFU</Link>
        {t(' décrit le débit de calcul, pas la proportion de puissance électrique consommée.',
          ' describes compute throughput, not the share of electrical power consumed.')}</>;
      content = <>
        <div className={styles.mfu}>
          <div className={styles.rate}><strong>100</strong><span>{t('TFLOP/s théoriques', 'theoretical TFLOP/s')}</span></div>
          <div className={styles.factor}><span><Link to={'/v2-beta/references/glossaire#mfu'}>MFU</Link> = {t('0,4', '0.4')}</span>{arrow}</div>
          <div className={`${styles.rate} ${styles.useful}`}><strong>40</strong><span>{t('TFLOP/s utiles', 'useful TFLOP/s')}</span></div>
        </div>
        <div className={styles.constraints}>{t('Mémoire · échanges entre GPU · dépendances', 'Memory · GPU communication · dependencies')}</div>
        <div className={styles.conclusion}>400 TFLOP ÷ 40 TFLOP/s = <strong>10 {t('secondes', 'seconds')}</strong></div>
      </>;
      break;
    case 'combined-media':
      title = t('Deux façons de combiner les médias', 'Two ways to combine media');
      note = t('Dans une architecture conjointe, le média d’entrée peut conditionner chaque étape de génération. Son coût ne se déduit pas de la somme de deux profils indépendants.',
        'In a joint architecture, input media can condition every generation step. Its cost cannot be inferred by adding two independent profiles.');
      content = <>
        <p className={styles.pathLabel}>{t('Étapes séparées : exemple du doublage', 'Separate stages: dubbing example')}</p>
        <ol className={`${styles.steps} ${styles.activities}`}>
          {[
            ['audio', t('Audio source', 'Source audio'), t('Transcription', 'Transcription')],
            ['write', t('Texte', 'Text'), t('Traduction', 'Translation')],
            ['audio', t('Audio traduit', 'Translated audio'), t('Synthèse vocale', 'Speech generation')],
          ].map(([icon, label, detail], index) => <li key={index}>
            <span className={styles.activitySymbol}><Symbol name={icon} /></span>
            <strong>{label}</strong><small>{detail}</small>
          </li>)}
        </ol>
        <div className={styles.conclusion}>{t('Chaque traitement est compté une seule fois.', 'Each processing stage is counted once.')}</div>
        <p className={styles.pathLabel}>{t('Modèle conjoint : exemple de la vidéo guidée par une image', 'Joint model: image-guided video example')}</p>
        <ol className={`${styles.steps} ${styles.activities}`}>
          {[
            ['images', t('Image + consigne', 'Image + instruction'), t('Conditionnement', 'Conditioning')],
            ['chip', t('Modèle conjoint', 'Joint model'), t('Génération conditionnée', 'Conditioned generation')],
            ['film', t('Vidéo générée', 'Generated video'), t('Sortie', 'Output')],
          ].map(([icon, label, detail], index) => <li key={index}>
            <span className={styles.activitySymbol}><Symbol name={icon} /></span>
            <strong>{label}</strong><small>{detail}</small>
          </li>)}
        </ol>
      </>;
      break;
    case 'accelerator':
      title = t('Composition d’une carte accélératrice', 'Accelerator card components');
      note = t('Un inventaire de carte complète remplace les composants qu’il couvre ; il ne s’y ajoute pas. Schéma sans architecture particulière ni proportions d’impact.',
        'A full-card inventory replaces the components it covers; it is not added to them. This schematic represents no specific architecture or impact shares.');
      content = <div className={styles.board}>
        <div className={styles.boardName}>{t('Carte accélératrice', 'Accelerator card')}</div>
        <div className={styles.chipZone}>
          <Memory label={t('Mémoire', 'Memory')} />
          <div className={styles.die}>{t('Puce', 'Compute')}<small>{t('de calcul', 'die')}</small></div>
          <Memory label={t('Mémoire', 'Memory')} />
        </div>
        <div className={styles.auxiliary}>{t('Carte électronique · alimentation · refroidissement', 'Circuit board · power supply · cooling')}</div>
      </div>;
      break;
    case 'double-counting':
      title = t('Le service est déjà une part du total', 'The service is already part of the total');
      note = t('Exemple pédagogique, pour une même période et un même indicateur.',
        'Teaching example, for the same period and indicator.');
      content = <>
        <div className={styles.totalLabel}><span>Infrastructure</span><strong>100 kg CO₂e</strong></div>
        <div className={styles.totalBar}>
          <div className={styles.service}>25</div><div className={styles.rest}>75</div>
        </div>
        <div className={styles.barLabels}><span>Service</span><span>{t('Autres usages', 'Other uses')}</span></div>
        <div className={styles.conclusion}>{t('25 kg CO₂e déjà compris dans les 100 kg CO₂e', '25 kg CO₂e already included in the 100 kg CO₂e')}</div>
      </>;
      break;
    case 'second-life':
      title = t('Durée de vie retenue après reconditionnement', 'Assumed lifetime after refurbishment');
      note = t('Une durée estimée, pas sept années déjà observées. Le reconditionnement reste à inventorier.',
        'An estimated lifetime, not seven years already observed. Refurbishment still needs to be inventoried.');
      content = <>
        <div className={styles.lifeLabels}><span>{t('Première vie', 'First life')}</span><span>{t('Seconde vie', 'Second life')}</span></div>
        <div className={styles.lifeBar}>
          <div className={styles.past}><strong>3 {t('ans', 'years')}</strong><span>{t('connus', 'known')}</span></div>
          <div className={styles.future}><strong>4 {t('ans', 'years')}</strong><span>{t('attendus', 'expected')}</span></div>
        </div>
        <div className={styles.arrival}><span aria-hidden="true">↑</span>{t('Arrivée dans l’organisation', 'Arrival in the organisation')}</div>
        <div className={styles.conclusion}><strong>7 {t('ans', 'years')}</strong> {t('retenus dans le scénario', 'assumed in this scenario')}</div>
      </>;
      break;
    case 'virtualization':
      title = t('Partage d’un serveur physique', 'Sharing a physical server');
      note = t('La clé d’allocation dépend de la ressource. Les VM ne s’ajoutent pas à l’inventaire matériel de leur hôte.',
        'The allocation key depends on the resource. VMs are not added to their host’s physical inventory.');
      content = <>
        <div className={styles.virtuals}><span>VM A</span><span>VM B</span></div>
        <div className={styles.connections} aria-hidden="true"><span>↓</span><span>↓</span></div>
        <div className={styles.host}>
          <strong>{t('Serveur physique', 'Physical server')}</strong>
          <div className={styles.resources}><span>CPU</span><span>{t('Mémoire', 'Memory')}</span><span>{t('Stockage', 'Storage')}</span></div>
        </div>
        <div className={styles.conclusion}>{t('Chaque VM reçoit une part des ressources physiques.', 'Each VM is allocated a share of physical resources.')}</div>
      </>;
      break;
    case 'pue':
      title = t('Électricité totale du datacenter', 'Total data centre electricity');
      note = t('Le PUE s’applique à l’électricité IT. Il ne multiplie pas les impacts de fabrication.',
        'PUE applies to IT electricity. It does not multiply manufacturing impacts.');
      content = <>
        <div className={styles.totalLabel}><span>{t('Exemple avec un PUE de 1,2', 'Example with PUE of 1.2')}</span><strong>{t('1 200', '1,200')} kWh</strong></div>
        <div className={styles.electricityBar}>
          <div className={styles.it}>{t('1 000', '1,000')}</div><div className={styles.aux}>200</div>
        </div>
        <div className={styles.legend}>
          <span><i className={styles.navy} />{t('Équipements IT', 'IT equipment')}</span>
          <span><i className={styles.sand} />{t('Auxiliaires du site', 'Site auxiliaries')}</span>
        </div>
        <div className={styles.conclusion}>{t('1 000 kWh IT × 1,2 = 1 200 kWh au total', '1,000 kWh IT × 1.2 = 1,200 kWh in total')}</div>
      </>;
      break;
    case 'native-app':
      title = t('Activités d’une application mobile', 'Mobile application activities');
      note = t('Parcours schématique, sans échelle de durée. Les mises à jour s’ajoutent lorsqu’elles sont effectivement téléchargées.',
        'Schematic sequence, with no time scale. Updates are added when they are actually downloaded.');
      content = <>
        <ol className={`${styles.steps} ${styles.activities}`}>
          {[
            ['download', t('Installation', 'Installation'), t('Téléchargement', 'Download')],
            ['phone', t('Session', 'Session'), t('Écran et traitements', 'Screen and processing')],
            ['sync', t('Arrière-plan', 'Background'), t('Synchronisation', 'Synchronisation')],
          ].map(([icon, label, detail]) => <li key={icon}>
            <span className={styles.activitySymbol}><Symbol name={icon} /></span>
            <strong>{label}</strong><small>{detail}</small>
          </li>)}
        </ol>
        <div className={styles.conclusion}>{t('L’activité peut continuer après l’extinction de l’écran.', 'Activity may continue after the screen turns off.')}</div>
      </>;
      break;
    case 'missing-data':
      title = t('Restitution d’un résultat partiel', 'Reporting a partial result');
      note = t('Exemple fictif sur une même période. Le réseau reste à évaluer ; le total complet est inconnu.',
        'Fictitious example for the same period. The network still needs assessment; the complete total is unknown.');
      content = <>
        <div className={styles.coverage}>
          <div><span>{t('Terminaux', 'Devices')}</span><strong>8</strong><small>kg CO₂e</small></div>
          <div><span>{t('Hébergement', 'Hosting')}</span><strong>12</strong><small>kg CO₂e</small></div>
          <div className={styles.unknown}><span>{t('Réseau', 'Network')}</span><strong aria-hidden="true">?</strong><small>{t('Non évalué', 'Not assessed')}</small></div>
        </div>
        <div className={styles.conclusion}>{t('Sous-total connu', 'Known subtotal')} : <strong>20 kg CO₂e</strong></div>
      </>;
      break;
    case 'water':
      title = t('Calcul de l’eau du datacenter', 'Calculating data centre water use');
      note = t('Exemple pédagogique. Les litres ne sont additionnés que pour des flux compatibles ; un indicateur de rareté nécessite une caractérisation distincte.',
        'Teaching example. Litres are added only for compatible flows; a scarcity indicator requires separate characterisation.');
      content = <>
        <div className={styles.origin}><Symbol name="server" /><strong>{t('1 000', '1,000')} kWh IT</strong></div>
        <div className={styles.fork} aria-hidden="true" />
        <div className={styles.branches}>
          <div><span className={styles.operation}>× WUE : {t('0,5', '0.5')} L/kWh IT</span><Down />
            <div className={`${styles.amount} ${styles.sand}`}><strong>500 L</strong><span>{t('Eau directe du site', 'Direct site water')}</span></div>
          </div>
          <div><span className={styles.operation}>× PUE : {t('1,2', '1.2')}</span><Down />
            <div className={`${styles.amount} ${styles.softBlue}`}><strong>{t('1 200', '1,200')} kWh</strong><span>{t('Électricité du site', 'Site electricity')}</span></div>
            <Down /><span className={styles.operation}>{t('× Facteur d’eau de l’électricité', '× Electricity water factor')}</span><Down />
            <strong className={styles.operation}>{t('Eau indirecte', 'Indirect water')}</strong>
          </div>
        </div>
      </>;
      break;
    case 'input-media':
      title = t('Analyse d’une vidéo avec son', 'Analysing a video with sound');
      note = t('Parcours composé illustratif. Les valeurs visuelles suivent le profil Qwen2.5-VL de la page ; son profil vidéo n’inclut pas la piste audio. Un modèle audio-vidéo natif demande un profil dédié.',
        'Illustrative composite workflow. Visual values follow this page’s Qwen2.5-VL profile; its video profile excludes audio. A native audio-video model requires a dedicated profile.');
      content = <>
        <div className={styles.origin}><Symbol name="film" /><strong>{t('Vidéo de 30 secondes', '30-second video')}</strong></div>
        <div className={styles.fork} aria-hidden="true" />
        <div className={`${styles.branches} ${styles.mediaBranches}`}>
          <div><Symbol name="images" /><strong>{t('30 images', '30 frames')}</strong><span>{t('1 image/s', '1 frame/s')} · 448 × 448 px</span>
            <Down /><strong>{t('Encodage visuel', 'Visual encoding')}</strong><span>{t('15 paires temporelles', '15 temporal pairs')}</span>
            <span className={`${styles.payload} ${styles.softBlue}`}>{t('3 840 positions visuelles', '3,840 visual positions')}</span>
          </div>
          <div><Symbol name="audio" /><strong>{t('Piste audio', 'Audio track')}</strong><span>{t('Si utile à la tâche', 'If relevant to the task')}</span>
            <Down /><strong>{t('Transcription', 'Transcription')}</strong><span>{t('Traitement séparé', 'Separate processing')}</span>
            <span className={`${styles.payload} ${styles.sand}`}>{t('Texte transcrit', 'Transcribed text')}</span>
          </div>
        </div>
        <div className={styles.join} aria-hidden="true" />
        <div className={styles.destination}><strong>{t('Modèle + consigne → résumé', 'Model + instructions → summary')}</strong><span>{t('Réponse comptée une seule fois', 'Response counted only once')}</span></div>
      </>;
      break;
    case 'network-factor':
      title = t('Conversion d’un facteur réseau par trajet', 'Converting a network factor for a route');
      note = t('Facteur fictif. Pour plusieurs segments, les contributions sont calculées avec leurs volumes, distances et facteurs respectifs, puis additionnées.',
        'Fictitious factor. For multiple segments, contributions are calculated with their respective volumes, distances and factors, then added.');
      content = <>
        <div className={styles.smallLabel}>{t('Exemple sur un segment', 'Single-segment example')}</div>
        <div className={styles.equation}>
          <div><strong>500</strong><span>km</span></div><span aria-hidden="true">×</span>
          <div><strong>{t('0,0002', '0.0002')}</strong><span>kg CO₂e/({t('Go', 'GB')}·km)</span></div>
        </div>
        <Down />
        <div className={styles.derived}><strong>{t('0,1 kg CO₂e/Go', '0.1 kg CO₂e/GB')}</strong><span>{t('La distance est incluse dans ce facteur.', 'Distance is included in this factor.')}</span></div>
        <div className={styles.application}><span>200 {t('Go', 'GB')}</span><span>×</span><span>{t('0,1 kg CO₂e/Go', '0.1 kg CO₂e/GB')}</span><span>=</span><strong>20 kg CO₂e</strong></div>
      </>;
      break;
    case 'operating-states':
      title = t('Consommation selon l’état du terminal', 'Consumption by device operating state');
      note = t('Puissances fictives. Le terminal reste branché à l’arrêt. La largeur des segments représente le temps, pas l’énergie consommée.',
        'Fictitious power values. The device remains plugged in when off. Segment widths represent time, not energy consumed.');
      content = <>
        <div className={styles.smallLabel}>{t('Durées sur une journée fictive de 24 h', 'Durations over a fictitious 24-hour day')}</div>
        <div className={styles.day}>
          <div className={styles.active}><Symbol name="monitor" /><strong>{t('Actif', 'Active')}</strong><span>8 h</span></div>
          <div className={styles.softBlue}><Symbol name="moon" /><strong>{t('Veille', 'Standby')}</strong><span>8 h</span></div>
          <div className={styles.sand}><Symbol name="power" /><strong>{t('Arrêt', 'Off')}</strong><span>8 h</span></div>
        </div>
        <div className={styles.powers}><span>50 W</span><span>2 W</span><span>{t('0,5', '0.5')} W</span></div>
        <div className={styles.energy}><span>400 Wh</span><span>16 Wh</span><span>4 Wh</span></div>
        <div className={styles.total}><strong>420 Wh</strong><span>{t('soit 0,420 kWh sur la journée', 'equivalent to 0.420 kWh over the day')}</span></div>
      </>;
      break;
    case 'mail-campaign':
      title = t('Activités d’une campagne mail', 'Email campaign activities');
      note = t('Scénario fictif. Les ouvertures détectées par pixel ne mesurent pas le temps de lecture. Stockage, pièces jointes et traitements complètent l’inventaire.',
        'Fictitious scenario. Tracking-pixel opens do not measure reading time. Storage, attachments and processing complete the inventory.');
      content = <>
        <ol className={`${styles.steps} ${styles.activities} ${styles.campaign}`}>
          {[
            ['write', t('1 rédaction', '1 composition'), t('Création du message', 'Message creation')],
            ['mails', t('1 000 envois', '1,000 sends'), t('Distribution', 'Distribution')],
            ['mail-open', t('250 lectures', '250 readings'), t('Activité des lecteurs', 'Reader activity')],
          ].map(([icon, label, detail]) => <li key={icon}>
            <span className={styles.activitySymbol}><Symbol name={icon} /></span>
            <strong>{label}</strong><small>{detail}</small>
          </li>)}
        </ol>
        <div className={styles.mailSummary}>{t('La rédaction est comptée une fois pour la campagne.', 'Composition is counted once for the campaign.')}</div>
      </>;
      break;
  }

  return <figure className={styles.figure} aria-labelledby={id} data-method-figure={kind}>
    <figcaption id={id} className={styles.title}>{title}</figcaption>
    <div className={styles.panel}>
      {content}
    </div>
    <p className={styles.note}>{note}</p>
  </figure>;
}

function Memory({ label }: { label: string }) {
  return <div className={styles.memory}><span>{label}</span><span>{label}</span></div>;
}

function Down() {
  return <span className={styles.down} aria-hidden="true">↓</span>;
}

/** Small decorative vector marks; every step retains its visible text label. */
function Symbol({ name }: { name: string }) {
  const shapes: Record<string, React.ReactNode> = {
    question: <path d="M4 4h16v12H9l-5 4V4Z" />,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="1" /><rect x="9" y="9" width="6" height="6" /><path d="M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
    phone: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>,
    sync: <><path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5" /></>,
    server: <><rect x="3" y="3" width="18" height="7" rx="1" /><rect x="3" y="14" width="18" height="7" rx="1" /><path d="M6 6h2m-2 11h2" /></>,
    film: <><rect x="3" y="2" width="18" height="20" rx="1" /><path d="M7 2v20M17 2v20M3 7h4M3 12h4M3 17h4M17 7h4M17 12h4M17 17h4" /></>,
    images: <><rect x="7" y="3" width="14" height="14" rx="1" /><path d="M3 7v14h14M8 14l4-4 7 6" /><circle cx="16" cy="7" r="1" /></>,
    audio: <path d="M3 10v4m4-7v10m5-14v18m5-15v12m4-8v4" />,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="1" /><path d="M8 21h8m-4-4v4" /></>,
    moon: <path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z" />,
    power: <><path d="M12 2v10M6 5a9 9 0 1 0 12 0" /></>,
    write: <><path d="M13 3H4v18h15v-8M10 12l8-8 3 3-8 8-4 1Z" /></>,
    mails: <><rect x="2" y="7" width="20" height="14" rx="1" /><path d="m2 7 10 7L22 7M5 3h14" /></>,
    'mail-open': <><path d="m2 9 10-7 10 7v12H2V9Zm0 0 10 7 10-7" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}
