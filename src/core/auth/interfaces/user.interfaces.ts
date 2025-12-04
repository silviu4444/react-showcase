import { RoleType } from "./auth.interfaces";

export type UserDto = {
  id: string;
  firstName?: string;
  lastName?: string;
  picture: string | null;
  authority: RoleType;
  createdAt: string;
};

export type UserDef = {
  id: string;
  firstName?: string;
  lastName?: string;
  picture: string | null;
  role: RoleType;
  createdAt: string;
};
