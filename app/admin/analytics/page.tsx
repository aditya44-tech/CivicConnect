import { categoryCounts } from "@/lib/data";

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

const donutColors = ["#007AFF", "#FF9500", "#34C759", "#FF3B30", "#AF52DE"];

export default function AnalyticsPage() {
  const cats = categoryCounts();
  const total = cats.reduce((sum, c) => sum + c.count, 0);

  // conic-gradient percentages from cumulative share
  let acc = 0;
  const stops = cats.map((c, i) => {
    const start = acc;
    acc += (c.count / total) * 100;
    return `${donutColors[i % donutColors.length]} ${start}% ${acc}%`;
  });

  const maxVal = Math.max(...monthly.map((m) => m.value));

  return (
    <div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Riverside, CA
        </p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-900">
          Analytics
        </h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Trends and breakdowns across the city (placeholder data).
        </p>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {/* Bar chart */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04]">
          <h2 className="text-sm font-bold text-gray-900">
            Complaints per month
          </h2>
          <div className="mt-6 flex h-44 items-end justify-between gap-2">
            {monthly.map((m) => (
              <div
                key={m.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] font-semibold text-gray-400">
                  {m.value}
                </span>
                <div
                  title={`${m.label}: ${m.value}`}
                  className="w-full max-w-8 rounded-t-lg bg-primary transition-all hover:bg-primary-dark"
                  style={{ height: `${(m.value / maxVal) * 100}%` }}
                />
                <span className="text-[10px] font-medium text-gray-400">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04]">
          <h2 className="text-sm font-bold text-gray-900">By category</h2>
          <div className="mt-6 flex flex-wrap items-center gap-8">
            <div className="relative h-40 w-40 shrink-0 rounded-full">
              <div
                className="h-full w-full rounded-full"
                style={{ background: `conic-gradient(${stops.join(", ")})` }}
              />
              <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-2xl font-black text-gray-900">
                  {total}
                </span>
                <span className="text-[10px] font-medium text-gray-400">
                  total
                </span>
              </div>
            </div>
            <ul className="min-w-0 flex-1 space-y-2.5">
              {cats.map((c, i) => (
                <li key={c.category} className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: donutColors[i % donutColors.length] }}
                  />
                  <span className="flex-1 truncate text-sm font-medium text-gray-600">
                    {c.category}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {c.count}
                  </span>
                  <span className="w-9 text-right text-xs text-gray-400">
                    {Math.round((c.count / total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Line chart */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04]">
          <h2 className="text-sm font-bold text-gray-900">
            Resolution time trend
          </h2>
          <svg
            viewBox="0 0 300 120"
            className="mt-6 w-full"
            role="img"
            aria-label="Line chart showing resolution time trending down"
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007AFF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,90 60,70 120,78 180,50 240,40 300,20 300,120 0,120"
              fill="url(#areaFill)"
            />
            <polyline
              points="0,90 60,70 120,78 180,50 240,40 300,20"
              fill="none"
              stroke="#007AFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [0, 90],
              [60, 70],
              [120, 78],
              [180, 50],
              [240, 40],
              [300, 20],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="3.5" fill="#fff" stroke="#007AFF" strokeWidth="2" />
            ))}
          </svg>
          <p className="mt-3 text-xs text-gray-500">
            Median days to resolve:{" "}
            <span className="font-bold text-gray-900">4.2 → 2.9</span> over the
            last six months
          </p>
        </div>

        {/* Category breakdown bars */}
        <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04]">
          <h2 className="text-sm font-bold text-gray-900">Volume by area</h2>
          <div className="mt-6 space-y-4">
            {cats.map((c, i) => (
              <div key={c.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">{c.category}</span>
                  <span className="font-bold text-gray-900">
                    {c.count} reports
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(c.count / total) * 100}%`,
                      background: donutColors[i % donutColors.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
