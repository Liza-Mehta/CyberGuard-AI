import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Dices,
  ArrowRight,
} from 'lucide-react';
import type { TrafficPreset } from '@/types';
import { cn } from '@/lib/utils';

const ACCENT_MAP: Record<
  TrafficPreset['accent'],
  { icon: React.ReactNode; ring: string; glow: string; text: string; chip: string }
> = {
  green: {
    icon: <CheckCircle2 className="h-5 w-5" />,
    ring: 'hover:border-threat-low/50',
    glow: 'group-hover:shadow-[0_18px_50px_-12px_rgba(34,197,94,0.35)]',
    text: 'text-threat-low',
    chip: 'bg-threat-low/10 text-threat-low border-threat-low/20',
  },
  amber: {
    icon: <AlertTriangle className="h-5 w-5" />,
    ring: 'hover:border-threat-medium/50',
    glow: 'group-hover:shadow-[0_18px_50px_-12px_rgba(245,158,11,0.35)]',
    text: 'text-threat-medium',
    chip: 'bg-threat-medium/10 text-threat-medium border-threat-medium/20',
  },
  red: {
    icon: <ShieldAlert className="h-5 w-5" />,
    ring: 'hover:border-threat-high/50',
    glow: 'group-hover:shadow-[0_18px_50px_-12px_rgba(239,68,68,0.4)]',
    text: 'text-threat-high',
    chip: 'bg-threat-high/10 text-threat-high border-threat-high/20',
  },
  violet: {
    icon: <Dices className="h-5 w-5" />,
    ring: 'hover:border-accent/50',
    glow: 'group-hover:shadow-glow',
    text: 'text-accent-soft',
    chip: 'bg-accent/10 text-accent-soft border-accent/20',
  },
};

interface Props {
  preset: TrafficPreset;
  index: number;
  active: boolean;
  onSelect: () => void;
}

export function TrafficCard({ preset, index, active, onSelect }: Props) {
  const a = ACCENT_MAP[preset.accent];
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{ animationDelay: `${index * 70}ms` }}
      className={cn(
        'glass glass-hover group relative flex animate-fade-up flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 transition-all duration-300',
        'shadow-card',
        a.ring,
        a.glow,
        active
          ? 'border-transparent ring-2 ring-accent/60 shadow-glow'
          : 'ring-white/5',
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={cn(
            'grid h-11 w-11 place-items-center rounded-xl border',
            a.chip,
          )}
        >
          {a.icon}
        </span>
        <ArrowRight
          className={cn(
            'h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100',
            a.text,
          )}
        />
      </div>

      <div className="mt-1">
        <h3 className="text-base font-semibold text-soc-50">{preset.label}</h3>
        <p className="mt-1 text-sm leading-relaxed text-soc-300">
          {preset.description}
        </p>
      </div>

      <div
        className={cn(
          'mt-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium',
          a.chip,
        )}
      >
        <span className="font-mono">{preset.id}</span>
        {active && <span className="opacity-70">· selected</span>}
      </div>
    </button>
  );
}
