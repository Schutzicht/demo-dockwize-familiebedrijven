// Scoring-engine voor de kleurplaat, volgens de Dockwize-werkwijze (besproken met Imro):
// antwoorden zijn ja / nee / weet-niet (geen 1-5), en per categorie geldt het STRENGSTE
// antwoord: één nee maakt de categorie rood, één weet-niet maakt 'm geel. Worst-answer-wins.
//
// De parser begrijpt twee formaten:
//  1) de echte HubSpot-export (Voornaam/Achternaam + volzin-vragen + subvragen + 'niet van
//     toepassing'-optie + metadata-kolommen);
//  2) een simpele eigen template (Naam-kolom + vraag-koppen met categorienummer ervoor).

import type { CategoryId, Score } from '../data/types';
import { CATEGORY_DEFINITIONS } from '../data/types';

export type Answer = 'ja' | 'nee' | 'weet-niet';

export interface ParsedAnswer {
  person: string;
  group: string;
  categoryId: CategoryId;
  question: string;
  answer: Answer;
}

/**
 * Herkent zowel simpele (ja/nee/weet niet) als de beschrijvende HubSpot-antwoorden.
 * 'niet van toepassing' geeft null (wordt overgeslagen), net als lege cellen.
 */
export function normalizeAnswer(raw: unknown): Answer | null {
  const v = String(raw ?? '').trim().toLowerCase();
  if (v === '') return null;
  if (v.includes('niet van toepassing') || v === 'nvt' || v === 'n.v.t.') return null;
  if (v.startsWith('nee') || v === 'n' || v === 'no' || v === 'rood' || v === 'false' || v === '0') return 'nee';
  if (
    v.startsWith('ja') || v === 'j' || v === 'yes' || v === 'y' || v === 'groen' || v === 'akkoord' || v === 'true' || v === '1'
  ) {
    // "Ja wel afspraken maar niets vastgelegd" e.d. is een aandachtspunt, geen volmondig ja.
    return v.includes('maar') ? 'weet-niet' : 'ja';
  }
  // Alle overige (twijfel/gedeeltelijk: "we denken", "wel ... maar", "redelijk", ...) = geel.
  return 'weet-niet';
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
  groups: string[];
  nvt: number;
  unrecognized: number;
  warnings: string[];
}

// Metadata-kolommen die geen vraag zijn.
const META = new Set([
  'voornaam', 'achternaam', 'naam', 'e-mail', 'email', 'telefoonnummer', 'telefoon', 'bedrijfsnaam', 'rol',
  'conversion id', 'conversion date', 'conversion page', 'conversion title',
  'contact first name', 'contact last name', 'contact email', 'contact id',
]);

// Hoofdvragen van het Dockwize-voorloopformulier -> categorie (op kenmerkend tekstdeel).
// Subvragen die hierna komen erven de categorie van de laatste hoofdvraag.
const MAIN: [string, CategoryId][] = [
  ['welke opvolgers er zijn', 1],
  ['kennis, vaardigheden en competenties', 2],
  ['geschreven en/of ongeschreven afspraken', 3],
  ['actuele waarde van het familiebedrijf', 4],
  ['hoeveel geld/vermogen je nodig hebt', 5],
  ['inkomen/winst uit de onderneming', 6],
  ['koopsom van het familiebedrijf', 7],
  ['toekomstvisie voor het familie', 8],
  ['bij de bedrijfsoverdracht komt kijken', 9],
];

/** Zet ruwe Excel-rijen (eerste rij = kop) om naar antwoorden. */
export function parseRows(rows: unknown[][]): ParseResult {
  const warnings: string[] = [];
  if (!rows || rows.length < 2) {
    return { people: [], answers: [], questions: [], groups: [], nvt: 0, unrecognized: 0, warnings: ['Geen rijen gevonden in het bestand.'] };
  }
  const header = rows[0].map((h) => String(h ?? '').trim());
  const low = header.map((h) => h.toLowerCase());

  const voorIdx = low.indexOf('voornaam');
  const achtIdx = low.indexOf('achternaam');
  const naamIdx = low.findIndex((h) => h === 'naam' || h === 'name' || h === 'deelnemer' || h === 'persoon');
  const bedrijfIdx = low.indexOf('bedrijfsnaam');
  const personCols = new Set([voorIdx, achtIdx, naamIdx, bedrijfIdx].filter((i) => i >= 0));
  if (voorIdx === -1 && naamIdx === -1) warnings.push('Geen "Voornaam"- of "Naam"-kolom gevonden; eerste kolom wordt als naam gebruikt.');

  const questionCols: { idx: number; categoryId: CategoryId; text: string }[] = [];
  let last: CategoryId | null = null;
  header.forEach((h, idx) => {
    if (personCols.has(idx) || META.has(low[idx])) return;
    const m = h.match(/^\s*(\d)\s*[.)-]/);
    if (m) {
      const c = Number(m[1]) as CategoryId;
      if (c >= 1 && c <= 9) {
        last = c;
        questionCols.push({ idx, categoryId: c, text: h.replace(/^\s*\d\s*[.)-]\s*/, '') });
      }
      return;
    }
    const mm = MAIN.find(([kw]) => low[idx].includes(kw));
    if (mm) {
      last = mm[1];
      questionCols.push({ idx, categoryId: mm[1], text: h });
      return;
    }
    if (last != null) questionCols.push({ idx, categoryId: last, text: h });
  });
  if (questionCols.length === 0) warnings.push('Geen vraag-kolommen herkend in dit bestand.');

  const personName = (row: unknown[]) => {
    if (voorIdx >= 0) return `${String(row[voorIdx] ?? '').trim()} ${achtIdx >= 0 ? String(row[achtIdx] ?? '').trim() : ''}`.trim();
    if (naamIdx >= 0) return String(row[naamIdx] ?? '').trim();
    return String(row[0] ?? '').trim();
  };

  const peopleSet = new Set<string>();
  const groupsOrder: string[] = [];
  const groupsSet = new Set<string>();
  const answers: ParsedAnswer[] = [];
  let nvt = 0;
  let unrecognized = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.every((c) => String(c ?? '').trim() === '')) continue;
    const person = personName(row) || `Persoon ${peopleSet.size + 1}`;
    const group = bedrijfIdx >= 0 ? String(row[bedrijfIdx] ?? '').trim() : '';
    peopleSet.add(person);
    if (group && !groupsSet.has(group)) {
      groupsSet.add(group);
      groupsOrder.push(group);
    }
    for (const q of questionCols) {
      const raw = String(row[q.idx] ?? '').trim();
      if (raw === '') continue;
      if (/niet van toepassing/i.test(raw)) {
        nvt++;
        continue;
      }
      const norm = normalizeAnswer(raw);
      if (norm === null) {
        unrecognized++;
        continue;
      }
      answers.push({ person, group, categoryId: q.categoryId, question: q.text, answer: norm });
    }
  }

  return {
    people: [...peopleSet],
    answers,
    questions: questionCols.map((q) => ({ categoryId: q.categoryId, text: q.text })),
    groups: groupsOrder,
    nvt,
    unrecognized,
    warnings,
  };
}
