"use client";

import * as SunCalc from "suncalc";

interface LightInfoPanelProps {
  date: Date;
  location: { lat: number; lng: number };
  onTimeChange: (newDate: Date) => void;
}

export default function LightInfoPanel({ date, location, onTimeChange }: LightInfoPanelProps) {
  const times = SunCalc.getTimes(date, location.lat, location.lng);
  
  const formatTime = (d: Date) => {
    if (isNaN(d.getTime())) return "--:--";
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseFloat(e.target.value);
    const newDate = new Date(date);
    newDate.setHours(Math.floor(hours));
    newDate.setMinutes((hours % 1) * 60);
    onTimeChange(newDate);
  };

  const currentHourFraction = date.getHours() + date.getMinutes() / 60;

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Light Information</h2>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--color-muted)]">Current Time</span>
          <span className="font-mono text-lg">{formatTime(date)}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="23.99" 
          step="0.05" 
          value={currentHourFraction}
          onChange={handleSliderChange}
          className="w-full h-2 bg-[var(--color-card)] rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-lg">
          <p className="text-xs text-[var(--color-muted)] mb-1">Sunrise</p>
          <p className="text-lg font-medium">{formatTime(times.sunrise)}</p>
        </div>
        <div className="glass p-4 rounded-lg">
          <p className="text-xs text-[var(--color-muted)] mb-1">Sunset</p>
          <p className="text-lg font-medium">{formatTime(times.sunset)}</p>
        </div>
        <div className="glass p-4 rounded-lg border border-yellow-500/20">
          <p className="text-xs text-yellow-500/80 mb-1">Golden Hour (Eve)</p>
          <p className="text-lg font-medium">{formatTime(times.goldenHour)}</p>
        </div>
        <div className="glass p-4 rounded-lg border border-blue-500/20">
          <p className="text-xs text-blue-500/80 mb-1">Blue Hour (Eve)</p>
          <p className="text-lg font-medium">{formatTime(times.dusk)}</p>
        </div>
      </div>
    </div>
  );
}
