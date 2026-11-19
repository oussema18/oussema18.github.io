import type { ReactNode } from 'react'
import { DataFoundation } from './DataFoundation'
import { Evaluation } from './Evaluation'
import { ManGoArchitecture } from './ManGoArchitecture'
import { LockIcon, ManGoChat } from './ManGoChat'

const challenges: string[] = [
  'Information about controlled quality documents was spread across the document contents and separate administrative records: metadata, workflows, audit trails and copy logs.',
  'Answering a simple question, such as which documents are overdue for review, meant manual research across several records.',
  'In a regulated quality environment, every answer has to be traceable back to its source.',
]

type Contribution = {
  title: string
  summary: string
  points: string[]
  illustration?: ReactNode
}

const contributions: Contribution[] = [
  {
    title: 'Data preparation & linking',
    summary: 'Prepared and linked every record that belongs to a controlled document.',
    points: [
      'Linked document metadata, extracted text, workflow records, audit trails and copy logs.',
      'Records are joined on document ID and version, so the agent sees one connected picture.',
      'Split the extracted text into chunks and embedded them for semantic search.',
    ],
    illustration: <DataFoundation />,
  },
  {
    title: 'Structured & semantic tools',
    summary: 'Implemented the tools the agent calls to get its facts.',
    points: [
      'SQL query tools for metadata, review deadlines, approval workflows, audit trails and copy logs.',
      'Semantic retrieval over document chunks for questions about the content of procedures.',
      'Every tool returns its source, so answers can reference the exact document or section.',
    ],
  },
  {
    title: 'Agent instructions & tool selection',
    summary: 'Configured how the agent decides which tool answers which question.',
    points: [
      'Administrative questions (deadlines, approvals, copies) are routed to structured queries.',
      'Content questions (how a procedure works) are routed to semantic retrieval.',
      'Instructions require source references and keep the agent strictly read-only.',
    ],
  },
  {
    title: 'Evaluation',
    summary: 'Evaluated retrieval and answer quality against reference cases.',
    points: [
      'Each reference case defines a question, the expected source and the key facts.',
      'Checked whether the right tool was chosen and the expected source was retrieved.',
      'Checked whether answers contain the correct facts and reference their sources.',
    ],
    illustration: <Evaluation />,
  },
]

const values = [
  { title: 'One interface', text: 'A single conversational entry point for document contents and administrative records.' },
  { title: 'Less manual research', text: 'Questions that needed several records are answered in one place.' },
  { title: 'Traceable answers', text: 'Responses reference the source documents, so users can verify them.' },
]

const technologies = ['Palantir Foundry', 'AIP', 'SQL', 'RAG', 'Semantic search', 'Embeddings', 'Tool calling']

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

export function ManGoAgent() {
  return (
    <>
      <section aria-labelledby="mango-challenge" className="mt-12">
        <SectionTitle id="mango-challenge">The Challenge</SectionTitle>
        <Bullets items={challenges} />
      </section>

      <section aria-labelledby="mango-goal" className="mt-12">
        <SectionTitle id="mango-goal">The Goal</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-[#6b706c]">
          A conversational agent that helps employees find and understand controlled quality
          documents and their records. It combines{' '}
          <span className="font-semibold text-[#3458c6]">structured SQL queries</span> for document
          metadata with{' '}
          <span className="font-semibold text-[#2f7f86]">retrieval-augmented generation</span> over
          document contents, and every answer references its sources.
        </p>
      </section>

      <section aria-labelledby="mango-architecture" className="mt-12">
        <SectionTitle id="mango-architecture">How it works</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-[#6b706c]">
          The agent reads the question, picks the right tool, and grounds its answer in the records
          it retrieved.
        </p>
        <figure className="mt-4 overflow-hidden rounded-2xl border border-[#deded8] bg-white">
          <ManGoArchitecture />
        </figure>
      </section>

      <section aria-labelledby="mango-examples" className="mt-12">
        <SectionTitle id="mango-examples">Example use cases</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-[#6b706c]">
          Pick a question to see the tool calls, the retrieved records and the referenced answer.
          Document names and records are fictional examples.
        </p>
        <figure className="mt-4 overflow-hidden rounded-2xl border border-[#deded8] bg-white">
          <ManGoChat />
        </figure>
      </section>

      <section aria-labelledby="mango-contributions" className="mt-12">
        <SectionTitle id="mango-contributions">My Contributions</SectionTitle>
        <p className="mt-2 text-sm leading-relaxed text-[#6b706c]">
          I owned the implementation end to end, from data preparation to evaluation.
        </p>
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

      <section aria-labelledby="mango-value" className="mt-12">
        <SectionTitle id="mango-value">Value</SectionTitle>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="rounded-xl border border-[#deded8] bg-white p-4">
              <h3 className="text-sm font-semibold text-[#585d59]">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#6b706c]">{v.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-start gap-2 rounded-lg border-l-2 border-[#3d8b5f] bg-[#f5faf6] px-3 py-2 text-sm leading-relaxed text-[#6b706c]">
          <span className="mt-1 text-[#3d8b5f]">
            <LockIcon />
          </span>
          <span>
            <span className="font-semibold text-[#585d59]">Read-only by design: </span>
            the agent does not modify documents or execute approvals.
          </span>
        </p>
      </section>

      <section aria-labelledby="mango-tech" className="mt-12">
        <h2 id="mango-tech" className="text-sm font-semibold tracking-tight text-[#585d59]">
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
