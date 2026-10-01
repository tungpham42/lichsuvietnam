export type Figure = { name: string; role: string };

export type Lesson = {
  id: number;
  slug: string;
  title: string;
  description: string;
  period: string;
  events: string[];
  important_figures: Figure[];
  youtube_id: string | null;
  start_time?: number;
  content: string;
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export type GameWord = {
  word: string;
  syllables: string[];
  clue: string;
};

export type Quote = { text: string; author: string };
