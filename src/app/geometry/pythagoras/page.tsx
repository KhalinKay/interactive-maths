import AppShell from "@/components/AppShell";
import PythagorasLesson from "@/components/PythagorasLesson";

export default function PythagorasPage() {
  return (
    <AppShell
      lesson={{
        icon: "📐",
        title: "The Pythagorean Theorem",
        description:
          "Drag, explore, and discover why a² + b² always equals c² for every right triangle.",
        category: "Geometry",
        xp: 250,
      }}
    >
      <PythagorasLesson />
    </AppShell>
  );
}
