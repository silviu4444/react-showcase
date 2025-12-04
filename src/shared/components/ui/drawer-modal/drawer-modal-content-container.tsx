import { cn } from "@/shared/lib/utils";

type DrawerModalContentContainerProps = {
  hasFooter?: boolean;
  dismissible?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const DrawerModalContentContainer: React.FC<
  DrawerModalContentContainerProps
> = ({ className, hasFooter, ...props }) => {
  return (
    <div
      className={cn(
        "scroll-pt-6 overflow-y-auto px-2 pb-4 sm:h-[410px]",
        hasFooter ? "h-[calc(100%-70px)] pb-0" : "h-full",
        className
      )}
      {...props}
    ></div>
  );
};

export default DrawerModalContentContainer;
