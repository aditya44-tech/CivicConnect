/**
 * Landing Page - Root entry point for the application.
 * Displays the main hero section, feature breakdown, and call to action.
 * Renders inside the (site) layout with the global Navbar.
 */
import Link from "next/link";
import Button from "@/components/Button";
import ComplaintCard from "@/components/ComplaintCard";
import { FlagIcon, SearchIcon, CheckCircleIcon, MapPinIcon } from "@/components/icons";
import { complaints } from "@/lib/data";

const steps = [
  {
    number: "01",
    Icon: FlagIcon,
    title: "Report",
    body: "Snap a photo and describe the issue in under a minute. No forms, no phone calls.",
  },
  {
    number: "02",
    Icon: SearchIcon,
    title: "Track",
    body: "Follow your report through Pending, Ongoing, and Resolved — transparently.",
  },
  {
    number: "03",
    Icon: CheckCircleIcon,
    title: "Resolve",
    body: "See your neighborhood get better, and get notified the moment it's done.",
  },
];

const stats = [
  { value: "1,200+", label: "issues resolved" },
  { value: "3.8d", label: "avg. resolution" },
  { value: "10", label: "complaints tracked" },
];

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-2 lg:pt-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-3.5 py-1.5 text-xs font-semibold text-surface-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-surface-dark" />
            Now serving Shirpur, Maharashtra
          </div>
          <h1 className="mt-6 text-hero text-gray-900 sm:text-[clamp(3rem,7.5vw,6rem)]">
            Report it.<br />
            Track it.<br />
            <span className="text-primary">Get it fixed.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-500">
            CivicConnect is the simplest way to report what&apos;s broken in your
            city and watch it get resolved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="glow-primary text-white bg-primary">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="secondary" className="border-hairline bg-surface-card text-primary hover:bg-surface-soft">
              <Link href="/feed">See public feed</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-hairline pt-7">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-black tracking-tight text-gray-900">{s.value}</p>
                <p className="text-xs font-medium text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:flex lg:items-center lg:justify-center">
          <div className="w-full max-w-sm">
            <div className="overflow-hidden rounded-2xl bg-surface-soft shadow-[0_20px_60px_rgba(0,0,0,0.10)] ring-1 ring-hairline">
              <div className="flex items-center gap-1.5 bg-surface-card px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
                <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
                <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
                <span className="mx-auto rounded-md bg-canvas/70 px-16 py-1 text-[10px] font-medium text-gray-400">
                  civicconnect.app/complaints
                </span>
              </div>
              <div className="bg-canvas p-3">
                <ComplaintCard complaint={complaints[0]} />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-8 w-56 overflow-hidden rounded-2xl bg-surface-card shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-hairline">
              <div className="bg-canvas p-2.5">
                <ComplaintCard complaint={complaints[3]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Three steps.<br />One resolved issue.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ number, Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl bg-surface-card p-7 shadow-[0_1px_4px_rgba(0,0,0,0.05)] ring-1 ring-hairline"
            >
              <span className="absolute right-5 top-4 text-7xl font-black leading-none text-surface-soft select-none">
                {number}
              </span>
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-surface-dark px-8 py-16 sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white opacity-[0.03] blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Shirpur, Maharashtra
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Something broken?<br />
              <span className="text-white/50">It takes 60 seconds.</span>
            </h2>
            <div className="grid gap-8 sm:grid-cols-3 mt-12">
            {[
              {
                title: "1. Snap a photo",
                desc: "See a pothole, graffiti, or broken streetlight? Take a quick picture with your phone.",
              },
              {
                title: "2. Pin the location",
                desc: "Our map automatically tags the exact coordinates so crews know where to go.",
              },
              {
                title: "3. Track progress",
                desc: "Get real-time updates as your report moves from pending to resolved.",
              },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h4 className="font-bold text-white">{step.title}</h4>
                <p className="mt-2 text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="glow-primary bg-white !text-surface-dark hover:bg-surface-soft"
              >
                <Link href="/signup">Create your free account</Link>
              </Button>
              <Button size="lg" variant="ghost" className="!text-white/60 hover:!text-white hover:!bg-white/10">
                <Link href="/feed">Browse the feed</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline bg-canvas">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 rounded-lg bg-surface-dark flex items-center justify-center">
              <MapPinIcon className="h-3.5 w-3.5 text-canvas" />
            </span>
            <p className="text-sm text-gray-400">
              © 2026 CivicConnect · Built for better neighborhoods.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <Link href="/feed" className="hover:text-gray-900 transition-colors">
              Feed
            </Link>
            <Link href="/login" className="hover:text-gray-900 transition-colors">
              Log in
            </Link>
            <Link href="/admin" className="hover:text-gray-900 transition-colors">
              Admin
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
