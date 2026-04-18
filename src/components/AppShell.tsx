"use client";

import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Home,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";

export interface LessonMeta {
  icon: string;
  title: string;
  description: string;
  category: string;
  xp: number;
}

const COURSES = [
  { id: "foundations",  href: "/foundations",        emoji: "🧮",  title: "Foundations",           difficulty: "Beginner",     xp: 500 },
  { id: "ratios",       href: "/ratios",              emoji: "📊",  title: "Ratios & Percentages",  difficulty: "Beginner",     xp: 400 },
  { id: "prealgebra",   href: "/pre-algebra",         emoji: "📝",  title: "Pre-Algebra",           difficulty: "Beginner",     xp: 350 },
  { id: "algebra1",     href: "/algebra1",            emoji: "x",   title: "Algebra 1",             difficulty: "Intermediate", xp: 500 },
  { id: "geometry",     href: "/geometry-basics",     emoji: "△",   title: "Geometry",              difficulty: "Intermediate", xp: 450 },
  { id: "algebra2",     href: "/algebra2",            emoji: "x²",  title: "Algebra 2",             difficulty: "Intermediate", xp: 550 },
  { id: "trigonometry", href: "/trigonometry",        emoji: "sin", title: "Trigonometry",          difficulty: "Advanced",     xp: 500 },
  { id: "precalculus",  href: "/precalculus",         emoji: "lim", title: "Pre-Calculus",          difficulty: "Advanced",     xp: 600 },
  { id: "pythagoras",   href: "/geometry/pythagoras", emoji: "📐",  title: "Pythagorean Theorem",   difficulty: "Interactive",  xp: 250 },
];

const NAV = [
  { icon: Home,         label: "Home",        href: "/" },
  { icon: BookOpen,     label: "Lessons",     href: "/" },
  { icon: FlaskConical, label: "Practice",    href: "/" },
  { icon: Trophy,       label: "Leaderboard", href: "/" },
];

function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((s) => (
        <Star key={s} size={9} fill={s <= stars ? "#F7B035" : "transparent"}
          style={{ color: s <= stars ? "#F7B035" : "#C8BDB5" }} />
      ))}
    </div>
  );
}

function LevelBadge({ level }: { level: number }) {
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
      style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)", color: "white" }}>
      {level}
    </div>
  );
}

export default function AppShell({ children, lesson }: { children: React.ReactNode; lesson?: LessonMeta }) {
  const pathname = usePathname();
  const { totalXP, level, xpInCurrentLevel, xpForNextLevel, isCourseComplete, getCourseStars } = useProgress();
  const progressPct = Math.round((xpInCurrentLevel / xpForNextLevel) * 100);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#FAF8F4", color: "#1A1512" }}>
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r"
        style={{ backgroundColor: "#F0E8DF", borderColor: "#E2D5C8" }}>

        {/* Logo */}
        <Link href="/" className="px-6 py-5 border-b flex items-center gap-2.5"
          style={{ borderColor: "#E2D5C8" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
            style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)" }}>M</div>
          <span className="font-bold text-lg" style={{ color: "#1A1512" }}>
            Maths<span style={{ color: "#489BFC" }}>Lab</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="px-3 py-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href && item.href === "/";
            return (
              <Link key={item.label} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:bg-[#E8DDD4]"
                style={{ color: active ? "#489BFC" : "#7D7168", backgroundColor: active ? "#489BFC14" : undefined }}>
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-4 border-t" style={{ borderColor: "#E2D5C8" }} />

        {/* Course list */}
        <div className="px-4 py-3 flex flex-col gap-0.5 overflow-y-auto flex-1">
          <p className="text-xs uppercase tracking-widest px-2 py-1 mb-1 font-bold" style={{ color: "#7D7168" }}>
            Courses
          </p>
          {COURSES.map((c) => {
            const isActive = pathname === c.href;
            const done = isCourseComplete(c.id);
            const stars = getCourseStars(c.id);
            return (
              <Link key={c.id} href={c.href}
                className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-[#E8DDD4] group"
                style={{ backgroundColor: isActive ? "#489BFC14" : undefined }}>
                <span className="text-base leading-none shrink-0" style={{ color: isActive ? "#489BFC" : "#7D7168" }}>
                  {c.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: isActive ? "#489BFC" : "#1A1512" }}>
                    {c.title}
                  </p>
                  {done ? <StarRow stars={stars} /> : (
                    <p className="text-xs" style={{ color: "#7D7168" }}>{c.difficulty} · {c.xp} XP</p>
                  )}
                </div>
                {done ? (
                  <CheckCircle2 size={14} style={{ color: "#27C07B" }} />
                ) : (
                  <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#489BFC" }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* XP strip */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "#E2D5C8" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap size={14} style={{ color: "#F7B035" }} fill="#F7B035" />
              <span className="text-xs font-bold" style={{ color: "#F7B035" }}>{totalXP.toLocaleString()} XP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LevelBadge level={level} />
              <span className="text-xs font-semibold" style={{ color: "#7D7168" }}>Lvl {level}</span>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E2D5C8" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #489BFC, #7C3AED)" }} />
          </div>
          <p className="text-xs mt-1 text-right" style={{ color: "#7D7168" }}>
            {xpForNextLevel - xpInCurrentLevel} XP to Lvl {level + 1}
          </p>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b shrink-0 lg:px-6"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2D5C8" }}>

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
              style={{ background: "linear-gradient(135deg, #489BFC, #7C3AED)" }}>M</div>
            <span className="font-bold text-sm" style={{ color: "#1A1512" }}>MathsLab</span>
          </Link>

          {/* Breadcrumb (desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-sm" style={{ color: "#7D7168" }}>
            <Link href="/" className="hover:text-[#1A1512] transition-colors">Courses</Link>
            {lesson && (
              <>
                <ChevronRight size={14} />
                <span>{lesson.category}</span>
                <ChevronRight size={14} />
                <span style={{ color: "#1A1512" }}>{lesson.title}</span>
              </>
            )}
          </div>

          {/* XP chip + level */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{ backgroundColor: "#FEF3C7", border: "1px solid #F7B03550", color: "#D97706" }}>
              <Zap size={13} fill="#F7B035" style={{ color: "#F7B035" }} />
              {totalXP.toLocaleString()} XP
            </div>
            <LevelBadge level={level} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-12 lg:py-8 pb-20 lg:pb-8">
          {lesson && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: "#F5EEE6", border: "1px solid #E2D5C8" }}>
                  {lesson.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#489BFC18", color: "#489BFC" }}>
                      {lesson.category}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                      style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>
                      <Zap size={10} fill="#F7B035" style={{ color: "#F7B035" }} />
                      {lesson.xp} XP
                    </span>
                  </div>
                  <h1 className="text-xl lg:text-2xl font-bold" style={{ color: "#1A1512" }}>{lesson.title}</h1>
                  <p className="mt-1 text-sm" style={{ color: "#7D7168" }}>{lesson.description}</p>
                </div>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center border-t z-50"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2D5C8" }}>
        {NAV.map((item) => {
          const active = pathname === item.href && item.href === "/";
          return (
            <Link key={item.label} href={item.href}
              className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors"
              style={{ color: active ? "#489BFC" : "#7D7168" }}>
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}