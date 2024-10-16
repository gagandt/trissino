import { create } from 'zustand'


export interface CriteriaType {
  criteriaType: string;
  ends: string[];
  noOfDivisions: number;
}

export type SteveAnalysisQueryState = {
  term: string
  city: string
  keywords: string[]
  criterias: CriteriaType[]
}

export type SteveAnalysisQueryActions = {
  setTerm: (term: string) => void
  setCity: (city: string) => void
  setKeywords: (keywords: string[]) => void
  setCriterias: (criterias: CriteriaType[]) => void
}

export type SteveAnalysisQueryStore = SteveAnalysisQueryState & SteveAnalysisQueryActions

export const useSteveAnalysisQueryStore = create<SteveAnalysisQueryStore>((set) => ({
  term: "",
  city: "",
  keywords: [],
  criterias: [
    {
      criteriaType: "",
      ends: ["Low", "High"],
      noOfDivisions: 3,
    },
  ],
  setTerm: (term: string) => {
    console.log("term", term);

    set((_state) => ({ term: term }))
  },
  setCity: (city: string) => set((_state) => ({ city })),
  setKeywords: (keywords: string[]) => set((_state) => ({ keywords })),
  setCriterias: (criterias: CriteriaType[]) => set((_state) => ({ criterias })),
}))
