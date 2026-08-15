import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  suffix?: string;
  trend: string;
  trendPositive: boolean | null;
  icon: ReactNode;
  tintClass: string;
}

export default function StatCard({
  label,
  value,
  suffix,
  trend,
  trendPositive,
  icon,
  tintClass,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            {label}
          </p>
          <p className="mt-2 flex items-baseline gap-1 text-4xl font-black tracking-tighter text-gray-900">
            {value}
            {suffix && (
              <span className="text-lg font-bold tracking-normal text-gray-500">
                {suffix}
              </span>
            )}
          </p>
        </div>
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tintClass}`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-5">
        {trendPositive !== null ? (
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold ${
              trendPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trendPositive ? "↗" : "↘"} {trend}
          </span>
        ) : (
          <span className="text-xs font-bold text-gray-400">{trend}</span>
        )}
      </div>
    </div>
  );
}
