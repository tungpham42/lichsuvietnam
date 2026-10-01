"use client";

import { useState } from "react";
import type { Quote } from "@/lib/types";
import { QuoteIcon, RefreshIcon } from "./Icons";

export default function QuoteBlock({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];

  const another = () => {
    if (quotes.length < 2) return;
    let next = index;
    while (next === index) next = Math.floor(Math.random() * quotes.length);
    setIndex(next);
  };

  return (
    <figure className="flex gap-5 border-l-4 border-son pl-5 sm:pl-8">
      <div className="min-w-0">
        <QuoteIcon className="size-7 text-son" />
        <blockquote
          key={index}
          className="mt-3 max-w-[34ch] font-display text-3xl font-medium leading-snug sm:text-4xl"
          aria-live="polite"
        >
          {quote.text}
        </blockquote>
        <figcaption className="mt-4 text-cham-soft">{quote.author}</figcaption>
        <button
          type="button"
          onClick={another}
          className="mt-6 inline-flex items-center gap-2 rounded-sm border border-cham px-4 py-2 text-sm font-semibold transition-colors hover:bg-cham hover:text-giay"
        >
          <RefreshIcon className="size-4" />
          Câu khác
        </button>
      </div>
    </figure>
  );
}
