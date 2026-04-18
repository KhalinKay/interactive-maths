"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CourseRecord {
  bestScore: number;
  total: number;
  xpEarned: number;
  stars: number;
  completedAt: number;
}

export interface ProgressState {
  totalXP: number;
  courses: Record<string, CourseRecord>;
  quizStreak: number;
}

interface ProgressCtx extends ProgressState {
  addCourseResult: (
    courseId: string,
    score: number,
    total: number,
    courseXP: number
  ) => number; // returns XP delta earned this attempt
  resetProgress: () => void;
  level: number;
  xpInCurrentLevel: number;
  xpForNextLevel: number;
  completedCount: number;
  isCourseComplete: (courseId: string) => boolean;
  getCourseStars: (courseId: string) => number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const LEVEL_XP = 500;

function computeLevel(xp: number) {
  const level = Math.floor(xp / LEVEL_XP) + 1;
  const xpInCurrentLevel = xp % LEVEL_XP;
  return { level, xpInCurrentLevel, xpForNextLevel: LEVEL_XP };
}

function starsForScore(score: number, total: number): number {
  const pct = score / total;
  if (pct >= 1.0) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = "mathsapp-progress-v1";

const EMPTY_STATE: ProgressState = { totalXP: 0, courses: {}, quizStreak: 0 };

function load(): ProgressState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY_STATE, ...JSON.parse(raw) } : EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

function save(state: ProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Context ───────────────────────────────────────────────────────────────────

const ProgressContext = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => load());

  useEffect(() => {
    save(state);
  }, [state]);

  const addCourseResult = useCallback(
    (courseId: string, score: number, total: number, courseXP: number): number => {
      const newXP = Math.round((score / total) * courseXP);
      const stars = starsForScore(score, total);

      let xpDelta = 0;
      setState((prev) => {
        const existing = prev.courses[courseId];
        const oldXP = existing?.xpEarned ?? 0;
        xpDelta = Math.max(0, newXP - oldXP);

        const record: CourseRecord = {
          bestScore: Math.max(score, existing?.bestScore ?? 0),
          total,
          xpEarned: Math.max(newXP, oldXP),
          stars: Math.max(stars, existing?.stars ?? 0),
          completedAt: Date.now(),
        };
        return {
          ...prev,
          totalXP: prev.totalXP + xpDelta,
          quizStreak: prev.quizStreak + 1,
          courses: { ...prev.courses, [courseId]: record },
        };
      });
      return xpDelta;
    },
    []
  );

  const resetProgress = useCallback(() => {
    setState(EMPTY_STATE);
  }, []);

  const { level, xpInCurrentLevel, xpForNextLevel } = computeLevel(state.totalXP);
  const completedCount = Object.keys(state.courses).length;

  const isCourseComplete = useCallback(
    (courseId: string) => !!state.courses[courseId],
    [state.courses]
  );

  const getCourseStars = useCallback(
    (courseId: string) => state.courses[courseId]?.stars ?? 0,
    [state.courses]
  );

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        addCourseResult,
        resetProgress,
        level,
        xpInCurrentLevel,
        xpForNextLevel,
        completedCount,
        isCourseComplete,
        getCourseStars,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressCtx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
