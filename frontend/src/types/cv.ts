export type Cv = {
  id: string
  name: string
  skills: string[]
  experienceYears: number
  isActive: boolean
}

export type CvAnalysis = {
  message: string
  analysis: {
    id: string
    name: string
    title: string
    skills: string[]
    experienceYears: number
    createdAt: string
  }
}