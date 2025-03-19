
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
  Beaker,
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
  const [levelContentOpen, setLevelContentOpen] = useState(false);
  const [buddyTip, setBuddyTip] = useState("");
  const [earnedXp, setEarnedXp] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  
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
      icon: <Beaker size={24} />,
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
    
    setLevelDialogOpen(false);
    // Show level content after a short delay
    setTimeout(() => {
      setLevelContentOpen(true);
    }, 300);
  };
  
  const handleCompleteLevelSuccess = () => {
    if (!selectedLevel || !selectedZone) return;
    
    const xpEarned = selectedLevel.xpReward;
    setEarnedXp(xpEarned);
    setShowXpAnimation(true);
    
    // Update the level's completion status
    const updatedZones = zones.map(zone => {
      if (zone.id === selectedZone.id) {
        const updatedLevels = zone.levels.map(level => {
          if (level.id === selectedLevel.id) {
            return { ...level, isCompleted: true };
          }
          return level;
        });
        
        // Calculate new progress
        const completedCount = updatedLevels.filter(l => l.isCompleted).length;
        const newProgress = Math.round((completedCount / updatedLevels.length) * 100);
        
        return { 
          ...zone, 
          levels: updatedLevels,
          progress: newProgress 
        };
      }
      return zone;
    });
    
    // This would normally update state, but for this demo we'll just show a success message
    toast({
      title: "Level Completed!",
      description: `You earned ${xpEarned} XP and unlocked new content!`,
      variant: "default",
    });
    
    setLevelContentOpen(false);
    
    // Hide XP animation after a delay
    setTimeout(() => {
      setShowXpAnimation(false);
    }, 3000);
  };
  
  const handleCompleteLevelFailure = () => {
    toast({
      title: "Keep Trying!",
      description: "You didn't pass this time, but you're getting better!",
      variant: "default",
    });
    
    setLevelContentOpen(false);
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
        return <Beaker className="h-5 w-5" />;
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
  
  // Function to render level content based on selectedLevel
  const renderLevelContent = () => {
    if (!selectedLevel || !selectedZone) return null;
    
    return (
      <AlertDialog open={levelContentOpen} onOpenChange={setLevelContentOpen}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              {getDifficultyBadge(selectedLevel.difficulty)}
              <AlertDialogTitle>{selectedLevel.name}</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {selectedZone.subject === 'math' && (
                <div className="text-base">Let's solve some math problems!</div>
              )}
              {selectedZone.subject === 'language' && (
                <div className="text-base">Let's practice our language skills!</div>
              )}
              {selectedZone.subject === 'science' && (
                <div className="text-base">Let's discover some scientific concepts!</div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              {/* Dynamic content based on subject */}
              {selectedZone.subject === 'math' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Problem 1 of 3</h3>
                  
                  <div className="p-4 bg-white rounded-lg border shadow-sm">
                    <p className="mb-4">If a pizza is cut into 8 equal slices and you eat 3 slices, what fraction of the pizza did you eat?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>1/3</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>3/5</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelSuccess}>3/8</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>5/8</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Progress value={33.3} className="h-2 flex-1" />
                    <span className="ml-2 text-sm text-gray-500">1/3</span>
                  </div>
                </div>
              )}
              
              {selectedZone.subject === 'language' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Grammar Exercise 1 of 3</h3>
                  
                  <div className="p-4 bg-white rounded-lg border shadow-sm">
                    <p className="mb-4">Select the correct pronoun to complete the sentence:</p>
                    <p className="italic mb-4 text-lg">"______ went to the store to buy groceries."</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelSuccess}>He</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Him</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>His</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Himself</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Progress value={33.3} className="h-2 flex-1" />
                    <span className="ml-2 text-sm text-gray-500">1/3</span>
                  </div>
                </div>
              )}
              
              {selectedZone.subject === 'science' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Science Question 1 of 3</h3>
                  
                  <div className="p-4 bg-white rounded-lg border shadow-sm">
                    <p className="mb-4">What do plants need to make their own food?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Water only</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Soil only</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Air only</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelSuccess}>Sunlight, water, and air</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Progress value={33.3} className="h-2 flex-1" />
                    <span className="ml-2 text-sm text-gray-500">1/3</span>
                  </div>
                </div>
              )}
              
              {selectedZone.subject === 'arts' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Art Exercise 1 of 3</h3>
                  
                  <div className="p-4 bg-white rounded-lg border shadow-sm">
                    <p className="mb-4">Which of these is a primary color?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Green</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Orange</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelSuccess}>Blue</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Purple</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Progress value={33.3} className="h-2 flex-1" />
                    <span className="ml-2 text-sm text-gray-500">1/3</span>
                  </div>
                </div>
              )}
              
              {selectedZone.subject === 'social' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">History Question 1 of 3</h3>
                  
                  <div className="p-4 bg-white rounded-lg border shadow-sm">
                    <p className="mb-4">Which ancient civilization built the pyramids?</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Romans</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelSuccess}>Egyptians</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Greeks</Button>
                      <Button variant="outline" className="py-6" onClick={handleCompleteLevelFailure}>Chinese</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Progress value={33.3} className="h-2 flex-1" />
                    <span className="ml-2 text-sm text-gray-500">1/3</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BuddyBot size="sm" expression="happy" />
                <p className="text-sm">Need a hint? Just ask me!</p>
              </div>
              
              <Button variant="outline" onClick={handleCompleteLevelFailure}>
                Skip for now
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
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
          
          {/* Zone Dialog */}
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent className="max-w-3xl">
              {selectedZone && (
                <>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", selectedZone.color)}>
                        {selectedZone.icon}
                      </div>
                      <AlertDialogTitle className="text-2xl">{selectedZone.name}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base space-y-2">
                      <p>{selectedZone.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getSubjectIcon(selectedZone.subject)}
                        <span className="capitalize">{selectedZone.subject}</span>
                        <span className="mx-2">•</span>
                        {getStatusBadge(selectedZone.status)}
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  {!selectedZone.locked ? (
                    <div className="py-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Progress</h3>
                        <span className="text-sm text-gray-500">
                          {getCompletedLevelsCount(selectedZone)}/{selectedZone.levels.length} activities completed
                        </span>
                      </div>
                      <Progress
                        value={selectedZone.progress}
                        className="h-2 mb-6"
                      />
                      
                      <div className="space-y-4">
                        {selectedZone.levels.map((level) => (
                          <Card
                            key={level.id}
                            className={cn(
                              "border transition-all",
                              level.isCompleted ? "bg-gray-50 border-green-100" : "hover:border-blue-200"
                            )}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    {level.isCompleted && (
                                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="h-3 w-3 text-green-600" />
                                      </div>
                                    )}
                                    <h4 className="font-bold">{level.name}</h4>
                                    {getDifficultyBadge(level.difficulty)}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{level.description}</p>
                                  <div className="flex items-center text-xs text-gray-500 gap-2">
                                    <Clock className="h-3 w-3" />
                                    <span>{level.timeEstimate}</span>
                                    <Star className="h-3 w-3 text-yellow-500 ml-2" />
                                    <span>+{level.xpReward} XP</span>
                                  </div>
                                </div>
                                <Button
                                  variant={level.isCompleted ? "outline" : "default"}
                                  size="sm"
                                  className="ml-4 flex-shrink-0"
                                  onClick={() => handleLevelSelect(level)}
                                >
                                  {level.isCompleted ? "Review" : "Start"}
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="bg-orange-50 rounded-lg p-6 text-center">
                        <Lock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Zone Locked</h3>
                        <p className="text-gray-600 mb-4">
                          {selectedZone.requiredZoneId && (
                            <>
                              Complete{" "}
                              <span className="font-semibold">
                                {zones.find(z => z.id === selectedZone.requiredZoneId)?.name}
                              </span>{" "}
                              first to unlock this zone!
                            </>
                          )}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (selectedZone.requiredZoneId) {
                              const requiredZone = zones.find(
                                (z) => z.id === selectedZone.requiredZoneId
                              );
                              if (requiredZone) {
                                setSelectedZone(requiredZone);
                              }
                            }
                          }}
                        >
                          Go to Required Zone
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <AlertDialogFooter className="flex items-center justify-between gap-4 sm:justify-between">
                    <div className="flex items-center gap-2">
                      <BuddyBot size="sm" expression="happy" />
                      <p className="text-sm">{buddyTip}</p>
                    </div>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </>
              )}
            </AlertDialogContent>
          </AlertDialog>
          
          {/* Level Dialog */}
          <AlertDialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen}>
            <AlertDialogContent>
              {selectedLevel && (
                <>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                      {getDifficultyBadge(selectedLevel.difficulty)}
                      <AlertDialogTitle>{selectedLevel.name}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                      <p>{selectedLevel.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Estimated time: {selectedLevel.timeEstimate}</span>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  <div className="py-4">
                    <div className="bg-blue-50 rounded-lg p-6 mb-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-500 text-white rounded-full p-3">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Rewards</h3>
                          <p className="text-gray-600 mb-3">Complete this activity to earn:</p>
                          <div className="flex items-center gap-3">
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              <span className="font-bold">{selectedLevel.xpReward} XP</span>
                            </div>
                            {selectedLevel.difficulty === 'medium' && (
                              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                <span className="font-bold">Achievement</span>
                              </div>
                            )}
                            {selectedLevel.difficulty === 'hard' && (
                              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
                                <Zap className="h-4 w-4" />
                                <span className="font-bold">Special Badge</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleStartLevel}>Start Activity</AlertDialogAction>
                  </AlertDialogFooter>
                </>
              )}
            </AlertDialogContent>
          </AlertDialog>
          
          {/* Level content */}
          {renderLevelContent()}
          
          {/* XP earned animation */}
          {showXpAnimation && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-yellow-500 text-white px-6 py-4 rounded-full flex items-center gap-2 animate-bounce shadow-xl">
                <Star className="h-6 w-6" />
                <span className="text-xl font-bold">+{earnedXp} XP</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add missing components
const CheckCircle = (props: React.ComponentProps<typeof Star>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

const Clock = (props: React.ComponentProps<typeof Star>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
};

export default KingdomMap;
