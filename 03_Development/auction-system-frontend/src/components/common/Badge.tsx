import * as React from "react";
import { cn } from "./Utils";

/**
 * Badge component to highlight statuses or labels. It supports a handful of
 * variants to convey meaning, such as `default`, `secondary`, `destructive`
 * and `outline`. The `variant` prop maps to a set of predefined Tailwind
 * classes defined in `VARIANT_STYLES`.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

// Tailwind utility classes for each badge variant. Feel free to customise
// these to fit your design system.
const VARIANT_STYLES: Record<string, string> = {
  default:
    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
  outline: "text-foreground border border-input",
};

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", ...props }) => {
  const variantClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClass,
        className,
      )}
      {...props}
    />
  );
};

Badge.displayName = "Badge";