import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import { timelineData } from "@/data/timelines";

export const metadata: Metadata = {
  title: "Tiến trình",
  description: "Dòng thời gian lịch sử Việt Nam qua 24 giai đoạn và tiến độ học của bạn.",
};

export default function TimelinePage() {
  const items = timelineData.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    description: t.description,
    period: t.period,
    events: t.events,
    figures: t.figures,
    youtubeId: t.youtube_id,
    startTime: t.start_time,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 md:pt-16">
      <header>
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">Tiến trình</h1>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-cham-soft">
          Toàn bộ lịch sử trên một dòng thời gian. Bấm vào từng giai đoạn để xem sự kiện, nhân vật và video. Những bài bạn
          đã đánh dấu sẽ được tô đậm.
        </p>
      </header>
      <div className="mt-12">
        <Timeline items={items} />
      </div>
    </div>
  );
}
