"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Lightbulb,
  RotateCcw,
  Star,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { GenericQuestion } from "@/lib/subjectQuestions";
import { useProgress } from "@/context/ProgressContext";

// ── Shared answer button ───────────────────────────────────────────────────────

type BtnState = "idle" | "correct" | "wrong";

const CHOICE_LABELS = ["A", "B", "C", "D"];
const CHOICE_COLORS = ["#489BFC", "#27C07B", "#F7B035", "#B87CF5"];

function AnswerBtn({
  label,
  state,
  choiceIdx,
  onClick,
  disabled,
}: {
  label: string;
  state: BtnState;
  choiceIdx: number;
  onClick: () => void;
  disabled?: boolean;
}) {
  const accent = CHOICE_COLORS[choiceIdx] ?? "#489BFC";
  let bg = "#FFFFFF";
  let border = "#E2D5C8";
  let color = "#1A1512";
  let lBg = accent + "18";
  let lColor = accent;

  if (state === "correct") {
    bg = "#F0FDF8"; border = "#27C07B"; color = "#166B4A";
    lBg = "#27C07B22"; lColor = "#27C07B";
  } else if (state === "wrong") {
    bg = "#FEF2F2"; border = "#F05252"; color = "#991B1B";
    lBg = "#F0525222"; lColor = "#F05252";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-3 w-full rounded-xl font-semibold text-base px-4 py-3.5 text-left transition-all duration-150 active:scale-95 disabled:cursor-default enabled:hover:brightness-110"
      style={{ backgroundColor: bg, border: `2px solid ${border}`, color }}
    >
      <span
        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
        style={{ backgroundColor: lBg, color: lColor }}
      >
        {CHOICE_LABELS[choiceIdx]}
      </span>
      {label}
    </button>
  );
}

// ── Score screen ───────────────────────────────────────────────────────────────

function ScoreScreen({
  score,
  total,
  subject,
  courseId,
  courseXP,
  onRetry,
  onHome,
}: {
  score: number;
  total: number;
  subject: string;
  courseId?: string;
  courseXP: number;
  onRetry: () => void;
  onHome: () => void;
}) {
  const { addCourseResult } = useProgress();
  const [xpEarned, setXpEarned] = useState(0);
  const savedRef = useRef(false);

  useEffect(() => {
    if (!savedRef.current) {
      savedRef.current = true;
      const delta = addCourseResult(courseId ?? "unknown", score, total, courseXP);
      setXpEarned(delta);
    }
  }, [addCourseResult, courseId, courseXP, score, total]);

  const stars = score >= total ? 3 : score >= Math.ceil(total * 0.7) ? 2 : score >= Math.ceil(total * 0.5) ? 1 : 0;

  return (
    <div className="flex flex-col items-center gap-7 py-10 max-w-md mx-auto">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "#F0FDF8", border: "2px solid #27C07B40" }}
      >
        <Trophy size={40} style={{ color: "#27C07B" }} />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold" style={{ color: "#1A1512" }}>Quiz Complete!</h2>
        <p className="mt-1 text-sm" style={{ color: "#7D7168" }}>{subject}</p>
        <p className="mt-3 text-sm" style={{ color: "#7D7168" }}>
          {score === total
            ? "Perfect score — outstanding!"
            : score >= Math.ceil(total * 0.7)
            ? "Great work! Keep it up."
            : "Good effort — try again to improve!"}
        </p>
      </div>

      {/* Stars */}
      <div className="flex gap-3">
        {[1, 2, 3].map((s) => (
          <Star
            key={s}
            size={36}
            fill={s <= stars ? "#F7B035" : "transparent"}
            style={{ color: s <= stars ? "#F7B035" : "#C8BDB5" }}
          />
        ))}
      </div>

      {/* Score */}
      <div
        className="px-10 py-6 rounded-2xl flex flex-col items-center gap-1 w-full"
        style={{ backgroundColor: "#F5EEE6", border: "1px solid #E2D5C8" }}
      >
        <span className="text-5xl font-black" style={{ color: "#1A1512" }}>
          {score}
          <span className="text-2xl font-normal" style={{ color: "#7D7168" }}>/{total}</span>
        </span>
        <span className="text-sm" style={{ color: "#7D7168" }}>correct answers</span>
      </div>

      {/* XP earned */}
      <div
        className="flex items-center gap-2 px-6 py-3 rounded-xl w-full justify-center"
        style={{ backgroundColor: "#F7B03514", border: "1px solid #F7B03530" }}
      >
        <Zap size={16} fill="#F7B035" style={{ color: "#F7B035" }} />
        <span className="font-bold text-sm" style={{ color: "#F7B035" }}>
          {xpEarned > 0 ? `+${xpEarned} XP earned!` : "No new XP — try for a better score!"}
        </span>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
          style={{ backgroundColor: "#F5EEE6", border: "1px solid #E2D5C8", color: "#1A1512" }}
        >
          <RotateCcw size={15} />
          Try Again
        </button>
        <button
          onClick={onHome}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
          style={{ backgroundColor: "#489BFC", color: "white" }}
        >
          All Courses
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ── Main GenericQuiz component ─────────────────────────────────────────────────

export default function GenericQuiz({
  generate,
  total = 8,
  courseId,
  courseXP = 400,
  onHome,
}: {
  generate: (n: number) => GenericQuestion[];
  total?: number;
  courseId?: string;
  courseXP?: number;
  onHome: () => void;
}) {
  const [questions, setQuestions] = useState<GenericQuestion[]>(() => generate(total));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"question" | "feedback" | "complete">("question");
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<("correct" | "wrong" | null)[]>(() => Array(total).fill(null));
  const confettiFiredRef = useRef(false);

  const q = questions[idx];

  useEffect(() => {
    if (phase === "complete" && score === total && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#489BFC", "#27C07B", "#F7B035"],
      });
    }
  }, [phase, score, total]);

  function submit(choiceIdx: number) {
    if (phase !== "question") return;
    const correct = choiceIdx === q.correctIndex;
    setSelected(choiceIdx);
    setIsCorrect(correct);
    setScore((s) => (correct ? s + 1 : s));
    setStreak((s) => (correct ? s + 1 : 0));
    setResults((r) => { const next = [...r]; next[idx] = correct ? "correct" : "wrong"; return next; });
    setPhase("feedback");
  }

  function next() {
    if (idx + 1 >= total) {
      setPhase("complete");
    } else {
      setIdx((i) => i + 1);
      setPhase("question");
      setSelected(null);
      setShowHint(false);
    }
  }

  function retry() {
    confettiFiredRef.current = false;
    setQuestions(generate(total));
    setIdx(0);
    setPhase("question");
    setScore(0);
    setStreak(0);
    setSelected(null);
    setShowHint(false);
    setResults(Array(total).fill(null));
  }

  if (phase === "complete") {
    return (
      <ScoreScreen
        score={score}
        total={total}
        subject={q?.subject ?? ""}
        courseId={courseId}
        courseXP={courseXP}
        onRetry={retry}
        onHome={onHome}
      />
    );
  }

  const isEquation = q.equation && q.prompt.length < 70;

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      {/* ── Dot progress row ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {results.map((r, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                height: 8,
                width: i === idx ? 28 : 8,
                transition: "width 0.3s ease, background-color 0.3s ease",
                backgroundColor:
                  r === "correct" ? "#27C07B" :
                  r === "wrong"   ? "#F05252" :
                  i === idx       ? "#489BFC" :
                  "#D4C8BC",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <div
              className="pop-in flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: "#F7B03520", color: "#F7B035", border: "1px solid #F7B03540" }}
            >
              <Flame size={12} />
              {streak}x streak!
            </div>
          )}
          <div
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "#27C07B" }}
          >
            <CheckCircle2 size={14} />
            {score}/{total}
          </div>
        </div>
      </div>

      {/* ── Question card ── */}
      <div
        className="rounded-2xl overflow-hidden shadow-sm transition-colors duration-200"
        style={{
          backgroundColor: "#FFFFFF",
          border: `2px solid ${
            phase === "feedback"
              ? isCorrect
                ? "#27C07B"
                : "#F05252"
              : "#E2D5C8"
          }`,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        {/* Subject pill */}
        <div className="px-6 pt-4 pb-0 flex items-center">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#EBF5FF", color: "#1D70C9" }}
          >
            {q.subject}
          </span>
        </div>

        {/* Prompt */}
        <div
          className={`px-6 py-6 flex items-center ${isEquation ? "justify-center" : "justify-start"}`}
        >
          {isEquation ? (
            <div
              className="font-mono text-3xl font-bold text-center leading-snug"
              style={{ color: "#1A1512" }}
            >
              {q.prompt}
            </div>
          ) : (
            <p
              className="text-lg font-semibold leading-relaxed"
              style={{ color: "#1A1512" }}
            >
              {q.prompt}
            </p>
          )}
        </div>

        {/* Choices */}
        <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.choices.map((choice, i) => {
            let state: BtnState = "idle";
            if (phase === "feedback") {
              if (i === q.correctIndex) state = "correct";
              else if (i === selected) state = "wrong";
            }
            return (
              <AnswerBtn
                key={`${choice}-${i}`}
                label={choice}
                state={state}
                choiceIdx={i}
                onClick={() => submit(i)}
                disabled={phase === "feedback"}
              />
            );
          })}
        </div>

        {/* Hint toggle */}
        {phase === "question" && q.hint && (
          <div className="px-6 pb-4">
            <button
              onClick={() => setShowHint((h) => !h)}
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: showHint ? "#ffc855" : "#F7B035" }}
            >
              <Lightbulb size={15} />
              {showHint ? "Hide hint" : "Show hint"}
            </button>
            {showHint && (
              <div
                className="mt-2 p-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "#FEF3C7",
                  border: "1px solid #F7B03550",
                  color: "#92400E",
                }}
              >
                {q.hint}
              </div>
            )}
          </div>
        )}

        {/* ── Feedback strip ── */}
        {phase === "feedback" && (
          <div
            className="px-6 py-5 border-t flex flex-col gap-3"
            style={{
              borderColor: isCorrect ? "#27C07B50" : "#F0525050",
              backgroundColor: isCorrect ? "#F0FDF8" : "#FEF2F2",
            }}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2
                  size={22}
                  className="shrink-0 mt-0.5"
                  style={{ color: "#27C07B" }}
                />
              ) : (
                <XCircle
                  size={22}
                  className="shrink-0 mt-0.5"
                  style={{ color: "#F05252" }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold"
                  style={{ color: isCorrect ? "#166B4A" : "#991B1B" }}
                >
                  {isCorrect ? "🎉 Correct!" : "Not quite — here's why:"}
                </p>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "#3A3028" }}
                >
                  {q.explanation}
                </p>
              </div>
              <button
                onClick={next}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
                style={{ backgroundColor: "#489BFC", color: "white" }}
              >
                {idx + 1 >= total ? "Finish" : "Next"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
