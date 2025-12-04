import useDateFormat from "@/shared/hooks/use-date-format";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { BsCalendar2Date } from "react-icons/bs";

type PropertyListedDateProps = {
  createdAt: string;
  updatedAt: string;
};

const PropertyListedDate: FC<PropertyListedDateProps> = ({
  createdAt,
  updatedAt
}) => {
  const format = useDateFormat();
  const [t] = useTranslation();
  const hasBeenUpdated = updatedAt && createdAt !== updatedAt;

  return (
    <div className="flex w-fit items-center gap-1">
      <BsCalendar2Date className="size-3" />

      <span className="text-xs leading-4 text-foreground">
        {hasBeenUpdated && t("last-updated") + ": "}
        {format({
          date: hasBeenUpdated ? updatedAt : createdAt,
          format: "dd MMMM yyyy"
        })}
      </span>
    </div>
  );
};

export default PropertyListedDate;
