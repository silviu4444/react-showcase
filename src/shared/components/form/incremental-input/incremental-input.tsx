import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Button } from "../../ui/button";

type IncrementalInputProps = {
  className?: string;
  initialValue: number;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
};

const IncrementalInput: React.FC<IncrementalInputProps> = ({
  className,
  initialValue,
  max = 20,
  min = 1,
  onChange
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const onValueChange = (type: "increment" | "decrement"): void => {
    if (type === "increment" && value >= max) return;
    if (type === "decrement" && value <= min) return;

    type === "increment"
      ? setValue((currValue) => currValue + 1)
      : setValue((currValue) => currValue - 1);
  };

  return (
    <div
      className={cn(
        "shadow-xs inline-flex touch-manipulation -space-x-px rounded-md rtl:space-x-reverse",
        className
      )}
    >
      <Button
        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
        onClick={() => onValueChange("decrement")}
        variant="outline"
        type="button"
        disabled={value <= min}
      >
        <LuChevronDown className="size-5 text-black dark:text-white" />
      </Button>
      <span className="flex items-center border border-input px-3 text-sm font-medium">
        {value}
      </span>
      <Button
        className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
        onClick={() => onValueChange("increment")}
        variant="outline"
        type="button"
        disabled={value >= max}
      >
        <LuChevronUp className="size-5 text-black dark:text-white" />
      </Button>
    </div>
  );
};

export default IncrementalInput;
