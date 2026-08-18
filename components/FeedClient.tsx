"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ComplaintCard from "@/components/ComplaintCard";
import { SearchIcon, XIcon } from "@/components/icons";
import { CATEGORIES, type Complaint, type Status } from "@/lib/data";
import Button from "@/components/Button";

const statuses: (Status | "All")[] = ["All", "Pending", "Ongoing", "Resolved"];

export default function FeedClient({
  initialComplaints,
}: {
  initialComplaints: Complaint[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<Status | "All">("All");



  const counts = useMemo(() => {
    const c: Record<Status, number> = { Pending: 0, "Ongoing": 0, Resolved: 0 };
    for (const complaint of initialComplaints) c[complaint.status] += 1;
    return c;
  }, [initialComplaints]);
  const resolved = counts.Resolved;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialComplaints.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (status !== "All" && c.status !== status) return false;
      if (q && !`${c.title} ${c.address} ${c.category}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [initialComplaints, query, category, status]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:pb-12">



      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Community Feed
          </h1>
          <p className="mt-2 text-base text-gray-500">
            See what issues have been reported in your neighborhood and track their resolution progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-primary text-surface-soft">
            <Link href="/submit">+ New Report</Link>
          </Button>
        </div>
      </div>

      <div className="relative mt-6 max-w-xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword or address…"
          className="w-full rounded-2xl border border-hairline bg-surface-card py-3 pl-11 pr-10 text-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              category === cat
                ? "bg-primary text-surface-soft"
                : "border border-hairline bg-surface-card text-gray-600 hover:bg-surface-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              status === s
                ? "bg-primary text-surface-soft"
                : "border border-hairline bg-surface-card text-gray-600 hover:bg-surface-soft"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {filtered.length} {filtered.length === 1 ? "complaint" : "complaints"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-hairline bg-surface-card p-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-soft ring-1 ring-hairline">
            <SearchIcon className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-base font-bold text-gray-900">
            No complaints found
          </p>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            We couldn't find anything matching your current filters. Try adjusting your search or resetting all filters.
          </p>
          <Button
            variant="secondary"
            className="mt-6 bg-surface-card border-hairline text-gray-700 hover:bg-surface-soft"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setStatus("All");
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, index) => (
            <div
              key={c.id}
              className="animate-slide-up-fade"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ComplaintCard complaint={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
