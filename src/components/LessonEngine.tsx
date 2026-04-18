"use client";

/**
 * LessonEngine — ADHD-friendly step-based lesson player.
 *
 * Each step can be:
 *   • "learn"  — concept card with big title, explanation, worked example
 *   • "check"  — single MC question with A/B/C/D coloured choices
 *
 * Features: progress dots, step-fade animation, pop-in feedback.
 */

import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, XCircle } from "lucide-react";

// ── Public types ──────────────────────────────────────────────────────────────

export interface LearnStep {
  type: "learn";
  title: string;
  body: string;
  example?: { label?: string; lines: string[] };
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
  onComplete: () => void;
}

// ── Progress dots ─────────────────────────────────────────────────────────────

function ProgressDots({ steps, current }: { steps: LessonStep[]; current: number }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={i}
            className="rounded-full"
            style={{
              height: 8,
              width: active ? 28 : 8,
              transition: "width 0.35s ease, background-color 0.35s ease",
              backgroundColor: done
                ? "#27C07B"
                : active
                ? s.type === "check" ? "#F7B035" : "#489BFC"
                : "#30363B",
            }}
          />
        );
      })}
    </div>
  );
}

// ── A/B/C/D choice colours ────────────────────────────────────────────────────

const LABELS = ["A", "B", "C", "D"];
const LABEL_COLORS = ["#489BFC", "#27C07B", "#F7B035", "#B87CF5"];

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
    <div className="step-enter flex flex-col gap-5">
      {/* Badge */}
      <div
        className="self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
        style={{ backgroundColor: "#F7B03520", color: "#F7B035", border: "1px solid #F7B03540" }}
      >
        Quick Check
      </div>

      {/* Question */}
      <h2 className="text-2xl font-bold leading-snug" style={{ color: "#E8ECF0" }}>
        {step.question}
      </h2>

      {/* Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.choices.map((c, i) => {
          const accent = LABEL_COLORS[i];
          let bg = "#1E2225";
          let border = "#30363B";
          let color = "#E8ECF0";
          let lBg = accent + "22";
          let lColor = accent;

          if (answered) {
            if (i === step.correctIndex) {
              bg = "#27C07B0D"; border = "#27C07B"; color = "#27C07B";
              lBg = "#27C07B33"; lColor = "#27C07B";
            } else if (i === selected) {
              bg = "#F052520D"; border = "#F05252"; color = "#F05252";
              lBg = "#F0525233"; lColor = "#F05252";
            }
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className="flex items-center gap-3 rounded-xl font-semibold text-sm px-4 py-3.5 text-left transition-all duration-150 active:scale-95 disabled:cursor-default enabled:hover:brightness-110"
              style={{ backgroundColor: bg, border: `2px solid ${border}`, color }}
            >
              <span
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                style={{ backgroundColor: lBg, color: lColor }}
              >
                {LABELS[i]}
              </span>
              {c}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="pop-in rounded-2xl p-4 flex items-start gap-3"
          style={{
            backgroundColor: isCorrect ? "#27C07B0D" : "#F052520D",
            border: `1px solid ${isCorrect ? "#27C07B40" : "#F0525240"}`,
          }}
        >
          {isCorrect ? (
            <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: "#27C07B" }} />
          ) : (
            <XCircle size={22} className="shrink-0 mt-0.5" style={{ color: "#F05252" }} />
          )}
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: isCorrect ? "#27C07B" : "#F05252" }}>
              {isCorrect ? "Correct!" : "Not quite — here is why:"}
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "#C9D1D9" }}>
              {step.explanation}
            </p>
          </div>
          <button
            onClick={onNext}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)", color: "white" }}
          >
            {isLast ? "Start Quiz" : "Next"}
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
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
    <div className="step-enter flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-3xl font-black leading-tight" style={{ color: "#E8ECF0" }}>
        {step.title}
      </h2>

      {/* Body */}
      <div
        className="rounded-2xl p-5 text-base leading-relaxed"
        style={{
          backgroundColor: "#161C22",
          borderTop: "1px solid #489BFC30",
          borderRight: "1px solid #489BFC30",
          borderBottom: "1px solid #489BFC30",
          borderLeft: "4px solid #489BFC",
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
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #27C07B30" }}>
          <div
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            style={{ backgroundColor: "#27C07B14", color: "#27C07B" }}
          >
            <BookOpen size={13} />
            {step.example.label ?? "Worked Example"}
          </div>
          <div
            className="px-5 py-4 flex flex-col gap-2"
            style={{ backgroundColor: "#161B1F" }}
          >
            {step.example.lines.map((line, i) => (
              <p
                key={i}
                className="font-mono text-sm"
                style={{
                  color:
                    line.startsWith("=") || line.startsWith("=")
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

      {/* CTA */}
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 hover:brightness-110"
        style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)", color: "white" }}
      >
        {isLast ? "Start Quiz" : "Got it — Continue"}
        <ArrowRight size={20} />
      </button>
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

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      {/* Progress row */}
      <div className="flex items-center justify-between">
        <ProgressDots steps={steps} current={idx} />
        <div
          className="text-xs px-2.5 py-1 rounded-full font-bold"
          style={{
            backgroundColor: step.type === "check" ? "#F7B03520" : "#489BFC18",
            color: step.type === "check" ? "#F7B035" : "#489BFC",
            border: `1px solid ${step.type === "check" ? "#F7B03540" : "#489BFC30"}`,
          }}
        >
          {step.type === "check" ? "Quick Check" : `Step ${idx + 1} of ${steps.length}`}
        </div>
      </div>

      {/* Animated step card */}
      <div key={idx}>
        {step.type === "learn" ? (
          <LearnCard step={step} onNext={advance} isLast={isLast} />
        ) : (
          <CheckCard step={step} onNext={advance} isLast={isLast} />
        )}
      </div>
    </div>
  );
}