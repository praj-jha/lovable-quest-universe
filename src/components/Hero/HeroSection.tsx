
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BuddyBot from '@/components/Buddy/BuddyBot';
import { ChevronRight, Star, Sparkles, Users, Heart, Trophy, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface HeroSectionProps {
  isAuthenticated?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isAuthenticated = false }) => {
  const [buddyExpression, setBuddyExpression] = useState<'happy' | 'excited' | 'thinking' | 'neutral'>('happy');
  const navigate = useNavigate();
  
  const changeBuddyExpression = () => {
    const expressions: ('happy' | 'excited' | 'thinking' | 'neutral')[] = ['happy', 'excited', 'thinking', 'neutral'];
    const currentIndex = expressions.indexOf(buddyExpression);
    const nextIndex = (currentIndex + 1) % expressions.length;
    setBuddyExpression(expressions[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden py-20 flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white z-0"></div>
        <div className="absolute top-1/3 left-1/5 w-4 h-4 rounded-full bg-lovable-yellow opacity-60 animate-float"></div>
        <div className="absolute top-1/4 right-1/3 w-6 h-6 rounded-full bg-lovable-green opacity-40 animate-bounce-subtle"></div>
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 rounded-full bg-lovable-purple opacity-30 animate-pulse-subtle"></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-lovable-pink opacity-50 animate-float"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-lovable-blue opacity-5 transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-lovable-green opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
              {isAuthenticated ? (
                <div 
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-lovable-green to-lovable-blue text-white text-sm font-medium animate-pulse-subtle gap-2"
                >
                  <Trophy size={16} />
                  <span>Continue Your Learning Journey</span>
                </div>
              ) : (
                <div 
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-lovable-purple to-lovable-blue text-white text-sm font-medium animate-pulse-subtle gap-2"
                >
                  <Users size={16} />
                  <span>New: Family Learning Mode</span>
                </div>
              )}
              
              {isAuthenticated ? (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Welcome <span className="text-gradient-purple-blue">Back</span> to Your <span className="text-gradient-blue-green">Adventure</span>
                </h1>
              ) : (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Make <span className="text-gradient-purple-blue">Learning</span> a Family <span className="text-gradient-blue-green">Adventure</span>
                </h1>
              )}
              
              {isAuthenticated ? (
                <p className="text-lg text-gray-600">
                  Pick up where you left off! Continue your quests, earn rewards, and keep exploring new skills and knowledge.
                </p>
              ) : (
                <p className="text-lg text-gray-600">
                  Transform everyday moments into exciting learning experiences. Complete quests together, earn rewards, and watch your family grow smarter together.
                </p>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {isAuthenticated ? (
                  // For logged in users
                  [
                    { icon: <BookOpen size={20} />, title: "Continue Learning", desc: "Pick up where you left" },
                    { icon: <Trophy size={20} />, title: "Check Progress", desc: "See your achievements" },
                    { icon: <Heart size={20} />, title: "Favorite Quests", desc: "Access saved activities" },
                    { icon: <Sparkles size={20} />, title: "New Content", desc: "Discover fresh challenges" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lovable-purple">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  // For non-logged in users
                  [
                    { icon: <Users size={20} />, title: "Family Quests", desc: "Learn together" },
                    { icon: <Trophy size={20} />, title: "Earn Rewards", desc: "Win as a family" },
                    { icon: <Heart size={20} />, title: "Build Bonds", desc: "Create memories" },
                    { icon: <BookOpen size={20} />, title: "Track Progress", desc: "Grow together" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lovable-purple">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isAuthenticated ? (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto shadow-lg rounded-full bg-gradient-to-r from-lovable-green to-lovable-blue hover:opacity-90"
                      onClick={() => navigate('/dashboard')}
                    >
                      Go to Dashboard
                      <ChevronRight size={18} />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto rounded-full"
                      onClick={() => navigate('/dashboard?tab=map')}
                    >
                      View Kingdom Map
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto shadow-lg rounded-full bg-gradient-to-r from-lovable-purple to-lovable-blue hover:opacity-90"
                      onClick={() => navigate('/register')}
                    >
                      Try Family Mode
                      <ChevronRight size={18} />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto rounded-full"
                      onClick={() => navigate('/login')}
                    >
                      I Already Have an Account
                    </Button>
                  </>
                )}
              </div>
              
              {!isAuthenticated && (
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
              )}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-blue-100 to-transparent rounded-full"></div>
              
              {isAuthenticated ? (
                // For logged in users - show progress cards
                <>
                  <Card className="absolute -left-24 top-10 w-64 transform rotate-6 animate-float-slow shadow-xl">
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">Your Progress</Badge>
                      <h3 className="font-bold mb-1">Math Adventure</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div className="bg-lovable-blue h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-lovable-purple">70% Complete</span>
                        <Badge variant="outline">Continue</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="absolute -right-20 bottom-10 w-64 transform -rotate-6 animate-float shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">Your Stats</Badge>
                        <Trophy className="text-lovable-yellow" size={20} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Current Level</span>
                          <span className="font-bold text-lovable-purple">Level 5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total XP</span>
                          <span className="font-bold text-lovable-green">350 XP</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Quests Completed</span>
                          <span className="font-bold text-lovable-blue">12</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                // For non-logged in users - show promotional cards
                <>
                  <Card className="absolute -left-24 top-10 w-64 transform rotate-6 animate-float-slow shadow-xl">
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">Family Quest</Badge>
                      <h3 className="font-bold mb-1">Kitchen Math Master</h3>
                      <p className="text-sm text-gray-600 mb-3">Cook together & learn measurements!</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-lovable-purple">+50 XP</span>
                        <Badge variant="outline">45 min</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="absolute -right-20 bottom-10 w-64 transform -rotate-6 animate-float shadow-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">Family Stats</Badge>
                        <Trophy className="text-lovable-yellow" size={20} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Weekly Quests</span>
                          <span className="font-bold text-lovable-purple">12/15</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Family XP</span>
                          <span className="font-bold text-lovable-green">350</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              <div className="relative z-10 transform scale-150 flex items-center justify-center p-10">
                <BuddyBot 
                  size="xl" 
                  expression={buddyExpression} 
                  animated={true}
                  onClick={changeBuddyExpression}
                />
                
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg max-w-[200px]">
                    <div className="absolute -bottom-2 left-5 w-4 h-4 bg-white transform rotate-45"></div>
                    <p className="text-sm text-gray-700">
                      {isAuthenticated ? 
                        "Welcome back! Ready to continue your learning adventure? 🌟" : 
                        "Let's learn together as a family! Ready for today's exciting quest? 🌟"
                      }
                    </p>
                  </div>
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
