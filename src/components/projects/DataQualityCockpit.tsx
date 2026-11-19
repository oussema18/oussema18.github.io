import { useState } from 'react'

type Contribution = {
  title: string
  summary: string
  points: string[]
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
    videoSrc: 'images/dqc-rule-to-code.mp4',
    videoLabel: 'Example of a rule description being translated into validated Python code',
  },
  {
    title: 'Code Repository Transformations',
    summary: 'Loaded all input datasets and computed rule scores efficiently at scale.',
    points: [
      'Batched rules to stay within memory constraints.',
      'Combined the per-batch results into one consolidated score output.',
    ],
  },
  {
    title: 'DQC AI Agent',
    summary: 'Built an agent that retrieves the data quality rules and their results.',
    points: ['Summarizes rule results so data quality problems are easy to spot.'],
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
      controls
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
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#6b706c]">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9a9f9b]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
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
