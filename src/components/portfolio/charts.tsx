"use client";

import { motion } from "motion/react";
import type { LinePoint, BarDatum, DonutDatum } from "@/data/portfolio";

export const CHART_PALETTE = [
  "#5B5FFF",
  "#8B5CF6",
  "#3B82F6",
  "#0EA5E9",
  "#10B981",
  "#F59E0B",
  "#64748B",
];

function formatValue(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 10) / 10);
}

// ─── Line / Area chart ───────────────────────────────────────────────────────

export function LineChart({
  data,
  unit,
  color = "#5B5FFF",
  height = 300,
}: {
  data: LinePoint[];
  unit?: string;
  color?: string;
  height?: number;
}) {
  const W = 720;
  const H = height;
  const padX = 18;
  const padTop = 22;
  const padBottom = 34;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;

  const rawMax = Math.max(...data.map((d) => d.value));
  const max = rawMax === 0 ? 1 : rawMax * 1.12;
  const n = data.length;
  const stepX = n > 1 ? innerW / (n - 1) : 0;

  const points = data.map((d, i) => ({
    x: padX + i * stepX,
    y: padTop + innerH - (d.value / max) * innerH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${points[n - 1].x.toFixed(1)} ${padTop + innerH} L${points[0].x.toFixed(1)} ${padTop + innerH} Z`;
  const last = points[n - 1];

  const showXLabel = (i: number) => n <= 6 || i === 0 || i === n - 1 || i === Math.floor(n / 2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id="chartAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.14" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padTop + innerH * (1 - t);
        return (
          <g key={t}>
            <line x1={padX} x2={W - padX} y1={y} y2={y} stroke="#E3E8F5" strokeWidth="1" />
            <text x={padX - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#64748B" fontFamily="var(--font-inter)">
              {formatValue(max * t)}
            </text>
          </g>
        );
      })}

      <motion.path
        d={areaPath}
        fill="url(#chartAreaFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.35 }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === n - 1 ? 5 : 3.5}
          fill={i === n - 1 ? color : "#fff"}
          stroke={color}
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.3 + i * 0.05 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}

      <motion.g
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 0.9 }}
      >
        <text x={last.x} y={last.y - 14} textAnchor="middle" fontSize="12" fontWeight="800" fill={color} fontFamily="var(--font-inter)">
          {formatValue(last.value)}
          {unit}
        </text>
      </motion.g>

      {points.map((p, i) =>
        showXLabel(i) ? (
          <text
            key={i}
            x={p.x}
            y={H - 10}
            textAnchor="middle"
            fontSize="10.5"
            fill="#475569"
            fontFamily="var(--font-inter)"
          >
            {p.label}
          </text>
        ) : null
      )}
    </svg>
  );
}

// ─── Vertical bar chart ──────────────────────────────────────────────────────

export function BarChart({
  data,
  unit = "",
  color = "#5B5FFF",
  height = 240,
}: {
  data: BarDatum[];
  unit?: string;
  color?: string;
  height?: number;
}) {
  const W = 560;
  const H = height;
  const padX = 14;
  const padTop = 26;
  const padBottom = 34;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;

  const rawMax = Math.max(...data.map((d) => d.value));
  const max = rawMax === 0 ? 1 : rawMax * 1.12;
  const slot = innerW / data.length;
  const barW = Math.min(52, slot * 0.55);
  const maxIndex = data.findIndex((d) => d.value === rawMax);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Bar chart">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = padTop + innerH * (1 - t);
        return (
          <g key={t}>
            <line x1={padX} x2={W - padX} y1={y} y2={y} stroke="#E3E8F5" strokeWidth="1" />
            <text x={padX - 8} y={y + 3.5} textAnchor="end" fontSize="10" fill="#64748B" fontFamily="var(--font-inter)">
              {formatValue(max * t)}
            </text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = padX + i * slot + (slot - barW) / 2;
        const y = padTop + innerH - h;
        const fill = i === maxIndex ? color : "#5B5FFF";
        const opacity = i === maxIndex ? 1 : 0.22;
        return (
          <g key={d.label}>
            <motion.rect
              x={x}
              width={barW}
              rx={6}
              fill={fill}
              fillOpacity={opacity}
              initial={{ height: 0, y: padTop + innerH }}
              whileInView={{ height: h, y }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
            />
            <motion.text
              x={x + barW / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill="#334155"
              fontFamily="var(--font-inter)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              {formatValue(d.value)}
              {d.suffix ?? unit}
            </motion.text>
            <text
              x={x + barW / 2}
              y={H - 12}
              textAnchor="middle"
              fontSize="10.5"
              fill="#475569"
              fontFamily="var(--font-inter)"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Donut chart ─────────────────────────────────────────────────────────────

export function DonutChart({
  data,
  centerValue,
  centerLabel,
  size = 190,
}: {
  data: DonutDatum[];
  centerValue?: string;
  centerLabel?: string;
  size?: number;
}) {
  const stroke = 21;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-7 sm:flex-row sm:gap-9">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" role="img" aria-label="Donut chart">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3E8F5" strokeWidth={stroke} />
          {data.map((d, i) => {
            const frac = d.value / total;
            const len = Math.max(frac * c - 3, 2);
            const offset = cumulative;
            cumulative += frac * c;
            return (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={CHART_PALETTE[i % CHART_PALETTE.length]}
                strokeWidth={stroke}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                initial={{ strokeDasharray: `0 ${c}` }}
                whileInView={{ strokeDasharray: `${len} ${c - len}` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] font-extrabold tracking-tight text-[#0F172A]" style={{ fontFamily: "var(--font-inter)" }}>
            {centerValue ?? formatValue(total)}
          </span>
          {centerLabel && (
            <span className="mt-0.5 max-w-[110px] text-center text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
              {centerLabel}
            </span>
          )}
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center justify-between gap-4 text-[13px]">
            <span className="flex items-center gap-2.5 text-[#334155]">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: CHART_PALETTE[i % CHART_PALETTE.length] }}
              />
              {d.label}
            </span>
            <span className="font-bold tabular-nums text-[#0F172A]">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
