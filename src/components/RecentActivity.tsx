import { Radio, ArrowUpRight } from 'lucide-react';
import type { ActivityAlert, ThreatLevel } from '@/types';
import { RECENT_ACTIVITY } from '@/lib/alerts';
import { cn } from '@/lib/utils';

const SEV_DOT: Record<ThreatLevel, string> = {
  Low: 'bg-threat-low',
  Medium: 'bg-threat-medium',
  High: 'bg-threat-high',
  Critical: 'bg-threat-critical',
};

const SEV_TEXT: Record<ThreatLevel, string> = {
  Low: 'text-threat-low',
  Medium: 'text-threat-medium',
  High: 'text-threat-high',
  Critical: 'text-threat-critical',
};

export function RecentActivity() {
  return (
    <section className="glass flex h-full flex-col rounded-2xl p-5 shadow-card ring-1 ring-white/5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-threat-low animate-pulse" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-soc-200">
            Recent Activity
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-soc-900/60 px-2.5 py-1 text-[11px] text-soc-300">
          <Radio className="h-3 w-3 text-accent-soft" />
          live feed
        </span>
      </div>

      <ul className="scrollbar-thin -mr-2 max-h-[26rem] flex-1 space-y-2.5 overflow-y-auto pr-2">
        {RECENT_ACTIVITY.map((alert, i) => (
          <ActivityRow key={alert.id} alert={alert} index={i} />
        ))}
      </ul>
    </section>
  );
}

function ActivityRow({ alert, index }: { alert: ActivityAlert; index: number }) {
  return (
    <li
      style={{ animationDelay: `${index * 60}ms` }}
      className="group animate-fade-up rounded-xl border border-white/5 bg-soc-900/40 p-3.5 transition-all duration-300 hover:border-accent/30 hover:bg-soc-850/60"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={cn(
              'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-soc-900',
              SEV_DOT[alert.severity],
            )}
          />
          <div className="min-w-0">
            <p className="truncate font-mono text-sm text-soc-50">
              {alert.domain}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-soc-300">
              <span className="font-mono">{alert.timestamp}</span>
              <span className="font-mono text-soc-400">{alert.sourceIp}</span>
              <span className={cn('font-semibold', SEV_TEXT[alert.severity])}>
                {alert.severity}
              </span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="font-mono text-xs text-soc-200">
            {alert.score.toFixed(2)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-soc-950/60 px-1.5 py-0.5 text-[10px] text-soc-300 transition-colors group-hover:border-accent/30 group-hover:text-accent-soft">
            {alert.action}
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </li>
  );
}
