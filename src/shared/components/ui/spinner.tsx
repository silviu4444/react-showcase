import { cn } from "@/shared/lib/utils";
import { ImSpinner8 } from "react-icons/im";

type SpinnerSize = "small" | "medium" | "large";

const sizeClassMap: { [key in SpinnerSize]: string } = {
  large: "w-14 h-14",
  medium: "w-10 h-10",
  small: "w-5 h-5"
};

interface SpinnerProps {
  center?: boolean;
  className?: string;
  size?: SpinnerSize;
}

const Spinner: React.FC<SpinnerProps> = ({
  center,
  className,
  size = "medium"
}) => {
  return (
    <div
      role="status"
      className={cn(
        center
          ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          : "",
        className
      )}
    >
      <ImSpinner8
        className={cn("animate-spin text-foreground", sizeClassMap[size])}
      />
    </div>
  );
};

export default Spinner;
