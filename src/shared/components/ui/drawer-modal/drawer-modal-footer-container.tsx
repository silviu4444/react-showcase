import { cn } from "@/shared/lib/utils";

type DrawerModalFooterContainerProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerModalFooterContainer: React.FC<DrawerModalFooterContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex w-full items-center gap-2", className)}
      {...props}
    ></div>
  );
};

export default DrawerModalFooterContainer;
