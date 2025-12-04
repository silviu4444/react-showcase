import { cn } from "@/shared/lib/utils";
import { forwardRef } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className }, ref) => {
    return (
      <div className={cn("p-4 sm:px-6 md:px-8 lg:px-12", className)} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Container;
