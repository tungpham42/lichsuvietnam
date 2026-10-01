import type { Metadata } from "next";
import WordGame from "@/components/WordGame";
import { gameWords } from "@/lib/data";

export const metadata: Metadata = {
  title: "Câu đố",
  description: "Đọc gợi ý và đoán tên nhân vật, địa danh, sự kiện trong lịch sử và địa lý Việt Nam.",
};

export default function PuzzlePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 md:pt-16">
      <header>
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">Câu đố</h1>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-cham-soft">
          Đọc gợi ý rồi đoán từng chữ cái. Mỗi chữ sai làm tắt một vòng trên mặt trống đồng. Tắt hết sáu vòng là thua.
          Bạn có thể gõ chữ trực tiếp từ bàn phím.
        </p>
      </header>
      <div className="mt-12">
        <WordGame words={gameWords} />
      </div>
    </div>
  );
}
