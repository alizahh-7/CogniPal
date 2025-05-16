import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-text-secondary text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full bg-background-lighter border border-primary/30 rounded-lg p-3',
            'text-text placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-interactive focus:border-transparent',
            'transition-colors duration-200',
            icon && 'pl-10',
            error && 'border-error focus:ring-error',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  );
};

export default Input;