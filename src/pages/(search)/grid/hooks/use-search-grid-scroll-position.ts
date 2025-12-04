import { create } from "zustand";

interface SearchGridScrollPositionDef {
  position: number;
  setScrollPosition: (position: number) => void;
}

export const useSearchGridScrollPosition = create<SearchGridScrollPositionDef>(
  (set) => ({
    position: 0,
    setScrollPosition: (position: number) => set({ position })
  })
);
