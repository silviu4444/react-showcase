import { LOCAL_STORAGE_KEYS } from "@/shared/constants/local-storage.constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserDef } from "../auth/interfaces/user.interfaces";

export interface AuthStateDef {
  user: UserDef | null;
  setUser: (data: UserDef) => void;
  removeUser: () => void;
}

export const useAuthState = create(
  persist<AuthStateDef>(
    (set) => ({
      user: null,
      setUser: (user: UserDef) => {
        set({ user });
      },
      removeUser: () => {
        set({ user: null });
      }
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER,
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useUserState = () => useAuthState(({ user }) => user);
