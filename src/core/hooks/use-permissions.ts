import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { RoleType } from "../auth/interfaces/auth.interfaces";
import { UserDef } from "../auth/interfaces/user.interfaces";
import { useUserState } from "./auth.state";

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: UserDef | null, data: Permissions[Key]["dataType"]) => boolean);

type RoleWithPermissions = {
  [R in RoleType]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

type Permissions = {
  properties: {
    dataType: PropertyTypeDef;
    action: "update" | "delete";
  };
};

const ROLES = {
  USER: {
    properties: {
      update: false,
      delete: true
    }
  },
  MODERATOR: {
    properties: {
      update: (user, property) => user?.id === property.id,
      delete: (user, property) => user?.id === property.id
    }
  },
  ADMIN: {
    properties: {
      update: (user, property) => user?.id === property.id,
      delete: (user, property) => user?.id === property.id
    }
  }
} as const satisfies RoleWithPermissions;

const usePermissions = () => {
  const user = useUserState();
  const hasPermission = <Resource extends keyof Permissions>(
    resource: Resource,
    action: Permissions[Resource]["action"],
    data?: Permissions[Resource]["dataType"]
  ) => {
    if (!user) {
      return false;
    }

    const permission = ROLES[user.role][resource]?.[action];

    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;

    return data != null && permission(user, data);
  };

  return { hasPermission };
};

export default usePermissions;
