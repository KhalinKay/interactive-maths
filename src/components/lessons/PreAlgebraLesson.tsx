"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function NumberLine({ highlights }: { highlights: { pos: number; label: string; color: string }[] }) {
  const min = -6, max = 6, W = 420, H = 70;
  const scale = W / (max - min);
  function toX(n: number) { return (n - min) * scale; }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg">
      <line x1={0} y1={35} x2={W} y2={35} stroke="#7D7168" strokeWidth="2" />
      <polygon points={`${W},35 ${W - 7},30 ${W - 7},40`} fill="#7D7168" />
      <polygon points={`0,35 7,30 7,40`} fill="#7D7168" />
      {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(n => (
        <g key={n}>
          <line x1={toX(n)} y1={28} x2={toX(n)} y2={42} stroke={n === 0 ? "#7D7168" : "#D4C8BC"} strokeWidth={n === 0 ? 2 : 1} />
          <text x={toX(n)} y={57} textAnchor="middle" fontSize="11" fill="#9CA3AF">{n}</text>
        </g>
      ))}
      {highlights.map((h, i) => (
        <g key={i}>
          <circle cx={toX(h.pos)} cy={35} r={7} fill={h.color} />
          <text x={toX(h.pos)} y={17} textAnchor="middle" fontSize="11" fontWeight="700" fill={h.color}>{h.label}</text>
        </g>
      ))}
    </svg>
  );
}

function BODMASPyramid() {
  const rows = [
    { letter: "B", full: "Brackets", color: "#489BFC" },
    { letter: "O", full: "Orders (powers & roots)", color: "#A78BFA" },
    { letter: "DM", full: "Division & Multiplication", color: "#27C07B" },
    { letter: "AS", full: "Addition & Subtraction", color: "#F7B035" },
  ];
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-sm">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: `${r.color}14`, border: `1px solid ${r.color}30` }}>
          <span className="w-8 text-center font-black text-base" style={{ color: r.color }}>{r.letter}</span>
          <span className="text-sm font-medium" style={{ color: "#1A1512" }}>{r.full}</span>
          <span className="ml-auto text-xs font-semibold" style={{ color: "#9CA3AF" }}>Step {i + 1}</span>
        </div>
      ))}
      <p className="text-xs text-center mt-1" style={{ color: "#9CA3AF" }}>D&M and A&S have equal priority — work left to right</p>
    </div>
  );
}

function PowerBlock({ base, exp, expansion, result }: { base: number; exp: number; expansion: string; result: number }) {
  return (
    <div className="flex items-center gap-4 px-6 py-5 rounded-2xl w-full justify-center"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2D5C8" }}>
      <div className="text-center">
        <div className="text-4xl font-black" style={{ color: "#1A1512" }}>
          {base}<sup style={{ fontSize: "1.5rem", color: "#F7B035" }}>{exp}</sup>
        </div>
        <div className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{base} to the power {exp}</div>
      </div>
      <div className="text-xl font-bold" style={{ color: "#9CA3AF" }}>=</div>
      <div className="text-center">
        <div className="text-base font-mono font-semibold" style={{ color: "#489BFC" }}>{expansion}</div>
        <div className="text-3xl font-black mt-1" style={{ color: "#27C07B" }}>{result}</div>
      </div>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "Order of Operations — BODMAS",
    body: `When an expression contains multiple operations, BODMAS tells you the order to evaluate them.

Work through each level top-to-bottom. For operations at the same level (e.g. × and ÷), work left to right.

The most common mistake: calculating left-to-right without following BODMAS!`,
    visual: (
      <div className="p-5 flex justify-center">
        <BODMASPyramid />
      </div>
    ),
    example: {
      label: "Calculate  3 + 4 × (10 − 4) ÷ 2",
      lines: [
        "B:  (10 − 4) = 6",
        "→  3 + 4 × 6 ÷ 2",
        "M:  4 × 6 = 24",
        "→  3 + 24 ÷ 2",
        "D:  24 ÷ 2 = 12",
        "→  3 + 12",
        "A:  = 15",
      ],
    },
  },
  {
    type: "check",
    question: "What is 10 − 2 × 3?",
    choices: ["4", "24", "16", "14"],
    correctIndex: 0,
    explanation: "Multiplication before subtraction: 2 × 3 = 6.  Then 10 − 6 = 4.",
  },
  {
    type: "learn",
    title: "Negative Numbers",
    body: `Negative numbers sit to the left of zero on the number line.

Key rules to remember:
  • Adding a negative ≡ subtracting:   5 + (−3) = 5 − 3 = 2
  • Subtracting a negative ≡ adding:   5 − (−3) = 5 + 3 = 8
  • Negative × Negative = Positive
  • Negative × Positive = Negative`,
    example: {
      label: "Operations with negatives",
      lines: [
        "5  + (−3) = 2",
        "5  − (−3) = 8",
        "(−4) × (−2) = +8",
        "(−4) × 3   = −12",
        "(−20) ÷ (−4) = +5",
      ],
    },
    visual: (
      <div className="p-4 flex justify-center">
        <NumberLine highlights={[
          { pos: -4, label: "-4", color: "#F05252" },
          { pos: 0, label: "0", color: "#9CA3AF" },
          { pos: 3, label: "+3", color: "#27C07B" },
        ]} />
      </div>
    ),
  },
  {
    type: "check",
    question: "What is (−6) − (−2)?",
    choices: ["−4", "−8", "4", "8"],
    correctIndex: 0,
    explanation: "Subtracting a negative is the same as adding: −6 − (−2) = −6 + 2 = −4.",
  },
  {
    type: "learn",
    title: "Powers and Exponents",
    body: `An exponent tells you how many times to multiply the base by itself.

  2⁴ = 2 × 2 × 2 × 2 = 16

Special cases worth memorising:
  • n¹ = n  (any number to power 1 is itself)
  • n⁰ = 1  (any non-zero number to power 0 is 1)
  • n⁻¹ = 1/n  (negative exponent means reciprocal)`,
    visual: (
      <div className="p-4">
        <PowerBlock base={2} exp={5} expansion="2×2×2×2×2" result={32} />
      </div>
    ),
    example: {
      label: "Evaluating powers",
      lines: [
        "3² = 9    (3 squared)",
        "3³ = 27   (3 cubed)",
        "4⁴ = 256",
        "10⁰ = 1",
      ],
    },
  },
  {
    type: "check",
    question: "What is 4³?",
    choices: ["64", "12", "256", "48"],
    correctIndex: 0,
    explanation: "4³ = 4 × 4 × 4 = 16 × 4 = 64.",
  },
  {
    type: "learn",
    title: "Square Roots and Cube Roots",
    body: `A square root reverses squaring:    √(n²) = n
A cube root reverses cubing:       ∛(n³) = n

Perfect squares: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225...

For non-perfect squares, estimate by finding the two nearest perfect squares and refining.`,
    example: {
      label: "Evaluating roots",
      lines: [
        "√49  = 7    because 7²  = 49",
        "√144 = 12   because 12² = 144",
        "∛27  = 3    because 3³  = 27",
        "∛125 = 5    because 5³  = 125",
      ],
    },
  },
  {
    type: "check",
    question: "What is √169?",
    choices: ["13", "12", "14", "11"],
    correctIndex: 0,
    explanation: "13² = 169, so √169 = 13.",
  },
  {
    type: "learn",
    title: "Factors and HCF",
    body: `A factor of a number divides into it exactly (no remainder).

The Highest Common Factor (HCF) is the largest number that divides exactly into two or more numbers.

Method: list all factor pairs for each number, identify shared factors, pick the largest.`,
    example: {
      label: "HCF(24, 36)",
      lines: [
        "Factors of 24:  1, 2, 3, 4, 6, 8, 12, 24",
        "Factors of 36:  1, 2, 3, 4, 6, 9, 12, 18, 36",
        "Common factors: 1, 2, 3, 4, 6, 12",
        "∴ HCF(24, 36) = 12",
      ],
    },
  },
  {
    type: "check",
    question: "What is HCF(30, 45)?",
    choices: ["15", "5", "3", "9"],
    correctIndex: 0,
    explanation: "Factors of 30: 1,2,3,5,6,10,15,30. Factors of 45: 1,3,5,9,15,45. Largest common = 15.",
  },
  {
    type: "learn",
    title: "Multiples and LCM",
    body: `A multiple of a number is any number in its times table.

The Lowest Common Multiple (LCM) is the smallest number that is a multiple of two or more numbers.

LCM is especially useful when adding or subtracting fractions — it gives you the common denominator.`,
    example: {
      label: "LCM(6, 8)",
      lines: [
        "Multiples of 6:  6, 12, 18, 24, 30...",
        "Multiples of 8:  8, 16, 24, 32...",
        "First common multiple: 24",
        "∴ LCM(6, 8) = 24",
      ],
    },
  },
  {
    type: "check",
    question: "What is LCM(4, 6)?",
    choices: ["12", "24", "6", "2"],
    correctIndex: 0,
    explanation: "Multiples of 4: 4,8,12... Multiples of 6: 6,12... Smallest common = 12.",
  },
];

export default function PreAlgebraLesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
