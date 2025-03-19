
import React, { useState, useRef, useEffect } from 'react';
import { useBuddy, Message, Suggestion } from './BuddyContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import BuddyBot from './BuddyBot';
import { cn } from '@/lib/utils';
import { 
  Send, 
  Mic, 
  X, 
  Minimize2, 
  Maximize2,
  RefreshCw,
  Volume2
} from 'lucide-react';

const BuddyChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const { isSpeaking } = useBuddy();
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      message.sender === 'buddy' ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-3",
        message.sender === 'buddy' 
          ? "bg-blue-50 text-gray-800" 
          : "bg-blue-600 text-white"
      )}>
        {message.sender === 'buddy' && (
          <div className="flex items-center gap-2 mb-2">
            <BuddyBot 
              size="sm" 
              expression="happy" 
              speaking={isSpeaking} 
              animated={false}
            />
            <span className="font-medium">Buddy</span>
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <div className="text-xs opacity-70 mt-1 text-right">
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    </div>
  );
};

const BuddySuggestion: React.FC<{ suggestion: Suggestion }> = ({ suggestion }) => {
  const { sendMessage } = useBuddy();
  
  return (
    <Button
      variant="outline"
      className="text-xs whitespace-normal h-auto py-1 px-3 text-left justify-start"
      onClick={() => sendMessage(suggestion.text)}
    >
      {suggestion.text}
    </Button>
  );
};

const BuddyChat: React.FC = () => {
  const { 
    messages, 
    suggestions, 
    isLoading, 
    isListening,
    sendMessage, 
    clearMessages, 
    startListening,
    stopListening,
    currentExpression,
    isSpeaking,
    isChatOpen,
    toggleChat
  } = useBuddy();
  
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new ones arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isChatOpen) return null;
  
  return (
    <div className={cn(
      "fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-300 flex flex-col",
      isMinimized ? "h-16" : "h-[500px] max-h-[80vh]"
    )}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-blue-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <BuddyBot size="sm" expression={currentExpression} animated={false} />
          <h3 className="font-medium">Learning Buddy</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0"
            onClick={() => setIsMinimized(prev => !prev)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600"
            onClick={toggleChat}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <BuddyBot size="lg" expression="excited" className="mb-4" />
                <h3 className="text-lg font-medium mb-2">I'm Your Learning Buddy!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  I can help with homework, explain concepts, tell stories, and make learning fun!
                </p>
                <Button 
                  variant="outline" 
                  className="text-sm" 
                  onClick={() => sendMessage("What can you help me with?")}
                >
                  How can you help me?
                </Button>
              </div>
            ) : (
              <>
                {messages.map(message => (
                  <BuddyChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-blue-50 text-gray-800 rounded-lg p-3 flex items-center gap-2">
                      <BuddyBot 
                        size="sm" 
                        expression="thinking" 
                        animated={false}
                      />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Suggestions */}
          {suggestions.length > 0 && !isLoading && (
            <div className="p-2 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-1 overflow-x-auto">
              {suggestions.map(suggestion => (
                <BuddySuggestion key={suggestion.id} suggestion={suggestion} />
              ))}
            </div>
          )}
          
          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 flex gap-2 items-end">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none"
              disabled={isLoading || isListening}
            />
            <div className="flex flex-col gap-2">
              <Button
                size="icon"
                variant={isListening ? "destructive" : "secondary"}
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                title={isListening ? "Stop listening" : "Voice input"}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                disabled={isLoading || isListening || !inputText.trim()}
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-3 py-2 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-800"
              onClick={clearMessages}
            >
              <RefreshCw className="h-3 w-3" />
              <span>New Chat</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-800"
            >
              <Volume2 className="h-3 w-3" />
              <span>Enable Voice</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default BuddyChat;
