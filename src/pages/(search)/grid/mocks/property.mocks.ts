import {
  CONTACT_TYPE,
  MINIMUM_LEASE_TERM_TYPE,
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { CurrencyEnum } from "@/shared/interfaces/currency/currency.interfaces";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";

export const PropertyListMock: PropertyTypeDef[] = [
  {
    id: "b51755d9-5a4c-4b71-861e-cbee6476b994",
    contactPreference: CONTACT_TYPE.ALL,
    expensesMonthly: {
      amount: 13,
      currency: CurrencyEnum.EUR
    },
    photos: [],
    price: {
      amount: 313,
      currency: CurrencyEnum.EUR
    },
    details: {
      address: {
        floor: "5",
        city: "Chisinau",
        country: "Moldova",
        county: "Chisinau",
        latitude: 47.010452,
        longitude: 28.86381,
        postalCode: "",
        street: "Str Garii",
        streetNumber: "1",
        residenceComplex: "Royal Town"
      },
      bathroomNumber: 1,
      commodities: {
        hasAirConditioning: true,
        hasBalcony: true,
        hasCellar: false,
        hasClosetInTheWall: false,
        hasParking: true,
        hasTerrace: false
      },
      hasElevator: true,
      isLastFloor: false,
      furniture: PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE,
      propertyType: PROPERTY_TYPE.APARTMENT,
      residentialComplex: null,
      roomNumber: 2,
      surface: 89,
      conditions: PROPERTY_CONDITIONS_TYPE.GOOD
    },
    description: "",
    contractDetails: {
      agencyFee: {
        amount: 123,
        currency: CurrencyEnum.EUR
      },
      maximumNumberOfTenants: 4,
      minimumLeaseTerm: {
        type: MINIMUM_LEASE_TERM_TYPE.MONTHS,
        value: 12
      },
      petFriendly: false,
      rentInAdvance: "3"
    },
    user: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      picture: "https://github.com/shadcn.png",
      phoneNumbers: []
    },
    relationType: RELATION_TYPE.SELL,
    createdAt: "2024-04-03",
    updatedAt: "2024-04-03",
    isFavorite: false,
    status: "ACTIVE",
    views: 0
  },
  {
    id: "b51755d9-5a4c-4b71-861e-cbee6476b912",
    contactPreference: CONTACT_TYPE.ALL,
    expensesMonthly: {
      amount: 13,
      currency: CurrencyEnum.EUR
    },
    photos: [],
    price: {
      amount: 313,
      currency: CurrencyEnum.EUR
    },
    details: {
      address: {
        floor: "5",
        city: "Chisinau",
        country: "Moldova",
        county: "Chisinau",
        latitude: 47.010452,
        longitude: 28.86381,
        postalCode: "",
        street: "Str Garii",
        streetNumber: "1",
        residenceComplex: "Royal Town"
      },
      bathroomNumber: 1,
      commodities: {
        hasAirConditioning: true,
        hasBalcony: true,
        hasCellar: false,
        hasClosetInTheWall: false,
        hasParking: true,
        hasTerrace: false
      },
      hasElevator: true,
      isLastFloor: false,
      furniture: PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE,
      propertyType: PROPERTY_TYPE.APARTMENT,
      residentialComplex: null,
      roomNumber: 2,
      surface: 89,
      conditions: PROPERTY_CONDITIONS_TYPE.GOOD
    },
    description: "",
    contractDetails: {
      agencyFee: {
        amount: 123,
        currency: CurrencyEnum.EUR
      },
      maximumNumberOfTenants: 4,
      minimumLeaseTerm: {
        type: MINIMUM_LEASE_TERM_TYPE.MONTHS,
        value: 12
      },
      petFriendly: false,
      rentInAdvance: "3"
    },
    user: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      picture: "https://github.com/shadcn.png",
      phoneNumbers: []
    },
    relationType: RELATION_TYPE.SELL,
    createdAt: "2024-04-03",
    updatedAt: "2024-04-03",
    isFavorite: false,
    status: "ACTIVE",
    views: 0
  },
  {
    id: "3",
    contactPreference: CONTACT_TYPE.ALL,
    expensesMonthly: {
      amount: 13,
      currency: CurrencyEnum.EUR
    },
    photos: [],
    price: {
      amount: 313,
      currency: CurrencyEnum.EUR
    },
    details: {
      address: {
        floor: "5",
        city: "Chisinau",
        country: "Moldova",
        county: "Chisinau",
        latitude: 47.010452,
        longitude: 28.86381,
        postalCode: "",
        street: "Str Garii",
        streetNumber: "1",
        residenceComplex: "Royal Town"
      },
      bathroomNumber: 1,
      commodities: {
        hasAirConditioning: true,
        hasBalcony: true,
        hasCellar: false,
        hasClosetInTheWall: false,
        hasParking: true,
        hasTerrace: false
      },
      hasElevator: true,
      isLastFloor: false,
      furniture: PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE,
      propertyType: PROPERTY_TYPE.APARTMENT,
      residentialComplex: null,
      roomNumber: 2,
      surface: 89,
      conditions: PROPERTY_CONDITIONS_TYPE.GOOD
    },
    description: "",
    contractDetails: {
      agencyFee: {
        amount: 123,
        currency: CurrencyEnum.EUR
      },
      maximumNumberOfTenants: 4,
      minimumLeaseTerm: {
        type: MINIMUM_LEASE_TERM_TYPE.MONTHS,
        value: 12
      },
      petFriendly: false,
      rentInAdvance: "3"
    },
    user: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      picture: "https://github.com/shadcn.png",
      phoneNumbers: []
    },
    relationType: RELATION_TYPE.SELL,
    createdAt: "2024-04-03",
    updatedAt: "2024-04-03",
    isFavorite: false,
    status: "ACTIVE",
    views: 0
  },
  {
    id: "4",
    contactPreference: CONTACT_TYPE.ALL,
    expensesMonthly: {
      amount: 13,
      currency: CurrencyEnum.EUR
    },
    photos: [],
    price: {
      amount: 313,
      currency: CurrencyEnum.EUR
    },
    details: {
      address: {
        floor: "5",
        city: "Chisinau",
        country: "Moldova",
        county: "Chisinau",
        latitude: 47.010452,
        longitude: 28.86381,
        postalCode: "",
        street: "Str Garii",
        streetNumber: "1",
        residenceComplex: "Royal Town"
      },
      bathroomNumber: 1,
      commodities: {
        hasAirConditioning: true,
        hasBalcony: true,
        hasCellar: false,
        hasClosetInTheWall: false,
        hasParking: true,
        hasTerrace: false
      },
      hasElevator: true,
      isLastFloor: false,
      furniture: PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE,
      propertyType: PROPERTY_TYPE.APARTMENT,
      residentialComplex: null,
      roomNumber: 2,
      surface: 89,
      conditions: PROPERTY_CONDITIONS_TYPE.GOOD
    },
    description: "",
    contractDetails: {
      agencyFee: {
        amount: 123,
        currency: CurrencyEnum.EUR
      },
      maximumNumberOfTenants: 4,
      minimumLeaseTerm: {
        type: MINIMUM_LEASE_TERM_TYPE.MONTHS,
        value: 12
      },
      petFriendly: false,
      rentInAdvance: "3"
    },
    user: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      picture: "https://github.com/shadcn.png",
      phoneNumbers: []
    },
    relationType: RELATION_TYPE.SELL,
    createdAt: "2024-04-03",
    updatedAt: "2024-04-03",
    isFavorite: false,
    status: "ACTIVE",
    views: 0
  }
];
