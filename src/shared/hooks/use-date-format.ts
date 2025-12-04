import { format as date_fns_format } from "date-fns";
import { enUS, ro, ru, type Locale } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { i18nSupported } from "../constants/i18n.constants";
import { DateFnsFormatType } from "../interfaces/date-fns/date-fns.interfaces";

const dateFnsLocalesLiterals: Record<i18nSupported, Locale> = {
  [i18nSupported.EN]: enUS,
  [i18nSupported.RO]: ro,
  [i18nSupported.RU]: ru
};

type FormatPayload = {
  date: string | Date;
  format: DateFnsFormatType;
};

const useDateFormat = () => {
  const [_, i18n] = useTranslation();

  return ({ date, format }: FormatPayload): string =>
    date_fns_format(new Date(date), format, {
      locale: dateFnsLocalesLiterals[i18n.language as i18nSupported]
    });
};

export default useDateFormat;
