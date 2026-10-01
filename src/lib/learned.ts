"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "su-viet:da-hoc";
const EVENT = "su-viet:da-hoc-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

/** Danh sách bài đã học, lưu trong localStorage của trình duyệt. */
export function useLearned() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const learned = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(raw);
      return new Set(
        Array.isArray(parsed)
          ? parsed.filter((n): n is number => typeof n === "number")
          : [],
      );
    } catch {
      return new Set<number>();
    }
  }, [raw]);

  const toggle = useCallback(
    (id: number) => {
      const next = new Set(learned);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(KEY, JSON.stringify([...next].sort((a, b) => a - b)));
      } catch {
        /* localStorage không khả dụng: bỏ qua */
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [learned],
  );

  return { learned, toggle };
}
