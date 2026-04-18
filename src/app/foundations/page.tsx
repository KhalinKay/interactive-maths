"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import FoundationsLesson from "@/components/lessons/FoundationsLesson";
import FoundationQuiz from "@/components/FoundationQuiz";

const META = {
  icon: "🧮",
  title: "Foundations",
  description: "Fractions, arithmetic, and the core building blocks of mathematics.",
  category: "Building Blocks",
  xp: 500,
};

export default function FoundationsPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <FoundationsLesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <FoundationQuiz onHome={() => router.push("/")} courseId="foundations" courseXP={500} />
      )}
    </AppShell>
  );
}
