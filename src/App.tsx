import { useState, useCallback } from 'react';
import { PlayCircle, Loader2, Cpu } from 'lucide-react';
import { Header } from '@/components/Header';
import { TrafficCard } from '@/components/TrafficCard';
import { DnsFeaturePanel } from '@/components/DnsFeaturePanel';
import { PredictionCard } from '@/components/PredictionCard';
import { RecentActivity } from '@/components/RecentActivity';
import { AnomalyChart } from '@/components/AnomalyChart';
import { TRAFFIC_PRESETS } from '@/lib/presets';
import { analyze, IDLE_RESULT } from '@/lib/analysis';
import type { AnalysisResult, DnsFeatures, TrafficClass } from '@/types';
import { cn } from '@/lib/utils';

const PRESET_BY_ID = Object.fromEntries(
  TRAFFIC_PRESETS.map((p) => [p.id, p]),
) as Record<TrafficClass, (typeof TRAFFIC_PRESETS)[number]>;

function App() {
  const [activePreset, setActivePreset] = useState<TrafficClass>('Normal');
  const [features, setFeatures] = useState<DnsFeatures>(
    PRESET_BY_ID['Normal'].features,
  );
  const [result, setResult] = useState<AnalysisResult>(IDLE_RESULT);
  const [hasRun, setHasRun] = useState(false);
  const [running, setRunning] = useState(false);

  const selectPreset = useCallback((id: TrafficClass) => {
    const preset =
      id === 'Random'
        ? randomFeatures()
        : PRESET_BY_ID[id].features;
    setActivePreset(id);
    setFeatures(preset);
  }, []);

  const updateFeature = useCallback(
    (key: keyof DnsFeatures, value: number) => {
      setFeatures((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetFeatures = useCallback(() => {
    setFeatures(PRESET_BY_ID[activePreset].features);
  }, [activePreset]);

  const runAnalysis = useCallback(() => {
    setRunning(true);
    // Simulate model inference latency for UX realism (no backend).
    window.setTimeout(() => {
      setResult(analyze(features));
      setHasRun(true);
      setRunning(false);
    }, 650);
  }, [features]);

  return (
    <div className="relative min-h-screen bg-soc-950">
      {/* ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none fixed -top-40 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-96 w-96 rounded-full bg-threat-high/5 blur-3xl" />

      <div className="relative">
        <Header />

        <main className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          {/* Traffic class cards */}
          <section className="mt-2">
            <SectionLabel
              kicker="01 / Threat Classes"
              title="Select a traffic profile"
              hint="Each profile loads a representative DNS feature vector."
            />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRAFFIC_PRESETS.map((preset, i) => (
                <TrafficCard
                  key={preset.id}
                  preset={preset}
                  index={i}
                  active={activePreset === preset.id}
                  onSelect={() => selectPreset(preset.id)}
                />
              ))}
            </div>
          </section>

          {/* Feature panel */}
          <section className="mt-10">
            <SectionLabel
              kicker="02 / Feature Vector"
              title="DNS Feature Panel"
              hint="Tune the inputs that the Isolation Forest model scores."
            />
            <div className="mt-4">
              <DnsFeaturePanel
                features={features}
                activePreset={activePreset}
                onChange={updateFeature}
                onReset={resetFeatures}
              />
            </div>
          </section>

          {/* Run analysis */}
          <section className="mt-8">
            <RunButton running={running} onRun={runAnalysis} />
          </section>

          {/* Prediction + Activity */}
          <section className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <PredictionCard result={result} hasRun={hasRun} />
            </div>
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
          </section>

          {/* Chart */}
          <section className="mt-8">
            <AnomalyChart />
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}

function SectionLabel({
  kicker,
  title,
  hint,
}: {
  kicker: string;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-soft">
          {kicker}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-soc-50 sm:text-xl">
          {title}
        </h2>
      </div>
      <p className="text-sm text-soc-300">{hint}</p>
    </div>
  );
}

function RunButton({
  running,
  onRun,
}: {
  running: boolean;
  onRun: () => void;
}) {
  return (
    <div className="glass flex flex-col items-center gap-4 rounded-2xl p-6 shadow-card ring-1 ring-white/5 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft">
          <Cpu className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-soc-50">
            Isolation Forest Inference
          </p>
          <p className="text-xs text-soc-300">
            Score the current feature vector against the trained model.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRun}
        disabled={running}
        className={cn(
          'focus-ring group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl',
          'bg-gradient-to-r from-accent-deep via-accent to-accent-soft px-7 py-3.5 text-base font-semibold text-white',
          'shadow-glow transition-all duration-300 hover:shadow-[0_22px_60px_-12px_rgba(59,130,246,0.6)]',
          'disabled:cursor-not-allowed disabled:opacity-70',
        )}
      >
        {running ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing…
          </>
        ) : (
          <>
            <PlayCircle className="h-5 w-5" />
            Run Isolation Forest Analysis
          </>
        )}
        {!running && (
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 pt-6 text-center">
      <p className="text-xs text-soc-400">
        CyberGuard AI — Demonstration interface. No live network data is
        processed; analysis is simulated in the browser.
      </p>
    </footer>
  );
}

function randomFeatures(): DnsFeatures {
  const rand = (min: number, max: number) =>
    Math.round((min + Math.random() * (max - min)) * 100) / 100;
  return {
    rrCount: Math.round(rand(10, 600)),
    rrNameEntropy: rand(1.5, 5.5),
    ttlMean: Math.round(rand(5, 4000)),
    ttlVariance: Math.round(rand(1000, 700000)),
    txtFrequency: rand(0.02, 0.85),
  };
}

export default App;
