/**
 * Admin Dashboard Page - The main overview for city administrators.
 * Displays high-level metrics and a table of recent complaints.
 */
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/Button";
import {
  ClockIcon,
  CheckCircleIcon,
  FileTextIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  SearchIcon,
  BellIcon,
  SettingsIcon,
  PlusIcon,
  LogOutIcon
} from "@/components/icons";
import { complaints, statusCounts } from "@/lib/data";
import StatCard from "@/components/StatCard";

export default function AdminDashboardPage() {
  const counts = statusCounts();
  const total = complaints.length;
  const recent = [...complaints]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 5);

  const stats = [
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
      value: String(counts.Pending),
      trend: "Requires attention",
      trendPositive: null,
      Icon: ClockIcon,
      tint: "bg-primary-soft text-primary-dark",
    },
    {
      label: "RESOLVED",
      value: String(counts.Resolved),
      trend: "69% resolution rate",
      trendPositive: true,
      Icon: CheckCircleIcon,
      tint: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "AVG. TIME",
      value: "4.2",
      suffix: "Days",
      trend: "-0.5 days vs last month",
      trendPositive: false,
      Icon: TrendingUpIcon,
      tint: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <div className="bg-[#fcfcfb] min-h-screen border-l border-gray-200">
      
      <div className="flex items-center justify-end gap-6 px-8 py-5 border-b border-gray-200 bg-white">
        <div className="flex gap-4 text-gray-400">
          <button aria-label="Search" className="hover:text-gray-900 transition-colors">
            <SearchIcon className="h-5 w-5" />
          </button>
          <button aria-label="Notifications" className="hover:text-gray-900 transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>
          <button aria-label="Settings" className="hover:text-gray-900 transition-colors">
            <SettingsIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-8 pb-12 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-gray-900">
              Overview
            </h1>
            <p className="mt-1.5 text-sm font-medium text-gray-500">
              Welcome back. Here's what's happening today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2 bg-white text-gray-700 hover:bg-gray-50 border-gray-200">
              <LogOutIcon className="h-4 w-4 -rotate-90" />
              Export Report
            </Button>
            <Button className="gap-2 shadow-sm">
              <PlusIcon className="h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, suffix, trend, trendPositive, Icon, tint }) => (
            <StatCard
              key={label}
              label={label}
              value={value}
              suffix={suffix}
              trend={trend}
              trendPositive={trendPositive}
              icon={<Icon className="h-5 w-5" />}
              tintClass={tint}
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Recent Activity
            </h2>
            <div className="flex gap-3 text-gray-400">
              <button aria-label="Filter results" className="hover:text-gray-900 transition-colors"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg></button>
              <button aria-label="Sort results" className="hover:text-gray-900 transition-colors"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50/50 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                <tr>
                  <th className="px-6 py-4">Submitter</th>
                  <th className="px-6 py-4">Complaint</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {recent.map((c) => {
                  const initials = c.author.split(" ").map(n => n[0]).join("");
                  const email = `${c.author.split(" ").join(".").toLowerCase()}@example.com`;
                  
                  return (
                    <tr key={c.id} className="transition-colors hover:bg-gray-50/80">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow-sm ring-1 ring-primary/30">
                            {initials}
                          </span>
                          <div>
                            <p className="font-bold text-gray-900">{c.author}</p>
                            <p className="text-[11px] font-medium text-gray-500">{email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[300px]">
                          <p className="truncate font-bold text-gray-900">{c.title}</p>
                          <p className="truncate text-xs font-medium text-gray-500">{c.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-gray-600">
                          <span className="h-2.5 w-3 rounded-[2px] bg-gray-300" />
                          {c.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 px-6 py-4">
            <p className="text-xs font-medium text-gray-500">
              Showing <span className="font-bold text-gray-900">1 to {recent.length}</span> of {total} entries
            </p>
            <div className="flex items-center gap-1">
              <button aria-label="Previous page" className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                <ChevronRightIcon className="h-4 w-4 rotate-180" />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-white shadow-sm">
                1
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-gray-600 transition-colors hover:bg-gray-200">
                2
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-gray-600 transition-colors hover:bg-gray-200">
                3
              </button>
              <span className="px-1.5 text-gray-400">...</span>
              <button aria-label="Next page" className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
