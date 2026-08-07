import { Shield, Activity, Lock } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pt-7 pb-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-soft/30 to-accent-deep/40 ring-1 ring-accent/30 sm:h-14 sm:w-14">
              <Shield className="h-6 w-6 text-accent-soft sm:h-7 sm:w-7" strokeWidth={2.2} />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-threat-low/70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-threat-low" />
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-soc-50 sm:text-2xl">
                <span className="text-gradient-accent">CyberGuard</span>
                <span className="font-mono text-soc-200">AI</span>
              </h1>
              <p className="mt-0.5 max-w-md truncate text-xs text-soc-300 sm:text-sm">
                Real-Time DNS Threat Detection using Machine Learning
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <StatusPill
              icon={<Activity className="h-3.5 w-3.5" />}
              label="Model online"
              tone="ok"
            />
            <StatusPill
              icon={<Lock className="h-3.5 w-3.5" />}
              label="Isolation Forest v2.1"
              tone="info"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function StatusPill({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: 'ok' | 'info';
}) {
  const toneCls =
    tone === 'ok'
      ? 'border-threat-low/30 text-threat-low bg-threat-low/5'
      : 'border-accent/30 text-accent-soft bg-accent/5';
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${toneCls}`}
    >
      {icon}
      {label}
    </span>
  );
}
