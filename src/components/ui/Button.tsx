import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-interactive hover:bg-interactive-light text-text shadow-glow-purple',
    secondary: 'bg-primary hover:bg-primary-light text-text',
    accent: 'bg-accent hover:bg-accent-light text-primary-dark shadow-glow-accent',
    outline: 'bg-transparent border-2 border-interactive hover:bg-interactive/10 text-text',
    ghost: 'bg-transparent hover:bg-interactive/10 text-text',
  };

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2',
        variantClasses[variant],
        sizeClasses[size],
        disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="w-5 h-5">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="w-5 h-5">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;