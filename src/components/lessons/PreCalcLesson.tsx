"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function FunctionMachine({ input, name, output }: { input: string; name: string; output: string }) {
  return (
    <svg viewBox="0 0 320 100" className="w-full max-w-sm">
      {/* Input label */}
      <text x="30" y="54" textAnchor="middle" fontSize="16" fontWeight="700" fill="#E8ECF0">{input}</text>
      {/* Arrow in */}
      <line x1="55" y1="50" x2="90" y2="50" stroke="#9CA3AF" strokeWidth="2" />
      <polygon points="90,50 82,45 82,55" fill="#9CA3AF" />
      {/* Box */}
      <rect x="90" y="25" width="140" height="50" rx="10" fill="#1E2225" stroke="#489BFC" strokeWidth="2" />
      <text x="160" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#489BFC">f(x)</text>
      <text x="160" y="62" textAnchor="middle" fontSize="13" fontWeight="600" fill="#E8ECF0">{name}</text>
      {/* Arrow out */}
      <line x1="230" y1="50" x2="270" y2="50" stroke="#9CA3AF" strokeWidth="2" />
      <polygon points="270,50 262,45 262,55" fill="#9CA3AF" />
      {/* Output label */}
      <text x="295" y="54" textAnchor="middle" fontSize="16" fontWeight="700" fill="#27C07B">{output}</text>
    </svg>
  );
}

function LimitGraph() {
  const W = 260, H = 180, ox = W / 2, oy = H * 0.6, scale = 30;
  function sx(x: number) { return ox + x * scale; }
  function sy(y: number) { return oy - y * scale; }
  // f(x) = (x²-4)/(x-2) → simplified x+2, with hole at x=2
  const points: string[] = [];
  for (let x = -2.5; x <= 4.5; x += 0.08) {
    if (Math.abs(x - 2) < 0.06) continue; // gap at x=2
    const y = x + 2;
    if (y > -2 && y < 5) points.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  const ticks = [-2, -1, 0, 1, 2, 3, 4];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs">
      {ticks.map(n => (
        <g key={n}>
          <line x1={sx(n)} y1={0} x2={sx(n)} y2={H} stroke="#262C30" strokeWidth="1" />
          <line x1={0} y1={sy(n)} x2={W} y2={sy(n)} stroke="#262C30" strokeWidth="1" />
          <text x={sx(n)} y={oy + 14} textAnchor="middle" fontSize="10" fill="#9CA3AF">{n}</text>
        </g>
      ))}
      <line x1={0} y1={oy} x2={W} y2={oy} stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1={ox} y1={0} x2={ox} y2={H} stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Graph in two parts around the hole */}
      {(() => {
        const left = points.filter(p => parseFloat(p) < sx(2));
        const right = points.filter(p => parseFloat(p) > sx(2));
        return (
          <>
            <polyline points={left.join(" ")} fill="none" stroke="#489BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={right.join(" ")} fill="none" stroke="#489BFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </>
        );
      })()}
      {/* Hole at x=2, y=4 */}
      <circle cx={sx(2)} cy={sy(4)} r={5} fill="#1E2225" stroke="#F05252" strokeWidth="2" />
      {/* Approach arrow label */}
      <text x={sx(2) + 8} y={sy(4) - 10} fontSize="10" fontWeight="700" fill="#F05252">hole at x=2</text>
      <text x={sx(2) + 8} y={sy(4) + 2} fontSize="10" fill="#9CA3AF">limit → 4</text>
    </svg>
  );
}

function VectorDiagram() {
  return (
    <svg viewBox="0 0 220 160" className="w-full max-w-xs">
      {/* Grid */}
      {[0, 1, 2, 3, 4].map(n => (
        <g key={n}>
          <line x1={n * 40 + 20} y1={10} x2={n * 40 + 20} y2={150} stroke="#262C30" strokeWidth="1" />
          <line x1={20} y1={n * 35 + 10} x2={200} y2={n * 35 + 10} stroke="#262C30" strokeWidth="1" />
        </g>
      ))}
      {/* Vector a = (3, 2) */}
      <defs>
        <marker id="v-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#489BFC" />
        </marker>
      </defs>
      <line x1="40" y1="115" x2="160" y2="45" stroke="#489BFC" strokeWidth="2.5" markerEnd="url(#v-arrow)" />
      <text x="105" y="92" fontSize="12" fontWeight="700" fill="#489BFC">a = (3, 2)</text>
      {/* Component lines (dashed) */}
      <line x1="40" y1="115" x2="160" y2="115" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="160" y1="45" x2="160" y2="115" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4,3" />
      <text x="100" y="128" textAnchor="middle" fontSize="11" fill="#9CA3AF">3 →</text>
      <text x="172" y="80" fontSize="11" fill="#9CA3AF">2 ↑</text>
      {/* Magnitude label */}
      <text x="40" y="145" fontSize="11" fill="#27C07B">|a| = √(3²+2²) = √13</text>
    </svg>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "Functions and Notation",
    body: `A function is a rule that assigns exactly one output to each input.

  f(x) = 2x + 1  means "take any input x, double it, then add 1"

To evaluate f(3): substitute 3 everywhere you see x.

Functions can be added, subtracted, multiplied, or composed.`,
    visual: (
      <div className="p-4 flex justify-center">
        <FunctionMachine input="x = 3" name="f(x) = 2x + 1" output="f(3) = 7" />
      </div>
    ),
    example: {
      label: "Evaluate  g(x) = x² − 3  at  x = 4 and x = −2",
      lines: [
        "g(4)  = 4² − 3  = 16 − 3 = 13",
        "g(−2) = (−2)² − 3 = 4 − 3 = 1",
      ],
    },
  },
  {
    type: "check",
    question: "If  f(x) = 3x − 2, what is  f(4)?",
    choices: ["10", "14", "12", "6"],
    correctIndex: 0,
    explanation: "f(4) = 3×4 − 2 = 12 − 2 = 10.",
  },
  {
    type: "learn",
    title: "Domain and Range",
    body: `Domain: the set of all valid input values (x) for a function.
Range: the set of all possible output values f(x).

Some functions have restricted domains:
  • f(x) = √x       → domain: x ≥ 0  (can't take root of negative)
  • f(x) = 1/x      → domain: x ≠ 0  (can't divide by zero)
  • f(x) = log(x)   → domain: x > 0`,
    example: {
      label: "Find the domain and range of  f(x) = √(x − 3)",
      lines: [
        "Need: x − 3 ≥ 0  →  x ≥ 3",
        "Domain: [3, ∞)",
        "When x = 3: f = 0 (minimum)",
        "Range: [0, ∞)",
      ],
    },
  },
  {
    type: "check",
    question: "What is the domain of  f(x) = 1/(x − 4)?",
    choices: ["All real numbers except x = 4", "x > 4", "x ≥ 4", "All real numbers"],
    correctIndex: 0,
    explanation: "The denominator cannot equal zero, so x − 4 ≠ 0, meaning x ≠ 4.",
  },
  {
    type: "learn",
    title: "Composite Functions",
    body: `A composite function applies two functions in sequence: first g, then f.

  (f ∘ g)(x) = f(g(x))

Read right to left: g acts first, then f acts on the result.

Important: f(g(x)) and g(f(x)) are usually different!`,
    example: {
      label: "f(x) = 2x  and  g(x) = x + 3.  Find  f(g(x)) and g(f(x))",
      lines: [
        "f(g(x)) = f(x + 3) = 2(x + 3) = 2x + 6",
        "",
        "g(f(x)) = g(2x) = 2x + 3",
        "// 2x + 6 ≠ 2x + 3  — order matters!",
      ],
    },
  },
  {
    type: "check",
    question: "If  f(x) = x²  and  g(x) = x + 1, what is  f(g(2))?",
    choices: ["9", "5", "4", "7"],
    correctIndex: 0,
    explanation: "First apply g: g(2) = 2 + 1 = 3.  Then apply f: f(3) = 3² = 9.",
  },
  {
    type: "learn",
    title: "Inverse Functions",
    body: `The inverse function f⁻¹(x) reverses the effect of f — it maps outputs back to inputs.

  f(f⁻¹(x)) = x  and  f⁻¹(f(x)) = x

To find f⁻¹:
① Write  y = f(x)
② Swap x and y: write  x = f(y)
③ Solve for y — that's your f⁻¹(x)`,
    example: {
      label: "Find the inverse of  f(x) = 3x + 2",
      lines: [
        "Write:  y = 3x + 2",
        "Swap:   x = 3y + 2",
        "Solve:  3y = x − 2",
        "        y  = (x − 2)/3",
        "∴  f⁻¹(x) = (x − 2)/3",
      ],
    },
  },
  {
    type: "check",
    question: "If  f(x) = x + 7, what is  f⁻¹(x)?",
    choices: ["x − 7", "x + 7", "7 − x", "1/(x + 7)"],
    correctIndex: 0,
    explanation: "Swap x and y: x = y + 7.  Solve: y = x − 7.  So f⁻¹(x) = x − 7.",
  },
  {
    type: "learn",
    title: "Introduction to Limits",
    body: `A limit asks: "what value does f(x) approach as x gets closer and closer to a?"

  lim f(x) = L
  x→a

We don't evaluate AT x = a — we see what the function approaches.

Even if f(a) is undefined (like a 0/0 form), the limit may still exist.`,
    visual: (
      <div className="p-4 flex justify-center">
        <LimitGraph />
      </div>
    ),
    example: {
      label: "Evaluate  lim(x→2)  (x² − 4)/(x − 2)",
      lines: [
        "Factor: (x²−4) = (x+2)(x−2)",
        "(x+2)(x−2)/(x−2) = x + 2  (cancel for x ≠ 2)",
        "lim(x→2) (x + 2) = 2 + 2 = 4",
        "∴ limit = 4  (even though x=2 is undefined in original)",
      ],
    },
  },
  {
    type: "check",
    question: "What is  lim(x→3)  (x² − 9)/(x − 3)?",
    choices: ["6", "0", "9", "Undefined"],
    correctIndex: 0,
    explanation: "Factor: (x²−9) = (x+3)(x−3).  Cancel (x−3): limit = x+3 as x→3 = 3+3 = 6.",
  },
  {
    type: "learn",
    title: "Vectors",
    body: `A vector has both magnitude (size) and direction. It is written as a column vector  (a, b)  or  \u27e8a, b\u27e9.

  Magnitude: |v| = √(a² + b²)
  
  Addition: (a, b) + (c, d) = (a+c, b+d)
  Scalar multiplication: k(a, b) = (ka, kb)`,
    visual: (
      <div className="p-4 flex justify-center">
        <VectorDiagram />
      </div>
    ),
    example: {
      label: "Operations on  a = (3, 4)  and  b = (1, −2)",
      lines: [
        "|a| = √(9 + 16) = √25 = 5",
        "a + b = (3+1, 4+(−2)) = (4, 2)",
        "2a = (6, 8)",
      ],
    },
  },
  {
    type: "check",
    question: "What is the magnitude of vector  (5, 12)?",
    choices: ["13", "17", "7", "60"],
    correctIndex: 0,
    explanation: "|v| = √(5² + 12²) = √(25 + 144) = √169 = 13.",
  },
];

export default function PreCalcLesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
