import { i18nOptions, i18nSupported } from "../constants/i18n.constants";
import { LOCAL_STORAGE_KEYS } from "../constants/local-storage.constants";
import { UIStateDef } from "../state/use-ui-state";

type getBrowserLocalesOption = {
  languageCodeOnly?: boolean;
};

function getBrowserLocales(options: getBrowserLocalesOption = {}) {
  const defaultOptions = {
    languageCodeOnly: true
  };
  const opt: getBrowserLocalesOption = {
    ...defaultOptions,
    ...options
  };

  const browserLocales = navigator
    ? navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages
    : [];

  if (!browserLocales?.length) {
    return [];
  }

  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim();
    return opt.languageCodeOnly
      ? trimmedLocale?.split(/-|_/)?.[0]
      : trimmedLocale;
  });
}

export function getPreferredLanguage(): i18nSupported {
  const chosenLanguage = (
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.UI_PREFERENCES) as string
    )?.state as UIStateDef
  )?.state?.language;

  if (chosenLanguage) {
    return chosenLanguage;
  }

  const locale = getBrowserLocales();

  if (!locale.length) {
    return i18nSupported.EN;
  }

  const supportedLngList = i18nOptions.map((item) => item.value);
  return (
    (locale.find((lng) =>
      supportedLngList.includes(lng as i18nSupported)
    ) as i18nSupported) || i18nSupported.EN
  );
}
