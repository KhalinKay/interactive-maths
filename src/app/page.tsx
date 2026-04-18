import AppShell from "@/components/AppShell";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

// ── Curriculum data ───────────────────────────────────────────────────────────

const SECTIONS = [
  {
    label: "Building Blocks",
    description: "Master the fundamentals before advancing.",
    courses: [
      {
        id: "foundations",
        href: "/foundations",
        emoji: "🧮",
        title: "Foundations",
        description:
          "Fractions, arithmetic, and the building blocks of maths — with randomised interactive questions.",
        category: "Beginner",
        xp: 500,
        questions: 8,
        color: "#489BFC",
      },
      {
        id: "ratios",
        href: "/ratios",
        emoji: "📊",
        title: "Ratios, Percentages & Proportions",
        description:
          "Ratios, percent change, unit rates, scaling, and real-world problems like discounts and interest.",
        category: "Beginner",
        xp: 400,
        questions: 8,
        color: "#38BDF8",
      },
      {
        id: "prealgebra",
        href: "/pre-algebra",
        emoji: "📝",
        title: "Pre-Algebra",
        description:
          "BODMAS, negative numbers, exponents, roots, factors — the bridge from arithmetic to algebra.",
        category: "Beginner",
        xp: 350,
        questions: 8,
        color: "#A78BFA",
      },
    ],
  },
  {
    label: "Core Mathematics",
    description: "Where numbers become symbols and logic becomes visual.",
    courses: [
      {
        id: "algebra1",
        href: "/algebra1",
        emoji: "x",
        title: "Algebra 1",
        description:
          "Linear equations, inequalities, expanding, factorising, and graphing lines.",
        category: "Intermediate",
        xp: 500,
        questions: 8,
        color: "#F472B6",
      },
      {
        id: "geometry",
        href: "/geometry-basics",
        emoji: "△",
        title: "Geometry",
        description:
          "Angles, polygons, area, volume, the Pythagorean theorem, and coordinate geometry.",
        category: "Intermediate",
        xp: 450,
        questions: 8,
        color: "#27C07B",
      },
      {
        id: "algebra2",
        href: "/algebra2",
        emoji: "x²",
        title: "Algebra 2",
        description:
          "Quadratics, logarithms, exponential functions, polynomials, and sequences.",
        category: "Intermediate",
        xp: 550,
        questions: 8,
        color: "#F7B035",
      },
    ],
  },
  {
    label: "Higher Mathematics",
    description: "Preparation for university-level mathematics.",
    courses: [
      {
        id: "trigonometry",
        href: "/trigonometry",
        emoji: "sin",
        title: "Trigonometry",
        description:
          "Sine, cosine, tangent, the unit circle, triangle solving, and trig identities.",
        category: "Advanced",
        xp: 500,
        questions: 8,
        color: "#FB923C",
      },
      {
        id: "precalculus",
        href: "/precalculus",
        emoji: "lim",
        title: "Pre-Calculus",
        description:
          "Functions, limits, complex numbers, vectors, and preparation for calculus.",
        category: "Advanced",
        xp: 600,
        questions: 8,
        color: "#34D399",
      },
      {
        id: "pythagoras",
        href: "/geometry/pythagoras",
        emoji: "📐",
        title: "Interactive: Pythagoras",
        description:
          "Drag a point and watch a² + b² = c² come alive. A fully interactive geometry lesson.",
        category: "Interactive",
        xp: 250,
        questions: 3,
        color: "#60A5FA",
      },
    ],
  },
];

// ── Course card ───────────────────────────────────────────────────────────────

function CourseCard({
  href,
  emoji,
  title,
  description,
  category,
  xp,
  questions,
  color,
}: {
  href: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  xp: number;
  questions: number;
  color: string;
}) {
  const locked = href === "#";
  return (
    <div
      className="rounded-2xl flex flex-col overflow-hidden transition-all duration-200 hover:translate-y-[-2px]"
      style={{
        backgroundColor: "#1E2225",
        border: "1px solid #30363B",
        opacity: locked ? 0.55 : 1,
      }}
    >
      <div className="h-1 w-full" style={{ backgroundColor: color }} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: `${color}18`,
              border: `1px solid ${color}30`,
              color: color,
            }}
          >
            {emoji}
          </div>
          {locked && <Lock size={15} style={{ color: "#9CA3AF" }} />}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {category}
            </span>
          </div>
          <h3 className="text-sm font-bold leading-snug" style={{ color: "#E8ECF0" }}>
            {title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
            {description}
          </p>
        </div>

        <div
          className="mt-auto flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid #30363B" }}
        >
          <div className="flex items-center gap-3 text-xs" style={{ color: "#9CA3AF" }}>
            <span>{questions} questions</span>
            <span style={{ color: "#F7B035" }}>+{xp} XP</span>
          </div>
          {locked ? (
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "#9CA3AF" }}
            >
              <Lock size={10} /> Locked
            </span>
          ) : (
            <Link
              href={href}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 hover:brightness-110"
              style={{ backgroundColor: color, color: "white" }}
            >
              Begin <ArrowRight size={12} />
            </Link>
          )}
        </div>
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
        <div className="mb-10">
          <h1 className="text-3xl font-bold" style={{ color: "#E8ECF0" }}>
            Your Learning Path
          </h1>
          <p className="mt-2 text-base" style={{ color: "#9CA3AF" }}>
            Work through the curriculum in order. Each section builds on the last.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {SECTIONS.map((section, si) => (
            <div key={section.label}>
              {/* Section header */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ backgroundColor: "#489BFC" }}
                >
                  {si + 1}
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "#E8ECF0" }}>
                    {section.label}
                  </h2>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    {section.description}
                  </p>
                </div>
                <div
                  className="flex-1 h-px ml-2"
                  style={{ backgroundColor: "#30363B" }}
                />
              </div>

              {/* Course grid */}
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


