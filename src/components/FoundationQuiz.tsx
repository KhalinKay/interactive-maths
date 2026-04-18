"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Flame,
  Trophy,
  RotateCcw,
  ArrowRight,
  Star,
} from "lucide-react";
import FractionGrid from "@/components/quiz/FractionGrid";
import {
  generateQuiz,
  Question,
  IdentifyFractionQ,
  ShadeFractionQ,
  CompareFractionsQ,
  ArithmeticQ,
  EquivalentFractionQ,
} from "@/lib/foundationQuestions";

// ── Shared answer button ──────────────────────────────────────────────────────

type BtnState = "idle" | "selected" | "correct" | "wrong";

function AnswerBtn({
  label,
  state,
  onClick,
  disabled,
  large,
}: {
  label: string;
  state: BtnState;
  onClick: () => void;
  disabled?: boolean;
  large?: boolean;
}) {
  const palette: Record<BtnState, { bg: string; border: string; color: string }> = {
    idle: { bg: "#262C30", border: "#30363B", color: "#E8ECF0" },
    selected: { bg: "#489BFC18", border: "#489BFC", color: "#489BFC" },
    correct: { bg: "#27C07B18", border: "#27C07B", color: "#27C07B" },
    wrong: { bg: "#F0525218", border: "#F05252", color: "#F05252" },
  };
  const p = palette[state];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-semibold transition-all duration-150 active:scale-95 disabled:cursor-default ${
        large ? "text-3xl px-7 py-4 min-w-[72px]" : "text-xl px-4 py-3 min-w-[110px]"
      } ${state === "idle" && !disabled ? "hover:brightness-110" : ""}`}
      style={{
        backgroundColor: p.bg,
        border: `2px solid ${p.border}`,
        color: p.color,
      }}
    >
      {label}
    </button>
  );
}

// ── Fraction bar (compare question) ──────────────────────────────────────────

function FractionBar({
  numerator,
  denominator,
  color,
  label,
}: {
  numerator: number;
  denominator: number;
  color: string;
  label: string;
}) {
  const pct = (numerator / denominator) * 100;
  return (
    <div className="flex items-center gap-4 w-full">
      <span className="w-14 text-right font-mono font-bold text-lg" style={{ color }}>
        {label}
      </span>
      <div
        className="flex-1 h-10 rounded-lg overflow-hidden"
        style={{ backgroundColor: "#262C30", border: "1px solid #30363B" }}
      >
        <div
          className="h-full rounded-lg"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-10 font-mono text-xs" style={{ color: "#9CA3AF" }}>
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

// ── Question renders ──────────────────────────────────────────────────────────

function IdentifyRender({
  q,
  phase,
  selected,
  onSelect,
}: {
  q: IdentifyFractionQ;
  phase: "question" | "feedback";
  selected: string | null;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <FractionGrid
        numerator={q.numerator}
        denominator={q.denominator}
        cols={q.cols}
        rows={q.rows}
      />
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map((choice, i) => {
          let state: BtnState = "idle";
          if (phase === "feedback") {
            if (i === q.correctIndex) state = "correct";
            else if (String(i) === selected) state = "wrong";
          } else if (String(i) === selected) state = "selected";
          return (
            <AnswerBtn
              key={choice}
              label={choice}
              state={state}
              onClick={() => onSelect(i)}
              disabled={phase === "feedback"}
            />
          );
        })}
      </div>
    </div>
  );
}

function ShadeRender({
  q,
  phase,
  shadedCells,
  onCellClick,
  onCheck,
}: {
  q: ShadeFractionQ;
  phase: "question" | "feedback";
  shadedCells: Set<number>;
  onCellClick: (i: number) => void;
  onCheck: () => void;
}) {
  const count = shadedCells.size;
  const isCorrectCount = count === q.numerator;

  return (
    <div className="flex flex-col items-center gap-6">
      <FractionGrid
        numerator={q.numerator}
        denominator={q.denominator}
        cols={q.cols}
        rows={q.rows}
        interactive={phase === "question"}
        shadedCells={shadedCells}
        onCellClick={onCellClick}
      />
      <div className="flex items-center gap-5">
        <div
          className="px-4 py-2 rounded-lg font-mono text-base"
          style={{
            backgroundColor: "#1E2225",
            border: "1px solid #30363B",
            color: isCorrectCount ? "#27C07B" : "#9CA3AF",
          }}
        >
          Shaded:{" "}
          <span
            className="font-bold"
            style={{ color: isCorrectCount ? "#27C07B" : "#489BFC" }}
          >
            {count}
          </span>{" "}
          / {q.numerator}
        </div>
        {phase === "question" && (
          <button
            onClick={onCheck}
            disabled={count === 0}
            className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#489BFC", color: "white" }}
          >
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
}

function CompareRender({
  q,
  phase,
  selected,
  onSelect,
}: {
  q: CompareFractionsQ;
  phase: "question" | "feedback";
  selected: string | null;
  onSelect: (op: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="flex flex-col gap-3 w-full">
        <FractionBar
          numerator={q.fractionA[0]}
          denominator={q.fractionA[1]}
          color="#F7B035"
          label={`${q.fractionA[0]}/${q.fractionA[1]}`}
        />
        <FractionBar
          numerator={q.fractionB[0]}
          denominator={q.fractionB[1]}
          color="#27C07B"
          label={`${q.fractionB[0]}/${q.fractionB[1]}`}
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono font-bold text-2xl" style={{ color: "#F7B035" }}>
          {q.fractionA[0]}/{q.fractionA[1]}
        </span>
        <div className="flex gap-3">
          {(["<", "=", ">"] as const).map((op) => {
            let state: BtnState = "idle";
            if (phase === "feedback") {
              if (op === q.correctAnswer) state = "correct";
              else if (op === selected) state = "wrong";
            } else if (op === selected) state = "selected";
            return (
              <AnswerBtn
                key={op}
                label={op}
                state={state}
                onClick={() => onSelect(op)}
                disabled={phase === "feedback"}
                large
              />
            );
          })}
        </div>
        <span className="font-mono font-bold text-2xl" style={{ color: "#27C07B" }}>
          {q.fractionB[0]}/{q.fractionB[1]}
        </span>
      </div>
    </div>
  );
}

function ArithmeticRender({
  q,
  phase,
  selected,
  onSelect,
}: {
  q: ArithmeticQ;
  phase: "question" | "feedback";
  selected: string | null;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="px-10 py-6 rounded-2xl font-mono text-5xl font-bold"
        style={{
          backgroundColor: "#262C30",
          border: "1px solid #30363B",
          color: "#E8ECF0",
        }}
      >
        {q.a}{" "}
        <span style={{ color: "#F7B035" }}>{q.operation}</span>{" "}
        {q.b}
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map((choice, i) => {
          let state: BtnState = "idle";
          if (phase === "feedback") {
            if (i === q.correctIndex) state = "correct";
            else if (String(i) === selected) state = "wrong";
          } else if (String(i) === selected) state = "selected";
          return (
            <AnswerBtn
              key={`${choice}-${i}`}
              label={String(choice)}
              state={state}
              onClick={() => onSelect(i)}
              disabled={phase === "feedback"}
            />
          );
        })}
      </div>
    </div>
  );
}

function EquivalentRender({
  q,
  phase,
  selected,
  onSelect,
}: {
  q: EquivalentFractionQ;
  phase: "question" | "feedback";
  selected: string | null;
  onSelect: (idx: number) => void;
}) {
  const revealedNum = phase === "feedback" ? q.correctNum : 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        {/* Known fraction */}
        <div className="flex flex-col items-center gap-2">
          <FractionGrid
            numerator={q.knownNum}
            denominator={q.knownDen}
            cols={q.knownCols}
            rows={q.knownRows}
          />
          <span
            className="font-mono text-xl font-bold"
            style={{ color: "#489BFC" }}
          >
            {q.knownNum}/{q.knownDen}
          </span>
        </div>

        <span className="text-4xl font-bold" style={{ color: "#9CA3AF" }}>
          =
        </span>

        {/* Target fraction */}
        <div className="flex flex-col items-center gap-2">
          <FractionGrid
            numerator={revealedNum}
            denominator={q.targetDen}
            cols={q.targetCols}
            rows={q.targetRows}
            unknown={phase === "question"}
            color="#27C07B"
          />
          <span
            className="font-mono text-xl font-bold"
            style={{ color: phase === "feedback" ? "#27C07B" : "#9CA3AF" }}
          >
            {phase === "feedback" ? q.correctNum : "?"}
            /{q.targetDen}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
        {q.choices.map((choice, i) => {
          let state: BtnState = "idle";
          if (phase === "feedback") {
            if (choice === q.correctNum) state = "correct";
            else if (String(i) === selected) state = "wrong";
          } else if (String(i) === selected) state = "selected";
          return (
            <AnswerBtn
              key={`${choice}-${i}`}
              label={String(choice)}
              state={state}
              onClick={() => onSelect(i)}
              disabled={phase === "feedback"}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Score screen ──────────────────────────────────────────────────────────────

function ScoreScreen({
  score,
  total,
  onRetry,
  onHome,
}: {
  score: number;
  total: number;
  onRetry: () => void;
  onHome: () => void;
}) {
  const stars = score >= total ? 3 : score >= Math.ceil(total * 0.7) ? 2 : score >= Math.ceil(total * 0.5) ? 1 : 0;
  const xp = score * 50;

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "#27C07B20", border: "2px solid #27C07B40" }}
      >
        <Trophy size={40} style={{ color: "#27C07B" }} />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold" style={{ color: "#E8ECF0" }}>
          Quiz Complete!
        </h2>
        <p className="mt-2 text-lg" style={{ color: "#9CA3AF" }}>
          {score === total
            ? "Perfect score — you're a natural!"
            : score >= Math.ceil(total * 0.7)
            ? "Great work! Keep practising."
            : "Good effort — try again to improve!"}
        </p>
      </div>

      {/* Stars */}
      <div className="flex gap-3">
        {[1, 2, 3].map((s) => (
          <Star
            key={s}
            size={40}
            fill={s <= stars ? "#F7B035" : "transparent"}
            style={{ color: s <= stars ? "#F7B035" : "#30363B" }}
          />
        ))}
      </div>

      {/* Score */}
      <div
        className="px-10 py-6 rounded-2xl flex flex-col items-center gap-1"
        style={{
          backgroundColor: "#1E2225",
          border: "1px solid #30363B",
        }}
      >
        <span className="text-5xl font-black" style={{ color: "#E8ECF0" }}>
          {score}
          <span className="text-2xl font-normal" style={{ color: "#9CA3AF" }}>
            /{total}
          </span>
        </span>
        <span className="text-sm" style={{ color: "#9CA3AF" }}>
          correct answers
        </span>
      </div>

      {/* XP */}
      <div
        className="flex items-center gap-2 px-6 py-3 rounded-xl"
        style={{ backgroundColor: "#F7B03520", border: "1px solid #F7B03540" }}
      >
        <Star size={18} fill="#F7B035" style={{ color: "#F7B035" }} />
        <span className="font-semibold" style={{ color: "#F7B035" }}>
          +{xp} XP earned
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
          style={{
            backgroundColor: "#262C30",
            border: "1px solid #30363B",
            color: "#E8ECF0",
          }}
        >
          <RotateCcw size={16} />
          Try Again
        </button>
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
          style={{ backgroundColor: "#489BFC", color: "white" }}
        >
          All Courses
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FoundationQuiz({ onHome }: { onHome: () => void }) {
  const TOTAL = 8;

  const [questions, setQuestions] = useState<Question[]>(() => generateQuiz(TOTAL));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"question" | "feedback" | "complete">("question");
  const [selected, setSelected] = useState<string | null>(null);
  const [shadedCells, setShadedCells] = useState<Set<number>>(new Set());
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const q = questions[idx];

  function submit(correct: boolean) {
    setIsCorrect(correct);
    setScore((s) => (correct ? s + 1 : s));
    setStreak((s) => (correct ? s + 1 : 0));
    setPhase("feedback");
  }

  function next() {
    if (idx + 1 >= TOTAL) {
      setPhase("complete");
    } else {
      setIdx((i) => i + 1);
      setPhase("question");
      setSelected(null);
      setShadedCells(new Set());
    }
  }

  function retry() {
    setQuestions(generateQuiz(TOTAL));
    setIdx(0);
    setPhase("question");
    setScore(0);
    setStreak(0);
    setSelected(null);
    setShadedCells(new Set());
  }

  function handleMC(choiceIdx: number) {
    if (phase !== "question") return;
    setSelected(String(choiceIdx));
    switch (q.type) {
      case "identify_fraction":
        submit(choiceIdx === q.correctIndex);
        break;
      case "arithmetic":
        submit(choiceIdx === q.correctIndex);
        break;
      case "equivalent_fraction":
        submit(q.choices[choiceIdx] === q.correctNum);
        break;
    }
  }

  function handleCompare(op: string) {
    if (phase !== "question") return;
    setSelected(op);
    if (q.type === "compare_fractions") submit(op === q.correctAnswer);
  }

  function handleShadeCell(i: number) {
    if (phase !== "question") return;
    setShadedCells((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleShadeCheck() {
    if (q.type === "shade_fraction") submit(shadedCells.size === q.numerator);
  }

  if (phase === "complete") {
    return (
      <div className="max-w-xl mx-auto">
        <ScoreScreen
          score={score}
          total={TOTAL}
          onRetry={retry}
          onHome={onHome}
        />
      </div>
    );
  }

  const progress = ((idx + (phase === "feedback" ? 1 : 0)) / TOTAL) * 100;

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
            Question {idx + 1} of {TOTAL}
          </span>
          {streak >= 2 && (
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "#F7B03520", color: "#F7B035" }}
            >
              <Flame size={12} />
              {streak} streak!
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#27C07B" }}>
          <CheckCircle2 size={14} />
          {score} correct
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "#30363B" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: "#489BFC" }}
        />
      </div>

      {/* ── Question card ── */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300"
        style={{
          backgroundColor: "#1E2225",
          border: `2px solid ${
            phase === "feedback"
              ? isCorrect
                ? "#27C07B"
                : "#F05252"
              : "#30363B"
          }`,
        }}
      >
        {/* Prompt */}
        <div className="px-6 pt-6 pb-4">
          <p
            className="text-xl font-semibold leading-snug"
            style={{ color: "#E8ECF0" }}
          >
            {q.prompt}
          </p>
        </div>

        {/* Visual + answers */}
        <div className="px-6 pb-6 flex flex-col items-center gap-6">
          {q.type === "identify_fraction" && (
            <IdentifyRender
              q={q as IdentifyFractionQ}
              phase={phase}
              selected={selected}
              onSelect={handleMC}
            />
          )}
          {q.type === "shade_fraction" && (
            <ShadeRender
              q={q as ShadeFractionQ}
              phase={phase}
              shadedCells={shadedCells}
              onCellClick={handleShadeCell}
              onCheck={handleShadeCheck}
            />
          )}
          {q.type === "compare_fractions" && (
            <CompareRender
              q={q as CompareFractionsQ}
              phase={phase}
              selected={selected}
              onSelect={handleCompare}
            />
          )}
          {q.type === "arithmetic" && (
            <ArithmeticRender
              q={q as ArithmeticQ}
              phase={phase}
              selected={selected}
              onSelect={handleMC}
            />
          )}
          {q.type === "equivalent_fraction" && (
            <EquivalentRender
              q={q as EquivalentFractionQ}
              phase={phase}
              selected={selected}
              onSelect={handleMC}
            />
          )}
        </div>

        {/* ── Feedback strip ── */}
        {phase === "feedback" && (
          <div
            className="px-6 py-5 border-t flex flex-col gap-3"
            style={{
              borderColor: isCorrect ? "#27C07B40" : "#F0525240",
              backgroundColor: isCorrect ? "#27C07B0D" : "#F052520D",
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
              <div className="flex-1">
                <p
                  className="font-semibold"
                  style={{ color: isCorrect ? "#27C07B" : "#F05252" }}
                >
                  {isCorrect ? "Correct!" : "Not quite — here's why:"}
                </p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {q.explanation}
                </p>
              </div>
              <button
                onClick={next}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-95 hover:brightness-110"
                style={{ backgroundColor: "#489BFC", color: "white" }}
              >
                {idx + 1 >= TOTAL ? "Finish" : "Continue"}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
