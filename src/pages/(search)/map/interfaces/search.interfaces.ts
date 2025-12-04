import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { CurrencyType } from "@/shared/interfaces/currency/currency.interfaces";
import { Dto } from "@/shared/interfaces/dto.interfaces";

export type GeoCoordinatesDto = {
  latitude: number;
  longitude: number;
};

export type DrawToSearchPropertiesDto = Dto<{
  relationType: RELATION_TYPE;
  propertyType: PROPERTY_TYPE;
  geoCoordinates: GeoCoordinatesDto[];
}>;

export type DrawToSearchPin = {
  properties: {
    propertyId: string;
    price: CurrencyType;
    isFavorite: boolean;
  }[];
} & GeoCoordinatesDto;

export type DrawToSearchPropertyResponseDto = Dto<{
  pins: DrawToSearchPin[];
}>;
