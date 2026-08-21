import type {
  AnalysisResult,
  DnsFeatures,
  FeatureContribution,
  ThreatLevel,
} from '@/types';

interface FeatureSpec {
  label: string;
  weight: number;
  normalize: (v: number) => number;
}

const SPECS: Record<keyof DnsFeatures, FeatureSpec> = {
  rrCount: {
    label: 'RR Count',
    weight: 0.22,
    normalize: (v) => clamp((v - 12) / 540),
  },
  rrNameEntropy: {
    label: 'RR Name Entropy',
    weight: 0.3,
    normalize: (v) => clamp((v - 1.5) / 4),
  },
  ttlMean: {
    label: 'TTL Mean',
    weight: 0.16,
    // very low TTL is the anomaly signal — invert
    normalize: (v) => clamp(1 - v / 600),
  },
  ttlVariance: {
    label: 'TTL Variance',
    weight: 0.14,
    normalize: (v) => clamp((v - 4000) / 600000),
  },
  txtFrequency: {
    label: 'TXT Frequency',
    weight: 0.18,
    normalize: (v) => clamp((v - 0.03) / 0.8),
  },
};

function clamp(n: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, n));
}

function flagFor(normalized: number): FeatureContribution['flag'] {
  if (normalized > 0.66) return 'anomaly';
  if (normalized > 0.4) return 'watch';
  return 'normal';
}

function classify(score: number): {
  status: AnalysisResult['status'];
  threatLevel: ThreatLevel;
} {
  if (score >= 0.55)
    return { status: 'DNS Exfiltration', threatLevel: 'Critical' };
  if (score >= 0.35)
    return { status: 'DNS Exfiltration', threatLevel: 'High' };
  if (score >= 0.18)
    return { status: 'Suspicious', threatLevel: 'Medium' };
  if (score >= 0.08)
    return { status: 'Suspicious', threatLevel: 'Low' };
  return { status: 'Normal', threatLevel: 'Low' };
}

function recommend(
  status: AnalysisResult['status'],
  topFlagged: string[],
): string {
  switch (status) {
    case 'Normal':
      return 'No suspicious DNS behaviour detected. Traffic remains within the established baseline.';
    case 'Suspicious':
      return `Elevated anomaly indicators in ${topFlagged.join(
        ', ',
      )}. Recommend deeper packet inspection and 24h observation window.`;
    case 'DNS Exfiltration':
      return `Strong exfiltration signature across ${topFlagged.join(
        ', ',
      )}. Initiate response: block resolver, isolate host, preserve pcap for forensics.`;
  }
}

export function analyze(features: DnsFeatures): AnalysisResult {
  const contributions: FeatureContribution[] = (
    Object.keys(SPECS) as (keyof DnsFeatures)[]
  ).map((key) => {
    const spec = SPECS[key];
    const value = features[key];
    const normalized = spec.normalize(value);
    return {
      label: spec.label,
      value,
      normalized,
      weight: spec.weight,
      contribution: normalized * spec.weight,
      flag: flagFor(normalized),
    };
  });

  const weighted = contributions.reduce(
    (sum, c) => sum + c.contribution,
    0,
  );

  // Map weighted [0..1] into an Isolation-Forest-style decision score.
  // Negative => inlier (normal), positive => outlier (anomaly).
  const score = Number((weighted * 1.25 - 0.18).toFixed(2));

  const { status, threatLevel } = classify(weighted);
  const topFlagged = contributions
    .filter((c) => c.flag !== 'normal')
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 2)
    .map((c) => c.label);

  return {
    status,
    threatLevel,
    score,
    recommendation: recommend(status, topFlagged),
    featureContributions: contributions,
  };
}

// The placeholder / idle result shown before the first analysis run.
export const IDLE_RESULT: AnalysisResult = {
  status: 'Normal',
  threatLevel: 'Low',
  score: -0.12,
  recommendation: 'No suspicious DNS behaviour detected.',
  featureContributions: [],
};
