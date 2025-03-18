
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BuddyBotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'happy' | 'excited' | 'thinking' | 'neutral';
  className?: string;
  animated?: boolean;
  speaking?: boolean;
  onClick?: () => void;
}

const BuddyBot: React.FC<BuddyBotProps> = ({
  size = 'md',
  expression = 'happy',
  className,
  animated = true,
  speaking = false,
  onClick,
}) => {
  const [bobbing, setBobbing] = useState(true);
  
  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setBobbing((prev) => !prev);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [animated]);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };
  
  // Generate body color based on expression
  const bodyColor = {
    happy: 'bg-lovable-blue',
    excited: 'bg-lovable-purple',
    thinking: 'bg-lovable-teal',
    neutral: 'bg-lovable-orange',
  };
  
  // Generate eye style based on expression
  const eyeStyle = {
    happy: 'h-2 rounded-full',
    excited: 'rounded-full',
    thinking: 'rounded-full',
    neutral: 'rounded-full',
  };
  
  // Generate mouth style based on expression
  const mouthStyle = {
    happy: 'w-6 h-3 rounded-bl-full rounded-br-full',
    excited: 'w-6 h-6 rounded-full animate-pulse',
    thinking: 'w-2 h-2 rounded-full translate-x-1',
    neutral: 'w-6 h-1 rounded-full',
  };
  
  return (
    <div
      className={cn(
        'relative cursor-pointer transition-transform duration-300 hover:scale-105',
        animated && bobbing ? 'animate-bounce-subtle' : '',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      {/* Body */}
      <div className={cn(
        'absolute inset-0 rounded-full shadow-lg',
        bodyColor[expression]
      )}>
        {/* Create a subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"></div>
        
        {/* Shine effect */}
        <div className="absolute top-1 left-1/4 w-2 h-2 bg-white/40 rounded-full"></div>
      </div>
      
      {/* Face container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Eyes */}
        <div className="flex space-x-3 mb-2">
          <div 
            className={cn(
              'bg-white w-3', 
              eyeStyle[expression],
              expression === 'thinking' && 'animate-pulse',
            )}
          ></div>
          <div 
            className={cn(
              'bg-white w-3', 
              eyeStyle[expression],
              expression === 'thinking' && 'animate-pulse',
            )}
          ></div>
        </div>
        
        {/* Mouth */}
        <div 
          className={cn(
            'bg-white', 
            mouthStyle[expression],
            speaking && 'animate-pulse',
          )}
        ></div>
      </div>
      
      {/* Antenna */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <div className="h-4 w-1 bg-gray-300 relative">
          <div className="absolute top-0 w-2 h-2 -translate-x-1/4 rounded-full bg-lovable-yellow animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BuddyBot;
