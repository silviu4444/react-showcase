import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";

type SeparatorWithTextProps = {
  textKey: string;
  lowercaseText?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const SeparatorWithText: React.FC<SeparatorWithTextProps> = ({
  textKey,
  className,
  lowercaseText,
  ...props
}) => {
  const [t] = useTranslation();

  return (
    <div
      className={cn(
        "relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border",
        className
      )}
      {...props}
    >
      <span className="relative z-10 bg-background px-2 text-muted-foreground">
        {lowercaseText ? t(textKey).toLowerCase() : t(textKey)}
      </span>
    </div>
  );
};

export default SeparatorWithText;
