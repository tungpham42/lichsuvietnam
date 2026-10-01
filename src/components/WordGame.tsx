"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GameWord } from "@/lib/types";
import { shuffle } from "@/lib/shuffle";
import BronzeDrum, { DRUM_RINGS } from "./BronzeDrum";
import { ArrowRightIcon, CheckIcon, LightbulbIcon } from "./Icons";

const MAX_WRONG = DRUM_RINGS;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function WordGame({ words }: { words: GameWord[] }) {
  const [order, setOrder] = useState<number[] | null>(null);
  const [pos, setPos] = useState(0);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [hints, setHints] = useState(0);
  const [solved, setSolved] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Xáo thứ tự từ ở phía client để tránh lệch giữa server và client.
  useEffect(() => {
    setOrder(shuffle(words.map((_, i) => i)));
  }, [words]);

  const entry = order ? words[order[pos]] : null;
  const letters = useMemo(() => new Set(entry ? entry.word.split("") : []), [entry]);

  const wrong = guessed.filter((l) => !letters.has(l)).length + hints;
  const won = entry !== null && [...letters].every((l) => guessed.includes(l));
  const lost = !won && wrong >= MAX_WRONG;
  const over = won || lost;

  const settle = useCallback(
    (nextGuessed: string[], nextHints: number) => {
      if (!entry) return;
      const nextWrong = nextGuessed.filter((l) => !letters.has(l)).length + nextHints;
      const nextWon = [...letters].every((l) => nextGuessed.includes(l));
      setGuessed(nextGuessed);
      setHints(nextHints);
      if (nextWon) {
        setSolved((s) => s + 1);
        setStreak(streak + 1);
        setBest(Math.max(best, streak + 1));
      } else if (nextWrong >= MAX_WRONG) {
        setStreak(0);
      }
    },
    [entry, letters, streak, best],
  );

  const guess = useCallback(
    (letter: string) => {
      if (!entry || over || guessed.includes(letter)) return;
      settle([...guessed, letter], hints);
    },
    [entry, over, guessed, hints, settle],
  );

  const useHint = () => {
    if (!entry || over || wrong >= MAX_WRONG - 1) return;
    const hidden = [...letters].filter((l) => !guessed.includes(l));
    if (hidden.length === 0) return;
    const pick = hidden[Math.floor(Math.random() * hidden.length)];
    settle([...guessed, pick], hints + 1);
  };

  const nextWord = () => {
    if (!order) return;
    if (pos + 1 >= order.length) {
      setOrder(shuffle(words.map((_, i) => i)));
      setPos(0);
    } else {
      setPos((p) => p + 1);
    }
    setGuessed([]);
    setHints(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[a-z]$/i.test(e.key)) guess(e.key.toUpperCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guess]);

  useEffect(() => {
    if (over) nextRef.current?.focus();
  }, [over]);

  if (!entry || !order) {
    return <p className="text-cham-soft">Đang chuẩn bị câu đố...</p>;
  }

  const livesLeft = Math.max(0, MAX_WRONG - wrong);

  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
      <div className="mx-auto w-full max-w-[17rem] lg:mx-0">
        <BronzeDrum lit={livesLeft} className="w-full" label={`Còn ${livesLeft} lượt`} />
        <p className="mt-3 text-center text-sm text-cham-soft" aria-live="polite">
          Còn <span className="font-semibold text-cham">{livesLeft}</span> / {MAX_WRONG} lượt
        </p>
        <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line text-center">
          <div className="py-3">
            <dd className="font-display text-2xl font-semibold">{solved}</dd>
            <dt className="text-xs text-cham-soft">Đã đoán đúng</dt>
          </div>
          <div className="py-3">
            <dd className="font-display text-2xl font-semibold">{streak}</dd>
            <dt className="text-xs text-cham-soft">Chuỗi đúng</dt>
          </div>
          <div className="py-3">
            <dd className="font-display text-2xl font-semibold">{best}</dd>
            <dt className="text-xs text-cham-soft">Kỷ lục</dt>
          </div>
        </dl>
      </div>

      <div className="min-w-0">
        <p className="text-sm text-cham-soft">
          Từ {pos + 1} / {order.length}
        </p>
        <h2 className="mt-2 max-w-[48ch] font-display text-3xl font-semibold leading-snug sm:text-4xl">
          {entry.clue}
        </h2>

        <div
          className="mt-8 flex flex-wrap gap-x-6 gap-y-4"
          role="group"
          aria-label={`Đáp án có ${entry.word.length} chữ cái`}
        >
          {entry.syllables.map((syllable, si) => (
            <div key={si} className="flex gap-1.5">
              {syllable.split("").map((ch, ci) => {
                const shown = guessed.includes(ch);
                const reveal = lost && !shown;
                return (
                  <span
                    key={ci}
                    className={`flex h-11 w-8 items-center justify-center border-b-[3px] font-display text-2xl font-semibold sm:h-14 sm:w-10 sm:text-3xl ${
                      shown ? "border-cham" : reveal ? "border-son text-son" : "border-cham/40"
                    }`}
                  >
                    {shown || reveal ? ch : ""}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
          {won ? (
            <p className="flex items-center gap-2 font-medium text-la">
              <CheckIcon className="size-5" />
              Chính xác.
            </p>
          ) : null}
          {lost ? (
            <p className="font-medium text-son">Hết lượt. Đáp án là {entry.syllables.join(" ")}.</p>
          ) : null}
        </div>

        {over ? (
          <button
            ref={nextRef}
            type="button"
            onClick={nextWord}
            className="inline-flex items-center gap-2 rounded-sm bg-cham px-5 py-3 text-sm font-semibold text-giay hover:bg-cham/90"
          >
            Từ tiếp theo
            <ArrowRightIcon className="size-4" />
          </button>
        ) : (
          <div>
            <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-9 sm:gap-2" role="group" aria-label="Bàn phím chữ cái">
              {LETTERS.map((letter) => {
                const used = guessed.includes(letter);
                const hit = used && letters.has(letter);
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => guess(letter)}
                    disabled={used}
                    aria-label={used ? `${letter}, ${hit ? "có trong đáp án" : "không có trong đáp án"}` : letter}
                    className={`h-11 rounded-sm border text-base font-semibold transition-colors ${
                      hit
                        ? "border-la bg-la text-giay"
                        : used
                          ? "border-line bg-transparent text-cham/30 line-through"
                          : "border-cham/40 bg-giay hover:border-cham hover:bg-cham hover:text-giay"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={useHint}
              disabled={wrong >= MAX_WRONG - 1}
              className="mt-5 inline-flex items-center gap-2 rounded-sm border border-cham px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-cham hover:text-giay disabled:cursor-not-allowed disabled:border-line disabled:text-cham/40 disabled:hover:bg-transparent disabled:hover:text-cham/40"
            >
              <LightbulbIcon className="size-4" />
              Mở một chữ (mất 1 lượt)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
