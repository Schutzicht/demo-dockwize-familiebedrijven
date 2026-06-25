// Concept-demonstratie van Imro's kernvraag: het AI-deel leest de logfile-notities
// (aantekeningen) en bepaalt automatisch welke knelpunt-code van toepassing is en
// welk standaard-advies daarbij hoort, klaar om in het voorstel te verwerken.
//
// In deze demo is de toewijzing een vaste, illustratieve mapping per notitie.
// In de uiteindelijke versie doet een AI-model deze classificatie op basis van de tekst.

import type { Family, LogfileEntry, Score } from './types';
import { getKnelpunt, type Verbeteractie } from './referentie';

type Confidence = 'hoog' | 'middel';

// logfile-notitie -> herkende knelpunt-code (uit de referentie-database) + zekerheid + kleur
// die het knelpunt impliceert. Begin-aantekeningen (l0, l1, l2) blijven bewust buiten
// beschouwing, net als bij het AI-rapport zelf, dus die staan hier niet in.
const NOTE_TO_CODE: Record<string, { code: string; confidence: Confidence; severity: Score }> = {
  l4: { code: '4.1', confidence: 'hoog', severity: 'yellow' },
  l5: { code: '2.3', confidence: 'middel', severity: 'yellow' },
  l6: { code: '7.2', confidence: 'hoog', severity: 'yellow' },
  l7: { code: '5.1', confidence: 'middel', severity: 'yellow' },
  l8: { code: '3.2', confidence: 'hoog', severity: 'yellow' },
  l9: { code: '8.2', confidence: 'hoog', severity: 'red' },
  l10: { code: '9.2', confidence: 'hoog', severity: 'yellow' },
};

export interface AICodering {
  entry: LogfileEntry;
  knelpunt: NonNullable<ReturnType<typeof getKnelpunt>>;
  advies: Verbeteractie;
  confidence: Confidence;
  severity: Score;
}

/** Leidt per gecodeerde logfile-notitie het knelpunt + bijbehorend advies af. */
export function aiCoderingVoorFamilie(family: Family): AICodering[] {
  const out: AICodering[] = [];
  for (const entry of family.logfile) {
    if (entry.isBeginNote) continue;
    const match = NOTE_TO_CODE[entry.id];
    if (!match) continue;
    const knelpunt = getKnelpunt(match.code);
    if (!knelpunt || knelpunt.verbeteracties.length === 0) continue;
    out.push({ entry, knelpunt, advies: knelpunt.verbeteracties[0], confidence: match.confidence, severity: match.severity });
  }
  return out;
}
