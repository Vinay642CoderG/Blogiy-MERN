import { cn } from "../../utils/cn";

function FormField({
  children,
  label,
  error,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default FormField;
