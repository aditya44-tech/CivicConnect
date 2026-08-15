/**
 * Signup Page - Full screen authentication view.
 * Renders at the root layout (bypasses the global Navbar).
 */
"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <div 
        className="relative hidden w-2/5 overflow-hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth-bg.png')" }}
      >
        {/* Subtle overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col justify-between px-10 py-12">
          <Link href="/">
            <span className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-primary text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                  <path d="M9 22v-4h6v4" />
                  <path d="M8 6h.01" />
                  <path d="M16 6h.01" />
                  <path d="M12 6h.01" />
                  <path d="M12 10h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 10h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 10h.01" />
                  <path d="M8 14h.01" />
                </svg>
              </span>
              <span className="text-base font-bold text-white">CivicConnect</span>
            </span>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">
              Join the community
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white tracking-tight">
              Be the reason your street gets fixed.
            </h2>
            <p className="mt-5 text-sm font-medium text-white/50">
              Free to join. Takes under a minute. 1,200+ issues resolved so far.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-white/40">
            <span>No login required to browse</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Riverside, CA</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex justify-center lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <h1 className="mt-8 text-2xl font-black tracking-tight text-gray-900 lg:mt-0">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Start reporting issues in your neighborhood today.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Full name</span>
              <input
                type="text"
                name="name"
                placeholder="Alex Kim"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <Button type="submit" size="lg" className="w-full">
              Get Started
            </Button>
            <p className="text-center text-xs text-gray-400">
              Demo only — no account is actually created.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-dark"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
