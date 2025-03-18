
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Users, Video, Brain, Camera, Star } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Book className="text-lovable-blue" size={24} />,
      title: "Adaptive Learning Paths",
      description: "AI-powered lessons that adjust to your child's learning style and pace, making education truly personalized.",
      color: "blue",
      category: "learning"
    },
    {
      icon: <Users className="text-lovable-green" size={24} />,
      title: "Family Learning Mode",
      description: "Weekly challenges and activities designed for parents and children to learn and bond together.",
      color: "green",
      category: "family"
    },
    {
      icon: <Video className="text-lovable-purple" size={24} />,
      title: "Live Premium Sessions",
      description: "Connect with amazing tutors in real-time for personalized guidance and interactive lessons.",
      color: "purple",
      category: "premium"
    },
    {
      icon: <Brain className="text-lovable-orange" size={24} />,
      title: "Interactive Story Quests",
      description: "Turn learning into adventures where kids solve problems to unlock chapters of exciting stories.",
      color: "orange",
      category: "learning"
    },
    {
      icon: <Camera className="text-lovable-pink" size={24} />,
      title: "Homework Scanner",
      description: "Snap a photo of difficult problems and Buddy will explain the solution step by step.",
      color: "pink",
      category: "tools"
    },
    {
      icon: <Star className="text-lovable-yellow" size={24} />,
      title: "Progress Celebration",
      description: "Achievements, rewards and personalized feedback that keeps kids motivated and confident.",
      color: "yellow",
      category: "tools"
    }
  ];
  
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything your child needs to <span className="text-gradient-blue-green">love learning</span>
          </h2>
          <p className="text-lg text-gray-600">
            Our platform combines game-based learning, AI tutoring, and family activities to create an educational experience that's both effective and delightful.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-gray-100 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                
                <div className="mb-2">
                  <Badge 
                    variant={
                      feature.category === "learning" ? "default" : 
                      feature.category === "family" ? "secondary" : 
                      feature.category === "premium" ? "outline" : 
                      "default"
                    }
                  >
                    {feature.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
                
                <div className="mt-4">
                  <a href="#" className={`text-lovable-${feature.color} font-medium flex items-center text-sm hover:underline`}>
                    Learn more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
