import { cn } from "@/shared/lib/utils";
import { ClassValue } from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdImageNotSupported } from "react-icons/md";

type NoImageAvailablePlaceholderProps = {
  className?: ClassValue;
};

const NoImageAvailablePlaceholder: FC<NoImageAvailablePlaceholderProps> = ({
  className
}) => {
  const [t] = useTranslation();

  return (
    <div
      className={cn(
        "flex aspect-square size-full flex-col items-center justify-center gap-2 p-2",
        className
      )}
    >
      <MdImageNotSupported className="size-16" />

      <p className="text-center text-xs text-foreground">
        {t("no-image-available")}
      </p>
    </div>
  );
};

export default NoImageAvailablePlaceholder;
