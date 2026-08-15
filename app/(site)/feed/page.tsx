"use client";

import { useMemo, useState } from "react";
import ComplaintCard from "@/components/ComplaintCard";
import { SearchIcon, XIcon } from "@/components/icons";
import { CATEGORIES, complaints, type Status } from "@/lib/data";

const statuses: (Status | "All")[] = ["All", "Pending", "In Progress", "Resolved"];

export default function FeedPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<Status | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return complaints.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (status !== "All" && c.status !== status) return false;
      if (q && !`${c.title} ${c.address} ${c.category}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [query, category, status]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Public feed
          </h1>
          <p className="mt-1 text-gray-500">
            Recent complaints from across the city.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-6 max-w-xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword or address…"
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-10 text-sm shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
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

      {/* Category chips */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              category === cat
                ? "bg-gray-900 text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Status chips */}
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              status === s
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-gray-400">
        {filtered.length} {filtered.length === 1 ? "complaint" : "complaints"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200/70">
          <p className="text-lg font-semibold text-gray-900">
            No complaints match
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Try clearing the search or switching filters.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      )}
    </div>
  );
}
