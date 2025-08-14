export interface Feedback {
  is_positive: boolean
  category: string
  description: string
}

export interface ResumeExperience {
  name: string
  company: string
  location: string
  start_date: string
  end_date: string
  descriptions: string[]
}

export interface ResumeResults {
  feedback: Feedback[]
  personal_information: string
  about: string
  skills: string[]
  education: string[]
  experiences: ResumeExperience[]
  projects: string[]
  certifications: string[]
  interests: string[]
}
