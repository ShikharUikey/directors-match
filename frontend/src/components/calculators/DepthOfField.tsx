"use client";

import { useState, useMemo } from "react";

const SENSORS = {
  "Full Frame (35mm)": 0.03,
  "Super 35 / APS-C": 0.019,
  "Micro 4/3": 0.015,
  "ARRI Alexa 35": 0.021,
  "RED Komodo 6K": 0.02,
};

export default function DepthOfField() {
  const [sensor, setSensor] = useState<keyof typeof SENSORS>("Full Frame (35mm)");
  const [focalLength, setFocalLength] = useState(50);
  const [aperture, setAperture] = useState(2.8);
  const [distance, setDistance] = useState(5); // in meters

  const result = useMemo(() => {
    const coc = SENSORS[sensor];
    const f = focalLength;
    const n = aperture;
    const d = distance * 1000; // convert to mm

    if (!f || !n || !d) return null;

    // Hyperfocal distance: H = (f^2) / (N * CoC) + f
    const hyperfocal = (f * f) / (n * coc) + f;

    // Near Limit: Dn = (H * d) / (H + (d - f))
    const nearLimit = (hyperfocal * d) / (hyperfocal + (d - f));

    // Far Limit: Df = (H * d) / (H - (d - f))
    const farLimit = hyperfocal > (d - f) ? (hyperfocal * d) / (hyperfocal - (d - f)) : Infinity;

    // Total DoF
    const totalDof = farLimit === Infinity ? Infinity : farLimit - nearLimit;

    return {
      hyperfocal: hyperfocal / 1000,
      nearLimit: nearLimit / 1000,
      farLimit: farLimit === Infinity ? "Infinity" : (farLimit / 1000).toFixed(2) + "m",
      totalDof: totalDof === Infinity ? "Infinity" : (totalDof / 1000).toFixed(2) + "m",
    };
  }, [sensor, focalLength, aperture, distance]);

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Depth of Field (DoF)</h2>
      
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

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Aperture (f/)</label>
          <input 
            type="number" 
            step="0.1"
            value={aperture} 
            onChange={(e) => setAperture(Number(e.target.value))}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Subject Distance (m)</label>
          <input 
            type="number" 
            step="0.1"
            value={distance} 
            onChange={(e) => setDistance(Number(e.target.value))}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          />
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-card-border)] grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[var(--color-muted)]">Hyperfocal Distance</p>
            <p className="text-xl font-medium">{result.hyperfocal.toFixed(2)}m</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-muted)]">Near Limit</p>
            <p className="text-xl font-medium">{result.nearLimit.toFixed(2)}m</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-muted)]">Far Limit</p>
            <p className="text-xl font-medium">{result.farLimit}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-muted)]">Total DoF</p>
            <p className="text-xl font-medium">{result.totalDof}</p>
          </div>
        </div>
      )}
    </div>
  );
}
