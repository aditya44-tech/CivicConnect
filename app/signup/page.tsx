/**
 * Signup Page - Full screen authentication view.
 * Renders at the root layout (bypasses the global Navbar).
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { ArrowLeftIcon, AlertCircleIcon } from "@/components/icons";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!signInRes || signInRes.error) {
        router.push("/login");
        return;
      }
      router.push("/feed");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  };

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
              <span className="text-base font-bold text-white">CivicConnect</span>
            </span>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">
              Join the community
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.1] text-white tracking-tight">
              Be the reason your street gets fixed.
            </h2>
            <p className="mt-5 text-sm font-medium text-white/50">
              Free to join. Takes under a minute. 1,200+ issues resolved so far.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-white/40">
            <span>No login required to browse</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Shirpur, Maharashtra</span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        <Link 
          href="/" 
          className="absolute left-6 top-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 sm:left-8 sm:top-8"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Link>

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
            onSubmit={submit}
          >
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Full name</span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Kim"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? "Creating account…" : "Get Started"}
            </Button>
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
    </div>
  );
}
