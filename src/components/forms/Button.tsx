import { type ButtonHTMLAttributes, forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export type { ButtonProps };

const variantClasses = {
  primary: 'bg-gradient-to-r from-pink-500/90 to-pink-600/90 hover:from-pink-400 hover:to-pink-500 text-white shadow-lg shadow-pink-500/20 backdrop-blur-sm',
  secondary: 'bg-white/[0.06] hover:bg-white/[0.1] text-white/80 hover:text-white backdrop-blur-sm border border-white/[0.08]',
  outline: 'bg-transparent border border-white/[0.12] hover:bg-white/[0.04] text-white/70 hover:text-white backdrop-blur-sm',
  ghost: 'bg-transparent hover:bg-white/[0.06] text-white/60 hover:text-white',
  danger: 'bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-sm',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      loading: loadingProp = false,
      isLoading = false,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loadingProp || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-xl font-medium
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ripple btn-press
          hover:scale-[1.02] active:scale-[0.98]
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {(loadingProp || isLoading) ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon size={18} className="icon-hover" />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={18} className="icon-hover" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
