"use client";

import { motion } from "framer-motion";
import UploadZone from "@/components/UploadZone";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Scout New Location</h1>
        <p className="text-muted">Upload a reference or provide a prompt to start matching.</p>
      </motion.div>
      
      <UploadZone />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-24"
      >
        <h2 className="text-xl font-semibold mb-6 tracking-tight">Recent Searches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skeleton cards for recent searches */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel rounded-xl h-48 p-4 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
              <div className="relative z-10">
                <div className="h-4 w-24 bg-white/10 rounded mb-2" />
                <div className="h-3 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
