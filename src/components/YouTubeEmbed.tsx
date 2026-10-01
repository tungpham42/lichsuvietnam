"use client";

import { useState } from "react";
import { PlayIcon } from "./Icons";

type Props = { id: string; start?: number; title: string };

// Chỉ tải iframe YouTube khi người dùng bấm xem, để trang tải nhanh.
export default function YouTubeEmbed({ id, start = 0, title }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full rounded-sm border-0"
        src={`https://www.youtube-nocookie.com/embed/${id}?start=${start}&autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative flex aspect-video w-full items-center justify-center rounded-sm bg-cham text-giay"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-hoe text-cham transition-transform group-hover:scale-105">
        <PlayIcon className="size-6 translate-x-0.5" />
      </span>
      <span className="absolute bottom-3 left-4 right-4 truncate text-left text-sm">Xem video: {title}</span>
    </button>
  );
}
