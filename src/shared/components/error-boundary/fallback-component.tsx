import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "react-i18next";

type FallbackComponentProps = {
  onRetry: () => void;
  resetErrorBoundary: (...args: any[]) => void;
  error: any;
};

const FallbackComponent: React.FC<FallbackComponentProps> = ({
  error,
  resetErrorBoundary,
  onRetry
}) => {
  const handleRetry = () => {
    resetErrorBoundary();
    onRetry();
  };

  const [t] = useTranslation();
  return (
    <div
      role="alert"
      className="flex h-full w-full flex-col items-center justify-center gap-2 px-4"
    >
      <p className="text-center text-lg font-medium">
        {t("something-went-wrong")}
      </p>
      <pre className="whitespace-break-spaces break-all rounded-lg bg-red-500 p-4">
        {error.message}
      </pre>
      <Button
        className="w-full sm:w-fit"
        variant="outline"
        onClick={handleRetry}
      >
        {t("try-again")}
      </Button>
    </div>
  );
};

export default FallbackComponent;
