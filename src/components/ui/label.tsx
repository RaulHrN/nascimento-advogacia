import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-1 text-base text-[var(--color-text)] shadow-[var(--shadow-xs)] outline-none transition-[color,background-color,border-color,box-shadow] duration-200 md:text-sm",
        "placeholder:text-[var(--input-placeholder)]",
        "selection:bg-[var(--color-primary)] selection:text-[var(--color-primary-contrast)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] focus-visible:border-[var(--input-border-focus)]",
        "aria-invalid:border-[var(--color-error)] aria-invalid:ring-2 aria-invalid:ring-[var(--color-error)]/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-text)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
