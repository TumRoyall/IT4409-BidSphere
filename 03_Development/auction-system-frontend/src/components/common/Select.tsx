import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "./Utils";

/**
 * A lightweight custom Select component that emulates the API of Radix UI's
 * `react-select` but does not depend on any external UI libraries. It uses
 * React context internally to manage open state and selected value. The
 * component exposes a handful of subcomponents (Trigger, Value, Content,
 * Item, etc.) so that existing code written for Radix Select can continue
 * working with minimal changes.
 */

// Context shape for internal state management
interface SelectContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextProps | undefined>(undefined);

// Main Select component
export interface SelectProps {
  /**
   * The current value. If provided, the component acts as a controlled
   * component; otherwise it manages its own state internally.
   */
  value?: string;
  /**
   * Initial value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Callback fired when the selected value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * Children should include a SelectTrigger and SelectContent.
   */
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, defaultValue, onValueChange, children }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>(value ?? defaultValue ?? "");

  // Keep internal selected value in sync when `value` is controlled
  React.useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = React.useCallback(
    (val: string) => {
      setSelected(val);
      onValueChange?.(val);
      setOpen(false);
    },
    [onValueChange],
  );

  return (
    <SelectContext.Provider
      value={{ open, setOpen, selectedValue: selected, onSelect: handleSelect }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

// Trigger component toggles the dropdown open/closed. Mimics Radix's Trigger API.
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    if (!ctx) {
      throw new Error("SelectTrigger must be used within a Select");
    }
    const { open, setOpen } = ctx;
    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {/* Pass through any children, which may include a <SelectValue /> */}
        <span className="flex-1 min-w-0">{children}</span>
        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

// Displays the currently selected value or a placeholder. Should be used inside
// SelectTrigger. Accepts a placeholder prop.
export interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error("SelectValue must be used within a Select");
  }
  const { selectedValue } = ctx;
  return <span className="truncate">{selectedValue || placeholder}</span>;
};

// Container for the dropdown list. Only renders its children when open.
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectContent: React.FC<SelectContentProps> = ({ className, children, ...props }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error("SelectContent must be used within a Select");
  }
  const { open } = ctx;
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    >
      <ul className="p-1">{children}</ul>
    </div>
  );
};

// Label for grouping options. Rendered as a div for simplicity.
export const SelectLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
);
SelectLabel.displayName = "SelectLabel";

// Wrapper for multiple items. Simply renders its children.
export const SelectGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
SelectGroup.displayName = "SelectGroup";

// A single selectable option. Clicking it will update the selected value and
// close the dropdown. It renders an optional check mark when selected.
export interface SelectItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value: string;
}

export const SelectItem = ({ value, className, children, ...props }: SelectItemProps) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error("SelectItem must be used within a Select");
  }
  const { selectedValue, onSelect } = ctx;
  const isSelected = selectedValue === value;
  return (
    <li
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {isSelected ? (
        <CheckIcon className="absolute right-2 h-4 w-4" />
      ) : null}
    </li>
  );
};

// Separator element between items. It uses a horizontal rule for simplicity.
export const SelectSeparator: React.FC = () => (
  <hr className="-mx-1 my-1 h-px border-none bg-muted" />
);
SelectSeparator.displayName = "SelectSeparator";

// These are no-ops provided for API compatibility with Radix. They do nothing
// but allow existing imports to work without breaking. In a more
// sophisticated implementation you might add scroll buttons, but for now
// keeping them empty simplifies the component.
export const SelectScrollUpButton: React.FC = () => null;
SelectScrollUpButton.displayName = "SelectScrollUpButton";
export const SelectScrollDownButton: React.FC = () => null;
SelectScrollDownButton.displayName = "SelectScrollDownButton";