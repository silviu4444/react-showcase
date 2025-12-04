import {
  CONTACT_TYPE,
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { CurrencyType } from "@/shared/interfaces/currency/currency.interfaces";
import {
  MinimumLeaseFeeDef,
  PropertyAddressDef
} from "@/shared/interfaces/property/property.interfaces";

export type CreateUpdatePropertyDto = {
  propertyId: string | null | undefined;
  price: CurrencyType;
  description: string | null | undefined;
  expensesMonthly: CurrencyType;
  property: {
    address: PropertyAddressDef;
    bathroomNumber: number;
    roomNumber: number;
    commodities: {
      hasAirConditioning: boolean;
      hasBalcony: boolean;
      hasCellar: boolean;
      hasClosetInTheWall: boolean;
      hasParking: boolean;
      hasTerrace: boolean;
    };
    hasElevator: boolean;
    houseFurniture: PROPERTY_FURNITURE_TYPE;
    isLastFloor: boolean;
    propertyCondition: PROPERTY_CONDITIONS_TYPE;
    propertyType: PROPERTY_TYPE;
    surface: number;
    agencyFee: CurrencyType;
    minimumLeaseTerm: MinimumLeaseFeeDef;
    maximumNumberOfTenants: number | null;
    petFriendly: boolean;
    rentInAdvance: number;
    residentialComplex: string | null;
  };
  photos: { publicId: string, signature: string, version: number }[];
  contactPreference: CONTACT_TYPE;
  relationType: RELATION_TYPE;
};

