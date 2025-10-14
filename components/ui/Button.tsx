import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, children, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-2xl font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary-yellow/50';

    const variants = {
      primary: 'bg-gradient-to-r from-primary-red to-soft-red text-white hover:scale-105 hover:shadow-2xl active:scale-100',
      secondary: 'border-2 border-white bg-white/10 backdrop-blur text-white hover:bg-white/20 hover:scale-105 active:scale-100',
      ghost: 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-lg active:bg-gray-300',
      outline: 'border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white hover:shadow-lg active:bg-primary-red/90',
    };

    const sizes = {
      sm: 'px-6 py-3 text-sm',
      md: 'px-10 py-4 text-base',
      lg: 'px-12 py-6 text-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
