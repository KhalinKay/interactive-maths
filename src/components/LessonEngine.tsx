"use client";

/**
 * LessonEngine — generic step-based lesson player.
 *
 * Each step can be:
 *   • "learn"  — a concept card with explanation + worked example
 *   • "check"  — a single MC question (inline, no navigation until answered)
 *
 * After all steps the caller's onComplete() fires so the page can show the quiz.
 */

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from "lucide-react";

// ── Public types ──────────────────────────────────────────────────────────────

export interface LearnStep {
  type: "learn";
  title: string;
  /** Main explanation — can include \n for line breaks */
  body: string;
  /** Optional worked example block rendered in a code-style panel */
  example?: {
    label?: string;
    lines: string[];
  };
  /** Optional React node for visual diagrams (SVG, canvas, etc.) */
  visual?: React.ReactNode;
}

export interface CheckStep {
  type: "check";
  question: string;
  choices: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export type LessonStep = LearnStep | CheckStep;

interface Props {
  steps: LessonStep[];
  /** Called when the user finishes the last step */
  onComplete: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

type BtnState = "idle" | "correct" | "wrong";

function MCBtn({
  label,
  state,
  onClick,
  disabled,
}: {
  label: string;
  state: BtnState;
  onClick: () => void;
  disabled?: boolean;
}) {
  const styles: Record<BtnState, { bg: string; border: string; color: string }> = {
    idle:    { bg: "#262C30", border: "#30363B", color: "#E8ECF0" },
    correct: { bg: "#27C07B18", border: "#27C07B", color: "#27C07B" },
    wrong:   { bg: "#F0525218", border: "#F05252", color: "#F05252" },
  };
  const s = styles[state];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl text-sm font-semibold px-4 py-3 text-left transition-all duration-150 active:scale-95 disabled:cursor-default enabled:hover:brightness-110"
      style={{ backgroundColor: s.bg, border: `2px solid ${s.border}`, color: s.color }}
    >
      {label}
    </button>
  );
}

// ── Learn step ────────────────────────────────────────────────────────────────

function LearnCard({
  step,
  onNext,
  isLast,
}: {
  step: LearnStep;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <h2 className="text-2xl font-bold" style={{ color: "#E8ECF0" }}>
        {step.title}
      </h2>

      {/* Body */}
      <div
        className="rounded-2xl p-5 leading-relaxed text-base"
        style={{
          backgroundColor: "#1E2225",
          border: "1px solid #30363B",
          color: "#C9D1D9",
          whiteSpace: "pre-line",
        }}
      >
        {step.body}
      </div>

      {/* Optional visual */}
      {step.visual && (
        <div
          className="rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#1E2225", border: "1px solid #30363B" }}
        >
          {step.visual}
        </div>
      )}

      {/* Worked example */}
      {step.example && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #489BFC30" }}
        >
          <div
            className="px-4 py-2 text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
            style={{ backgroundColor: "#489BFC14", color: "#489BFC" }}
          >
            <BookOpen size={13} />
            {step.example.label ?? "Worked Example"}
          </div>
          <div
            className="px-5 py-4 flex flex-col gap-1.5"
            style={{ backgroundColor: "#1A2030" }}
          >
            {step.example.lines.map((line, i) => (
              <p
                key={i}
                className="font-mono text-sm"
                style={{
                  color: line.startsWith("=") || line.startsWith("∴")
                    ? "#27C07B"
                    : line.startsWith("//")
                    ? "#9CA3AF"
                    : "#E8ECF0",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Next button */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
          style={{ backgroundColor: "#489BFC", color: "white" }}
        >
          {isLast ? "Start Quiz" : "Continue"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Check step ────────────────────────────────────────────────────────────────

function CheckCard({
  step,
  onNext,
  isLast,
}: {
  step: CheckStep;
  onNext: () => void;
  isLast: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === step.correctIndex;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div
          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: "#F7B03520", color: "#F7B035" }}
        >
          Quick Check
        </div>
      </div>

      <h2 className="text-xl font-bold" style={{ color: "#E8ECF0" }}>
        {step.question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.choices.map((c, i) => {
          let state: BtnState = "idle";
          if (answered) {
            if (i === step.correctIndex) state = "correct";
            else if (i === selected) state = "wrong";
          }
          return (
            <MCBtn
              key={i}
              label={c}
              state={state}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
            />
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="rounded-xl p-4 flex items-start gap-3"
          style={{
            backgroundColor: isCorrect ? "#27C07B0D" : "#F052520D",
            border: `1px solid ${isCorrect ? "#27C07B40" : "#F0525240"}`,
          }}
        >
          {isCorrect ? (
            <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: "#27C07B" }} />
          ) : (
            <XCircle size={20} className="shrink-0 mt-0.5" style={{ color: "#F05252" }} />
          )}
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: isCorrect ? "#27C07B" : "#F05252" }}>
              {isCorrect ? "Correct!" : "Not quite."}
            </p>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
              {step.explanation}
            </p>
          </div>
          <button
            onClick={onNext}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 hover:brightness-110"
            style={{ backgroundColor: "#489BFC", color: "white" }}
          >
            {isLast ? "Start Quiz" : "Next"}
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── LessonEngine ──────────────────────────────────────────────────────────────

export default function LessonEngine({ steps, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];
  const isLast = idx === steps.length - 1;

  function advance() {
    if (isLast) {
      onComplete();
    } else {
      setIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const progress = ((idx + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => idx > 0 && setIdx((i) => i - 1)}
            disabled={idx === 0}
            className="p-1.5 rounded-lg transition-all disabled:opacity-30 enabled:hover:bg-[#262C30]"
            style={{ color: "#9CA3AF" }}
            aria-label="Previous step"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
            Step {idx + 1} of {steps.length}
          </span>
          <button
            onClick={() => idx < steps.length - 1 && setIdx((i) => i + 1)}
            disabled={idx >= steps.length - 1}
            className="p-1.5 rounded-lg transition-all disabled:opacity-30 enabled:hover:bg-[#262C30]"
            style={{ color: "#9CA3AF" }}
            aria-label="Next step"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div
          className="text-xs px-2.5 py-1 rounded-full font-semibold"
          style={{
            backgroundColor: step.type === "check" ? "#F7B03520" : "#489BFC18",
            color: step.type === "check" ? "#F7B035" : "#489BFC",
          }}
        >
          {step.type === "check" ? "Quick Check" : "Lesson"}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#30363B" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: "#489BFC" }}
        />
      </div>

      {/* Step content */}
      {step.type === "learn" ? (
        <LearnCard step={step} onNext={advance} isLast={isLast} />
      ) : (
        <CheckCard step={step} onNext={advance} isLast={isLast} />
      )}
    </div>
  );
}
