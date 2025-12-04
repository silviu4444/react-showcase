import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import { ImSpinner8 } from "react-icons/im";

const buttonVariants = cva(
  "inline-flex items-center cursor-default justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gradient:
          "text-[#fcfcfc] dark:text-[#111] hover:opacity-90 bg-gradient-to-r from-[#3a5bc7] dark:from-[#9db1ff] to-[#8145b5] dark:to-[#d59cff]",
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/80 ",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const [t] = useTranslation();
    const children = isLoading ? (
      <div className="flex items-center">
        <ImSpinner8 className="mr-2 h-5 w-5 animate-spin" />
        {t("please-wait") + "..."}
      </div>
    ) : (
      props.children
    );
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        children={children}
        disabled={disabled || isLoading}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
