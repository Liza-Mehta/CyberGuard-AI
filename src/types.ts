export interface DnsFeatures {
  rrCount: number;
  rrNameEntropy: number;
  ttlMean: number;
  ttlVariance: number;
  txtFrequency: number;
}

export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type TrafficClass = 'Normal' | 'Suspicious' | 'Exfiltration' | 'Random';

export interface AnalysisResult {
  status: 'Normal' | 'Suspicious' | 'DNS Exfiltration';
  threatLevel: ThreatLevel;
  score: number;
  recommendation: string;
  featureContributions: FeatureContribution[];
}

export interface FeatureContribution {
  label: string;
  value: number;
  normalized: number;
  weight: number;
  contribution: number;
  flag: 'normal' | 'watch' | 'anomaly';
}

export interface ActivityAlert {
  id: string;
  timestamp: string;
  domain: string;
  sourceIp: string;
  severity: ThreatLevel;
  class: TrafficClass;
  score: number;
  action: string;
}

export interface TrafficPreset {
  id: TrafficClass;
  label: string;
  description: string;
  features: DnsFeatures;
  accent: 'green' | 'amber' | 'red' | 'violet';
}
