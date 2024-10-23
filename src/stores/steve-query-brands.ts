import { create } from 'zustand'


export type BrandType = {
    brand: string;
    link: string;
    brandLogo: string;
};

export type SteveBrandsState = {
  brands: BrandType[];
}

export type SteveBrandsActions = {
  setBrands: (analysisResult: BrandType[]) => void
}

export type SteveBrandsStoreType = SteveBrandsState & SteveBrandsActions

export const useSteveBrands = create<SteveBrandsStoreType>((set) => ({
  brands: [],
  setBrands: (brands: BrandType[]) => set((_state) => ({ brands })),
}))
