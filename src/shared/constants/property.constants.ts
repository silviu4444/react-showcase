import { QueryFiltersParamsKeys } from "../interfaces/property/property.interfaces";

export enum PROPERTY_TYPE {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE"
}

export const PROPERTY_TYPE_TO_ICON = {
  [PROPERTY_TYPE.APARTMENT]: "apartment",
  [PROPERTY_TYPE.HOUSE]: "house"
};

export const PROPERTY_TYPE_KEYS: Record<PROPERTY_TYPE, string> = {
  [PROPERTY_TYPE.APARTMENT]: "apartment",
  [PROPERTY_TYPE.HOUSE]: "house"
};

export const PROPERTY_TYPES = [
  {
    type: PROPERTY_TYPE.APARTMENT,
    labelKey: PROPERTY_TYPE_KEYS[PROPERTY_TYPE.APARTMENT]
  },
  {
    type: PROPERTY_TYPE.HOUSE,
    labelKey: PROPERTY_TYPE_KEYS[PROPERTY_TYPE.HOUSE]
  }
];

export enum RELATION_TYPE {
  SELL = "SELL",
  RENT = "RENT"
}

export const RelationOptions = [
  {
    labelKey: "rent",
    value: RELATION_TYPE.RENT
  },
  {
    labelKey: "sell",
    value: RELATION_TYPE.SELL
  }
];

export const FloorValues = {
  MINUS_TWO: "MINUS_TWO",
  BASEMENT: "BASEMENT",
  GROUND_FLOOR: "GROUND_FLOOR",
  ONE: "ONE",
  TWO: "TWO",
  THREE: "THREE",
  FOUR: "FOUR",
  FIVE: "FIVE",
  SIX: "SIX",
  SEVEN: "SEVEN",
  EIGHT: "EIGHT",
  NINE: "NINE",
  TEN: "TEN",
  TEN_PLUS: "TEN_PLUS"
};

const COMMON_FLOOR_TYPES = [
  {
    value: FloorValues.GROUND_FLOOR,
    labelKey: "ground-floor"
  },
  {
    value: FloorValues.ONE,
    labelKey: "1"
  },
  {
    value: FloorValues.TWO,
    labelKey: "2"
  },
  {
    value: FloorValues.THREE,
    labelKey: "3"
  }
] as const;

export const APARTMENT_FLOOR_TYPES = [
  {
    value: FloorValues.MINUS_TWO,
    labelKey: "-2"
  },
  {
    value: FloorValues.BASEMENT,
    labelKey: "basement"
  },
  ...COMMON_FLOOR_TYPES,
  {
    value: FloorValues.FOUR,
    labelKey: "4"
  },
  {
    value: FloorValues.FIVE,
    labelKey: "5"
  },
  {
    value: FloorValues.SIX,
    labelKey: "6"
  },
  {
    value: FloorValues.SEVEN,
    labelKey: "7"
  },
  {
    value: FloorValues.EIGHT,
    labelKey: "8"
  },
  {
    value: FloorValues.NINE,
    labelKey: "9"
  },
  {
    value: FloorValues.TEN,
    labelKey: "10"
  },
  {
    value: FloorValues.TEN_PLUS,
    labelKey: "10+"
  }
] as const;

export const HOUSE_FLOOR_TYPES = [...COMMON_FLOOR_TYPES];

export enum PROPERTY_CONDITIONS_TYPE {
  GOOD = "GOOD",
  NEEDS_RESTRUCTURING = "NEEDS_RESTRUCTURING"
}

export const PROPERTY_CONDITIONS_TYPE_KEYS: Record<
  PROPERTY_CONDITIONS_TYPE,
  string
> = {
  [PROPERTY_CONDITIONS_TYPE.GOOD]: "in-good-condition",
  [PROPERTY_CONDITIONS_TYPE.NEEDS_RESTRUCTURING]: "need-of-renovation"
};

export const PROPERTY_CONDITIONS_TYPES = [
  {
    value: PROPERTY_CONDITIONS_TYPE.GOOD,
    labelKey: PROPERTY_CONDITIONS_TYPE_KEYS[PROPERTY_CONDITIONS_TYPE.GOOD]
  },
  {
    value: PROPERTY_CONDITIONS_TYPE.NEEDS_RESTRUCTURING,
    labelKey:
      PROPERTY_CONDITIONS_TYPE_KEYS[
        PROPERTY_CONDITIONS_TYPE.NEEDS_RESTRUCTURING
      ]
  }
] as const;

export enum PROPERTY_FURNITURE_TYPE {
  EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE = "EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE",
  EQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE = "EQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE",
  UNEQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE = "UNEQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE"
}

export const PROPERTY_FURNITURE_TYPES_KEYS: Record<
  PROPERTY_FURNITURE_TYPE,
  string
> = {
  [PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE]:
    "equipped-kitchen-and-furnished-house",
  [PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE]:
    "equipped-kitchen-and-unfurnished-house",
  [PROPERTY_FURNITURE_TYPE.UNEQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE]:
    "unequipped-kitchen-and-unfurnished-house"
};

export const PROPERTY_FURNITURE_TYPES = [
  {
    value: PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE,
    labelKey:
      PROPERTY_FURNITURE_TYPES_KEYS[
        PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE
      ]
  },
  {
    value: PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE,
    labelKey:
      PROPERTY_FURNITURE_TYPES_KEYS[
        PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE
      ]
  },
  {
    value: PROPERTY_FURNITURE_TYPE.UNEQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE,
    labelKey:
      PROPERTY_FURNITURE_TYPES_KEYS[
        PROPERTY_FURNITURE_TYPE.UNEQUIPPED_KITCHEN_AND_UNFURNISHED_HOUSE
      ]
  }
] as const;

export enum COMMODITIES_TYPE {
  AIR_CONDITIONING = "air_conditioning",
  WARDROBE_ON_THE_WALL = "wardrobe_on_the_wall",
  BALCONY = "balcony",
  CELLAR = "cellar",
  GARAGE = "garage",
  TERRACE = "terrace"
}

export const COMMODITIES_TYPE_KEYS: Record<COMMODITIES_TYPE, string> = {
  [COMMODITIES_TYPE.AIR_CONDITIONING]: "air-conditioning",
  [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: "wardrobe-on-the-wall",
  [COMMODITIES_TYPE.TERRACE]: "terrace",
  [COMMODITIES_TYPE.BALCONY]: "balcony",
  [COMMODITIES_TYPE.CELLAR]: "cellar",
  [COMMODITIES_TYPE.GARAGE]: "garage/parking-space"
};

export const COMMODITIES_TYPES = [
  {
    paramKey: "airC" satisfies QueryFiltersParamsKeys,
    formControlName: COMMODITIES_TYPE.AIR_CONDITIONING,
    labelKey: COMMODITIES_TYPE_KEYS[COMMODITIES_TYPE.AIR_CONDITIONING]
  },
  {
    paramKey: "wotw" satisfies QueryFiltersParamsKeys,
    formControlName: COMMODITIES_TYPE.WARDROBE_ON_THE_WALL,
    labelKey: COMMODITIES_TYPE_KEYS[COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]
  },
  {
    paramKey: "balcony" satisfies QueryFiltersParamsKeys,
    formControlName: COMMODITIES_TYPE.BALCONY,
    labelKey: COMMODITIES_TYPE_KEYS[COMMODITIES_TYPE.BALCONY]
  },
  {
    paramKey: "cellar" satisfies QueryFiltersParamsKeys,
    formControlName: COMMODITIES_TYPE.CELLAR,
    labelKey: COMMODITIES_TYPE_KEYS[COMMODITIES_TYPE.CELLAR]
  },
  {
    paramKey: "garage" satisfies QueryFiltersParamsKeys,
    formControlName: COMMODITIES_TYPE.GARAGE,
    labelKey: COMMODITIES_TYPE_KEYS[COMMODITIES_TYPE.GARAGE]
  },
  {
    paramKey: "terrace" satisfies QueryFiltersParamsKeys,
    formControlName: COMMODITIES_TYPE.TERRACE,
    labelKey: COMMODITIES_TYPE_KEYS[COMMODITIES_TYPE.TERRACE]
  }
] as const;

export enum CONTACT_TYPE {
  ALL = "ALL",
  JUST_PHONE = "JUST_PHONE",
  JUST_CHAT = "JUST_CHAT"
}

export const CONTACT_TYPE_KEYS: Record<CONTACT_TYPE, string> = {
  [CONTACT_TYPE.ALL]: "by-phone-and-chat-messages",
  [CONTACT_TYPE.JUST_PHONE]: "only-by-phone",
  [CONTACT_TYPE.JUST_CHAT]: "only-by-chat-messages"
};

export const CONTACT_TYPES = [
  {
    value: CONTACT_TYPE.ALL,
    labelKey: CONTACT_TYPE_KEYS[CONTACT_TYPE.ALL]
  },
  {
    value: CONTACT_TYPE.JUST_PHONE,
    labelKey: CONTACT_TYPE_KEYS[CONTACT_TYPE.JUST_PHONE]
  },
  {
    value: CONTACT_TYPE.JUST_CHAT,
    labelKey: CONTACT_TYPE_KEYS[CONTACT_TYPE.JUST_CHAT]
  }
] as const;

export enum MINIMUM_LEASE_TERM_TYPE {
  MONTHS = "MONTHS",
  DAYS = "DAYS"
}

export const MINIMUM_LEASE_TERM_TYPE_KEYS: Record<
  MINIMUM_LEASE_TERM_TYPE,
  string
> = {
  [MINIMUM_LEASE_TERM_TYPE.DAYS]: "days",
  [MINIMUM_LEASE_TERM_TYPE.MONTHS]: "months"
};

export const MINIMUM_LEASE_TERM_TYPES = [
  {
    value: MINIMUM_LEASE_TERM_TYPE.MONTHS,
    labelKey: MINIMUM_LEASE_TERM_TYPE_KEYS[MINIMUM_LEASE_TERM_TYPE.MONTHS]
  },
  {
    value: MINIMUM_LEASE_TERM_TYPE.DAYS,
    labelKey: MINIMUM_LEASE_TERM_TYPE_KEYS[MINIMUM_LEASE_TERM_TYPE.DAYS]
  }
];
