import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    slug: 'explainable-oring-classification',
    number: '01',
    organization: 'PROSTEP AG',
    category: 'SOFTWARE ENGINEERING',
    title: 'OpenCLM Integration Platform',
    description:
      'Developing Java Spring Boot web applications to exchange engineering project data through APIs and structured import/export workflows.',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'JSP'],
  },
  {
    slug: 'knowledge-retrieval-with-ai',
    number: '02',
    organization: 'PROSTEP AG',
    category: 'APPLIED AI / SOFTWARE',
    title: 'AI-Assisted Jira Ticket Classification',
    description:
      'Integrating predictive AI services into Jira workflows to support automatic ticket attribute classification using issue descriptions.',
    tags: ['Java', 'Jira SDK', 'Machine Learning', 'APIs'],
  },
  {
    slug: 'reliable-data-workflows',
    number: '03',
    organization: 'MaibornWolff / TU Darmstadt',
    category: 'FULL-STACK DEVELOPMENT',
    title: 'Project Canvas',
    description:
      'Building a cross-platform desktop application that extends Jira with interactive backlog visualization and agile project management features.',
    tags: ['React', 'TypeScript', 'Electron', 'Jira API'],
  },
  {
    number: '04',
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
    number: '09',
    slug: 'data-quality-cockpit',
    organization: 'Merck',
    category: 'GENERATIVE AI / DATA ENGINEERING',
    title: 'AI-Powered Data Quality Cockpit',
    description:
      'Converting natural-language data quality requirements into controlled Python validation logic and integrating the results into data quality workflows.',
    tags: ['Python', 'Generative AI', 'Data Engineering'],
  },
  {
    number: '10',
    slug: 'complaints-ai-agent',
    organization: 'Merck',
    category: 'AGENTIC AI / ANALYTICS',
    title: 'Complaints Analysis AI Agent',
    description:
      'Developing an AI-assisted approach to navigating and analyzing complaint-related information across interconnected data.',
    tags: ['LLMs', 'AI Agents', 'Data Analytics'],
  },
  {
    number: '11',
    slug: 'mongo-ai-agent',
    organization: 'Merck',
    category: 'APPLIED AI',
    title: 'Mongo AI Agent',
    description:
      'Exploring an AI-agent application for interacting with information through natural language.',
    tags: ['AI Agents', 'LLMs'],
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
