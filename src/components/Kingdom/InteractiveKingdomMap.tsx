
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import BuddyBot from '@/components/Buddy/BuddyBot';
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
  Star,
  Check,
  Clock,
  Castle,
  Trees
} from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'game' | 'story' | 'exercise';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  timeEstimate: string;
  completed: boolean;
  questions?: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Zone {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: {
    top: string;
    left: string;
  };
  level: number;
  status: 'beginner' | 'intermediate' | 'advanced';
  subject: 'math' | 'science' | 'language' | 'arts' | 'social';
  locked: boolean;
  requiredZoneId?: string;
  activities: Activity[];
  completionPercentage: number;
  animationClass?: string;
}

const InteractiveKingdomMap: React.FC = () => {
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Explorer",
    level: 3,
    xp: 450,
    totalXp: 500,
    completedZones: 0,
    totalZones: 0,
    achievements: [],
    inventory: []
  });
  
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [zoneDialogOpen, setZoneDialogOpen] = useState(false);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [activityContentOpen, setActivityContentOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [buddyTip, setBuddyTip] = useState("Click on any zone to start your learning adventure!");
  const [mapZoom, setMapZoom] = useState(100);
  const [activePathways, setActivePathways] = useState<string[]>([]);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const mapPosition = useRef({ x: 0, y: 0 });

  // Initialize zones
  useEffect(() => {
    const initialZones: Zone[] = [
      {
        id: 'fractions-forest',
        name: 'Fractions Forest',
        description: 'Master fractions and decimals in this magical woodland filled with math puzzles.',
        icon: <Calculator size={24} />,
        color: 'bg-green-500',
        position: { top: '20%', left: '15%' },
        level: 2,
        status: 'beginner',
        subject: 'math',
        locked: false,
        completionPercentage: 65,
        activities: [
          {
            id: 'ff-activity1',
            title: 'Understanding Fractions',
            description: 'Learn what fractions are and how to identify them in the real world.',
            type: 'quiz',
            difficulty: 'easy',
            xpReward: 50,
            timeEstimate: '15 min',
            completed: true,
            questions: []
          },
          {
            id: 'ff-activity2',
            title: 'Comparing Fractions',
            description: 'Learn how to compare fractions with different denominators.',
            type: 'quiz',
            difficulty: 'easy',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: true,
            questions: []
          },
          {
            id: 'ff-activity3',
            title: 'Adding Fractions',
            description: 'Master the art of adding fractions with the same denominators.',
            type: 'quiz',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: [
              {
                id: 'ff3-q1',
                question: 'What is 1/4 + 2/4?',
                options: ['1/8', '3/4', '3/8', '2/4'],
                correctAnswer: 1,
                explanation: '1/4 + 2/4 = 3/4 because we add the numerators (1+2=3) while keeping the denominator (4) the same.'
              },
              {
                id: 'ff3-q2',
                question: 'What is 2/5 + 1/5?',
                options: ['3/5', '3/10', '2/5', '1/5'],
                correctAnswer: 0,
                explanation: '2/5 + 1/5 = 3/5 because we add the numerators (2+1=3) while keeping the denominator (5) the same.'
              },
              {
                id: 'ff3-q3',
                question: 'What is 3/8 + 2/8?',
                options: ['5/8', '5/16', '6/8', '1/4'],
                correctAnswer: 0,
                explanation: '3/8 + 2/8 = 5/8 because we add the numerators (3+2=5) while keeping the denominator (8) the same.'
              }
            ]
          },
          {
            id: 'ff-activity4',
            title: 'Fraction Challenge',
            description: 'Test your fraction skills with this challenging puzzle.',
            type: 'game',
            difficulty: 'hard',
            xpReward: 150,
            timeEstimate: '30 min',
            completed: false,
            questions: []
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
        level: 1,
        status: 'beginner',
        subject: 'language',
        locked: false,
        completionPercentage: 40,
        activities: [
          {
            id: 'gg-activity1',
            title: 'Nouns & Pronouns',
            description: 'Discover the world of nouns and pronouns in this fun adventure.',
            type: 'quiz',
            difficulty: 'easy',
            xpReward: 50,
            timeEstimate: '15 min',
            completed: true,
            questions: []
          },
          {
            id: 'gg-activity2',
            title: 'Verbs in Action',
            description: 'Learn about action words and how to use them correctly.',
            type: 'quiz',
            difficulty: 'easy',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: false,
            questions: [
              {
                id: 'gg2-q1',
                question: 'Which word is a verb?',
                options: ['Tree', 'Run', 'Happy', 'Blue'],
                correctAnswer: 1,
                explanation: '"Run" is a verb because it shows action - something someone can do.'
              },
              {
                id: 'gg2-q2',
                question: 'In the sentence "The cat sleeps on the bed," what is the verb?',
                options: ['Cat', 'The', 'Sleeps', 'Bed'],
                correctAnswer: 2,
                explanation: '"Sleeps" is the verb because it shows what the cat is doing.'
              },
              {
                id: 'gg2-q3',
                question: 'Which sentence uses a verb correctly?',
                options: ['She beautiful.', 'They happy today.', 'He runs fast.', 'The book red.'],
                correctAnswer: 2,
                explanation: '"He runs fast" uses the verb "runs" correctly to show what he is doing.'
              }
            ]
          },
          {
            id: 'gg-activity3',
            title: 'Building Sentences',
            description: 'Combine different parts of speech to create meaningful sentences.',
            type: 'exercise',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: []
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
        level: 1,
        status: 'beginner',
        subject: 'science',
        locked: false,
        completionPercentage: 30,
        activities: [
          {
            id: 'ss-activity1',
            title: 'Animal Kingdom',
            description: 'Learn about different animal groups and their characteristics.',
            type: 'quiz',
            difficulty: 'easy',
            xpReward: 50,
            timeEstimate: '15 min',
            completed: true,
            questions: []
          },
          {
            id: 'ss-activity2',
            title: 'Plant Life',
            description: 'Discover how plants grow and make their own food.',
            type: 'quiz',
            difficulty: 'medium',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: false,
            questions: [
              {
                id: 'ss2-q1',
                question: 'What do plants need to make their own food?',
                options: ['Only water', 'Only sunlight', 'Sunlight, water, and air', 'Only soil'],
                correctAnswer: 2,
                explanation: 'Plants need sunlight, water, and carbon dioxide from the air to make their own food through photosynthesis.'
              },
              {
                id: 'ss2-q2',
                question: 'Which part of the plant absorbs water from the soil?',
                options: ['Leaves', 'Stems', 'Flowers', 'Roots'],
                correctAnswer: 3,
                explanation: 'Roots absorb water and nutrients from the soil to help the plant grow.'
              },
              {
                id: 'ss2-q3',
                question: 'What is the process called when plants make their own food?',
                options: ['Respiration', 'Photosynthesis', 'Digestion', 'Absorption'],
                correctAnswer: 1,
                explanation: 'Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create glucose (sugar) and oxygen.'
              }
            ]
          },
          {
            id: 'ss-activity3',
            title: 'Weather Wonders',
            description: 'Explore the fascinating world of weather patterns and climate.',
            type: 'story',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: []
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
        level: 3,
        status: 'intermediate',
        subject: 'math',
        locked: true,
        requiredZoneId: 'fractions-forest',
        completionPercentage: 0,
        activities: [
          {
            id: 'aa-activity1',
            title: 'Variables & Constants',
            description: 'Learn the building blocks of algebra.',
            type: 'quiz',
            difficulty: 'medium',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: false,
            questions: []
          },
          {
            id: 'aa-activity2',
            title: 'Simple Equations',
            description: 'Master the art of solving one-step equations.',
            type: 'exercise',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: []
          },
          {
            id: 'aa-activity3',
            title: 'Equation Challenge',
            description: 'Test your equation-solving skills with these challenging problems.',
            type: 'game',
            difficulty: 'hard',
            xpReward: 150,
            timeEstimate: '30 min',
            completed: false,
            questions: []
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
        level: 3,
        status: 'intermediate',
        subject: 'social',
        locked: true,
        requiredZoneId: 'grammar-galaxy',
        completionPercentage: 0,
        activities: [
          {
            id: 'hh-activity1',
            title: 'Ancient Civilizations',
            description: 'Explore the wonders of ancient Egypt, Greece, and Rome.',
            type: 'story',
            difficulty: 'medium',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: false,
            questions: []
          },
          {
            id: 'hh-activity2',
            title: 'Medieval Times',
            description: 'Journey through the Middle Ages and discover castles, knights, and more.',
            type: 'quiz',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: []
          },
          {
            id: 'hh-activity3',
            title: 'Modern History',
            description: 'Learn about important events that shaped our modern world.',
            type: 'exercise',
            difficulty: 'hard',
            xpReward: 150,
            timeEstimate: '30 min',
            completed: false,
            questions: []
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
        level: 1,
        status: 'beginner',
        subject: 'arts',
        locked: false,
        completionPercentage: 15,
        activities: [
          {
            id: 'aa-activity1',
            title: 'Colors & Shapes',
            description: 'Explore the basic elements of art and design.',
            type: 'exercise',
            difficulty: 'easy',
            xpReward: 50,
            timeEstimate: '15 min',
            completed: true,
            questions: []
          },
          {
            id: 'aa-activity2',
            title: 'Drawing Basics',
            description: 'Learn fundamental drawing techniques and practices.',
            type: 'exercise',
            difficulty: 'easy',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: false,
            questions: []
          },
          {
            id: 'aa-activity3',
            title: 'Creative Expression',
            description: 'Use your artistic skills to create unique masterpieces.',
            type: 'game',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: []
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
        level: 2,
        status: 'intermediate',
        subject: 'arts',
        locked: true,
        requiredZoneId: 'art-atelier',
        completionPercentage: 0,
        activities: [
          {
            id: 'mm-activity1',
            title: 'Rhythm Basics',
            description: 'Learn about beats, tempo, and patterns in music.',
            type: 'exercise',
            difficulty: 'medium',
            xpReward: 75,
            timeEstimate: '20 min',
            completed: false,
            questions: []
          },
          {
            id: 'mm-activity2',
            title: 'Melody Magic',
            description: 'Explore the world of melodies and how they create music.',
            type: 'quiz',
            difficulty: 'medium',
            xpReward: 100,
            timeEstimate: '25 min',
            completed: false,
            questions: []
          },
          {
            id: 'mm-activity3',
            title: 'Musical Challenge',
            description: 'Test your musical knowledge with this fun challenge.',
            type: 'game',
            difficulty: 'hard',
            xpReward: 150,
            timeEstimate: '30 min',
            completed: false,
            questions: []
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
        level: 5,
        status: 'advanced',
        subject: 'math',
        locked: false,
        completionPercentage: 0,
        animationClass: 'animate-pulse',
        activities: [
          {
            id: 'wc-current',
            title: 'Math Mystery Challenge',
            description: 'Solve a series of math puzzles to unlock a special reward!',
            type: 'game',
            difficulty: 'hard',
            xpReward: 200,
            timeEstimate: '40 min',
            completed: false,
            questions: []
          }
        ]
      },
      {
        id: 'royal-castle',
        name: 'Royal Castle',
        description: 'The central hub of the kingdom where you can view your achievements and rewards.',
        icon: <Castle size={24} />,
        color: 'bg-slate-500',
        position: { top: '50%', left: '20%' },
        level: 1,
        status: 'beginner',
        subject: 'social',
        locked: false,
        completionPercentage: 100,
        animationClass: 'animate-bounce',
        activities: [
          {
            id: 'rc-hall',
            title: 'Hall of Fame',
            description: 'See your achievements, trophies, and progress on your learning journey.',
            type: 'exercise',
            difficulty: 'easy',
            xpReward: 20,
            timeEstimate: '10 min',
            completed: true,
            questions: []
          }
        ]
      }
    ];

    // Calculate total zones and completed zones
    const total = initialZones.length;
    const completed = initialZones.filter(zone => zone.completionPercentage === 100).length;

    setUser(prev => ({
      ...prev,
      totalZones: total,
      completedZones: completed
    }));

    // Initialize zone connections
    const paths = [
      'fractions-forest-grammar-galaxy',
      'fractions-forest-science-savannah',
      'grammar-galaxy-science-savannah',
      'royal-castle-fractions-forest',
      'royal-castle-science-savannah'
    ];
    setActivePathways(paths);

    setZones(initialZones);
  }, []);

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setZoneDialogOpen(true);
    
    if (zone.locked) {
      const requiredZone = zones.find(z => z.id === zone.requiredZoneId);
      setBuddyTip(`Complete ${requiredZone?.name || 'previous zones'} first to unlock this zone!`);
      
      uiToast({
        title: "Zone Locked",
        description: `Complete ${requiredZone?.name || 'required zones'} to unlock ${zone.name}!`,
        variant: "default",
      });
    } else {
      const completedActivities = zone.activities.filter(a => a.completed).length;
      const totalActivities = zone.activities.length;
      
      setBuddyTip(`${zone.name} has ${totalActivities} activities. You've completed ${completedActivities} so far!`);
    }
  };
  
  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivityDialogOpen(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setCorrectAnswers(0);
  };
  
  const handleStartActivity = () => {
    if (!selectedActivity) return;
    
    setActivityDialogOpen(false);
    
    // Wait for dialog to close before opening content
    setTimeout(() => {
      setActivityContentOpen(true);
    }, 300);
  };
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (!selectedActivity || !selectedActivity.questions) return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    const question = selectedActivity.questions[currentQuestion];
    if (answerIndex === question.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    if (currentQuestion < selectedActivity.questions.length - 1) {
      // Move to next question after a short delay
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 1000);
    } else {
      // Quiz completed
      setTimeout(() => {
        setQuizCompleted(true);
      }, 1000);
    }
  };
  
  const handleCompleteActivity = () => {
    if (!selectedActivity || !selectedZone) return;
    
    // Check if enough answers were correct (at least 70%)
    const passThreshold = selectedActivity.questions ? 
      Math.ceil(selectedActivity.questions.length * 0.7) : 
      1;
    
    const passed = correctAnswers >= passThreshold;
    
    if (passed) {
      // Mark activity as completed
      const updatedZones = zones.map(zone => {
        if (zone.id === selectedZone.id) {
          const updatedActivities = zone.activities.map(activity => {
            if (activity.id === selectedActivity.id) {
              return { ...activity, completed: true };
            }
            return activity;
          });
          
          // Calculate new completion percentage
          const completedCount = updatedActivities.filter(a => a.completed).length;
          const newCompletionPercentage = Math.round((completedCount / updatedActivities.length) * 100);
          
          return { 
            ...zone, 
            activities: updatedActivities,
            completionPercentage: newCompletionPercentage 
          };
        }
        return zone;
      });
      
      // Update user XP
      const earnedXP = selectedActivity.xpReward;
      setEarnedXp(earnedXP);
      setShowXpAnimation(true);
      
      setUser(prev => ({
        ...prev,
        xp: prev.xp + earnedXP > prev.totalXp ? prev.xp + earnedXP - prev.totalXp : prev.xp + earnedXP,
        level: prev.xp + earnedXP > prev.totalXp ? prev.level + 1 : prev.level,
        totalXp: prev.xp + earnedXP > prev.totalXp ? prev.totalXp + 100 : prev.totalXp
      }));
      
      // Check if zone is now 100% complete
      const updatedZone = updatedZones.find(z => z.id === selectedZone.id);
      if (updatedZone && updatedZone.completionPercentage === 100) {
        // Update completed zones count
        setUser(prev => ({
          ...prev,
          completedZones: prev.completedZones + 1
        }));
        
        // Show special congratulation
        toast.success(`Congratulations! You've mastered ${updatedZone.name}!`, {
          description: "A new zone has been unlocked!",
          duration: 5000,
        });
        
        // Unlock connected zones
        const newUpdatedZones = updatedZones.map(zone => {
          if (zone.requiredZoneId === selectedZone.id) {
            return { ...zone, locked: false };
          }
          return zone;
        });
        
        setZones(newUpdatedZones);
      } else {
        setZones(updatedZones);
      }
      
      // Success message
      toast.success(`Activity Completed!`, {
        description: `You earned ${earnedXP} XP and made progress in ${selectedZone.name}!`,
        duration: 3000,
      });
      
    } else {
      // Activity not passed
      toast.error("Keep Trying!", {
        description: "You need to get more answers correct to complete this activity.",
        duration: 3000,
      });
    }
    
    setActivityContentOpen(false);
    
    // Hide XP animation after a delay
    if (passed) {
      setTimeout(() => {
        setShowXpAnimation(false);
      }, 3000);
    }
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
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'game':
        return <Puzzle className="h-4 w-4 text-purple-600" />;
      case 'story':
        return <BookOpen className="h-4 w-4 text-yellow-600" />;
      case 'exercise':
        return <Beaker className="h-4 w-4 text-green-600" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getActivityContent = () => {
    if (!selectedActivity || !selectedZone) return null;
    
    // Handle quiz activities
    if (selectedActivity.type === 'quiz' && selectedActivity.questions && selectedActivity.questions.length > 0) {
      if (!quizCompleted) {
        // Show current question
        const question = selectedActivity.questions[currentQuestion];
        return (
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Question {currentQuestion + 1} of {selectedActivity.questions.length}</h3>
            
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              <p className="mb-4">{question.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option, index) => (
                  <Button 
                    key={index} 
                    variant={userAnswers[currentQuestion] === index ? 
                      userAnswers[currentQuestion] === question.correctAnswer ? "success" : "destructive" 
                      : "outline"
                    } 
                    className={cn(
                      "py-6 transition-all",
                      userAnswers[currentQuestion] !== undefined && "pointer-events-none"
                    )}
                    disabled={userAnswers[currentQuestion] !== undefined}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              
              {userAnswers[currentQuestion] !== undefined && (
                <div className={cn(
                  "mt-4 p-3 rounded-lg",
                  userAnswers[currentQuestion] === question.correctAnswer
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                )}>
                  <p className="font-medium mb-1">
                    {userAnswers[currentQuestion] === question.correctAnswer ? "Correct!" : "Incorrect!"}
                  </p>
                  <p>{question.explanation}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <Progress 
                value={(currentQuestion + (userAnswers[currentQuestion] !== undefined ? 1 : 0)) * (100 / selectedActivity.questions.length)} 
                className="h-2 flex-1" 
              />
              <span className="ml-2 text-sm text-gray-500">
                {currentQuestion + (userAnswers[currentQuestion] !== undefined ? 1 : 0)}/{selectedActivity.questions.length}
              </span>
            </div>
          </div>
        );
      } else {
        // Show quiz results
        const totalQuestions = selectedActivity.questions.length;
        const passThreshold = Math.ceil(totalQuestions * 0.7);
        const passed = correctAnswers >= passThreshold;
        
        return (
          <div className="space-y-6">
            <div className={cn(
              "text-center p-6 rounded-lg",
              passed 
                ? "bg-green-50 border border-green-200" 
                : "bg-yellow-50 border border-yellow-200"
            )}>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
                {passed ? (
                  <Trophy className="h-10 w-10 text-yellow-500" />
                ) : (
                  <Clock className="h-10 w-10 text-orange-500" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {passed ? "Activity Complete!" : "Keep Practicing!"}
              </h3>
              
              <p className="text-lg mb-4">
                You got {correctAnswers} out of {totalQuestions} questions correct!
              </p>
              
              <div className="w-full max-w-xs mx-auto mb-4">
                <Progress value={(correctAnswers / totalQuestions) * 100} className="h-3" />
              </div>
              
              <p>
                {passed 
                  ? `Congratulations! You've earned ${selectedActivity.xpReward} XP!` 
                  : `You need at least ${passThreshold} correct answers to pass.`}
              </p>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleCompleteActivity}>
                {passed ? "Claim Reward" : "Try Again"}
              </Button>
            </div>
          </div>
        );
      }
    }
    
    // For other activity types (simplified)
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
            {getTypeIcon(selectedActivity.type)}
          </div>
          
          <h3 className="text-xl font-bold mb-4">
            {selectedActivity.type === 'game' ? 'Interactive Game' : 
             selectedActivity.type === 'story' ? 'Interactive Story' : 
             'Interactive Exercise'}
          </h3>
          
          <p className="mb-6">
            This {selectedActivity.type} would normally contain interactive content for {selectedZone.subject} learning.
          </p>
          
          <Button onClick={handleCompleteActivity} className="mx-auto">
            Complete {selectedActivity.type === 'game' ? 'Game' : selectedActivity.type === 'story' ? 'Story' : 'Exercise'}
          </Button>
        </div>
      </div>
    );
  };

  // Map dragging handlers
  useEffect(() => {
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;
      
      mapPosition.current = {
        x: mapPosition.current.x + deltaX,
        y: mapPosition.current.y + deltaY
      };

      mapElement.style.backgroundPosition = `${mapPosition.current.x}px ${mapPosition.current.y}px`;
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
    };

    mapElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    mapElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mapElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      mapElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Kingdom Learning Map</h2>
          <p className="text-gray-500">Explore different zones and master new skills!</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <div>
              <span className="font-bold">{user.xp} XP</span>
              <Progress value={(user.xp / user.totalXp) * 100} className="h-1 mt-1" />
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-500" />
            <span className="font-bold">Level {user.level}</span>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <span className="font-bold">{user.completedZones}/{user.totalZones} Zones</span>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/90" 
              onClick={() => setMapZoom(Math.min(mapZoom + 10, 130))}
            >
              +
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/90" 
              onClick={() => setMapZoom(Math.max(mapZoom - 10, 80))}
            >
              -
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        ref={mapContainerRef}
        className="relative w-full h-[600px] rounded-3xl bg-blue-50 overflow-hidden shadow-xl"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAzMzA4IiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')",
          backgroundPosition: 'center',
          transform: `scale(${mapZoom/100})`,
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Map decoration elements */}
        <div className="absolute top-[15%] left-[45%] w-16 h-16 bg-blue-200 rounded-full opacity-50 transform rotate-45"></div>
        <div className="absolute top-[65%] left-[25%] w-24 h-8 bg-green-300 rounded-full opacity-40"></div>
        <div className="absolute top-[45%] left-[85%] w-8 h-24 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute top-[85%] left-[50%] w-32 h-10 bg-yellow-200 rounded-full opacity-50"></div>
        <div className="absolute top-[25%] left-[55%] w-20 h-20 bg-purple-200 rounded-full opacity-40"></div>
        <div className="absolute top-[75%] left-[70%] w-28 h-12 bg-orange-200 rounded-full opacity-50"></div>
        
        {/* Trees decorations */}
        <div className="absolute top-[10%] left-[10%] text-green-600 opacity-60"><Trees size={32} /></div>
        <div className="absolute top-[20%] left-[22%] text-green-700 opacity-40"><Trees size={24} /></div>
        <div className="absolute top-[15%] left-[30%] text-green-800 opacity-50"><Trees size={20} /></div>
        <div className="absolute top-[70%] left-[20%] text-green-600 opacity-60"><Trees size={28} /></div>
        <div className="absolute top-[60%] left-[40%] text-green-700 opacity-40"><Trees size={24} /></div>
        <div className="absolute top-[50%] left-[65%] text-green-600 opacity-30"><Trees size={32} /></div>
        <div className="absolute top-[80%] left-[60%] text-green-800 opacity-50"><Trees size={20} /></div>
        
        {/* Zone connections (paths) */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Path for fractions-forest to grammar-galaxy */}
          {activePathways.includes('fractions-forest-grammar-galaxy') && (
            <path 
              d="M 145,130 L 620,180" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
            />
          )}
          
          {/* Path for fractions-forest to science-savannah */}
          {activePathways.includes('fractions-forest-science-savannah') && (
            <path 
              d="M 145,130 L 330,360" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
            />
          )}
          
          {/* Path for grammar-galaxy to science-savannah */}
          {activePathways.includes('grammar-galaxy-science-savannah') && (
            <path 
              d="M 620,180 L 330,360" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
            />
          )}
          
          {/* Path for fractions-forest to algebra-archipelago */}
          {activePathways.includes('fractions-forest-algebra-archipelago') && (
            <path 
              d="M 145,130 L 280,180" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
              opacity="0.5"
            />
          )}
          
          {/* Path for grammar-galaxy to history-highlands */}
          {activePathways.includes('grammar-galaxy-history-highlands') && (
            <path 
              d="M 620,180 L 720,380" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
              opacity="0.5"
            />
          )}
          
          {/* Path for science-savannah to music-meadow */}
          {activePathways.includes('science-savannah-music-meadow') && (
            <path 
              d="M 330,360 L 250,480" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
              opacity="0.5"
            />
          )}
          
          {/* Path for art-atelier to music-meadow */}
          {activePathways.includes('art-atelier-music-meadow') && (
            <path 
              d="M 520,300 L 250,480" 
              stroke="#9CA3AF" 
              strokeWidth="6" 
              strokeDasharray="8 4" 
              strokeLinecap="round"
              opacity="0.5"
            />
          )}
          
          {/* Weekly challenge connections */}
          {activePathways.includes('grammar-galaxy-weekly-challenge') && (
            <path 
              d="M 620,180 L 750,220" 
              stroke="#F87171" 
              strokeWidth="6" 
              strokeDasharray="4 4" 
              strokeLinecap="round"
            />
          )}
          
          {/* Royal Castle connections */}
          {activePathways.includes('royal-castle-fractions-forest') && (
            <path 
              d="M 190,300 L 145,130" 
              stroke="#CBD5E1" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
          )}
          
          {activePathways.includes('royal-castle-science-savannah') && (
            <path 
              d="M 190,300 L 330,360" 
              stroke="#CBD5E1" 
              strokeWidth="6" 
              strokeLinecap="round"
            />
          )}
        </svg>
        
        {/* Zone markers */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={cn(
              "absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110",
              zone.locked ? 'opacity-70' : '',
              zone.color,
              zone.animationClass,
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
              {zone.completionPercentage > 0 && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    strokeWidth="4"
                    stroke="rgba(255, 255, 255, 0.5)"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28 * (zone.completionPercentage / 100)} ${2 * Math.PI * 28}`}
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
                  <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold">
                    {zone.level}
                  </span>
                )}
              </div>
              <div className="text-white text-xs font-bold">{zone.name.split(' ')[0]}</div>
            </div>
          </div>
        ))}
        
        {/* Buddy Bot character on map */}
        <div 
          className="absolute z-20 cursor-pointer transition-transform duration-300 hover:scale-110"
          style={{ left: '80%', top: '85%' }}
          onClick={() => {
            uiToast({
              title: "Buddy Bot",
              description: "Hello there! Need help navigating the kingdom? Just ask me!",
              variant: "default",
            });
          }}
        >
          <BuddyBot size="md" expression="excited" />
        </div>
        
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
      
      {/* Zone progress cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Kingdom Progress</h3>
              <Badge variant="secondary" className="bg-white/20 text-white">Level {user.level}</Badge>
            </div>
            <Progress 
              value={(user.completedZones / user.totalZones) * 100} 
              className="h-2 bg-white/20" 
            />
            <div className="mt-2 text-sm">
              {user.completedZones} of {user.totalZones} zones mastered
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                <Star size={20} />
              </div>
              <div>
                <h3 className="font-bold">XP Progress</h3>
                <div className="text-sm text-gray-500">Level up at {user.totalXp} XP</div>
              </div>
            </div>
            <Progress 
              value={(user.xp / user.totalXp) * 100} 
              className="h-2 mt-4 mb-1" 
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{user.xp} XP</span>
              <span>{user.totalXp} XP</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <Check size={20} />
              </div>
              <div>
                <h3 className="font-bold">Recent Achievement</h3>
                <div className="text-sm text-gray-500">Keep learning to earn more!</div>
              </div>
            </div>
            <div className="mt-4 bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-purple-500" />
                <span className="font-medium">Kingdom Explorer</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Visited {Math.min(zones.length, 5)} different learning zones
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Zone Dialog */}
      <AlertDialog open={zoneDialogOpen} onOpenChange={setZoneDialogOpen}>
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
                    <Badge variant="outline" className="bg-white">Level {selectedZone.level}</Badge>
                    <Badge variant="outline" className="capitalize bg-white">{selectedZone.subject}</Badge>
                    <Badge variant={
                      selectedZone.status === 'beginner' ? "secondary" : 
                      selectedZone.status === 'intermediate' ? "outline" : 
                      "default"
                    }>
                      {selectedZone.status}
                    </Badge>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              {!selectedZone.locked ? (
                <div className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Progress</h3>
                    <span className="text-sm text-gray-500">
                      {selectedZone.activities.filter(a => a.completed).length}/{selectedZone.activities.length} activities completed
                    </span>
                  </div>
                  <Progress
                    value={selectedZone.completionPercentage}
                    className="h-2 mb-6"
                  />
                  
                  <div className="space-y-4">
                    {selectedZone.activities.map((activity) => (
                      <Card
                        key={activity.id}
                        className={cn(
                          "border transition-all",
                          activity.completed ? "bg-gray-50 border-green-100" : "hover:border-blue-200"
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {activity.completed && (
                                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-green-600" />
                                  </div>
                                )}
                                <h4 className="font-bold">{activity.title}</h4>
                                {getDifficultyBadge(activity.difficulty)}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                              <div className="flex items-center text-xs text-gray-500 gap-2">
                                <div className="flex items-center gap-1">
                                  {getTypeIcon(activity.type)}
                                  <span className="capitalize">{activity.type}</span>
                                </div>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>{activity.timeEstimate}</span>
                                <span>•</span>
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span>+{activity.xpReward} XP</span>
                              </div>
                            </div>
                            <Button
                              variant={activity.completed ? "outline" : "default"}
                              size="sm"
                              className="ml-4 flex-shrink-0"
                              onClick={() => handleActivitySelect(activity)}
                            >
                              {activity.completed ? "Review" : "Start"}
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
      
      {/* Activity Dialog */}
      <AlertDialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
        <AlertDialogContent>
          {selectedActivity && (
            <>
              <AlertDialogHeader>
                <div className="flex items-center gap-2">
                  {getDifficultyBadge(selectedActivity.difficulty)}
                  <AlertDialogTitle>{selectedActivity.title}</AlertDialogTitle>
                </div>
                <AlertDialogDescription>
                  <p>{selectedActivity.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Estimated time: {selectedActivity.timeEstimate}</span>
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
                          <span className="font-bold">{selectedActivity.xpReward} XP</span>
                        </div>
                        {selectedActivity.difficulty === 'medium' && (
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            <span className="font-bold">Achievement</span>
                          </div>
                        )}
                        {selectedActivity.difficulty === 'hard' && (
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
                <AlertDialogAction onClick={handleStartActivity}>Start Activity</AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Activity Content Dialog */}
      <AlertDialog open={activityContentOpen} onOpenChange={setActivityContentOpen}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              {selectedActivity && getDifficultyBadge(selectedActivity.difficulty)}
              <AlertDialogTitle>{selectedActivity?.title}</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {selectedZone && (
                <div className="text-base">
                  {selectedZone.subject === 'math' && "Let's solve some math problems!"}
                  {selectedZone.subject === 'language' && "Let's practice our language skills!"}
                  {selectedZone.subject === 'science' && "Let's discover some scientific concepts!"}
                  {selectedZone.subject === 'arts' && "Let's explore our creative side!"}
                  {selectedZone.subject === 'social' && "Let's learn about people and places!"}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              {getActivityContent()}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BuddyBot size="sm" expression="happy" />
                <p className="text-sm">Need a hint? Just ask me!</p>
              </div>
              
              {!quizCompleted && (
                <Button variant="outline" onClick={() => setActivityContentOpen(false)}>
                  Save & Exit
                </Button>
              )}
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InteractiveKingdomMap;
