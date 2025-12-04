import { useUserState } from "./auth.state";

export const useIsAuthenticated = (): boolean => !!useUserState();
