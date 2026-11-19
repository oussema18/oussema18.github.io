import { useEffect, useState } from 'react'
import { FADE_UP, usePrefersReducedMotion } from '../agent/hooks'

type NodeId = 'complaint' | 'capa' | 'change' | 'batch' | 'records'

const nodes: Record<NodeId, { name: string; fields: string[]; accent: string; ring: string; text: string }> = {
  complaint: {
    name: 'Complaint',
    fields: ['complaint_id', 'issue_category', 'description', 'received_date', 'status'],
    accent: 'bg-[#f3f5fc]',
    ring: 'border-[#3458c6]',
    text: 'text-[#3458c6]',
  },
  capa: {
    name: 'CAPA',
    fields: ['capa_id', 'type', 'root_cause', 'due_date', 'status'],
    accent: 'bg-[#f7f4fc]',
    ring: 'border-[#6d4fb3]',
    text: 'text-[#6d4fb3]',
  },
  change: {
    name: 'Change Control',
    fields: ['cc_id', 'change_type', 'impact', 'effective_date', 'status'],
    accent: 'bg-[#eef7f7]',
    ring: 'border-[#2f7f86]',
    text: 'text-[#2f7f86]',
  },
  batch: {
    name: 'Product & Batch',
    fields: ['product', 'batch_no', 'site'],
    accent: 'bg-[#fdf6ec]',
    ring: 'border-[#a26a12]',
    text: 'text-[#a26a12]',
  },
  records: {
    name: 'Associated records',
    fields: ['record_id', 'record_type', 'reference'],
    accent: 'bg-[#f4f3ef]',
    ring: 'border-[#585d59]',
    text: 'text-[#585d59]',
  },
}

type Link = {
  id: string
  from: NodeId
  to: NodeId
  label: string
  cardinality: [string, string]
  sentence: string
  example: { from: string[]; to: string[] }
}

const links: Link[] = [
  {
    id: 'raises',
    from: 'complaint',
    to: 'capa',
    label: 'raises',
    cardinality: ['1', 'n'],
    sentence: 'A complaint can raise one or more CAPAs to correct and prevent the issue.',
    example: { from: ['CMP-2026-0418'], to: ['CAPA-2026-0193', 'CAPA-2026-0201'] },
  },
  {
    id: 'implemented',
    from: 'capa',
    to: 'change',
    label: 'implemented by',
    cardinality: ['1', 'n'],
    sentence: 'A CAPA can be implemented through one or more change controls.',
    example: { from: ['CAPA-2026-0193'], to: ['CC-2026-0577'] },
  },
  {
    id: 'concerns',
    from: 'complaint',
    to: 'batch',
    label: 'concerns',
    cardinality: ['n', '1'],
    sentence: 'Many complaints can concern the same product batch, which reveals recurring issues.',
    example: { from: ['CMP-2026-0418', 'CMP-2026-0377'], to: ['Batch B2611'] },
  },
  {
    id: 'documents',
    from: 'complaint',
    to: 'records',
    label: 'documented by',
    cardinality: ['1', 'n'],
    sentence: 'A complaint links to the associated records that document its investigation.',
    example: { from: ['CMP-2026-0377'], to: ['Investigation report', 'Batch record'] },
  },
]

const STEP_MS = 3000

function Edge({
  link,
  active,
  vertical = false,
  reverse = false,
  onSelect,
}: {
  link: Link
  active: boolean
  vertical?: boolean
  reverse?: boolean
  onSelect: () => void
}) {
  const [a, b] = reverse ? [...link.cardinality].reverse() : link.cardinality
  const stroke = active ? '#3458c6' : '#cfcfc8'
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${nodes[link.from].name} ${link.label} ${nodes[link.to].name}`}
      aria-pressed={active}
      className={`relative flex items-center justify-center ${vertical ? 'h-full w-full flex-col' : 'h-full w-full'}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line
          x1={vertical ? 50 : 0}
          y1={vertical ? 0 : 50}
          x2={vertical ? 50 : 100}
          y2={vertical ? 100 : 50}
          stroke={stroke}
          strokeWidth={active ? 2 : 1.25}
          strokeDasharray={active ? '4 3' : undefined}
          vectorEffect="non-scaling-stroke"
          className={active ? 'animate-[mango-dash_0.8s_linear_infinite]' : ''}
        />
      </svg>
      <span className={`absolute text-[9px] font-semibold ${active ? 'text-[#3458c6]' : 'text-[#9a9f9b]'} ${vertical ? 'left-[55%] top-0' : 'left-0.5 top-[22%]'}`}>{a}</span>
      <span className={`absolute text-[9px] font-semibold ${active ? 'text-[#3458c6]' : 'text-[#9a9f9b]'} ${vertical ? 'bottom-0 left-[55%]' : 'right-0.5 top-[22%]'}`}>{b}</span>
    </button>
  )
}

function NodeCard({ id, active, onSelect }: { id: NodeId; active: boolean; onSelect: () => void }) {
  const n = nodes[id]
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`h-full w-full rounded-lg border p-2 text-left transition-all duration-500 ${
        active ? `${n.ring} ${n.accent} shadow-sm` : 'border-[#deded8] bg-white'
      }`}
    >
      <div className={`text-[11px] font-semibold leading-tight sm:text-xs ${active ? n.text : 'text-[#585d59]'}`}>{n.name}</div>
      <div className="mt-1.5 flex flex-wrap gap-0.5">
        {n.fields.map((f, i) => (
          <span key={f} className={`rounded bg-[#f4f3ef] px-1 font-mono text-[8px] text-[#8a8f8b] sm:text-[9px] ${i > 2 ? 'hidden sm:inline' : ''}`}>
            {f}
          </span>
        ))}
      </div>
    </button>
  )
}

export function DataModel() {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || reducedMotion) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % links.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [auto, reducedMotion])

  const link = links[index]
  const select = (i: number) => {
    setAuto(false)
    setIndex(i)
  }
  const selectNode = (id: NodeId) => {
    const i = links.findIndex((l) => l.from === id || l.to === id)
    // Pressing a node that's already in the active link moves on to its next link.
    const own = links.map((l, j) => (l.from === id || l.to === id ? j : -1)).filter((j) => j >= 0)
    const pos = own.indexOf(index)
    select(pos >= 0 ? own[(pos + 1) % own.length] : i)
  }
  const isActive = (id: NodeId) => link.from === id || link.to === id
  const edge = (id: string, extra: { vertical?: boolean; reverse?: boolean } = {}) => {
    const i = links.findIndex((l) => l.id === id)
    return <Edge link={links[i]} active={i === index} onSelect={() => select(i)} {...extra} />
  }

  return (
    <div className="p-4 sm:p-5">
      <div className="grid grid-cols-[1fr_1.75rem_1fr_1.75rem_1fr] grid-rows-[auto_2.25rem_auto] sm:grid-cols-[1fr_3rem_1fr_3rem_1fr]">
        <NodeCard id="batch" active={isActive('batch')} onSelect={() => selectNode('batch')} />
        {edge('concerns', { reverse: true })}
        <NodeCard id="complaint" active={isActive('complaint')} onSelect={() => selectNode('complaint')} />
        {edge('documents')}
        <NodeCard id="records" active={isActive('records')} onSelect={() => selectNode('records')} />

        <div />
        <div />
        {edge('raises', { vertical: true })}
        <div />
        <div />

        <div className="flex items-end pr-2 text-[9px] leading-snug text-[#9a9f9b]">
          Click an object or a link to explore it.
        </div>
        <div />
        <NodeCard id="capa" active={isActive('capa')} onSelect={() => selectNode('capa')} />
        {edge('implemented')}
        <NodeCard id="change" active={isActive('change')} onSelect={() => selectNode('change')} />
      </div>

      {/* Selected link */}
      <div key={link.id} className={`mt-4 rounded-lg border border-[#ecebe6] bg-[#fafaf8] p-3 ${FADE_UP}`} aria-live="polite">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#585d59]">
          <span className={nodes[link.from].text}>{nodes[link.from].name}</span>
          <span className="rounded-full border border-[#deded8] bg-white px-1.5 py-px text-[10px] font-medium text-[#6b706c]">
            {link.label} · {link.cardinality[0]}:{link.cardinality[1]}
          </span>
          <span className={nodes[link.to].text}>{nodes[link.to].name}</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-[#6b706c]">{link.sentence}</p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-[#9a9f9b]">Example</span>
          {link.example.from.map((e) => (
            <Chip key={e}>{e}</Chip>
          ))}
          <span className="text-[10px] text-[#b5b8b3]">→</span>
          {link.example.to.map((e) => (
            <Chip key={e}>{e}</Chip>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-center gap-1" aria-hidden="true">
        {links.map((l, i) => (
          <span key={l.id} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-[#3458c6]' : 'bg-[#deded8]'}`} />
        ))}
      </div>
    </div>
  )
}

function Chip({ children }: { children: string }) {
  return <span className="rounded border border-[#deded8] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#585d59]">{children}</span>
}
