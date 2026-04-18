"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Mafs,
  Coordinates,
  Polygon,
  Line,
  Text,
  useMovablePoint,
  Theme,
  vec,
} from "mafs";
import confetti from "canvas-confetti";
import { CheckCircle2, Lightbulb, RotateCcw, Trophy } from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Snap a value to the nearest integer when within 0.18 units */
function snapToInt(v: number): number {
  const rounded = Math.round(v);
  return Math.abs(v - rounded) < 0.18 ? rounded : v;
}

/** Compute the four corners of the square built on segment AB, on the outside */
function squareOnSegment(
  a: [number, number],
  b: [number, number],
  outward: [number, number]
): [number, number][] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  // perpendicular pointing outward (dot with outward > 0 → flip if needed)
  let px = -dy;
  let py = dx;
  const dot = px * outward[0] + py * outward[1];
  if (dot < 0) { px = -px; py = -py; }
  return [
    a,
    b,
    [b[0] + px, b[1] + py],
    [a[0] + px, a[1] + py],
  ];
}

/** Format a float to one decimal */
const fmt1 = (n: number) => n.toFixed(1);

// ── Draggable Mafs scene ──────────────────────────────────────────────────────

function PythagorasScene({
  onUpdate,
}: {
  onUpdate: (a: number, b: number, c: number) => void;
}) {
  const vertex = useMovablePoint([3, 4], {
    color: Theme.indigo,
    constrain: ([px, py]) => [
      snapToInt(Math.max(0.5, px)),
      snapToInt(Math.max(0.5, py)),
    ],
  });

  const [x, y] = vertex.point;
  const c = Math.sqrt(x * x + y * y);

  // Report values upward so parent can react
  useEffect(() => {
    onUpdate(x, y, c);
  }, [x, y, c, onUpdate]);

  // Triangle vertices
  const O: [number, number] = [0, 0];
  const A: [number, number] = [x, 0];
  const B: [number, number] = [0, y];

  // Square on side a (horizontal, below the x-axis)
  const squareA = squareOnSegment(O, A, [0, -1]);

  // Square on side b (vertical, to the left of the y-axis)
  const squareB = squareOnSegment(B, O, [-1, 0]);

  // Square on hypotenuse (outward from triangle centre, i.e. away from origin)
  const squareC = squareOnSegment(A, B, [x / 2, y / 2]);

  return (
    <Mafs
      viewBox={{ x: [-3, x + 2], y: [-3, y + 2] }}
      preserveAspectRatio={false}
      pan={false}
      zoom={false}
    >
      <Coordinates.Cartesian
        xAxis={{ lines: 1, labels: (n) => `${n}` }}
        yAxis={{ lines: 1, labels: (n) => `${n}` }}
      />

      {/* ── Semi-transparent squares ── */}
      <Polygon
        points={squareA as [number, number][]}
        color="#F7B035"
        fillOpacity={0.15}
        strokeStyle="dashed"
      />
      <Polygon
        points={squareB as [number, number][]}
        color="#27C07B"
        fillOpacity={0.15}
        strokeStyle="dashed"
      />
      <Polygon
        points={squareC as [number, number][]}
        color="#489BFC"
        fillOpacity={0.15}
        strokeStyle="dashed"
      />

      {/* ── Triangle ── */}
      <Polygon
        points={[O, A, B]}
        color="#489BFC"
        fillOpacity={0.25}
      />

      {/* ── Side labels ── */}
      <Text x={x / 2} y={-0.6} attach="n" color="#F7B035" size={18}>
        a = {fmt1(x)}
      </Text>
      <Text x={-0.65} y={y / 2} attach="e" color="#27C07B" size={18}>
        b = {fmt1(y)}
      </Text>
      <Text
        x={(x + 0) / 2 + 0.3}
        y={(0 + y) / 2 + 0.3}
        attach="n"
        color="#489BFC"
        size={18}
      >
        c = {c.toFixed(2)}
      </Text>

      {/* ── Area labels inside squares ── */}
      <Text
        x={(squareA[0][0] + squareA[2][0]) / 2}
        y={(squareA[0][1] + squareA[2][1]) / 2}
        color="#F7B035"
        size={14}
      >
        a² = {(x * x).toFixed(1)}
      </Text>
      <Text
        x={(squareB[0][0] + squareB[2][0]) / 2}
        y={(squareB[0][1] + squareB[2][1]) / 2}
        color="#27C07B"
        size={14}
      >
        b² = {(y * y).toFixed(1)}
      </Text>
      <Text
        x={(squareC[0][0] + squareC[2][0]) / 2}
        y={(squareC[0][1] + squareC[2][1]) / 2}
        color="#489BFC"
        size={14}
      >
        c² = {(c * c).toFixed(1)}
      </Text>

      {/* ── Draggable point ── */}
      {vertex.element}
    </Mafs>
  );
}

// ── Lesson steps ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    title: "The Right Triangle",
    body: (
      <>
        Drag the <span className="text-[#489BFC] font-semibold">blue point</span> to reshape the triangle. Notice the three coloured squares growing and shrinking around it.
      </>
    ),
    goal: null,
  },
  {
    id: 2,
    title: "The Pattern",
    body: (
      <>
        Look at the <span className="text-[#F7B035] font-semibold">amber</span> square (a²) and the <span className="text-[#27C07B] font-semibold">green</span> square (b²). Add them together mentally — does the result equal the <span className="text-[#489BFC] font-semibold">blue</span> c²?
      </>
    ),
    goal: null,
  },
  {
    id: 3,
    title: "Prove It: The 3-4-5 Triangle",
    body: (
      <>
        Set <span className="text-[#F7B035] font-semibold">a&nbsp;=&nbsp;3</span> and <span className="text-[#27C07B] font-semibold">b&nbsp;=&nbsp;4</span> to make a classic integer right triangle. The hypotenuse should snap to exactly&nbsp;
        <span className="text-[#489BFC] font-semibold font-mono">5.00</span>. 🎯
      </>
    ),
    goal: 5.0,
  },
];

// ── Main exported component ───────────────────────────────────────────────────

export default function PythagorasLesson() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(5);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const confettiFiredRef = useRef(false);

  const handleUpdate = useCallback((newA: number, newB: number, newC: number) => {
    setA(newA);
    setB(newB);
    setC(newC);
  }, []);

  const currentStep = STEPS[step];
  const goalMet = currentStep.goal !== null && Math.abs(c - currentStep.goal) < 0.05;

  useEffect(() => {
    if (goalMet && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#489BFC", "#27C07B", "#F7B035"],
      });
      setTimeout(() => setCompleted(true), 600);
    }
    if (!goalMet) {
      confettiFiredRef.current = false;
      setCompleted(false);
    }
  }, [goalMet]);

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      {/* ── Progress bar ── */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                i < step
                  ? "bg-[#27C07B]"
                  : i === step
                  ? "bg-[#489BFC]"
                  : "bg-[#30363B]"
              }`}
            />
            {i < STEPS.length - 1 && (
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  i < step ? "bg-[#27C07B]" : "bg-[#30363B]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Lesson card ── */}
      <div className="bg-[#1E2225] border border-[#30363B] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363B] flex items-center justify-between">
          <div>
            <p className="text-[#9CA3AF] text-xs font-medium uppercase tracking-widest mb-1">
              Step {step + 1} of {STEPS.length}
            </p>
            <h2 className="text-[#E8ECF0] text-xl font-bold">{currentStep.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-[#9CA3AF] text-sm font-mono bg-[#262C30] px-3 py-1.5 rounded-lg border border-[#30363B]">
            <span className="text-[#F7B035]">a²</span>
            <span className="text-[#9CA3AF]">+</span>
            <span className="text-[#27C07B]">b²</span>
            <span className="text-[#9CA3AF]">=</span>
            <span className="text-[#489BFC]">c²</span>
          </div>
        </div>

        {/* Mafs canvas */}
        <div className="bg-[#1a1f22] px-2 py-2">
          <PythagorasScene onUpdate={handleUpdate} />
        </div>

        {/* Live equation strip */}
        <div className="px-6 py-3 bg-[#262C30] border-y border-[#30363B] flex items-center justify-center gap-4 font-mono text-lg">
          <span>
            <span className="text-[#F7B035] font-bold">{(a * a).toFixed(1)}</span>
            <span className="text-[#9CA3AF] text-sm ml-1">({fmt1(a)}²)</span>
          </span>
          <span className="text-[#9CA3AF]">+</span>
          <span>
            <span className="text-[#27C07B] font-bold">{(b * b).toFixed(1)}</span>
            <span className="text-[#9CA3AF] text-sm ml-1">({fmt1(b)}²)</span>
          </span>
          <span className="text-[#9CA3AF]">=</span>
          <span>
            <span
              className={`font-bold transition-colors duration-300 ${
                goalMet ? "text-[#27C07B]" : "text-[#489BFC]"
              }`}
            >
              {(c * c).toFixed(1)}
            </span>
            <span className="text-[#9CA3AF] text-sm ml-1">({c.toFixed(2)}²)</span>
          </span>
        </div>

        {/* Narration / goal area */}
        <div className="px-6 py-5 flex flex-col gap-4">
          <p className="text-[#9CA3AF] text-base leading-relaxed">{currentStep.body}</p>

          {/* Hint */}
          {currentStep.goal !== null && (
            <div>
              <button
                onClick={() => setShowHint((h) => !h)}
                className="flex items-center gap-2 text-[#F7B035] text-sm font-medium hover:text-[#ffc855] transition-colors"
              >
                <Lightbulb size={16} />
                {showHint ? "Hide hint" : "Show hint"}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-[#262C30] border border-[#F7B035]/30 rounded-xl text-[#F7B035] text-sm">
                  Drag the point until it snaps to <strong>x&nbsp;=&nbsp;3</strong> (right) and <strong>y&nbsp;=&nbsp;4</strong> (up). You'll feel it click into place!
                </div>
              )}
            </div>
          )}

          {/* Success banner */}
          {goalMet && (
            <div className="flex items-center gap-3 p-4 bg-[#27C07B]/10 border border-[#27C07B]/40 rounded-xl animate-pulse">
              <CheckCircle2 size={22} className="text-[#27C07B] shrink-0" />
              <div>
                <p className="text-[#27C07B] font-semibold">
                  {isLastStep ? "Lesson complete! 🏆" : "Correct!"}
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  {fmt1(a)}² + {fmt1(b)}² = {(a * a + b * b).toFixed(0)} = {c.toFixed(0)}²
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={step === 0}
              onClick={() => { setStep((s) => s - 1); setShowHint(false); }}
              className="flex items-center gap-2 text-[#9CA3AF] text-sm disabled:opacity-30 hover:text-[#E8ECF0] transition-colors"
            >
              <RotateCcw size={14} />
              Back
            </button>

            {!isLastStep ? (
              <button
                onClick={() => { setStep((s) => s + 1); setShowHint(false); setCompleted(false); }}
                className="px-6 py-2.5 bg-[#489BFC] hover:bg-[#5ea8fd] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#489BFC]/20 active:scale-95"
              >
                Next →
              </button>
            ) : completed ? (
              <div className="flex items-center gap-2 px-6 py-2.5 bg-[#27C07B]/20 border border-[#27C07B]/40 text-[#27C07B] font-semibold rounded-xl">
                <Trophy size={16} />
                Mastered!
              </div>
            ) : (
              <button
                disabled
                className="px-6 py-2.5 bg-[#30363B] text-[#9CA3AF] font-semibold rounded-xl cursor-not-allowed opacity-60"
              >
                Reach the goal →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Formula reference ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Side a", value: fmt1(a), color: "#F7B035", area: (a * a).toFixed(1) },
          { label: "Side b", value: fmt1(b), color: "#27C07B", area: (b * b).toFixed(1) },
          { label: "Hypotenuse c", value: c.toFixed(2), color: "#489BFC", area: (c * c).toFixed(1) },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#1E2225] border border-[#30363B] rounded-xl p-4 flex flex-col gap-1"
          >
            <span className="text-[#9CA3AF] text-xs uppercase tracking-wider">{item.label}</span>
            <span className="font-mono text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </span>
            <span className="text-[#9CA3AF] text-xs font-mono">Area of square: {item.area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
