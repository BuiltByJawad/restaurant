import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#0A7A5A]/10 text-[#0A7A5A]",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border border-amber-200",
        danger: "bg-red-50 text-red-700 border border-red-200",
        info: "bg-blue-50 text-blue-700 border border-blue-200",
        secondary: "bg-slate-100 text-slate-600",
        outline: "border border-current bg-transparent",
        "amber-solid": "bg-[#F59E0B] text-white",
        "green-solid": "bg-[#0A7A5A] text-white",
        "red-solid": "bg-red-500 text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

export function OrderStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    pending: { label: "Pending", variant: "warning" },
    confirmed: { label: "Confirmed", variant: "info" },
    preparing: { label: "Preparing", variant: "info" },
    ready: { label: "Ready", variant: "success" },
    out_for_delivery: { label: "On the way", variant: "default" },
    delivered: { label: "Delivered", variant: "success" },
    cancelled: { label: "Cancelled", variant: "danger" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" };
  return <Badge variant={variant}>{label}</Badge>;
}

export function PlanBadge({ plan }: { plan: string }) {
  const config: Record<string, { label: string; className: string }> = {
    starter: { label: "Starter", className: "bg-slate-100 text-slate-600" },
    pro: { label: "Pro", className: "bg-[#0A7A5A]/10 text-[#0A7A5A]" },
    enterprise: { label: "Enterprise", className: "bg-amber-50 text-amber-700" },
  };
  const { label, className } = config[plan] ?? { label: plan, className: "" };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", className)}>{label}</span>;
}

export function RestaurantStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; variant: BadgeProps["variant"] }> = {
    active: { label: "Active", variant: "success" },
    trial: { label: "Trial", variant: "warning" },
    suspended: { label: "Suspended", variant: "danger" },
  };
  const { label, variant } = config[status] ?? { label: status, variant: "secondary" };
  return <Badge variant={variant}>{label}</Badge>;
}
