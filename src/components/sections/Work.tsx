import { projects } from '../../data/projects'
import { ProjectCard } from '../ui/ProjectCard'

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-b border-[#deded8] py-24 md:py-28">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2 id="work-title" className="section-title">Things I've worked on<span className="text-[#3458c6]">.</span></h2>
        </div>
        <p className="max-w-[290px] text-sm leading-relaxed text-[#777c76]">A few areas where software engineering meets applied intelligence.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.number} project={project} total={projects.length} />
        ))}
      </div>
      <p className="mt-5 text-xs text-[#777c76]">Selected work is described at a high level; no confidential materials are shared.</p>
    </section>
  )
}
