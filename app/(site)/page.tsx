import Link from "next/link";
import Button from "@/components/Button";
import ComplaintCard from "@/components/ComplaintCard";
import { FlagIcon, SearchIcon, CheckCircleIcon, MapPinIcon } from "@/components/icons";
import { complaints } from "@/lib/data";

const steps = [
  {
    Icon: FlagIcon,
    title: "Report",
    body: "Snap a photo and describe the issue in under a minute. No forms, no phone calls.",
  },
  {
    Icon: SearchIcon,
    title: "Track",
    body: "Follow your report through Pending, In Progress, and Resolved — transparently.",
  },
  {
    Icon: CheckCircleIcon,
    title: "Resolve",
    body: "See your neighborhood get better, and get notified the moment it's done.",
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent-orange/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-resolved" />
              Serving Riverside since 2024
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl">
              Report it.
              <br />
              Track it.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">
                Get it fixed.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-500">
              CivicConnect is the simplest way to report what's broken in your
              city and watch it get resolved — no phone calls, no chasing
              departments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="secondary">
                <Link href="/feed">Explore the feed</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <MapPinIcon className="h-4 w-4" />
              1,200+ issues resolved this year
            </p>
          </div>

          {/* Hero preview: stacked complaint cards */}
          <div className="relative hidden lg:block">
            <div className="rotate-[-3deg] opacity-80">
              <ComplaintCard complaint={complaints[3]} />
            </div>
            <div className="absolute -left-10 top-16 w-72 rotate-[4deg] opacity-95">
              <ComplaintCard complaint={complaints[0]} />
            </div>
            <div className="absolute -bottom-10 right-4 w-80 rotate-[2deg]">
              <ComplaintCard complaint={complaints[6]} />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            How it works
          </h2>
          <p className="mt-3 text-gray-500">
            Three steps between noticing a problem and seeing it fixed.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200/70"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-dark">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-bold text-gray-300">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-2 leading-relaxed text-gray-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-primary-dark px-8 py-14 text-center shadow-xl shadow-primary/25 sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See something that needs fixing?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/80">
            Join your neighbors on CivicConnect and turn complaints into
            completed work orders.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Button
              size="lg"
              className="bg-white !text-primary-dark shadow-lg hover:bg-gray-50"
            >
              <Link href="/signup">Create your free account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2026 CivicConnect. Built for better neighborhoods.
          </p>
          <div className="flex gap-6 text-sm font-medium text-gray-500">
            <Link href="/feed" className="hover:text-gray-900">
              Feed
            </Link>
            <Link href="/login" className="hover:text-gray-900">
              Log in
            </Link>
            <Link href="/admin" className="hover:text-gray-900">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
