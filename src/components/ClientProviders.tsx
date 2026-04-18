"use client";
import { ProgressProvider } from "@/context/ProgressContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
