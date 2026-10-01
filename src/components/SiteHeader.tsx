import Link from "next/link";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-giay/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-sm text-cham">
          <Logo className="size-8" />
          <span className="font-display text-2xl font-semibold tracking-tight">Sử Việt</span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
