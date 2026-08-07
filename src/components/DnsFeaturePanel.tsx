import { Hash, Binary, Clock, Spline, FileText, RotateCcw } from 'lucide-react';
import type { DnsFeatures } from '@/types';
import { cn } from '@/lib/utils';

interface FieldDef {
  key: keyof DnsFeatures;
  label: string;
  hint: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
}

const FIELDS: FieldDef[] = [
  {
    key: 'rrCount',
    label: 'RR Count',
    hint: 'Resource records per query',
    icon: <Hash className="h-4 w-4" />,
    min: 0,
    max: 2000,
    step: 1,
  },
  {
    key: 'rrNameEntropy',
    label: 'RR Name Entropy',
    hint: 'Shannon entropy (bits)',
    icon: <Binary className="h-4 w-4" />,
    min: 0,
    max: 8,
    step: 0.01,
  },
  {
    key: 'ttlMean',
    label: 'TTL Mean',
    hint: 'Mean time-to-live (s)',
    icon: <Clock className="h-4 w-4" />,
    min: 0,
    max: 86400,
    step: 1,
  },
  {
    key: 'ttlVariance',
    label: 'TTL Variance',
    hint: 'Spread across records',
    icon: <Spline className="h-4 w-4" />,
    min: 0,
    max: 1000000,
    step: 1,
  },
  {
    key: 'txtFrequency',
    label: 'TXT Frequency',
    hint: 'Share of TXT lookups',
    icon: <FileText className="h-4 w-4" />,
    min: 0,
    max: 1,
    step: 0.01,
  },
];

interface Props {
  features: DnsFeatures;
  activePreset: string;
  onChange: (key: keyof DnsFeatures, value: number) => void;
  onReset: () => void;
}

export function DnsFeaturePanel({ features, activePreset, onChange, onReset }: Props) {
  return (
    <section className="glass rounded-2xl p-5 shadow-card ring-1 ring-white/5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-soc-200">
              DNS Feature Vector
            </h2>
          </div>
          <p className="mt-1 text-xs text-soc-300">
            Numeric features extracted from the captured query stream.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium text-soc-300 transition-colors hover:border-accent/40 hover:text-accent-soft focus-ring"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FIELDS.map((f) => (
          <FieldInput
            key={f.key}
            def={f}
            value={features[f.key]}
            onChange={(v) => onChange(f.key, v)}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/5 bg-soc-900/40 px-4 py-3 text-xs text-soc-300">
        <span className="font-mono text-soc-200">active_preset</span>
        <span className="text-soc-600">=</span>
        <span className="font-mono text-accent-soft">{activePreset}</span>
        <span className="ml-auto hidden text-soc-600 sm:inline">
          editing fields overrides the preset
        </span>
      </div>
    </section>
  );
}

function FieldInput({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-soc-900/40 p-4 transition-colors hover:border-accent/25">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-soc-100">
          <span className="text-accent-soft">{def.icon}</span>
          {def.label}
        </label>
      </div>
      <input
        type="number"
        inputMode="decimal"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === '' ? 0 : Number(v));
        }}
        className={cn(
          'no-spinner focus-ring mt-3 w-full rounded-lg border border-white/10 bg-soc-950/60 px-3 py-2.5',
          'font-mono text-base text-soc-50 transition-colors',
          'hover:border-accent/30 focus:border-accent/60',
        )}
      />
      <p className="mt-2 text-[11px] text-soc-300">{def.hint}</p>
    </div>
  );
}
