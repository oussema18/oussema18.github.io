export type Tone = 'red' | 'amber' | 'green' | 'neutral'

export type Trace =
  | { kind: 'sql'; code: string }
  | { kind: 'chunks'; chunks: { ref: string; text: string; score: number }[] }
  | { kind: 'path'; steps: { type: string; id: string; note?: string }[] }

export type AnswerItem = {
  title: string
  meta?: string
  badge?: { text: string; tone: Tone }
  cite?: number[]
}

export type DemoCase<R extends string = string> = {
  id: string
  tab: string
  route: R
  question: string
  tools: string[]
  trace: Trace
  intro: string
  layout: 'rows' | 'steps' | 'timeline'
  answer: AnswerItem[]
  sources: string[]
}

export type RouteStyles = Record<string, { label: string; chip: string }>
