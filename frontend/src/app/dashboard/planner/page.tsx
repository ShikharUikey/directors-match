"use client";

import { useState } from "react";
import MapPlannerNoSSR from "@/components/planner/MapPlannerNoSSR";
import LightInfoPanel from "@/components/planner/LightInfoPanel";

export default function PlannerPage() {
  // Default to a central location (e.g., Hollywood)
  const [location, setLocation] = useState({ lat: 34.0928, lng: -118.3287 });
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col h-full min-h-screen p-6 md:p-8 gap-6 max-w-7xl mx-auto">
      <header>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Location Planner</h1>
        <p className="text-[var(--color-muted)]">Track Sun & Moon paths, and calculate perfect lighting times for your shoot.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        {/* Map Area */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative border border-[var(--color-card-border)]">
          <MapPlannerNoSSR 
            date={date} 
            location={location} 
            onLocationChange={setLocation} 
          />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <LightInfoPanel 
            date={date} 
            location={location} 
            onTimeChange={setDate} 
          />
          
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-4">Location Details</h3>
            <div className="text-sm">
              <p className="mb-2"><span className="text-[var(--color-muted)] w-20 inline-block">Latitude:</span> {location.lat.toFixed(6)}</p>
              <p><span className="text-[var(--color-muted)] w-20 inline-block">Longitude:</span> {location.lng.toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
