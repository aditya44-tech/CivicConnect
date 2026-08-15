/**
 * Admin Login Page - Full screen authentication view for city officials.
 * Renders at the root layout.
 */
"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8 lg:p-12">
      <div className="flex w-full max-w-[1040px] min-h-[680px] overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-gray-200">
        <div 
          className="relative hidden w-[45%] overflow-hidden m-3 rounded-[1.5rem] lg:block bg-cover bg-center"
          style={{ backgroundImage: "url('/loginpage/download%20(10).jpg')" }}
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
              Admin Portal
            </p>
            <blockquote className="mt-4 text-3xl font-bold leading-[1.1] text-white tracking-tight">
              &ldquo;CivicConnect has transformed how our city manages infrastructure requests.&rdquo;
            </blockquote>
            <p className="mt-5 text-sm font-medium text-white/50">
              David Chen · City Manager, Riverside
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-white/40">
            <span>Secure Access</span>
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
            City Official Login
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Log in to manage civic issues and city workflows.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Official Email or Employee ID</span>
              <input
                type="text"
                name="email"
                placeholder="city_official@riverside.gov"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Password</span>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            
            <Link href="/admin" className="block w-full">
              <Button type="button" size="lg" className="w-full">
                Access Dashboard
              </Button>
            </Link>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Citizen user?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-dark"
            >
              Return to regular login
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
