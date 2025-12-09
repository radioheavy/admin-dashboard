import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-medium text-white/50 mb-1.5">
            {label}
            {props.required && <span className="text-pink-400 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 rounded-xl
              bg-white/[0.03] backdrop-blur-sm
              border ${error ? 'border-red-500/30' : 'border-white/[0.08]'}
              text-white placeholder-white/30
              focus:outline-none focus:border-pink-500/40 focus:bg-white/[0.05]
              transition-all
              ${icon ? 'pl-12' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-white/40">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
