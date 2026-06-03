"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";

type AccordionValue = string | string[] | undefined;

type AccordionContextType = {
  type: "single" | "multiple";
  collapsible?: boolean;
  value: string[];
  toggleItem: (itemValue: string) => void;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used inside <Accordion />");
  }

  return context;
}

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
  className?: string;
  children: React.ReactNode;
};

function normalizeValue(
  value: AccordionValue,
  type: "single" | "multiple",
): string[] {
  if (type === "multiple") {
    return Array.isArray(value) ? value : [];
  }

  if (typeof value === "string") {
    return [value];
  }

  return [];
}

function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = React.useState<string[]>(
    normalizeValue(defaultValue, type),
  );

  const currentValue = isControlled
    ? normalizeValue(value, type)
    : internalValue;

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      let nextValue: string[] = [];

      if (type === "multiple") {
        const isOpen = currentValue.includes(itemValue);
        nextValue = isOpen
          ? currentValue.filter((v) => v !== itemValue)
          : [...currentValue, itemValue];

        if (!isControlled) setInternalValue(nextValue);
        onValueChange?.(nextValue);
        return;
      }

      const isOpen = currentValue.includes(itemValue);

      if (isOpen) {
        nextValue = collapsible ? [] : [itemValue];
      } else {
        nextValue = [itemValue];
      }

      if (!isControlled) setInternalValue(nextValue);
      onValueChange?.(nextValue[0]);
    },
    [type, collapsible, currentValue, isControlled, onValueChange],
  );

  return (
    <AccordionContext.Provider
      value={{
        type,
        collapsible,
        value: currentValue,
        toggleItem,
      }}
    >
      <div data-slot="accordion" className={cn("w-full", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemContextType = {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextType | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used inside AccordionItem",
    );
  }

  return context;
}

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

function AccordionItem({
  className,
  value,
  children,
  ...props
}: AccordionItemProps) {
  const accordion = useAccordionContext();
  const reactId = React.useId();
  const safeId = reactId.replace(/:/g, "");
  const isOpen = accordion.value.includes(value);

  const triggerId = `accordion-trigger-${safeId}`;
  const contentId = `accordion-content-${safeId}`;

  return (
    <AccordionItemContext.Provider
      value={{ value, isOpen, triggerId, contentId }}
    >
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={cn("border-b border-border last:border-b-0", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: AccordionTriggerProps) {
  const accordion = useAccordionContext();
  const item = useAccordionItemContext();

  return (
    <h3 className="flex">
      <button
        id={item.triggerId}
        type="button"
        data-slot="accordion-trigger"
        data-state={item.isOpen ? "open" : "closed"}
        aria-expanded={item.isOpen}
        aria-controls={item.contentId}
        onClick={(e) => {
          accordion.toggleItem(item.value);
          onClick?.(e);
        }}
        className={cn(
          "flex w-full items-start justify-between gap-4 rounded-md py-4 text-left text-base font-medium text-primary transition-colors duration-200",
          "hover:text-[var(--gold-elegant)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span>{children}</span>

        <ChevronDownIcon
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            item.isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
    </h3>
  );
}

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  forceMount?: boolean;
};

function AccordionContent({
  className,
  children,
  forceMount = false,
  ...props
}: AccordionContentProps) {
  const item = useAccordionItemContext();

  if (!forceMount && !item.isOpen) {
    return null;
  }

  return (
    <div
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      data-slot="accordion-content"
      data-state={item.isOpen ? "open" : "closed"}
      hidden={!item.isOpen}
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        item.isOpen && "animate-fadeIn",
        className,
      )}
      {...props}
    >
      <div className="pb-4 leading-relaxed">{children}</div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
