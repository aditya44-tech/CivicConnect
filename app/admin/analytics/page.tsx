import { categoryCounts, statusCounts, complaints } from "@/lib/data";
import DonutChart from "@/components/DonutChart";

const monthly = [
  { label: "Jan", value: 34 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 52 },
  { label: "May", value: 47 },
  { label: "Jun", value: 61 },
  { label: "Jul", value: 58 },
  { label: "Aug", value: 44 },
];

const donutColors = ["#F43F5E", "#F97316", "#FBBF24", "#10B981", "#06B6D4", "#A855F7", "#EC4899", "#64748B"];

export default function AnalyticsPage() {
  const cats = categoryCounts();
  const total = cats.reduce((sum, c) => sum + c.count, 0);
  const statuses = statusCounts();
  const pending = statuses["Pending"];
  const inProgress = statuses["In Progress"];
  
  let acc = 0;
  const stops = cats.map((c, i) => {
    const start = acc;
    acc += (c.count / total) * 100;
    return `${donutColors[i % donutColors.length]} ${start}% ${acc}%`;
  });

  const maxVal = Math.max(...monthly.map((m) => m.value));

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
            Real-time trends and issue resolutions across Riverside.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live updating
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Reports", value: total.toLocaleString(), tag: `${monthly[monthly.length-1].value} this month`, positive: true },
          { label: "Pending", value: `${statuses["Pending"]}`, tag: "Awaiting action", positive: false },
          { label: "Ongoing", value: `${statuses["In Progress"]}`, tag: "Being resolved", positive: true },
          { label: "Resolved", value: `${statuses["Resolved"]}`, tag: "Completed", positive: true },
        ].map((kpi) => (
          <div key={kpi.label} className="relative overflow-hidden rounded-[2rem] border border-hairline bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
            <p className="text-sm font-bold text-gray-400">{kpi.label}</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-black tracking-tight text-gray-900">{kpi.value}</span>
              <span className={`text-xs font-bold ${kpi.positive ? 'text-emerald-500' : 'text-amber-500'}`}>{kpi.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Bar chart - Spans 2 cols */}
        <div className="lg:col-span-2 overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-sm p-8 flex flex-col">
          <div className="flex items-end justify-between">
            <h2 className="text-lg font-bold text-gray-900">Report Volume</h2>
            <span className="text-xs font-semibold text-gray-400">Jan – Aug 2026</span>
          </div>
          <div className="mt-6 flex flex-1 items-end justify-between gap-2 min-h-[200px]">
            {monthly.map((m) => (
              <div
                key={m.label}
                className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-xs font-bold text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                  {m.value}
                </span>
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-primary/70 to-primary transition-all duration-500 group-hover:from-primary group-hover:to-primary-dark"
                  style={{ height: `${(m.value / maxVal) * 100}%`, minHeight: '8px' }}
                />
                <span className="text-[11px] font-bold text-gray-500">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Category Share</h2>
          <DonutChart
            slices={cats.map((c, i) => ({ category: c.category, count: c.count, color: donutColors[i % donutColors.length] }))}
            total={total}
          />
        </div>

        {/* High-Priority Alert Queue */}
        <div className="lg:col-span-2 overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Priority Alert Queue</h2>
              <p className="text-xs text-gray-400 mt-0.5">Unresolved issues ranked by community upvotes</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 border border-amber-100">
              {complaints.filter(c => c.status !== 'Resolved').length} open
            </span>
          </div>
          <ul className="space-y-3">
            {[...complaints]
              .filter(c => c.status !== 'Resolved')
              .sort((a, b) => b.upvotes - a.upvotes)
              .slice(0, 5)
              .map((c, i) => (
                <li key={c.id} className="flex items-center gap-4 rounded-2xl border border-hairline bg-gray-50/60 px-4 py-3.5 transition-colors hover:bg-gray-50">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-hairline text-xs font-black text-gray-500 shadow-sm">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{c.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.category} · {c.address}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-bold text-gray-500">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                      {c.upvotes}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      c.status === 'In Progress' ? 'bg-violet-50 text-violet-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Line chart */}
        <div className="overflow-hidden rounded-[2rem] border border-hairline bg-white shadow-sm p-8 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Resolution Time Trend
          </h2>
          <svg
            viewBox="0 0 300 120"
            className="mt-8 w-full overflow-visible"
            role="img"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,90 C30,90 30,70 60,70 C90,70 90,78 120,78 C150,78 150,50 180,50 C210,50 210,40 240,40 C270,40 270,20 300,20 L300,120 L0,120 Z"
              fill="url(#areaFill)"
            />
            <path
              d="M0,90 C30,90 30,70 60,70 C90,70 90,78 120,78 C150,78 150,50 180,50 C210,50 210,40 240,40 C270,40 270,20 300,20"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {[
              [0, 90],
              [60, 70],
              [120, 78],
              [180, 50],
              [240, 40],
              [300, 20],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="5" fill="#fff" stroke="#EC4899" strokeWidth="2.5" className="transition-transform hover:scale-150 hover:cursor-pointer" />
            ))}
          </svg>
          <div className="mt-8 rounded-xl bg-gray-50 p-4 border border-gray-100">
            <p className="text-xs font-semibold leading-relaxed text-gray-500 text-center">
              Median resolution time dropped from <strong className="text-gray-900">4.2 days</strong> to <strong className="text-gray-900">2.9 days</strong> this quarter.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
