import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  size = 'md',
  className,
  icon,
}) => {
  const sizeClasses = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3' },
    md: { track: 'w-10 h-5', thumb: 'w-4 h-4' },
    lg: { track: 'w-12 h-6', thumb: 'w-5 h-5' },
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {icon && <span className="text-text-secondary">{icon}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onChange}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-interactive focus:ring-offset-2 focus:ring-offset-background',
          enabled ? 'bg-interactive' : 'bg-background-lighter',
          sizeClasses[size].track
        )}
      >
        <span className="sr-only">{label || 'Toggle'}</span>
        <motion.span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-text',
            sizeClasses[size].thumb
          )}
          initial={false}
          animate={{
            x: enabled 
              ? size === 'sm' ? 16 : size === 'md' ? 20 : 28
              : 4
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </div>
  );
};

export default Toggle;