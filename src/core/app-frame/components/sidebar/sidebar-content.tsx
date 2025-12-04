import { useUserState } from "@/core/hooks/auth.state";
import { useUserRole } from "@/core/hooks/use-user-role";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/shared/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/shared/components/ui/sidebar";
import { RouterPages } from "@/shared/constants/router.constants";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BsHouseCheckFill, BsPersonBoundingBox } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import useUnreadMessagesCountQuery from "../../hooks/use-unread-messages-count-query";

const propertyItems = [
  {
    title: "my-properties",
    url: RouterPages.UserProperties,
    icon: MdApartment,
    requiresAuth: true
  }
];

const adminItems = [
  {
    title: "user-management",
    url: RouterPages.AdminUserManagement,
    icon: BsPersonBoundingBox
  }
];

const moderatorItems = [
  {
    title: "properties-to-approve",
    url: RouterPages.PropertiesToApprove,
    icon: BsHouseCheckFill
  }
];

const SidebarPagesContent = () => {
  const [t] = useTranslation();
  const { setOpenMobile } = useSidebar();
  const user = useUserState();
  const { isAdmin, isModerator } = useUserRole();
  const { data } = useUnreadMessagesCountQuery();

  return (
    <SidebarGroup>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem className="mt-2">
            <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
              <NavLink to={RouterPages.Home}>
                <FaHome />
                {t("home")}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {user && (
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="mt-2">
              <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
                <NavLink
                  className="flex justify-between"
                  to={RouterPages.Messages}
                >
                  <div className="flex items-center gap-2">
                    <TbMessage />
                    {t("messages")}
                  </div>
                  {!!data && <span className="text-red-500">+{data}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      )}

      <Collapsible className="group/collapsible">
        <SidebarGroup>
          <CollapsibleTrigger>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span>
                    {t("properties")}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {propertyItems
                    .filter((item) =>
                      item.requiresAuth && !user ? false : true
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => setOpenMobile(false)}
                        >
                          <NavLink to={item.url}>
                            <item.icon />
                            <span>{t(item.title)}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

      {isAdmin && (
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span>
                      {t("admin-dashboard")}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => setOpenMobile(false)}
                        >
                          <NavLink to={item.url}>
                            <item.icon />
                            <span>{t(item.title)}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}

      {(isAdmin || isModerator) && (
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span>
                      {t("moderator-dashboard")}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {moderatorItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => setOpenMobile(false)}
                        >
                          <NavLink to={item.url}>
                            <item.icon />
                            <span>{t(item.title)}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}
    </SidebarGroup>
  );
};

export default SidebarPagesContent;
