import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { i18nOptions, i18nSupported } from "@/shared/constants/i18n.constants";
import { cn } from "@/shared/lib/utils";
import useUIState from "@/shared/state/use-ui-state";
import { useTranslation } from "react-i18next";

type LanguageSwitcherProps = React.HTMLAttributes<HTMLDivElement>;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  ...props
}) => {
  const { state, setState } = useUIState();
  const selectedValue = i18nOptions.find(
    (option) => option.value === state.language
  );
  const [t, i18n] = useTranslation();

  const changeLanguage = (value: i18nSupported) => {
    i18n.changeLanguage(value);
    setState({ language: value });
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Select onValueChange={changeLanguage}>
        <SelectTrigger className="w-full" id="languageSwitcher">
          <SelectValue placeholder={t(selectedValue!.key)} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("language")}</SelectLabel>
            {i18nOptions.map((option) => (
              <SelectItem key={option.key} value={option.value}>
                {t(option.key)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
