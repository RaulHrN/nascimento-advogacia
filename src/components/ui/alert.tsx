import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const alertVariants = cva(
  [
    "relative grid w-full items-start gap-y-1 rounded-[var(--radius-lg)] border px-4 py-3 text-sm",
    "grid-cols-[0_1fr] has-[>svg]:grid-cols-[1.25rem_1fr] has-[>svg]:gap-x-3",
    "[&>svg]:mt-0.5 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-current",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]",
        info: "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-secondary)]",
        success:
          "border-[color:var(--color-success)]/20 bg-[var(--color-success-soft)] text-[var(--color-success)]",
        warning:
          "border-[color:var(--color-warning)]/20 bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
        destructive:
          "border-[color:var(--color-error)]/20 bg-[var(--color-error-soft)] text-[var(--color-error)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        data-slot="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Alert.displayName = "Alert";

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        data-slot="alert-title"
        className={cn(
          "col-start-2 min-h-4 text-sm font-semibold tracking-tight text-current",
          className,
        )}
        {...props}
      />
    );
  },
);

AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm leading-relaxed opacity-90 [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
});

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
