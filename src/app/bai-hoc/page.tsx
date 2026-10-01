import type { Metadata } from "next";
import Link from "next/link";
import LearnedMark from "@/components/LearnedMark";
import ProgressSummary from "@/components/ProgressSummary";
import { ArrowRightIcon, LightbulbIcon } from "@/components/Icons";
import { eras } from "@/lib/eras";
import { lessons, questions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bài học",
  description: "Mục lục 24 bài học lịch sử Việt Nam, từ thời Hùng Vương đến thời kỳ hiện đại.",
};

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 md:pt-16">
      <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">Bài học</h1>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-cham-soft">
            {lessons.length} bài theo thứ tự thời gian. Học đến đâu, đánh dấu đến đó.
          </p>
        </div>
        <ProgressSummary total={lessons.length} />
      </header>

      <Link
        href="/bai-hoc/trac-nghiem"
        className="group mt-10 flex items-center gap-4 rounded-sm border border-cham bg-giay px-5 py-4 transition-colors hover:bg-cham hover:text-giay"
      >
        <LightbulbIcon className="size-7 shrink-0 text-son group-hover:text-hoe" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold">Kiểm tra kiến thức</p>
          <p className="text-sm opacity-80">
            Trắc nghiệm {questions.length} câu, mỗi lượt chọn ngẫu nhiên 10 câu.
          </p>
        </div>
        <ArrowRightIcon className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>

      <div className="mt-14 space-y-14">
        {eras.map((era) => {
          const items = lessons.filter((l) => l.id >= era.from && l.id <= era.to);
          return (
            <section key={era.id} aria-labelledby={`era-${era.id}`}>
              <div className="flex items-center gap-3 border-b-2 pb-3" style={{ borderColor: era.color }}>
                <span className="size-3 rounded-full" style={{ backgroundColor: era.color }} aria-hidden="true" />
                <h2 id={`era-${era.id}`} className="font-display text-2xl font-semibold">
                  {era.name}
                </h2>
              </div>
              <ul>
                {items.map((lesson) => (
                  <li key={lesson.id} className="border-b border-line">
                    <Link
                      href={`/bai-hoc/${lesson.slug}`}
                      className="group grid gap-x-8 gap-y-1 px-2 py-5 transition-colors hover:bg-giay md:grid-cols-[10rem_minmax(0,1fr)_5.5rem] md:px-3"
                    >
                      <p className="font-display text-lg text-cham-soft">{lesson.period}</p>
                      <div>
                        <h3 className="font-display text-xl font-semibold leading-snug group-hover:underline">
                          {lesson.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 max-w-[70ch] text-[0.95rem] leading-relaxed text-cham-soft">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="md:text-right">
                        <LearnedMark id={lesson.id} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
