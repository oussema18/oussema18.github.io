export type Project = {
  slug: string
  number: string
  organization: string
  category: string
  title: string
  description: string
  tags: string[]
}

export type ProjectEvidenceItem = {
  label: string
  url: string
}

export type ProjectDetails = {
  focus: string
  evidence?: ProjectEvidenceItem[]
}
