import { i18nSupported } from "../constants/i18n.constants";

export type ThemeMode = "light" | "dark" | "system";

export interface UIState {
  themeMode: ThemeMode;
  language: i18nSupported;
}
