
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FamilyQuestCard, { FamilyQuestProps } from './FamilyQuestCard';
import { familyQuestsData } from './QuestData';

const FamilyQuestList: React.FC = () => {
  const { toast } = useToast();
  
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
        {familyQuestsData.map((quest) => (
          <FamilyQuestCard 
            key={quest.id}
            quest={quest} 
            onStartQuest={handleStartQuest} 
          />
        ))}
      </div>
    </div>
  );
};

export default FamilyQuestList;
