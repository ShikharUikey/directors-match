"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, FileVideo2, Wand2 } from "lucide-react";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div
        className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${
          isDragging
            ? "border-primary bg-primary/5 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            : "border-card-border glass-panel hover:bg-white/[0.04]"
        } border border-dashed`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          // TODO: Handle file drop
        }}
      >
        <div className="p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 ease-out">
            <Upload className="w-8 h-8 text-white/70 group-hover:text-white transition-colors" />
          </div>
          
          <h3 className="text-2xl font-medium tracking-tight mb-3">
            Upload your cinematic reference
          </h3>
          
          <p className="text-muted text-lg max-w-md mb-8 leading-relaxed">
            Drag & drop a movie screenshot, location photo, or provide a text prompt to discover matching locations.
          </p>

          <div className="flex gap-4 items-center mb-8">
            <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
              <ImageIcon className="w-5 h-5" />
              Upload Image
            </button>
            <span className="text-muted/50 text-sm font-medium uppercase tracking-widest">or</span>
            <button className="px-6 py-3 rounded-full bg-white/5 border border-white/10 font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Wand2 className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
              Text Prompt
            </button>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted/60 font-medium tracking-wide">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>JPG, PNG</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <FileVideo2 className="w-4 h-4" />
              <span>Movie Stills</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div>MAX 50MB</div>
          </div>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
