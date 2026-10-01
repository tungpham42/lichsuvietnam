"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookIcon, PuzzleIcon, TimelineIcon } from "./Icons";

const links = [
  { href: "/bai-hoc", label: "Bài học", Icon: BookIcon },
  { href: "/cau-do", label: "Câu đố", Icon: PuzzleIcon },
  { href: "/tien-trinh", label: "Tiến trình", Icon: TimelineIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Chính" className="flex items-center gap-0.5 sm:gap-1">
      {links.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-sm px-2.5 py-2 text-sm font-medium transition-colors sm:px-3 ${
              active ? "bg-cham text-giay" : "text-cham hover:bg-cham/10"
            }`}
          >
            <Icon className="hidden size-[18px] sm:block" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
