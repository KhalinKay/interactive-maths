"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import TrigLesson from "@/components/lessons/TrigLesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generateTrigQuiz } from "@/lib/subjectQuestions";

const META = {
  icon: "sin",
  title: "Trigonometry",
  description: "Sine, cosine, tangent, the unit circle, and trig identities — geometry meets algebra.",
  category: "Advanced",
  xp: 500,
};

export default function TrigonometryPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <TrigLesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generateTrigQuiz} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}
