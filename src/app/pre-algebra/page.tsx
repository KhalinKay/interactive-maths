"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import PreAlgebraLesson from "@/components/lessons/PreAlgebraLesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generatePreAlgebraQuiz } from "@/lib/subjectQuestions";

const META = {
  icon: "x",
  title: "Pre-Algebra",
  description: "BODMAS, negative numbers, exponents, roots, factors - the bridge from arithmetic to algebra.",
  category: "Building Blocks",
  xp: 350,
};

export default function PreAlgebraPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <PreAlgebraLesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generatePreAlgebraQuiz} courseId="prealgebra" courseXP={350} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}
