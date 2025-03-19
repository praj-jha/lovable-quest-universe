
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Filter, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FamilyQuestCard from './FamilyQuestCard';
import { familyQuestsData } from './QuestData';
import { Badge } from '@/components/ui/badge';

const FamilyQuestList: React.FC = () => {
  const { toast } = useToast();
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  
  const availableSubjects = Array.from(
    new Set(familyQuestsData.flatMap(quest => quest.subjects))
  );
  
  const filteredQuests = familyQuestsData.filter(quest => {
    const matchesDifficulty = difficultyFilter === null || quest.difficulty === difficultyFilter;
    const matchesSubject = subjectFilter === null || quest.subjects.includes(subjectFilter);
    return matchesDifficulty && matchesSubject;
  });
  
  const handleStartQuest = (quest: typeof familyQuestsData[0]) => {
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
  
  const clearFilters = () => {
    setDifficultyFilter(null);
    setSubjectFilter(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Family Quests</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon size={16} />
            View Calendar
          </Button>
          <Button variant="outline" className="gap-2">
            <BookOpen size={16} />
            Quest Guide
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium">Filter Quests</h3>
          {(difficultyFilter || subjectFilter) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-8 text-xs"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">By Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {["Easy", "Medium", "Hard"].map(difficulty => (
                <Badge 
                  key={difficulty}
                  variant={difficultyFilter === difficulty ? "default" : "outline"}
                  className={`cursor-pointer ${difficultyFilter === difficulty ? "" : "hover:bg-gray-200"}`}
                  onClick={() => setDifficultyFilter(
                    difficultyFilter === difficulty ? null : difficulty
                  )}
                >
                  {difficulty}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">By Subject</h4>
            <div className="flex flex-wrap gap-2">
              {availableSubjects.map(subject => (
                <Badge 
                  key={subject}
                  variant={subjectFilter === subject ? "default" : "outline"}
                  className={`cursor-pointer ${subjectFilter === subject ? "" : "hover:bg-gray-200"}`}
                  onClick={() => setSubjectFilter(
                    subjectFilter === subject ? null : subject
                  )}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {filteredQuests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <FamilyQuestCard 
              key={quest.id}
              quest={quest} 
              onStartQuest={() => handleStartQuest(quest)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No Quests Found</h3>
          <p className="text-gray-500 max-w-md mx-auto mt-2">
            No quests match your current filters. Try selecting different options or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default FamilyQuestList;
