
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Star, Award, Play, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quest {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  progress: number;
  completed: boolean;
  xp: number;
  boardType: 'CBSE' | 'ICSE' | 'State';
}

const BoardAlignedQuests: React.FC = () => {
  const { toast } = useToast();
  const [boardFilter, setBoardFilter] = useState<'all' | 'CBSE' | 'ICSE' | 'State'>('all');
  
  // Mock data for quests aligned with different boards
  const quests: Quest[] = [
    {
      id: 'q1',
      title: 'Number Operations Master',
      subject: 'Mathematics',
      chapter: 'Chapter 2: Addition and Subtraction',
      description: 'Practice adding and subtracting 3-digit numbers with regrouping through interactive problems.',
      duration: '20 min',
      difficulty: 'Easy',
      progress: 75,
      completed: false,
      xp: 100,
      boardType: 'CBSE'
    },
    {
      id: 'q2',
      title: 'Plant Life Cycle Explorer',
      subject: 'Science',
      chapter: 'Chapter 3: Living Things',
      description: 'Learn about plant growth stages through virtual experiments and observations.',
      duration: '30 min',
      difficulty: 'Medium',
      progress: 40,
      completed: false,
      xp: 120,
      boardType: 'CBSE'
    },
    {
      id: 'q3',
      title: 'Noun Detective',
      subject: 'English',
      chapter: 'Chapter 4: Parts of Speech',
      description: 'Identify different types of nouns in stories and real-world scenarios.',
      duration: '15 min',
      difficulty: 'Easy',
      progress: 100,
      completed: true,
      xp: 90,
      boardType: 'ICSE'
    },
    {
      id: 'q4',
      title: 'States of Matter Challenge',
      subject: 'Science',
      chapter: 'Chapter 5: Matter Around Us',
      description: 'Explore solids, liquids, and gases through interactive experiments.',
      duration: '25 min',
      difficulty: 'Medium',
      progress: 20,
      completed: false,
      xp: 110,
      boardType: 'ICSE'
    },
    {
      id: 'q5',
      title: 'Local Habitat Study',
      subject: 'Environmental Studies',
      chapter: 'Unit 2: Our Environment',
      description: 'Discover plants and animals native to your state and their importance.',
      duration: '35 min',
      difficulty: 'Medium',
      progress: 60,
      completed: false,
      xp: 130,
      boardType: 'State'
    },
    {
      id: 'q6',
      title: 'Regional Math Problems',
      subject: 'Mathematics',
      chapter: 'Unit 3: Measurement',
      description: 'Solve real-world math problems using local contexts and measurement units.',
      duration: '20 min',
      difficulty: 'Hard',
      progress: 10,
      completed: false,
      xp: 150,
      boardType: 'State'
    }
  ];
  
  // Filter quests based on board selection
  const filteredQuests = boardFilter === 'all' 
    ? quests 
    : quests.filter(quest => quest.boardType === boardFilter);
  
  // Group quests by completion status
  const inProgressQuests = filteredQuests.filter(quest => !quest.completed);
  const completedQuests = filteredQuests.filter(quest => quest.completed);
  
  const handleStartQuest = (questId: string) => {
    toast({
      title: "Quest Started",
      description: "Your curriculum-aligned quest has begun. Good luck!",
    });
  };
  
  const handleContinueQuest = (questId: string) => {
    toast({
      title: "Quest Continued",
      description: "Welcome back! Continue where you left off.",
    });
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-lovable-purple" />
            Board-Aligned Learning Quests
          </h2>
          <p className="text-gray-600">Complete quests aligned with your curriculum</p>
        </div>
        
        <div className="bg-gray-50 p-1 rounded-lg">
          <TabsList>
            <TabsTrigger 
              value="all" 
              onClick={() => setBoardFilter('all')}
              className={boardFilter === 'all' ? 'bg-white' : ''}
            >
              All Boards
            </TabsTrigger>
            <TabsTrigger 
              value="cbse" 
              onClick={() => setBoardFilter('CBSE')}
              className={boardFilter === 'CBSE' ? 'bg-white' : ''}
            >
              CBSE
            </TabsTrigger>
            <TabsTrigger 
              value="icse" 
              onClick={() => setBoardFilter('ICSE')}
              className={boardFilter === 'ICSE' ? 'bg-white' : ''}
            >
              ICSE
            </TabsTrigger>
            <TabsTrigger 
              value="state" 
              onClick={() => setBoardFilter('State')}
              className={boardFilter === 'State' ? 'bg-white' : ''}
            >
              State Board
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <div className="space-y-6">
        {inProgressQuests.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">In Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressQuests.map(quest => (
                <Card key={quest.id} className="overflow-hidden">
                  <div className="bg-lovable-purple/10 p-3 flex justify-between items-center">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {quest.boardType}
                    </Badge>
                    <Badge className={getDifficultyColor(quest.difficulty)}>
                      {quest.difficulty}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-lg">{quest.title}</h4>
                        <p className="text-sm text-gray-500">{quest.subject} • {quest.chapter}</p>
                      </div>
                      
                      <p className="text-sm line-clamp-2">{quest.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{quest.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{quest.xp} XP</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span>Progress</span>
                          <span>{quest.progress}%</span>
                        </div>
                        <Progress value={quest.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 p-3">
                    <Button 
                      className="w-full"
                      onClick={() => handleContinueQuest(quest.id)}
                    >
                      {quest.progress > 0 ? 'Continue Quest' : 'Start Quest'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {completedQuests.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-3">Completed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedQuests.map(quest => (
                <Card key={quest.id} className="overflow-hidden border-green-200">
                  <div className="bg-green-50 p-3 flex justify-between items-center">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {quest.boardType}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-lg">{quest.title}</h4>
                        <p className="text-sm text-gray-500">{quest.subject} • {quest.chapter}</p>
                      </div>
                      
                      <p className="text-sm line-clamp-2">{quest.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{quest.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-green-500" />
                          <span>{quest.xp} XP Earned</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span>Completed</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2 bg-gray-100">
                          <div className="h-full bg-green-500 rounded-full" />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 p-3">
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => handleContinueQuest(quest.id)}
                    >
                      Review Quest
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {filteredQuests.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No quests found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are no {boardFilter !== 'all' ? boardFilter : ''} board-aligned quests 
              available right now. Please check back later or select a different board.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardAlignedQuests;
