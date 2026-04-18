"use client";
import AppShell from "@/components/AppShell";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Zap } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

// ── Curriculum data ───────────────────────────────────────────────────────────

const SECTIONS = [
  {
    label: "Building Blocks",
    description: "Master the fundamentals before advancing.",
    courses: [
      { id: "foundations",  href: "/foundations",   emoji: "🧮", title: "Foundations",                  description: "Fractions, arithmetic, and the building blocks of maths.", category: "Beginner",     xp: 500, questions: 8,  color: "#489BFC" },
      { id: "ratios",       href: "/ratios",         emoji: "📊", title: "Ratios, Percentages & Proportions", description: "Ratios, percent change, unit rates, and real-world problems.", category: "Beginner",     xp: 400, questions: 8,  color: "#38BDF8" },
      { id: "prealgebra",   href: "/pre-algebra",    emoji: "📝", title: "Pre-Algebra",                  description: "BODMAS, negative numbers, exponents, roots, factors.",     category: "Beginner",     xp: 350, questions: 8,  color: "#A78BFA" },
    ],
  },
  {
    label: "Core Mathematics",
    description: "Where numbers become symbols and logic becomes visual.",
    courses: [
      { id: "algebra1",     href: "/algebra1",       emoji: "x",  title: "Algebra 1",                   description: "Linear equations, inequalities, expanding, factorising.",    category: "Intermediate", xp: 500, questions: 8,  color: "#F472B6" },
      { id: "geometry",     href: "/geometry-basics",emoji: "△",  title: "Geometry",                    description: "Angles, polygons, area, volume, and Pythagoras.",             category: "Intermediate", xp: 450, questions: 8,  color: "#27C07B" },
      { id: "algebra2",     href: "/algebra2",       emoji: "x²", title: "Algebra 2",                   description: "Quadratics, logarithms, exponential functions, sequences.",   category: "Intermediate", xp: 550, questions: 8,  color: "#F7B035" },
    ],
  },
  {
    label: "Higher Mathematics",
    description: "Preparation for university-level mathematics.",
    courses: [
      { id: "trigonometry", href: "/trigonometry",   emoji: "sin",title: "Trigonometry",                description: "Sine, cosine, tangent, the unit circle, and identities.",     category: "Advanced",     xp: 500, questions: 8,  color: "#FB923C" },
      { id: "precalculus",  href: "/precalculus",    emoji: "lim",title: "Pre-Calculus",                description: "Functions, limits, vectors, and the gateway to calculus.",    category: "Advanced",     xp: 600, questions: 8,  color: "#34D399" },
      { id: "pythagoras",   href: "/geometry/pythagoras", emoji: "📐", title: "Interactive: Pythagoras", description: "Drag a point and watch a² + b² = c² come alive.",            category: "Interactive",  xp: 250, questions: 3,  color: "#60A5FA" },
    ],
  },
];

// ── Course card ───────────────────────────────────────────────────────────────

function CourseCard({
  id, href, emoji, title, description, category, xp, questions, color,
}: {
  id: string; href: string; emoji: string; title: string; description: string;
  category: string; xp: number; questions: number; color: string;
}) {
  const { isCourseComplete, getCourseStars } = useProgress();
  const done = isCourseComplete(id);
  const stars = getCourseStars(id);

  return (
    <div
      className="rounded-2xl flex flex-col overflow-hidden transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${done ? color + "50" : "#E2D5C8"}`,
        boxShadow: done ? `0 0 0 1px ${color}20` : "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <div className="h-1 w-full" style={{ background: done ? `linear-gradient(90deg, ${color}, ${color}99)` : color }} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30`, color }}
          >
            {emoji}
          </div>
          {done && (
            <div className="flex flex-col items-end gap-1">
              <CheckCircle2 size={16} style={{ color: "#27C07B" }} />
              <div className="flex gap-0.5">
                {[1, 2, 3].map((s) => (
                  <Star key={s} size={10} fill={s <= stars ? "#F7B035" : "transparent"} style={{ color: s <= stars ? "#F7B035" : "#C8BDB5" }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {category}
            </span>
            {done && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#27C07B14", color: "#27C07B" }}>
                Completed
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold leading-snug" style={{ color: "#1A1512" }}>{title}</h3>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: "#7D7168" }}>{description}</p>
        </div>

          <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop: "1px solid #E2D5C8" }}>
          <div className="flex items-center gap-3 text-xs" style={{ color: "#7D7168" }}>
            <span style={{ color: "#7D7168" }}>{questions} questions</span>
            <span className="flex items-center gap-0.5" style={{ color: "#D97706" }}>
              <Zap size={10} fill="#F7B035" />+{xp} XP
            </span>
          </div>
          <Link
            href={href}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 hover:brightness-110"
            style={{ backgroundColor: done ? "#F5EEE6" : color, color: done ? "#3A3028" : "white", border: done ? `1px solid #E2D5C8` : undefined }}
          >
            {done ? "Retry" : "Begin"} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Stats bar ──────────────────────────────────────────────────────────────────

function StatsBar() {
  const { totalXP, level, xpInCurrentLevel, xpForNextLevel, completedCount, quizStreak } = useProgress();
  const total = SECTIONS.flatMap((s) => s.courses).length;
  const progressPct = Math.round((xpInCurrentLevel / xpForNextLevel) * 100);

  return (
    <div
      className="rounded-2xl p-5 mb-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2D5C8", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#7D7168" }}>Total XP</span>
        <span className="text-2xl font-black flex items-center gap-1" style={{ color: "#F7B035" }}>
          <Zap size={18} fill="#F7B035" />{totalXP.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#7D7168" }}>Level</span>
        <span className="text-2xl font-black" style={{ color: "#489BFC" }}>{level}</span>
          <div className="h-1.5 rounded-full overflow-hidden mt-1" style={{ backgroundColor: "#E2D5C8" }}>
          <div className="h-full rounded-full" style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #489BFC, #7C3AED)" }} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#7D7168" }}>Completed</span>
        <span className="text-2xl font-black" style={{ color: "#27C07B" }}>{completedCount}<span className="text-sm font-normal" style={{ color: "#7D7168" }}>/{total}</span></span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#7D7168" }}>Quiz Streak</span>
        <span className="text-2xl font-black" style={{ color: "#FB923C" }}>🔥 {quizStreak}</span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: "#1A1512" }}>Your Learning Path</h1>
          <p className="mt-2 text-base" style={{ color: "#7D7168" }}>
            Work through the curriculum in order. Each section builds on the last.
          </p>
        </div>

        {/* Stats */}
        <StatsBar />

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {SECTIONS.map((section, si) => (
            <div key={section.label}>
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)" }}
                >
                  {si + 1}
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "#1A1512" }}>{section.label}</h2>
                  <p className="text-sm" style={{ color: "#7D7168" }}>{section.description}</p>
                </div>
                <div className="flex-1 h-px ml-2" style={{ backgroundColor: "#E2D5C8" }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {section.courses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
