import {
  PROPERTY_TYPE,
  PROPERTY_TYPE_KEYS
} from "@/shared/constants/property.constants";
import {
  PropertyPreviewDef,
  PropertyTypeDef
} from "@/shared/interfaces/property/property.interfaces";
import { useTranslation } from "react-i18next";
import { MAIN_SEARCH_PROPERTY_KEYS } from "../constants/main-search.constants";

type FormatPropertyTitlePayload = {
  property: PropertyTypeDef;
  displayRelation?: boolean;
};
type FormatPropertyPreviewTitlePayload = {
  property: PropertyPreviewDef;
  propertyType: PROPERTY_TYPE;
};

const useFormatPropertyTitle = () => {
  const [t] = useTranslation();

  function formatPropertyTitle({
    property,
    displayRelation
  }: FormatPropertyTitlePayload): string {
    const relationValueKey =
      displayRelation &&
      property.relationType &&
      MAIN_SEARCH_PROPERTY_KEYS[property.relationType];

    return `${t(PROPERTY_TYPE_KEYS[property.details.propertyType])} ${relationValueKey ? t(relationValueKey).toLowerCase() : ""}, ${property.details.roomNumber} ${t(
      property.details.roomNumber === 1 ? "room" : "rooms"
    ).toLowerCase()}, ${property.details.surface}  m²`;
  }

  function formatPreviewTitle({
    property,
    propertyType
  }: FormatPropertyPreviewTitlePayload): string {
    return `${t(PROPERTY_TYPE_KEYS[propertyType])}, ${property.details.roomNumber} ${t(
      property.details.roomNumber === 1 ? "room" : "rooms"
    ).toLowerCase()}, ${property.details.surface}  m²`;
  }

  return {
    formatPropertyTitle,
    formatPreviewTitle
  };
};

export default useFormatPropertyTitle;
