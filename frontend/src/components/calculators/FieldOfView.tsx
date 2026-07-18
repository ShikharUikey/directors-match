"use client";

import { useState, useMemo } from "react";

// Sensor dimensions in mm (width, height)
const SENSORS = {
  "Full Frame (35mm)": { w: 36, h: 24 },
  "Super 35 / APS-C": { w: 24.89, h: 18.66 },
  "Micro 4/3": { w: 17.3, h: 13 },
  "ARRI Alexa 35": { w: 27.99, h: 19.22 },
  "RED Komodo 6K": { w: 27.03, h: 14.26 },
};

export default function FieldOfView() {
  const [sensor, setSensor] = useState<keyof typeof SENSORS>("Full Frame (35mm)");
  const [focalLength, setFocalLength] = useState(50);

  const result = useMemo(() => {
    if (!focalLength) return null;

    const { w, h } = SENSORS[sensor];
    const d = Math.sqrt(w * w + h * h);

    // FoV = 2 * arctan(sensor_dimension / (2 * focal_length))
    const calcFoV = (dim: number) => {
      const radians = 2 * Math.atan(dim / (2 * focalLength));
      return (radians * 180) / Math.PI;
    };

    return {
      horizontal: calcFoV(w),
      vertical: calcFoV(h),
      diagonal: calcFoV(d),
    };
  }, [sensor, focalLength]);

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Field of View (FoV)</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Camera Sensor</label>
          <select 
            value={sensor}
            onChange={(e) => setSensor(e.target.value as keyof typeof SENSORS)}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          >
            {Object.keys(SENSORS).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Focal Length (mm)</label>
          <input 
            type="number" 
            value={focalLength} 
            onChange={(e) => setFocalLength(Number(e.target.value))}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          />
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-card-border)] grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-[var(--color-muted)]">Horizontal</p>
            <p className="text-xl font-medium">{result.horizontal.toFixed(1)}°</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[var(--color-muted)]">Vertical</p>
            <p className="text-xl font-medium">{result.vertical.toFixed(1)}°</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[var(--color-muted)]">Diagonal</p>
            <p className="text-xl font-medium">{result.diagonal.toFixed(1)}°</p>
          </div>
        </div>
      )}
    </div>
  );
}
