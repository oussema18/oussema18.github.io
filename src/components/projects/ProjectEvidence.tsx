import type { ProjectEvidenceItem } from '../../types/project'

export function ProjectEvidence({ items = [] }: { items?: ProjectEvidenceItem[] }) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby="project-evidence" className="mt-10">
      <h2 id="project-evidence" className="text-xl font-semibold tracking-tight">Project evidence</h2>
      <ul className="mt-3 space-y-2">
        {items.map(({ label, url }) => (
          <li key={url}>
            <a href={url} className="text-[#3458c6] underline underline-offset-4">{label}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
