import type { Project } from '../../types/project'
import { ArrowIcon } from './ArrowIcon'

type ProjectCardProps = {
  project: Project
  total: number
}

export function ProjectCard({ project, total }: ProjectCardProps) {
  return (
    <article className="group flex min-h-[360px] flex-col rounded-2xl border border-[#deded8] bg-[#fbfbf8] p-7 transition-colors hover:border-[#aeb5c9] hover:bg-white">
      <div className="mb-16 flex items-center justify-between text-xs text-[#757a75]">
        <span>{project.number} / {String(total).padStart(2, '0')}</span>
        <ArrowIcon diagonal />
      </div>
      <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-[#3458c6]">{project.category}</p>
      <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-[-0.045em]">{project.title}</h3>
      <p className="mb-7 text-sm leading-relaxed text-[#646963]">{project.description}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[#e1e3db] px-3 py-1 text-[11px] text-[#666b65]">{tag}</span>
        ))}
      </div>
    </article>
  )
}
