import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import AddPropertyButton from "@/shared/components/buttons/add-property-button";
import Logo from "@/shared/components/logo/logo";
import NotificationsSystem from "@/shared/components/notifications-system/notifications-system";
import { ThemeToggle } from "@/shared/components/theme-toggle/theme-toggle";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { RouterPages } from "@/shared/constants/router.constants";
import { cn } from "@/shared/lib/utils";
import { mapToQueryParams } from "@/shared/utils/mappers.utils";
import qs from "query-string";
import { useNavigate } from "react-router-dom";
import useUnreadMessagesCountQuery from "../../hooks/use-unread-messages-count-query";

const Navbar: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { data } = useUnreadMessagesCountQuery();

  const isAuthenticated = useIsAuthenticated();

  const onLogoClicked = () => {
    const url = qs.stringifyUrl({
      url: RouterPages.Home,
      query: mapToQueryParams({
        form: {
          pt: PROPERTY_TYPE.APARTMENT,
          rt: RELATION_TYPE.RENT
        }
      })
    });
    navigate(url);
  };

  return (
    <nav
      className={cn(
        "flex min-h-14 items-center gap-2 border border-x-0 border-b-[1px] border-t-0 bg-background px-4 sm:px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      <Logo onClick={onLogoClicked} />

      <div className="flex w-full justify-between">
        <ul>
          <li></li>
        </ul>
        <div className="flex items-center justify-center gap-2">
          {isAuthenticated && <NotificationsSystem />}
          <ThemeToggle className="hidden sm:flex" />
          <AddPropertyButton />
          <SidebarTrigger notificationsCount={data} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
