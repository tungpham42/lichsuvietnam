"use client";

import { useLearned } from "@/lib/learned";

export default function ProgressSummary({ total }: { total: number }) {
  const { learned } = useLearned();
  const count = [...learned].filter((id) => id >= 1 && id <= total).length;
  const pct = Math.round((count / total) * 100);
  return (
    <div className="w-full max-w-xs">
      <p className="text-sm text-cham-soft">
        Đã học <span className="font-semibold text-cham">{count}</span> / {total} bài
      </p>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-cham/15"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
        aria-label="Tiến độ học"
      >
        <div className="h-full rounded-full bg-la transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
