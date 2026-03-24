import { Review } from "@/types/home"

export const reviews: Review[] = [
  {
    name: "Alex Nguyen",
    avatar: "/avatars/alex.png",
    ielts: "IELTS 7.5",
    content: "DailyLang really helped me improve my speaking confidence. The AI tutor Dorara feels just like a real person!",
    direction: "Academic",
    fullFeedback: "Before using DailyLang, I was very shy when speaking English. The virtual speaking room and personalized study plan not only guided me on what to learn each day but also gave me instant feedback on my pronunciation. I eventually achieved IELTS 7.5 in my recent exam. Highly recommended!",
    courses: ["IELTS Speaking Mastery", "Advanced Grammar"],
    result: { type: "IELTS", score: "7.5", previousScore: "6.0" },
    duration: "3 months",
    photo: "/reviews/alex-result.png"
  },
  {
    name: "Mai Le",
    avatar: "/avatars/mai.png",
    ielts: "TOEIC 900",
    content: "The vocabulary hub is amazing. I learned so many new words without feeling overwhelmed.",
    direction: "General",
    fullFeedback: "As a working professional, I didn't have much time to study. DailyLang broke everything down into bite-sized lessons. The smart spaced repetition system helped me remember vocabulary perfectly. I reached my target TOEIC score much faster than expected.",
    courses: ["Business English", "Toeic 800+"],
    result: { type: "TOEIC", score: "900", previousScore: "650" },
    duration: "2 months",
    photo: "/reviews/mai-result.png"
  },
  {
    name: "Tuan Vu",
    avatar: "/avatars/tuan.png",
    ielts: "IELTS 8.0",
    content: "A game changer! The learning profile tracking kept me motivated every single day.",
    direction: "Academic",
    fullFeedback: "I've tried many apps but DailyLang is by far the most comprehensive. From grammar to speaking, everything is well structured. Dorara AI is incredibly smart and points out my mistakes without making me feel bad. I wouldn't have reached 8.0 without this platform.",
    courses: ["Intensive Speaking", "Academic Writing"],
    result: { type: "IELTS", score: "8.0", previousScore: "7.0" },
    duration: "4 months",
    photo: "/reviews/tuan-result.png"
  },
  {
    name: "Yuki Tanaka",
    avatar: "/avatars/alex.png",
    ielts: "JLPT N2",
    content: "The Kanji flashcards with spaced repetition are incredible. I went from struggling with N3 to passing N2.",
    direction: "Academic",
    fullFeedback: "DailyLang's Japanese learning path is very well organized. The AI speaking partner helped me practice natural conversation patterns, and the SRS flashcards made memorizing 2000+ Kanji so much easier. The progress tracking kept me accountable.",
    courses: ["JLPT N2 Prep", "Kanji Mastery"],
    result: { type: "JLPT", score: "N2", previousScore: "N3" },
    duration: "5 months",
    photo: "/reviews/alex-result.png"
  },
  {
    name: "Sarah Chen",
    avatar: "/avatars/mai.png",
    ielts: "IELTS 7.0",
    content: "Finally an app that teaches you to actually speak, not just memorize flashcards. The speaking rooms are fantastic.",
    direction: "General",
    fullFeedback: "I tried Duolingo, Babbel, and others but they were all the same — multiple choice quizzes. DailyLang actually makes you practice speaking with an AI that corrects your pronunciation in real-time. That changed everything for me.",
    courses: ["Conversation Fluency", "IELTS Speaking"],
    result: { type: "IELTS", score: "7.0", previousScore: "5.5" },
    duration: "3 months",
    photo: "/reviews/mai-result.png"
  },
  {
    name: "Hiroshi Yamamoto",
    avatar: "/avatars/tuan.png",
    ielts: "Business English",
    content: "The personalized study plan adjusted to my work schedule perfectly. 15 minutes a day made a real difference.",
    direction: "General",
    fullFeedback: "As a software engineer, I needed to improve my English for international meetings. DailyLang created a custom plan focused on business vocabulary and presentation skills. The daily practice sessions were short but very effective.",
    courses: ["Business English", "Professional Communication"],
    result: { type: "TOEIC", score: "880", previousScore: "720" },
    duration: "2 months",
    photo: "/reviews/tuan-result.png"
  },
]
