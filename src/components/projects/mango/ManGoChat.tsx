import { AgentDemoChat } from '../agent/AgentDemoChat'
import { useCases } from './useCases'

export const routeStyle = {
  sql: { label: 'Structured SQL', chip: 'border-[#3458c6]/30 bg-[#f3f5fc] text-[#3458c6]' },
  rag: { label: 'Semantic retrieval', chip: 'border-[#2f7f86]/30 bg-[#eef7f7] text-[#2f7f86]' },
}

export function ManGoChat() {
  return <AgentDemoChat cases={useCases} routes={routeStyle} agentName="ManGo AI Agent" avatar="M" />
}
