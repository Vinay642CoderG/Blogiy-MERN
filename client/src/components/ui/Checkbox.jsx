import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Checkbox = forwardRef(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div>
        <div className="flex items-start">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            className={cn(
              "h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
              className,
            )}
            {...props}
          />
          {label && (
            <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
              {label}
            </label>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
