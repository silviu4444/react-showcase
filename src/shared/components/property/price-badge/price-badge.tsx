import useCurrencyFormat from "@/shared/hooks/use-currency-format";
import { CurrencyType } from "@/shared/interfaces/currency/currency.interfaces";
import { cn } from "@/shared/lib/utils";
import { Badge, BadgeProps } from "../../ui/badge";
import { useTranslation } from "react-i18next";

type PriceBadgeProps = {
  price: CurrencyType;
  label?: string;
} & BadgeProps;

const PriceBadge: React.FC<PriceBadgeProps> = ({
  price,
  label = "",
  size = "sm",
  className,
  ...props
}) => {
  const [t] = useTranslation();
  const { currencyFormat } = useCurrencyFormat();

  return (
    <Badge className={cn("w-full whitespace-nowrap", className)} {...props}>
      <span className="w-full text-center">
        {label ? t(label) + ": " : ""}
        {currencyFormat(price)}
      </span>
    </Badge>
  );
};

export default PriceBadge;
