"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import GeometryLesson from "@/components/lessons/GeometryLesson";
import GenericQuiz from "@/components/GenericQuiz";
import { generateGeometryQuiz } from "@/lib/subjectQuestions";

const META = {
  icon: "△",
  title: "Geometry",
  description: "Angles, area, volume, the Pythagorean theorem — apply mathematics to shapes and space.",
  category: "Core Mathematics",
  xp: 450,
};

export default function GeometryBasicsPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"lesson" | "quiz">("lesson");

  return (
    <AppShell lesson={META}>
      {phase === "lesson" ? (
        <GeometryLesson onQuiz={() => setPhase("quiz")} />
      ) : (
        <GenericQuiz generate={generateGeometryQuiz} onHome={() => router.push("/")} />
      )}
    </AppShell>
  );
}
