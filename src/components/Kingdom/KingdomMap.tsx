
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  MapPin,
  Lock,
  BookOpen,
  Calculator,
  Brain,
  Flask,
  Globe,
  Puzzle,
  Music,
  Trophy,
  Zap,
  ChevronRight,
  Star
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BuddyBot from '@/components/Buddy/BuddyBot';

interface ZoneLevel {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  isCompleted: boolean;
  timeEstimate: string;
}

interface KingdomZone {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: {
    top: string;
    left: string;
  };
  status: 'beginner' | 'intermediate' | 'advanced';
  subject: 'math' | 'science' | 'language' | 'arts' | 'social';
  locked: boolean;
  progress: number;
  levels: ZoneLevel[];
  requiredZoneId?: string;
}

const KingdomMap: React.FC = () => {
  const { toast } = useToast();
  const [selectedZone, setSelectedZone] = useState<KingdomZone | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<ZoneLevel | null>(null);
  const [levelDialogOpen, setLevelDialogOpen] = useState(false);
  const [buddyTip, setBuddyTip] = useState("");
  
  const zones: KingdomZone[] = [
    {
      id: 'fractions-forest',
      name: 'Fractions Forest',
      description: 'Master fractions and decimals in this magical woodland filled with math puzzles.',
      icon: <Calculator size={24} />,
      color: 'bg-green-500',
      position: { top: '20%', left: '15%' },
      status: 'beginner',
      subject: 'math',
      locked: false,
      progress: 65,
      levels: [
        {
          id: 'ff-level1',
          name: 'Understanding Fractions',
          description: 'Learn what fractions are and how to identify them in the real world.',
          difficulty: 'easy',
          xpReward: 50,
          isCompleted: true,
          timeEstimate: '15 min'
        },
        {
          id: 'ff-level2',
          name: 'Comparing Fractions',
          description: 'Learn how to compare fractions with different denominators.',
          difficulty: 'easy',
          xpReward: 75,
          isCompleted: true,
          timeEstimate: '20 min'
        },
        {
          id: 'ff-level3',
          name: 'Adding Fractions',
          description: 'Master the art of adding fractions with the same denominators.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        },
        {
          id: 'ff-level4',
          name: 'Fraction Challenge',
          description: 'Test your fraction skills with this challenging puzzle.',
          difficulty: 'hard',
          xpReward: 150,
          isCompleted: false,
          timeEstimate: '30 min'
        }
      ]
    },
    {
      id: 'grammar-galaxy',
      name: 'Grammar Galaxy',
      description: 'Explore the stars and planets while learning about nouns, verbs, and sentences.',
      icon: <BookOpen size={24} />,
      color: 'bg-purple-500',
      position: { top: '35%', left: '65%' },
      status: 'beginner',
      subject: 'language',
      locked: false,
      progress: 40,
      levels: [
        {
          id: 'gg-level1',
          name: 'Nouns & Pronouns',
          description: 'Discover the world of nouns and pronouns in this fun adventure.',
          difficulty: 'easy',
          xpReward: 50,
          isCompleted: true,
          timeEstimate: '15 min'
        },
        {
          id: 'gg-level2',
          name: 'Verbs in Action',
          description: 'Learn about action words and how to use them correctly.',
          difficulty: 'easy',
          xpReward: 75,
          isCompleted: false,
          timeEstimate: '20 min'
        },
        {
          id: 'gg-level3',
          name: 'Building Sentences',
          description: 'Combine different parts of speech to create meaningful sentences.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        }
      ]
    },
    {
      id: 'science-savannah',
      name: 'Science Savannah',
      description: 'Discover plants, animals, and natural phenomena in this wild landscape.',
      icon: <Flask size={24} />,
      color: 'bg-yellow-500',
      position: { top: '60%', left: '35%' },
      status: 'beginner',
      subject: 'science',
      locked: false,
      progress: 30,
      levels: [
        {
          id: 'ss-level1',
          name: 'Animal Kingdom',
          description: 'Learn about different animal groups and their characteristics.',
          difficulty: 'easy',
          xpReward: 50,
          isCompleted: true,
          timeEstimate: '15 min'
        },
        {
          id: 'ss-level2',
          name: 'Plant Life',
          description: 'Discover how plants grow and make their own food.',
          difficulty: 'medium',
          xpReward: 75,
          isCompleted: false,
          timeEstimate: '20 min'
        },
        {
          id: 'ss-level3',
          name: 'Weather Wonders',
          description: 'Explore the fascinating world of weather patterns and climate.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        }
      ]
    },
    {
      id: 'algebra-archipelago',
      name: 'Algebra Archipelago',
      description: 'Navigate through islands of equations and variables in this tropical paradise.',
      icon: <Calculator size={24} />,
      color: 'bg-blue-500',
      position: { top: '30%', left: '30%' },
      status: 'intermediate',
      subject: 'math',
      locked: true,
      requiredZoneId: 'fractions-forest',
      progress: 0,
      levels: [
        {
          id: 'aa-level1',
          name: 'Variables & Constants',
          description: 'Learn the building blocks of algebra.',
          difficulty: 'medium',
          xpReward: 75,
          isCompleted: false,
          timeEstimate: '20 min'
        },
        {
          id: 'aa-level2',
          name: 'Simple Equations',
          description: 'Master the art of solving one-step equations.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        },
        {
          id: 'aa-level3',
          name: 'Equation Challenge',
          description: 'Test your equation-solving skills with these challenging problems.',
          difficulty: 'hard',
          xpReward: 150,
          isCompleted: false,
          timeEstimate: '30 min'
        }
      ]
    },
    {
      id: 'history-highlands',
      name: 'History Highlands',
      description: 'Climb mountains of knowledge about ancient civilizations and important events.',
      icon: <Globe size={24} />,
      color: 'bg-orange-500',
      position: { top: '70%', left: '75%' },
      status: 'intermediate',
      subject: 'social',
      locked: true,
      requiredZoneId: 'grammar-galaxy',
      progress: 0,
      levels: [
        {
          id: 'hh-level1',
          name: 'Ancient Civilizations',
          description: 'Explore the wonders of ancient Egypt, Greece, and Rome.',
          difficulty: 'medium',
          xpReward: 75,
          isCompleted: false,
          timeEstimate: '20 min'
        },
        {
          id: 'hh-level2',
          name: 'Medieval Times',
          description: 'Journey through the Middle Ages and discover castles, knights, and more.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        },
        {
          id: 'hh-level3',
          name: 'Modern History',
          description: 'Learn about important events that shaped our modern world.',
          difficulty: 'hard',
          xpReward: 150,
          isCompleted: false,
          timeEstimate: '30 min'
        }
      ]
    },
    {
      id: 'art-atelier',
      name: 'Art Atelier',
      description: 'Express yourself through drawing, painting, and other creative activities.',
      icon: <Puzzle size={24} />,
      color: 'bg-pink-500',
      position: { top: '50%', left: '55%' },
      status: 'beginner',
      subject: 'arts',
      locked: false,
      progress: 15,
      levels: [
        {
          id: 'aa-level1',
          name: 'Colors & Shapes',
          description: 'Explore the basic elements of art and design.',
          difficulty: 'easy',
          xpReward: 50,
          isCompleted: true,
          timeEstimate: '15 min'
        },
        {
          id: 'aa-level2',
          name: 'Drawing Basics',
          description: 'Learn fundamental drawing techniques and practices.',
          difficulty: 'easy',
          xpReward: 75,
          isCompleted: false,
          timeEstimate: '20 min'
        },
        {
          id: 'aa-level3',
          name: 'Creative Expression',
          description: 'Use your artistic skills to create unique masterpieces.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        }
      ]
    },
    {
      id: 'music-meadow',
      name: 'Music Meadow',
      description: 'Discover rhythm, melody, and harmony in this musical wonderland.',
      icon: <Music size={24} />,
      color: 'bg-indigo-500',
      position: { top: '80%', left: '25%' },
      status: 'intermediate',
      subject: 'arts',
      locked: true,
      requiredZoneId: 'art-atelier',
      progress: 0,
      levels: [
        {
          id: 'mm-level1',
          name: 'Rhythm Basics',
          description: 'Learn about beats, tempo, and patterns in music.',
          difficulty: 'medium',
          xpReward: 75,
          isCompleted: false,
          timeEstimate: '20 min'
        },
        {
          id: 'mm-level2',
          name: 'Melody Magic',
          description: 'Explore the world of melodies and how they create music.',
          difficulty: 'medium',
          xpReward: 100,
          isCompleted: false,
          timeEstimate: '25 min'
        },
        {
          id: 'mm-level3',
          name: 'Musical Challenge',
          description: 'Test your musical knowledge with this fun challenge.',
          difficulty: 'hard',
          xpReward: 150,
          isCompleted: false,
          timeEstimate: '30 min'
        }
      ]
    },
    {
      id: 'weekly-challenge',
      name: 'Weekly Challenge',
      description: 'Special limited-time challenges that test your skills across all subjects.',
      icon: <Zap size={24} />,
      color: 'bg-red-500',
      position: { top: '40%', left: '80%' },
      status: 'advanced',
      subject: 'math',
      locked: false,
      progress: 0,
      levels: [
        {
          id: 'wc-current',
          name: 'Math Mystery Challenge',
          description: 'Solve a series of math puzzles to unlock a special reward!',
          difficulty: 'hard',
          xpReward: 200,
          isCompleted: false,
          timeEstimate: '40 min'
        }
      ]
    }
  ];
  
  useEffect(() => {
    // Set a default buddy tip
    setBuddyTip("Click on any zone to start your learning adventure!");
  }, []);
  
  const handleZoneClick = (zone: KingdomZone) => {
    setSelectedZone(zone);
    setDialogOpen(true);
    
    if (zone.locked) {
      const requiredZone = zones.find(z => z.id === zone.requiredZoneId);
      setBuddyTip(`Complete ${requiredZone?.name || 'previous zones'} first to unlock this zone!`);
      
      toast({
        title: "Zone Locked",
        description: `Complete ${requiredZone?.name || 'required zones'} to unlock ${zone.name}!`,
        variant: "default",
      });
    } else {
      setBuddyTip(`${zone.name} has ${zone.levels.length} fun activities to explore!`);
    }
  };
  
  const handleLevelSelect = (level: ZoneLevel) => {
    setSelectedLevel(level);
    setLevelDialogOpen(true);
  };
  
  const handleStartLevel = () => {
    if (!selectedLevel) return;
    
    toast({
      title: "Level Started!",
      description: `You're now playing ${selectedLevel.name}. Have fun!`,
      variant: "default",
    });
    
    setLevelDialogOpen(false);
  };
  
  const getCompletedLevelsCount = (zone: KingdomZone) => {
    return zone.levels.filter(level => level.isCompleted).length;
  };
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Hard</Badge>;
      default:
        return null;
    }
  };
  
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math':
        return <Calculator className="h-5 w-5" />;
      case 'language':
        return <BookOpen className="h-5 w-5" />;
      case 'science':
        return <Flask className="h-5 w-5" />;
      case 'arts':
        return <Puzzle className="h-5 w-5" />;
      case 'social':
        return <Globe className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'beginner':
        return <Badge variant="secondary">Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="outline">Intermediate</Badge>;
      case 'advanced':
        return <Badge>Advanced</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Kingdom Learning Map</h2>
          <p className="text-gray-500">Explore different zones and master new skills!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-bold">450 XP</span>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-500" />
            <span className="font-bold">Level 4</span>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-[600px] rounded-3xl bg-blue-50 overflow-hidden shadow-xl">
        {/* Map background with grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAzMzA4IiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]">
          {/* Map decoration elements */}
          <div className="absolute top-[15%] left-[45%] w-16 h-16 bg-blue-200 rounded-full opacity-50 transform rotate-45"></div>
          <div className="absolute top-[65%] left-[25%] w-24 h-8 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-[45%] left-[85%] w-8 h-24 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-[85%] left-[50%] w-32 h-10 bg-blue-200 rounded-full opacity-50"></div>
          
          {/* Zone connections (paths) */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Beginner zones connections */}
            <path d="M 145,130 L 280,160" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 280,160 L 330,310" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 330,310 L 620,370" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 145,130 L 330,310" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 620,180 L 330,310" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            
            {/* Intermediate zones connections */}
            <path d="M 145,130 L 280,180" stroke="#9CA3AF" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 620,180 L 720,380" stroke="#9CA3AF" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 330,310 L 250,480" stroke="#9CA3AF" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            
            {/* Weekly challenge connection */}
            <path d="M 620,180 L 750,220" stroke="#F87171" strokeWidth="6" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>
          
          {/* Zone markers */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className={cn(
                "absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110",
                zone.locked ? 'opacity-60' : '',
                zone.color,
                zone.id === 'weekly-challenge' ? 'animate-pulse' : '',
                !zone.locked && 'shadow-lg'
              )}
              style={{
                top: zone.position.top,
                left: zone.position.left,
              }}
              onClick={() => handleZoneClick(zone)}
            >
              <div className="relative">
                {/* Zone progress indicator */}
                {zone.progress > 0 && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      strokeWidth="4"
                      stroke="rgba(255, 255, 255, 0.5)"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28 * (zone.progress / 100)} ${2 * Math.PI * 28}`}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                
                <div className="absolute -top-3 -right-3">
                  {zone.locked ? (
                    <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs">
                      <Lock size={12} />
                    </span>
                  ) : (
                    <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs">
                      {getSubjectIcon(zone.subject)}
                    </span>
                  )}
                </div>
                <div className="text-white text-xs font-bold">{zone.name.split(' ')[0]}</div>
              </div>
            </div>
          ))}
          
          {/* Buddy Bot helper */}
          <div className="absolute bottom-5 right-5">
            <div className="flex items-end">
              <div className="mr-3 bg-white p-3 rounded-lg shadow-md max-w-xs opacity-90">
                <p className="text-sm">{buddyTip}</p>
              </div>
              <BuddyBot size="md" expression="happy" animated={true} />
            </div>
          </div>
        </div>
        
        {/* Selected zone info overlay */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent className="max-w-3xl">
            {selectedZone && (
              <>
                <AlertDialogHeader>
                  <div className="flex items-center">
                    <div 
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4",
                        selectedZone.color
                      )}
                    >
                      {selectedZone.icon}
                    </div>
                    <div>
                      <AlertDialogTitle className="text-xl flex items-center gap-2">
                        {selectedZone.name}
                        {getStatusBadge(selectedZone.status)}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-base mt-1">
                        {selectedZone.description}
                      </AlertDialogDescription>
                    </div>
                  </div>
                </AlertDialogHeader>
                
                <div className="py-4">
                  {/* Zone progress overview */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Zone Progress:</span>
                      <span className="text-sm font-medium">
                        {getCompletedLevelsCount(selectedZone)}/{selectedZone.levels.length} Levels Completed
                      </span>
                    </div>
                    <Progress value={selectedZone.progress} className="h-2" />
                  </div>
                  
                  {selectedZone.locked ? (
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <Lock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Zone Locked</h3>
                      <p className="text-gray-500 mb-4">
                        Complete {zones.find(z => z.id === selectedZone.requiredZoneId)?.name || 'previous zones'} to unlock this zone!
                      </p>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Got it
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="font-medium">Available Levels</h3>
                      {selectedZone.levels.map((level, index) => (
                        <div
                          key={level.id}
                          className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50",
                            level.isCompleted ? "border-green-200 bg-green-50" : "border-gray-200"
                          )}
                          onClick={() => handleLevelSelect(level)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold",
                                level.isCompleted ? "bg-green-500" : selectedZone.color
                              )}>
                                {level.isCompleted ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  index + 1
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{level.name}</div>
                                <div className="text-sm text-gray-500">{level.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getDifficultyBadge(level.difficulty)}
                              <div className="text-xs text-gray-500">{level.timeEstimate}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
        
        {/* Level details dialog */}
        <AlertDialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen}>
          <AlertDialogContent>
            {selectedLevel && (
              <>
                <AlertDialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {getDifficultyBadge(selectedLevel.difficulty)}
                    <span className="text-xs text-gray-500">{selectedLevel.timeEstimate}</span>
                  </div>
                  <AlertDialogTitle>{selectedLevel.name}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {selectedLevel.description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="py-4">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">Rewards</span>
                      </div>
                      <span className="font-bold text-lovable-purple">+{selectedLevel.xpReward} XP</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BuddyBot size="sm" expression="excited" />
                    <p>Ready to start this adventure? I'll guide you through it!</p>
                  </div>
                </div>
                
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleStartLevel}>
                    {selectedLevel.isCompleted ? 'Replay Level' : 'Start Level'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      {/* Achievement summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-lovable-purple/10 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-lovable-purple" />
            </div>
            <div>
              <h3 className="font-medium">Total Progress</h3>
              <p className="text-2xl font-bold">35%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-lovable-green/10 p-3 rounded-full">
              <Star className="h-6 w-6 text-lovable-green" />
            </div>
            <div>
              <h3 className="font-medium">Levels Completed</h3>
              <p className="text-2xl font-bold">5/24</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-lovable-blue/10 p-3 rounded-full">
              <Zap className="h-6 w-6 text-lovable-blue" />
            </div>
            <div>
              <h3 className="font-medium">Weekly Challenges</h3>
              <p className="text-2xl font-bold">1 Available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KingdomMap;
