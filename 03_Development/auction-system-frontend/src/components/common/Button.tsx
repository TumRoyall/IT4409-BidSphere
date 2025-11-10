import * as React from "react";
import { cn } from "./Utils";

/**
 * A simple, flexible button component with variant and size support.
 *
 * This implementation avoids pulling in additional UI libraries. Instead of
 * relying on `@radix-ui/react-slot` and `class-variance-authority`, it uses
 * plain objects to map variants and sizes to Tailwind utility classes. This
 * keeps the component lightweight while still supporting multiple visual
 * styles. See `VARIANT_STYLES` and `SIZE_STYLES` for the available options.
 */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button. Defaults to `default`.
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /**
   * Size of the button. Defaults to `default`.
   */
  size?: "default" | "sm" | "lg" | "icon";
}

// Define styling for each variant. These classes rely on your Tailwind
// configuration (e.g. the `primary`, `secondary`, `destructive` colors). Feel
// free to tweak these values to match your design system.
const VARIANT_STYLES: Record<string, string> = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline:
    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

// Define sizing for each size option. Adjust these values to change the
// padding or height of your buttons.
const SIZE_STYLES: Record<string, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

/**
 * Primary Button component. Accepts all native button attributes along with
 * `variant` and `size` props to customise its appearance. When disabled, it
 * automatically applies appropriate pointer and opacity styles.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const variantClass = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;
    const sizeClass = SIZE_STYLES[size] ?? SIZE_STYLES.default;
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          // Base styles shared across all buttons
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0",
          variantClass,
          sizeClass,
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";