import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Đặt NEXT_PUBLIC_SITE_URL (vd. https://tenmiencuaban.vn) để ảnh Open Graph có địa chỉ tuyệt đối.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Sử Việt: học lịch sử Việt Nam", template: "%s | Sử Việt" },
  description:
    "Học lịch sử Việt Nam từ thời Hùng Vương đến nay qua 24 bài học, trắc nghiệm, câu đố chữ và dòng thời gian.",
  openGraph: { type: "website", siteName: "Sử Việt", locale: "vi_VN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&display=swap"
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-dieu font-sans text-cham antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
