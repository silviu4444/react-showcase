import { MdOutlineClose } from "react-icons/md";
import { Badge, BadgeProps } from "./badge";
import { cn } from "@/shared/lib/utils";

type QuickChipProps = {
  withRemoveButton?: boolean;
  children: React.ReactNode;
  onRemove?: () => void;
} & BadgeProps;

const QuickChip: React.FC<QuickChipProps> = ({
  children,
  className,
  withRemoveButton,
  onRemove,
  variant,
  ...props
}) => {
  const onRemoveClicked: React.MouseEventHandler = (event): void => {
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <Badge
      className={cn("h-9 whitespace-nowrap font-light", className)}
      variant={variant}
      {...props}
    >
      {children}
      {withRemoveButton && (
        <MdOutlineClose className="size-4" onClick={onRemoveClicked} />
      )}
    </Badge>
  );
};

export default QuickChip;
