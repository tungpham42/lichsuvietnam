"use client";

import { useLearned } from "@/lib/learned";
import { CheckIcon } from "./Icons";

export default function LearnedMark({ id }: { id: number }) {
  const { learned } = useLearned();
  if (!learned.has(id)) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-la">
      <CheckIcon className="size-4" />
      Đã học
    </span>
  );
}
