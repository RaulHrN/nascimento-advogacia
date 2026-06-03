import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[var(--radius-md)] border px-2 py-0.5 text-xs font-medium",
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    "transition-[color,background-color,border-color,box-shadow] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-[var(--color-primary-contrast)]",
        secondary:
          "border-transparent bg-[var(--color-secondary)] text-[var(--color-secondary-contrast)]",
        success:
          "border-transparent bg-[var(--color-success-soft)] text-[var(--color-success)]",
        warning:
          "border-transparent bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
        destructive:
          "border-transparent bg-[var(--color-error-soft)] text-[var(--color-error)]",
        outline:
          "border-[var(--color-border)] bg-transparent text-[var(--color-text)]",
        subtle:
          "border-transparent bg-[var(--color-surface-3)] text-[var(--color-text-muted)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
