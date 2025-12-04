import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { MdChangeCircle } from "react-icons/md";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CgLock } from "react-icons/cg";
import { UserManagementUserDef } from "../../interfaces/user-management.interfaces";
import { FC } from "react";
import { useModal } from "@/shared/hooks/use-modal";

type UserManagementItemActionProps = {
  data: UserManagementUserDef;
};

const UserManagementItemAction: FC<UserManagementItemActionProps> = ({
  data
}) => {
  const [t] = useTranslation();
  const isAdmin = data.role === "ADMIN";
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-1"
          onClick={() =>
            onOpen("change-user-role", {
              changeUserRole: {
                userId: data.id
              }
            })
          }
          disabled={isAdmin}
        >
          <MdChangeCircle className="size-4" />
          {t("change-role")}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-1"
          onClick={() =>
            onOpen("lock-user", { lockUser: { email: data.email } })
          }
          disabled={isAdmin}
        >
          <CgLock className="size-4" />
          {t("lock-user")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserManagementItemAction;
