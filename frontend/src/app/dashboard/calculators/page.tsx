"use client";

import DepthOfField from "@/components/calculators/DepthOfField";
import FieldOfView from "@/components/calculators/FieldOfView";
import Timelapse from "@/components/calculators/Timelapse";

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col h-full min-h-screen p-6 md:p-8 gap-8 max-w-5xl mx-auto">
      <header>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Cinematography Calculators</h1>
        <p className="text-[var(--color-muted)]">Essential tools for calculating Depth of Field, Field of View, and Time-lapse parameters.</p>
      </header>

      <div className="flex flex-col gap-8">
        <DepthOfField />
        <FieldOfView />
        <Timelapse />
      </div>
    </div>
  );
}
