"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils";
import { buttonVariants } from "./button";

type AlertDialogContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(
  null,
);

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext);

  if (!context) {
    throw new Error(
      "AlertDialog components must be used inside <AlertDialog />",
    );
  }

  return context;
}

type AlertDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (value: React.SetStateAction<boolean>) => {
      const nextValue =
        typeof value === "function" ? value(currentOpen) : value;

      if (!isControlled) {
        setInternalOpen(nextValue);
      }

      onOpenChange?.(nextValue);
    },
    [currentOpen, isControlled, onOpenChange],
  );

  return (
    <AlertDialogContext.Provider value={{ open: currentOpen, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

type AlertDialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function AlertDialogTrigger({ onClick, ...props }: AlertDialogTriggerProps) {
  const { setOpen } = useAlertDialogContext();

  return (
    <button
      type="button"
      data-slot="alert-dialog-trigger"
      onClick={(event) => {
        setOpen(true);
        onClick?.(event);
      }}
      {...props}
    />
  );
}

type AlertDialogPortalProps = {
  children: React.ReactNode;
};

function AlertDialogPortal({ children }: AlertDialogPortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

type AlertDialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

function AlertDialogOverlay({
  className,
  onClick,
  ...props
}: AlertDialogOverlayProps) {
  const { setOpen } = useAlertDialogContext();

  return (
    <div
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]",
        "animate-in fade-in-0 duration-200",
        className,
      )}
      onClick={(event) => {
        setOpen(false);
        onClick?.(event);
      }}
      {...props}
    />
  );
}

type AlertDialogContentProps = React.HTMLAttributes<HTMLDivElement> & {
  disableOverlayClose?: boolean;
};

function AlertDialogContent({
  className,
  children,
  disableOverlayClose = false,
  ...props
}: AlertDialogContentProps) {
  const { open, setOpen } = useAlertDialogContext();
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => {
      contentRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <AlertDialogPortal>
      {!disableOverlayClose ? (
        <AlertDialogOverlay />
      ) : (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px]" />
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={contentRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          data-slot="alert-dialog-content"
          className={cn(
            "w-full max-w-lg rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[var(--shadow-xl)] outline-none",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            className,
          )}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          <AlertDialogIdsContext.Provider value={{ titleId, descriptionId }}>
            {children}
          </AlertDialogIdsContext.Provider>
        </div>
      </div>
    </AlertDialogPortal>
  );
}

type AlertDialogIdsContextValue = {
  titleId: string;
  descriptionId: string;
};

const AlertDialogIdsContext =
  React.createContext<AlertDialogIdsContextValue | null>(null);

function useAlertDialogIds() {
  const context = React.useContext(AlertDialogIdsContext);

  if (!context) {
    throw new Error(
      "AlertDialogTitle and AlertDialogDescription must be used inside AlertDialogContent",
    );
  }

  return context;
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = useAlertDialogIds();

  return (
    <h2
      id={titleId}
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-semibold text-[var(--color-secondary)]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { descriptionId } = useAlertDialogIds();

  return (
    <p
      id={descriptionId}
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm leading-relaxed text-[var(--color-text-muted)]",
        className,
      )}
      {...props}
    />
  );
}

type AlertDialogActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  closeOnAction?: boolean;
};

function AlertDialogAction({
  className,
  onClick,
  closeOnAction = true,
  ...props
}: AlertDialogActionProps) {
  const { setOpen } = useAlertDialogContext();

  return (
    <button
      type="button"
      data-slot="alert-dialog-action"
      className={cn(buttonVariants(), className)}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented && closeOnAction) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialogContext();

  return (
    <button
      type="button"
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant: "outline" }), className)}
      onClick={(event) => {
        setOpen(false);
        onClick?.(event);
      }}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
