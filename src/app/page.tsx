import Link from "next/link";
import BronzeDrum from "@/components/BronzeDrum";
import QuoteBlock from "@/components/QuoteBlock";
import { ArrowRightIcon, BookIcon, PuzzleIcon, TimelineIcon } from "@/components/Icons";
import quotes from "@/data/quotes";
import { gameWords, lessons, questions } from "@/lib/data";

export default function HomePage() {
  const entries = [
    {
      href: "/bai-hoc",
      Icon: BookIcon,
      title: "Bài học",
      text: "Đọc từng giai đoạn, xem video và làm bài trắc nghiệm để kiểm tra lại.",
      stat: `${lessons.length} bài, ${questions.length} câu hỏi`,
    },
    {
      href: "/cau-do",
      Icon: PuzzleIcon,
      title: "Câu đố",
      text: "Đọc gợi ý và đoán tên nhân vật, địa danh, sự kiện trước khi hết lượt.",
      stat: `${gameWords.length} từ khoá`,
    },
    {
      href: "/tien-trinh",
      Icon: TimelineIcon,
      title: "Tiến trình",
      text: "Xem toàn bộ lịch sử trên một dòng thời gian và theo dõi những bài bạn đã học.",
      stat: `${lessons.length} giai đoạn`,
    },
  ];

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Dân ta phải biết sử ta
          </h1>
          <p className="mt-3 text-sm text-cham-soft">Hồ Chí Minh</p>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-cham-soft">
            Học lịch sử Việt Nam qua {lessons.length} bài, từ thời Hùng Vương đến nay. Đọc bài, thử sức với câu đố,
            rồi xem mọi thứ nối lại trên một dòng thời gian.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={`/bai-hoc/${lessons[0].slug}`}
              className="inline-flex items-center gap-2 rounded-sm bg-cham px-5 py-3 text-sm font-semibold text-giay transition-colors hover:bg-cham/90"
            >
              Bắt đầu với bài 1
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/cau-do"
              className="inline-flex items-center gap-2 rounded-sm border border-cham px-5 py-3 text-sm font-semibold transition-colors hover:bg-cham hover:text-giay"
            >
              Chơi câu đố
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <BronzeDrum animate label="Mặt trống đồng Đông Sơn" className="w-full" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Các phần của trang">
        <ul className="border-t border-line">
          {entries.map(({ href, Icon, title, text, stat }) => (
            <li key={href} className="border-b border-line">
              <Link
                href={href}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-1 px-2 py-6 transition-colors hover:bg-giay sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:px-4"
              >
                <Icon className="size-7 text-son" />
                <div>
                  <h2 className="font-display text-2xl font-semibold">{title}</h2>
                  <p className="mt-1 max-w-[60ch] text-cham-soft">{text}</p>
                </div>
                <p className="col-start-2 text-sm font-medium text-cham-soft sm:col-start-auto">{stat}</p>
                <ArrowRightIcon className="hidden size-5 text-cham-soft transition-transform group-hover:translate-x-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-label="Lời của người đi trước">
        <QuoteBlock quotes={quotes} />
      </section>
    </>
  );
}
