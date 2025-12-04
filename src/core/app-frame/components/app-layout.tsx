import { SidebarProvider } from "@/shared/components/ui/sidebar";
import Navbar from "./navbar/navbar";
import { AppSidebar } from "./sidebar/app-sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="flex-grow overflow-y-auto">
        {children}</main>
      <AppSidebar />
    </SidebarProvider>
  );
};

export default AppLayout;
