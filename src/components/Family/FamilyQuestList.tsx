import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calculator, 
  ShoppingCart, 
  Utensils, 
  Microscope, 
  Leaf, 
  Brain, 
  Clock, 
  Users, 
  Star,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FamilyQuestProps {
  id: string;
  title: string;
  description: string;
  category: string;
  subjects: string[];
  duration: string;
  members: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  progress: number;
  icon: React.ReactNode;
  deadline: string;
  isNew?: boolean;
  isLocked?: boolean;
}

const FamilyQuestList: React.FC = () => {
  const { toast } = useToast();
  
  const familyQuests: FamilyQuestProps[] = [
    {
      id: '1',
      title: 'Kitchen Math Master',
      description: 'Measure ingredients and calculate proportions with your family to make a delicious recipe together!',
      category: 'Weekly',
      subjects: ['Math', 'Home Science'],
      duration: '45 min',
      members: '2+',
      difficulty: 'Easy',
      xp: 50,
      progress: 25,
      icon: <Utensils size={20} />,
      deadline: 'Sunday',
      isNew: true,
    },
    {
      id: '2',
      title: 'Plan a ₹500 Family Outing',
      description: 'Create a budget for a family day out. Compare prices, calculate expenses, and make decisions together!',
      category: 'Weekly',
      subjects: ['Math', 'Economics'],
      duration: '60 min',
      members: 'All',
      difficulty: 'Medium',
      xp: 75,
      progress: 0,
      icon: <ShoppingCart size={20} />,
      deadline: 'Monday',
    },
    {
      id: '3',
      title: 'Plant a Family Garden',
      description: 'Learn about plant life cycles, measure growth, and document your observations as a family science project!',
      category: 'Monthly',
      subjects: ['Science', 'Environmental Studies'],
      duration: '2-4 weeks',
      members: '2+',
      difficulty: 'Medium',
      xp: 150,
      progress: 0,
      icon: <Leaf size={20} />,
      deadline: 'Next Month',
    },
    {
      id: '4',
      title: 'Home Science Lab',
      description: 'Conduct simple experiments at home with everyday materials. Learn scientific principles as a family!',
      category: 'Premium',
      subjects: ['Science', 'Chemistry'],
      duration: '90 min',
      members: '2+',
      difficulty: 'Hard',
      xp: 100,
      progress: 0,
      icon: <Microscope size={20} />,
      deadline: 'Next Week',
      isLocked: true,
    },
  ];
  
  const handleStartQuest = (quest: FamilyQuestProps) => {
    if (quest.isLocked) {
      toast({
        title: "Premium Quest",
        description: "Upgrade to Family Premium to unlock this quest!",
        variant: "default",
      });
      return;
    }
    
    toast({
      title: `${quest.title} started!`,
      description: "Notify your family members to join in on the fun.",
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Family Quests</h2>
        <Button variant="outline" className="gap-2">
          <CalendarIcon size={16} />
          View Calendar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyQuests.map((quest) => (
          <Card 
            key={quest.id} 
            className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
              quest.isLocked ? 'opacity-75' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    quest.category === 'Weekly' ? 'bg-blue-100 text-lovable-blue' : 
                    quest.category === 'Monthly' ? 'bg-purple-100 text-lovable-purple' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {quest.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{quest.title}</CardTitle>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="outline">{quest.category}</Badge>
                      {quest.isNew && (
                        <Badge variant="default" className="bg-green-500">New</Badge>
                      )}
                      {quest.isLocked && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-lovable-purple">+{quest.xp} XP</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{quest.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {quest.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {subject}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {quest.duration}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  {quest.members}
                </div>
                <div className="flex items-center">
                  <Star size={14} className="mr-1" />
                  {quest.difficulty}
                </div>
              </div>
              
              {quest.progress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{quest.progress}%</span>
                  </div>
                  <Progress value={quest.progress} className="h-2" />
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Due: {quest.deadline}
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleStartQuest(quest)}
                  variant={quest.isLocked ? "outline" : "default"}
                  className={quest.isLocked ? "border-yellow-500 text-yellow-500" : ""}
                >
                  {quest.progress > 0 ? "Continue" : quest.isLocked ? "Unlock" : "Start Quest"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyQuestList;
