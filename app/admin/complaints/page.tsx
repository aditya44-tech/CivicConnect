"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { SearchIcon, ChevronRightIcon } from "@/components/icons";
import { complaints, type Status } from "@/lib/data";

type Sort = "newest" | "oldest" | "upvotes";

const statuses: (Status | "All")[] = ["All", "Pending", "In Progress", "Resolved"];

export default function AdminComplaintsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "All">("All");
  const [sort, setSort] = useState<Sort>("newest");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = complaints.filter((c) => {
      if (status !== "All" && c.status !== status) return false;
      if (q && !`${c.title} ${c.address}`.toLowerCase().includes(q)) return false;
      return true;
    });
    return filtered.sort((a, b) => {
      if (sort === "upvotes") return b.upvotes - a.upvotes;
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [query, status, sort]);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Complaints
      </h1>
      <p className="mt-1 text-gray-500">
        Review, triage, and manage every report.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search complaints…"
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
          />
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                status === s
                  ? "bg-gray-900 text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="upvotes">Most upvoted</option>
        </select>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200/70 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
              <th className="px-6 py-4">Complaint</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Upvotes</th>
              <th className="px-4 py-4">Reported</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((c) => (
              <tr
                key={c.id}
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => router.push(`/admin/complaints/${c.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt=""
                      className="h-10 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="max-w-xs truncate font-semibold text-gray-900">
                        {c.title}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {c.address}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600">{c.category}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-4 font-semibold text-gray-700">
                  {c.upvotes}
                </td>
                <td className="px-4 py-4 text-gray-500">{c.createdAt}</td>
                <td className="px-4 py-4">
                  <ChevronRightIcon className="h-4 w-4 text-gray-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-6 space-y-3 md:hidden">
        {rows.map((c) => (
          <Link
            key={c.id}
            href={`/admin/complaints/${c.id}`}
            className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-200/70"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt=""
              className="h-14 w-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {c.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {c.upvotes} upvotes · {c.createdAt}
              </p>
              <div className="mt-2">
                <StatusBadge status={c.status} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {rows.length === 0 && (
        <p className="mt-8 rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm ring-1 ring-gray-200/70">
          No complaints match your filters.
        </p>
      )}
    </div>
  );
}
