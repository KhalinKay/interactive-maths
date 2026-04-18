"use client";
import LessonEngine, { LessonStep } from "@/components/LessonEngine";

// ── SVG Visuals ───────────────────────────────────────────────────────────────

function AngleTypes() {
  const types = [
    { label: "Acute", sub: "0° to 90°", color: "#489BFC", end: [35, 30] },
    { label: "Right", sub: "exactly 90°", color: "#27C07B", end: [0, -45] },
    { label: "Obtuse", sub: "90° to 180°", color: "#F7B035", end: [-40, 20] },
    { label: "Straight", sub: "exactly 180°", color: "#F05252", end: [-50, 0] },
  ];
  const cx = 55, cy = 55;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {types.map((t) => (
        <div key={t.label} className="flex flex-col items-center gap-2 p-3 rounded-xl"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${t.color}40` }}>
          <svg viewBox="0 0 110 90" className="w-20 h-16">
            <line x1={cx} y1={cy} x2={cx + 50} y2={cy} stroke={t.color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={cx + t.end[0]} y2={cy + t.end[1]} stroke={t.color} strokeWidth="2.5" strokeLinecap="round" />
            {t.label === "Right" && <rect x={cx} y={cy - 12} width="12" height="12" fill="none" stroke={t.color} strokeWidth="1.5" />}
          </svg>
          <span className="text-xs font-bold" style={{ color: t.color }}>{t.label}</span>
          <span className="text-xs" style={{ color: "#7D7168" }}>{t.sub}</span>
        </div>
      ))}
    </div>
  );
}

function TriangleAngles() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs">
      <polygon points="120,15 20,145 220,145" fill="#489BFC14" stroke="#489BFC" strokeWidth="2" />
      <text x="120" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#489BFC">60°</text>
      <text x="35" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="#27C07B">70°</text>
      <text x="205" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F7B035">50°</text>
      <text x="120" y="130" textAnchor="middle" fontSize="11" fill="#7D7168">60 + 70 + 50 = 180°</text>
    </svg>
  );
}

function AreaShapes() {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {/* Rectangle */}
      <div className="flex flex-col items-center gap-1 p-3 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2D5C8" }}>
        <svg viewBox="0 0 80 60" className="w-16 h-12">
          <rect x="5" y="10" width="70" height="40" fill="#489BFC18" stroke="#489BFC" strokeWidth="2" />
          <text x="40" y="32" textAnchor="middle" fontSize="9" fill="#7D7168">l × w</text>
        </svg>
        <span className="text-xs font-semibold" style={{ color: "#489BFC" }}>Rectangle</span>
        <span className="text-xs font-mono" style={{ color: "#1A1512" }}>A = l × w</span>
      </div>
      {/* Triangle */}
      <div className="flex flex-col items-center gap-1 p-3 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2D5C8" }}>
        <svg viewBox="0 0 80 60" className="w-16 h-12">
          <polygon points="40,8 5,52 75,52" fill="#27C07B18" stroke="#27C07B" strokeWidth="2" />
          <line x1="40" y1="8" x2="40" y2="52" stroke="#27C07B" strokeWidth="1" strokeDasharray="3,2" />
          <text x="40" y="38" textAnchor="middle" fontSize="8" fill="#7D7168">h</text>
        </svg>
        <span className="text-xs font-semibold" style={{ color: "#27C07B" }}>Triangle</span>
        <span className="text-xs font-mono" style={{ color: "#1A1512" }}>A = ½bh</span>
      </div>
      {/* Circle */}
      <div className="flex flex-col items-center gap-1 p-3 rounded-xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2D5C8" }}>
        <svg viewBox="0 0 80 60" className="w-16 h-12">
          <circle cx="40" cy="30" r="22" fill="#F7B03518" stroke="#F7B035" strokeWidth="2" />
          <line x1="40" y1="30" x2="62" y2="30" stroke="#F7B035" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="52" y="26" fontSize="9" fill="#F7B035">r</text>
        </svg>
        <span className="text-xs font-semibold" style={{ color: "#F7B035" }}>Circle</span>
        <span className="text-xs font-mono" style={{ color: "#1A1512" }}>A = πr²</span>
      </div>
    </div>
  );
}

function PythagorasVis() {
  return (
    <svg viewBox="0 0 260 200" className="w-full max-w-xs">
      {/* Triangle */}
      <polygon points="40,160 160,160 160,40" fill="#489BFC0A" stroke="#489BFC" strokeWidth="2" />
      {/* Right angle marker */}
      <rect x="148" y="148" width="12" height="12" fill="none" stroke="#7D7168" strokeWidth="1.5" />
      {/* Side labels */}
      <text x="100" y="178" textAnchor="middle" fontSize="13" fontWeight="700" fill="#27C07B">b</text>
      <text x="172" y="105" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F7B035">a</text>
      <text x="88" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#489BFC">c</text>
      <text x="88" y="112" textAnchor="middle" fontSize="10" fill="#7D7168">(hyp)</text>
      {/* Formula */}
      <text x="220" y="160" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1A1512">a²+b²=c²</text>
    </svg>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: LessonStep[] = [
  {
    type: "learn",
    title: "Types of Angles",
    body: `An angle measures the amount of turn between two lines meeting at a point.

Key angle facts:
  • Angles on a straight line add to 180°
  • Angles at a point add to 360°
  • Vertically opposite angles are equal`,
    visual: (
      <div className="p-4">
        <AngleTypes />
      </div>
    ),
    example: {
      label: "Angle relationships",
      lines: [
        "Complementary angles add to 90°",
        "Supplementary angles add to 180°",
        "∴ If angle A = 55°, its supplement = 125°",
      ],
    },
  },
  {
    type: "check",
    question: "An angle measures 127°. What type of angle is it?",
    choices: ["Obtuse", "Acute", "Right", "Reflex"],
    correctIndex: 0,
    explanation: "127° is between 90° and 180°, so it is an obtuse angle.",
  },
  {
    type: "learn",
    title: "Angles in Triangles and Polygons",
    body: `The interior angles of any triangle always sum to 180°.

For any polygon with n sides, the interior angle sum is:
  Sum = (n − 2) × 180°

Examples:
  Quadrilateral (4 sides): (4−2)×180 = 360°
  Pentagon (5 sides):       (5−2)×180 = 540°`,
    visual: (
      <div className="p-4 flex justify-center">
        <TriangleAngles />
      </div>
    ),
    example: {
      label: "Find the missing angle",
      lines: [
        "A triangle has angles 45° and 75°.",
        "Sum must = 180°",
        "Missing = 180 − 45 − 75 = 60°",
      ],
    },
  },
  {
    type: "check",
    question: "Two angles of a triangle are 48° and 73°. What is the third angle?",
    choices: ["59°", "49°", "69°", "61°"],
    correctIndex: 0,
    explanation: "180 − 48 − 73 = 59°.",
  },
  {
    type: "learn",
    title: "Area of 2D Shapes",
    body: `Area measures the space inside a 2D shape. Different shapes have different formulas.`,
    visual: (
      <div className="p-4">
        <AreaShapes />
      </div>
    ),
    example: {
      label: "Find the areas",
      lines: [
        "Rectangle 8cm × 5cm:    A = 8 × 5 = 40 cm²",
        "Triangle base 10, h 6:  A = ½ × 10 × 6 = 30 cm²",
        "Circle radius 7:        A = π × 7² ≈ 154 cm²",
      ],
    },
  },
  {
    type: "check",
    question: "What is the area of a triangle with base 12 cm and height 5 cm?",
    choices: ["30 cm²", "60 cm²", "17 cm²", "25 cm²"],
    correctIndex: 0,
    explanation: "A = ½ × base × height = ½ × 12 × 5 = 30 cm².",
  },
  {
    type: "learn",
    title: "Pythagoras' Theorem",
    body: `In a right-angled triangle:  a² + b² = c²

where c is the hypotenuse (the longest side, opposite the right angle).

To find the hypotenuse:   c = √(a² + b²)
To find a shorter side:   a = √(c² − b²)`,
    visual: (
      <div className="p-4 flex justify-center">
        <PythagorasVis />
      </div>
    ),
    example: {
      label: "Find the hypotenuse when a = 5, b = 12",
      lines: [
        "c² = 5² + 12²",
        "   = 25 + 144 = 169",
        "c  = √169 = 13",
      ],
    },
  },
  {
    type: "check",
    question: "A right triangle has legs of length 6 and 8. What is the hypotenuse?",
    choices: ["10", "14", "12", "100"],
    correctIndex: 0,
    explanation: "c² = 6² + 8² = 36 + 64 = 100.  c = √100 = 10.",
  },
  {
    type: "learn",
    title: "Volume of 3D Shapes",
    body: `Volume measures the space inside a 3D object.

  Cuboid:    V = length × width × height
  Cylinder:  V = π × r² × height
  Prism:     V = cross-section area × length

Units are always cubed (e.g. cm³).`,
    example: {
      label: "Find volumes",
      lines: [
        "Cuboid 4×3×5:      V = 4 × 3 × 5 = 60 cm³",
        "Cylinder r=3, h=8: V = π × 9 × 8 ≈ 226.2 cm³",
      ],
    },
  },
  {
    type: "check",
    question: "What is the volume of a cuboid with dimensions 5 cm × 4 cm × 6 cm?",
    choices: ["120 cm³", "60 cm³", "148 cm³", "96 cm³"],
    correctIndex: 0,
    explanation: "V = 5 × 4 × 6 = 120 cm³.",
  },
  {
    type: "learn",
    title: "Perimeter and Circumference",
    body: `Perimeter = total length around the outside of a 2D shape (add all sides).

Circumference of a circle:
  C = 2πr  or equivalently  C = πd  (where d = diameter = 2r)

π ≈ 3.14159...  or use the π button on your calculator for full precision.`,
    example: {
      label: "Find circumferences",
      lines: [
        "Circle radius 5:      C = 2π × 5 = 10π ≈ 31.4 cm",
        "Circle diameter 14:   C = π × 14 ≈ 44.0 cm",
      ],
    },
  },
  {
    type: "check",
    question: "What is the circumference of a circle with radius 6 cm? (Use π ≈ 3.14)",
    choices: ["37.68 cm", "18.84 cm", "113.04 cm", "28.26 cm"],
    correctIndex: 0,
    explanation: "C = 2πr = 2 × 3.14 × 6 = 37.68 cm.",
  },
];

export default function GeometryLesson({ onQuiz }: { onQuiz: () => void }) {
  return <LessonEngine steps={STEPS} onComplete={onQuiz} />;
}
