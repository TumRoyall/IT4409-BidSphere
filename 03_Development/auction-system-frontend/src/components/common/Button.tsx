import * as React from "react";
import { cn } from "./Utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const VARIANT_STYLES: Record<string, string> = {
  default: "bg-[#1e3a5f] text-white shadow-md hover:bg-[#2c5282] active:bg-[#1a2f4d] transition-all duration-200",
  destructive: "bg-[#dc2626] text-white shadow-md hover:bg-[#b91c1c] active:bg-[#991b1b] transition-all duration-200",
  outline: "border-2 border-[#1e3a5f] bg-white text-[#1e3a5f] shadow-sm hover:bg-[#f0f4f8] active:bg-[#e2e8f0] transition-all duration-200",
  secondary: "bg-[#64748b] text-white shadow-md hover:bg-[#475569] active:bg-[#334155] transition-all duration-200",
  ghost: "text-[#1e3a5f] hover:bg-[#f0f4f8] active:bg-[#e2e8f0] transition-all duration-200",
  link: "text-[#1e3a5f] underline-offset-4 hover:underline hover:text-[#2c5282]",
};
const SIZE_STYLES: Record<string, string> = {
  default: "h-10 px-5 py-2.5 text-sm",
  sm: "h-8 px-3 py-2 text-xs",
  lg: "h-12 px-8 py-3 text-base",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}, ref) => {
  const variantClass = VARIANT_STYLES[variant];
  const sizeClass = SIZE_STYLES[size];
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";