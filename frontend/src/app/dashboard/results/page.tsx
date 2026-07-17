"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSearchStore } from "@/store/useSearchStore";
import { MapPin, Sun, CloudRain, Clock, Target, Camera } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const { analysis, setIsAnalyzing } = useSearchStore();

  useEffect(() => {
    if (!analysis) {
      router.push("/dashboard");
    }
    // Make sure we stop loading state if we navigate back
    return () => setIsAnalyzing(false);
  }, [analysis, router, setIsAnalyzing]);

  if (!analysis) return null;

  return (
    <div className="max-w-6xl mx-auto py-8">
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Cinematic Matches</h1>
        <p className="text-muted">Based on your reference profile.</p>
      </motion.div>

      {/* AI Profile Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl p-6 mb-12 flex flex-col md:flex-row gap-8"
      >
        <div className="flex-1">
          <h3 className="text-sm uppercase tracking-widest text-muted mb-4 font-semibold">AI Scene Analysis</h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <div className="text-xs text-muted/70 mb-1">Detected Mood</div>
              <div className="font-medium">{analysis.mood}</div>
            </div>
            <div>
              <div className="text-xs text-muted/70 mb-1">Lighting Style</div>
              <div className="font-medium">{analysis.lighting_style}</div>
            </div>
            <div>
              <div className="text-xs text-muted/70 mb-1">Camera Angle</div>
              <div className="font-medium">{analysis.camera_angle}</div>
            </div>
            <div>
              <div className="text-xs text-muted/70 mb-1">Color Palette</div>
              <div className="flex gap-2 mt-1">
                {analysis.color_palette.map((color) => (
                  <div key={color} className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Location Results */}
      <div className="grid grid-cols-1 gap-8">
        {analysis.locations.map((loc, idx) => (
          <motion.div 
            key={loc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (idx * 0.1) }}
            className="glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px]"
          >
            {/* Image Section */}
            <div className="w-full md:w-2/5 relative h-64 md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={loc.image_url} alt={loc.name} className="object-cover w-full h-full" />
              <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                <Target className="w-4 h-4 text-green-400" />
                {loc.match_score}% Match
              </div>
            </div>
            
            {/* Details Section */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-primary mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wider uppercase">{loc.country}</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">{loc.name}</h2>
              <p className="text-muted leading-relaxed mb-6">{loc.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {loc.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted text-xs uppercase tracking-wider">
                    <Sun className="w-3.5 h-3.5" /> Lighting
                  </div>
                  <div className="font-medium text-sm">{loc.lighting}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted text-xs uppercase tracking-wider">
                    <CloudRain className="w-3.5 h-3.5" /> Weather
                  </div>
                  <div className="font-medium text-sm">{loc.weather}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted text-xs uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Best Time
                  </div>
                  <div className="font-medium text-sm">{loc.time_of_day}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
