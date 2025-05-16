import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  className,
  onClick,
  interactive = false,
  children,
}) => {
  const variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: '0 0 15px rgba(155, 107, 158, 0.3)'
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className={cn(
        'bg-background-card rounded-xl p-6 backdrop-blur-sm border border-primary/20',
        interactive && 'cursor-pointer hover:shadow-glow-purple transition-all duration-300',
        className
      )}
      onClick={onClick}
      variants={interactive ? variants : undefined}
      initial="initial"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive && onClick ? "tap" : undefined}
    >
      {children}
    </motion.div>
  );
};

export default Card;