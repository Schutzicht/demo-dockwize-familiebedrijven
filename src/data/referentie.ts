// AUTO-GEGENEREERD uit 'beoordelingscodes_oorzaken_verbeteracties.xlsx' (referentie dbase).
// Standaard knelpunten (risico's) en verbeteracties (oplossingen) per beoordelingscategorie,
// inclusief de codes en de korte 'kleurplaat'-teksten die op het eindrapport komen.

import type { CategoryId } from './types';

export interface Verbeteractie {
  /** Oplossingscode, bv '1.1.1' */
  code: string;
  /** Volledige omschrijving van de verbeteractie */
  omschrijving: string;
  /** Korte kleurplaat-tekst voor in het rapport */
  kort: string;
}

export interface Knelpunt {
  /** Risicocode, bv '1.1' */
  code: string;
  /** Volledige omschrijving van het knelpunt / risico */
  omschrijving: string;
  /** Korte kleurplaat-tekst voor in het rapport */
  kort: string;
  /** Bijbehorende verbeteracties */
  verbeteracties: Verbeteractie[];
}

export interface ReferentieCategorie {
  id: CategoryId;
  afkorting: string;
  titel: string;
  knelpunten: Knelpunt[];
}

export const REFERENTIE_DB: ReferentieCategorie[] = [
  {
    id: 1,
    afkorting: 'SCEN',
    titel: 'SCENARIO DUIDELIJK',
    knelpunten: [
      {
        code: '1.1',
        omschrijving: 'Geen mogelijke opvolgers in beeld (nadat de relevante stappen zijn doorlopen en alle belanghebbenden geraadpleegd).',
        kort: 'Geen opvolger',
        verbeteracties: [
          {
            code: '1.1.1',
            omschrijving: 'Verkoop aan derde',
            kort: 'Verkoop derde',
          },
          {
            code: '1.1.2',
            omschrijving: 'Behoud eigendom, overdracht management aan derde (werknemer of aan te trekken manager)',
            kort: 'Behoud eigendom, management naar wn-er/derde',
          },
        ],
      },
      {
        code: '1.2',
        omschrijving: 'De mogelijke opvolgscenario\'s zijn niet in overleg met alle relevante betrokkenen uitgewerkt',
        kort: 'Niet alle scenario\'s onderkend',
        verbeteracties: [
          {
            code: '1.2.1',
            omschrijving: 'Het is van belang dat alle relevante betrokkenen op de hoogte zijn van de mogelijke opvolgscenario\'s.',
            kort: 'Kennis verwerven',
          },
        ],
      },
      {
        code: '1.3',
        omschrijving: 'De mogelijke opvolgscenario\'s zijn niet in overleg met alle relevante betrokkenen uitgewerkt',
        kort: 'Geen inbreng alle betrokkenen',
        verbeteracties: [
          {
            code: '1.3.1',
            omschrijving: 'Het is van belang dat alle relevante betrokkenen hun inbreng hebben gehad (zich \'gehoord\' voelen).',
            kort: 'Aan tafel',
          },
        ],
      },
      {
        code: '1.4',
        omschrijving: 'Het is niet bekend hoe de positie van alle opvolgers en overdragers binnen het bedrijf zal veranderen',
        kort: 'Onduidelijk toekomstperspectief opvolgers/overdragers',
        verbeteracties: [
          {
            code: '1.4.1',
            omschrijving: 'Een verdere doordenking van toekomstscenario\'s is wenselijk waarbij bij ieders positie wordt stilgestaan.',
            kort: 'Verder doordenking, evt met begeleiding',
          },
        ],
      },
      {
        code: '1.5',
        omschrijving: 'Het is niet voor alle eigendom componenten helder of ze meegaan in de overdracht (bv ouderlijk huis, grond, …).',
        kort: 'Overdracht eigendom niet duidelijk.',
        verbeteracties: [
          {
            code: '1.5.1',
            omschrijving: 'Expliciet benoemen welke eigendommen het betreft en afspeken route naar besluit.',
            kort: 'Besluit nemen eigendom wel of niet meenemen in overdracht.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    afkorting: 'OPV',
    titel: 'OPVOLGING GESCHIKT',
    knelpunten: [
      {
        code: '2.1',
        omschrijving: 'De beoogde opvolgers hebben nog niet de benodigde capaciteiten en/of kwalificaties om het bedrijf over te nemen.',
        kort: 'Capaciteiten/kwalificaties ontbreken (nog)',
        verbeteracties: [
          {
            code: '2.1.1',
            omschrijving: 'Het is van belang dat de beoogde opvolgers in de komende periode de benodigde capaciteiten en/of kwalificaties verwerven. Hier moet een duidelijk plan en traject voor worden opgesteld. Een competentietest kan hiervoor een goed vertrekpunt zijn. Uit de competentietest zal het ontwikkelpotentieel blijken.',
            kort: 'Ontwikkelplan/-traject opzetten en uitvoeren competentietest',
          },
        ],
      },
      {
        code: '2.2',
        omschrijving: 'De beoogde opvolgers hebben niet de benodigde motivatie om het bedrijf succesvol over te nemen',
        kort: 'Motvatie ontbreekt',
        verbeteracties: [
          {
            code: '2.2.1',
            omschrijving: 'De opvolger dient gesprekken te voeren om eventuele motivatie aan te wakkeren; een meewerkperiode kan hierin ook ondersteunend zijn. Afhankelijk van het verloop dient een duidelijke keuze te maken over het vervolg.',
            kort: 'Motiveren, evt. meewerkperiode. Duidelijke keuze maken',
          },
        ],
      },
      {
        code: '2.3',
        omschrijving: 'Er zijn geen afspraken gemaakt over hoe het bedrijf kennis, expertise, netwerk en klantcontacten van de overdrager behoudt voor het bedrijf na de bedrijfsopvolging.',
        kort: 'Geen duidelijke borging kennis/kunde overdrager',
        verbeteracties: [
          {
            code: '2.3.1',
            omschrijving: 'Overdrager en overnemer dienen afspraken met betrekking tot de kennisoverdracht te maken. Mogelijk is dat de overdrager na de overname in een ondersteunende rol in dienst van de onderneming blijft om de overdracht te versoepelen.',
            kort: 'Afspraken maken / overdrachtsperiode',
          },
        ],
      },
      {
        code: '2.4',
        omschrijving: 'De fit van persoonlijkheid, het ondernemersprofiel en de persoonlijke ambitie van de potentiele opvolgers van het familiebedrijf is niet voldoende beoordeeld en getoetst voor hun toekomstige rol',
        kort: 'Opvolger \'past\' niet',
        verbeteracties: [
          {
            code: '2.4.1',
            omschrijving: 'Voor het succesvol overnemen van het familiebedrijf is het van cruciaal belang dat deze zaken kritisch beoordeeld worden door zowel opvolger als overdrager als eventuele adviseur. Indien de fit van de opvolger onvoldoende wordt geacht is het noodzakelijk om passende vervolgstappen te nemen.',
            kort: 'Passende vervolgstappen (alternatief scenario?)',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    afkorting: 'FAM',
    titel: 'FAMILIE AFSPRAKEN',
    knelpunten: [
      {
        code: '3.1',
        omschrijving: 'Er zijn geen afspraken gemaakt met de familie over de zeggenschap, het voortbestaan en eigendom van het familiebedrijf.',
        kort: 'Geen afspraken binnen familiebedrijf',
        verbeteracties: [
          {
            code: '3.1.1',
            omschrijving: 'Denk aan een manier om de afspraken vast te leggen, bijvoorbeeld een aandeelhouders- overeenkomst of een familiestatuut. Hier kan gedacht worden aan afspraken over de invloed van de familie op het bedrijf, kring van aandeelhouders en de regels rondom de overdracht en vererving van aandelen.',
            kort: 'Aandeelhoudersovereenkomst / familiestatuut opstellen',
          },
        ],
      },
      {
        code: '3.2',
        omschrijving: 'Er zijn geen normen en waarden expliciet vastgelegd en/of bekend.',
        kort: 'Normen en waarden binnen familie niet vastgelegd.',
        verbeteracties: [
          {
            code: '3.2.1',
            omschrijving: 'Het gezamenlijk bespreken van de uitgangspunten en het, met hulp van een procesbegeleider, uitwerken van een familiestatuut leidt tot inzicht en vastlegging van de gezamenlijke normen en waarden',
            kort: 'Uitwerken van familiestatuut',
          },
        ],
      },
      {
        code: '3.3',
        omschrijving: 'Er zijn geen afspraken vastgelegd over hoe om te gaan met familieleden in het bedrijf, zoals bijvoorbeeld het aanstellen van familieleden en het bepalen van hun beloning.',
        kort: 'Onduidelijkheid over familieleden in bedrijf',
        verbeteracties: [
          {
            code: '3.3.1',
            omschrijving: 'Een familiestatuut een goede leidraad voor bepaalde onderwerpen die gaan over de onderlinge verhoudingen tussen familieleden.',
            kort: 'Uitwerken van familiestatuut',
          },
        ],
      },
      {
        code: '3.4',
        omschrijving: 'Er zijn geen specifieke afspraken gemaakt voor het geval potentiële opvolgers van een bedrijf op een later moment willen opvolgen.',
        kort: 'Geen afspraken over opvolgingsmogelijkheden in de toekomst',
        verbeteracties: [
          {
            code: '3.4.1',
            omschrijving: 'Het kan de moeite waard zijn om naar het certificeren van aandelen te kijken door middel van een Stichting Administratiekantoor. Zo kan de bedrijfsopvolger in het bestuur van de STAK zitten om op een later moment meer zeggenschap te (ver)krijgen. Dit kan ook geactualiseerd worden door stemrechtloze aandelen.',
            kort: 'Mogeljkheden afwegen met geleidelijke overgang (bezit/bestuur)',
          },
        ],
      },
      {
        code: '3.5',
        omschrijving: 'Er zijn geen formele afspraken gemaakt over inspraak en actieve deelname van partners en opvolgers in het bedrijf.',
        kort: 'Onduideiljkheid over (toekomstige) partners',
        verbeteracties: [
          {
            code: '3.5.1',
            omschrijving: 'De rol van de partners van de kinderen uitwerken in een familiestatuut',
            kort: 'Uitwerken van familiestatuut',
          },
        ],
      },
      {
        code: '3.6',
        omschrijving: 'Er zijn geen afspraken gemaakt met betrekking tot \'goed bestuur\' van het familiebedrijf.',
        kort: 'Afspraken rondom \'governance\' liggen niet vast',
        verbeteracties: [
          {
            code: '3.6.1',
            omschrijving: 'Denk aan afspraken maken over waarden zoals transparantie, integriteit, verantwoordelijkheid en het waarborgen van de continuïteit van het bedrijf op lange termijn.',
            kort: '(Uitgangspunten) governance vastleggen',
          },
        ],
      },
      {
        code: '3.7',
        omschrijving: 'Er zijn geen formele afspraken gemaakt en/of vastgelegd over hoe het bedrijf met conflicten moet omgaan binnen de familie en/of het bedrijf.',
        kort: 'Geen afspraken over geschilbeslechting binnen familie / bedrijf',
        verbeteracties: [
          {
            code: '3.7.1',
            omschrijving: 'Cruciaal is het regelen van een contractuele geschillenregeling in de statuten of in een aandeelhoudersovereenkomst. Bijvoorbeeld het gebruik van shoot-out clausules en exit-regelingen voorkomen impasses in het familiebedrijf.',
            kort: 'Uitwerken van familiestatuut / aandeelhoudersovereenkomst',
          },
        ],
      },
      {
        code: '3.8',
        omschrijving: 'Er is geen duidelijk plan voor de terugtrekking van de overdrager na de bedrijfsopvolging.',
        kort: 'Geen plan voor afbouw overdrager',
        verbeteracties: [
          {
            code: '3.8.1',
            omschrijving: 'Het is van belang dat betrokken partijen zich bewust zijn van de voor- en nadelen van een actievere terugtrekking en hier dient een passend en uitgewerkt plan voor te worden gemaakt.',
            kort: 'Bespreken en tijdspad vastleggen',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    afkorting: 'WAARDE',
    titel: 'WAARDERING VERMOGEN',
    knelpunten: [
      {
        code: '4.1',
        omschrijving: 'De betrokken parijen hebben geen of een verkeerd inzicht in de waarde van het beoogde overnameobject',
        kort: 'Geen of verkeerd inzicht in waarde onderneming',
        verbeteracties: [
          {
            code: '4.1.1',
            omschrijving: 'Laat een indicatieve waardebepaling uitvoeren',
            kort: 'Indicatieve waardering',
          },
        ],
      },
      {
        code: '4.2',
        omschrijving: 'De beoogde opvolgers hebben geen inzicht in de waarde van het familievermogen',
        kort: 'Geen inzicht in waarde familievermogen',
        verbeteracties: [
          {
            code: '4.2.1',
            omschrijving: 'Deel wat men wil delen, transparantie op dit gebied kan de opvolgende generatie veel inzicht geven.',
            kort: 'Transparantie',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    afkorting: 'FIN OVD',
    titel: 'FINANCIËN overdrager',
    knelpunten: [
      {
        code: '5.1',
        omschrijving: 'Het pensioen van de overdrager (en diens partner) is afhankelijk van de overdracht.',
        kort: 'Pensioen afhankelijk van overdracht',
        verbeteracties: [
          {
            code: '5.1.1',
            omschrijving: 'Bespreek welk risico overdrager wil en kan lopen ten aanzien van de overdrachtswaarde',
            kort: 'Bespreek risico\'s pensioen',
          },
        ],
      },
      {
        code: '5.2',
        omschrijving: 'Er is geen duidelijk beeld van hoeveel inkomen er nodig is voor het pensioen.',
        kort: 'Geen inzicht in benodigd inkomen',
        verbeteracties: [
          {
            code: '5.2.1',
            omschrijving: 'Het is van belang dat hier open en duidelijk over gesproken wordt. Waar nodig dienen geschikte adviseurs ingeschakeld te worden',
            kort: 'In beeld brengen',
          },
        ],
      },
      {
        code: '5.3',
        omschrijving: 'Overdrager is niet bereid of in staat om een bepaald risico te lopen.',
        kort: 'Geen risico over pensioen',
        verbeteracties: [
          {
            code: '5.3.1',
            omschrijving: 'Onderzoek externe financiering overdracht',
            kort: 'Externe financiering',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    afkorting: 'FIN OPV',
    titel: 'FINANCIËN opvolger',
    knelpunten: [
      {
        code: '6.1',
        omschrijving: 'Opvolger is niet bewust van het ondernemersrisico dat hij loopt door de bedrijfsovername',
        kort: 'Opvolger(s) onvoldoende risicobewust',
        verbeteracties: [
          {
            code: '6.1.1',
            omschrijving: 'Ondernemersrisico kan zijn bij bedrijfsopvolging dat de onderneming te afhankelijk is van de kennis en kwaliteiten van de overdrager.',
            kort: 'Bespreken ondernemersrisico en analyse (bijv SWOT)',
          },
        ],
      },
      {
        code: '6.2',
        omschrijving: 'De opvolger verkrijgt geen ander advies dan dat van de adviseur van de overdrager.',
        kort: 'Eenzijdig advies',
        verbeteracties: [
          {
            code: '6.2.1',
            omschrijving: 'Zelf een financiële adviseur zoeken en advies ontvangen over de bedrijfsovername. Deze kan de opvolger advies geven over de risico\'s en knelpunten die hij kan tegen komen in dit proces.',
            kort: 'Eigen adviseur / second-opinion',
          },
        ],
      },
      {
        code: '6.3',
        omschrijving: 'De opvolger beschikt over onvoldoende informatie om een beoordeling te maken van de financiële situatie en om een weloverwogen beslissing te namen over de overname.',
        kort: 'Onvoldoende beslissingsoinformatie',
        verbeteracties: [
          {
            code: '6.3.1',
            omschrijving: 'Analyse naar hiaten en hierop gericht informeren',
            kort: 'Gerichte informatievoorziening',
          },
        ],
      },
      {
        code: '6.4',
        omschrijving: 'De opvolger heeft geen duidelijk beeld van zijn financiele situtatie die zich voor zal doen na de overname',
        kort: 'Onduidelijke financieel toekomstbeeld',
        verbeteracties: [
          {
            code: '6.4.1',
            omschrijving: 'Financieel toekomstbeeld (bestaansonderhoud en overnamegerelateerde uitgaven) in beeld brengen',
            kort: 'Financieel toekomstplaatje in beeld brengen',
          },
        ],
      },
      {
        code: '6.5',
        omschrijving: 'Onzekerheid / onvrede bij niet overnemende kinderen',
        kort: 'Onzekerheid/onvrede overige kinderen',
        verbeteracties: [
          {
            code: '6.5.1',
            omschrijving: 'Overleg ook met broers en/of zussen die niet in het bedrijf werken; houd rekening met emoties en pas op voor familieblindheid. Zorg voor kapitaalallocatie aan alle kinderen.',
            kort: 'Breed familie-overleg, alle kinderen financieel gelijk bedelen',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    afkorting: 'FINANCIERING',
    titel: 'FINANCIERING OVERDRACHT',
    knelpunten: [
      {
        code: '7.1',
        omschrijving: 'Er is geen goed of duidelijk plan gemaakt met betrekking tot de financiering van de overname',
        kort: 'Financieringsplan ontbreekt',
        verbeteracties: [
          {
            code: '7.1.1',
            omschrijving: 'Ten eerste moet er worden gekozen voor een financiering bij de bank of toch binnen de familie. Er kan gekozen worden voor inbreng van eigen vermogen, daarnaast een achtergestelde lening (verkoperslening) en/of financiering bij de bank.',
            kort: 'Financieringsplan uitwerken',
          },
        ],
      },
      {
        code: '7.2',
        omschrijving: 'Het plan met betrekking tot de financiering van de overname wordt door een van de de betrokken partijen onrealistisch geacht',
        kort: 'Financieringsplan mogelijk onrealistisch',
        verbeteracties: [
          {
            code: '7.2.1',
            omschrijving: 'Laat het plan toetsen en zoek eventueel naar alternatieven',
            kort: 'Plan toetsen / alternatieven zoeken',
          },
        ],
      },
    ],
  },
  {
    id: 8,
    afkorting: 'KOERS',
    titel: 'BEDRIJFSSTRATEGIE',
    knelpunten: [
      {
        code: '8.1',
        omschrijving: 'Er is geen toekomstvisie in beeld bij zowel de overdrager als de opvolger voor het bedrijf. Hier wordt gedoeld op een missie, ambitie, visie en/of doelstellingen.',
        kort: 'Toekomstvisie ontbreekt',
        verbeteracties: [
          {
            code: '8.1.1',
            omschrijving: 'Toekomst visie uitwerken al dan niet met ondersteuning van een adviseur',
            kort: 'Toekomstvisie uitwerken',
          },
        ],
      },
      {
        code: '8.2',
        omschrijving: 'De vertaling van de strategie in concrete plannen ontbreekt',
        kort: 'Geen planmatige uitwerking strategie',
        verbeteracties: [
          {
            code: '8.2.1',
            omschrijving: 'Vertaling van strategie naar bedrijfsplannen / afdelingsplannen uitwerken al dan niet met ondersteuning van een adviseur',
            kort: 'Strategie vertalen in concrete plannen',
          },
        ],
      },
    ],
  },
  {
    id: 9,
    afkorting: 'PROCES',
    titel: 'PROCES EN REGIE',
    knelpunten: [
      {
        code: '9.1',
        omschrijving: 'Er zijn geen acties uitgevoerd ten behoeve van het overdrachtsproces.',
        kort: 'Geen actie mbt overdracht',
        verbeteracties: [
          {
            code: '9.1.1',
            omschrijving: 'Een actieplan opmaken betreffende de overdracht van het familiebedrijf kan handig zijn om overzichtelijk te zien wat er nodig is om te doen per stap, bijvoorbeeld de start- en overdrachtsdatum.',
            kort: 'Actieplan uitwerken',
          },
        ],
      },
      {
        code: '9.2',
        omschrijving: 'Nog geen adviseurs en experts ingeschakeld.',
        kort: 'Geen ondersteuning adviseur',
        verbeteracties: [
          {
            code: '9.2.1',
            omschrijving: 'Het overnemen van een onderneming is een bijzonder proces. Er spelen diverse factoren waaronder emotie. Het laten begeleiden door een bedrijfsovername specialist is daarom aan te raden. De adviseur kan alle onderdelen binnen het proces doornemen en adviseren welke strategie het beste is.',
            kort: 'Overweeg inschakeling adviseur',
          },
        ],
      },
      {
        code: '9.3',
        omschrijving: 'Er zijn geen tijdslijnen en belanrijke milestones voor het overdrachtsproces vastgesteld',
        kort: 'Geen tijdschema',
        verbeteracties: [
          {
            code: '9.3.1',
            omschrijving: 'Maak een actieplan met duidelijke tijdslijnen',
            kort: 'Proces uitwerken in tijd',
          },
        ],
      },
      {
        code: '9.4',
        omschrijving: 'De geschatte tijdsduur die nodig is voor het volledige proces is niet bekend of wordt niet realistisch geacht door een van de betrokkenen',
        kort: 'Tijdspad niet bekend of onrealistisch',
        verbeteracties: [
          {
            code: '9.4.1',
            omschrijving: 'Werk het tijdspad uit en toets dit bij een ervaren adviseur',
            kort: 'Tijdspad uitwerken en laten toetsen',
          },
        ],
      },
      {
        code: '9.5',
        omschrijving: 'Het geschatte budget voor het gehele proces is niet bekend of realistisch geacht door alle betrokken partijen',
        kort: 'Budget niet in beeld',
        verbeteracties: [
          {
            code: '9.5.1',
            omschrijving: 'Werk per onderdeel een budget uit en toets dit bij een ervaren adviseur',
            kort: 'Budget uitwerken en laten toetsen',
          },
        ],
      },
    ],
  },
];

// ---- Afgeleide lookups -------------------------------------------------

export const ALLE_KNELPUNTEN: (Knelpunt & { categoryId: CategoryId })[] =
  REFERENTIE_DB.flatMap((c) => c.knelpunten.map((k) => ({ ...k, categoryId: c.id })));

export const ALLE_VERBETERACTIES: (Verbeteractie & { categoryId: CategoryId; knelpuntCode: string })[] =
  REFERENTIE_DB.flatMap((c) =>
    c.knelpunten.flatMap((k) =>
      k.verbeteracties.map((v) => ({ ...v, categoryId: c.id, knelpuntCode: k.code })),
    ),
  );

export function getKnelpunt(code: string): (Knelpunt & { categoryId: CategoryId }) | undefined {
  return ALLE_KNELPUNTEN.find((k) => k.code === code);
}

export function getVerbeteractie(code: string): (Verbeteractie & { categoryId: CategoryId; knelpuntCode: string }) | undefined {
  return ALLE_VERBETERACTIES.find((v) => v.code === code);
}

export function referentieVoorCategorie(id: CategoryId): ReferentieCategorie | undefined {
  return REFERENTIE_DB.find((c) => c.id === id);
}
