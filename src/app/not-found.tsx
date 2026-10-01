import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Không tìm thấy trang này</h1>
      <p className="mt-4 text-cham-soft">Địa chỉ có thể đã sai hoặc bài học không tồn tại.</p>
      <Link
        href="/bai-hoc"
        className="mt-8 inline-flex rounded-sm bg-cham px-5 py-3 text-sm font-semibold text-giay hover:bg-cham/90"
      >
        Về danh sách bài học
      </Link>
    </div>
  );
}
