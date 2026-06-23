import type {
  Family,
  QuestionnaireQuestion,
  QuestionnaireAnswer,
} from './types';

const koQuestions: QuestionnaireQuestion[] = [
  { id: 'ko-1-1', category: 1, text: 'In hoeverre is duidelijk wie de bedrijfsopvolger(s) worden?', scaleHint: '1=onduidelijk, 5=volledig vastgelegd' },
  { id: 'ko-1-2', category: 1, text: 'Hoe duidelijk is wat wel en niet wordt overgedragen (eigendom, taken, zeggenschap)?' },
  { id: 'ko-2-1', category: 2, text: 'In hoeverre voelen opvolgers zich bekwaam om het bedrijf over te nemen?' },
  { id: 'ko-2-2', category: 2, text: 'Hoe goed is de samenwerking tussen opvolgers ingeschat?' },
  { id: 'ko-3-1', category: 3, text: 'Hoe formeel zijn jullie familieafspraken vastgelegd?' },
  { id: 'ko-3-2', category: 3, text: 'Hoe duidelijk zijn de afspraken voor niet-opvolgers?' },
  { id: 'ko-4-1', category: 4, text: 'Hoe duidelijk is voor jullie de waarde van het bedrijf?' },
  { id: 'ko-5-1', category: 5, text: 'In hoeverre zijn de financiële plannen na overdracht voor overdragers helder?' },
  { id: 'ko-6-1', category: 6, text: 'In hoeverre zijn de financiële plannen voor opvolgers helder?' },
  { id: 'ko-7-1', category: 7, text: 'Hoe duidelijk is hoe de overdracht gefinancierd gaat worden?' },
  { id: 'ko-8-1', category: 8, text: 'In hoeverre delen jullie de toekomstvisie voor het bedrijf?' },
  { id: 'ko-9-1', category: 9, text: 'Hoe goed overzien jullie het opvolgingsproces in tijd en geld?' },
];

const ws1Questions: QuestionnaireQuestion[] = [
  ...koQuestions.map((q) => ({ ...q, id: 'ws1-' + q.id.slice(3) })),
  { id: 'ws1-1-3', category: 1, text: 'Voelen ook niet-opvolgers zich commit aan het scenario?' },
  { id: 'ws1-2-3', category: 2, text: 'Zijn coaching of begeleiding voor opvolgers belegd?' },
  { id: 'ws1-2-4', category: 2, text: 'Is de afstemming van externe werkdagen praktisch werkbaar?' },
  { id: 'ws1-3-3', category: 3, text: 'Is het familiestatuut juridisch getoetst?' },
  { id: 'ws1-4-2', category: 4, text: 'Is de waardering afgestemd met de fiscus?' },
  { id: 'ws1-5-2', category: 5, text: 'Is er een gat tussen overdracht en AOW dat overbrugging nodig heeft?' },
  { id: 'ws1-5-3', category: 5, text: 'Is er voldoende rekening gehouden met niet-opvolgende kinderen?' },
  { id: 'ws1-6-2', category: 6, text: 'Zijn worst-case scenarios doorgerekend voor opvolgers?' },
  { id: 'ws1-7-2', category: 7, text: 'Is de gekozen constructie (VOF, huur) fiscaal beoordeeld?' },
  { id: 'ws1-8-2', category: 8, text: 'Is het toekomstplan toetsbaar voor een bank?' },
  { id: 'ws1-8-3', category: 8, text: 'Is het privé-sanitair plan in de tijd geoptimaliseerd?' },
  { id: 'ws1-9-2', category: 9, text: 'Is een opvolgingsbegeleider gecontracteerd?' },
];

const tkQuestions: QuestionnaireQuestion[] = [
  { id: 'tk-overall', category: 9, text: 'Hoe ervaren jullie het hele APK-traject?' },
  { id: 'tk-clarity', category: 1, text: 'In hoeverre is de opvolging nu helderder dan bij start?' },
  { id: 'tk-finance', category: 5, text: 'In hoeverre zijn de financiële zorgen weggenomen?' },
  { id: 'tk-relations', category: 3, text: 'Heeft het traject geholpen bij de onderlinge familierelaties?' },
];

const members = ['erik', 'mariska', 'katja', 'sanne', 'joost'];

function mockAnswers(
  questions: QuestionnaireQuestion[],
  baseline: number,
  variance: number = 1,
): QuestionnaireAnswer[] {
  const out: QuestionnaireAnswer[] = [];
  for (const m of members) {
    for (const q of questions) {
      const v = Math.max(1, Math.min(5, Math.round(baseline + (Math.random() * 2 - 1) * variance)));
      out.push({ questionId: q.id, memberId: m, value: v as 1 | 2 | 3 | 4 | 5 });
    }
  }
  return out;
}

const seededRandom = (() => {
  let s = 42;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
})();

function deterministicAnswers(
  questions: QuestionnaireQuestion[],
  baselinePerCat: Partial<Record<number, number>>,
  defaultBaseline = 2,
): QuestionnaireAnswer[] {
  const out: QuestionnaireAnswer[] = [];
  for (const m of members) {
    for (const q of questions) {
      const base = baselinePerCat[q.category] ?? defaultBaseline;
      const v = Math.max(1, Math.min(5, Math.round(base + (seededRandom() * 1.2 - 0.6))));
      out.push({ questionId: q.id, memberId: m, value: v as 1 | 2 | 3 | 4 | 5 });
    }
  }
  return out;
}

const koBaselines = { 1: 4, 2: 2, 3: 2, 4: 3, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2 };
const ws1Baselines = { 1: 5, 2: 3, 3: 3, 4: 3, 5: 4, 6: 3, 7: 3, 8: 3, 9: 4 };
const tkBaselines = { 1: 5, 3: 4, 5: 4, 9: 5 };

export const wattel: Family = {
  slug: 'wattel',
  name: 'Familie Wattel',
  business: 'Camping & caravanstalling',
  status: 'afgerond',
  startDate: '2025-02-10',
  kickoffDate: '2025-02-10',
  workshopDate: '2025-05-20',
  terugkoppelingDate: '2026-01-21',
  scenario:
    'Sanne en Joost nemen het bedrijf over van Erik en Mariska. Ze nemen ieder 3,5 dag per week voor hun rekening, daarnaast werken beiden 3,5 dag extern. Zus Katja maakt geen onderdeel uit van de opvolging. Over te dragen eigendom: camping (25 veld- en comfortplaatsen), caravanstalling. Exclusief: ouderlijk huis en zomerwoning.',
  members: [
    { id: 'erik', name: 'Erik', role: 'overdrager', description: 'Vader, runt camping tot 2028, caravanstalling tot 2030' },
    { id: 'mariska', name: 'Mariska', role: 'overdrager', description: 'Moeder, AOW-gerechtigd in 2036' },
    { id: 'katja', name: 'Katja', role: 'overig', description: 'Dochter, geen onderdeel van opvolging' },
    { id: 'sanne', name: 'Sanne', role: 'opvolger', description: '3,5 dag camping + 3,5 dag extern' },
    { id: 'joost', name: 'Joost', role: 'opvolger', description: '3,5 dag camping + 3,5 dag extern' },
  ],
  team: [
    { id: 'imro', name: 'Imro Wong', role: 'APK projectleider', organisation: 'Dockwize', specialism: 'Bedrijfsontwikkeling, persoonlijke ontwikkeling' },
    { id: 'pieter', name: 'Pieter Poortvliet', role: 'APK team', organisation: 'Crossminds', specialism: 'Bedrijfswaardering' },
    { id: 'mattinja', name: 'Mattinja Oostdijk', role: 'APK team', organisation: 'Onafhankelijk', specialism: 'Familieafspraken, P&O ontwikkeling' },
    { id: 'jan', name: 'Jan Rutjes', role: 'APK team', organisation: 'Schipper Accountants', specialism: 'Fiscalist, financiële planning' },
  ],
  questionnaires: [
    {
      moment: 'KO',
      title: 'Voorloop-vragenlijst Kick-off',
      description: 'Ingevuld voor de kick-off op locatie, vormt input voor de eerste kleurplaat.',
      sentAt: '2025-01-25',
      dueAt: '2025-02-08',
      questions: koQuestions,
      answers: deterministicAnswers(koQuestions, koBaselines, 2),
      completedBy: members,
    },
    {
      moment: 'WS1',
      title: 'Uitgebreide vragenlijst Workshop 1',
      description: 'Voorbereiding voor workshop 1. Per familielid afzonderlijk ingevuld.',
      sentAt: '2025-04-15',
      dueAt: '2025-05-15',
      questions: ws1Questions,
      answers: deterministicAnswers(ws1Questions, ws1Baselines, 3),
      completedBy: members,
    },
    {
      moment: 'TK',
      title: 'Evaluatie-vragenlijst terugkoppeling',
      description: 'Korte reflectie ter voorbereiding op de terugkoppelsessie.',
      sentAt: '2026-01-05',
      dueAt: '2026-01-18',
      questions: tkQuestions,
      answers: deterministicAnswers(tkQuestions, tkBaselines, 4),
      completedBy: members,
    },
  ],
  assessments: [
    { categoryId: 1, risicos: 'Geen. Vanaf het begin duidelijk dat Sanne en Joost opvolgers zijn en zus Katja niet.', advies: 'Geen vervolgactie nodig.', teamScore: 'green', source: 'manual', updatedAt: '2026-01-15' },
    { categoryId: 2, risicos: 'Geen bekwaamheidsrisico\'s. Wel praktische uitdagingen: hoogseizoen 7 dagen p/w, afstemmen externe werkdagen, beroep op Erik en Mariska buiten kantooruren, toekomstige veranderingen door partnerkeuze en gezinsvorming.', advies: 'Bespreek de praktische punten expliciet, leg afspraken vast, overweeg gezamenlijke coaching.', teamScore: 'yellow', source: 'manual', updatedAt: '2026-01-15', knelpuntCodes: ['2.3'], verbeteractieCodes: ['2.3.1'] },
    { categoryId: 3, risicos: 'Familie heeft tijdens het traject een eerste familiestatuut geformuleerd. Afspraken zijn er, maar uitgangspunten en motivatie ontbreken.', advies: 'Statuut uitbreiden met uitgangspunten en motivatie. Zeggenschapsafspraken formeel vastleggen in VOF-overeenkomst.', teamScore: 'yellow', source: 'manual', updatedAt: '2026-01-15', knelpuntCodes: ['3.1', '3.2'], verbeteractieCodes: ['3.1.1', '3.2.1'] },
    { categoryId: 4, risicos: 'Om fiscusverrassingen te voorkomen, moet de waardering goed onderbouwd en proactief getoetst worden.', advies: 'Onderbouw met adviseur en stem proactief af met fiscus.', teamScore: 'yellow', source: 'manual', updatedAt: '2026-01-15', knelpuntCodes: ['4.1'], verbeteractieCodes: ['4.1.1'] },
    { categoryId: 5, risicos: 'Voldoende middelen aanwezig voor Erik en Mariska. Sanne/Joost kunnen ouderlijk huis pas richting 10 jaar financieren. AOW-gat Mariska tot 2036.', advies: 'Bekijk met adviseur inkomenssituatie pre-AOW. Verken financiële ruimte voor Katja.', teamScore: 'green', source: 'manual', updatedAt: '2026-01-15' },
    { categoryId: 6, risicos: 'Sanne en Joost hebben hun plannen uitgewerkt. Knelpunten zijn benoemd of opgelost.', advies: 'Werk plannen verder uit met adviseur, bekijk tegenvallende scenarios. Plannen van Katja meenemen.', teamScore: 'yellow', source: 'manual', updatedAt: '2026-01-15', knelpuntCodes: ['6.4', '6.5'], verbeteractieCodes: ['6.4.1', '6.5.1'] },
    { categoryId: 7, risicos: 'Combinatie bank + ouders is haalbaar. Tijdelijke huurconstructie lijkt fiscaal niet optimaal.', advies: 'Overweeg toetreding tot VOF i.p.v. huur. Bespreek met fiscale adviseur.', teamScore: 'yellow', source: 'manual', updatedAt: '2026-01-15', knelpuntCodes: ['7.2'], verbeteractieCodes: ['7.2.1'] },
    { categoryId: 8, risicos: 'Geen onoverbrugbare visie-verschillen. Bij €750k banklening moet plan onderhoud en investeringen tonen.', advies: 'Worst-case scenario uitwerken, plan toetsen vanuit bank-perspectief, privé sanitair eerder invoeren.', teamScore: 'yellow', source: 'manual', updatedAt: '2026-01-15', knelpuntCodes: ['8.2'], verbeteractieCodes: ['8.2.1'] },
    { categoryId: 9, risicos: 'Goed beeld, vertaald in plannen en mijlpalen. Er is nog werk te verzetten.', advies: 'Opvolgingsbegeleiding contracteren om acties en mijlpalen uit te werken.', teamScore: 'green', source: 'manual', updatedAt: '2026-01-15' },
  ],
  feasibility: [
    {
      title: 'Haalbaarheidstoets bedrijfsexploitatie',
      subject: 'Erik en Mariska',
      years: ['2026', '2027', '2028', '2029', '2030', '2031'],
      rows: [
        { label: 'Omzet camping', values: ['€ 285k', '€ 295k', '€ 305k', '€ 315k', '€ 330k', '€ 345k'] },
        { label: 'Omzet caravanstalling', values: ['€ 48k', '€ 50k', '€ 52k', '€ 54k', '€ 56k', '€ 0'] },
        { label: 'Resultaat voor belasting', values: ['€ 142k', '€ 148k', '€ 156k', '€ 163k', '€ 178k', '€ 165k'] },
        { label: 'Belastingdruk (37%)', values: ['€ 53k', '€ 55k', '€ 58k', '€ 60k', '€ 66k', '€ 61k'] },
        { label: 'Netto resultaat', values: ['€ 89k', '€ 93k', '€ 98k', '€ 103k', '€ 112k', '€ 104k'] },
      ],
      notes: [
        'Bij een VOF-structuur kun je werken met fiscaal geruisloze doorschuiving. Globaal toegepast voor € 167.500.',
        'Vooralsnog geen aflossing lening ouders opgenomen. Bij investering in privé sanitair lijkt ruimte voor aflossing.',
        'Belastingdruk globaal 37%. Werkelijke druk zal iets lager zijn door fiscale faciliteiten.',
        'Nog geen rekening gehouden met onderhoud en vervanging.',
      ],
    },
    {
      title: 'Haalbaarheidstoets privé',
      subject: 'Erik en Mariska',
      years: ['2031', '2032', '2033', '2034', '2035', '2036'],
      rows: [
        { label: 'Rente op kapitaal (3%)', values: ['€ 22k', '€ 22k', '€ 22k', '€ 22k', '€ 22k', '€ 22k'] },
        { label: 'AOW Erik', values: ['€ 0', '€ 14k', '€ 14k', '€ 14k', '€ 14k', '€ 14k'] },
        { label: 'AOW Mariska', values: ['€ 0', '€ 0', '€ 0', '€ 0', '€ 0', '€ 14k'] },
        { label: 'Aanvulling uit bedrijf', values: ['€ 35k', '€ 21k', '€ 21k', '€ 21k', '€ 21k', '€ 7k'] },
        { label: 'Totaal inkomen', values: ['€ 57k', '€ 57k', '€ 57k', '€ 57k', '€ 57k', '€ 57k'] },
      ],
      notes: [
        'Mariska is in 2036 AOW-gerechtigd.',
        'Overbrugging uit bedrijf of aflossing nodig tot 2032.',
        'Nog geen inkomen uit zomerwoning of Rabo Toekomstsparen meegerekend.',
        '3% rente op kapitaal, nog geen aflossing.',
      ],
    },
    {
      title: 'Haalbaarheidstoets opvolgers',
      subject: 'Sanne en Joost',
      years: ['2026', '2027', '2028', '2029', '2030', '2031'],
      rows: [
        { label: 'Salaris loondienst Sanne (60%)', values: ['€ 32k', '€ 33k', '€ 34k', '€ 35k', '€ 36k', '€ 37k'] },
        { label: 'Salaris loondienst Joost (80%)', values: ['€ 48k', '€ 49k', '€ 50k', '€ 52k', '€ 53k', '€ 54k'] },
        { label: 'Aanvulling uit bedrijf (€ 2k netto p/m)', values: ['€ 24k', '€ 24k', '€ 24k', '€ 24k', '€ 24k', '€ 24k'] },
        { label: 'Totaal netto huishouden', values: ['€ 104k', '€ 106k', '€ 108k', '€ 111k', '€ 113k', '€ 115k'] },
      ],
      notes: [
        'Sanne behoudt 60% salaris loondienst, Joost 80%.',
        'Aanvulling € 2.000 netto uit bedrijf per maand.',
        'Privé sanitair geeft significante verbetering — versnel investering.',
        'Overname woning ouders is nu een stap te ver — eerst kapitaal opbouwen.',
      ],
    },
  ],
  actions: [
    { id: 'a1', title: 'Familiestatuut uitbreiden met uitgangspunten en motivatie', owner: 'Familie', due: '2026-04-01', category: 3, status: 'open' },
    { id: 'a2', title: 'Zeggenschapsafspraken vastleggen in VOF-overeenkomst', owner: 'Familie + notaris', due: '2026-06-01', category: 3, status: 'open' },
    { id: 'a3', title: 'Waardering onderbouwen en afstemmen met fiscus', owner: 'Adviseur', due: '2026-09-01', category: 4, status: 'open' },
    { id: 'a4', title: 'Inkomenssituatie pre-AOW Mariska doorrekenen', owner: 'Adviseur', due: '2026-05-15', category: 5, status: 'open' },
    { id: 'a5', title: 'Verken financiële ruimte voor Katja', owner: 'Familie + adviseur', due: '2026-07-01', category: 5, status: 'open' },
    { id: 'a6', title: 'Worst-case scenario bedrijfsexploitatie uitwerken', owner: 'Sanne + Joost', due: '2026-06-01', category: 8, status: 'open' },
    { id: 'a7', title: 'Onderzoek toetreding VOF als alternatief voor huur', owner: 'Adviseur', due: '2026-05-01', category: 7, status: 'open' },
    { id: 'a8', title: 'Plan privé sanitair: versnelde invoering bekijken', owner: 'Sanne + Joost', due: '2026-04-15', category: 8, status: 'open' },
    { id: 'a9', title: 'Praktische werkafspraken Sanne en Joost vastleggen', owner: 'Sanne + Joost', due: '2026-03-15', category: 2, status: 'doing' },
    { id: 'a10', title: 'Opvolgingsbegeleiding contracteren', owner: 'Familie', due: '2026-03-01', category: 9, status: 'doing' },
  ],
  logfile: [
    { id: 'l0', phase: 'kennismaking', author: 'Imro Wong', date: '2025-01-20', category: null, body: 'Eerste kennismaking telefonisch. Familie nog zoekend wat ze precies willen weten. Erik enthousiast, Mariska sceptisch.', isBeginNote: true },
    { id: 'l1', phase: 'voorloop-vragenlijst', author: 'Mattinja Oostdijk', date: '2025-02-05', category: 3, familyMember: 'erik', body: 'Erik geeft aan dat er nog geen formeel vastgelegde afspraken zijn over zeggenschap. Bestaande mondelinge afspraken zijn duidelijk binnen de familie, maar niet juridisch geborgd.', isBeginNote: true },
    { id: 'l2', phase: 'voorloop-vragenlijst', author: 'Mattinja Oostdijk', date: '2025-02-05', category: 5, familyMember: 'mariska', body: 'Mariska maakt zich zorgen over het AOW-gat en de positie van Katja indien zij eerder zou overlijden. Belangrijk om expliciet door te rekenen.', isBeginNote: true },
    { id: 'l3', phase: 'kickoff', author: 'Imro Wong', date: '2025-02-10', category: 9, body: 'Kick-off goed verlopen. Familie open. Sanne en Joost al ver in eigen plannen, Mariska heeft veel vragen, Katja staat aan de zijlijn maar betrokken.' },
    { id: 'l4', phase: 'workshop-1', author: 'Pieter Poortvliet', date: '2025-05-20', category: 4, body: 'Eerste indicatieve waardering: € 1,1 mln. Taxatie van de grond zit hier substantieel boven. Discussie met fiscus is noodzakelijk voor onderbouwing.', attachments: [{ name: 'indicatieve-waardering.pdf', type: 'application/pdf' }] },
    { id: 'l5', phase: 'workshop-1', author: 'Imro Wong', date: '2025-05-20', category: 2, familyMember: 'sanne', body: 'Sanne benoemt zorgen over het 7-daagse hoogseizoen i.c.m. externe baan. Joost herkent dit. Geen breker, wel actiepunt.' },
    { id: 'l6', phase: 'verdieping', author: 'Jan Rutjes', date: '2025-09-08', category: 7, body: 'Tijdelijke huurconstructie levert fiscaal onnodige drukte op. Toetreding tot de VOF is fiscaal aantrekkelijker en beter uitlegbaar bij de bank.' },
    { id: 'l7', phase: 'verdieping', author: 'Jan Rutjes', date: '2025-09-08', category: 5, body: 'AOW-gat Mariska berekend: overbrugging via bedrijf nodig tot 2032. Daarna AOW Erik, vanaf 2036 AOW Mariska.' },
    { id: 'l8', phase: 'verdieping', author: 'Mattinja Oostdijk', date: '2025-10-02', category: 3, body: 'Familie heeft een eerste eigen familiestatuut opgesteld. Afspraken aanwezig, maar uitgangspunten ontbreken. Gesprek hierover gepland.' },
    { id: 'l9', phase: 'rapport', author: 'Imro Wong', date: '2026-01-15', category: 8, body: 'Toekomstplan Sanne/Joost mist worst-case onderbouwing. Bank zal hier vragen over stellen bij €750k aanvraag. Privé-sanitair eerder invoeren versterkt het plan.' },
    { id: 'l10', phase: 'rapport', author: 'Imro Wong', date: '2026-01-15', category: 9, body: 'Begeleiding opvolging staat op punt van contractering. Familie raadpleegt twee partijen.' },
  ],
  aiReports: [
    {
      id: 'ai-1',
      generatedAt: '2026-01-18 14:32',
      generatedBy: 'Imro Wong',
      sourceMomentsConsidered: ['KO', 'WS1'],
      logEntryIds: ['l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'],
      perCategory: [
        { categoryId: 1, risicos: 'Helder scenario, alle partijen committed.', advies: 'Geen actie.', proposedScore: 'green' },
        { categoryId: 2, risicos: 'Praktische uitdagingen in werkverdeling en hoogseizoen. Bekwaamheid niet in twijfel.', advies: 'Werkafspraken expliciet vastleggen.', proposedScore: 'yellow' },
        { categoryId: 3, risicos: 'Eerste familiestatuut bestaat, mist motivatie en juridische verankering.', advies: 'Statuut uitbreiden + VOF-overeenkomst.', proposedScore: 'yellow' },
        { categoryId: 4, risicos: 'Indicatieve waardering rond €1,1 mln, taxatie grond hoger. Fiscale afstemming noodzakelijk.', advies: 'Proactief met fiscus afstemmen.', proposedScore: 'yellow' },
        { categoryId: 5, risicos: 'AOW-gat tot 2036, overbrugging via bedrijf nodig.', advies: 'Pre-AOW inkomenssituatie doorrekenen, ruimte voor Katja verkennen.', proposedScore: 'green' },
        { categoryId: 6, risicos: 'Plannen uitgewerkt, tegenvallende scenarios nog niet.', advies: 'Worst-case scenarios uitwerken met adviseur.', proposedScore: 'yellow' },
        { categoryId: 7, risicos: 'Tijdelijke huurconstructie suboptimaal.', advies: 'VOF-toetreding als alternatief onderzoeken.', proposedScore: 'yellow' },
        { categoryId: 8, risicos: 'Toekomstplan mist worst-case en investeringen voor bank.', advies: 'Plan bankproof maken, privé-sanitair versnellen.', proposedScore: 'yellow' },
        { categoryId: 9, risicos: 'Familie heeft helder beeld, begeleiding in laatste fase van contractering.', advies: 'Begeleiding contracteren en planning verder uitwerken.', proposedScore: 'green' },
      ],
      summary: 'Het traject heeft de risico\'s verschoven van overwegend rood (kickoff) naar overwegend geel (workshop). Drie hoofdthema\'s blijven: financieel en fiscaal verder uitwerken, constructie heroverwegen (VOF i.p.v. huur), en samenwerking en regie formeel vastleggen.',
    },
  ],
  conclusion:
    'Bij aanvang van het traject waren er nog veel onduidelijkheden en potentiële risico\'s. Deze zijn gedurende het traject teruggebracht tot aandachtspunten. Vele kleine aandachtspunten tezamen kunnen ook tot een significant risico leiden. Het is van belang om naast de huidige situatie ook met de "wat verder vooruitkijk" bril te kijken.',
  evaluation: [
    { member: 'Erik', quote: 'Trots op hoe we het traject met de hele familie hebben doorlopen, ook als gezin zijn we wat dichter bij elkaar gekomen.' },
    { member: 'Mariska', quote: 'Was in het begin sceptisch over samenwerking, financiën en de belangen van Katja. Het traject heeft veel duidelijkheid gegeven.' },
    { member: 'Katja', quote: 'Zinvol om als niet-opvolger ook mee te lopen. Fijn dat mijn belangen zijn meegenomen.' },
    { member: 'Sanne', quote: 'Goed om zelf na te denken en in actie te komen. Goed leerproces, goed handvat om verder te gaan.' },
    { member: 'Joost', quote: 'In het begin geen idee, veel onduidelijkheid (vooral financieel) weggenomen. Vertrouwen dat alle zaken nu zijn meegenomen.' },
  ],
};

export const allFamilies: Family[] = [wattel];
