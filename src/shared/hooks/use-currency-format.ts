import { useTranslation } from "react-i18next";
import { CurrencyType } from "../interfaces/currency/currency.interfaces";

const useCurrencyFormat = () => {
  const [_, i18n] = useTranslation();

  const currencyFormat = ({ amount, currency }: CurrencyType) =>
    new Intl.NumberFormat(i18n.language, {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(+amount);

  return { currencyFormat };
};

export default useCurrencyFormat;
