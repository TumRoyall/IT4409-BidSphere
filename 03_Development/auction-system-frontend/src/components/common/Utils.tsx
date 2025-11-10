import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to intelligently merge Tailwind class names. It first
 * concatenates classes using `clsx` and then resolves conflicts using
 * `tailwind-merge`. You can import this helper throughout your
 * components to simplify conditional styling.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}