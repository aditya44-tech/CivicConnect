import { getAdminStats } from "@/lib/queries";
import DonutChart from "@/components/DonutChart";

const donutColors = ["#F43F5E", "#F97316", "#FBBF24", "#10B981", "#06B6D4", "#A855F7", "#EC4899", "#64748B"];

export default async function AnalyticsPage() {
  const stats = await getAdminStats();
  const cats = stats.categories;
  const total = cats.reduce((sum, c) => sum + c.count, 0);
  const statuses = {
    Pending: stats.pending,
    "Ongoing": stats.inProgress,
    Resolved: stats.resolved,
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            City Intelligence
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">
            Analytics Overview
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Issue distribution across Shirpur.
          </p>
        </div>
      </div>

      {/* Compact secondary summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Total", value: total, color: "text-gray-900" },
          { label: "Pending", value: statuses["Pending"], color: "text-amber-600" },
          { label: "Ongoing", value: statuses["Ongoing"], color: "text-violet-600" },
          { label: "Resolved", value: statuses["Resolved"], color: "text-emerald-600" },
        ].map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-500 shadow-sm"
          >
            <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
            {item.label}
          </span>
        ))}
      </div>

      {/* Category Share */}
      <div className="overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-sm p-8 max-w-md">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Category Share</h2>
        <DonutChart
          slices={cats.map((c, i) => ({ category: c.category, count: c.count, color: donutColors[i % donutColors.length] }))}
          total={total}
        />
      </div>
    </div>
  );
}
