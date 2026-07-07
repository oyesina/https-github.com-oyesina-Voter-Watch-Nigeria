import { HistoricalTurnout, StateData, ComplianceItem } from '../types';

export const HISTORICAL_TURNOUT: HistoricalTurnout[] = [
  { year: 1999, registered: 57938945, votesCast: 30280052, turnoutPercent: 52.26 },
  { year: 2003, registered: 60823022, votesCast: 42018735, turnoutPercent: 69.08 },
  { year: 2007, registered: 61567036, votesCast: 35397517, turnoutPercent: 57.49 },
  { year: 2011, registered: 73528040, votesCast: 39469484, turnoutPercent: 53.68 },
  { year: 2015, registered: 67422005, votesCast: 29432083, turnoutPercent: 43.65 },
  { year: 2019, registered: 84004084, votesCast: 28614190, turnoutPercent: 34.75 },
  { year: 2023, registered: 93469008, votesCast: 24900000, turnoutPercent: 26.72 },
];

export const STATES_DATA: StateData[] = [
  {
    id: 'lagos',
    name: 'Lagos',
    evr2016: 5827846,
    cvr2017_18: 742445,
    registered2019: 6570291,
    pvcCollected2019: 5531389,
    pvcPercent2019: 84.19,
    registered2023: 7060195,
    pvcCollected2023: 6210500,
    pvcPercent2023: 87.96,
    votesCast2023: 1010500,
    turnoutPercent2023: 14.31,
    region: 'South-West',
    latLng: [6.5244, 3.3792],
    networkQuality: 4.8,
    lgas: [
      { name: 'Alimosho', registered2019: 673450, registered2023: 745800, growthPercent: 10.74, turnoutPercent2023: 11.2, networkScore: 5, pUsCount: 1545 },
      { name: 'Ikeja', registered2019: 345200, registered2023: 382400, growthPercent: 10.78, turnoutPercent2023: 18.5, networkScore: 5, pUsCount: 812 },
      { name: 'Surulere', registered2019: 412500, registered2023: 432100, growthPercent: 4.75, turnoutPercent2023: 16.2, networkScore: 5, pUsCount: 968 },
      { name: 'Ikorodu', registered2019: 389100, registered2023: 442600, growthPercent: 13.75, turnoutPercent2023: 12.8, networkScore: 4, pUsCount: 1104 },
      { name: 'Lagos Island', registered2019: 210400, registered2023: 221800, growthPercent: 5.42, turnoutPercent2023: 15.4, networkScore: 5, pUsCount: 520 },
      { name: 'Badagry', registered2019: 189300, registered2023: 215400, growthPercent: 13.79, turnoutPercent2023: 19.1, networkScore: 3, pUsCount: 495 }
    ]
  },
  {
    id: 'osun',
    name: 'Osun',
    evr2016: 1407235,
    cvr2017_18: 273263,
    registered2019: 1680498,
    pvcCollected2019: 1266587,
    pvcPercent2019: 75.37,
    registered2023: 1955657,
    pvcCollected2023: 1450200,
    pvcPercent2023: 74.15,
    votesCast2023: 733203,
    turnoutPercent2023: 37.49,
    region: 'South-West',
    latLng: [7.5898, 4.5626],
    networkQuality: 3.5,
    lgas: [
      { name: 'Osogbo', registered2019: 195400, registered2023: 242100, growthPercent: 23.90, turnoutPercent2023: 38.2, networkScore: 4, pUsCount: 485 },
      { name: 'Ife Central', registered2019: 132600, registered2023: 152400, growthPercent: 14.93, turnoutPercent2023: 41.5, networkScore: 4, pUsCount: 312 },
      { name: 'Olorunda', registered2019: 112100, registered2023: 134200, growthPercent: 19.71, turnoutPercent2023: 36.8, networkScore: 4, pUsCount: 290 },
      { name: 'Ilesa West', registered2019: 98400, registered2023: 110200, growthPercent: 11.99, turnoutPercent2023: 39.1, networkScore: 3, pUsCount: 220 },
      { name: 'Ede South', registered2019: 88500, registered2023: 104600, growthPercent: 18.19, turnoutPercent2023: 44.2, networkScore: 3, pUsCount: 195 }
    ]
  },
  {
    id: 'rivers',
    name: 'Rivers',
    evr2016: 2750000,
    cvr2017_18: 465000,
    registered2019: 3215000,
    pvcCollected2019: 2830000,
    pvcPercent2019: 88.02,
    registered2023: 3537190,
    pvcCollected2023: 3120400,
    pvcPercent2023: 88.22,
    votesCast2023: 610000,
    turnoutPercent2023: 17.25,
    region: 'South-South',
    latLng: [4.8156, 7.0498],
    networkQuality: 4.2,
    lgas: [
      { name: 'Port Harcourt', registered2019: 495000, registered2023: 532100, growthPercent: 7.49, turnoutPercent2023: 15.6, networkScore: 5, pUsCount: 1120 },
      { name: 'Obio-Akpor', registered2019: 532000, registered2023: 589400, growthPercent: 10.79, turnoutPercent2023: 14.1, networkScore: 5, pUsCount: 1250 },
      { name: 'Bonny', registered2019: 98500, registered2023: 112400, growthPercent: 14.11, turnoutPercent2023: 19.8, networkScore: 3, pUsCount: 290 },
      { name: 'Okrika', registered2019: 115200, registered2023: 124300, growthPercent: 7.90, turnoutPercent2023: 18.2, networkScore: 4, pUsCount: 305 }
    ]
  },
  {
    id: 'kano',
    name: 'Kano',
    evr2016: 4950000,
    cvr2017_18: 450000,
    registered2019: 5400000,
    pvcCollected2019: 4680000,
    pvcPercent2019: 86.67,
    registered2023: 5921370,
    pvcCollected2023: 5310000,
    pvcPercent2023: 89.67,
    votesCast2023: 1760000,
    turnoutPercent2023: 29.72,
    region: 'North-West',
    latLng: [12.0022, 8.5919],
    networkQuality: 3.8,
    lgas: [
      { name: 'Kano Municipal', registered2019: 412500, registered2023: 452100, growthPercent: 9.60, turnoutPercent2023: 28.5, networkScore: 5, pUsCount: 940 },
      { name: 'Fagge', registered2019: 310200, registered2023: 338400, growthPercent: 9.09, turnoutPercent2023: 27.2, networkScore: 4, pUsCount: 780 },
      { name: 'Tarauni', registered2019: 285400, registered2023: 312500, growthPercent: 9.50, turnoutPercent2023: 31.1, networkScore: 4, pUsCount: 650 },
      { name: 'Nassarawa', registered2019: 395100, registered2023: 432800, growthPercent: 9.54, turnoutPercent2023: 26.9, networkScore: 4, pUsCount: 910 }
    ]
  },
  {
    id: 'fct',
    name: 'FCT (Abuja)',
    evr2016: 950000,
    cvr2017_18: 210000,
    registered2019: 1160000,
    pvcCollected2019: 980000,
    pvcPercent2019: 84.48,
    registered2023: 1570307,
    pvcCollected2023: 1220000,
    pvcPercent2023: 77.69,
    votesCast2023: 320000,
    turnoutPercent2023: 20.38,
    region: 'North-Central',
    latLng: [9.0765, 7.3986],
    networkQuality: 4.7,
    lgas: [
      { name: 'Abuja Municipal', registered2019: 612500, registered2023: 894500, growthPercent: 46.04, turnoutPercent2023: 21.3, networkScore: 5, pUsCount: 1680 },
      { name: 'Bwari', registered2019: 195400, registered2023: 289100, growthPercent: 47.95, turnoutPercent2023: 19.8, networkScore: 4, pUsCount: 620 },
      { name: 'Gwagwalada', registered2019: 185200, registered2023: 218200, growthPercent: 17.82, turnoutPercent2023: 18.5, networkScore: 4, pUsCount: 395 }
    ]
  }
];

export const COMPLIANCE_DEADLINES: ComplianceItem[] = [
  {
    id: 'sect9',
    section: 'Section 9',
    title: 'Compiling National Voter Register',
    mandate: 'INEC must compile, maintain, and update a national register of voters in both electronic and hard copy.',
    penalty: 'General administrative oversight failure; potential nullification of polling records if registry is entirely unverified.',
    status: 'compliant',
    daysRemainingOrDelayed: 365,
    deadlineDescription: 'Continuous and active collection.'
  },
  {
    id: 'sect10',
    section: 'Section 10',
    title: 'Post-Year Party Delivery',
    mandate: 'Provide political parties with the official names and addresses of all registered voters within 60 days after each year.',
    penalty: 'Judicial directive; open to legal litigation for suppression of candidate awareness.',
    status: 'delayed',
    daysRemainingOrDelayed: 12,
    deadlineDescription: 'Within 60 days of the calendar year\'s end.'
  },
  {
    id: 'sect12',
    section: 'Section 12',
    title: 'Duplicate Prevention Check',
    mandate: 'No double registration. Citizens must verify age, nationality, can only register in one registration centre.',
    penalty: '₦100,000 fine or imprisonment for up to one year (Section 12(3)).',
    status: 'compliant',
    daysRemainingOrDelayed: 0,
    deadlineDescription: 'Enforced by ABIS during automated biometric deduping.'
  },
  {
    id: 'sect16',
    section: 'Section 16',
    title: 'Unlawful Posession of Cards',
    mandate: 'Citizens must hold at most one card and are forbidden to trade or duplicate voter credentials.',
    penalty: 'Fine up to ₦500,000 or up to one year imprisonment (Section 16(3)).',
    status: 'compliant',
    daysRemainingOrDelayed: 0,
    deadlineDescription: 'Active field and law enforcement vigilance.'
  },
  {
    id: 'sect19',
    section: 'Section 19',
    title: 'Public Register Scrutiny',
    mandate: 'Display voters\' register for public scrutiny for 7 days (and online), and receive objections/complaints within 14 days.',
    penalty: 'Severe risk of litigation; citizens may sue under civil codes to suspend election schedules.',
    status: 'compliant',
    daysRemainingOrDelayed: 0,
    deadlineDescription: '7-day active public window.'
  },
  {
    id: 'sect47',
    section: 'Section 47(2)',
    title: 'Electronic BVAS Verification',
    mandate: 'Mandatory electronic accreditation and verification via the Bimodal Voter Accreditation System (BVAS).',
    penalty: 'Statutory protection; any result uploaded without electronic verification triggers manual audit and potential cancellation.',
    status: 'compliant',
    daysRemainingOrDelayed: 0,
    deadlineDescription: 'Mandated on Election Day.'
  }
];
