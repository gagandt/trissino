import { create } from 'zustand'

type AnalysisCriteriaType = {
    criteriaType: string;
    classification: string;
    division: number;
};

export type AnalysisBrandType = {
    brand: string;
    description: string;
    logo: string;
    criteria: AnalysisCriteriaType[];
    keywords: string[];
};

export type SteveAnalysisResultState = {
  analysisResult: AnalysisBrandType[];
}

export type SteveAnalysisResultActions = {
  setAnalysisResult: (analysisResult: AnalysisBrandType[]) => void
}

export type SteveAnalysisResultStore = SteveAnalysisResultState & SteveAnalysisResultActions

export const useSteveAnalysisResult = create<SteveAnalysisResultStore>((set) => ({
  analysisResult: [],
  setAnalysisResult: (analysisResult: AnalysisBrandType[]) => set((_state) => ({ analysisResult })),
}))
