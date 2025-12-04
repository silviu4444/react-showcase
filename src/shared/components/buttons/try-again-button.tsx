import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

type TryAgainButtonProps = {
  onRetry: () => void;
  center?: boolean;
};

const TryAgainButton: React.FC<TryAgainButtonProps> = ({ center, onRetry }) => {
  const [t] = useTranslation();

  const retry: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onRetry();
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-1 px-2",
        center
          ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          : "h-full"
      )}
    >
      <Button onClick={retry} size="sm" variant="outline">
        {t("try-again")}
      </Button>
      <p className="text-center text-xs font-normal">
        {t("something-went-wrong")}
      </p>
    </div>
  );
};

export default TryAgainButton;
