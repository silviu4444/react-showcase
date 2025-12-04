export const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

export const USER_MANAGEMENT_PREFIX = "[USER_MANAGEMENT]";

export const PROPERTY_PREDICATE = "[PROPERTY]";

export const QueryKeys = {
  PROPERTY: {
    propertyById: (propertyId: string) => [
      PROPERTY_PREDICATE,
      "[SHARED] PROPERTY BY ID",
      propertyId
    ]
  }
};
