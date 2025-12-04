import { useUserState } from "./auth.state";

export const useUserRole = () => {
  const user = useUserState();
  return {
    isAdmin: user?.role === "ADMIN",
    isModerator: user?.role === "MODERATOR",
    isUser: user?.role === "USER"
  };
};
