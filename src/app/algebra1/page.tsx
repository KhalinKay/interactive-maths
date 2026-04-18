"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import Algebra1Lesson from "@/components/lessons/Algebra1Lesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generateAlgebra1Quiz } from "@/lib/subjectQuestions";

const META = {
  icon: "x",
  title: "Algebra 1",
  description: "Linear equations, inequalities, expanding, factorising, and graphing lines.",
  category: "Core Mathematics",
  xp: 500,
};

export default function Algebra1Page() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <Algebra1Lesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generateAlgebra1Quiz} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}
