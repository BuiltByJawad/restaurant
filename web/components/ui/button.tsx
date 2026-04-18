"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#0A7A5A] text-white hover:bg-[#0f6048] focus-visible:ring-[#0A7A5A] shadow-sm hover:shadow-md hover:-translate-y-[1px] active:translate-y-0",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-sm",
        outline:
          "border-[1.5px] border-[#0A7A5A] bg-transparent text-[#0A7A5A] hover:bg-[#0A7A5A]/5 focus-visible:ring-[#0A7A5A]",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500",
        ghost: "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
        link: "text-[#0A7A5A] underline-offset-4 hover:underline focus-visible:ring-[#0A7A5A] p-0 h-auto",
        amber:
          "bg-[#F59E0B] text-white hover:bg-amber-600 focus-visible:ring-amber-500 shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
