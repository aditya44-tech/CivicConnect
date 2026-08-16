"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Logo from "./Logo";
import Button from "./Button";
import type { SessionUser } from "@/lib/auth";

const links = [
  { href: "/feed", label: "Feed" },
  { href: "/submit", label: "Submit" },
  { href: "/my-complaints", label: "My Complaints" },
  { href: "/admin", label: "Admin" },
];

function firstName(name?: string | null) {
  return name?.split(" ")[0] ?? "there";
}

export default function Navbar({ user }: { user?: SessionUser | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-surface-soft"
                    : "text-gray-500 hover:bg-surface-soft hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="text-sm font-semibold text-gray-700">
                Hi, {firstName(user.name)}
                {user.role === "ADMIN" && (
                  <span className="ml-1.5 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark">
                    Admin
                  </span>
                )}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm">
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
