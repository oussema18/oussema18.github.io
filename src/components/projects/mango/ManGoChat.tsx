import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FADE_UP, usePrefersReducedMotion, useTimeline } from './hooks'
import { useCases, type AnswerItem, type Tone, type Trace, type UseCase } from './useCases'

const TYPE_MS = 22
const HOLD_MS = 4500

function timelineFor(uc: UseCase) {
  const typedAt = uc.question.length * TYPE_MS
  const toolAt = uc.tools.map((_, i) => typedAt + 400 + i * 800)
  const traceAt = toolAt[0] + 500
  const answerAt = toolAt[toolAt.length - 1] + 1000
  const itemAt = uc.answer.map((_, i) => answerAt + 600 + i * 450)
  const sourcesAt = itemAt[itemAt.length - 1] + 600
  return { typedAt, toolAt, traceAt, answerAt, itemAt, sourcesAt, end: sourcesAt + HOLD_MS }
}

const toneStyle: Record<Tone, string> = {
  red: 'bg-[#fbe9e6] text-[#b4483c] border-[#f0c7c0]',
  amber: 'bg-[#fdf3e2] text-[#a26a12] border-[#f1dcb4]',
  green: 'bg-[#eaf5ee] text-[#2f7a50] border-[#c6e2d1]',
  neutral: 'bg-[#eef1f5] text-[#5b6675] border-[#d9dee6]',
}

export const routeStyle = {
  sql: { label: 'Structured SQL', chip: 'border-[#3458c6]/30 bg-[#f3f5fc] text-[#3458c6]' },
  rag: { label: 'Semantic retrieval', chip: 'border-[#2f7f86]/30 bg-[#eef7f7] text-[#2f7f86]' },
} as const

function Reveal({ show, children, className = '' }: { show: boolean; children: ReactNode; className?: string }) {
  if (!show) return null
  return <div className={`${FADE_UP} ${className}`}>{children}</div>
}

function Cites({ cite }: { cite?: number[] }) {
  if (!cite?.length) return null
  return (
    <span className="ml-1 inline-flex gap-0.5 align-middle">
      {cite.map((n) => (
        <span key={n} className="rounded bg-[#eef1f5] px-1 text-[9px] font-semibold leading-4 text-[#5b6675]">
          {n}
        </span>
      ))}
    </span>
  )
}

function TraceView({ trace }: { trace: Trace }) {
  if (trace.kind === 'sql') {
    return (
      <pre className="overflow-x-auto rounded-md bg-[#1f2430] px-3 py-2 font-mono text-[10px] leading-relaxed text-[#d6dbe6]">
        {trace.code}
      </pre>
    )
  }
  return (
    <ul className="space-y-1">
      {trace.chunks.map((chunk, i) => (
        <li
          key={chunk.ref}
          className={`flex items-start gap-2 rounded-md border border-[#d5e9ea] bg-[#f5fafa] px-2 py-1.5 ${FADE_UP}`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[10px] font-semibold text-[#2f7f86]">{chunk.ref}</div>
            <div className="truncate text-[10px] text-[#6b706c]">{chunk.text}</div>
          </div>
          <div className="w-12 shrink-0 text-right">
            <div className="text-[10px] font-semibold tabular-nums text-[#585d59]">{chunk.score.toFixed(2)}</div>
            <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[#dceeee]">
              <div
                className="h-full origin-left rounded-full bg-[#2f7f86] animate-[dqc-grow_0.8s_ease-out_both]"
                style={{ width: `${chunk.score * 100}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function AnswerList({ uc, visible }: { uc: UseCase; visible: (i: number) => boolean }) {
  const item = (a: AnswerItem, i: number) => {
    if (!visible(i)) return null
    if (uc.layout === 'timeline') {
      return (
        <li key={a.title} className={`relative flex gap-2.5 pb-2.5 last:pb-0 ${FADE_UP}`}>
          {i < uc.answer.length - 1 && (
            <span aria-hidden="true" className="absolute left-[5px] top-3.5 bottom-0 w-px bg-[#deded8]" />
          )}
          <span className="relative mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#3458c6] bg-white" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#585d59]">
              {a.title}
              <Cites cite={a.cite} />
            </div>
            {a.meta && <div className="text-[10px] text-[#8a8f8b]">{a.meta}</div>}
          </div>
        </li>
      )
    }
    if (uc.layout === 'steps') {
      return (
        <li key={a.title} className={`flex gap-2 text-xs leading-relaxed text-[#585d59] ${FADE_UP}`}>
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#eef7f7] text-[9px] font-semibold text-[#2f7f86]">
            {i + 1}
          </span>
          <span>
            {a.title}
            <Cites cite={a.cite} />
          </span>
        </li>
      )
    }
    return (
      <li key={a.title} className={`flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-[#ecebe6] p-2 ${FADE_UP}`}>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-[#585d59]">
            {a.title}
            <Cites cite={a.cite} />
          </div>
          {a.meta && <div className="text-[10px] text-[#8a8f8b]">{a.meta}</div>}
        </div>
        {a.badge && (
          <span className={`rounded border px-1.5 py-px text-[10px] font-semibold ${toneStyle[a.badge.tone]}`}>
            {a.badge.text}
          </span>
        )}
      </li>
    )
  }
  return <ol className="mt-2 space-y-1.5">{uc.answer.map(item)}</ol>
}

function ChatRun({ uc, animate, onDone }: { uc: UseCase; animate: boolean; onDone: () => void }) {
  const tl = timelineFor(uc)
  const t = useTimeline(animate, tl.end)

  const fired = useRef(false)
  useEffect(() => {
    if (!animate || t < tl.end || fired.current) return
    fired.current = true
    onDone()
  }, [animate, t, tl.end, onDone])

  const typing = t < tl.typedAt
  const typed = uc.question.slice(0, Math.floor(t / TYPE_MS))
  const agentStarted = t >= tl.toolAt[0]
  const thinking = agentStarted && t < tl.answerAt
  const route = routeStyle[uc.route]

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#3458c6] px-3 py-2 text-xs leading-relaxed text-white">
          {typed}
          {typing && <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white align-middle" />}
        </div>
      </div>

      <Reveal show={agentStarted}>
        <div className="max-w-[96%] rounded-2xl rounded-bl-sm border border-[#deded8] bg-white p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${route.chip}`}>
              Route: {route.label}
            </span>
          </div>
          <ul className="space-y-1">
            {uc.tools.map((label, i) => {
              if (t < tl.toolAt[i]) return null
              const done = t >= (tl.toolAt[i + 1] ?? tl.answerAt)
              return (
                <li
                  key={label}
                  className={`flex items-center gap-1.5 text-[11px] ${FADE_UP} ${done ? 'text-[#8a8f8b]' : 'text-[#585d59]'}`}
                >
                  {done ? (
                    <span className="text-[#3d8b5f]">✓</span>
                  ) : (
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border border-[#3458c6] border-t-transparent" />
                  )}
                  {label}
                </li>
              )
            })}
          </ul>

          <Reveal show={t >= tl.traceAt} className="mt-2">
            <TraceView trace={uc.trace} />
          </Reveal>

          {thinking && (
            <div className="mt-2 flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c9c9c2]"
                  style={{ animationDelay: `${d * 120}ms` }}
                />
              ))}
            </div>
          )}

          <Reveal show={t >= tl.answerAt} className="mt-3 border-t border-[#ecebe6] pt-3">
            <p className="text-xs leading-relaxed text-[#585d59]">{uc.intro}</p>
            <AnswerList uc={uc} visible={(i) => t >= tl.itemAt[i]} />
          </Reveal>

          <Reveal show={t >= tl.sourcesAt} className="mt-3">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#8a8f8b]">Sources</div>
            <ol className="mt-1 flex flex-wrap gap-1">
              {uc.sources.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-1 rounded-md border border-[#ecebe6] bg-[#fafaf8] px-1.5 py-0.5 text-[10px] text-[#6b706c]"
                >
                  <span className="rounded bg-[#eef1f5] px-1 text-[9px] font-semibold text-[#5b6675]">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Reveal>
    </div>
  )
}

export function ManGoChat() {
  const reducedMotion = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [run, setRun] = useState(0)

  const uc = useCases[active]

  const select = (i: number) => {
    setAuto(false)
    setActive(i)
    setRun((r) => r + 1)
  }

  const onDone = () => {
    if (!auto) return
    setActive((i) => (i + 1) % useCases.length)
    setRun((r) => r + 1)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 border-b border-[#ecebe6] px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3458c6] text-[11px] font-bold text-white">
          M
        </span>
        <span className="text-xs font-semibold text-[#585d59]">ManGo AI Agent</span>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-[#deded8] px-2 py-0.5 text-[10px] text-[#6b706c]">
          <LockIcon /> read-only
        </span>
      </div>

      <div role="tablist" aria-label="Example questions" className="flex gap-1.5 overflow-x-auto border-b border-[#ecebe6] px-3 py-2">
        {useCases.map((c, i) => {
          const selected = i === active
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => select(i)}
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                selected
                  ? 'border-[#3458c6] bg-[#3458c6] text-white'
                  : 'border-[#deded8] bg-white text-[#6b706c] hover:border-[#aeb5c9]'
              }`}
            >
              {c.tab}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        aria-label={`${uc.tab}: ${uc.question}`}
        aria-live="polite"
        className="min-h-[42rem] bg-[#fafaf8] p-4 sm:min-h-[35rem]"
      >
        <ChatRun key={`${uc.id}-${run}`} uc={uc} animate={!reducedMotion} onDone={onDone} />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#ecebe6] px-4 py-2 text-[10px] text-[#8a8f8b]">
        <span>{auto && !reducedMotion ? 'Auto-playing all examples · pick one to explore' : 'Pick another example above'}</span>
        <span className="flex gap-1" aria-hidden="true">
          {useCases.map((c, i) => (
            <span key={c.id} className={`h-1.5 w-1.5 rounded-full ${i === active ? 'bg-[#3458c6]' : 'bg-[#deded8]'}`} />
          ))}
        </span>
      </div>
    </div>
  )
}

export function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
    </svg>
  )
}
