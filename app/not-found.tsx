import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { MapPinIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-hairline bg-canvas/95">
        <div className="mx-auto flex h-15 max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-3.5 py-1.5 text-xs font-semibold text-surface-dark">
            <MapPinIcon className="h-3.5 w-3.5" />
            Off the map
          </div>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Error 404
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-tight text-gray-900 sm:text-7xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-gray-500">
            The address you&apos;re looking for was moved, demolished, or never
            built. Let&apos;s get you back to streets that work.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button size="lg" variant="secondary">
              <Link href="/feed">Browse the feed</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-hairline bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-center text-sm text-gray-400">
            © 2026 CivicConnect · Built for better neighborhoods.
          </p>
        </div>
      </footer>
    </div>
  );
}
