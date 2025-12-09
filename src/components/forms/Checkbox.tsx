import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | ReactNode;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div
            className={`
              w-5 h-5 rounded-md border
              border-white/[0.12] bg-white/[0.03]
              peer-checked:border-pink-500/60 peer-checked:bg-pink-500/90
              peer-focus:ring-2 peer-focus:ring-pink-500/10
              backdrop-blur-sm
              transition-all duration-200
              ${className}
            `}
          />
          <Check
            size={14}
            className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          />
        </div>
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <span className="text-sm font-medium text-white/80 group-hover:text-white">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-white/40">{description}</p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Toggle component
interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div
            className={`
              w-11 h-6 rounded-full
              bg-white/[0.08] peer-checked:bg-pink-500/80
              border border-white/[0.08] peer-checked:border-pink-500/40
              backdrop-blur-sm
              transition-all duration-200
              ${className}
            `}
          />
          <div
            className={`
              absolute top-0.5 left-0.5
              w-5 h-5 rounded-full bg-white
              shadow-sm
              peer-checked:translate-x-5
              transition-transform duration-200
            `}
          />
        </div>
        {label && (
          <span className="text-sm font-medium text-white">{label}</span>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Checkbox;
