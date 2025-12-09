import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  options: Option[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-medium text-white/50 mb-1.5">
            {label}
            {props.required && <span className="text-pink-400 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-2.5 rounded-xl appearance-none
              bg-white/[0.03] backdrop-blur-sm
              border ${error ? 'border-red-500/30' : 'border-white/[0.08]'}
              text-white
              focus:outline-none focus:border-pink-500/40 focus:bg-white/[0.05]
              transition-all cursor-pointer
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-[#0d0d0d] text-white/40">
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#0d0d0d] text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
