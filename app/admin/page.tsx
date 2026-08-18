/**
 * Admin Dashboard Page - Quick-glance snapshot for city administrators.
 * Stat cards → simplified recent activity feed → mini category breakdown.
 */
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import {
  ClockIcon,
  CheckCircleIcon,
  FileTextIcon,
  TrendingUpIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { getAdminStats } from "@/lib/queries";
import StatCard from "@/components/StatCard";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  const { total, pending, inProgress, resolved, recent, categories: cats } = stats;
  const catTotal = cats.reduce((s, c) => s + c.count, 0);
  const catColors = [
    "#8B5CF6",
    "#F97316",
    "#FBBF24",
    "#10B981",
    "#06B6D4",
    "#EC4899",
    "#64748B",
    "#F43F5E",
  ];

  const statCards = [
    {
      label: "TOTAL COMPLAINTS",
      value: String(total),
      trend: "+12% vs last month",
      trendPositive: true,
      Icon: FileTextIcon,
      tint: "bg-primary text-white",
    },
    {
      label: "PENDING",
      value: String(pending),
      trend: "Requires attention",
      trendPositive: null,
      Icon: ClockIcon,
      tint: "bg-primary-soft text-primary-dark",
    },
    {
      label: "ONGOING",
      value: String(inProgress),
      trend: "Being resolved",
      trendPositive: true,
      Icon: TrendingUpIcon,
      tint: "bg-violet-100 text-violet-600",
    },
    {
      label: "RESOLVED",
      value: String(resolved),
      trend: "69% resolution rate",
      trendPositive: true,
      Icon: CheckCircleIcon,
      tint: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="bg-[#fcfcfb] min-h-screen border-l border-gray-200">
      <div className="px-6 pb-12 pt-6">
        <div className="rounded-[2rem] border border-gray-200 bg-white shadow-sm overflow-hidden">

          {/* Page header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 px-8 py-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-gray-900">
                Overview
              </h1>
              <p className="mt-1.5 text-sm font-medium text-gray-500">
                Welcome back. Here&apos;s what&apos;s happening today.
              </p>
            </div>

          </div>

          {/* Stat cards */}
          <div className="grid gap-5 px-8 pt-8 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map(({ label, value, trend, trendPositive, Icon, tint }) => (
              <StatCard
                key={label}
                label={label}
                value={value}
                trend={trend}
                trendPositive={trendPositive}
                icon={<Icon className="h-5 w-5" />}
                tintClass={tint}
              />
            ))}
          </div>

          {/* Bottom two-column layout */}
          <div className="mx-8 mt-8 mb-8 grid gap-6 lg:grid-cols-3">

            {/* Recent Activity — simplified feed list */}
            <div className="lg:col-span-2 rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-bold tracking-tight text-gray-900">
                  Recent Activity
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Latest 5
                </span>
              </div>

              <ul className="divide-y divide-gray-100 bg-white">
                {recent.map((c) => {
                  const initials = c.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("");
                  return (
                    <li
                      key={c.id}
                      className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50/80"
                    >
                      {/* Avatar */}
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow-sm ring-1 ring-primary/30">
                        {initials}
                      </span>

                      {/* Author + title */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold text-gray-400 leading-none mb-1">
                          {c.author}
                        </p>
                        <p className="truncate text-sm font-bold text-gray-900">
                          {c.title}
                        </p>
                      </div>

                      {/* Status badge */}
                      <StatusBadge status={c.status} />
                    </li>
                  );
                })}
              </ul>

              {/* View all link */}
              <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-3.5">
                <Link
                  href="/admin/complaints"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                >
                  View all complaints
                  <ChevronRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Category Share */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-bold tracking-tight text-gray-900">
                  Category Share
                </h2>
                <p className="mt-0.5 text-[11px] font-medium text-gray-400">
                  Issue distribution snapshot
                </p>
              </div>

              <div className="px-6 py-5 space-y-3.5">
                {cats.map((cat, i) => {
                  const pct = Math.round((cat.count / catTotal) * 100);
                  return (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: catColors[i % catColors.length] }}
                          />
                          {cat.category}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400">
                          {cat.count}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: catColors[i % catColors.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
