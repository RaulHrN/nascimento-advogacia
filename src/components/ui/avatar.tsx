"use client";

import * as React from "react";
import { cn } from "./utils";

type AvatarContextValue = {
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const context = React.useContext(AvatarContext);

  if (!context) {
    throw new Error("Avatar components must be used inside <Avatar />");
  }

  return context;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);

    return (
      <AvatarContext.Provider value={{ imageLoaded, setImageLoaded }}>
        <div
          ref={ref}
          data-slot="avatar"
          className={cn(
            "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)]",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  },
);

Avatar.displayName = "Avatar";

export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onLoad, onError, alt = "", ...props }, ref) => {
    const { setImageLoaded } = useAvatarContext();

    return (
      <img
        ref={ref}
        data-slot="avatar-image"
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
        onLoad={(event) => {
          setImageLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setImageLoaded(false);
          onError?.(event);
        }}
        {...props}
      />
    );
  },
);

AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    const { imageLoaded } = useAvatarContext();

    if (imageLoaded) return null;

    return (
      <div
        ref={ref}
        data-slot="avatar-fallback"
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface-3)] text-sm font-medium text-[var(--color-text-muted)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
