import useNumberFormat from "@/shared/hooks/use-number-format";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { FaRegEye } from "react-icons/fa";

type PropertyViewsProps = {
  views: number;
  className?: string;
};

const PropertyViews: FC<PropertyViewsProps> = ({ className, views }) => {
  const { numberFormat } = useNumberFormat();
  return (
    <div
      className={cn(
        "text-foreground' flex items-center justify-center gap-1 text-xs",
        className
      )}
    >
      <FaRegEye className="size-[14px]" /> {numberFormat(views)}
    </div>
  );
};

export default PropertyViews;
