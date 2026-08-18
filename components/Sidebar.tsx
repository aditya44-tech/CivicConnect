"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { BarChartIcon, FileTextIcon, LogOutIcon, SettingsIcon } from "./icons";

const nav = [
  { href: "/admin", label: "Dashboard", Icon: SettingsIcon, exact: true },
  { href: "/admin/complaints", label: "Complaints", Icon: FileTextIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-gray-100 bg-white/95 backdrop-blur-sm lg:flex">
      <div className="px-5 pb-5 pt-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <p className="px-5 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        Admin Console
      </p>

      <nav className="flex flex-col gap-0.5 px-3">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <item.Icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary-dark">
            AK
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              Alex Kim
            </p>
            <p className="truncate text-xs text-gray-400">City Administrator</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
