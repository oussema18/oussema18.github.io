import { Link } from 'react-router-dom'
import type { Project } from '../../types/project'
import { ArrowIcon } from '../ui/ArrowIcon'

type ProjectCardProps = {
  project: Project
  total: number
}

const organizationLogos: Record<string, { file: string; className?: string }> = {
  'PROSTEP AG': { file: 'prostep.png' },
  MaibornWolff: { file: 'maibornwolff.png' },
  'TU Darmstadt': { file: 'tudarmstadt.png' },
  'Fraunhofer LBF': { file: 'fraunhofer.jpg' },
  Merck: { file: 'merck.avif', className: 'h-12 max-w-[140px]' },
}

function getOrganizationLogos(organization: string) {
  return organization
    .split('/')
    .map((name) => name.trim())
    .filter((name) => name in organizationLogos)
    .map((name) => ({
      name,
      src: `${import.meta.env.BASE_URL}images/${organizationLogos[name].file}`,
      className: organizationLogos[name].className ?? 'h-8 max-w-[90px]',
    }))
}

export function ProjectCard({ project, total }: ProjectCardProps) {
  const logos = getOrganizationLogos(project.organization)

  return (
    <article className="relative flex min-h-[360px] flex-col rounded-2xl border border-[#deded8] bg-[#fbfbf8] p-7 transition-colors hover:border-[#aeb5c9] hover:bg-white">
      <div className="mb-16 flex items-center justify-between gap-4 text-xs text-[#757a75]">
        <span>{project.number} / {String(total).padStart(2, '0')}</span>
        <ArrowIcon diagonal />
      </div>
      <p className="mb-3 text-[10px] font-semibold tracking-[0.14em] text-[#3458c6]">{project.category}</p>
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.045em]">
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#3458c6]"
          >
            {project.title}
          </Link>
        </h3>
        {logos.length > 0 && (
          <div className="flex shrink-0 items-center gap-3">
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={`${logo.name} logo`}
                title={logo.name}
                loading="lazy"
                className={`${logo.className} w-auto object-contain`}
              />
            ))}
          </div>
        )}
      </div>
      <p className="mb-7 text-sm leading-relaxed text-[#646963]">{project.description}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[#e1e3db] px-3 py-1 text-[11px] text-[#666b65]">{tag}</span>
        ))}
      </div>
    </article>
  )
}
