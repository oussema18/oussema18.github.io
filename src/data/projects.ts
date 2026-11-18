import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'explainable-oring-classification',
    number: '01',
    category: 'COMPUTER VISION / RESEARCH',
    title: 'Explainable image classification',
    description: 'Exploring how neural networks can recognize and explain visual patterns in industrial components.',
    tags: ['Python', 'Deep Learning', 'XAI'],
  },
  {
    slug: 'knowledge-retrieval-with-ai',
    number: '02',
    category: 'APPLIED AI / NLP',
    title: 'Knowledge retrieval with AI',
    description: 'Building approaches that connect natural-language questions with relevant information in documents.',
    tags: ['RAG', 'LLMs', 'Python'],
  },
  {
    slug: 'reliable-data-workflows',
    number: '03',
    category: 'SOFTWARE / DATA',
    title: 'Reliable data workflows',
    description: 'Designing software and data checks that help turn complex information into dependable results.',
    tags: ['TypeScript', 'Data Engineering', 'APIs'],
  },
]
