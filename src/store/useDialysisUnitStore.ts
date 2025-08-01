import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DialysisUnit = {
  id: string;
  name: string;
  location: string;
};

type DialysisUnitState = {
  selectedUnit: DialysisUnit | null;
  setSelectedUnit: (unit: DialysisUnit) => void;
  resetSelectedUnit: () => void;
};

export const useDialysisUnitStore = create<DialysisUnitState>()(
  persist(
    (set) => ({
      selectedUnit: null,
      setSelectedUnit: (unit) => set({ selectedUnit: unit }),
      resetSelectedUnit: () => set({ selectedUnit: null }),
    }),
    {
      name: 'dialysis-unit-storage', // key in localStorage
    }
  )
);
