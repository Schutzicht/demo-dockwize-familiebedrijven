// Server-side opbouw van het (tussentijds/eind)rapport voor de deelbare presentatie.
// Zelfde versie-bewuste logica als kernfunctie 2: alleen notities tot en met de gekozen
// sessie, per categorie de meest recente, gevoed door de AI-codering.

import type { Family, CategoryId, Score } from '../data/types';
import { CATEGORY_DEFINITIONS } from '../data/types';
import { aiCoderingVoorFamilie } from '../data/aiCodering';

export const SESSIONS = [
  { key: 'kickoff', label: 'Kick-off' },
  { key: 'workshop-1', label: 'Workshop 1' },
  { key: 'verdieping', label: 'Verdieping' },
  { key: 'rapport', label: 'Rapport' },
];

export const sessionIndex = (key: string) => SESSIONS.findIndex((s) => s.key === key);

export interface RapportFinding {
  categoryId: CategoryId;
  title: string;
  shortTitle: string;
  score: Score; // 'red' | 'yellow' | 'green'
  knelpuntCode?: string;
  knelpuntKort?: string;
  adviesCode?: string;
  adviesKort?: string;
  bron?: string;
}

export interface Rapport {
  cutoffIndex: number;
  cutoffLabel: string;
  type: 'Tussentijds rapport' | 'Eindrapport';
  findings: RapportFinding[];
  aandachtspunten: RapportFinding[];
  counts: { red: number; yellow: number; green: number };
  deelnemers: { name: string; ok: boolean }[];
  notesUsed: number;
  authors: string[];
}

export function buildRapport(family: Family, cutoffIndex: number): Rapport {
  const coderingByNote = new Map(aiCoderingVoorFamilie(family).map((c) => [c.entry.id, c]));
  const used = family.logfile.filter(
    (e) => !e.isBeginNote && sessionIndex(e.phase) >= 0 && sessionIndex(e.phase) <= cutoffIndex,
  );

  const latestPerCat = new Map<number, { author: string; phase: string; cod: NonNullable<ReturnType<typeof coderingByNote.get>> }>();
  for (const e of used) {
    const cod = coderingByNote.get(e.id);
    if (!cod || e.category == null) continue;
    const cur = latestPerCat.get(e.category);
    if (!cur || sessionIndex(e.phase) >= sessionIndex(cur.phase)) {
      latestPerCat.set(e.category, { author: e.author, phase: e.phase, cod });
    }
  }

  const findings: RapportFinding[] = CATEGORY_DEFINITIONS.map((cat) => {
    const hit = latestPerCat.get(cat.id);
    if (!hit) {
      return { categoryId: cat.id, title: cat.title, shortTitle: cat.shortTitle, score: 'green' as Score };
    }
    return {
      categoryId: cat.id,
      title: cat.title,
      shortTitle: cat.shortTitle,
      score: hit.cod.severity,
      knelpuntCode: hit.cod.knelpunt.code,
      knelpuntKort: hit.cod.knelpunt.kort,
      adviesCode: hit.cod.advies.code,
      adviesKort: hit.cod.advies.kort,
      bron: `${hit.author}, ${SESSIONS[sessionIndex(hit.phase)].label}`,
    };
  });

  const counts = { red: 0, yellow: 0, green: 0 };
  for (const f of findings) counts[f.score === 'red' ? 'red' : f.score === 'yellow' ? 'yellow' : 'green']++;

  const submitted = new Set(used.map((e) => e.author));
  return {
    cutoffIndex,
    cutoffLabel: SESSIONS[cutoffIndex].label,
    type: cutoffIndex >= SESSIONS.length - 1 ? 'Eindrapport' : 'Tussentijds rapport',
    findings,
    aandachtspunten: findings.filter((f) => f.score !== 'green'),
    counts,
    deelnemers: family.team.map((t) => ({ name: t.name, ok: submitted.has(t.name) })),
    notesUsed: used.length,
    authors: Array.from(new Set(used.map((e) => e.author))),
  };
}
