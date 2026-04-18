"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function Parabola({ a = 1, h = 0, k = 0, label }: { a?: number; h?: number; k?: number; label: string }) {
  const W = 260, H = 200, ox = W / 2, oy = H * 0.7, scale = 28;
  function sx(x: number) { return ox + x * scale; }
  function sy(y: number) { return oy - y * scale; }
  const points: string[] = [];
  for (let x = -3.5; x <= 3.5; x += 0.1) {
    const y = a * (x - h) ** 2 + k;
    if (y > -3 && y < 5) points.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  const ticks = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs">
      {ticks.map(n => (
        <g key={n}>
          <line x1={sx(n)} y1={0} x2={sx(n)} y2={H} stroke="#E2D5C8" strokeWidth="1" />
          <line x1={0} y1={sy(n)} x2={W} y2={sy(n)} stroke="#E2D5C8" strokeWidth="1" />
        </g>
      ))}
      <line x1={0} y1={oy} x2={W} y2={oy} stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1={ox} y1={0} x2={ox} y2={H} stroke="#9CA3AF" strokeWidth="1.5" />
      <text x={W - 6} y={oy - 8} fontSize="11" fill="#9CA3AF">x</text>
      <text x={ox + 5} y={13} fontSize="11" fill="#9CA3AF">y</text>
      {points.length > 2 && (
        <polyline points={points.join(" ")} fill="none" stroke="#489BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      <text x={sx(h + 1.6)} y={sy(k + 0.5)} fontSize="11" fontWeight="700" fill="#489BFC">{label}</text>
      {/* Vertex dot */}
      <circle cx={sx(h)} cy={sy(k)} r={4} fill="#F7B035" />
    </svg>
  );
}

function IndexLawTable() {
  const laws = [
    { law: "aᵐ × aⁿ", result: "aᵐ⁺ⁿ", example: "x³ × x⁴ = x⁷" },
    { law: "aᵐ ÷ aⁿ", result: "aᵐ⁻ⁿ", example: "x⁶ ÷ x² = x⁴" },
    { law: "(aᵐ)ⁿ", result: "aᵐⁿ", example: "(x²)³ = x⁶" },
    { law: "a⁰", result: "1", example: "5⁰ = 1" },
    { law: "a⁻ⁿ", result: "1/aⁿ", example: "2⁻³ = 1/8" },
  ];
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {laws.map((l, i) => (
        <div key={i} className="grid grid-cols-3 items-center px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2D5C8" }}>
          <span className="font-mono text-sm font-bold" style={{ color: "#489BFC" }}>{l.law}</span>
          <span className="font-mono text-sm text-center font-bold" style={{ color: "#27C07B" }}>= {l.result}</span>
          <span className="font-mono text-xs text-right" style={{ color: "#9CA3AF" }}>{l.example}</span>
        </div>
      ))}
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "Expanding Double Brackets",
    body: `A quadratic expression like (x + 2)(x + 3) can be expanded using FOIL:
  F — First terms:  x × x = x²
  O — Outer terms: x × 3 = 3x
  I — Inner terms:  2 × x = 2x
  L — Last terms:   2 × 3 = 6

Then collect like terms.`,
    example: {
      label: "Expand  (x + 2)(x + 3)  and  (x − 4)(x + 1)",
      lines: [
        "(x+2)(x+3) = x² + 3x + 2x + 6",
        "           = x² + 5x + 6",
        "",
        "(x−4)(x+1) = x² + x − 4x − 4",
        "           = x² − 3x − 4",
      ],
    },
    visual: (
      <div className="p-4 flex justify-center">
        <Parabola a={1} h={-2.5} k={-0.25} label="y = (x+2)(x+3)" />
      </div>
    ),
  },
  {
    type: "check",
    question: "Expand  (x + 5)(x − 2)",
    choices: ["x² + 3x − 10", "x² − 3x − 10", "x² + 3x + 10", "x² − 10"],
    correctIndex: 0,
    explanation: "FOIL: x² − 2x + 5x − 10 = x² + 3x − 10.",
  },
  {
    type: "learn",
    title: "Factorising Quadratics",
    body: `Factorising x² + bx + c means writing it as (x + p)(x + q) where:
  p + q = b   (sum equals the middle coefficient)
  p × q = c   (product equals the constant)

Look for two numbers that multiply to c and add to b.`,
    example: {
      label: "Factorise  x² + 7x + 12",
      lines: [
        "Need two numbers that:",
        "  multiply to 12: 1×12, 2×6, 3×4...",
        "  add to 7:       3 + 4 = 7 ✓",
        "= (x + 3)(x + 4)",
        "// Check: (x+3)(x+4) = x²+4x+3x+12 = x²+7x+12 ✓",
      ],
    },
  },
  {
    type: "check",
    question: "Factorise  x² − 5x + 6",
    choices: ["(x − 2)(x − 3)", "(x + 2)(x + 3)", "(x − 1)(x − 6)", "(x − 6)(x + 1)"],
    correctIndex: 0,
    explanation: "Need two numbers multiplying to +6 and adding to −5.  That's −2 and −3.  Answer: (x−2)(x−3).",
  },
  {
    type: "learn",
    title: "Solving Quadratic Equations",
    body: `To solve ax² + bx + c = 0 by factorising:
① Factorise the left side
② Set each bracket equal to zero (Zero Product Property)
③ Solve each linear equation

If one bracket equals zero, the whole product equals zero.`,
    example: {
      label: "Solve  x² − 7x + 12 = 0",
      lines: [
        "Factorise: (x − 3)(x − 4) = 0",
        "Either:  x − 3 = 0  →  x = 3",
        "Or:      x − 4 = 0  →  x = 4",
        "Solutions: x = 3  or  x = 4",
      ],
    },
  },
  {
    type: "check",
    question: "Solve  x² + x − 6 = 0",
    choices: ["x = 2 or x = −3", "x = −2 or x = 3", "x = 2 or x = 3", "x = 1 or x = −6"],
    correctIndex: 0,
    explanation: "Factorise: (x + 3)(x − 2) = 0.  So x = −3 or x = 2.",
  },
  {
    type: "learn",
    title: "The Quadratic Formula",
    body: `For any quadratic ax² + bx + c = 0, the solutions are:

       −b ± √(b² − 4ac)
  x = ─────────────────
              2a

The discriminant Δ = b² − 4ac tells you how many real solutions exist:
  Δ > 0  →  two distinct real solutions
  Δ = 0  →  one repeated solution
  Δ < 0  →  no real solutions`,
    example: {
      label: "Solve  2x² − 5x + 2 = 0",
      lines: [
        "a=2, b=−5, c=2",
        "Δ = (−5)² − 4×2×2 = 25 − 16 = 9",
        "x = (5 ± √9) / 4 = (5 ± 3) / 4",
        "x = 8/4 = 2  or  x = 2/4 = 1/2",
      ],
    },
  },
  {
    type: "check",
    question: "How many real solutions does  x² − 4x + 5 = 0  have? (Hint: find the discriminant)",
    choices: ["No real solutions", "One solution", "Two solutions", "Infinite solutions"],
    correctIndex: 0,
    explanation: "Δ = (−4)² − 4×1×5 = 16 − 20 = −4.  Since Δ < 0, there are no real solutions.",
  },
  {
    type: "learn",
    title: "Index Laws",
    body: `Index laws let you simplify expressions involving powers of the same base.`,
    visual: (
      <div className="p-4">
        <IndexLawTable />
      </div>
    ),
    example: {
      label: "Simplify using index laws",
      lines: [
        "x⁵ × x³ = x⁸          (add powers)",
        "y⁸ ÷ y³ = y⁵          (subtract powers)",
        "(z²)⁴  = z⁸          (multiply powers)",
        "3⁻² = 1/9             (negative power)",
      ],
    },
  },
  {
    type: "check",
    question: "Simplify  x⁵ × x⁻²",
    choices: ["x³", "x⁷", "x¹⁰", "x⁻¹⁰"],
    correctIndex: 0,
    explanation: "Add the exponents: 5 + (−2) = 3.  Answer: x³.",
  },
  {
    type: "learn",
    title: "Introduction to Logarithms",
    body: `A logarithm is the inverse of an exponential.

  log_a(b) = c  means  a^c = b

In words: "log base a of b equals c" means "a raised to c gives b."

Common bases:
  log₁₀ = "log" on most calculators
  log_e = ln = natural logarithm`,
    example: {
      label: "Evaluating logarithms",
      lines: [
        "log₂(8)   = 3    because  2³ = 8",
        "log₁₀(100) = 2   because  10² = 100",
        "log₃(81)  = 4    because  3⁴ = 81",
        "log₅(1)   = 0    because  5⁰ = 1",
      ],
    },
  },
  {
    type: "check",
    question: "What is  log₂(64)?",
    choices: ["6", "8", "32", "4"],
    correctIndex: 0,
    explanation: "2⁶ = 64, so log₂(64) = 6.",
  },
];

export default function Algebra2Lesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
