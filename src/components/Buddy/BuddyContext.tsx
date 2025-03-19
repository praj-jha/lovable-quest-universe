
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'buddy';
  timestamp: Date;
};

export type Suggestion = {
  id: string;
  text: string;
};

type BuddyContextType = {
  messages: Message[];
  suggestions: Suggestion[];
  isLoading: boolean;
  isListening: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  startListening: () => void;
  stopListening: () => void;
  currentExpression: 'happy' | 'excited' | 'thinking' | 'neutral';
  isSpeaking: boolean;
  toggleChat: () => void;
  isChatOpen: boolean;
};

const BuddyContext = createContext<BuddyContextType | undefined>(undefined);

const INITIAL_SUGGESTIONS = [
  { id: '1', text: "What's on my learning path today?" },
  { id: '2', text: "Help me with my math homework" },
  { id: '3', text: "Tell me a story about Indian mythology" },
  { id: '4', text: "I want to play a learning game" },
  { id: '5', text: "What topics should I review for exams?" },
];

export const BuddyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<'happy' | 'excited' | 'thinking' | 'neutral'>('happy');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  // Initial greeting when chat opens
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const initialGreeting: Message = {
        id: Date.now().toString(),
        content: 'Hello! I\'m your learning buddy. How can I help you today?',
        sender: 'buddy',
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
    }
  }, [isChatOpen, messages.length]);

  // Simulate speech recognition
  useEffect(() => {
    if (isListening) {
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone",
        duration: 2000,
      });
      
      // Simulate listening for 3 seconds then stop
      const timeout = setTimeout(() => {
        stopListening();
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isListening, toast]);

  // Generate contextual suggestions based on conversation
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // Only update suggestions after buddy messages
      if (lastMessage.sender === 'buddy') {
        // You could implement more complex logic here based on the content
        // of previous messages
        let newSuggestions = [...INITIAL_SUGGESTIONS];
        
        if (lastMessage.content.toLowerCase().includes('math')) {
          newSuggestions = [
            { id: '1', text: "I need help with fractions" },
            { id: '2', text: "Explain division to me" },
            ...INITIAL_SUGGESTIONS.slice(0, 3),
          ];
        } else if (lastMessage.content.toLowerCase().includes('story')) {
          newSuggestions = [
            { id: '1', text: "Tell me about Lord Ganesha" },
            { id: '2', text: "I want to hear about Ramayana" },
            ...INITIAL_SUGGESTIONS.slice(0, 3),
          ];
        } else if (lastMessage.content.toLowerCase().includes('game')) {
          newSuggestions = [
            { id: '1', text: "I want to play a word game" },
            { id: '2', text: "Show me math games" },
            ...INITIAL_SUGGESTIONS.slice(0, 3),
          ];
        }
        
        setSuggestions(newSuggestions);
      }
    }
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setCurrentExpression('thinking');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = {
        math: "I can help with math! What specific topic are you struggling with? Fractions, multiplication, division?",
        homework: "Let's work on your homework together! What subject is it for?",
        story: "I'd love to tell you a story! Would you like to hear about the clever Birbal, mighty Hanuman, or the elephant-headed Ganesha?",
        game: "Games make learning fun! We have word games, math puzzles, and science quizzes. What would you like to play?",
        exam: "Getting ready for exams is important! I can help you review math, science, language, or social studies.",
        default: "I'm here to help with your learning journey! I can assist with homework, tell stories, play educational games, or help you review topics."
      };
      
      // Determine which response to use based on user message
      let responseText = responses.default;
      const lowercasedContent = content.toLowerCase();
      
      if (lowercasedContent.includes('math') || lowercasedContent.includes('calculation')) {
        responseText = responses.math;
      } else if (lowercasedContent.includes('homework')) {
        responseText = responses.homework;
      } else if (lowercasedContent.includes('story')) {
        responseText = responses.story;
      } else if (lowercasedContent.includes('game') || lowercasedContent.includes('play')) {
        responseText = responses.game;
      } else if (lowercasedContent.includes('exam') || lowercasedContent.includes('test')) {
        responseText = responses.exam;
      }
      
      const buddyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: 'buddy',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, buddyMessage]);
      setIsLoading(false);
      setCurrentExpression('happy');
      
      // Simulate buddy speaking
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }, 1500);
  };
  
  const clearMessages = () => {
    setMessages([]);
    setSuggestions(INITIAL_SUGGESTIONS);
  };
  
  const startListening = () => {
    setIsListening(true);
    setCurrentExpression('excited');
    
    // Simulate speech recognition result after a delay
    setTimeout(() => {
      const recognizedSpeech = "I need help with my math homework";
      sendMessage(recognizedSpeech);
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
    setCurrentExpression('happy');
  };
  
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };
  
  return (
    <BuddyContext.Provider value={{
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
      toggleChat,
      isChatOpen
    }}>
      {children}
    </BuddyContext.Provider>
  );
};

export const useBuddy = () => {
  const context = useContext(BuddyContext);
  if (context === undefined) {
    throw new Error('useBuddy must be used within a BuddyProvider');
  }
  return context;
};
