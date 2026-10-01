import { lessons } from "@/lib/data";

export const timelineData = lessons.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  description: item.description,
  period: item.period,
  events: item.events,
  figures: item.important_figures,
  youtube_id: item.youtube_id || null, // YouTube ID for video support
  start_time: item.start_time ?? 0,
}));
