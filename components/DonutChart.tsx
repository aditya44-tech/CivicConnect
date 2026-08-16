"use client";

import { useState } from "react";

interface Slice {
  category: string;
  count: number;
  color: string;
}

interface DonutChartProps {
  slices: Slice[];
  total: number;
}

const CX = 90;
const CY = 90;
const R_OUTER = 80;
const R_INNER = 52;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(startDeg: number, endDeg: number): string {
  // Prevent full-circle rendering glitch
  const end = endDeg - startDeg >= 360 ? endDeg - 0.001 : endDeg;
  const o1 = polar(CX, CY, R_OUTER, startDeg);
  const o2 = polar(CX, CY, R_OUTER, end);
  const i1 = polar(CX, CY, R_INNER, end);
  const i2 = polar(CX, CY, R_INNER, startDeg);
  const large = end - startDeg > 180 ? 1 : 0;
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${R_INNER} ${R_INNER} 0 ${large} 0 ${i2.x} ${i2.y}`,
    "Z",
  ].join(" ");
}

export default function DonutChart({ slices, total }: DonutChartProps) {
  const [hovered, setHovered] = useState<Slice | null>(null);

  let acc = 0;
  const segments = slices.map((s) => {
    const startDeg = acc;
    const sweep = (s.count / total) * 360;
    acc += sweep;
    return { ...s, startDeg, endDeg: acc, path: arcPath(startDeg, acc) };
  });

  const display = hovered ?? null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg
          viewBox="0 0 180 180"
          className="h-48 w-48 overflow-visible drop-shadow-sm"
          role="img"
          aria-label="Category share donut chart"
        >
          {segments.map((seg) => (
            <path
              key={seg.category}
              d={seg.path}
              fill={seg.color}
              stroke="#fff"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              style={{
                opacity: hovered && hovered.category !== seg.category ? 0.35 : 1,
                transform:
                  hovered?.category === seg.category
                    ? `scale(1.05)`
                    : "scale(1)",
                transformOrigin: `${CX}px ${CY}px`,
              }}
              onMouseEnter={() => setHovered(seg)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          {/* Centre label */}
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-black text-gray-900"
            style={{ fontSize: 22, fontWeight: 900, fill: "#1D1D1F" }}
          >
            {display ? display.count : total}
          </text>
          <text
            x={CX}
            y={CY + 14}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: 9,
              fontWeight: 700,
              fill: "#6E6E73",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {display ? display.category : "Reports"}
          </text>
        </svg>
      </div>

      {/* Legend */}
      <ul className="w-full space-y-2">
        {slices.map((s) => (
          <li
            key={s.category}
            className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1 transition-colors hover:bg-gray-50"
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: s.color }}
            />
            <span className="flex-1 truncate text-sm font-medium text-gray-600">
              {s.category}
            </span>
            <span className="text-sm font-bold text-gray-900">{s.count}</span>
            <span className="w-9 text-right text-xs text-gray-400">
              {Math.round((s.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
