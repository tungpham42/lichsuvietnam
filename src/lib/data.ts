import lessonsJson from "@/data/lessons.json";
import questionsJson from "@/data/questions.json";
import gameWordsJson from "@/data/gameWords.json";
import type { GameWord, Lesson, Question } from "./types";

export const lessons = lessonsJson as unknown as Lesson[];
export const questions = questionsJson as unknown as Question[];
export const gameWords = gameWordsJson as unknown as GameWord[];

export function getLesson(slug: string) {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonById(id: number) {
  return lessons.find((l) => l.id === id);
}
