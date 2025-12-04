import {
  RELATION_TYPE,
  PROPERTY_TYPE
} from "@/shared/constants/property.constants";
import { SelectButtonOption } from "@/shared/interfaces/forms/select-button.interfaces";

export const MAIN_SEARCH_PROPERTY_KEYS: Record<RELATION_TYPE, string> =
  {
    [RELATION_TYPE.RENT]: "for-rent",
    [RELATION_TYPE.SELL]: "for-sale"
  };

export const MAIN_SEARCH_PROPERTY_TYPE_OPTIONS: SelectButtonOption[] = [
  {
    value: RELATION_TYPE.RENT,
    labelKey: MAIN_SEARCH_PROPERTY_KEYS[RELATION_TYPE.RENT]
  },
  {
    value: RELATION_TYPE.SELL,
    labelKey: MAIN_SEARCH_PROPERTY_KEYS[RELATION_TYPE.SELL]
  }
] as const;

export const MAIN_SEARCH_PROPERTY_TYPES = [
  {
    type: PROPERTY_TYPE.APARTMENT,
    labelKey: "apartments"
  },
  {
    type: PROPERTY_TYPE.HOUSE,
    labelKey: "houses"
  }
] as const;
