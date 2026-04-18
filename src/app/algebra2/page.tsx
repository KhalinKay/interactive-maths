"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Algebra2Lesson from "@/components/lessons/Algebra2Lesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generateAlgebra2Quiz } from "@/lib/subjectQuestions";

const META = {
  icon: "x²",
  title: "Algebra 2",
  description: "Quadratics, polynomials, logarithms, exponential functions, and sequences.",
  category: "Advanced",
  xp: 550,
};

export default function Algebra2Page() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <Algebra2Lesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generateAlgebra2Quiz} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}
