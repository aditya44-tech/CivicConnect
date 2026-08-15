"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { BarChartIcon, FileTextIcon, LogOutIcon, SettingsIcon } from "./icons";

const nav = [
  { href: "/admin", label: "Dashboard", Icon: SettingsIcon, exact: true },
  { href: "/admin/complaints", label: "Complaints", Icon: FileTextIcon },
  { href: "/admin/analytics", label: "Analytics", Icon: BarChartIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-gray-200/60 bg-white/70 backdrop-blur-xl lg:flex">
      <div className="px-6 pb-6 pt-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <p className="px-6 pb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
        Admin Console
      </p>

      <nav className="flex flex-col gap-1 px-3">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-primary-soft text-primary-dark"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-orange to-accent-red text-sm font-bold text-white">
            AK
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              Alex Kim
            </p>
            <p className="truncate text-xs text-gray-500">City Administrator</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
