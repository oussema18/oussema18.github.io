import { useEffect, useState, type ReactNode } from 'react'

const QUESTION = 'What are the most critical data quality issues across our ERP systems?'

const toolSteps = [
  'Retrieving data quality rules',
  'Fetching latest scores from 3 ERP systems',
  'Ranking issues by business impact',
]

const erpScores = [
  { name: 'ERP North', score: 94.1 },
  { name: 'ERP West', score: 82.6 },
  { name: 'ERP East', score: 90.3 },
]

type Severity = 'High' | 'Medium' | 'Low'

const issues: {
  severity: Severity
  title: string
  erp: string
  dimension: string
  score: string
  advice: string
}[] = [
  {
    severity: 'High',
    title: 'Missing customer IDs',
    erp: 'ERP West',
    dimension: 'Completeness',
    score: '71.4%',
    advice: 'Fix first: 1,240 orders cannot be invoiced downstream.',
  },
  {
    severity: 'Medium',
    title: 'Duplicate material numbers',
    erp: 'ERP North',
    dimension: 'Uniqueness',
    score: '84.0%',
    advice: 'Merge duplicates before the next master data load.',
  },
  {
    severity: 'Low',
    title: 'Outdated country codes',
    erp: 'ERP East',
    dimension: 'Validity',
    score: '93.2%',
    advice: 'Low impact: schedule with the data steward.',
  },
]

const severityStyle: Record<Severity, string> = {
  High: 'bg-[#fbe9e6] text-[#b4483c] border-[#f0c7c0]',
  Medium: 'bg-[#fdf3e2] text-[#a26a12] border-[#f1dcb4]',
  Low: 'bg-[#eef1f5] text-[#5b6675] border-[#d9dee6]',
}

// Timeline (ms). Typing runs first, then each later stage appears at its offset.
const TYPE_MS = 28
const TYPED_AT = QUESTION.length * TYPE_MS
const TOOL_AT = toolSteps.map((_, i) => TYPED_AT + 500 + i * 700)
const SUMMARY_AT = TOOL_AT[TOOL_AT.length - 1] + 900
const ISSUE_AT = issues.map((_, i) => SUMMARY_AT + 900 + i * 800)
const NEXT_AT = ISSUE_AT[ISSUE_AT.length - 1] + 900
const LOOP_MS = NEXT_AT + 5000

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

function useElapsed(active: boolean) {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const id = window.setInterval(() => setElapsed((performance.now() - start) % LOOP_MS), 50)
    return () => window.clearInterval(id)
  }, [active])
  return active ? elapsed : LOOP_MS
}

const FADE_UP = 'animate-[dqc-fade-up_0.5s_ease-out_both]'

function Reveal({ show, children, className = '' }: { show: boolean; children: ReactNode; className?: string }) {
  if (!show) return null
  return <div className={`${FADE_UP} ${className}`}>{children}</div>
}

export function AgentChat() {
  const reducedMotion = usePrefersReducedMotion()
  const t = useElapsed(!reducedMotion)

  const typed = QUESTION.slice(0, Math.floor(t / TYPE_MS))
  const typing = t < TYPED_AT
  const agentStarted = t >= TOOL_AT[0]
  const thinking = agentStarted && t < SUMMARY_AT

  return (
    <div
      className="flex flex-col"
      role="img"
      aria-label="Animation: a user asks the DQC AI Agent for the most critical data quality issues across ERP systems. The agent retrieves the rules and their scores, summarizes quality per ERP system, and returns a prioritized list of issues with a suggested action for each."
    >
      {/* Window header */}
      <div className="flex items-center gap-2 border-b border-[#ecebe6] px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3458c6] text-white">
          <SparkIcon />
        </span>
        <span className="text-xs font-semibold text-[#585d59]">DQC AI Agent</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-[#8a8f8b]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3d8b5f]" /> online
        </span>
      </div>

      <div className="min-h-[58rem] space-y-3 bg-[#fafaf8] p-4 sm:min-h-[35rem]">
        {/* User question */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#3458c6] px-3 py-2 text-xs leading-relaxed text-white">
            {typed}
            {typing && <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white align-middle" />}
          </div>
        </div>

        {/* Agent */}
        <Reveal show={agentStarted}>
          <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-[#deded8] bg-white p-3">
            {/* Tool calls */}
            <ul className="space-y-1">
              {toolSteps.map((label, i) => {
                if (t < TOOL_AT[i]) return null
                const done = t >= (TOOL_AT[i + 1] ?? SUMMARY_AT)
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-1.5 text-[11px] ${FADE_UP} ${
                      done ? 'text-[#8a8f8b]' : 'text-[#585d59]'
                    }`}
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

            {/* Summary across ERP systems */}
            <Reveal show={t >= SUMMARY_AT} className="mt-3 border-t border-[#ecebe6] pt-3">
              <p className="text-xs leading-relaxed text-[#585d59]">
                I reviewed <b>128 rules</b> across <b>3 ERP systems</b>. ERP West has the lowest score.
                Here are the issues to tackle first:
              </p>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                {erpScores.map((erp) => {
                  const worst = erp.score < 85
                  return (
                    <div
                      key={erp.name}
                      className={`rounded-md border px-2 py-1.5 ${
                        worst ? 'border-[#f0c7c0] bg-[#fdf5f3]' : 'border-[#ecebe6] bg-[#fafaf8]'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2 sm:block">
                        <div className="text-[10px] text-[#8a8f8b]">{erp.name}</div>
                        <div
                          className={`text-xs font-semibold tabular-nums ${worst ? 'text-[#b4483c]' : 'text-[#585d59]'}`}
                        >
                          {erp.score.toFixed(1)}%
                        </div>
                      </div>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#ecebe6]">
                        <div
                          className={`h-full origin-left rounded-full animate-[dqc-grow_1s_ease-out_0.3s_both] ${
                            worst ? 'bg-[#c85d50]' : 'bg-[#3d8b5f]'
                          }`}
                          style={{ width: `${erp.score}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            {/* Prioritized issues */}
            <ol className="space-y-1.5 [&:not(:empty)]:mt-3">
              {issues.map((issue, i) => t >= ISSUE_AT[i] && (
                <li
                  key={issue.title}
                  className={`flex gap-2 rounded-lg border border-[#ecebe6] p-2 ${FADE_UP}`}
                >
                    <span className="mt-0.5 text-[11px] font-semibold text-[#8a8f8b]">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`rounded border px-1 py-px text-[9px] font-semibold uppercase tracking-wide ${severityStyle[issue.severity]}`}
                        >
                          {issue.severity}
                        </span>
                        <span className="text-xs font-semibold text-[#585d59]">{issue.title}</span>
                      </div>
                      <div className="mt-0.5 text-[10px] text-[#8a8f8b]">
                        {issue.erp} · {issue.dimension} {issue.score}
                      </div>
                      <div className="mt-0.5 text-[11px] leading-snug text-[#6b706c]">{issue.advice}</div>
                    </div>
                </li>
              ))}
            </ol>

            <Reveal show={t >= NEXT_AT} className="mt-2">
              <p className="rounded-md bg-[#f3f5fc] px-2 py-1.5 text-[11px] text-[#3458c6]">
                <b>Suggested next step:</b> assign issue 1 to the ERP West data steward.
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M8 1.5l1.4 3.6 3.6 1.4-3.6 1.4L8 11.5 6.6 7.9 3 6.5l3.6-1.4L8 1.5zM12.5 10l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </svg>
  )
}
