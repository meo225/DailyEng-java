/**
 * Study Plan API client — calls Spring Boot StudyPlanController.
 *
 * Replaces the old Prisma-based server actions with apiClient calls.
 */

import { apiClient } from "@/lib/api-client";

// ======================== Types ========================

interface StudyTask {
  id: string;
  planId: string;
  date: string;
  type: string;
  completed: boolean;
  title: string | null;
  startTime: string | null;
  endTime: string | null;
  link: string | null;
}

interface StudyPlan {
  id: string;
  userId: string;
  goal: string;
  level: string;
  minutesPerDay: number;
  wordsPerDay: number;
  interests: string[];
  examDate: string | null;
  tasks: StudyTask[];
}

interface StudyStats {
  dailyHours: string;
  weeklyHours: string;
  totalHours: string;
}

// ======================== Actions ========================

export async function getStudyPlan(_userId: string): Promise<StudyPlan | null> {
  return apiClient.get<StudyPlan>("/study/plan");
}

export async function getTodayTasks(_userId: string): Promise<StudyTask[]> {
  return apiClient.get<StudyTask[]>("/study/tasks/today");
}

export async function toggleTaskCompletion(
  taskId: string,
  _completed: boolean
): Promise<void> {
  await apiClient.put(`/study/tasks/${taskId}/toggle`);
}

export async function updateTaskTime(
  taskId: string,
  startTime: string,
  endTime: string
): Promise<void> {
  await apiClient.put(`/study/tasks/${taskId}/time`, { startTime, endTime });
}

export async function updateStudyGoal(
  _userId: string,
  goal: string,
  level: string,
  hoursPerWeek: number
): Promise<void> {
  const minutesPerDay = Math.round((hoursPerWeek * 60) / 7);
  await apiClient.put("/study/plan/goal", { goal, level, minutesPerDay });
}

export async function updateExamDate(
  _userId: string,
  date: Date
): Promise<void> {
  await apiClient.put("/study/plan/exam-date", {
    examDate: date.toISOString(),
  });
}

export async function getStudyStats(_userId: string): Promise<StudyStats> {
  return apiClient.get<StudyStats>("/study/stats");
}

export async function createNewPlan(
  _userId: string,
  data: {
    goal: string;
    level: string;
    hoursPerWeek: number;
    interests: string[];
  }
): Promise<void> {
  const minutesPerDay = Math.round((data.hoursPerWeek * 60) / 7);
  await apiClient.post("/study/plan", {
    goal: data.goal,
    level: data.level,
    minutesPerDay,
    interests: data.interests,
  });
}
