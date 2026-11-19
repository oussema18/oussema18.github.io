import type { ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataQualityCockpit } from '../components/projects/DataQualityCockpit'
import { ProjectEvidence } from '../components/projects/ProjectEvidence'
import { projectDetails } from '../data/projectDetails'
import { projects } from '../data/projects'

const projectIllustrations: Partial<Record<string, ComponentType>> = {
  'data-quality-cockpit': DataQualityCockpit,
}

function BackToWork() {
  return (
    <Link to="/#work" className="text-sm font-semibold text-[#3458c6] underline-offset-4 hover:underline">
      ← Back to selected work
    </Link>
  )
}

export function PageNotFound() {
  return (
    <section id="top" className="py-20">
      <h1 className="section-title mb-6">Page not found</h1>
      <BackToWork />
    </section>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) return <PageNotFound />

  const details = projectDetails[project.slug]
  const Illustration = projectIllustrations[project.slug]

  return (
    <article id="top" className="max-w-3xl py-16 md:py-24">
      <BackToWork />
      <p className="mb-3 mt-10 text-xs font-semibold tracking-[0.14em] text-[#3458c6]">{project.category}</p>
      <h1 className="text-4xl font-semibold leading-tight tracking-[-0.055em] md:text-6xl">{project.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#585d59]">{project.description}</p>
      <ul aria-label="Topics" className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-[#e1e3db] px-3 py-1 text-xs text-[#666b65]">{tag}</li>
        ))}
      </ul>
      {Illustration && <Illustration />}
      {details && (
        <section aria-labelledby="project-focus" className="mt-10 border-t border-[#deded8] pt-8">
          <h2 id="project-focus" className="text-xl font-semibold tracking-tight">Project focus</h2>
          <p className="mt-3 leading-relaxed text-[#585d59]">{details.focus}</p>
        </section>
      )}
      <ProjectEvidence items={details?.evidence} />
    </article>
  )
}
