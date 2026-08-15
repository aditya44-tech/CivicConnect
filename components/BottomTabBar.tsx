"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  FeedIcon,
  PlusIcon,
  ClipboardIcon,
  SettingsIcon,
} from "./icons";

const tabs = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/feed", label: "Feed", Icon: FeedIcon },
  { href: "/my-complaints", label: "Mine", Icon: ClipboardIcon },
  { href: "/admin", label: "Admin", Icon: SettingsIcon },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href === "/" ? "/feed" : href);

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="flex items-center justify-around rounded-3xl border border-gray-200/70 bg-white/85 px-2 py-2 shadow-xl shadow-black/5 backdrop-blur-xl">
        {tabs.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                active ? "text-primary" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
        <Link
          href="/submit"
          aria-label="Submit a complaint"
          className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/40 transition-transform active:scale-95"
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
}
