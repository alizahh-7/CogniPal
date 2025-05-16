import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'highlight';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showValue = false,
  size = 'md',
  variant = 'primary',
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };
  
  const variantClasses = {
    primary: 'bg-interactive',
    accent: 'bg-accent',
    highlight: 'bg-highlight',
  };

  return (
    <div className="w-full space-y-1">
      <div 
        className={cn(
          'w-full bg-background-lighter rounded-full overflow-hidden',
          sizeClasses[size],
          className
        )}
      >
        <motion.div
          className={cn('h-full rounded-full', variantClasses[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showValue && (
        <div className="flex justify-end">
          <span className="text-xs text-text-secondary">{clampedProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;