
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy, Star, Download } from 'lucide-react';

interface MythologicalQuestProps {
  questTitle: string;
  characterName: string;
  subject: string;
}

const MythologicalLearningActions: React.FC<MythologicalQuestProps> = ({ 
  questTitle, 
  characterName, 
  subject 
}) => {
  const { toast } = useToast();

  const handleStartQuest = () => {
    toast({
      title: "Quest Started!",
      description: `You've begun ${questTitle} with ${characterName}`,
      variant: "default",
    });
  };

  const handleDownloadResources = () => {
    toast({
      title: "Resources Downloaded",
      description: `Supporting materials for ${questTitle} are ready to use`,
      variant: "default",
    });
  };

  const handleAddToFavorites = () => {
    toast({
      title: "Added to Favorites",
      description: `${questTitle} added to your favorite quests collection`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-4">
      <Button 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleStartQuest}
      >
        <Sparkles className="h-4 w-4" />
        Start Quest
      </Button>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleDownloadResources}
        >
          <Download className="h-4 w-4" />
          Resources
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleAddToFavorites}
        >
          <Star className="h-4 w-4" />
          Favorite
        </Button>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 p-2 rounded-md">
        <Trophy className="h-4 w-4" />
        <span>Completing this quest earns you the {characterName} Badge and {subject} XP</span>
      </div>
    </div>
  );
};

export default MythologicalLearningActions;
