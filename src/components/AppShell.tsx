"use client";

import { BookOpen, ChevronRight, FlaskConical, Home, Lock, Star, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface LessonMeta {
  icon: string;
  title: string;
  description: string;
  category: string;
  xp: number;
}

const COURSES = [
  { id: "foundations",  href: "/foundations",         emoji: "🧮",  title: "Foundations",               difficulty: "Beginner",     xp: 500, active: true },
  { id: "ratios",       href: "/ratios",               emoji: "📊",  title: "Ratios & Percentages",      difficulty: "Beginner",     xp: 400, active: true },
  { id: "prealgebra",   href: "/pre-algebra",          emoji: "📝",  title: "Pre-Algebra",               difficulty: "Beginner",     xp: 350, active: true },
  { id: "algebra1",     href: "/algebra1",             emoji: "x",   title: "Algebra 1",                 difficulty: "Intermediate", xp: 500, active: true },
  { id: "geometry",     href: "/geometry-basics",      emoji: "△",   title: "Geometry",                  difficulty: "Intermediate", xp: 450, active: true },
  { id: "algebra2",     href: "/algebra2",             emoji: "x²",  title: "Algebra 2",                 difficulty: "Intermediate", xp: 550, active: true },
  { id: "trigonometry", href: "/trigonometry",         emoji: "sin", title: "Trigonometry",              difficulty: "Advanced",     xp: 500, active: true },
  { id: "precalculus",  href: "/precalculus",          emoji: "lim", title: "Pre-Calculus",              difficulty: "Advanced",     xp: 600, active: true },
  { id: "pythagoras",   href: "/geometry/pythagoras",  emoji: "📐",  title: "Pythagorean Theorem",       difficulty: "Interactive",  xp: 250, active: true },
];

const NAV = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Lessons", href: "/" },
  { icon: FlaskConical, label: "Practice", href: "/" },
  { icon: Trophy, label: "Leaderboard", href: "/" },
];

export default function AppShell({
  children,
  lesson,
}: {
  children: React.ReactNode;
  lesson?: LessonMeta;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#121517", color: "#E8ECF0" }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 border-r"
        style={{ backgroundColor: "#1E2225", borderColor: "#30363B" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="px-6 py-5 border-b flex items-center gap-2.5"
          style={{ borderColor: "#30363B" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
            style={{ backgroundColor: "#489BFC" }}
          >
            B
          </div>
          <span className="font-bold text-lg" style={{ color: "#E8ECF0" }}>
            Brilliant<span style={{ color: "#489BFC" }}>.</span>clone
          </span>
        </Link>

        {/* Navigation */}
        <nav className="px-3 py-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:bg-[#262C30]"
                style={{
                  color: active ? "#489BFC" : "#9CA3AF",
                  backgroundColor: active ? "#489BFC20" : undefined,
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-4 border-t" style={{ borderColor: "#30363B" }} />

        {/* Course list */}
        <div className="px-4 py-3 flex flex-col gap-1 overflow-y-auto flex-1">
          <p className="text-xs uppercase tracking-widest px-2 py-1" style={{ color: "#9CA3AF" }}>
            Courses
          </p>
          {COURSES.map((c) => {
            const isActive = pathname === c.href;
            if (!c.active) {
              return (
                <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-35">
                  <span className="text-base leading-none font-bold" style={{ color: "#9CA3AF" }}>{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#9CA3AF" }}>{c.title}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{c.difficulty} · {c.xp} XP</p>
                  </div>
                  <Lock size={12} style={{ color: "#9CA3AF" }} />
                </div>
              );
            }
            return (
              <Link
                key={c.id}
                href={c.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-[#262C30]"
                style={{ backgroundColor: isActive ? "#489BFC18" : undefined }}
              >
                <span className="text-base leading-none font-bold" style={{ color: isActive ? "#489BFC" : "#9CA3AF" }}>{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: isActive ? "#489BFC" : "#E8ECF0" }}>{c.title}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{c.difficulty} · {c.xp} XP</p>
                </div>
                <ChevronRight size={14} style={{ color: "#489BFC" }} />
              </Link>
            );
          })}
        </div>

        {/* XP strip */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "#30363B" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Star size={14} style={{ color: "#F7B035" }} fill="#F7B035" />
              <span className="text-xs font-semibold" style={{ color: "#F7B035" }}>750 XP</span>
            </div>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>Level 4</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#30363B" }}>
            <div className="h-full rounded-full" style={{ width: "62%", backgroundColor: "#F7B035" }} />
          </div>
          <p className="text-xs mt-1 text-right" style={{ color: "#9CA3AF" }}>250 XP to Level 5</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ backgroundColor: "#1E2225", borderColor: "#30363B" }}
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
              style={{ backgroundColor: "#489BFC" }}
            >
              B
            </div>
            <span className="font-bold" style={{ color: "#E8ECF0" }}>Brilliant.clone</span>
          </Link>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm" style={{ color: "#9CA3AF" }}>
            <Link href="/" className="hover:text-white transition-colors">Courses</Link>
            {lesson && (
              <>
                <ChevronRight size={14} />
                <span>{lesson.category}</span>
                <ChevronRight size={14} />
                <span style={{ color: "#E8ECF0" }}>{lesson.title}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#262C30", color: "#F7B035" }}
            >
              <Star size={14} fill="#F7B035" />
              750 XP
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: "#489BFC", color: "white" }}
            >
              U
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 lg:px-12">
          {/* Optional lesson header */}
          {lesson && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: "#262C30", border: "1px solid #30363B" }}
                >
                  {lesson.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#489BFC20", color: "#489BFC" }}
                    >
                      {lesson.category}
                    </span>
                    <span
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#F7B03520", color: "#F7B035" }}
                    >
                      {lesson.xp} XP
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold" style={{ color: "#E8ECF0" }}>{lesson.title}</h1>
                  <p className="mt-1 text-sm" style={{ color: "#9CA3AF" }}>{lesson.description}</p>
                </div>
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
