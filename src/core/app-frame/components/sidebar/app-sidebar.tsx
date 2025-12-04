import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import SocketConnectionStatus from "@/shared/components/socket/socket-connection-status/socket-connection-status";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter
} from "@/shared/components/ui/sidebar";
import SidebarPagesContent from "./sidebar-content";
import SidebarFooterUIMenu from "./sidebar-footer-ui-menu";
import SidebarFooterUserMenu from "./sidebar-footer-user-menu";

export function AppSidebar() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarContent className="mt-5 relative">
        {isAuthenticated && (
          <SocketConnectionStatus className="absolute right-4 top-0" />
        )}
        <SidebarPagesContent />
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <SidebarFooterUserMenu />
        <SidebarFooterUIMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
