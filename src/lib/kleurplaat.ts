// Scoring-engine voor de kleurplaat, volgens de Dockwize-werkwijze (besproken met Imro):
// antwoorden zijn ja / nee / weet-niet (geen 1-5), en per categorie geldt het STRENGSTE
// antwoord: één nee maakt de categorie rood, één weet-niet maakt 'm geel. Worst-answer-wins.

import type { CategoryId, Score } from '../data/types';
import { CATEGORY_DEFINITIONS } from '../data/types';

export type Answer = 'ja' | 'nee' | 'weet-niet';

export interface ParsedAnswer {
  person: string;
  categoryId: CategoryId;
  question: string;
  answer: Answer;
}

/** Herkent vrije celwaarden als ja / nee / weet-niet, of null als leeg/onbekend. */
export function normalizeAnswer(raw: unknown): Answer | null {
  const v = String(raw ?? '').trim().toLowerCase();
  if (v === '') return null;
  if (['ja', 'j', 'yes', 'y', 'groen', 'akkoord', 'true', '1'].includes(v)) return 'ja';
  if (['nee', 'n', 'no', 'rood', 'false', '0'].includes(v)) return 'nee';
  if (['weet niet', 'weet-niet', 'wn', 'onbekend', '?', 'geel', 'misschien', 'deels', 'nvt', 'n.v.t.'].includes(v))
    return 'weet-niet';
  return null;
}

const answerToScore: Record<Answer, Score> = { ja: 'green', nee: 'red', 'weet-niet': 'yellow' };
const rank: Record<Score, number> = { grey: -1, green: 0, yellow: 1, red: 2 };

export interface CategoryResult {
  categoryId: CategoryId;
  title: string;
  shortTitle: string;
  score: Score;
  counts: { ja: number; nee: number; 'weet-niet': number };
  total: number;
  reason: string;
}

/** Bepaalt de kleur van één categorie: slechtste antwoord telt. */
export function scoreCategory(answers: ParsedAnswer[], categoryId: CategoryId): CategoryResult {
  const def = CATEGORY_DEFINITIONS.find((c) => c.id === categoryId)!;
  const rel = answers.filter((a) => a.categoryId === categoryId);
  const counts = { ja: 0, nee: 0, 'weet-niet': 0 } as CategoryResult['counts'];
  let score: Score = 'grey';
  for (const a of rel) {
    counts[a.answer]++;
    const s = answerToScore[a.answer];
    if (rank[s] > rank[score]) score = s;
  }
  const reason =
    rel.length === 0
      ? 'Geen antwoorden in deze categorie'
      : `${counts.nee}× nee · ${counts['weet-niet']}× weet niet · ${counts.ja}× ja`;
  return { categoryId, title: def.title, shortTitle: def.shortTitle, score, counts, total: rel.length, reason };
}

/** De volledige kleurplaat: alle 9 categorieën. */
export function buildKleurplaat(answers: ParsedAnswer[]): CategoryResult[] {
  return CATEGORY_DEFINITIONS.map((c) => scoreCategory(answers, c.id));
}

export interface ParseResult {
  people: string[];
  answers: ParsedAnswer[];
  questions: { categoryId: CategoryId; text: string }[];
  unrecognized: number;
  warnings: string[];
}

/**
 * Zet ruwe Excel-rijen (eerste rij = kop) om naar antwoorden.
 * Verwacht een 'Naam'-kolom en vraag-kolommen waarvan de kop begint met het
 * categorienummer, bv "3. Zijn de familieafspraken vastgelegd?".
 */
export function parseRows(rows: unknown[][]): ParseResult {
  const warnings: string[] = [];
  if (!rows || rows.length < 2) {
    return { people: [], answers: [], questions: [], unrecognized: 0, warnings: ['Geen rijen gevonden in het bestand.'] };
  }
  const header = rows[0].map((h) => String(h ?? '').trim());
  const nameIdx = header.findIndex((h) => /naam|name|deelnemer|persoon/i.test(h));
  if (nameIdx === -1) warnings.push('Geen "Naam"-kolom gevonden, eerste kolom wordt als naam gebruikt.');
  const personIdx = nameIdx === -1 ? 0 : nameIdx;

  const questionCols: { idx: number; categoryId: CategoryId; text: string }[] = [];
  header.forEach((h, idx) => {
    if (idx === personIdx) return;
    const m = h.match(/^\s*(\d)\s*[.)-]/);
    if (!m) return;
    const cat = Number(m[1]) as CategoryId;
    if (cat < 1 || cat > 9) return;
    questionCols.push({ idx, categoryId: cat, text: h.replace(/^\s*\d\s*[.)-]\s*/, '') });
  });
  if (questionCols.length === 0)
    warnings.push('Geen vraag-kolommen herkend. Kopteksten moeten beginnen met het categorienummer, bv "3. ...".');

  const people: string[] = [];
  const answers: ParsedAnswer[] = [];
  let unrecognized = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.every((c) => String(c ?? '').trim() === '')) continue;
    const person = String(row[personIdx] ?? '').trim() || `Persoon ${people.length + 1}`;
    people.push(person);
    for (const q of questionCols) {
      const norm = normalizeAnswer(row[q.idx]);
      if (norm === null) {
        if (String(row[q.idx] ?? '').trim() !== '') unrecognized++;
        continue;
      }
      answers.push({ person, categoryId: q.categoryId, question: q.text, answer: norm });
    }
  }

  const questions = questionCols.map((q) => ({ categoryId: q.categoryId, text: q.text }));
  return { people, answers, questions, unrecognized, warnings };
}
