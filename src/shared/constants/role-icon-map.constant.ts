import { RoleType } from "@/core/auth/interfaces/auth.interfaces";
import { IconType } from "react-icons/lib";
import { MdGppMaybe, MdVerifiedUser } from "react-icons/md";

interface RoleIconMap
  extends Record<RoleType, { class: string; Icon: IconType } | null> {}

export const ROLE_ICON_MAP: RoleIconMap = {
  ADMIN: {
    class: "text-rose-500",
    Icon: MdGppMaybe
  },
  MODERATOR: {
    class: "text-indigo-500",
    Icon: MdVerifiedUser
  },
  USER: null
};
