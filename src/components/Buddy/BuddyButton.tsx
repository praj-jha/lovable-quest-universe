
import React from 'react';
import BuddyBot from './BuddyBot';
import { useBuddy } from './BuddyContext';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BuddyButton: React.FC = () => {
  const { toggleChat, isChatOpen, messages, currentExpression } = useBuddy();
  
  const hasUnreadMessages = messages.length > 0 && 
    messages[messages.length - 1].sender === 'buddy';
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-40 cursor-pointer transition-all duration-300 transform",
        isChatOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      )}
      onClick={toggleChat}
    >
      <div className="relative">
        <div className="bg-white rounded-full p-1 shadow-lg">
          <BuddyBot 
            size="lg" 
            expression={currentExpression} 
            className="relative z-10"
          />
        </div>
        
        {hasUnreadMessages && (
          <Badge 
            className="absolute -top-1 -right-1 z-20 animate-pulse"
            variant="destructive"
          >
            1
          </Badge>
        )}
        
        <div className="absolute -top-8 -right-2 bg-white px-2 py-1 rounded-full shadow-md text-xs font-medium flex items-center gap-1">
          <MessageCircle className="h-3 w-3" />
          <span>Chat with me!</span>
        </div>
      </div>
    </div>
  );
};

export default BuddyButton;
