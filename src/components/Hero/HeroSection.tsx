
import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import BuddyBot from '@/components/Buddy/BuddyBot';
import { ChevronRight, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const [buddyExpression, setBuddyExpression] = useState<'happy' | 'excited' | 'thinking' | 'neutral'>('happy');
  
  const changeBuddyExpression = () => {
    const expressions: ('happy' | 'excited' | 'thinking' | 'neutral')[] = ['happy', 'excited', 'thinking', 'neutral'];
    const currentIndex = expressions.indexOf(buddyExpression);
    const nextIndex = (currentIndex + 1) % expressions.length;
    setBuddyExpression(expressions[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden py-20 flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white z-0"></div>
        
        {/* Animated particles */}
        <div className="absolute top-1/3 left-1/5 w-4 h-4 rounded-full bg-lovable-yellow opacity-60 animate-float"></div>
        <div className="absolute top-1/4 right-1/3 w-6 h-6 rounded-full bg-lovable-green opacity-40 animate-bounce-subtle"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 rounded-full bg-lovable-purple opacity-30 animate-pulse-subtle"></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-lovable-pink opacity-50 animate-float"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-lovable-blue opacity-5 transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-lovable-green opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
              {/* Badge */}
              <div 
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-lovable-blue text-sm font-medium animate-pulse-subtle"
              >
                <Sparkles size={16} className="mr-2" />
                <span>For Grades 2-6</span>
              </div>
              
              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Where <span className="text-gradient-blue-green">Learning</span> Becomes a Magical <span className="text-gradient-purple-blue">Adventure</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-600">
                Discover a playful, interactive universe where kids master curriculum while having fun. With AI guidance, family bonding activities, and premium tutoring.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  rounded="full"
                  className="w-full sm:w-auto shadow-lg"
                  icon={<ChevronRight size={18} />}
                  iconPosition="right"
                >
                  Start Free Trial
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  rounded="full"
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="pt-8">
                <div className="flex items-center space-x-1 text-lovable-yellow mb-2">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <span className="ml-2 text-gray-600 text-sm">5.0 from 2,000+ happy families</span>
                </div>
                
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 border-white overflow-hidden",
                        `bg-lovable-${['blue', 'green', 'purple', 'orange', 'pink'][i % 5]}`
                      )}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold">
                    +2k
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Circular gradient background */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-100 to-transparent rounded-full"></div>
              
              {/* The interactive buddy */}
              <div className="relative z-10 transform scale-150 flex items-center justify-center p-10">
                <BuddyBot 
                  size="xl" 
                  expression={buddyExpression} 
                  animated={true}
                  onClick={changeBuddyExpression}
                />
                
                {/* Dialog bubble */}
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
                  <div className="relative bg-white rounded-2xl p-3 shadow-lg max-w-[180px]">
                    <div className="absolute -bottom-2 left-5 w-4 h-4 bg-white transform rotate-45"></div>
                    <p className="text-sm text-gray-700">
                      Hi! I'm Buddy. Click me to learn together!
                    </p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-0 left-0 transform -translate-x-full -translate-y-1/2 bg-lovable-blue text-white p-2 rounded-lg rotate-6 shadow-lg">
                  <span className="text-sm font-bold">Math Quest</span>
                </div>
                
                <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-lovable-green text-white p-2 rounded-lg -rotate-3 shadow-lg">
                  <span className="text-sm font-bold">Science Lab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
