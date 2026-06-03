"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { cn } from "./utils";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const isRangeMode = props.mode === "range";

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-4 sm:flex-row sm:gap-6",
        month: "flex flex-col gap-4",
        month_caption: "relative flex items-center justify-center pt-1",
        caption_label: "text-sm font-semibold text-[var(--color-secondary)]",
        nav: "flex items-center gap-1",
        button_previous:
          "absolute left-0 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]",
        button_next:
          "absolute right-0 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 rounded-md text-xs font-medium text-[var(--color-text-muted)]",
        week: "mt-2 flex w-full",
        day: cn(
          "h-9 w-9 rounded-md p-0 text-sm font-normal text-[var(--color-text)] transition-colors",
          "hover:bg-[var(--color-surface-3)] hover:text-[var(--color-text)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
          "aria-selected:opacity-100",
        ),
        day_button: "h-9 w-9",
        selected:
          "bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-primary-contrast)]",
        today:
          "bg-[var(--color-surface-3)] font-semibold text-[var(--color-secondary)]",
        outside: "text-[var(--color-text-faint)] opacity-60",
        disabled:
          "cursor-not-allowed text-[var(--color-text-faint)] opacity-40",
        range_start:
          "bg-[var(--color-primary)] text-[var(--color-primary-contrast)] rounded-l-md",
        range_end:
          "bg-[var(--color-primary)] text-[var(--color-primary-contrast)] rounded-r-md",
        range_middle:
          "bg-[var(--color-surface-3)] text-[var(--color-secondary)]",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}

export { Calendar };
