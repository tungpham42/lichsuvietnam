"use client";

import { useLearned } from "@/lib/learned";
import { CheckIcon } from "./Icons";

export default function MarkLearned({ id }: { id: number }) {
  const { learned, toggle } = useLearned();
  const done = learned.has(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={done}
      className={`inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-semibold transition-colors ${
        done
          ? "border-la bg-la text-giay hover:bg-la/90"
          : "border-cham bg-transparent text-cham hover:bg-cham hover:text-giay"
      }`}
    >
      <CheckIcon className="size-4" />
      {done ? "Đã học xong" : "Đánh dấu đã học"}
    </button>
  );
}
