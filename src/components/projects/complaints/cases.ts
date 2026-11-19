// Illustrative scenarios for the Complaints AI Agent. All IDs, products and
// records are fictional examples; no real company data is shown.
import type { DemoCase } from '../agent/types'

export type Route = 'filter' | 'links'

export const routeStyle = {
  filter: { label: 'Object query', chip: 'border-[#3458c6]/30 bg-[#f3f5fc] text-[#3458c6]' },
  links: { label: 'Link traversal', chip: 'border-[#6d4fb3]/30 bg-[#f7f4fc] text-[#6d4fb3]' },
}

export const cases: DemoCase<Route>[] = [
  {
    id: 'find',
    tab: 'Find complaints',
    route: 'filter',
    question: 'Show me this year’s complaints about leaking caps for Product A.',
    tools: [
      'Interpreting request: issue = leaking cap · product = Product A · since 2026-01-01',
      'Querying complaint objects',
    ],
    trace: {
      kind: 'sql',
      code: `Complaints
  .filter(product == "Product A")
  .filter(received_date >= "2026-01-01")
  .search(description ~ "leak* cap")`,
    },
    intro: '3 complaints match. Two of them concern the same batch, B2611:',
    layout: 'rows',
    answer: [
      { title: 'CMP-2026-0418 · Cap leaking after opening', meta: 'Batch B2611 · received 14 Mar', badge: { text: 'Open', tone: 'amber' }, cite: [1] },
      { title: 'CMP-2026-0377 · Liquid found around cap', meta: 'Batch B2611 · received 2 Mar', badge: { text: 'Investigating', tone: 'amber' }, cite: [1] },
      { title: 'CMP-2026-0291 · Cap loose on delivery', meta: 'Batch B2604 · received 9 Feb', badge: { text: 'Closed', tone: 'green' }, cite: [1] },
    ],
    sources: ['Complaint objects · filtered by product, date and description'],
  },
  {
    id: 'linked',
    tab: 'Linked CAPAs & changes',
    route: 'links',
    question: 'Which CAPAs and change controls are linked to CMP-2026-0418?',
    tools: ['Loading complaint CMP-2026-0418', 'Following links: Complaint → CAPA → Change Control'],
    trace: {
      kind: 'path',
      steps: [
        { type: 'Complaint', id: 'CMP-2026-0418' },
        { type: 'CAPA', id: 'CAPA-2026-0193', note: '+1 more' },
        { type: 'Change Control', id: 'CC-2026-0577' },
      ],
    },
    intro: 'The complaint raised 2 CAPAs. One of them is implemented through a change control:',
    layout: 'rows',
    answer: [
      { title: 'CAPA-2026-0193 · Adjust capping torque', meta: 'Corrective · root cause: torque below spec', badge: { text: 'In progress', tone: 'amber' }, cite: [1] },
      { title: 'CAPA-2026-0201 · Retrain line operators', meta: 'Preventive', badge: { text: 'Closed', tone: 'green' }, cite: [1] },
      { title: 'CC-2026-0577 · Update capping machine parameters', meta: 'Implements CAPA-2026-0193', badge: { text: 'Approved', tone: 'green' }, cite: [2] },
    ],
    sources: ['Link · Complaint → CAPA', 'Link · CAPA → Change Control'],
  },
  {
    id: 'investigate',
    tab: 'Gather evidence',
    route: 'links',
    question: 'Gather the related records I need to investigate CMP-2026-0377.',
    tools: [
      'Loading complaint CMP-2026-0377',
      'Following links: batch, similar complaints, CAPAs, change controls',
      'Collecting associated records',
    ],
    trace: {
      kind: 'path',
      steps: [
        { type: 'Complaint', id: 'CMP-2026-0377' },
        { type: 'Batch', id: 'B2611' },
        { type: 'Complaint', id: 'CMP-2026-0418', note: 'same batch' },
        { type: 'CAPA', id: 'CAPA-2026-0193' },
        { type: 'Change Control', id: 'CC-2026-0577' },
      ],
    },
    intro: 'Here are the records related to CMP-2026-0377, grouped for your investigation:',
    layout: 'timeline',
    answer: [
      { title: 'Batch B2611 · Product A', meta: 'Batch record and release data attached', cite: [1] },
      { title: 'Similar complaint · CMP-2026-0418', meta: 'Same batch, same issue: leaking cap', cite: [2] },
      { title: 'Open CAPA · CAPA-2026-0193', meta: 'Root cause under review: capping torque', cite: [3] },
      { title: 'Change control · CC-2026-0577', meta: 'Approved, not yet effective for batch B2611', cite: [3] },
    ],
    sources: ['Link · Complaint → Batch', 'Batch → other complaints', 'Complaint → CAPA → Change Control'],
  },
]
