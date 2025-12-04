import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";
import AppProvider from "./shared/providers/app.provider.tsx";

import i18n from "i18next";

import translations_en from "./assets/locales/en/default.json";
import translations_ro from "./assets/locales/ro/default.json";
import translations_ru from "./assets/locales/ru/default.json";
import { i18nSupported } from "./shared/constants/i18n.constants.ts";
import { defaultUIState } from "./shared/constants/ui.constants.ts";
import { getUIStateFromLocalStorage } from "./shared/utils/local-storage.utils.ts";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: getUIStateFromLocalStorage()?.language || defaultUIState.language,
  resources: {
    [i18nSupported.EN]: {
      translation: translations_en
    },
    [i18nSupported.RO]: {
      translation: translations_ro
    },
    [i18nSupported.RU]: {
      translation: translations_ru
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
