import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { CiBoxList } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";

export type SearchModeType = "map" | "grid";

type SelectSearchModeProps = {
  mode: SearchModeType;
  onModeChanged: (mode: SearchModeType) => void;
};

const SelectSearchMode: React.FC<SelectSearchModeProps> = ({
  mode,
  onModeChanged
}) => {
  const [t] = useTranslation();

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <FaMapLocationDot
              className={cn("mr-2 size-9", mode !== "map" && "opacity-20")}
              onClick={() => onModeChanged("map")}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {t("search-on-the-map")}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="h-8 w-[1px] rounded-[1px] bg-border"></span>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <CiBoxList
              className={cn("ml-1 size-9", mode !== "grid" && "opacity-30")}
              onClick={() => onModeChanged("grid")}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">{t("list-search")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SelectSearchMode;
