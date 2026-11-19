import { FADE_UP, useCycle, usePrefersReducedMotion } from '../agent/hooks'

const sources = [
  { name: 'Document metadata', kind: 'SQL', fields: ['doc_id', 'title', 'owner', 'status', 'next_review_date'], example: 'Effective · next review in 9 days' },
  { name: 'Extracted text', kind: 'RAG', fields: ['chunk_id', 'section', 'text', 'embedding'], example: '42 chunks · §1 Purpose … §9 References' },
  { name: 'Workflow records', kind: 'SQL', fields: ['workflow_id', 'version', 'step', 'role'], example: 'v4.0 · review → approval → effective' },
  { name: 'Audit trails', kind: 'SQL', fields: ['event', 'role', 'timestamp', 'signature'], example: '18 events · e-signatures recorded' },
  { name: 'Copy logs', kind: 'SQL', fields: ['copy_id', 'version', 'location', 'destruction_date'], example: '6 controlled copies · 1 open' },
]

export function DataFoundation() {
  const reducedMotion = usePrefersReducedMotion()
  const index = useCycle(sources.length, 2200, !reducedMotion)
  const active = sources[index]

  return (
    <div className="p-4 sm:p-5">
      {/* Central document object */}
      <div className="mx-auto max-w-md rounded-xl border border-[#585d59] bg-[#f4f3ef] px-3 py-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <DocIcon />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-[#585d59]">Controlled document</div>
            <div className="font-mono text-[10px] text-[#8a8f8b]">WI-PRD-0318 · Line Clearance · v7.0</div>
          </div>
          <span className="rounded-full border border-[#deded8] bg-white px-2 py-0.5 text-[10px] text-[#6b706c]">doc_id + version</span>
        </div>
        <div key={active.name} className={`mt-2 rounded-md bg-white px-2 py-1.5 text-[11px] text-[#6b706c] ${FADE_UP}`}>
          <span className="font-semibold text-[#585d59]">{active.name}: </span>
          {active.example}
        </div>
      </div>

      {/* Links */}
      <svg aria-hidden="true" viewBox="0 0 100 20" preserveAspectRatio="none" className="hidden h-6 w-full sm:block">
        {sources.map((s, i) => {
          const x = 10 + i * 20
          const on = s === active
          return (
            <path
              key={s.name}
              d={`M50 0 C50 10 ${x} 10 ${x} 20`}
              fill="none"
              stroke={on ? '#3458c6' : '#d6d6cf'}
              strokeWidth={on ? 2 : 1.25}
              strokeDasharray={on ? '4 3' : undefined}
              vectorEffect="non-scaling-stroke"
              className={on ? 'animate-[mango-dash_0.8s_linear_infinite]' : ''}
            />
          )
        })}
      </svg>
      <div className="mx-auto h-4 w-px bg-[#d6d6cf] sm:hidden" aria-hidden="true" />

      {/* Linked sources */}
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {sources.map((s, i) => {
          const on = s === active
          return (
            <li
              key={s.name}
              className={`rounded-lg border p-2 transition-all duration-500 ${
                on ? 'border-[#3458c6] bg-[#f3f5fc] shadow-sm' : 'border-[#deded8] bg-[#fafaf8]'
              } ${i === sources.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`text-[11px] font-semibold leading-tight ${on ? 'text-[#3458c6]' : 'text-[#585d59]'}`}>{s.name}</span>
                <span
                  className={`rounded px-1 text-[8px] font-semibold ${
                    s.kind === 'RAG' ? 'bg-[#eef7f7] text-[#2f7f86]' : 'bg-[#eef1f5] text-[#5b6675]'
                  }`}
                >
                  {s.kind}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-0.5">
                {s.fields.map((f) => (
                  <span key={f} className="rounded bg-white px-1 font-mono text-[9px] text-[#8a8f8b]">
                    {f}
                  </span>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function DocIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-7 w-7 shrink-0 text-[#585d59]" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M5 2.5h7l3.5 3.5v11.5H5z" />
      <path d="M12 2.5V6h3.5M7.5 9.5h5M7.5 12h5M7.5 14.5h3" />
    </svg>
  )
}
