import { USER_MANAGEMENT_PREFIX } from "@/shared/constants/query-keys.constants";

export const USER_MANAGEMENT_QUERY_KEYS = {
  GET_USER: (query: string) => [USER_MANAGEMENT_PREFIX, "User by query", query]
};
