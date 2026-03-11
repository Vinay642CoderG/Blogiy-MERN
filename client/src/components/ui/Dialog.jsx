import * as RadixDialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { cn } from "../../utils/cn";

function Dialog({ children, open, onOpenChange }) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  );
}

function DialogTrigger({ children, asChild = true }) {
  return (
    <RadixDialog.Trigger asChild={asChild}>{children}</RadixDialog.Trigger>
  );
}

function DialogContent({ children, className, title, ...props }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in" />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          "bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col",
          "animate-in fade-in zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
        <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
          <IoClose className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

function DialogHeader({ children, className, ...props }) {
  return (
    <div
      className={cn("px-6 py-4 border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogTitle({ children, className, ...props }) {
  return (
    <RadixDialog.Title
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    >
      {children}
    </RadixDialog.Title>
  );
}

function DialogDescription({ children, className, ...props }) {
  return (
    <RadixDialog.Description
      className={cn("text-sm text-gray-500 mt-1", className)}
      {...props}
    >
      {children}
    </RadixDialog.Description>
  );
}

function DialogBody({ children, className, ...props }) {
  return (
    <div
      className={cn("px-6 py-4 overflow-y-auto flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogFooter({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-gray-200 flex justify-end gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

export default Dialog;
