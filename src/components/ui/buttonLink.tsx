import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { buttonVariants } from "./button";

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>;

export type ButtonLinkProps = LinkProps &
  AnchorProps &
  VariantProps<typeof buttonVariants> & {
    disabled?: boolean;
  };

  export const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  ButtonLinkProps
>(
  (
    {
      className,
      variant,
      size,
      disabled = false,
      href,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        href={disabled ? "#" : href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        className={cn(
          buttonVariants({ variant, size }),
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

ButtonLink.displayName = "ButtonLink";