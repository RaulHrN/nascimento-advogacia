"use client";

import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-input-background)] px-3 py-2 text-base text-[var(--color-text)] outline-none transition-[color,box-shadow,border-color,background-color] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm field-sizing-content",
        "focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30",
        "aria-invalid:border-[var(--color-error)] aria-invalid:ring-2 aria-invalid:ring-[var(--color-error)]/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
