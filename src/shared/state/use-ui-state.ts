import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "@/shared/constants/local-storage.constants";
import { defaultUIState } from "@/shared/constants/ui.constants";
import { UIState } from "@/shared/interfaces/ui.interfaces";

export interface UIStateDef {
  state: UIState;
  setState: (data: Partial<UIState>) => void;
}

const useUIState = create(
  persist<UIStateDef>(
    (set, get) => ({
      state: defaultUIState,
      setState: (partialState: Partial<UIState>) => {
        set({ state: { ...get().state, ...partialState } });
      }
    }),
    {
      name: LOCAL_STORAGE_KEYS.UI_PREFERENCES,
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useUIState;
