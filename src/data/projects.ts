import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'openclm-integration',
    number: '10',
    organization: 'PROSTEP AG',
    category: 'SOFTWARE ENGINEERING',
    title: 'OpenCLM Integration Platform',
    description:
      'Developing Java Spring Boot web applications to exchange engineering project data through APIs and structured import/export workflows.',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'JSP'],
  },
  {
    slug: 'jira-ai-classification',
    number: '09',
    organization: 'PROSTEP AG',
    category: 'APPLIED AI / SOFTWARE',
    title: 'AI-Assisted Jira Ticket Classification',
    description:
      'Integrating predictive AI services into Jira workflows to support automatic ticket attribute classification using issue descriptions.',
    tags: ['Java', 'Jira SDK', 'Machine Learning', 'APIs'],
  },
  {
    slug: 'project-canvas',
    number: '04',
    organization: 'MaibornWolff / TU Darmstadt',
    category: 'FULL-STACK DEVELOPMENT',
    title: 'Project Canvas',
    description:
      'Building a cross-platform desktop application that extends Jira with interactive backlog visualization and agile project management features.',
    tags: ['React', 'TypeScript', 'Electron', 'Jira API'],
  },
  {
    number: '11',
    slug: 'shortcut-learning-code',
    organization: 'TU Darmstadt',
    category: 'NLP / RESEARCH',
    title: 'Shortcut Learning in Code Summarization',
    description:
      'Investigating how neural code understanding models rely on comments, function names, and identifiers when generating code summaries.',
    tags: ['Python', 'CodeBERT', 'CodeT5', 'NLP'],
  },
  {
    number: '05',
    slug: 'deepfake-detection',
    organization: 'TU Darmstadt',
    category: 'MULTIMODAL AI',
    title: 'Temporal Deepfake Detection',
    description:
      'Exploring video manipulation detection through temporal inconsistencies in facial regions and multimodal deep learning techniques.',
    tags: ['Python', 'PyTorch', 'Computer Vision'],
  },
  {
    number: '06',
    slug: 'reinforcement-learning',
    organization: 'TU Darmstadt',
    category: 'REINFORCEMENT LEARNING',
    title: 'Symbolic Option Learning',
    description:
      'Exploring temporal abstraction and reusable behaviors in reinforcement learning environments.',
    tags: ['Python', 'Reinforcement Learning', 'Research'],
  },
  {
    number: '07',
    slug: 'cataract-anomaly-detection',
    organization: 'TU Darmstadt',
    category: 'MEDICAL COMPUTER VISION',
    title: 'Cataract Surgery Anomaly Detection',
    description:
      'Investigating frame-level anomaly detection in cataract surgery videos using computer vision techniques.',
    tags: ['Python', 'Computer Vision', 'Anomaly Detection'],
  },
  {
    number: '08',
    slug: 'explainable-oring-classification',
    organization: 'Fraunhofer LBF / TU Darmstadt',
    category: 'EXPLAINABLE AI / RESEARCH',
    title: 'Explainable O-Ring Damage Classification',
    description:
      'Developing an explainable deep learning approach for image-based damage classification of industrial O-rings.',
    tags: ['Python', 'Deep Learning', 'XAI', 'Computer Vision'],
  },
  {
    number: '01',
    slug: 'data-quality-cockpit',
    organization: 'Merck',
    category: 'GENERATIVE AI / DATA ENGINEERING',
    title: 'AI-Powered Data Quality Cockpit',
    description:
      'Converting natural-language data quality requirements into controlled Python validation logic and integrating the results into data quality workflows.',
    tags: ['Python', 'Generative AI', 'Data Engineering'],
  },
  {
    number: '03',
    slug: 'complaints-ai-agent',
    organization: 'Merck',
    category: 'AGENTIC AI / ANALYTICS',
    title: 'Complaints AI Agent',
    description:
      'A conversational AI agent in Palantir Foundry/AIP that supports quality complaint investigations by connecting complaints with their CAPAs, change controls and related records.',
    tags: ['Palantir Foundry', 'AIP', 'Data Modeling', 'Retrieval Evaluation'],
  },
  {
    number: '02',
    slug: 'mango-ai-agent',
    organization: 'Merck',
    category: 'AGENTIC AI / RAG',
    title: 'ManGo AI Agent',
    description:
      'A conversational AI agent in Palantir Foundry/AIP that helps employees find and understand controlled quality documents, combining SQL queries over document records with RAG over document contents.',
    tags: ['Palantir Foundry', 'AIP', 'RAG', 'SQL', 'Tool Calling'],
  },
  {
    number: '12',
    slug: 'user-review',
    organization: 'Merck',
    category: 'SOFTWARE / APPLIED AI',
    title: 'User Review Project',
    description:
      'A project focused on practical software and AI applications, with implementation details to be documented.',
    tags: ['Software Engineering', 'Applied AI'],
  },
]
