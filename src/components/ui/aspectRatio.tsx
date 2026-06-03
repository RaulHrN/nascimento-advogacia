import * as React from "react";
import { cn } from "./utils";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children: React.ReactNode;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="aspect-ratio"
        className={cn("relative w-full overflow-hidden", className)}
        style={{
          aspectRatio: String(ratio),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
