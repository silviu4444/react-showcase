import { useAuthModal } from "@/core/auth/hooks/use-auth-modal";
import { useAuthLogoutMutation } from "@/core/auth/hooks/use-auth.query";
import { useUserState } from "@/core/hooks/auth.state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/shared/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiLogin, CiLogout } from "react-icons/ci";

const SidebarFooterUserMenu = () => {
  const { setOpenMobile } = useSidebar();
  const [t] = useTranslation();
  const user = useUserState();
  const { mutate: logout, error } = useAuthLogoutMutation();
  useEffect(() => {
    error?.response?.status === 401 && setOpenMobile(false);
  }, [error]);
  const { onOpen } = useAuthModal();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> {t("account")}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            {user ? (
              <DropdownMenuItem
                className="flex items-center gap-1"
                onClick={() => logout()}
              >
                <CiLogout className="size-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="flex items-center gap-1"
                onClick={() => onOpen()}
              >
                <CiLogin className="size-4" />
                <span>{t("authenticate")}</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterUserMenu;
