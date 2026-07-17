"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, FileVideo2, Wand2, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store/useSearchStore";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [prompt, setPrompt] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setAnalysis, setIsAnalyzing, isAnalyzing } = useSearchStore();

  const handleAnalyzeText = async () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      const res = await fetch("http://localhost:8000/api/analyze/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      setAnalysis(data);
      router.push("/dashboard/results");
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/analyze/image", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      setAnalysis(data);
      router.push("/dashboard/results");
    } catch (error) {
      console.error("Upload failed:", error);
      setIsAnalyzing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto mt-12 relative"
    >
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
            </div>
            <h3 className="text-xl font-medium mt-6 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Analyzing Cinematic Profile...
            </h3>
            <p className="text-muted text-sm mt-2">Extracting mood, lighting, and composition.</p>
          </motion.div>
        )}
      </AnimatePresence>

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
        onDrop={onDrop}
      >
        <div className="p-16 flex flex-col items-center justify-center text-center relative z-10">
          
          <AnimatePresence mode="wait">
            {!showPromptInput ? (
              <motion.div
                key="upload-buttons"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center w-full"
              >
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
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    accept="image/jpeg, image/png, image/webp"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Upload Image
                  </button>
                  
                  <span className="text-muted/50 text-sm font-medium uppercase tracking-widest">or</span>
                  
                  <button 
                    onClick={() => setShowPromptInput(true)}
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <Wand2 className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                    Text Prompt
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="prompt-input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center w-full max-w-lg"
              >
                <h3 className="text-2xl font-medium tracking-tight mb-4 flex items-center gap-2">
                  <Wand2 className="w-6 h-6 text-primary" />
                  Describe the Scene
                </h3>
                
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A neon-lit cyberpunk alleyway at night with heavy rain and reflections on the pavement..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none mb-6"
                />
                
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => setShowPromptInput(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-medium hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAnalyzeText}
                    disabled={!prompt.trim()}
                    className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Matches
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showPromptInput && (
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
          )}
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
