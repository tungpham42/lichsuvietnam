import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-cham-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Sử Việt: học lịch sử Việt Nam qua bài học, câu đố và dòng thời gian.</p>
        <div className="flex items-center gap-5">
          <Link href="/bai-hoc" className="hover:text-cham">Bài học</Link>
          <Link href="/cau-do" className="hover:text-cham">Câu đố</Link>
          <Link href="/tien-trinh" className="hover:text-cham">Tiến trình</Link>
        </div>
      </div>
    </footer>
  );
}
