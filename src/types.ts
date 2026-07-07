export interface HistoricalTurnout {
  year: number;
  registered: number;
  votesCast: number;
  turnoutPercent: number;
}

export interface LGAData {
  name: string;
  registered2019: number;
  registered2023: number;
  growthPercent: number;
  turnoutPercent2023: number;
  networkScore: number; // 1-5 signal status
  pUsCount: number;
}

export interface StateData {
  id: string;
  name: string;
  // 2019 baseline stats
  evr2016: number; // Existing Voter Register key
  cvr2017_18: number; // Continuous Voter Registration key
  registered2019: number;
  pvcCollected2019: number;
  pvcPercent2019: number;
  
  // 2023 stats
  registered2023: number;
  pvcCollected2023: number;
  pvcPercent2023: number;
  votesCast2023: number;
  turnoutPercent2023: number;
  
  // Geographic and other profiles
  region: 'North' | 'South-West' | 'South-South' | 'South-East' | 'North-Central' | 'North-West' | 'North-East';
  latLng: [number, number]; // [lat, lng]
  networkQuality: number; // 1 to 5 average
  lgas: LGAData[];
}

export interface AnomalyAlert {
  id: string;
  geoName: string; // State or LGA
  type: 'Velocity Spike' | 'Saturation' | 'Participation Gap';
  severity: 'low' | 'medium' | 'critical';
  description: string;
  statMatch: string; // Detail comparison e.g. "+143% growth in 1 wk"
}

export interface ComplianceItem {
  id: string;
  section: string;
  title: string;
  mandate: string;
  penalty: string;
  status: 'compliant' | 'delayed' | 'failed';
  daysRemainingOrDelayed: number;
  deadlineDescription: string;
}

export type ReportType = 'deceased' | 'underaged' | 'multiple' | 'noncitizen' | 'other';

export interface CrowdsourcedReport {
  id: string;
  reporterName: string;
  email: string;
  reportType: ReportType;
  state: string;
  lga: string;
  puName: string;
  puCode: string;
  description: string;
  evidenceDetails?: string;
  timestamp: string;
  status: 'pending' | 'under_review' | 'verified';
}
