// Illustrative scenarios for the ManGo AI Agent. All document IDs, titles and
// records below are fictional examples; no real company data is shown.

export type Route = 'sql' | 'rag'

export type Tone = 'red' | 'amber' | 'green' | 'neutral'

export type Trace =
  | { kind: 'sql'; code: string }
  | { kind: 'chunks'; chunks: { ref: string; text: string; score: number }[] }

export type AnswerItem = {
  title: string
  meta?: string
  badge?: { text: string; tone: Tone }
  cite?: number[]
}

export type UseCase = {
  id: string
  tab: string
  route: Route
  question: string
  tools: string[]
  trace: Trace
  intro: string
  layout: 'rows' | 'steps' | 'timeline'
  answer: AnswerItem[]
  sources: string[]
}

export const useCases: UseCase[] = [
  {
    id: 'review',
    tab: 'Review deadlines',
    route: 'sql',
    question: 'Which documents are due for review in the next 30 days, or already overdue?',
    tools: ['Selecting tool: query_document_metadata', 'Running SQL on document metadata'],
    trace: {
      kind: 'sql',
      code: `SELECT doc_id, title, next_review_date
FROM documents
WHERE status = 'Effective'
  AND next_review_date <= CURRENT_DATE + 30
ORDER BY next_review_date`,
    },
    intro: '3 effective documents need attention. One is already past its review date:',
    layout: 'rows',
    answer: [
      { title: 'SOP-QA-0142 · Deviation Handling', meta: 'Owner: Quality Assurance', badge: { text: 'Overdue 12 days', tone: 'red' }, cite: [1] },
      { title: 'WI-PRD-0318 · Line Clearance', meta: 'Owner: Production', badge: { text: 'Due in 9 days', tone: 'amber' }, cite: [1] },
      { title: 'SOP-QC-0087 · OOS Investigation', meta: 'Owner: Quality Control', badge: { text: 'Due in 21 days', tone: 'amber' }, cite: [1] },
    ],
    sources: ['Document metadata · documents table'],
  },
  {
    id: 'procedure',
    tab: 'Explain a procedure',
    route: 'rag',
    question: 'What do I have to do when I discover a deviation during batch production?',
    tools: ['Selecting tool: semantic_search', 'Embedding question · searching document chunks'],
    trace: {
      kind: 'chunks',
      chunks: [
        { ref: 'SOP-QA-0142 §5.2', text: 'Immediate actions: stop the affected step and secure the material…', score: 0.89 },
        { ref: 'SOP-QA-0142 §5.4', text: 'The deviation must be recorded within one working day…', score: 0.84 },
        { ref: 'WI-PRD-0318 §3.1', text: 'Before restarting the line, perform a documented clearance…', score: 0.71 },
      ],
    },
    intro: 'According to the Deviation Handling SOP, follow these steps:',
    layout: 'steps',
    answer: [
      { title: 'Stop the affected process step and secure the material.', cite: [1] },
      { title: 'Inform your supervisor and record the deviation within one working day.', cite: [2] },
      { title: 'Perform a documented line clearance before restarting production.', cite: [3] },
    ],
    sources: ['SOP-QA-0142 · §5.2 Immediate actions', 'SOP-QA-0142 · §5.4 Recording', 'WI-PRD-0318 · §3.1 Line clearance'],
  },
  {
    id: 'history',
    tab: 'Approval history',
    route: 'sql',
    question: 'Summarize the approval and change history of SOP-QC-0087.',
    tools: ['Selecting tools: query_workflow, query_audit_trail', 'Joining workflow records and audit trail'],
    trace: {
      kind: 'sql',
      code: `SELECT w.version, w.step, w.role, a.event, a.ts
FROM workflow_records w
JOIN audit_trail a ON a.workflow_id = w.id
WHERE w.doc_id = 'SOP-QC-0087'
ORDER BY a.ts`,
    },
    intro: 'SOP-QC-0087 moved from version 3.0 to 4.0 in four recorded steps:',
    layout: 'timeline',
    answer: [
      { title: 'Change request opened', meta: 'Quality Control · updated sampling plan', cite: [1] },
      { title: 'Technical review completed', meta: 'Laboratory lead · 2 comments resolved', cite: [1, 2] },
      { title: 'Approved by Quality Assurance', meta: 'Electronic signature recorded', cite: [2] },
      { title: 'Version 4.0 effective', meta: 'Version 3.0 superseded', cite: [1] },
    ],
    sources: ['Workflow records · SOP-QC-0087', 'Audit trail · SOP-QC-0087'],
  },
  {
    id: 'copies',
    tab: 'Controlled copies',
    route: 'sql',
    question: 'Which controlled copies of superseded versions have no recorded destruction date?',
    tools: ['Selecting tool: query_copy_log', 'Running SQL on copy logs'],
    trace: {
      kind: 'sql',
      code: `SELECT c.copy_id, c.doc_id, c.version, c.location
FROM copy_log c
JOIN documents d ON d.doc_id = c.doc_id
WHERE c.version < d.current_version
  AND c.destruction_date IS NULL`,
    },
    intro: 'I found 2 controlled copies of superseded versions that are still open:',
    layout: 'rows',
    answer: [
      { title: 'CC-0457 · SOP-QC-0087 v3.0', meta: 'Location: QC Laboratory 2', badge: { text: 'No destruction date', tone: 'red' }, cite: [1] },
      { title: 'CC-0461 · WI-PRD-0318 v6.0', meta: 'Location: Production Hall B', badge: { text: 'No destruction date', tone: 'red' }, cite: [1] },
    ],
    sources: ['Copy log · controlled copies'],
  },
]
