/**
 * Admin Layout - Wraps all pages under the /admin route.
 * Injects the admin Sidebar and handles mobile navigation.
 */
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";

const mobileNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/complaints", label: "Complaints" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-canvas lg:pl-64">
      <Sidebar />

      <div className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/70 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2 px-4 py-3">
          <Logo size="sm" />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3">
          {mobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
