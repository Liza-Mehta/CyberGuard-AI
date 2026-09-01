import { LineChart, Activity } from 'lucide-react';

export function AnomalyChart() {
  return (
    <section className="glass relative overflow-hidden rounded-2xl p-5 shadow-card ring-1 ring-white/5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-soc-200">
            Anomaly Score Over Time
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-soc-900/60 px-2.5 py-1 text-[11px] text-soc-300">
          <Activity className="h-3 w-3 text-accent-soft" />
          60s window
        </span>
      </div>

      <div className="relative h-56 w-full sm:h-64">
        {/* grid */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* y axis labels */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between py-1 text-[10px] font-mono text-soc-400">
          <span>+1.0</span>
          <span>+0.5</span>
          <span className="text-soc-300">0.0</span>
          <span>-0.5</span>
          <span>-1.0</span>
        </div>
        {/* threshold band */}
        <div className="pointer-events-none absolute inset-x-6 top-[12%] h-[22%] rounded-md border border-dashed border-threat-high/25 bg-threat-high/5" />
        <span className="pointer-events-none absolute right-7 top-[14%] text-[10px] font-mono text-threat-high/70">
          anomaly threshold
        </span>

        {/* empty state */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-soc-900/60 text-soc-300">
            <LineChart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-soc-200">
              Awaiting analysis data
            </p>
            <p className="mt-0.5 text-xs text-soc-400">
              Run an Isolation Forest analysis to chart the score stream.
            </p>
          </div>
          <div className="mt-1 h-1 w-40 overflow-hidden rounded-full bg-soc-900/80">
            <div className="shimmer-line h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
