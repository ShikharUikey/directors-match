import { create } from 'zustand';

export interface Location {
  id: string;
  name: string;
  description: string;
  country: string;
  image_url: string;
  match_score: number;
  lighting: string;
  weather: string;
  time_of_day: string;
  tags: string[];
}

export interface AnalysisResponse {
  mood: string;
  color_palette: string[];
  lighting_style: string;
  camera_angle: string;
  locations: Location[];
}

interface SearchStore {
  analysis: AnalysisResponse | null;
  isAnalyzing: boolean;
  setAnalysis: (analysis: AnalysisResponse | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  analysis: null,
  isAnalyzing: false,
  setAnalysis: (analysis) => set({ analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
}));
