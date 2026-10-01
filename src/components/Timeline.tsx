"use client";

import Link from "next/link";
import { useState } from "react";
import { eraOf, eras } from "@/lib/eras";
import { useLearned } from "@/lib/learned";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon, FlagIcon, UsersIcon } from "./Icons";
import YouTubeEmbed from "./YouTubeEmbed";

export type TimelineItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  period: string;
  events: string[];
  figures: { name: string; role: string }[];
  youtubeId: string | null;
  startTime: number;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const { learned } = useLearned();

  const toggle = (id: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOpen = open.size === items.length;
  const learnedCount = items.filter((i) => learned.has(i.id)).length;

  return (
    <div>
      {/* Thanh tiến độ: mỗi đoạn là một bài, đậm màu nếu đã học */}
      <section aria-labelledby="ruler-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="ruler-title" className="font-display text-2xl font-semibold">
            Bạn đã đi được {learnedCount} / {items.length} chặng
          </h2>
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
            className="rounded-sm border border-cham px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-cham hover:text-giay"
          >
            {allOpen ? "Thu gọn tất cả" : "Mở tất cả"}
          </button>
        </div>
        <ol className="mt-4 flex gap-1">
          {items.map((item) => {
            const done = learned.has(item.id);
            return (
              <li key={item.id} className="flex-1">
                <a
                  href={`#bai-${item.id}`}
                  title={`${item.title}${done ? " (đã học)" : ""}`}
                  className="block h-4 rounded-[2px] transition-opacity hover:opacity-100"
                  style={{ backgroundColor: eraOf(item.id).color, opacity: done ? 1 : 0.28 }}
                >
                  <span className="sr-only">
                    {item.title}
                    {done ? ", đã học" : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cham-soft">
          {eras.map((era) => (
            <li key={era.id} className="flex items-center gap-2">
              <span className="size-3 rounded-full" style={{ backgroundColor: era.color }} aria-hidden="true" />
              {era.name}
            </li>
          ))}
        </ul>
      </section>

      <ol className="mt-14">
        {items.map((item, index) => {
          const era = eraOf(item.id);
          const startsEra = item.id === era.from;
          const isLast = index === items.length - 1;
          const isOpen = open.has(item.id);
          const done = learned.has(item.id);

          return (
            <li key={item.id} id={`bai-${item.id}`} className="scroll-mt-24">
              {startsEra ? (
                <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] md:grid-cols-[10rem_2.5rem_minmax(0,1fr)]">
                  <div className="hidden md:block" />
                  <div className="relative">
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
                  </div>
                  <h2
                    className="mb-2 mt-10 border-b-2 pb-2 font-display text-2xl font-semibold first:mt-0"
                    style={{ borderColor: era.color }}
                  >
                    {era.name}
                  </h2>
                </div>
              ) : null}

              <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] md:grid-cols-[10rem_2.5rem_minmax(0,1fr)]">
                <p className="hidden pr-2 pt-[1.1rem] text-right font-display text-base leading-snug text-cham-soft md:block">
                  {item.period}
                </p>

                <div className="relative">
                  <span
                    className={`absolute left-1/2 top-0 w-px -translate-x-1/2 bg-line ${isLast ? "h-6" : "bottom-0"}`}
                  />
                  <span
                    className="absolute left-1/2 top-[1.1rem] flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2"
                    style={{ borderColor: era.color, backgroundColor: done ? era.color : "var(--color-dieu)" }}
                  >
                    {done ? <CheckIcon className="size-3 text-giay" strokeWidth={3} /> : null}
                  </span>
                </div>

                <div className="pb-2">
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${item.id}`}
                    className="w-full rounded-sm px-3 py-3 text-left transition-colors hover:bg-giay"
                  >
                    <span className="block text-sm text-cham-soft md:hidden">{item.period}</span>
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-xl font-semibold leading-snug">{item.title}</span>
                      <ChevronDownIcon
                        className={`mt-1 size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                    <span
                      className={`mt-1 block max-w-[70ch] text-[0.95rem] leading-relaxed text-cham-soft ${
                        isOpen ? "" : "line-clamp-2"
                      }`}
                    >
                      {item.description}
                    </span>
                  </button>

                  {isOpen ? (
                    <div id={`panel-${item.id}`} className="space-y-6 px-3 pb-6 pt-3">
                      {item.events.length > 0 ? (
                        <div>
                          <h3 className="flex items-center gap-2 font-semibold">
                            <FlagIcon className="size-4 text-son" />
                            Sự kiện chính
                          </h3>
                          <ul className="mt-2 space-y-1.5 pl-6 text-[0.95rem] leading-relaxed">
                            {item.events.map((e) => (
                              <li key={e} className="list-disc marker:text-son">
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {item.figures.length > 0 ? (
                        <div>
                          <h3 className="flex items-center gap-2 font-semibold">
                            <UsersIcon className="size-4 text-son" />
                            Nhân vật
                          </h3>
                          <dl className="mt-2 grid gap-x-8 gap-y-2 pl-6 text-[0.95rem] sm:grid-cols-2">
                            {item.figures.map((f) => (
                              <div key={f.name}>
                                <dt className="font-medium">{f.name}</dt>
                                <dd className="text-cham-soft">{f.role}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ) : null}

                      {item.youtubeId ? (
                        <div className="max-w-xl">
                          <YouTubeEmbed id={item.youtubeId} start={item.startTime} title={item.title} />
                        </div>
                      ) : null}

                      <Link
                        href={`/bai-hoc/${item.slug}`}
                        className="inline-flex items-center gap-2 rounded-sm bg-cham px-4 py-2.5 text-sm font-semibold text-giay hover:bg-cham/90"
                      >
                        Đọc bài đầy đủ
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
