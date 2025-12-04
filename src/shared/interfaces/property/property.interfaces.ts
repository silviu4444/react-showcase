import {
  CONTACT_TYPE,
  MINIMUM_LEASE_TERM_TYPE,
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { CurrencyType } from "../currency/currency.interfaces";
import { DtoWithPagination } from "../dto.interfaces";

export type PropertyPhotoDto = {
  publicId: string;
};

export type MinimumLeaseFeeDto = {
  type: MINIMUM_LEASE_TERM_TYPE;
  value: number;
};

export type MinimumLeaseFeeDef = {
  type: MINIMUM_LEASE_TERM_TYPE;
  value: number;
};

export type BasicSearchFiltersDef = {
  relationType: RELATION_TYPE;
  propertyType: PROPERTY_TYPE;
};

export type QueryFiltersParams = {
  rt: RELATION_TYPE;
  pt: PROPERTY_TYPE;
  pc?: PROPERTY_CONDITIONS_TYPE | null;
  city?: string;
  lat?: string | null;
  lng?: string | null;
  surface?: string | null;
  rn?: number | null;
  bn?: number | null;
  hasElevator?: boolean | null;
  pf?: PROPERTY_FURNITURE_TYPE;
  airC?: boolean | null;
  balcony?: boolean | null;
  cellar?: boolean | null;
  garage?: boolean | null;
  terrace?: boolean | null;
  wotw?: boolean | null;
  petF?: boolean | null;
  priceF?: string;
  priceT?: string;
  wria?: boolean | null;
  zoom?: string;
  pId?: string | null;
  page?: string;
};

export type QueryFiltersParamsKeys = keyof QueryFiltersParams;

export type PropertyAddressDto = {
  residenceComplex: string | null;
  street: string;
  streetNumber?: string | null;
  city: string;
  postalCode: string;
  country: string;
  county: string;
  latitude: number;
  longitude: number;
  floor: string;
};

export type PropertyAddressDef = {
  residenceComplex?: string | null;
  street: string;
  streetNumber?: string | null;
  city: string;
  postalCode: string;
  country: string;
  county: string;
  latitude: number;
  longitude: number;
  floor: string;
};

export type PropertyStatusType = "ACTIVE" | "PENDING" | "DELETED" | "EXPIRED";

export type PropertyTypeDto = {
  id?: string | null;
  relationType: RELATION_TYPE;
  contactPreference: CONTACT_TYPE;
  price: CurrencyType;
  views: number;
  description?: string | null;
  expensesMonthly: CurrencyType;
  details: {
    propertyType: PROPERTY_TYPE;
    conditions: PROPERTY_CONDITIONS_TYPE;
    address: PropertyAddressDto;
    isLastFloor: boolean;
    surface: number;
    roomNumber: number;
    bathroomNumber: number;
    hasElevator: boolean;
    furniture: PROPERTY_FURNITURE_TYPE;
    commodities: {
      hasAirConditioning: boolean;
      hasClosetInTheWall: boolean;
      hasBalcony: boolean;
      hasCellar: boolean;
      hasParking: boolean;
      hasTerrace: boolean;
    };
  };
  contractDetails: {
    maximumNumberOfTenants: number;
    petFriendly: boolean;
    agencyFee: CurrencyType;
    minimumLeaseTerm: MinimumLeaseFeeDto;
    rentInAdvance: number;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    picture: string;
    phoneNumbers: {
      countryCode: string;
      number: string;
      isPrimary: boolean;
    }[];
  };
  isFavorite: boolean;
  photos: PropertyPhotoDto[];
  status: PropertyStatusType;
  createdAt: string;
  updatedAt: string;
};

export type PropertyTypeDef = {
  id: string;
  relationType: RELATION_TYPE;
  price: CurrencyType;
  description?: string | null;
  expensesMonthly: CurrencyType;
  contactPreference: CONTACT_TYPE;
  details: {
    propertyType: PROPERTY_TYPE;
    conditions: PROPERTY_CONDITIONS_TYPE;
    address: PropertyAddressDef;
    isLastFloor: boolean;
    surface: number;
    roomNumber: number;
    bathroomNumber: number;
    hasElevator: boolean;
    furniture: PROPERTY_FURNITURE_TYPE;
    residentialComplex: string | null;
    commodities: {
      hasAirConditioning: boolean;
      hasClosetInTheWall: boolean;
      hasBalcony: boolean;
      hasCellar: boolean;
      hasParking: boolean;
      hasTerrace: boolean;
    };
  };
  contractDetails: {
    maximumNumberOfTenants: number;
    petFriendly: boolean;
    agencyFee: CurrencyType;
    minimumLeaseTerm: MinimumLeaseFeeDef;
    rentInAdvance: string;
  };
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    picture: string | null;
    phoneNumbers: {
      countryCode: string;
      number: string;
      isPrimary: boolean;
    }[];
  };
  isFavorite: boolean;
  views: number;
  status: PropertyStatusType;
  photos: PropertyPhotoDto[];
  createdAt: string;
  updatedAt: string;
};

export type PropertyPreviewDef = {
  id: string;
  isFavorite: boolean;
  details: {
    propertyCondition: PROPERTY_CONDITIONS_TYPE;
    address: PropertyAddressDef;
    surface: number;
    roomNumber: number;
    bathroomNumber: number;
  };
  price: CurrencyType;
  contact: {
    contactPreference: CONTACT_TYPE;
    phoneNumber: string;
  };
  photos: PropertyPhotoDto[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type PropertyPreviewDto = {
  id: string;
  isFavorite: boolean;
  details: {
    propertyCondition: PROPERTY_CONDITIONS_TYPE;
    address: PropertyAddressDef;
    surface: number;
    roomNumber: number;
    bathroomNumber: number;
  };
  price: CurrencyType;
  contactPreference: CONTACT_TYPE;
  photos: PropertyPhotoDto[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type PreviewPropertyDto = DtoWithPagination<{
  propertiesPreview: PropertyPreviewDto[];
}>;
