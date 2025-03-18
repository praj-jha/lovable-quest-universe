
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Star } from 'lucide-react';

export interface FamilyQuestProps {
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

interface FamilyQuestCardProps {
  quest: FamilyQuestProps;
  onStartQuest: (quest: FamilyQuestProps) => void;
}

const FamilyQuestCard: React.FC<FamilyQuestCardProps> = ({ quest, onStartQuest }) => {
  return (
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
            onClick={() => onStartQuest(quest)}
            variant={quest.isLocked ? "outline" : "default"}
            className={quest.isLocked ? "border-yellow-500 text-yellow-500" : ""}
          >
            {quest.progress > 0 ? "Continue" : quest.isLocked ? "Unlock" : "Start Quest"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyQuestCard;
