import { useEffect, useState } from 'react'

type Batch = {
  name: string
  datasets: string[]
  rules: string[]
  score: string
}

const batches: Batch[] = [
  { name: 'Batch 1', datasets: ['customers', 'addresses'], rules: ['R1', 'R2', 'R3'], score: '96.4%' },
  { name: 'Batch 2', datasets: ['orders', 'invoices'], rules: ['R4', 'R5'], score: '91.8%' },
  { name: 'Batch 3', datasets: ['materials', 'plants'], rules: ['R6', 'R7', 'R8'], score: '88.2%' },
]

type Phase = 'load' | 'score' | 'release'
type Step = { batch: number; phase: Phase } | { batch: null; phase: 'merge' | 'output' }

const steps: Step[] = [
  ...batches.flatMap((_, batch) =>
    (['load', 'score', 'release'] as Phase[]).map((phase) => ({ batch, phase })),
  ),
  { batch: null, phase: 'merge' },
  { batch: null, phase: 'output' },
  { batch: null, phase: 'output' },
]

const memoryByPhase: Record<Step['phase'], number> = {
  load: 58,
  score: 74,
  release: 12,
  merge: 22,
  output: 8,
}

const captionByPhase: Record<Step['phase'], (batch: string) => string> = {
  load: (b) => `${b}: loading only the datasets its rules need`,
  score: (b) => `${b}: computing rule scores`,
  release: (b) => `${b}: writing partial results and freeing memory`,
  merge: () => 'Joining the partial results from every batch',
  output: () => 'One consolidated score output',
}

const ALL_AT_ONCE = 175 // % of the memory limit if every dataset were loaded together
const STEP_MS = 1100

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function BatchPipeline() {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % steps.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  const step = reducedMotion ? steps[steps.length - 1] : steps[index]
  const merging = step.phase === 'merge' || step.phase === 'output'
  const memory = memoryByPhase[step.phase]
  const caption = captionByPhase[step.phase](step.batch === null ? '' : batches[step.batch].name)

  const batchState = (i: number): 'idle' | 'active' | 'done' => {
    if (step.batch === null) return 'done'
    if (i < step.batch) return 'done'
    if (i === step.batch) return step.phase === 'release' ? 'done' : 'active'
    return 'idle'
  }

  return (
    <div
      className="p-4 sm:p-5"
      role="img"
      aria-label="Animation: rules are grouped into batches by input dataset. Each batch loads only its datasets, computes its rule scores and frees memory, keeping usage under the limit. The partial results are then joined into one consolidated score output."
    >
      {/* Batches */}
      <div className="grid gap-3 sm:grid-cols-3">
        {batches.map((batch, i) => {
          const state = batchState(i)
          const active = state === 'active'
          const done = state === 'done'
          const loaded = active
          return (
            <div
              key={batch.name}
              className={`rounded-lg border p-3 transition-all duration-500 ${
                active
                  ? 'border-[#3458c6] bg-[#f3f5fc] shadow-sm'
                  : done
                    ? 'border-[#cfe3d6] bg-[#f5faf6]'
                    : 'border-[#deded8] bg-[#fafaf8]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#585d59]">{batch.name}</span>
                <span
                  className={`text-[11px] font-medium tabular-nums transition-opacity duration-500 ${
                    done ? 'text-[#3d8b5f] opacity-100' : 'opacity-0'
                  }`}
                >
                  ✓ {batch.score}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {batch.datasets.map((ds, d) => (
                  <span
                    key={ds}
                    className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] transition-all duration-500 ${
                      loaded
                        ? 'border-[#3458c6]/40 bg-white text-[#3458c6]'
                        : 'border-[#deded8] bg-white text-[#8a8f8b]'
                    }`}
                    style={{ transitionDelay: active ? `${d * 150}ms` : '0ms' }}
                  >
                    <DatabaseIcon />
                    {ds}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {batch.rules.map((rule, r) => {
                  const scoring = step.batch === i && step.phase === 'score'
                  return (
                    <span
                      key={rule}
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-all duration-300 ${
                        done
                          ? 'bg-[#3d8b5f] text-white'
                          : scoring
                            ? 'animate-pulse bg-[#3458c6] text-white'
                            : 'bg-[#ecebe6] text-[#8a8f8b]'
                      }`}
                      style={{ animationDelay: `${r * 120}ms` }}
                    >
                      {rule}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Memory gauges */}
      <div className="mt-5 space-y-3">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8a8f8b]">Memory usage</div>
        <Gauge label="Batched" value={memory} tone="ok" />
        <Gauge label="All datasets at once" value={ALL_AT_ONCE} tone="over" />
      </div>

      {/* Merge */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex shrink-0 flex-col gap-1" aria-hidden="true">
          {batches.map((b, i) => (
            <span
              key={b.name}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                merging ? 'w-10 bg-[#3d8b5f]' : batchState(i) === 'done' ? 'w-6 bg-[#cfe3d6]' : 'w-6 bg-[#ecebe6]'
              }`}
              style={{ transitionDelay: merging ? `${i * 120}ms` : '0ms' }}
            />
          ))}
        </div>
        <span
          aria-hidden="true"
          className={`text-lg transition-colors duration-500 ${merging ? 'text-[#3d8b5f]' : 'text-[#c9c9c2]'}`}
        >
          →
        </span>
        <div
          className={`min-w-0 flex-1 rounded-lg border px-3 py-2 transition-all duration-500 ${
            step.phase === 'output'
              ? 'border-[#3d8b5f] bg-[#f5faf6]'
              : merging
                ? 'border-[#cfe3d6] bg-white'
                : 'border-dashed border-[#deded8] bg-white'
          }`}
        >
          <div className="text-xs font-semibold text-[#585d59]">Consolidated score output</div>
          <div className="mt-1 text-[11px] tabular-nums text-[#6b706c]">
            {step.phase === 'output' ? '8 rules · 6 datasets · 3 batches joined' : merging ? 'Joining…' : 'Waiting for batches'}
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-[1.25rem] text-center text-xs text-[#6b706c]" aria-live="off">
        {caption}
      </p>
    </div>
  )
}

function Gauge({ label, value, tone }: { label: string; value: number; tone: 'ok' | 'over' }) {
  // The track represents 0–200% of the memory limit; the limit marker sits at 50%.
  const width = Math.min(value, 200) / 2
  const over = tone === 'over'
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <span className="font-medium text-[#585d59]">{label}</span>
        <span className={`shrink-0 tabular-nums ${over ? 'text-[#b4483c]' : 'text-[#6b706c]'}`}>
          {over ? 'Out of memory' : `${value}% of limit`}
        </span>
      </div>
      <div className="relative mt-1 h-2.5 overflow-hidden rounded-full bg-[#ecebe6]">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${
            over
              ? 'bg-[repeating-linear-gradient(45deg,#d9776b_0_6px,#c85d50_6px_12px)]'
              : 'bg-[#3458c6]'
          }`}
          style={{ width: `${width}%` }}
        />
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-0.5 bg-[#585d59]" />
      </div>
      {!over && (
        <div className="relative mt-0.5 h-3 text-[10px] text-[#8a8f8b]">
          <span className="absolute left-1/2 -translate-x-1/2">limit</span>
        </div>
      )}
    </div>
  )
}

function DatabaseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="8" cy="3.5" rx="5.5" ry="2" />
      <path d="M2.5 3.5v9c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2v-9" />
      <path d="M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2" />
    </svg>
  )
}
