import { UIState } from "@/shared/interfaces/ui.interfaces";
import { getPreferredLanguage } from "../utils/i18n.utils";

export const defaultUIState: UIState = {
  themeMode: "system",
  language: getPreferredLanguage()
};
