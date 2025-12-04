import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/shared/components/ui/sidebar";
import { i18nOptions, i18nSupported } from "@/shared/constants/i18n.constants";
import { ThemeMode } from "@/shared/interfaces/ui.interfaces";
import { Moon, Sun } from "lucide-react";
import RoFlag from "../../../../assets/svg/flags/ro.svg";
import RuFlag from "../../../../assets/svg/flags/ru.svg";
import USFlag from "../../../../assets/svg/flags/us.svg";
import useUIState from "@/shared/state/use-ui-state";
import { ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CiSettings } from "react-icons/ci";

const themeOptions: { title: string; value: ThemeMode; Icon: any }[] = [
  {
    title: "dark",
    value: "dark",
    Icon: <Moon className="size-4" />
  },
  {
    title: "light",
    value: "light",
    Icon: <Sun className="size-4" />
  }
];

const flagsMap: Record<i18nSupported, string> = {
  ro: RoFlag,
  en: USFlag,
  ru: RuFlag
};

const SidebarFooterUIMenu = () => {
  const { setState } = useUIState(({ state, setState }) => ({
    language: state.language,
    setState
  }));
  const [t, i18n] = useTranslation();

  const changeLanguage = (value: i18nSupported) => {
    i18n.changeLanguage(value);
    setState({ language: value });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <CiSettings /> {t("interface-settings")}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themeOptions.map(({ title, value, Icon }) => (
              <DropdownMenuItem
                key={value}
                className="flex items-center gap-1"
                onClick={() =>
                  setState({
                    themeMode: value
                  })
                }
              >
                {Icon}
                {t(title)}
              </DropdownMenuItem>
            ))}
            <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {i18nOptions.map((option) => (
              <DropdownMenuItem
                key={option.key}
                className="flex items-center gap-1"
                onClick={() => changeLanguage(option.value)}
              >
                <img className="size-4" src={flagsMap[option.value]} />
                {t(option.key)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterUIMenu;
