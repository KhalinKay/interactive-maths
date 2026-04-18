"use client";

/**
 * RatiosLesson — 8-step guided lesson for Ratios, Percentages & Proportions.
 *
 * Structure (learn → check → learn → check ...):
 *   1. What is a ratio?          (learn)
 *   2. Check: simplifying        (check)
 *   3. Dividing in a ratio       (learn)
 *   4. Check: dividing           (check)
 *   5. What is a percentage?     (learn)
 *   6. Check: percentage of      (check)
 *   7. Percentage change         (learn)
 *   8. Check: % change           (check)
 *
 * Visuals are pure SVG — no extra libraries needed.
 */

import LessonEngine, { LessonStep } from "@/components/LessonEngine";
import { generateRatiosQuiz } from "@/lib/subjectQuestions";
import GenericQuiz from "@/components/GenericQuiz";
import { useState } from "react";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

/** Coloured bar split into ratio parts */
function RatioBar({
  parts,
  labels,
  colors,
}: {
  parts: number[];
  labels: string[];
  colors: string[];
}) {
  const total = parts.reduce((a, b) => a + b, 0);
  const W = 480;
  const H = 56;
  let x = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full max-w-lg" style={{ maxHeight: 90 }}>
      {parts.map((p, i) => {
        const w = (p / total) * W;
        const rect = (
          <g key={i}>
            <rect x={x} y={0} width={w} height={H} fill={colors[i]} rx={i === 0 ? 8 : i === parts.length - 1 ? 8 : 0}
              style={{ clipPath: i === 0 ? "inset(0 0 0 0 round 8px 0 0 8px)" : i === parts.length - 1 ? "inset(0 0 0 0 round 0 8px 8px 0)" : undefined }}
            />
            <text
              x={x + w / 2}
              y={H / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="700"
              fill="white"
              style={{ userSelect: "none" }}
            >
              {labels[i]}
            </text>
            <text
              x={x + w / 2}
              y={H + 16}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill="#9CA3AF"
              style={{ userSelect: "none" }}
            >
              {p} part{p !== 1 ? "s" : ""}
            </text>
          </g>
        );
        x += w;
        return rect;
      })}
    </svg>
  );
}

/** Simple proportional pie-chart slice (percentage) */
function PercentPie({ percent, color = "#489BFC" }: { percent: number; color?: string }) {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const angle = (percent / 100) * 2 * Math.PI;
  const x = cx + r * Math.sin(angle);
  const y = cy - r * Math.cos(angle);
  const large = percent > 50 ? 1 : 0;
  const path =
    percent >= 100
      ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.001} ${cy - r} Z`
      : `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${x} ${y} Z`;
  return (
    <svg viewBox="0 0 180 180" className="w-36 h-36">
      <circle cx={cx} cy={cy} r={r} fill="#262C30" />
      <path d={path} fill={color} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#30363B" strokeWidth="2" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="800" fill="#E8ECF0">
        {percent}%
      </text>
    </svg>
  );
}

/** Grid showing shaded cells for a fraction / percentage */
function PercentGrid({ filled, total, color = "#489BFC" }: { filled: number; total: number; color?: string }) {
  const cols = 10;
  const rows = Math.ceil(total / cols);
  const size = 28;
  const gap = 4;
  const W = cols * (size + gap) - gap;
  const H = rows * (size + gap) - gap;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs">
      {Array.from({ length: total }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <rect
            key={i}
            x={col * (size + gap)}
            y={row * (size + gap)}
            width={size}
            height={size}
            rx={4}
            fill={i < filled ? color : "#262C30"}
            stroke="#30363B"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

/** Arrow diagram showing original → new value for percentage change */
function ChangeArrow({ from, to, label }: { from: number; to: number; label: string }) {
  const isIncrease = to >= from;
  const color = isIncrease ? "#27C07B" : "#F05252";
  return (
    <div className="flex items-center gap-5 px-6 py-5 rounded-2xl" style={{ backgroundColor: "#1E2225", border: "1px solid #30363B" }}>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#9CA3AF" }}>Original</span>
        <span className="text-3xl font-black" style={{ color: "#E8ECF0" }}>£{from}</span>
      </div>
      <div className="flex flex-col items-center flex-1">
        <svg viewBox="0 0 120 40" className="w-28 h-10">
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={color} />
            </marker>
          </defs>
          <line x1="8" y1="20" x2="108" y2="20" stroke={color} strokeWidth="2.5" markerEnd="url(#arrowhead)" />
        </svg>
        <span className="text-xs font-bold mt-1" style={{ color }}>{label}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#9CA3AF" }}>New Price</span>
        <span className="text-3xl font-black" style={{ color }}>{isIncrease ? "£" : "£"}{to}</span>
      </div>
    </div>
  );
}

// ── Lesson steps ──────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  // ── 1. What is a ratio? ───────────────────────────────────────────────────
  {
    type: "learn",
    title: "What is a Ratio?",
    body: `A ratio compares two (or more) quantities and shows their relative sizes.

We write ratios using a colon:  3 : 1  means "for every 3 of the first thing, there is 1 of the second."

To simplify a ratio, divide both sides by their Highest Common Factor (HCF) — just like simplifying a fraction.`,
    example: {
      label: "Simplify  12 : 8",
      lines: [
        "HCF(12, 8) = 4",
        "12 ÷ 4 = 3",
        " 8 ÷ 4 = 2",
        "= 3 : 2",
      ],
    },
    visual: (
      <div className="p-6 flex flex-col items-center gap-3 w-full">
        <p className="text-sm font-semibold" style={{ color: "#9CA3AF" }}>12 : 8  simplified to  3 : 2</p>
        <div className="flex flex-col gap-2 w-full max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs w-16 text-right font-mono" style={{ color: "#9CA3AF" }}>12 : 8</span>
            <RatioBar parts={[12, 8]} labels={["12", "8"]} colors={["#489BFC", "#F7B035"]} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs w-16 text-right font-mono" style={{ color: "#27C07B" }}>3 : 2</span>
            <RatioBar parts={[3, 2]} labels={["3", "2"]} colors={["#489BFC", "#F7B035"]} />
          </div>
        </div>
        <p className="text-xs" style={{ color: "#9CA3AF" }}>Same proportions — same shape bar, different scale.</p>
      </div>
    ),
  },

  // ── 2. Check: simplify ────────────────────────────────────────────────────
  {
    type: "check",
    question: "Simplify the ratio  18 : 12",
    choices: ["3 : 2", "6 : 4", "9 : 6", "2 : 3"],
    correctIndex: 0,
    explanation: "HCF(18, 12) = 6.  18 ÷ 6 = 3,  12 ÷ 6 = 2.  Simplified: 3 : 2.",
  },

  // ── 3. Dividing in a ratio ────────────────────────────────────────────────
  {
    type: "learn",
    title: "Dividing a Quantity in a Ratio",
    body: `To share an amount in a given ratio:

① Add the parts together to get the total number of parts.
② Divide the total amount by the number of parts to find one part.
③ Multiply each part of the ratio by one part.`,
    example: {
      label: "Share £40 in the ratio  3 : 5",
      lines: [
        "// Step 1: total parts",
        "3 + 5 = 8 parts",
        "",
        "// Step 2: value of 1 part",
        "£40 ÷ 8 = £5 per part",
        "",
        "// Step 3: multiply",
        "Person A: 3 × £5 = £15",
        "Person B: 5 × £5 = £25",
        "= £15 and £25",
      ],
    },
    visual: (
      <div className="p-6 flex flex-col items-center gap-3 w-full">
        <p className="text-sm font-semibold" style={{ color: "#9CA3AF" }}>£40 split  3 : 5</p>
        <RatioBar
          parts={[3, 5]}
          labels={["£15  (3 parts)", "£25  (5 parts)"]}
          colors={["#489BFC", "#27C07B"]}
        />
        <div className="flex gap-6 mt-1">
          <div className="text-center">
            <div className="text-2xl font-black" style={{ color: "#489BFC" }}>£15</div>
            <div className="text-xs" style={{ color: "#9CA3AF" }}>3 parts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black" style={{ color: "#27C07B" }}>£25</div>
            <div className="text-xs" style={{ color: "#9CA3AF" }}>5 parts</div>
          </div>
        </div>
      </div>
    ),
  },

  // ── 4. Check: dividing ────────────────────────────────────────────────────
  {
    type: "check",
    question: "Divide £60 in the ratio 1 : 2",
    choices: ["£20 and £40", "£30 and £30", "£10 and £50", "£15 and £45"],
    correctIndex: 0,
    explanation: "Total parts = 1 + 2 = 3.  One part = £60 ÷ 3 = £20.  Shares: 1 × £20 = £20  and  2 × £20 = £40.",
  },

  // ── 5. What is a percentage? ──────────────────────────────────────────────
  {
    type: "learn",
    title: "Percentages",
    body: `A percentage is a fraction with denominator 100.  "Per cent" literally means "out of 100."

To find a percentage of an amount:
  • Convert % to a decimal (divide by 100), then multiply.

To find what percentage one number is of another:
  • Divide the part by the whole, then multiply by 100.`,
    example: {
      label: "Find 35% of 200",
      lines: [
        "35% = 35 ÷ 100 = 0.35",
        "0.35 × 200 = 70",
        "= 70",
      ],
    },
    visual: (
      <div className="p-6 flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
        <div className="flex flex-col items-center gap-2">
          <PercentPie percent={35} color="#489BFC" />
          <p className="text-sm font-semibold" style={{ color: "#9CA3AF" }}>35 out of 100</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <PercentGrid filled={35} total={100} color="#489BFC" />
          <p className="text-sm font-semibold" style={{ color: "#9CA3AF" }}>35 squares shaded out of 100</p>
        </div>
      </div>
    ),
  },

  // ── 6. Check: % of ───────────────────────────────────────────────────────
  {
    type: "check",
    question: "What is 25% of 160?",
    choices: ["40", "32", "45", "25"],
    correctIndex: 0,
    explanation: "25% = 0.25.  0.25 × 160 = 40.",
  },

  // ── 7. Percentage change ──────────────────────────────────────────────────
  {
    type: "learn",
    title: "Percentage Change",
    body: `Percentage change tells you how much something has increased or decreased relative to the original.

Formula:

  % change = (change ÷ original) × 100

Where  change = new value − original value.
A positive result is an increase; a negative result is a decrease.`,
    example: {
      label: "A jacket costs £80, now sells for £100",
      lines: [
        "Change = £100 − £80 = £20",
        "% change = (20 ÷ 80) × 100",
        "         = 0.25 × 100",
        "= 25% increase",
      ],
    },
    visual: (
      <div className="p-4 w-full">
        <ChangeArrow from={80} to={100} label="+25% increase" />
      </div>
    ),
  },

  // ── 8. Check: % change ───────────────────────────────────────────────────
  {
    type: "check",
    question: "A price drops from £50 to £40. What is the percentage decrease?",
    choices: ["20%", "10%", "25%", "15%"],
    correctIndex: 0,
    explanation: "Change = £50 − £40 = £10.  % decrease = (10 ÷ 50) × 100 = 20%.",
  },

  // ── 9. Proportions ────────────────────────────────────────────────────────
  {
    type: "learn",
    title: "Solving Proportions",
    body: `A proportion states that two ratios are equal:

  a/b = c/d

To solve for an unknown, cross-multiply:
  a × d = b × c

Then solve the resulting equation.`,
    example: {
      label: "Solve:  x/5 = 12/20",
      lines: [
        "Cross-multiply:",
        "20x = 5 × 12 = 60",
        "x = 60 ÷ 20 = 3",
        "// Check: 3/5 = 12/20 = 0.6 ✓",
      ],
    },
  },

  // ── 10. Check: proportion ─────────────────────────────────────────────────
  {
    type: "check",
    question: "Solve the proportion:  x/4 = 15/20",
    choices: ["3", "5", "75", "6"],
    correctIndex: 0,
    explanation: "Cross-multiply: 20x = 4 × 15 = 60.  x = 60 ÷ 20 = 3.",
  },

  // ── 11. Unit rates ────────────────────────────────────────────────────────
  {
    type: "learn",
    title: "Unit Rates and Best-Value Problems",
    body: `A unit rate expresses a quantity per one unit (e.g. price per item, speed per hour).

To find the unit rate, divide the total by the number of units.

Unit rates let you compare products — the lower price per unit = better value.`,
    example: {
      label: "Which is better value?  Pack A: £3.60 for 12  or  Pack B: £4.50 for 15",
      lines: [
        "Pack A: £3.60 ÷ 12 = £0.30 per item",
        "Pack B: £4.50 ÷ 15 = £0.30 per item",
        "= Same value!",
        "",
        "At 60 mph, distance in 2.5 hours:",
        "= 60 × 2.5 = 150 miles",
      ],
    },
  },

  // ── 12. Check: unit rate ──────────────────────────────────────────────────
  {
    type: "check",
    question: "A car travels 210 miles in 3 hours. What is its speed in miles per hour?",
    choices: ["70 mph", "63 mph", "207 mph", "630 mph"],
    correctIndex: 0,
    explanation: "Speed = distance ÷ time = 210 ÷ 3 = 70 mph.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function RatiosLesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
