import { PROPERTY_PREDICATE } from "@/shared/constants/query-keys.constants";

export const UserQueryKeys = {
  userProperties: (userId: string | undefined) => [
    PROPERTY_PREDICATE,
    "[USER] Properties",
    userId
  ]
};
