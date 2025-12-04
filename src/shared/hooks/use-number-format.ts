import { useTranslation } from "react-i18next";

const useNumberFormat = (props?: Intl.NumberFormatOptions) => {
  const [_, i18n] = useTranslation();

  const numberFormat = (number: number) => {
    const formatter = new Intl.NumberFormat(i18n.language, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...(props ?? {})
    });

    return formatter.format(number);
  };

  return { numberFormat };
};

export default useNumberFormat;
