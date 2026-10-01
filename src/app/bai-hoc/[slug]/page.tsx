import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import MarkLearned from "@/components/MarkLearned";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { ArrowLeftIcon, ArrowRightIcon, FlagIcon, UsersIcon } from "@/components/Icons";
import { getLesson, getLessonById, lessons } from "@/lib/data";
import { eraOf } from "@/lib/eras";
import { prepareLesson } from "@/lib/lesson-html";

type Params = { slug: string };

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.description };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) {
    // Liên kết cũ dạng số (/bai-hoc/3) chuyển sang địa chỉ theo slug.
    const legacy = /^\d+$/.test(slug) ? getLessonById(Number(slug)) : undefined;
    if (legacy) redirect(`/bai-hoc/${legacy.slug}`);
    notFound();
  }

  const era = eraOf(lesson.id);
  const { body, toc } = prepareLesson(lesson.content);
  const prev = getLessonById(lesson.id - 1);
  const next = getLessonById(lesson.id + 1);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
      <nav aria-label="Vị trí" className="text-sm text-cham-soft">
        <Link href="/bai-hoc" className="hover:text-cham hover:underline">
          Bài học
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span>{era.name}</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        <p className="flex items-center gap-2.5 font-display text-xl text-cham-soft">
          <span className="size-3 rounded-full" style={{ backgroundColor: era.color }} aria-hidden="true" />
          {lesson.period}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {lesson.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-cham-soft">{lesson.description}</p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <article>
          {lesson.youtube_id ? (
            <div className="mb-10 max-w-3xl">
              <YouTubeEmbed id={lesson.youtube_id} start={lesson.start_time ?? 0} title={lesson.title} />
            </div>
          ) : null}

          <div className="lesson-body" dangerouslySetInnerHTML={{ __html: body }} />

          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <MarkLearned id={lesson.id} />
            <Link
              href="/bai-hoc/trac-nghiem"
              className="text-sm font-semibold underline underline-offset-4 hover:text-son"
            >
              Làm bài trắc nghiệm
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/bai-hoc/${prev.slug}`}
                className="group flex items-center gap-3 rounded-sm border border-line bg-giay p-4 transition-colors hover:border-cham"
              >
                <ArrowLeftIcon className="size-5 shrink-0 transition-transform group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-sm text-cham-soft">Bài trước</span>
                  <span className="block truncate font-display text-lg font-semibold">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/bai-hoc/${next.slug}`}
                className="group flex items-center justify-between gap-3 rounded-sm border border-line bg-giay p-4 text-right transition-colors hover:border-cham"
              >
                <span className="min-w-0">
                  <span className="block text-sm text-cham-soft">Bài tiếp theo</span>
                  <span className="block truncate font-display text-lg font-semibold">{next.title}</span>
                </span>
                <ArrowRightIcon className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : null}
          </div>
        </article>

        <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
          {toc.length > 0 ? (
            <section aria-labelledby="toc-title">
              <h2 id="toc-title" className="font-display text-xl font-semibold">Trong bài này</h2>
              <ol className="mt-3 space-y-2 border-l border-line pl-4 text-[0.95rem]">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-cham-soft hover:text-son hover:underline">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {lesson.events.length > 0 ? (
            <section aria-labelledby="events-title">
              <h2 id="events-title" className="flex items-center gap-2 font-display text-xl font-semibold">
                <FlagIcon className="size-5 text-son" />
                Sự kiện chính
              </h2>
              <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed">
                {lesson.events.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {lesson.important_figures.length > 0 ? (
            <section aria-labelledby="figures-title">
              <h2 id="figures-title" className="flex items-center gap-2 font-display text-xl font-semibold">
                <UsersIcon className="size-5 text-son" />
                Nhân vật
              </h2>
              <dl className="mt-3 space-y-3 text-[0.95rem] leading-relaxed">
                {lesson.important_figures.map((f) => (
                  <div key={f.name}>
                    <dt className="font-semibold">{f.name}</dt>
                    <dd className="text-cham-soft">{f.role}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
