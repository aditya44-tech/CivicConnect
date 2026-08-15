"use client";

import Link from "next/link";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <h1 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Start reporting issues in your neighborhood today.
        </p>

        <form
          className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">
              Full name
            </span>
            <input
              type="text"
              name="name"
              placeholder="Alex Kim"
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-gray-700">
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <Button type="submit" size="lg" className="mt-6 w-full">
            Get Started
          </Button>
          <p className="mt-4 text-center text-xs text-gray-400">
            Demo UI only — no account is actually created.
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
  );
}
