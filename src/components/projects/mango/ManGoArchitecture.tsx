import type { ReactNode } from 'react'
import { FADE_UP, useCycle, usePrefersReducedMotion } from '../agent/hooks'
import { useCases, type Route } from './useCases'

const lanes: { route: Route; title: string; tool: string; sources: string[] }[] = [
  {
    route: 'sql',
    title: 'Structured SQL tools',
    tool: 'Administrative questions',
    sources: ['Document metadata', 'Workflow records', 'Audit trails', 'Copy logs'],
  },
  {
    route: 'rag',
    title: 'Semantic retrieval (RAG)',
    tool: 'Content questions',
    sources: ['Document chunks', 'Embeddings'],
  },
]

const sourcesUsed: Record<string, string[]> = {
  review: ['Document metadata'],
  procedure: ['Document chunks', 'Embeddings'],
  history: ['Workflow records', 'Audit trails'],
  copies: ['Copy logs'],
}

const color = {
  sql: { stroke: '#3458c6', box: 'border-[#3458c6] bg-[#f3f5fc]', text: 'text-[#3458c6]', chip: 'border-[#3458c6]/40 bg-white text-[#3458c6]' },
  rag: { stroke: '#2f7f86', box: 'border-[#2f7f86] bg-[#eef7f7]', text: 'text-[#2f7f86]', chip: 'border-[#2f7f86]/40 bg-white text-[#2f7f86]' },
}

// Phases within one question: 0 question, 1 agent, 2 lane, 3 sources, 4 answer, 5–6 hold.
const PHASES = 7
const STEP_MS = 850

function Connector({ split, route, active }: { split: boolean; route: Route; active: boolean }) {
  // Left lane = sql (x 25), right lane = rag (x 75).
  const paths = split
    ? { sql: 'M50 0 C50 12 25 12 25 24', rag: 'M50 0 C50 12 75 12 75 24' }
    : { sql: 'M25 0 C25 12 50 12 50 24', rag: 'M75 0 C75 12 50 12 50 24' }
  return (
    <svg aria-hidden="true" viewBox="0 0 100 24" preserveAspectRatio="none" className="block h-8 w-full">
      {(Object.keys(paths) as Route[]).map((r) => {
        const on = active && r === route
        return (
          <path
            key={r}
            d={paths[r]}
            fill="none"
            stroke={on ? color[r].stroke : '#d6d6cf'}
            strokeWidth={on ? 2 : 1.25}
            strokeDasharray={on ? '4 3' : undefined}
            vectorEffect="non-scaling-stroke"
            className={on ? 'animate-[mango-dash_0.8s_linear_infinite]' : ''}
          />
        )
      })}
    </svg>
  )
}

function Node({ active, className = '', children }: { active: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 transition-all duration-500 ${
        active ? `${className} shadow-sm` : 'border-[#deded8] bg-white'
      }`}
    >
      {children}
    </div>
  )
}

export function ManGoArchitecture() {
  const reducedMotion = usePrefersReducedMotion()
  const tick = useCycle(useCases.length * PHASES, STEP_MS, !reducedMotion)
  const caseIndex = reducedMotion ? 0 : Math.floor(tick / PHASES)
  const phase = reducedMotion ? PHASES - 1 : tick % PHASES
  const uc = useCases[caseIndex]
  const used = sourcesUsed[uc.id]

  return (
    <div
      className="p-4 sm:p-5"
      role="img"
      aria-label="Animated architecture: a user question goes to the agent, which uses its instructions to select a tool. Administrative questions are answered with structured SQL tools over document metadata, workflow records, audit trails and copy logs. Content questions use semantic retrieval over embedded document chunks. Both paths return an answer with source references."
    >
      {/* Question */}
      <div className="flex justify-center">
        <div key={uc.id} className={`max-w-md rounded-2xl rounded-br-sm bg-[#3458c6] px-3 py-2 text-center text-xs leading-relaxed text-white ${FADE_UP}`}>
          “{uc.question}”
        </div>
      </div>

      <div className="mx-auto h-5 w-px bg-[#d6d6cf]" aria-hidden="true">
        {phase >= 1 && <span className="block h-full w-px bg-[#3458c6]" />}
      </div>

      {/* Agent */}
      <div className="mx-auto max-w-sm">
        <Node active={phase >= 1} className="border-[#585d59] bg-[#f4f3ef]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#585d59]">AIP Agent</span>
            <span className="text-[10px] text-[#8a8f8b]">instructions · tool selection</span>
          </div>
          <div className="mt-1 h-4 text-[10px]">
            {phase >= 2 && (
              <span key={uc.id} className={`${FADE_UP} inline-block font-semibold ${color[uc.route].text}`}>
                → {uc.route === 'sql' ? 'structured query' : 'semantic search'}
              </span>
            )}
          </div>
        </Node>
      </div>

      <Connector split route={uc.route} active={phase >= 2} />

      {/* Lanes */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {lanes.map((lane) => {
          const on = phase >= 2 && lane.route === uc.route
          return (
            <Node key={lane.route} active={on} className={color[lane.route].box}>
              <div className={`text-[11px] font-semibold sm:text-xs ${on ? color[lane.route].text : 'text-[#585d59]'}`}>
                {lane.title}
              </div>
              <div className="text-[10px] text-[#8a8f8b]">{lane.tool}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {lane.sources.map((s, i) => {
                  const hit = on && phase >= 3 && used.includes(s)
                  return (
                    <span
                      key={s}
                      className={`rounded border px-1.5 py-0.5 text-[10px] transition-all duration-500 ${
                        hit ? color[lane.route].chip + ' font-semibold' : 'border-[#e6e6e0] bg-white text-[#8a8f8b]'
                      }`}
                      style={{ transitionDelay: hit ? `${i * 120}ms` : '0ms' }}
                    >
                      {s}
                    </span>
                  )
                })}
              </div>
            </Node>
          )
        })}
      </div>

      <Connector split={false} route={uc.route} active={phase >= 4} />

      {/* Answer */}
      <div className="mx-auto max-w-md">
        <Node active={phase >= 4} className="border-[#3d8b5f] bg-[#f5faf6]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#585d59]">Answer with source references</span>
            {phase >= 4 && <span className={`text-[10px] font-semibold text-[#3d8b5f] ${FADE_UP}`}>✓ verifiable</span>}
          </div>
          <div className="mt-1 min-h-[2.5rem] text-[11px] leading-snug text-[#6b706c]">
            {phase >= 4 ? (
              <div key={uc.id} className={FADE_UP}>
                {uc.intro}
                <div className="mt-1 flex flex-wrap gap-1">
                  {uc.sources.map((s, i) => (
                    <span key={s} className="rounded border border-[#e6e6e0] bg-white px-1 text-[9px] text-[#6b706c]">
                      [{i + 1}] {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <span className="text-[#b5b8b3]">Waiting for tool results…</span>
            )}
          </div>
        </Node>
      </div>
    </div>
  )
}
