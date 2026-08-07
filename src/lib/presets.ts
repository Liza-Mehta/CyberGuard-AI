import type { TrafficPreset } from '@/types';

export const TRAFFIC_PRESETS: TrafficPreset[] = [
  {
    id: 'Normal',
    label: 'Normal Traffic',
    description: 'Baseline corporate DNS with stable TTLs and low entropy.',
    accent: 'green',
    features: {
      rrCount: 14,
      rrNameEntropy: 1.9,
      ttlMean: 1800,
      ttlVariance: 4200,
      txtFrequency: 0.04,
    },
  },
  {
    id: 'Suspicious',
    label: 'Suspicious Traffic',
    description: 'Elevated query volume and irregular TXT usage worth inspecting.',
    accent: 'amber',
    features: {
      rrCount: 96,
      rrNameEntropy: 3.6,
      ttlMean: 120,
      ttlVariance: 145000,
      txtFrequency: 0.32,
    },
  },
  {
    id: 'Exfiltration',
    label: 'DNS Exfiltration',
    description: 'High-entropy subdomains and frequent TXT — likely data tunneling.',
    accent: 'red',
    features: {
      rrCount: 540,
      rrNameEntropy: 5.2,
      ttlMean: 8,
      ttlVariance: 612000,
      txtFrequency: 0.78,
    },
  },
  {
    id: 'Random',
    label: 'Random Traffic',
    description: 'Synthesise an arbitrary feature vector for exploratory probing.',
    accent: 'violet',
    features: {
      rrCount: 30,
      rrNameEntropy: 2.8,
      ttlMean: 640,
      ttlVariance: 38000,
      txtFrequency: 0.15,
    },
  },
];
