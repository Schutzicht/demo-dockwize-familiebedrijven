export type Score = 'green' | 'yellow' | 'red' | 'grey';

export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Moment = 'KO' | 'WS1' | 'TK';

export type Phase =
  | 'kennismaking'
  | 'voorloop-vragenlijst'
  | 'kickoff'
  | 'uitgebreide-vragenlijst'
  | 'workshop-1'
  | 'verdieping'
  | 'rapport'
  | 'terugkoppeling'
  | 'opvolgmoment';

export type FamilyMemberRole = 'overdrager' | 'opvolger' | 'overig';

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyMemberRole;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  organisation: string;
  specialism: string;
}

export interface QuestionnaireQuestion {
  id: string;
  category: CategoryId;
  text: string;
  scaleHint?: string;
}

export interface QuestionnaireAnswer {
  questionId: string;
  memberId: string;
  value: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

export interface QuestionnaireRun {
  moment: Moment;
  title: string;
  description: string;
  sentAt: string;
  dueAt: string;
  questions: QuestionnaireQuestion[];
  answers: QuestionnaireAnswer[];
  completedBy: string[];
}

export interface CategoryDefinition {
  id: CategoryId;
  title: string;
  shortTitle: string;
  checkQuestion: string;
  gewenst: string;
}

export interface CategoryAssessment {
  categoryId: CategoryId;
  risicos: string;
  advies: string;
  teamScore: Score;
  source: 'manual' | 'ai-generated';
  updatedAt: string;
  /** Gekoppelde standaard knelpunt-codes uit de referentie-database, bv ['3.1','3.2'] */
  knelpuntCodes?: string[];
  /** Gekoppelde standaard verbeteractie-codes uit de referentie-database, bv ['3.1.1'] */
  verbeteractieCodes?: string[];
}

export interface FeasibilityRow {
  label: string;
  values: (string | number)[];
}

export interface FeasibilityTable {
  title: string;
  subject: string;
  years: string[];
  rows: FeasibilityRow[];
  notes: string[];
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  category: CategoryId | null;
  status: 'open' | 'doing' | 'done';
}

export interface LogfileEntry {
  id: string;
  phase: Phase;
  author: string;
  date: string;
  category: CategoryId | null;
  familyMember?: string;
  body: string;
  attachments?: { name: string; type: string }[];
  /** Begin-aantekeningen worden uitgesloten van AI team-beoordeling */
  isBeginNote?: boolean;
}

export interface AIReport {
  id: string;
  generatedAt: string;
  generatedBy: string;
  sourceMomentsConsidered: Moment[];
  logEntryIds: string[];
  perCategory: {
    categoryId: CategoryId;
    risicos: string;
    advies: string;
    proposedScore: Score;
  }[];
  summary: string;
}

export interface Family {
  slug: string;
  name: string;
  business: string;
  status: 'lopend' | 'afgerond' | 'concept';
  startDate: string;
  kickoffDate: string;
  workshopDate: string;
  terugkoppelingDate: string;
  scenario: string;
  members: FamilyMember[];
  team: TeamMember[];
  questionnaires: QuestionnaireRun[];
  assessments: CategoryAssessment[];
  feasibility: FeasibilityTable[];
  actions: ActionItem[];
  logfile: LogfileEntry[];
  aiReports: AIReport[];
  conclusion: string;
  evaluation: { member: string; quote: string }[];
}

export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: 1,
    title: 'Opvolgingsscenario',
    shortTitle: 'Scenario',
    checkQuestion: 'Zijn deze duidelijk vanuit eigendom, rolverdeling, vergoeding en zeggenschap?',
    gewenst: 'Duidelijkheid wie de opvolgers zijn, wanneer de opvolging plaatsvindt en welke zaken expliciet worden meegenomen of uitgesloten.',
  },
  {
    id: 2,
    title: 'Geschiktheid opvolger',
    shortTitle: 'Geschiktheid',
    checkQuestion: 'Zijn er knelpunten in ervaring, kennis of vaardigheden die opgelost moeten worden?',
    gewenst: 'Opvolgers worden bekwaam geacht om de bedrijfsvoering over te nemen, met bewust gekozen ondersteuning.',
  },
  {
    id: 3,
    title: 'Familieafspraken',
    shortTitle: 'Familieafspraken',
    checkQuestion: 'Worden er afdoende zakelijke, vastgelegde afspraken gemaakt om geschillen te voorkomen of op te lossen?',
    gewenst: 'Cruciale uitgangspunten en afspraken zijn besproken en vastgelegd in een familiestatuut, juridisch geborgd.',
  },
  {
    id: 4,
    title: 'Bedrijfswaardering',
    shortTitle: 'Waardering',
    checkQuestion: 'Is er een adequate, eenduidige waardering die door fiscus en partijen wordt omarmd?',
    gewenst: 'Een door de familie gedeeld en reëel beeld van de waarde van de onderneming.',
  },
  {
    id: 5,
    title: 'Financieel plaatje overdragers',
    shortTitle: 'Financiën overdrager',
    checkQuestion: 'Is er een realistisch financieel plan voor het leven na overdracht?',
    gewenst: 'Op basis van inzicht in de financiële situatie kan worden vastgesteld dat overdragers voldoende middelen hebben.',
  },
  {
    id: 6,
    title: 'Financieel plaatje opvolgers',
    shortTitle: 'Financiën opvolger',
    checkQuestion: 'Is er een realistisch financieel plan voor de opvolgers, onderbouwd vanuit een bedrijfsvisie?',
    gewenst: 'Opvolgers hebben voldoende middelen om de overname te financieren en in hun inkomen te voorzien.',
  },
  {
    id: 7,
    title: 'Financiering overdracht',
    shortTitle: 'Financiering',
    checkQuestion: 'Is de beoogde opvolging te financieren, rekening houdend met de andere kinderen?',
    gewenst: 'Een duidelijk gekozen en haalbare constructie van financieren, met bekende timing.',
  },
  {
    id: 8,
    title: 'Koers bedrijf',
    shortTitle: 'Koers',
    checkQuestion: 'Zijn er moeilijk overbrugbare verschillen in visie op bedrijfsvoering of strategie?',
    gewenst: 'Opvolgers hebben hun toekomstplannen afdoende uitgewerkt en doorgerekend, geen onoverkomelijke visie-verschillen.',
  },
  {
    id: 9,
    title: 'Proces & regie',
    shortTitle: 'Proces & regie',
    checkQuestion: 'Overzien overdragers en opvolgers het proces, inclusief de benodigde middelen, tijd en geld?',
    gewenst: 'De familie heeft een goed overzicht van de opvolging, een mijlpalenplanning en bewuste keuze van begeleiding.',
  },
];

export function avgToScore(avg: number): Score {
  if (avg >= 4) return 'green';
  if (avg >= 3) return 'yellow';
  if (avg > 0) return 'red';
  return 'grey';
}

export function categoryScoreFromAnswers(
  answers: QuestionnaireAnswer[],
  questions: QuestionnaireQuestion[],
  categoryId: CategoryId,
): { score: Score; avg: number; n: number } {
  const qIds = new Set(questions.filter((q) => q.category === categoryId).map((q) => q.id));
  const relevant = answers.filter((a) => qIds.has(a.questionId));
  if (relevant.length === 0) return { score: 'grey', avg: 0, n: 0 };
  const avg = relevant.reduce((s, a) => s + a.value, 0) / relevant.length;
  return { score: avgToScore(avg), avg, n: relevant.length };
}
