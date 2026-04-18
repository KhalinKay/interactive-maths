"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function FractionBar({ num, den, color = "#489BFC" }: { num: number; den: number; color?: string }) {
  const W = 400, H = 48, cellW = W / den;
  return (
    <svg viewBox={`0 0 ${W + 2} ${H + 2}`} className="w-full max-w-sm">
      {Array.from({ length: den }).map((_, i) => (
        <rect key={i} x={i * cellW + 1} y={1} width={cellW - 2} height={H} rx={3}
          fill={i < num ? color : "#262C30"} stroke="#30363B" strokeWidth="1" />
      ))}
      <text x={(W + 2) / 2} y={(H + 2) / 2 + 1} textAnchor="middle" dominantBaseline="middle"
        fontSize="13" fontWeight="700" fill="white">{num}/{den}</text>
    </svg>
  );
}

function EquivBars() {
  const rows: [number, number, string][] = [[1, 2, "#489BFC"], [2, 4, "#27C07B"], [4, 8, "#F7B035"]];
  const W = 300, H = 36, gap = 10;
  return (
    <svg viewBox={`0 0 ${W + 68} ${rows.length * (H + gap) - gap}`} className="w-full max-w-xs">
      {rows.map(([num, den, color], pi) => {
        const cW = W / den;
        const y = pi * (H + gap);
        return (
          <g key={pi}>
            <text x="52" y={y + H / 2 + 1} textAnchor="end" dominantBaseline="middle" fontSize="13" fontWeight="700" fill={color}>{num}/{den}</text>
            {Array.from({ length: den }).map((_, i) => (
              <rect key={i} x={60 + i * cW} y={y} width={cW - 2} height={H} rx={3}
                fill={i < num ? color : "#262C30"} stroke="#30363B" strokeWidth="1" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "What is a Fraction?",
    body: `A fraction represents a part of a whole.

  numerator   → how many parts you have
  ─────────
  denominator → total equal parts the whole is divided into

3/5 means "3 out of every 5 equal parts." The denominator tells you how many slices, the numerator how many you're taking.`,
    example: {
      lines: [
        "3/5  →  3 parts out of 5",
        "1/4  →  1 part  out of 4",
        "7/8  →  7 parts out of 8",
      ],
    },
    visual: (
      <div className="p-6 flex flex-col items-center gap-3">
        <FractionBar num={3} den={5} color="#489BFC" />
        <p className="text-sm" style={{ color: "#9CA3AF" }}>3 out of 5 parts shaded = 3/5</p>
      </div>
    ),
  },
  {
    type: "check",
    question: "A bar has 8 equal parts. 3 are shaded. What fraction is shaded?",
    choices: ["3/8", "8/3", "5/8", "3/5"],
    correctIndex: 0,
    explanation: "3 parts shaded out of 8 total parts → the fraction is 3/8.",
  },
  {
    type: "learn",
    title: "Equivalent Fractions",
    body: `Equivalent fractions look different but represent the same amount.

To create an equivalent fraction, multiply OR divide both the numerator and denominator by the same non-zero number.

1/2 = 2/4 = 4/8 = 50/100 — all represent exactly half.`,
    example: {
      label: "Equivalent fractions for 1/3",
      lines: [
        "1/3 × (2/2) = 2/6",
        "1/3 × (3/3) = 3/9",
        "1/3 × (4/4) = 4/12",
        "// All three are equal!",
      ],
    },
    visual: (
      <div className="p-5 flex flex-col items-center gap-3">
        <p className="text-sm font-semibold" style={{ color: "#9CA3AF" }}>1/2 = 2/4 = 4/8  (same shaded area)</p>
        <EquivBars />
      </div>
    ),
  },
  {
    type: "check",
    question: "Which fraction is equivalent to 2/3?",
    choices: ["8/12", "4/9", "3/4", "6/15"],
    correctIndex: 0,
    explanation: "2/3 × (4/4) = 8/12.  Check: 8 ÷ 4 = 2 and 12 ÷ 4 = 3 — reduces back to 2/3. ✓",
  },
  {
    type: "learn",
    title: "Comparing Fractions",
    body: `To compare fractions with different denominators:
① Find the LCM of the two denominators
② Rewrite both fractions with that denominator
③ Compare the numerators — the bigger numerator wins

With the same denominator, bigger numerator = bigger fraction.`,
    example: {
      label: "Which is bigger: 3/4 or 2/3?",
      lines: [
        "LCM(4, 3) = 12",
        "3/4 = 9/12   (×3/3)",
        "2/3 = 8/12   (×4/4)",
        "9 > 8  →  3/4 > 2/3",
      ],
    },
  },
  {
    type: "check",
    question: "Which fraction is larger: 5/6 or 7/9?",
    choices: ["5/6", "7/9", "They are equal", "Cannot be determined"],
    correctIndex: 0,
    explanation: "LCM(6,9)=18.  5/6 = 15/18 and 7/9 = 14/18.  15 > 14, so 5/6 is larger.",
  },
  {
    type: "learn",
    title: "Adding Fractions — Same Denominator",
    body: `When fractions share the same denominator, add the numerators and keep the denominator. Then simplify.`,
    example: {
      label: "2/9 + 4/9",
      lines: [
        "Same denominator → add numerators:",
        "2/9 + 4/9 = (2 + 4)/9 = 6/9",
        "Simplify — HCF(6, 9) = 3:",
        "6/9 ÷ (3/3) = 2/3",
        "= 2/3",
      ],
    },
    visual: (
      <div className="p-5 flex flex-col items-center gap-3">
        <FractionBar num={6} den={9} color="#F7B035" />
        <p className="text-sm" style={{ color: "#9CA3AF" }}>6/9 simplifies to 2/3</p>
        <FractionBar num={2} den={3} color="#27C07B" />
      </div>
    ),
  },
  {
    type: "check",
    question: "What is 3/7 + 2/7?",
    choices: ["5/7", "5/14", "1/7", "6/7"],
    correctIndex: 0,
    explanation: "Same denominator — add numerators: 3 + 2 = 5. Answer: 5/7.",
  },
  {
    type: "learn",
    title: "Adding Fractions — Different Denominators",
    body: `When denominators differ, you must first rewrite both fractions with a common denominator (use the LCM) before adding.`,
    example: {
      label: "1/4 + 1/6",
      lines: [
        "LCM(4, 6) = 12",
        "1/4 = 3/12   (×3)",
        "1/6 = 2/12   (×2)",
        "3/12 + 2/12 = 5/12",
        "= 5/12",
      ],
    },
  },
  {
    type: "check",
    question: "What is 1/2 + 1/3?",
    choices: ["5/6", "2/5", "2/6", "4/6"],
    correctIndex: 0,
    explanation: "LCM(2,3) = 6.  1/2 = 3/6 and 1/3 = 2/6.  3/6 + 2/6 = 5/6.",
  },
  {
    type: "learn",
    title: "Multiplying and Dividing Fractions",
    body: `Multiply: multiply the numerators together and the denominators together, then simplify.

Divide: use the KCF method:
  K — Keep the first fraction
  C — Change ÷ to ×
  F — Flip the second fraction
Then multiply as normal.`,
    example: {
      label: "Multiply 2/3 × 3/4   |   Divide 3/5 ÷ 2/3",
      lines: [
        "// Multiply:",
        "2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2",
        "",
        "// Divide (KCF):",
        "3/5 ÷ 2/3  →  3/5 × 3/2 = 9/10",
      ],
    },
  },
  {
    type: "check",
    question: "What is 3/4 × 2/9?",
    choices: ["1/6", "6/36", "5/13", "1/4"],
    correctIndex: 0,
    explanation: "3×2=6 and 4×9=36 → 6/36.  HCF(6,36)=6 so 6/36 = 1/6.",
  },
];

export default function FoundationsLesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
