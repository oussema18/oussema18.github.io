import type { ReactNode } from 'react'
import { AgentDemoChat } from '../agent/AgentDemoChat'
import { cases, routeStyle } from './cases'
import { DataModel } from './DataModel'
import { PrecisionRecall } from './PrecisionRecall'

const challenges: string[] = [
  'Investigating a complaint needs context from several quality records: the complaint itself, its CAPAs, change controls and associated records.',
  'These records live in separate data sources, so gathering them meant manual searching.',
  'The relationships between a complaint and its follow-up actions were hard to see at a glance.',
]

type Contribution = { title: string; summary: string; points: string[]; illustration?: ReactNode }

const contributions: Contribution[] = [
  {
    title: 'Data model',
    summary: 'Built the data model connecting complaints with their related quality records.',
    points: [
      'Modeled complaints, CAPAs, change controls, product batches and associated records as linked objects.',
      'Defined the links between them, so the agent can follow a complaint to its follow-up actions.',
      'Shared batches reveal related complaints that point to a recurring issue.',
    ],
  },
  {
    title: 'Querying & instructions',
    summary: 'Developed the agent’s querying capabilities and the instructions for interpreting requests.',
    points: [
      'Turns a request into filters, such as product, issue, batch and date range.',
      'Follows links to retrieve CAPAs, change controls and associated records for a complaint.',
      'Instructions define how to interpret vague requests and how to present the evidence found.',
    ],
  },
  {
    title: 'Retrieval evaluation',
    summary: 'Evaluated retrieval quality with precision and recall.',
    points: [
      'Each reference case lists the records that should be found for a question.',
      'Precision measures how many of the returned records are relevant.',
      'Recall measures how many of the relevant records were found.',
    ],
    illustration: <PrecisionRecall />,
  },
]

const values = [
  { title: 'Less manual searching', text: 'Related quality records are gathered from one question.' },
  { title: 'Visible relationships', text: 'Links between complaints and their follow-up actions are easy to follow.' },
  { title: 'Evidence for analysis', text: 'Users collect the records they need to support their investigation.' },
]

const technologies = ['Palantir Foundry', 'AIP', 'Data modeling', 'Natural-language querying', 'Retrieval evaluation']

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-semibold tracking-tight text-[#585d59]">
      {children}
    </h2>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((point) => (
        <li key={point} className="flex gap-2 text-sm leading-relaxed text-[#6b706c]">
          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9a9f9b]" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  )
}

export function ComplaintsAgent() {
  return (
    <>
      <section aria-labelledby="cmp-challenge" className="mt-12">
        <SectionTitle id="cmp-challenge">The Challenge</SectionTitle>
        <Bullets items={challenges} />
      </section>

      <section aria-labelledby="cmp-goal" className="mt-12">
        <SectionTitle id="cmp-goal">The Goal</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-[#6b706c]">
          A conversational agent that supports complaint investigations. Users ask in natural
          language, and the agent explores complaint records together with the linked{' '}
          <span className="font-semibold text-[#6d4fb3]">CAPAs</span>,{' '}
          <span className="font-semibold text-[#2f7f86]">change controls</span> and associated
          records, giving them the context to investigate across multiple data sources.
        </p>
      </section>

      <section aria-labelledby="cmp-model" className="mt-12">
        <SectionTitle id="cmp-model">Data model</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-[#6b706c]">
          Complaints, CAPAs and change controls are linked objects. The agent follows these links to
          collect the context of a complaint.
        </p>
        <figure className="mt-4 overflow-hidden rounded-2xl border border-[#deded8] bg-white">
          <DataModel />
        </figure>
      </section>

      <section aria-labelledby="cmp-examples" className="mt-12">
        <SectionTitle id="cmp-examples">Sample interactions</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-[#6b706c]">
          Pick a question to see how the agent interprets it, which objects and links it uses, and
          what it returns. IDs and records are fictional examples.
        </p>
        <figure className="mt-4 overflow-hidden rounded-2xl border border-[#deded8] bg-white">
          <AgentDemoChat
            cases={cases}
            routes={routeStyle}
            agentName="Complaints AI Agent"
            avatar="C"
            minHeight="min-h-[43rem] sm:min-h-[33rem]"
          />
        </figure>
      </section>

      <section aria-labelledby="cmp-contributions" className="mt-12">
        <SectionTitle id="cmp-contributions">My Contributions</SectionTitle>
        <ol className="mt-6 space-y-4">
          {contributions.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-[#deded8] bg-[#f4f3ef] p-5 sm:p-6">
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#deded8] bg-white text-sm font-semibold text-[#585d59]"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold tracking-tight text-[#585d59]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b706c]">{item.summary}</p>
                  <Bullets items={item.points} />
                  {item.illustration && (
                    <figure className="mt-4 overflow-hidden rounded-xl border border-[#deded8] bg-white">
                      {item.illustration}
                    </figure>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="cmp-value" className="mt-12">
        <SectionTitle id="cmp-value">Value</SectionTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="rounded-xl border border-[#deded8] bg-white p-4">
              <h3 className="text-sm font-semibold text-[#585d59]">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6b706c]">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cmp-tech" className="mt-12">
        <h2 id="cmp-tech" className="text-sm font-semibold tracking-tight text-[#585d59]">
          Technologies
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {technologies.map((t) => (
            <li key={t} className="rounded-full border border-[#deded8] bg-[#f4f3ef] px-3 py-1 text-xs text-[#585d59]">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
