
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glassmorphism?: boolean;
  neomorphism?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hoverEffect = false,
  glassmorphism = false,
  neomorphism = false
}) => {
  return (
    <div 
      className={cn(
        "rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-md",
        hoverEffect && "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        glassmorphism && "glassmorphism",
        neomorphism && "neomorphism",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={cn("p-6 border-b border-gray-100", className)}>
    {children}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={cn("p-6 border-t border-gray-100", className)}>
    {children}
  </div>
);

export default Card;
