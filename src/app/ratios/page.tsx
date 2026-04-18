"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import RatiosLesson from "@/components/lessons/RatiosLesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generateRatiosQuiz } from "@/lib/subjectQuestions";

const META = {
  icon: "📊",
  title: "Ratios, Percentages & Proportions",
  description:
    "Master multiplicative thinking — the foundation of all algebra — through real-world problems.",
  category: "Building Blocks",
  xp: 400,
};

export default function RatiosPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <RatiosLesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generateRatiosQuiz} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}

