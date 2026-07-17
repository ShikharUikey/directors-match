"use client";

import { motion } from "framer-motion";
import UploadZone from "@/components/UploadZone";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-6">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase text-white/80">AI Location Scout</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            Find the perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              cinematic location.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Upload a reference image or text prompt. Our AI analyzes the mood, lighting, and composition to find the exact match in the real world.
          </p>
        </motion.div>

        <UploadZone />

      </div>
    </main>
  );
}
