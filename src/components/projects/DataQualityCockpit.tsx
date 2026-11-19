import { useState, type ReactNode } from 'react'
import { BatchPipeline } from './BatchPipeline'

type Contribution = {
  title: string
  summary: string
  challenge?: string
  points: string[]
  illustration?: ReactNode
  videoSrc?: string
  videoLabel?: string
}

const contributions: Contribution[] = [
  {
    title: 'Rule description → Python code',
    summary:
      'Translated each natural-language rule description into executable Python code, one check per rule.',
    points: [
      'Validators check that the generated code compiles before it is accepted.',
      'Field validation makes sure the code only references FIELDs that exist in the target dataset.',
    ],
    videoSrc: 'images/data-quality-rule-to-pyspark-loop.mp4',
    videoLabel: 'Example of a rule description being translated into validated Python code',
  },
  {
    title: 'Code Repository Transformations',
    summary: 'Loaded all input datasets and computed rule scores efficiently at scale.',
    challenge:
      'The rules depend on many different input datasets. Loading and joining all of them at once to evaluate every rule exceeded the available memory profile and made runtimes long.',
    points: [
      'Grouped the rules into batches based on the input datasets they need, so each batch loads only its own datasets.',
      'Processed the batches one after another, freeing memory before the next batch starts.',
      'Joined the partial results of all batches into one consolidated score output.',
      'This kept memory usage within limits and reduced the overall runtime.',
    ],
    illustration: <BatchPipeline />,
  },
  {
    title: 'DQC AI Agent',
    summary: 'Built an agent that retrieves the data quality rules and their results.',
    points: ['Summarizes rule results so data quality problems are easy to spot.'],
  },
]

const challenges: string[] = [
  'Data quality reports already existed, but they were fragmented across many separate reports.',
  'They lived on very different platforms and applications, with no single place to see the overall picture.',
  'Most of them were ownerless: nobody was clearly accountable for monitoring a rule or acting on its results.',
]

type WorkflowStep = {
  status: string
  actor: string
  description: string
}

const workflow: WorkflowStep[] = [
  {
    status: 'Requested',
    actor: 'Data Steward',
    description: 'The data steward requests a new data quality rule for their assigned data.',
  },
  {
    status: 'Business approval',
    actor: 'Data Owner',
    description: 'The data owner approves the rule for its business relevance.',
  },
  {
    status: 'Implementation approval',
    actor: 'Implementer',
    description:
      'The implementer confirms that the generated Python code matches the intended quality rule.',
  },
  {
    status: 'Implementation completed',
    actor: 'System',
    description: 'The rule runs and its quality score becomes available in the cockpit.',
  },
  {
    status: 'Owner review',
    actor: 'Data Owner',
    description: 'The data owner reviews the resulting score before the rule moves forward.',
  },
  {
    status: 'Rule finalized',
    actor: 'Production',
    description: 'The rule is finalized and runs in production, monitored by its owners.',
  },
]

function ContributionVideo({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center text-xs text-[#8a8f8b]">
        Demo video coming soon
      </div>
    )
  }

  return (
    <video
      className="block h-auto w-full"
      src={`${import.meta.env.BASE_URL}${src}`}
      loop
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      onError={() => setFailed(true)}
    />
  )
}

export function DataQualityCockpit() {
  return (
    <>
      <section aria-labelledby="cockpit-challenge" className="mt-12">
        <h2 id="cockpit-challenge" className="text-2xl font-semibold tracking-tight text-[#585d59]">
          The Challenge
        </h2>
        <ul className="mt-4 space-y-2">
          {challenges.map((point) => (
            <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#6b706c]">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9a9f9b]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cockpit-goal" className="mt-12">
        <h2 id="cockpit-goal" className="text-2xl font-semibold tracking-tight text-[#585d59]">
          The Goal
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#6b706c]">
          Build a single catalog of data quality rules, each owned by a{' '}
          <span className="font-semibold text-[#585d59]">Data Owner</span> and a{' '}
          <span className="font-semibold text-[#585d59]">Data Steward</span> who are responsible
          for monitoring, visualizing and managing the quality of their assigned data. The Data
          Quality Cockpit dashboard was created to bring these rules, their owners and their scores
          together in one place.
        </p>
      </section>

      <section aria-labelledby="cockpit-preview" className="mt-12">
        <h2 id="cockpit-preview" className="text-sm font-semibold tracking-tight text-[#585d59]">
          Cockpit preview
        </h2>
        <figure className="mt-3 overflow-hidden rounded-2xl border border-[#deded8] bg-[#f4f3ef]">
          <video
            className="block h-auto w-full"
            src={`${import.meta.env.BASE_URL}images/data-quality-cockpit-loop.mp4`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Animated preview of the Data Quality Cockpit dashboard"
          />
        </figure>
      </section>

      <section aria-labelledby="cockpit-workflow" className="mt-12">
        <h2 id="cockpit-workflow" className="text-2xl font-semibold tracking-tight text-[#585d59]">
          Rule Lifecycle
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6b706c]">
          Every rule follows the same governed workflow, with a clear owner at each step.
        </p>
        <ol className="mt-6">
          {workflow.map((step, index) => (
            <li key={step.status} className="relative flex gap-4 pb-6 last:pb-0">
              {index < workflow.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-8 bottom-0 w-px -translate-x-1/2 bg-[#deded8]"
                />
              )}
              <span
                aria-hidden="true"
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#deded8] bg-white text-sm font-semibold text-[#585d59]"
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-[#585d59]">
                    {step.status}
                  </h3>
                  <span className="rounded-full border border-[#deded8] bg-[#f4f3ef] px-2 py-0.5 text-xs font-medium text-[#6b706c]">
                    {step.actor}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[#6b706c]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="cockpit-contributions" className="mt-12">
        <h2
          id="cockpit-contributions"
          className="text-2xl font-semibold tracking-tight text-[#585d59]"
        >
          My Contributions
        </h2>
        <ol className="mt-6 space-y-4">
          {contributions.map((item, index) => (
            <li
              key={item.title}
              className="rounded-2xl border border-[#deded8] bg-[#f4f3ef] p-5 sm:p-6"
            >
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#deded8] bg-white text-sm font-semibold text-[#585d59]"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold tracking-tight text-[#585d59]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b706c]">{item.summary}</p>
                  {item.challenge && (
                    <p className="mt-3 rounded-lg border-l-2 border-[#c85d50] bg-white/60 px-3 py-2 text-sm leading-relaxed text-[#6b706c]">
                      <span className="font-semibold text-[#585d59]">Challenge: </span>
                      {item.challenge}
                    </p>
                  )}
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#6b706c]">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9a9f9b]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {item.illustration && (
                    <figure className="mt-4 overflow-hidden rounded-xl border border-[#deded8] bg-white">
                      {item.illustration}
                    </figure>
                  )}
                  {item.videoSrc && (
                    <figure className="mt-4 overflow-hidden rounded-xl border border-[#deded8] bg-white">
                      <ContributionVideo src={item.videoSrc} label={item.videoLabel ?? item.title} />
                    </figure>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
