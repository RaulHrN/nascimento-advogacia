"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-none transition-[color,box-shadow,border-color,background-color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)] data-[state=on]:bg-[var(--color-surface-3)] data-[state=on]:text-[var(--color-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30 aria-invalid:border-[var(--color-error)] aria-invalid:ring-2 aria-invalid:ring-[var(--color-error)]/20",
        outline:
          "border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-secondary)] data-[state=on]:border-[var(--color-border)] data-[state=on]:bg-[var(--color-surface-3)] data-[state=on]:text-[var(--color-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30 aria-invalid:border-[var(--color-error)] aria-invalid:ring-2 aria-invalid:ring-[var(--color-error)]/20",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
