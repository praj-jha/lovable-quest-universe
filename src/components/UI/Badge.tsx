
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-lovable-blue text-white",
    secondary: "bg-lovable-green text-white",
    outline: "bg-transparent border border-current text-lovable-blue",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
  };
  
  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
