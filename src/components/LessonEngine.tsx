"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, XCircle } from "lucide-react";

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
          <div key={i} className="rounded-full"
            style={{
              height: 8,
              width: active ? 28 : 8,
              transition: "width 0.35s ease, background-color 0.35s ease",
              backgroundColor: done ? "#27C07B" : active
                ? s.type === "check" ? "#F7B035" : "#489BFC"
                : "#D4C8BC",
            }} />
        );
      })}
    </div>
  );
}

// ── A/B/C/D colours ───────────────────────────────────────────────────────────

const LABELS = ["A", "B", "C", "D"];
const LABEL_COLORS = ["#489BFC", "#27C07B", "#F7B035", "#B87CF5"];

// ── Check step ────────────────────────────────────────────────────────────────

function CheckCard({ step, onNext, isLast }: { step: CheckStep; onNext: () => void; isLast: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === step.correctIndex;

  return (
    <div className="step-enter flex flex-col gap-5">
      <div className="self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
        style={{ backgroundColor: "#FEF3C7", color: "#D97706", border: "1px solid #F7B03550" }}>
        🧠 Quick Check
      </div>

      <h2 className="text-2xl font-bold leading-snug" style={{ color: "#1A1512" }}>
        {step.question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.choices.map((c, i) => {
          const accent = LABEL_COLORS[i];
          let bg = "#FFFFFF";
          let border = "#E2D5C8";
          let color = "#1A1512";
          let lBg = accent + "18";
          let lColor = accent;

          if (answered) {
            if (i === step.correctIndex) {
              bg = "#F0FDF8"; border = "#27C07B"; color = "#166B4A";
              lBg = "#27C07B22"; lColor = "#27C07B";
            } else if (i === selected) {
              bg = "#FEF2F2"; border = "#F05252"; color = "#991B1B";
              lBg = "#F0525222"; lColor = "#F05252";
            }
          }

          return (
            <button key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className="flex items-center gap-3 rounded-xl font-semibold text-sm px-4 py-3.5 text-left transition-all duration-150 active:scale-95 disabled:cursor-default enabled:hover:shadow-md enabled:hover:-translate-y-0.5"
              style={{ backgroundColor: bg, border: `2px solid ${border}`, color, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                style={{ backgroundColor: lBg, color: lColor }}>
                {LABELS[i]}
              </span>
              {c}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="pop-in rounded-2xl p-4 flex items-start gap-3"
          style={{
            backgroundColor: isCorrect ? "#F0FDF8" : "#FEF2F2",
            border: `1px solid ${isCorrect ? "#27C07B50" : "#F0525250"}`,
          }}>
          {isCorrect
            ? <CheckCircle2 size={22} className="shrink-0 mt-0.5" style={{ color: "#27C07B" }} />
            : <XCircle size={22} className="shrink-0 mt-0.5" style={{ color: "#F05252" }} />}
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: isCorrect ? "#166B4A" : "#991B1B" }}>
              {isCorrect ? "🎉 Correct!" : "Not quite — here is why:"}
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: "#3A3028" }}>
              {step.explanation}
            </p>
          </div>
          <button onClick={onNext}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)", color: "white" }}>
            {isLast ? "Start Quiz" : "Next"}
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Learn step ────────────────────────────────────────────────────────────────

function LearnCard({ step, onNext, isLast }: { step: LearnStep; onNext: () => void; isLast: boolean }) {
  // Split body into paragraphs for easier reading
  const paragraphs = step.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="step-enter flex flex-col gap-5">
      <h2 className="text-3xl font-black leading-tight" style={{ color: "#1A1512" }}>
        {step.title}
      </h2>

      {/* Body rendered as readable paragraphs */}
      <div className="flex flex-col gap-3">
        {paragraphs.map((para, i) => (
          <div key={i} className="rounded-2xl px-5 py-4 text-base leading-relaxed"
            style={{
              backgroundColor: "#FFFFFF",
              borderLeft: "4px solid #489BFC",
              border: "1px solid #E2D5C8",
              borderLeftWidth: 4,
              color: "#3A3028",
              whiteSpace: "pre-line",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
            {para}
          </div>
        ))}
      </div>

      {/* Visual */}
      {step.visual && (
        <div className="rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#F5EEE6", border: "1px solid #E2D5C8" }}>
          {step.visual}
        </div>
      )}

      {/* Worked example */}
      {step.example && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #27C07B40", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            style={{ backgroundColor: "#F0FDF8", color: "#166B4A" }}>
            <BookOpen size={13} />
            {step.example.label ?? "Worked Example"}
          </div>
          <div className="px-5 py-4 flex flex-col gap-2" style={{ backgroundColor: "#FAFFF8" }}>
            {step.example.lines.map((line, i) => (
              <p key={i} className="font-mono text-sm"
                style={{
                  color: line.startsWith("=") || line.startsWith("∴") ? "#166B4A"
                       : line.startsWith("//") ? "#7D7168"
                       : "#1A1512",
                }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      <button onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 hover:brightness-110 shadow-md"
        style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)", color: "white" }}>
        {isLast ? "🚀 Start Quiz" : "Got it — Continue"}
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
    if (isLast) { onComplete(); }
    else { setIdx((i) => i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <ProgressDots steps={steps} current={idx} />
        <div className="text-xs px-2.5 py-1 rounded-full font-bold"
          style={{
            backgroundColor: step.type === "check" ? "#FEF3C7" : "#EBF5FF",
            color: step.type === "check" ? "#D97706" : "#1D70C9",
            border: `1px solid ${step.type === "check" ? "#F7B03550" : "#489BFC40"}`,
          }}>
          {step.type === "check" ? "Quick Check" : `Step ${idx + 1} of ${steps.length}`}
        </div>
      </div>

      <div key={idx}>
        {step.type === "learn"
          ? <LearnCard step={step} onNext={advance} isLast={isLast} />
          : <CheckCard step={step} onNext={advance} isLast={isLast} />}
      </div>
    </div>
  );
}