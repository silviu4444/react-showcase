import { LOCAL_STORAGE_KEYS } from "../constants/local-storage.constants";
import { UIState } from "../interfaces/ui.interfaces";

export function getUIStateFromLocalStorage(): UIState | null {
  try {
    return JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.UI_PREFERENCES) as string
    )?.state?.state;
  } catch (error) {
    return null;
  }
}
