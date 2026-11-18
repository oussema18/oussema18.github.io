import type { ProjectDetails } from '../types/project'

export const projectDetails: Partial<Record<string, ProjectDetails>> = {
  'explainable-oring-classification': {
    focus: 'This project explores image classification for industrial O-rings. The research question is which visual features influence a prediction and whether those features help explain the model’s behavior.',
  },
  'knowledge-retrieval-with-ai': {
    focus: 'This project explores retrieval-augmented generation for document collections. It looks at how a natural-language question can be matched with relevant passages and how those passages can support an answer.',
  },
  'reliable-data-workflows': {
    focus: 'This work explores where validation fits into a data workflow, from receiving inputs through preparing information for downstream use. The aim is to make data quality issues easier to identify.',
  },
}
