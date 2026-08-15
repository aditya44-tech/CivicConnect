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

const donutColors = ["#af52de", "#ff9500", "#34c759", "#ff3b30", "#ffcc00"];

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

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Analytics
      </h1>
      <p className="mt-1 text-gray-500">
        Trends and breakdowns across the city (placeholder data).
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Bar chart */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <h2 className="text-lg font-bold text-gray-900">
            Complaints per month
          </h2>
          <div className="mt-6 flex h-44 items-end justify-between gap-2">
            {monthly.map((m) => (
              <div
                key={m.label}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-xs font-semibold text-gray-400">
                  {m.value}
                </span>
                <div
                  title={`${m.label}: ${m.value}`}
                  className="w-full max-w-8 rounded-t-xl bg-gradient-to-t from-primary to-primary/60 transition-all hover:from-primary-dark"
                  style={{ height: `${m.value}%` }}
                />
                <span className="text-xs font-medium text-gray-400">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <h2 className="text-lg font-bold text-gray-900">By category</h2>
          <div className="mt-6 flex flex-wrap items-center gap-8">
            <div className="relative h-40 w-40 shrink-0 rounded-full bg-gray-100">
              <div
                className="h-full w-full rounded-full"
                style={{ background: `conic-gradient(${stops.join(", ")})` }}
              />
              <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-2xl font-extrabold text-gray-900">
                  {total}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  total
                </span>
              </div>
            </div>
            <ul className="min-w-0 flex-1 space-y-2.5">
              {cats.map((c, i) => (
                <li key={c.category} className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: donutColors[i % donutColors.length] }}
                  />
                  <span className="flex-1 truncate text-sm font-medium text-gray-700">
                    {c.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {c.count}
                  </span>
                  <span className="w-10 text-right text-xs text-gray-400">
                    {Math.round((c.count / total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Line chart */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <h2 className="text-lg font-bold text-gray-900">
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
                <stop offset="0%" stopColor="#af52de" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#af52de" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,90 60,70 120,78 180,50 240,40 300,20 300,120 0,120"
              fill="url(#areaFill)"
            />
            <polyline
              points="0,90 60,70 120,78 180,50 240,40 300,20"
              fill="none"
              stroke="#af52de"
              strokeWidth="3"
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
              <circle key={x} cx={x} cy={y} r="4" fill="#fff" stroke="#af52de" strokeWidth="3" />
            ))}
          </svg>
          <p className="mt-3 text-sm text-gray-500">
            Median days to resolve: <span className="font-semibold text-gray-900">4.2 → 2.9</span> over the last six months
          </p>
        </div>

        {/* Category breakdown bars */}
        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <h2 className="text-lg font-bold text-gray-900">Volume by area</h2>
          <div className="mt-6 space-y-4">
            {cats.map((c, i) => (
              <div key={c.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{c.category}</span>
                  <span className="font-semibold text-gray-900">
                    {c.count} reports
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
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
