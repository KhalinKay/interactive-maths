"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function LabelledTriangle() {
  return (
    <svg viewBox="0 0 280 200" className="w-full max-w-xs">
      {/* Triangle */}
      <polygon points="40,165 200,165 200,40" fill="#489BFC0A" stroke="#489BFC" strokeWidth="2" />
      {/* Right angle */}
      <rect x="188" y="153" width="12" height="12" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Angle theta */}
      <path d="M 55,165 A 15,15 0 0 1 40,150" fill="none" stroke="#F7B035" strokeWidth="1.5" />
      <text x="60" y="158" fontSize="13" fontWeight="700" fill="#F7B035">θ</text>
      {/* Side labels */}
      <text x="120" y="185" textAnchor="middle" fontSize="12" fontWeight="700" fill="#27C07B">Adjacent (adj)</text>
      <text x="215" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#F05252">Opposite</text>
      <text x="215" y="122" textAnchor="middle" fontSize="10" fill="#F05252">(opp)</text>
      <text x="100" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#489BFC">Hypotenuse (hyp)</text>
    </svg>
  );
}

function SOHCAHTOACard() {
  const ratios = [
    { name: "sin θ", formula: "opp / hyp", color: "#F05252", mnemonic: "SOH" },
    { name: "cos θ", formula: "adj / hyp", color: "#27C07B", mnemonic: "CAH" },
    { name: "tan θ", formula: "opp / adj", color: "#F7B035", mnemonic: "TOA" },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {ratios.map((r) => (
        <div key={r.name} className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ backgroundColor: `${r.color}14`, border: `1px solid ${r.color}30` }}>
          <span className="w-8 text-center font-black text-sm rounded-lg py-0.5" style={{ backgroundColor: r.color, color: "white" }}>{r.mnemonic[0]}</span>
          <span className="font-mono font-bold text-base flex-1" style={{ color: r.color }}>{r.name} =</span>
          <span className="font-mono text-sm font-semibold" style={{ color: "#1A1512" }}>{r.formula}</span>
          <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ backgroundColor: `${r.color}20`, color: r.color }}>{r.mnemonic}</span>
        </div>
      ))}
    </div>
  );
}

function ExactValueTable() {
  const vals = [
    { angle: "0°",  sin: "0",     cos: "1",     tan: "0" },
    { angle: "30°", sin: "1/2",   cos: "√3/2",  tan: "1/√3" },
    { angle: "45°", sin: "√2/2",  cos: "√2/2",  tan: "1" },
    { angle: "60°", sin: "√3/2",  cos: "1/2",   tan: "√3" },
    { angle: "90°", sin: "1",     cos: "0",      tan: "—" },
  ];
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm font-mono rounded-xl overflow-hidden" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#F5EEE6" }}>
            {["Angle", "sin", "cos", "tan"].map(h => (
              <th key={h} className="px-3 py-2 text-center text-xs font-bold uppercase tracking-wider" style={{ color: "#7D7168", border: "1px solid #E2D5C8" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vals.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF8F4" }}>
              <td className="px-3 py-2 text-center font-bold" style={{ color: "#F7B035", border: "1px solid #30363B" }}>{row.angle}</td>
              <td className="px-3 py-2 text-center" style={{ color: "#F05252", border: "1px solid #30363B" }}>{row.sin}</td>
              <td className="px-3 py-2 text-center" style={{ color: "#27C07B", border: "1px solid #30363B" }}>{row.cos}</td>
              <td className="px-3 py-2 text-center" style={{ color: "#489BFC", border: "1px solid #30363B" }}>{row.tan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "Labelling a Right Triangle",
    body: `Trigonometry works with right-angled triangles. The names of the sides depend on which angle you are working with (θ):

  Hypotenuse — longest side, always opposite the right angle
  Opposite   — side directly opposite angle θ
  Adjacent   — side next to angle θ (not the hypotenuse)`,
    visual: (
      <div className="p-4 flex justify-center">
        <LabelledTriangle />
      </div>
    ),
    example: {
      label: "Identifying sides for angle θ",
      lines: [
        "If θ is at bottom-left of the triangle:",
        "  Hypotenuse = longest side (top-right to bottom-left)",
        "  Opposite   = vertical side (right-hand)",
        "  Adjacent   = horizontal side (bottom)",
      ],
    },
  },
  {
    type: "check",
    question: "In a right triangle, which side is always the hypotenuse?",
    choices: [
      "The longest side, opposite the right angle",
      "The side opposite angle θ",
      "The side next to angle θ",
      "The shortest side",
    ],
    correctIndex: 0,
    explanation: "The hypotenuse is always the longest side and is always opposite the right angle, regardless of which angle you pick as θ.",
  },
  {
    type: "learn",
    title: "SOHCAHTOA",
    body: `The three trigonometric ratios connect an angle in a right triangle to two of its sides.

The mnemonic SOHCAHTOA helps you remember all three:
  SOH → sin = Opposite / Hypotenuse
  CAH → cos = Adjacent / Hypotenuse
  TOA → tan = Opposite / Adjacent`,
    visual: (
      <div className="p-4 flex justify-center">
        <SOHCAHTOACard />
      </div>
    ),
    example: {
      label: "Choosing the right ratio",
      lines: [
        "Know opp and want hyp → use sin",
        "Know adj and want hyp → use cos",
        "Know opp and adj      → use tan",
      ],
    },
  },
  {
    type: "check",
    question: "Which trigonometric ratio equals Opposite ÷ Adjacent?",
    choices: ["tan θ", "sin θ", "cos θ", "sec θ"],
    correctIndex: 0,
    explanation: "TOA: tan θ = Opposite / Adjacent.",
  },
  {
    type: "learn",
    title: "Finding a Missing Side",
    body: `To find an unknown side:
① Identify which two sides are involved (known + unknown)
② Choose the correct trig ratio
③ Set up the equation and solve

If the unknown is on top → multiply.  If on the bottom → divide.`,
    example: {
      label: "θ = 35°, hypotenuse = 10 cm. Find the opposite side.",
      lines: [
        "We have: angle θ and hyp, want opp",
        "Use: sin θ = opp / hyp",
        "sin(35°) = opp / 10",
        "opp = 10 × sin(35°)",
        "    = 10 × 0.574 ≈ 5.74 cm",
      ],
    },
  },
  {
    type: "check",
    question: "θ = 30°, hypotenuse = 20. What is the length of the opposite side?",
    choices: ["10", "17.3", "23.1", "11.5"],
    correctIndex: 0,
    explanation: "sin(30°) = opp/20.  opp = 20 × sin(30°) = 20 × 0.5 = 10.",
  },
  {
    type: "learn",
    title: "Finding a Missing Angle",
    body: `To find an unknown angle when you know two sides, use inverse trigonometric functions:

  θ = sin⁻¹(opp / hyp)
  θ = cos⁻¹(adj / hyp)
  θ = tan⁻¹(opp / adj)

On a calculator, these are labelled sin⁻¹, cos⁻¹, tan⁻¹  (or  arcsin, arccos, arctan).`,
    example: {
      label: "opp = 5, hyp = 13. Find angle θ.",
      lines: [
        "sin θ = opp / hyp = 5/13 ≈ 0.3846",
        "θ = sin⁻¹(0.3846)",
        "θ ≈ 22.6°",
      ],
    },
  },
  {
    type: "check",
    question: "tan θ = 1. What is the angle θ?",
    choices: ["45°", "30°", "60°", "90°"],
    correctIndex: 0,
    explanation: "tan⁻¹(1) = 45°, because tan(45°) = 1 (opp = adj in an isosceles right triangle).",
  },
  {
    type: "learn",
    title: "Exact Trigonometric Values",
    body: `For the angles 0°, 30°, 45°, 60°, 90° you should know the exact values without a calculator — they appear constantly in exams.`,
    visual: (
      <div className="p-4">
        <ExactValueTable />
      </div>
    ),
  },
  {
    type: "check",
    question: "What is the exact value of cos(60°)?",
    choices: ["1/2", "√3/2", "√2/2", "1"],
    correctIndex: 0,
    explanation: "From the exact values table: cos(60°) = 1/2.  (sin and cos swap for 30° and 60°.)",
  },
  {
    type: "learn",
    title: "The Sine Rule",
    body: `For any triangle (not just right-angled) with sides a, b, c and opposite angles A, B, C:

    a/sin A = b/sin B = c/sin C

Use the sine rule when you know:
  • Two angles and one side, OR
  • Two sides and a non-included angle`,
    example: {
      label: "Find side b when a=8, A=30°, B=45°",
      lines: [
        "a/sin A = b/sin B",
        "8/sin(30°) = b/sin(45°)",
        "8/0.5 = b/0.707",
        "16 = b/0.707",
        "b = 16 × 0.707 ≈ 11.3",
      ],
    },
  },
  {
    type: "check",
    question: "In a triangle, a = 10, sin A = 0.5, sin B = 0.8. What is b?",
    choices: ["16", "12.5", "6.25", "20"],
    correctIndex: 0,
    explanation: "a/sin A = b/sin B.  10/0.5 = b/0.8.  20 = b/0.8.  b = 20 × 0.8 = 16.",
  },
];

export default function TrigLesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
