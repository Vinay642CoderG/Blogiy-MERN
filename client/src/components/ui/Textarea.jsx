import { cn } from "../../utils/cn";

function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 border rounded-md text-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "disabled:bg-gray-50 disabled:cursor-not-allowed",
        error ? "border-red-500" : "border-gray-300",
        className,
      )}
      {...props}
    />
  );
}

export default Textarea;
