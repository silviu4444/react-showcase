import { localizationEnum } from "./i18n.constants";

export const defaultLocalizationCoordinates: Record<
  localizationEnum,
  { lat: number; lng: number }
> = {
  [localizationEnum.MD]: { // Chisinau
    lat: 47.028916663,
    lng: 28.841551
  },
  [localizationEnum.RO]: { // Bucharest
    lat: 44.437711,
    lng: 26.0973669
  }
};
