import { CurrencyList } from "@/shared/constants/currency.constants";
import {
  i18nSupported,
  localizationEnum
} from "@/shared/constants/i18n.constants";
import { CurrencyEnum } from "@/shared/interfaces/currency/currency.interfaces";

const production = import.meta.env.MODE === "production";
const baseURL = production
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL;

export const environment = {
  production,
  baseURL,
  apiURL: `${baseURL}api`,
  localization: localizationEnum.RO,
  googleAPIKey: "AIzaSyBxpjor5tThzdeEUyRUl-rTQ2EX2zJY7HY",
  cloudinary: {
    cloudinaryApiKey: "275396168659691",
    cloudinaryCloudName: "ddmamrq9r",
    uploadPresets: {
      PROPERTY_PHOTO: "PROPERTY_PHOTO"
    },
    get cloudinaryCDN(): string {
      return `https://res.cloudinary.com/${this.cloudinaryCloudName}/image/upload/`;
    }
  },
  darkThemeMapId: "27b33c3deadc8b9a",
  lightThemeMapId: "610db47a2f81dee6",
  get availableLanguages() {
    return environment.localization === localizationEnum.MD
      ? [i18nSupported.EN, i18nSupported.RO, i18nSupported.RU]
      : [i18nSupported.EN, i18nSupported.RO];
  },
  get availableCurrencyList() {
    return environment.localization === localizationEnum.MD
      ? CurrencyList.filter((item) => item.value !== CurrencyEnum.RON)
      : CurrencyList;
  }
};
