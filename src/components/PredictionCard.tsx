import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Gauge,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import type { AnalysisResult, ThreatLevel } from '@/types';
import { cn } from '@/lib/utils';

const THREAT_STYLES: Record<
  ThreatLevel,
  { dot: string; text: string; bar: string; bg: string; border: string }
> = {
  Low: {
    dot: 'bg-threat-low',
    text: 'text-threat-low',
    bar: 'from-emerald-500 to-threat-low',
    bg: 'bg-threat-low/5',
    border: 'border-threat-low/30',
  },
  Medium: {
    dot: 'bg-threat-medium',
    text: 'text-threat-medium',
    bar: 'from-amber-500 to-threat-medium',
    bg: 'bg-threat-medium/5',
    border: 'border-threat-medium/30',
  },
  High: {
    dot: 'bg-threat-high',
    text: 'text-threat-high',
    bar: 'from-orange-500 to-threat-high',
    bg: 'bg-threat-high/5',
    border: 'border-threat-high/30',
  },
  Critical: {
    dot: 'bg-threat-critical',
    text: 'text-threat-critical',
    bar: 'from-red-600 to-threat-critical',
    bg: 'bg-threat-critical/5',
    border: 'border-threat-critical/30',
  },
};

const STATUS_ICON: Record<AnalysisResult['status'], React.ReactNode> = {
  Normal: <ShieldCheck className="h-7 w-7" />,
  Suspicious: <ShieldAlert className="h-7 w-7" />,
  'DNS Exfiltration': <ShieldX className="h-7 w-7" />,
};

interface Props {
  result: AnalysisResult;
  hasRun: boolean;
}

export function PredictionCard({ result, hasRun }: Props) {
  const t = THREAT_STYLES[result.threatLevel];
  const threatPercent =
    { Low: 18, Medium: 48, High: 76, Critical: 100 }[result.threatLevel];
  const isIdle = !hasRun;

  return (
    <section
      className={cn(
        'glass relative overflow-hidden rounded-2xl p-5 shadow-card ring-1 transition-colors sm:p-6',
        t.border,
        t.bg,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl',
          result.threatLevel === 'Critical'
            ? 'bg-threat-critical/15'
            : result.threatLevel === 'High'
              ? 'bg-threat-high/15'
              : result.threatLevel === 'Medium'
                ? 'bg-threat-medium/10'
                : 'bg-threat-low/10',
        )}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-soc-200">
            Prediction Result
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-soc-900/60 px-2.5 py-1 text-[11px] text-soc-300">
          <Sparkles className="h-3 w-3 text-accent-soft" />
          {isIdle ? 'placeholder' : 'analyzed'}
        </span>
      </div>

      {/* Status block */}
      <div className="relative mt-5 flex items-center gap-4">
        <div
          className={cn(
            'grid h-16 w-16 shrink-0 place-items-center rounded-2xl border',
            t.border,
            t.bg,
            t.text,
          )}
        >
          {STATUS_ICON[result.status]}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-soc-300">
            Status
          </p>
          <p className={cn('text-2xl font-bold tracking-tight', t.text)}>
            {result.status}
          </p>
        </div>
      </div>

      {/* Threat level meter */}
      <div className="relative mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-soc-300">
            <Gauge className="h-3.5 w-3.5" />
            Threat Level
          </span>
          <span className={cn('font-mono font-semibold', t.text)}>
            {result.threatLevel}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-soc-900/80">
          <div
            className={cn(
              'h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out',
              t.bar,
            )}
            style={{ width: `${threatPercent}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Metric label="Isolation Forest Score" value={result.score.toFixed(2)} mono />
        <Metric
          label="Anomaly Class"
          value={result.score < 0 ? 'Inlier' : 'Outlier'}
        />
      </div>

      {/* Recommendation */}
      <div className="relative mt-5 rounded-xl border border-white/5 bg-soc-900/40 p-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent-soft" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-soc-200">
            Recommendation
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-soc-100">
          {result.recommendation}
        </p>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-soc-900/40 px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-soc-300">{label}</p>
      <p
        className={cn(
          'mt-1 text-lg font-semibold text-soc-50',
          mono && 'font-mono',
        )}
      >
        {value}
      </p>
    </div>
  );
}
