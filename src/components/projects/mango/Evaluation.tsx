import { useCycle, usePrefersReducedMotion } from '../agent/hooks'

type Check = 'route' | 'source' | 'facts' | 'cited'

const checks: { key: Check; label: string }[] = [
  { key: 'route', label: 'Right tool' },
  { key: 'source', label: 'Expected source retrieved' },
  { key: 'facts', label: 'Key facts correct' },
  { key: 'cited', label: 'Sources referenced' },
]

const cases = [
  { question: 'Which documents are overdue for review?', expected: 'documents · next_review_date', route: 'SQL' },
  { question: 'How is a deviation recorded?', expected: 'SOP-QA-0142 §5.4', route: 'RAG' },
  { question: 'Who approved version 4.0 of SOP-QC-0087?', expected: 'workflow + audit trail', route: 'SQL' },
  { question: 'Which copies have no destruction date?', expected: 'copy_log', route: 'SQL' },
]

const STEP_MS = 450
const TOTAL = cases.length * checks.length

export function Evaluation() {
  const reducedMotion = usePrefersReducedMotion()
  // Extra ticks at the end hold the fully checked table before restarting.
  const tick = useCycle(TOTAL + 8, STEP_MS, !reducedMotion)
  const shown = reducedMotion ? TOTAL : Math.min(tick, TOTAL)

  return (
    <div
      className="p-4 sm:p-5"
      role="img"
      aria-label="Illustration of the evaluation: each reference case defines a question, the expected source, and the facts the answer must contain. Every case is checked for the right tool, the expected source being retrieved, correct key facts, and source references in the answer."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-[10px] font-semibold uppercase tracking-wide text-[#8a8f8b]">
              <th className="pb-2 pr-2 font-semibold">Reference case</th>
              {checks.map((c) => (
                <th key={c.key} className="w-16 pb-2 text-center font-semibold leading-tight">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map((row, r) => (
              <tr key={row.question}>
                <td className="border-t border-[#ecebe6] py-2 pr-2">
                  <div className="text-xs text-[#585d59]">{row.question}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#8a8f8b]">
                    <span
                      className={`rounded px-1 text-[8px] font-semibold ${
                        row.route === 'RAG' ? 'bg-[#eef7f7] text-[#2f7f86]' : 'bg-[#eef1f5] text-[#5b6675]'
                      }`}
                    >
                      {row.route}
                    </span>
                    expects <span className="font-mono">{row.expected}</span>
                  </div>
                </td>
                {checks.map((c, ci) => {
                  const done = r * checks.length + ci < shown
                  return (
                    <td key={c.key} className="border-t border-[#ecebe6] py-2 text-center">
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] transition-all duration-300 ${
                          done ? 'scale-100 bg-[#eaf5ee] text-[#2f7a50]' : 'scale-75 bg-[#f1f1ed] text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[10px] text-[#8a8f8b]">
        Illustrative reference cases. Retrieval is judged on whether the expected source is found; answers on whether the key facts are correct and referenced.
      </p>
    </div>
  )
}
