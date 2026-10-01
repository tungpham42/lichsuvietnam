import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "@/components/Quiz";
import { ArrowLeftIcon } from "@/components/Icons";
import { questions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Trắc nghiệm",
  description: "Kiểm tra kiến thức lịch sử Việt Nam với các câu hỏi trắc nghiệm.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
      <Link
        href="/bai-hoc"
        className="inline-flex items-center gap-2 text-sm text-cham-soft hover:text-cham hover:underline"
      >
        <ArrowLeftIcon className="size-4" />
        Bài học
      </Link>
      <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl">Trắc nghiệm</h1>
      <div className="mt-8">
        <Quiz questions={questions} />
      </div>
    </div>
  );
}
