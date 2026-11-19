import { useEffect, useState } from 'react'
import { FADE_UP, usePrefersReducedMotion } from '../agent/hooks'

type Outcome = 'tp' | 'fp' | 'fn'

// Illustrative reference cases: which records the agent returned versus the
// records a reviewer marked as relevant. Values are examples, not results.
const refCases: { question: string; records: { id: string; outcome: Outcome }[] }[] = [
  {
    question: 'Leaking-cap complaints for Product A in 2026',
    records: [
      { id: 'CMP-0418', outcome: 'tp' },
      { id: 'CMP-0377', outcome: 'tp' },
      { id: 'CMP-0291', outcome: 'tp' },
      { id: 'CMP-0254', outcome: 'tp' },
      { id: 'CMP-0402', outcome: 'fp' },
      { id: 'CMP-0230', outcome: 'fn' },
    ],
  },
  {
    question: 'CAPAs and change controls linked to CMP-2026-0418',
    records: [
      { id: 'CAPA-0193', outcome: 'tp' },
      { id: 'CAPA-0201', outcome: 'tp' },
      { id: 'CC-0577', outcome: 'tp' },
    ],
  },
  {
    question: 'Related records for investigating CMP-2026-0377',
    records: [
      { id: 'B2611', outcome: 'tp' },
      { id: 'CMP-0418', outcome: 'tp' },
      { id: 'CAPA-0193', outcome: 'tp' },
      { id: 'CC-0577', outcome: 'tp' },
      { id: 'DEV-0088', outcome: 'fp' },
      { id: 'INV-0377', outcome: 'tp' },
      { id: 'LAB-1142', outcome: 'fn' },
    ],
  },
]

const outcomeStyle: Record<Outcome, { label: string; chip: string; dot: string }> = {
  tp: { label: 'Found & relevant', chip: 'border-[#c6e2d1] bg-[#eaf5ee] text-[#2f7a50]', dot: 'bg-[#3d8b5f]' },
  fp: { label: 'Found, not relevant', chip: 'border-[#f1dcb4] bg-[#fdf3e2] text-[#a26a12]', dot: 'bg-[#c9922e]' },
  fn: { label: 'Relevant, missed', chip: 'border-dashed border-[#f0c7c0] bg-white text-[#b4483c]', dot: 'bg-[#c85d50]' },
}

const STEP_MS = 5000

function Metric({ name, value, formula, hint }: { name: string; value: number; formula: string; hint: string }) {
  const pct = Math.round(value * 100)
  return (
    <div className="rounded-lg border border-[#ecebe6] bg-white p-3">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold text-[#585d59]">{name}</span>
        <span className="text-lg font-semibold tabular-nums text-[#585d59]">{pct}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#ecebe6]">
        <div className="h-full rounded-full bg-[#3458c6] transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 font-mono text-[10px] text-[#8a8f8b]">{formula}</div>
      <div className="mt-0.5 text-[10px] leading-snug text-[#8a8f8b]">{hint}</div>
    </div>
  )
}

export function PrecisionRecall() {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || reducedMotion) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % refCases.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [auto, reducedMotion])

  const rc = refCases[index]
  const count = (o: Outcome) => rc.records.filter((r) => r.outcome === o).length
  const tp = count('tp')
  const fp = count('fp')
  const fn = count('fn')
  const precision = tp / (tp + fp)
  const recall = tp / (tp + fn)

  return (
    <div className="p-4 sm:p-5">
      <div role="tablist" aria-label="Reference cases" className="flex flex-wrap gap-1.5">
        {refCases.map((c, i) => (
          <button
            key={c.question}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => {
              setAuto(false)
              setIndex(i)
            }}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              i === index ? 'border-[#3458c6] bg-[#3458c6] text-white' : 'border-[#deded8] bg-white text-[#6b706c] hover:border-[#aeb5c9]'
            }`}
          >
            Case {i + 1}
          </button>
        ))}
      </div>

      <div key={index} className={FADE_UP} aria-live="polite">
        <p className="mt-3 text-xs text-[#585d59]">
          <span className="font-semibold">Reference question: </span>
          {rc.question}
        </p>

        <ul className="mt-2 flex flex-wrap gap-1.5">
          {rc.records.map((r, i) => (
            <li
              key={r.id}
              className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] ${outcomeStyle[r.outcome].chip} ${FADE_UP}`}
              style={{ animationDelay: `${i * 120}ms` }}
              title={outcomeStyle[r.outcome].label}
            >
              {r.id}
            </li>
          ))}
        </ul>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Metric
            name="Precision"
            value={precision}
            formula={`${tp} / (${tp} + ${fp}) found records are relevant`}
            hint="Low precision buries the investigator in noise."
          />
          <Metric
            name="Recall"
            value={recall}
            formula={`${tp} / (${tp} + ${fn}) relevant records were found`}
            hint="Low recall means evidence is missed."
          />
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#8a8f8b]">
        {(Object.keys(outcomeStyle) as Outcome[]).map((o) => (
          <li key={o} className="flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${outcomeStyle[o].dot}`} />
            {outcomeStyle[o].label}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-[#8a8f8b]">Illustrative reference cases and values.</p>
    </div>
  )
}
