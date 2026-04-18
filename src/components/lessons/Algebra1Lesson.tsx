"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function BalanceScale({ left, right }: { left: string; right: string }) {
  return (
    <svg viewBox="0 0 300 160" className="w-full max-w-xs">
      {/* Fulcrum */}
      <polygon points="150,148 167,120 133,120" fill="#9CA3AF" />
      {/* Stand */}
      <line x1="150" y1="148" x2="150" y2="160" stroke="#9CA3AF" strokeWidth="4" />
      {/* Beam */}
      <line x1="50" y1="90" x2="250" y2="90" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
      {/* Hanging rods */}
      <line x1="80" y1="90" x2="80" y2="108" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="220" y1="90" x2="220" y2="108" stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Left pan */}
      <rect x="38" y="108" width="84" height="34" rx="6" fill="#262C30" stroke="#489BFC" strokeWidth="1.5" />
      <text x="80" y="128" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="700" fill="#489BFC">{left}</text>
      {/* Right pan */}
      <rect x="178" y="108" width="84" height="34" rx="6" fill="#262C30" stroke="#27C07B" strokeWidth="1.5" />
      <text x="220" y="128" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="700" fill="#27C07B">{right}</text>
      {/* Equals */}
      <text x="150" y="70" textAnchor="middle" fontSize="18" fontWeight="800" fill="#9CA3AF">=</text>
    </svg>
  );
}

function LineGraph({ m, c, label }: { m: number; c: number; label: string }) {
  const W = 260, H = 200, ox = W / 2, oy = H / 2, scale = 28;
  function sx(x: number) { return ox + x * scale; }
  function sy(y: number) { return oy - y * scale; }
  const ticks = [-3, -2, -1, 0, 1, 2, 3];
  const x1 = -3, y1 = m * x1 + c, x2 = 3, y2 = m * x2 + c;
  const cx2 = sx(x2), cy2 = sy(y2), cx1 = sx(x1), cy1 = sy(y1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs">
      {/* Grid */}
      {ticks.map(n => (
        <g key={n}>
          <line x1={sx(n)} y1={0} x2={sx(n)} y2={H} stroke="#262C30" strokeWidth="1" />
          <line x1={0} y1={sy(n)} x2={W} y2={sy(n)} stroke="#262C30" strokeWidth="1" />
        </g>
      ))}
      {/* Axes */}
      <line x1={0} y1={oy} x2={W} y2={oy} stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1={ox} y1={0} x2={ox} y2={H} stroke="#9CA3AF" strokeWidth="1.5" />
      <text x={W - 6} y={oy - 8} fontSize="12" fill="#9CA3AF">x</text>
      <text x={ox + 6} y={14} fontSize="12" fill="#9CA3AF">y</text>
      {/* Line */}
      <line x1={cx1} y1={cy1} x2={cx2} y2={cy2} stroke="#489BFC" strokeWidth="2.5" strokeLinecap="round" />
      {/* Equation label */}
      <text x={cx2 - 6} y={cy2 - 8} textAnchor="end" fontSize="12" fontWeight="700" fill="#489BFC">{label}</text>
      {/* y-intercept dot */}
      <circle cx={ox} cy={sy(c)} r={4} fill="#F7B035" />
    </svg>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "Variables and Expressions",
    body: `A variable (like x or y) represents an unknown quantity. An expression combines variables, numbers, and operations.

Like terms have the same variable part and can be combined:
  3x + 2x = 5x     ← same variable x
  4x + 3y         ← different variables, cannot combine

Coefficients are the numbers in front of variables: in 7x, the coefficient is 7.`,
    example: {
      label: "Simplify  5x + 2y − 2x + 4y",
      lines: [
        "Group like terms:",
        "x terms:  5x − 2x = 3x",
        "y terms:  2y + 4y = 6y",
        "= 3x + 6y",
      ],
    },
  },
  {
    type: "check",
    question: "Simplify  4x + 2y − x + 5y",
    choices: ["3x + 7y", "3x + 3y", "5x + 7y", "4x + 7y"],
    correctIndex: 0,
    explanation: "x terms: 4x − x = 3x.  y terms: 2y + 5y = 7y.  Answer: 3x + 7y.",
  },
  {
    type: "learn",
    title: "Solving One-Step Equations",
    body: `An equation is a balance — both sides are equal. To solve, isolate the variable by performing the same operation on both sides.

Think of it as a scales: whatever you do to one side, you must do to the other to keep it balanced.`,
    visual: (
      <div className="p-4 flex justify-center">
        <BalanceScale left="x + 4" right="11" />
      </div>
    ),
    example: {
      label: "Solve  x + 4 = 11",
      lines: [
        "Subtract 4 from both sides:",
        "x + 4 − 4 = 11 − 4",
        "x = 7",
        "// Check: 7 + 4 = 11 ✓",
      ],
    },
  },
  {
    type: "check",
    question: "Solve  3x = 18",
    choices: ["x = 6", "x = 15", "x = 21", "x = 54"],
    correctIndex: 0,
    explanation: "Divide both sides by 3: x = 18 ÷ 3 = 6.  Check: 3 × 6 = 18 ✓",
  },
  {
    type: "learn",
    title: "Solving Two-Step Equations",
    body: `For equations like 2x + 5 = 13, reverse the operations in reverse BODMAS order:
① Undo addition/subtraction first
② Then undo multiplication/division`,
    example: {
      label: "Solve  4x − 3 = 13",
      lines: [
        "Step 1 — undo subtraction:",
        "4x − 3 + 3 = 13 + 3",
        "4x = 16",
        "Step 2 — undo multiplication:",
        "4x ÷ 4 = 16 ÷ 4",
        "x = 4",
        "// Check: 4×4 − 3 = 16 − 3 = 13 ✓",
      ],
    },
  },
  {
    type: "check",
    question: "Solve  5x + 2 = 27",
    choices: ["x = 5", "x = 6", "x = 4", "x = 7"],
    correctIndex: 0,
    explanation: "5x = 27 − 2 = 25.  x = 25 ÷ 5 = 5.  Check: 5×5+2 = 27 ✓",
  },
  {
    type: "learn",
    title: "Expanding Brackets",
    body: `Expanding means removing brackets using the distributive law:

  a(b + c) = ab + ac

Multiply EVERY term inside the bracket by the term outside. Be careful with signs!`,
    example: {
      label: "Expand  3(2x − 5)  and  −2(x + 4)",
      lines: [
        "3(2x − 5) = 3×2x + 3×(−5)",
        "          = 6x − 15",
        "",
        "−2(x + 4) = (−2)×x + (−2)×4",
        "          = −2x − 8",
      ],
    },
  },
  {
    type: "check",
    question: "Expand  4(3x − 2)",
    choices: ["12x − 8", "12x + 8", "7x − 6", "12x − 2"],
    correctIndex: 0,
    explanation: "4 × 3x = 12x and 4 × (−2) = −8.  Answer: 12x − 8.",
  },
  {
    type: "learn",
    title: "Factorising",
    body: `Factorising is the reverse of expanding — you find the common factor and put it outside the bracket.

Steps:
① Find the HCF of all the terms
② Divide each term by the HCF
③ Write: HCF(result 1 + result 2 + ...)`,
    example: {
      label: "Factorise  6x + 9  and  12x − 8",
      lines: [
        "6x + 9:  HCF(6, 9) = 3",
        "→ 3(2x + 3)",
        "",
        "12x − 8:  HCF(12, 8) = 4",
        "→ 4(3x − 2)",
      ],
    },
  },
  {
    type: "check",
    question: "Factorise  15x − 10",
    choices: ["5(3x − 2)", "5(3x − 10)", "3(5x − 2)", "10(x − 5)"],
    correctIndex: 0,
    explanation: "HCF(15, 10) = 5.  15x ÷ 5 = 3x and 10 ÷ 5 = 2.  Answer: 5(3x − 2).",
  },
  {
    type: "learn",
    title: "Straight-Line Graphs — y = mx + c",
    body: `Every straight line can be written as  y = mx + c  where:
  m = gradient (steepness and direction)
  c = y-intercept (where the line crosses the y-axis)

Positive m → line goes up left-to-right
Negative m → line goes down left-to-right
Steeper line → larger |m|`,
    visual: (
      <div className="p-4 flex justify-center">
        <LineGraph m={2} c={1} label="y = 2x + 1" />
      </div>
    ),
    example: {
      label: "Identify m and c for  y = −3x + 4",
      lines: [
        "Compare with y = mx + c:",
        "m = −3  (steep, going downward)",
        "c = 4   (crosses y-axis at 4)",
      ],
    },
  },
  {
    type: "check",
    question: "What is the gradient of the line  y = 5x − 7?",
    choices: ["5", "−7", "−5", "7"],
    correctIndex: 0,
    explanation: "In y = mx + c, m is the coefficient of x.  Here m = 5.  The −7 is the y-intercept.",
  },
];

export default function Algebra1Lesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
