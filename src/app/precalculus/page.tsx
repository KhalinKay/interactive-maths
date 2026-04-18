"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import PreCalcLesson from "@/components/lessons/PreCalcLesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generatePreCalcQuiz } from "@/lib/subjectQuestions";

const META = {
  icon: "lim",
  title: "Pre-Calculus",
  description: "Functions, domain/range, limits, vectors - the gateway to university-level mathematics.",
  category: "Advanced",
  xp: 600,
};

export default function PreCalculusPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <PreCalcLesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generatePreCalcQuiz} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}
