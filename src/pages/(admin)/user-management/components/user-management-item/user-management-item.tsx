import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import { ROLE_ICON_MAP } from "@/shared/constants/role-icon-map.constant";
import { FC } from "react";
import { UserManagementUserDef } from "../../interfaces/user-management.interfaces";
import { cn } from "@/shared/lib/utils";
import UserManagementItemAction from "../user-management-item-action/user-management-item-action";

type UserManagementItemProps = {
  user: UserManagementUserDef;
};

const UserManagementItem: FC<UserManagementItemProps> = ({ user }) => {
  const username = `${user.firstName || ""} ${user.lastName || ""}`;
  const iconMeta = ROLE_ICON_MAP[user.role];
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {iconMeta && (
              <iconMeta.Icon className={cn(iconMeta.class, "size-6")} />
            )}
            <CardTitle>{username}</CardTitle>
          </div>
          <UserManagementItemAction data={user} />
        </div>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default UserManagementItem;
