
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
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
    desktop: { top: string; left: string; };
    mobile: { top: string; left: string; };
  };
  status: 'beginner' | 'intermediate' | 'advanced';
  subject: 'math' | 'science' | 'language' | 'arts' | 'social';
  locked: boolean;
  progress: number;
  levels: ZoneLevel[];
  requiredZoneId?: string;
}

interface KingdomMapProps {
  selectedZone?: string | null;
  onZoneSelect?: (zoneId: string) => void;
  demoMode?: boolean;
}

const KingdomMap: React.FC<KingdomMapProps> = ({ 
  selectedZone: propSelectedZone,
  onZoneSelect,
  demoMode = false 
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
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
      position: {
        desktop: { top: '20%', left: '15%' },
        mobile: { top: '15%', left: '25%' }
      },
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
      position: {
        desktop: { top: '35%', left: '65%' },
        mobile: { top: '30%', left: '65%' }
      },
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
      position: {
        desktop: { top: '60%', left: '35%' },
        mobile: { top: '45%', left: '25%' }
      },
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
      position: {
        desktop: { top: '30%', left: '30%' },
        mobile: { top: '30%', left: '10%' }
      },
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
      position: {
        desktop: { top: '70%', left: '75%' },
        mobile: { top: '60%', left: '70%' }
      },
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
      position: {
        desktop: { top: '50%', left: '55%' },
        mobile: { top: '45%', left: '65%' }
      },
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
      position: {
        desktop: { top: '80%', left: '25%' },
        mobile: { top: '75%', left: '20%' }
      },
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
      position: {
        desktop: { top: '40%', left: '80%' },
        mobile: { top: '75%', left: '65%' }
      },
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

  const zonePaths = [
    { from: 'fractions-forest', to: 'algebra-archipelago', locked: true },
    { from: 'fractions-forest', to: 'grammar-galaxy', locked: false },
    { from: 'grammar-galaxy', to: 'history-highlands', locked: true },
    { from: 'grammar-galaxy', to: 'art-atelier', locked: false },
    { from: 'science-savannah', to: 'fractions-forest', locked: false },
    { from: 'science-savannah', to: 'art-atelier', locked: false },
    { from: 'art-atelier', to: 'music-meadow', locked: true },
    { from: 'grammar-galaxy', to: 'weekly-challenge', locked: false },
  ];
  
  useEffect(() => {
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
    setTimeout(() => {
      setLevelContentOpen(true);
    }, 300);
  };
  
  const handleCompleteLevelSuccess = () => {
    if (!selectedLevel || !selectedZone) return;
    
    const xpEarned = selectedLevel.xpReward;
    setEarnedXp(xpEarned);
    setShowXpAnimation(true);
    
    const updatedZones = zones.map(zone => {
      if (zone.id === selectedZone.id) {
        const updatedLevels = zone.levels.map(level => {
          if (level.id === selectedLevel.id) {
            return { ...level, isCompleted: true };
          }
          return level;
        });
        
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
    
    toast({
      title: "Level Completed!",
      description: `You earned ${xpEarned} XP and unlocked new content!`,
      variant: "default",
    });
    
    setLevelContentOpen(false);
    
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

  const renderPathConnections = () => {
    return zonePaths.map((path, index) => {
      const fromZone = zones.find(z => z.id === path.from);
      const toZone = zones.find(z => z.id === path.to);
      
      if (!fromZone || !toZone) return null;
      
      const fromPos = isMobile ? fromZone.position.mobile : fromZone.position.desktop;
      const toPos = isMobile ? toZone.position.mobile : toZone.position.desktop;
      
      const fromX = parseInt(fromPos.left);
      const fromY = parseInt(fromPos.top);
      const toX = parseInt(toPos.left);
      const toY = parseInt(toPos.top);
      
      const circleSize = isMobile ? 24 : 32;
      
      return (
        <path
          key={`path-${index}`}
          d={`M ${fromX}% ${fromY}% L ${toX}% ${toY}%`}
          stroke={path.locked ? "#9CA3AF" : "#60A5FA"} 
          strokeWidth="4"
          strokeDasharray={path.locked ? "6,8" : "8,12"}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      );
    });
  };
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Kingdom Learning Map</h2>
          <p className="text-gray-500">Explore different zones and master new skills!</p>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm flex items-center gap-2">
            <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
            <span className="font-bold text-sm md:text-base">450 XP</span>
          </div>
          <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm flex items-center gap-2">
            <Trophy className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />
            <span className="font-bold text-sm md:text-base">Level 4</span>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl bg-blue-50 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAzMzA4IiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]">
          <div className="absolute top-[15%] left-[45%] w-12 h-12 md:w-16 md:h-16 bg-blue-200 rounded-full opacity-50 transform rotate-45"></div>
          <div className="absolute top-[65%] left-[25%] w-16 h-6 md:w-24 md:h-8 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-[45%] left-[85%] w-6 h-16 md:w-8 md:h-24 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-[85%] left-[50%] w-24 h-8 md:w-32 md:h-10 bg-blue-200 rounded-full opacity-50"></div>
          
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {renderPathConnections()}
          </svg>
          
          {zones.map((zone) => (
            <div
              key={zone.id}
              className={cn(
                "absolute rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110",
                zone.locked ? 'opacity-70' : '',
                zone.color,
                zone.id === 'weekly-challenge' ? 'animate-pulse' : '',
                !zone.locked && 'shadow-lg',
                isMobile ? 'w-16 h-16' : 'w-24 h-24'
              )}
              style={{
                top: isMobile ? zone.position.mobile.top : zone.position.desktop.top,
                left: isMobile ? zone.position.mobile.left : zone.position.desktop.left,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleZoneClick(zone)}
            >
              <div className="flex flex-col items-center">
                <div className="text-white">
                  {zone.icon}
                </div>
                <div className="text-white text-xs mt-1 font-bold">
                  {zone.locked && <Lock size={16} className="mx-auto" />}
                </div>
              </div>
              <div className={`absolute -bottom-8 text-center w-32 text-sm font-semibold ${!zone.locked ? 'text-gray-800' : 'text-gray-500'}`}>
                {zone.name}
              </div>
              {zone.progress > 0 && (
                <div className="absolute -bottom-12 w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${zone.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="md:max-w-2xl">
          {selectedZone && (
            <>
              <AlertDialogHeader>
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full ${selectedZone.color} text-white`}>
                    {selectedZone.icon}
                  </span>
                  <AlertDialogTitle className="text-2xl">{selectedZone.name}</AlertDialogTitle>
                  {getStatusBadge(selectedZone.status)}
                </div>
                <AlertDialogDescription className="text-base">
                  {selectedZone.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getSubjectIcon(selectedZone.subject)}
                    <span className="font-medium capitalize">{selectedZone.subject} Zone</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Progress:</span>
                    <Progress value={selectedZone.progress} className="w-24 h-2" />
                    <span className="text-sm font-medium">{selectedZone.progress}%</span>
                  </div>
                </div>
                
                {selectedZone.locked ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-1">Zone Locked</h4>
                        <p className="text-amber-700 text-sm">
                          {selectedZone.requiredZoneId && (
                            <>Complete <span className="font-semibold">{zones.find(z => z.id === selectedZone.requiredZoneId)?.name}</span> first to unlock this zone!</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Lessons ({getCompletedLevelsCount(selectedZone)}/{selectedZone.levels.length} completed)</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {selectedZone.levels.map((level) => (
                        <Card key={level.id} className={`${level.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50 cursor-pointer'}`} onClick={() => handleLevelSelect(level)}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${level.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                                  {level.isCompleted ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  ) : (
                                    <span className="text-xs font-semibold">{level.id.split('-')[1].replace('level', '')}</span>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{level.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                                  
                                  <div className="flex items-center gap-2 mt-2">
                                    {getDifficultyBadge(level.difficulty)}
                                    <div className="flex items-center text-gray-500 text-xs">
                                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                      {level.timeEstimate}
                                    </div>
                                    <div className="flex items-center text-yellow-500 text-xs">
                                      <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                      </svg>
                                      {level.xpReward} XP
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mt-6">
                  <BuddyBot size="sm" expression="happy" />
                  <p className="text-sm text-gray-500">{buddyTip}</p>
                </div>
              </div>
              
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                {!selectedZone.locked && getCompletedLevelsCount(selectedZone) < selectedZone.levels.length && (
                  <Button>Continue Learning</Button>
                )}
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen}>
        <AlertDialogContent>
          {selectedZone && selectedLevel && (
            <>
              <AlertDialogHeader>
                <div className="flex items-center gap-2">
                  {getDifficultyBadge(selectedLevel.difficulty)}
                  <AlertDialogTitle>{selectedLevel.name}</AlertDialogTitle>
                </div>
                <AlertDialogDescription className="text-base">
                  {selectedLevel.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <div className="py-4">
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {selectedLevel.timeEstimate}
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {selectedLevel.xpReward} XP Reward
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Tip</h4>
                      <p className="text-blue-700 text-sm">
                        This level includes interactive exercises. Give your best effort - you can always try again if needed!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-4">
                  <BuddyBot size="sm" expression="excited" />
                  <p className="text-sm text-gray-500">I'll help you through this challenge!</p>
                </div>
              </div>
              
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={handleStartLevel}>Start Level</Button>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      
      {renderLevelContent()}
      
      {showXpAnimation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-yellow-500 text-white px-6 py-3 rounded-full text-xl font-bold animate-bounce shadow-xl">
            +{earnedXp} XP
          </div>
        </div>
      )}
    </div>
  );
};

export default KingdomMap;
