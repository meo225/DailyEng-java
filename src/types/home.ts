// Shared types for home page components

export interface FeatureTab {
  id: string
  label: string
  title: string
  description: string
  image: string
}

export interface Review {
  name: string
  avatar: string
  ielts: string
  content: string
  direction: string
  fullFeedback: string
  courses: string[]
  result: { type: string; score: string; previousScore: string }
  duration: string
  photo: string
}

export interface PartnerLogo {
  src: string
  alt: string
}
