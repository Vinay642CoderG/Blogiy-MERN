import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../utils/cn";

function Dropdown({ children, ...props }) {
  return <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>;
}

function DropdownTrigger({ children, asChild = true, ...props }) {
  return (
    <DropdownMenu.Trigger asChild={asChild} {...props}>
      {children}
    </DropdownMenu.Trigger>
  );
}

function DropdownContent({ children, className, align = "end", ...props }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align={align}
        className={cn(
          "min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50",
          "animate-in fade-in zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

function DropdownItem({ children, className, asChild = false, ...props }) {
  return (
    <DropdownMenu.Item
      asChild={asChild}
      className={cn(
        "px-3 py-2 text-sm text-gray-700 rounded cursor-pointer outline-none",
        "hover:bg-gray-100 focus:bg-gray-100 transition-colors",
        "flex items-center gap-2",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
}

function DropdownSeparator({ className, ...props }) {
  return (
    <DropdownMenu.Separator
      className={cn("h-px bg-gray-200 my-1", className)}
      {...props}
    />
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
