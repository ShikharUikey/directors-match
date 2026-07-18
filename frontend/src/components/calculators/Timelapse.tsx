"use client";

import { useState, useMemo } from "react";

export default function Timelapse() {
  const [interval, setIntervalTime] = useState(5); // seconds between shots
  const [clipLength, setClipLength] = useState(10); // final video length in seconds
  const [fps, setFps] = useState(24); // frames per second

  const result = useMemo(() => {
    if (!interval || !clipLength || !fps) return null;

    const totalFrames = clipLength * fps;
    const totalTimeSeconds = totalFrames * interval;
    
    const hours = Math.floor(totalTimeSeconds / 3600);
    const minutes = Math.floor((totalTimeSeconds % 3600) / 60);

    return {
      totalFrames,
      shootingTime: `${hours}h ${minutes}m`,
    };
  }, [interval, clipLength, fps]);

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Time-lapse</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Interval (sec)</label>
          <input 
            type="number" 
            value={interval} 
            onChange={(e) => setIntervalTime(Number(e.target.value))}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Final Clip (sec)</label>
          <input 
            type="number" 
            value={clipLength} 
            onChange={(e) => setClipLength(Number(e.target.value))}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-[var(--color-muted)]">Frame Rate (fps)</label>
          <select 
            value={fps}
            onChange={(e) => setFps(Number(e.target.value))}
            className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-card-border)] text-white"
          >
            <option value="24">24 fps</option>
            <option value="25">25 fps</option>
            <option value="30">30 fps</option>
            <option value="60">60 fps</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-card-border)] grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[var(--color-muted)]">Total Frames</p>
            <p className="text-xl font-medium">{result.totalFrames} photos</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-muted)]">Shooting Time</p>
            <p className="text-xl font-medium">{result.shootingTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}
