import { Review } from "@/types/home"

export const reviews: Review[] = [
  {
    name: "Alex Nguyen",
    avatar: "/avatars/alex.jpg",
    ielts: "IELTS 7.5",
    content: "DailyEng really helped me improve my speaking confidence. The AI tutor Dorara feels just like a real person!",
    direction: "Academic",
    fullFeedback: "Before using DailyEng, I was very shy when speaking English. The virtual speaking room and personalized study plan not only guided me on what to learn each day but also gave me instant feedback on my pronunciation. I eventually achieved IELTS 7.5 in my recent exam. Highly recommended!",
    courses: ["IELTS Speaking Mastery", "Advanced Grammar"],
    result: { type: "IELTS", score: "7.5", previousScore: "6.0" },
    duration: "3 months",
    photo: "/reviews/alex-result.jpg"
  },
  {
    name: "Mai Le",
    avatar: "/avatars/mai.jpg",
    ielts: "TOEIC 900",
    content: "The vocabulary hub is amazing. I learned so many new words without feeling overwhelmed.",
    direction: "General",
    fullFeedback: "As a working professional, I didn't have much time to study. DailyEng broke everything down into bite-sized lessons. The smart spaced repetition system helped me remember vocabulary perfectly. I reached my target TOEIC score much faster than expected.",
    courses: ["Business English", "Toeic 800+"],
    result: { type: "TOEIC", score: "900", previousScore: "650" },
    duration: "2 months",
    photo: "/reviews/mai-result.jpg"
  },
  {
    name: "Tuan Vu",
    avatar: "/avatars/tuan.jpg",
    ielts: "IELTS 8.0",
    content: "A game changer! The learning profile tracking kept me motivated every single day.",
    direction: "Academic",
    fullFeedback: "I've tried many apps but DailyEng is by far the most comprehensive. From grammar to speaking, everything is well structured. Dorara AI is incredibly smart and points out my mistakes without making me feel bad. I wouldn't have reached 8.0 without this platform.",
    courses: ["Intensive Speaking", "Academic Writing"],
    result: { type: "IELTS", score: "8.0", previousScore: "7.0" },
    duration: "4 months",
    photo: "/reviews/tuan-result.jpg"
  }
]
