import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import {
  ClockIcon,
  CheckCircleIcon,
  FileTextIcon,
  TrendingUpIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { complaints, statusCounts } from "@/lib/data";

export default function AdminDashboardPage() {
  const counts = statusCounts();
  const total = complaints.length;
  const recent = [...complaints]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 5);

  const stats = [
    {
      label: "Total complaints",
      value: String(total),
      Icon: FileTextIcon,
      tint: "bg-primary-soft text-primary-dark",
    },
    {
      label: "Pending",
      value: String(counts.Pending),
      Icon: ClockIcon,
      tint: "bg-amber-100 text-amber-700",
    },
    {
      label: "Resolved",
      value: String(counts.Resolved),
      Icon: CheckCircleIcon,
      tint: "bg-green-100 text-green-700",
    },
    {
      label: "Avg. resolution time",
      value: "3.8d",
      Icon: TrendingUpIcon,
      tint: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Dashboard
      </h1>
      <p className="mt-1 text-gray-500">
        City-wide overview for Riverside.
      </p>

      {/* Stat widgets */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, Icon, tint }) => (
          <div
            key={label}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200/70"
          >
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${tint}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
              {value}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent complaints */}
      <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Highest-impact complaints
          </h2>
          <Link
            href="/admin/complaints"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            View all
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-gray-100">
          {recent.map((c) => (
            <Link
              key={c.id}
              href={`/admin/complaints/${c.id}`}
              className="flex items-center gap-4 py-3.5 transition-colors hover:bg-gray-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt=""
                className="h-12 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {c.title}
                </p>
                <p className="truncate text-xs text-gray-500">{c.address}</p>
              </div>
              <StatusBadge status={c.status} />
              <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
