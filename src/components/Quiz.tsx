"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Question } from "@/lib/types";
import { shuffle } from "@/lib/shuffle";
import { ArrowRightIcon, CheckIcon, RefreshIcon, XIcon } from "./Icons";

const ROUND_SIZE = 10;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

type Miss = { q: Question; picked: string };

function verdict(score: number, total: number) {
  const ratio = score / total;
  if (ratio >= 0.9) return "Xuất sắc. Bạn nắm rất chắc lịch sử.";
  if (ratio >= 0.7) return "Khá tốt. Xem lại vài câu sai bên dưới là ổn.";
  if (ratio >= 0.5) return "Tạm ổn. Hãy đọc lại các bài liên quan rồi thử lại.";
  return "Cần ôn thêm. Đọc lại bài học rồi làm lượt mới.";
}

export default function Quiz({ questions }: { questions: Question[] }) {
  const [round, setRound] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Miss[]>([]);
  const [done, setDone] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);

  const current = round && !done ? round[index] : undefined;

  const start = () => {
    setRound(
      shuffle(questions)
        .slice(0, ROUND_SIZE)
        .map((q) => ({ ...q, options: shuffle(q.options) })),
    );
    setIndex(0);
    setPicked(null);
    setScore(0);
    setMissed([]);
    setDone(false);
  };

  const choose = useCallback(
    (option: string) => {
      if (!current || picked) return;
      setPicked(option);
      if (option === current.answer) setScore((s) => s + 1);
      else setMissed((m) => [...m, { q: current, picked: option }]);
    },
    [current, picked],
  );

  const next = () => {
    if (!round) return;
    if (index + 1 >= round.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  // Phím 1-4 chọn đáp án; sau khi chọn, đưa focus tới nút "Câu tiếp theo".
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const n = Number(e.key);
      if (n >= 1 && n <= current.options.length) choose(current.options[n - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, choose]);

  useEffect(() => {
    if (picked) nextRef.current?.focus();
  }, [picked]);

  if (!round) {
    return (
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed text-cham-soft">
          Mỗi lượt gồm {ROUND_SIZE} câu chọn ngẫu nhiên từ {questions.length} câu hỏi. Bạn sẽ biết ngay đáp án đúng sau
          mỗi câu. Có thể bấm phím 1 đến 4 để chọn nhanh.
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-cham px-6 py-3 text-sm font-semibold text-giay transition-colors hover:bg-cham/90"
        >
          Bắt đầu lượt chơi
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-2xl">
        <p className="font-display text-7xl font-semibold leading-none">
          {score}
          <span className="text-3xl text-cham-soft"> / {round.length}</span>
        </p>
        <p className="mt-4 text-lg text-cham-soft">{verdict(score, round.length)}</p>

        {missed.length > 0 ? (
          <section className="mt-10" aria-labelledby="missed-title">
            <h2 id="missed-title" className="font-display text-2xl font-semibold">
              Những câu cần xem lại
            </h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {missed.map(({ q, picked: p }) => (
                <li key={q.id} className="py-4">
                  <p className="font-medium">{q.question}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-son">
                    <XIcon className="mt-0.5 size-4 shrink-0" />
                    <span>Bạn chọn: {p}</span>
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-sm text-la">
                    <CheckIcon className="mt-0.5 size-4 shrink-0" />
                    <span>Đáp án đúng: {q.answer}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-sm bg-cham px-5 py-3 text-sm font-semibold text-giay hover:bg-cham/90"
          >
            <RefreshIcon className="size-4" />
            Chơi lượt mới
          </button>
          <Link
            href="/bai-hoc"
            className="inline-flex items-center rounded-sm border border-cham px-5 py-3 text-sm font-semibold hover:bg-cham hover:text-giay"
          >
            Quay lại bài học
          </Link>
        </div>
      </div>
    );
  }

  const q = current!;
  const isLast = index + 1 >= round.length;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between text-sm text-cham-soft">
        <p>
          Câu <span className="font-semibold text-cham">{index + 1}</span> / {round.length}
        </p>
        <p>Đúng {score}</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cham/15" aria-hidden="true">
        <div
          className="h-full bg-cham transition-[width] duration-300"
          style={{ width: `${((index + (picked ? 1 : 0)) / round.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-8 font-display text-3xl font-semibold leading-snug">{q.question}</h2>

      <ul className="mt-6 space-y-3">
        {q.options.map((option, i) => {
          const isAnswer = option === q.answer;
          const isPicked = option === picked;
          let style = "border-line bg-giay hover:border-cham";
          if (picked) {
            if (isAnswer) style = "border-la bg-la/10";
            else if (isPicked) style = "border-son bg-son/10";
            else style = "border-line bg-giay opacity-60";
          }
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => choose(option)}
                disabled={picked !== null}
                className={`flex w-full items-center gap-4 rounded-sm border-2 px-4 py-3.5 text-left transition-colors disabled:cursor-default ${style}`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-current text-sm font-semibold">
                  {picked && isAnswer ? (
                    <CheckIcon className="size-4 text-la" />
                  ) : picked && isPicked ? (
                    <XIcon className="size-4 text-son" />
                  ) : (
                    LETTERS[i]
                  )}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
        {picked ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className={`font-medium ${picked === q.answer ? "text-la" : "text-son"}`}>
              {picked === q.answer ? "Chính xác." : `Chưa đúng. Đáp án là: ${q.answer}`}
            </p>
            <button
              ref={nextRef}
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-sm bg-cham px-5 py-2.5 text-sm font-semibold text-giay hover:bg-cham/90"
            >
              {isLast ? "Xem kết quả" : "Câu tiếp theo"}
              <ArrowRightIcon className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
