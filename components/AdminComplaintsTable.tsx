"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import DeleteComplaintButton from "@/components/DeleteComplaintButton";
import { SearchIcon, ChevronRightIcon } from "@/components/icons";
import type { Complaint, Status } from "@/lib/data";

type Sort = "newest" | "oldest";

type Tab = "All" | Status;

export default function AdminComplaintsTable({
  complaints,
}: {
  complaints: Complaint[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("All");
  const [sort, setSort] = useState<Sort>("newest");

  const counts = useMemo(() => {
    const c: Record<Status, number> = { Pending: 0, "Ongoing": 0, Resolved: 0 };
    for (const complaint of complaints) c[complaint.status] += 1;
    return c;
  }, [complaints]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = complaints.filter((c) => {
      if (tab !== "All" && c.status !== tab) return false;
      if (q && !`${c.title} ${c.address}`.toLowerCase().includes(q)) return false;
      return true;
    });

    // Sort by real timestamps — the display string ("Aug 3, 2026") compares
    // lexicographically and puts dates in the wrong order.
    const time = (c: Complaint) =>
      c.createdAtISO
        ? new Date(c.createdAtISO).getTime()
        : new Date(c.createdAt).getTime();

    return filtered.sort((a, b) => {
      const diff = time(a) - time(b);
      return sort === "oldest" ? diff : -diff;
    });
  }, [complaints, query, tab, sort]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "All", label: "All Complaints", count: complaints.length },
    { key: "Pending", label: "Pending", count: counts.Pending },
    { key: "Ongoing", label: "Ongoing", count: counts["Ongoing"] },
    { key: "Resolved", label: "Resolved", count: counts.Resolved },
  ];

  return (
    <div>
      {/* Status tabs */}
      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
              tab === t.key
                ? "bg-gray-900 text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t.label}
            <span
              className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                tab === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search complaints…"
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
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
              <th className="px-4 py-4">Reported</th>
              <th className="px-4 py-4 text-right">Actions</th>
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
                <td className="px-4 py-4 text-gray-500">{c.createdAt}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <DeleteComplaintButton
                      complaintId={c.id}
                      className="text-gray-400 hover:bg-red-50 hover:text-red-600"
                    />
                    <ChevronRightIcon className="h-4 w-4 text-gray-300" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-6 space-y-3 md:hidden">
        {rows.map((c) => (
          <div
            key={c.id}
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/admin/complaints/${c.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter") router.push(`/admin/complaints/${c.id}`);
            }}
            className="flex cursor-pointer items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-gray-200/70 transition-colors hover:bg-gray-50"
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
                {c.createdAt}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <StatusBadge status={c.status} />
                <DeleteComplaintButton
                  complaintId={c.id}
                  className="text-gray-400 hover:bg-red-50 hover:text-red-600"
                />
              </div>
            </div>
          </div>
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
