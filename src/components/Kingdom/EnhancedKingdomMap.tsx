
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BuddyBot from '@/components/Buddy/BuddyBot';
import { 
  MapPin, 
  Lock, 
  BookOpen, 
  Calculator, 
  Brain, 
  Rocket, 
  Trophy, 
  Award, 
  Star,
  Zap,
  ChevronRight,
  CheckCircle
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

interface ZoneProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  level: number;
  isActive: boolean;
  isLocked: boolean;
  xPosition: string;
  yPosition: string;
  subjects: string[];
  skills: string[];
  completePercentage: number;
  type: 'main' | 'sub' | 'challenge';
}

const EnhancedKingdomMap: React.FC = () => {
  const { toast } = useToast();
  const [selectedZone, setSelectedZone] = useState<ZoneProps | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mapZoom, setMapZoom] = useState(100);
  
  const zones: ZoneProps[] = [
    {
      id: 'fractions-forest',
      name: 'Fractions Forest',
      description: 'Master fractions, decimals and percentages in this lush mathematical forest.',
      icon: <Calculator />,
      color: 'green',
      progress: 75,
      level: 3,
      isActive: true,
      isLocked: false,
      xPosition: '25%',
      yPosition: '30%',
      subjects: ['Math', 'Problem Solving'],
      skills: ['Numeracy', 'Comparisons', 'Proportional Reasoning'],
      completePercentage: 65,
      type: 'main',
    },
    {
      id: 'grammar-galaxy',
      name: 'Grammar Galaxy',
      description: 'Explore the universe of language rules, vocabulary and communication.',
      icon: <BookOpen />,
      color: 'blue',
      progress: 45,
      level: 2,
      isActive: true,
      isLocked: false,
      xPosition: '65%',
      yPosition: '20%',
      subjects: ['Language', 'Communication'],
      skills: ['Vocabulary', 'Grammar', 'Comprehension'],
      completePercentage: 45,
      type: 'main',
    },
    {
      id: 'science-savannah',
      name: 'Science Savannah',
      description: 'Discover the wonders of science through experiments and exploration.',
      icon: <Brain />,
      color: 'orange',
      progress: 30,
      level: 1,
      isActive: true,
      isLocked: false,
      xPosition: '40%',
      yPosition: '60%',
      subjects: ['Science', 'Nature Study'],
      skills: ['Observation', 'Hypothesis Testing', 'Classification'],
      completePercentage: 30,
      type: 'main',
    },
    {
      id: 'number-ninja-dojo',
      name: 'Number Ninja Dojo',
      description: 'Train your mental math skills with fast-paced challenges and puzzles.',
      icon: <Calculator />,
      color: 'red',
      progress: 10,
      level: 1,
      isActive: false,
      isLocked: true,
      xPosition: '15%',
      yPosition: '45%',
      subjects: ['Math', 'Speed Calculation'],
      skills: ['Mental Math', 'Pattern Recognition', 'Quick Thinking'],
      completePercentage: 0,
      type: 'sub',
    },
    {
      id: 'vocabulary-volcano',
      name: 'Vocabulary Volcano',
      description: 'Build your word power at this erupting mountain of new terms and meanings.',
      icon: <BookOpen />,
      color: 'purple',
      progress: 5,
      level: 1,
      isActive: false,
      isLocked: true,
      xPosition: '75%',
      yPosition: '40%',
      subjects: ['Language', 'Vocabulary'],
      skills: ['Word Recognition', 'Context Clues', 'Etymology'],
      completePercentage: 0,
      type: 'sub',
    },
    {
      id: 'crystal-challenge',
      name: 'Crystal Challenge',
      description: 'Special weekend challenge! Solve puzzles across all subjects to earn rare crystals.',
      icon: <Zap />,
      color: 'yellow',
      progress: 0,
      level: 5,
      isActive: true,
      isLocked: false,
      xPosition: '50%',
      yPosition: '40%',
      subjects: ['Multi-Subject', 'Special Event'],
      skills: ['Critical Thinking', 'Problem Solving', 'Knowledge Application'],
      completePercentage: 0,
      type: 'challenge',
    },
  ];
  
  const handleZoneClick = (zone: ZoneProps) => {
    setSelectedZone(zone);
    setDialogOpen(true);
    
    if (zone.isLocked) {
      toast({
        title: "Zone Locked",
        description: `Complete ${zone.name.split(' ')[0]} basics to unlock this zone!`,
        variant: "default",
      });
    }
  };
  
  const handleStartZone = () => {
    if (selectedZone?.isLocked) {
      toast({
        title: "Zone Locked",
        description: "You need to unlock this zone first!",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Adventure Begins!",
      description: `You've started exploring ${selectedZone?.name}!`,
      variant: "default",
    });
    
    setDialogOpen(false);
  };
  
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/90 gap-1" 
          onClick={() => setMapZoom(Math.min(mapZoom + 10, 130))}
        >
          +
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/90 gap-1" 
          onClick={() => setMapZoom(Math.max(mapZoom - 10, 80))}
        >
          -
        </Button>
      </div>
      
      <div className="relative rounded-xl overflow-hidden border shadow-lg h-[600px] bg-blue-50">
        {/* Map Background with cloud-like pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')`,
            transform: `scale(${mapZoom / 100})`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        
        {/* Semi-transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-blue-100/30"></div>
        
        {/* Path connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5]">
          <path 
            d="M250,180 C280,220 350,240 400,360" 
            stroke="#8884d8" 
            strokeWidth="5" 
            strokeDasharray="10,5" 
            fill="none" 
            strokeLinecap="round"
          />
          <path 
            d="M650,120 C600,250 500,300 400,360" 
            stroke="#8884d8" 
            strokeWidth="5" 
            strokeDasharray="10,5" 
            fill="none" 
            strokeLinecap="round"
          />
          <path 
            d="M150,270 C180,300 200,320 250,180" 
            stroke="#ff8042" 
            strokeWidth="5" 
            strokeDasharray="5,5" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.6"
          />
          <path 
            d="M750,240 C700,220 680,180 650,120" 
            stroke="#ff8042" 
            strokeWidth="5" 
            strokeDasharray="5,5" 
            fill="none" 
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
        
        {/* Map Zones */}
        <div className="absolute inset-0">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className={`absolute cursor-pointer transition-transform duration-300 hover:scale-110 z-10 ${
                zone.isActive ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ 
                left: zone.xPosition, 
                top: zone.yPosition, 
                transform: 'translate(-50%, -50%)',
                zIndex: zone.type === 'challenge' ? 20 : 10
              }}
              onClick={() => handleZoneClick(zone)}
            >
              <div className={`relative ${
                zone.type === 'main' ? 'w-20 h-20' : 
                zone.type === 'challenge' ? 'w-24 h-24 animate-pulse' : 
                'w-16 h-16'
              }`}>
                {/* Zone background */}
                <div className={`absolute inset-0 rounded-full ${
                  zone.color === 'green' ? 'bg-green-100 border-green-300' : 
                  zone.color === 'blue' ? 'bg-blue-100 border-blue-300' : 
                  zone.color === 'orange' ? 'bg-orange-100 border-orange-300' :
                  zone.color === 'red' ? 'bg-red-100 border-red-300' :
                  zone.color === 'purple' ? 'bg-purple-100 border-purple-300' :
                  'bg-yellow-100 border-yellow-300'
                } border-2 shadow-md`}></div>
                
                {zone.isLocked && (
                  <div className="absolute inset-0 bg-gray-500/50 rounded-full flex items-center justify-center z-20">
                    <Lock size={24} className="text-white" />
                  </div>
                )}
                
                {/* Zone icon */}
                <div className={`absolute inset-0 flex items-center justify-center ${
                  zone.color === 'green' ? 'text-green-600' : 
                  zone.color === 'blue' ? 'text-blue-600' : 
                  zone.color === 'orange' ? 'text-orange-600' :
                  zone.color === 'red' ? 'text-red-600' :
                  zone.color === 'purple' ? 'text-purple-600' :
                  'text-yellow-600'
                }`}>
                  {zone.icon}
                </div>
                
                {/* Progress ring */}
                {zone.progress > 0 && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r={zone.type === 'main' ? "38" : zone.type === 'challenge' ? "46" : "30"}
                      strokeWidth="4"
                      stroke={
                        zone.color === 'green' ? '#22c55e' : 
                        zone.color === 'blue' ? '#3b82f6' : 
                        zone.color === 'orange' ? '#f97316' :
                        zone.color === 'red' ? '#ef4444' :
                        zone.color === 'purple' ? '#8b5cf6' :
                        '#eab308'
                      }
                      fill="none"
                      strokeDasharray={
                        zone.type === 'main' ? 
                          `${2 * Math.PI * 38 * (zone.progress / 100)} ${2 * Math.PI * 38}` : 
                        zone.type === 'challenge' ? 
                          `${2 * Math.PI * 46 * (zone.progress / 100)} ${2 * Math.PI * 46}` :
                          `${2 * Math.PI * 30 * (zone.progress / 100)} ${2 * Math.PI * 30}`
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                
                {/* Zone level */}
                <div 
                  className={`absolute -top-1 -right-1 w-6 h-6 rounded-full 
                    ${zone.level >= 3 ? 'bg-lovable-purple text-white' : 'bg-gray-100 text-gray-700'} 
                    border-2 border-white flex items-center justify-center text-xs font-bold`}
                >
                  {zone.level}
                </div>
              </div>
              
              <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                bg-white/90 px-2 py-0.5 rounded text-center text-xs font-medium shadow-sm
                ${zone.type === 'challenge' ? 'text-yellow-600 animate-bounce' : ''}
                whitespace-nowrap
              `}>
                {zone.name}
              </div>
            </div>
          ))}
          
          {/* Buddy Bot character on map */}
          <div 
            className="absolute z-20 cursor-pointer transition-transform duration-300 hover:scale-110"
            style={{ left: '80%', top: '70%' }}
            onClick={() => {
              toast({
                title: "Buddy says hi!",
                description: "Need help exploring the map? Just ask me!",
                variant: "default",
              });
            }}
          >
            <BuddyBot size="md" expression="excited" animated={true} />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                bg-white/90 px-2 py-0.5 rounded text-center text-xs font-medium shadow-sm whitespace-nowrap">
              Buddy Bot
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievement Banner */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg mt-6">
        <div className="flex items-center">
          <div className="mr-4 bg-white/20 p-2 rounded-full">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="font-bold">Map Explorer</h3>
            <p className="text-sm text-blue-100">Discovered 3 of 6 kingdom zones</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100">Overall Completion</p>
          <div className="w-48 bg-white/20 rounded-full h-2.5 mt-1">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="mt-1 text-xs text-blue-100">45% Complete</div>
        </div>
      </div>
      
      {/* Zone dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="max-w-3xl">
          {selectedZone && (
            <>
              <AlertDialogHeader>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    selectedZone.color === 'green' ? 'bg-green-100 text-green-600' : 
                    selectedZone.color === 'blue' ? 'bg-blue-100 text-blue-600' : 
                    selectedZone.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    selectedZone.color === 'red' ? 'bg-red-100 text-red-600' :
                    selectedZone.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {selectedZone.icon}
                  </div>
                  <AlertDialogTitle className="text-xl">{selectedZone.name}</AlertDialogTitle>
                </div>
                <AlertDialogDescription className="text-base mt-2">
                  {selectedZone.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <Brain size={16} className="mr-2 text-lovable-blue" />
                    Subjects & Skills
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1.5">Subjects:</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedZone.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1.5">Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedZone.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center">
                      <Trophy size={16} className="mr-2 text-yellow-500" />
                      Zone Progress
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion</span>
                        <span>{selectedZone.completePercentage}%</span>
                      </div>
                      <Progress value={selectedZone.completePercentage} className="h-2" />
                      
                      <div className="flex justify-between text-sm mt-2">
                        <span>Zone Level</span>
                        <span className="flex items-center">
                          <Star size={14} className="text-yellow-500 mr-1" />
                          Level {selectedZone.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-start space-x-3">
                      <BuddyBot size="sm" expression="happy" />
                      <div>
                        <h4 className="font-medium">Buddy's Tip</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedZone.isLocked 
                            ? `You need to reach Level ${selectedZone.level + 1} in a nearby zone to unlock this area!`
                            : `Complete daily challenges in ${selectedZone.name} to earn special rewards and power-ups!`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm mb-1 flex items-center">
                      <Award size={16} className="mr-2 text-purple-500" />
                      Available Quests
                    </h4>
                    
                    {selectedZone.isLocked ? (
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Lock size={24} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Complete required zones to unlock these quests!</p>
                      </div>
                    ) : (
                      <>
                        {[
                          { name: "Beginner Adventure", completed: selectedZone.completePercentage >= 30, locked: false },
                          { name: "Intermediate Challenge", completed: selectedZone.completePercentage >= 60, locked: selectedZone.completePercentage < 30 },
                          { name: "Advanced Mastery", completed: false, locked: selectedZone.completePercentage < 60 },
                        ].map((quest, index) => (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                            quest.completed ? 'bg-green-50 border-green-200' : 
                            quest.locked ? 'bg-gray-50 border-gray-200 opacity-70' : 
                            'bg-white'
                          }`}>
                            <div className="flex items-center">
                              {quest.completed ? (
                                <CheckCircle size={18} className="text-green-500 mr-2" />
                              ) : quest.locked ? (
                                <Lock size={18} className="text-gray-400 mr-2" />
                              ) : (
                                <Rocket size={18} className="text-lovable-blue mr-2" />
                              )}
                              <span className={quest.locked ? 'text-gray-400' : ''}>{quest.name}</span>
                            </div>
                            
                            {!quest.locked && (
                              <Button size="sm" variant={quest.completed ? "outline" : "default"} className="h-8">
                                {quest.completed ? "Replay" : "Start"}
                              </Button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction
                  className={`${selectedZone.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={(e) => {
                    if (selectedZone.isLocked) {
                      e.preventDefault();
                      toast({
                        title: "Zone Locked",
                        description: "You need to unlock this zone first!",
                        variant: "destructive",
                      });
                    } else {
                      handleStartZone();
                    }
                  }}
                >
                  {selectedZone.progress > 0 ? 'Continue Adventure' : 'Start Adventure'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnhancedKingdomMap;
