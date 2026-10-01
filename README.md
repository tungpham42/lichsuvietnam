# Sử Việt

Website học lịch sử Việt Nam: Next.js (App Router), TypeScript, Tailwind CSS v4, biểu tượng SVG (không emoji).

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Các route

| Route | Nội dung |
| --- | --- |
| `/` | Trang chủ, trích dẫn |
| `/bai-hoc` | Mục lục 24 bài, nhóm theo giai đoạn, tiến độ đã học |
| `/bai-hoc/[slug]` | Bài học theo slug (vd. `/bai-hoc/thoi-ky-nha-ly`); `/bai-hoc/10` cũ tự chuyển hướng |
| `/bai-hoc/trac-nghiem` | Trắc nghiệm 10 câu ngẫu nhiên từ `questions.json` |
| `/cau-do` | Đoán chữ từ gợi ý (`gameWords.json`), vòng trống đồng là số lượt |
| `/tien-trinh` | Dòng thời gian từ `lessons.json` (qua `src/data/timelines.ts`) |

## Dữ liệu (`src/data`)

- `lessons.json`: thêm trường `slug` (sinh từ tiêu đề, bỏ dấu); `id` giữ lại để sắp thứ tự, nhóm giai đoạn và lưu tiến độ.
- `questions.json`: giữ nguyên.
- `gameWords.json`: thêm trường `syllables` (tách âm tiết để hiển thị ô chữ) và bỏ từ trùng `QUANGTRI`.
- `quotes.ts`, `timelines.ts`: bản TypeScript của `quotes.js`, `timelines.js`.

Tiến độ "đã học" lưu trong `localStorage` (khoá `su-viet:da-hoc`).
Font (Newsreader, Be Vietnam Pro) tải từ Google Fonts trong `src/app/layout.tsx`.

## Favicon và ảnh Open Graph

Các file nằm trong `src/app` và được Next.js tự gắn vào `<head>`:
`icon.svg`, `favicon.ico`, `apple-icon.png`, `opengraph-image.png`, `twitter-image.png` (kèm file `.alt.txt`).

Để tạo lại: `python3 scripts/generate-brand.py` (xem yêu cầu thư viện và font ở đầu file).
Đặt `NEXT_PUBLIC_SITE_URL` (xem `.env.example`) thành địa chỉ thật của website để link chia sẻ có ảnh đúng.
