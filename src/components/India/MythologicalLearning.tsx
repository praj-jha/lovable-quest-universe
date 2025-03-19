
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Star, 
  Trophy, 
  Sparkles, 
  Zap,
  Brain,
  Calculator,
  Globe,
  Music,
  Palette
} from 'lucide-react';

const MythologicalLearning: React.FC = () => {
  const [activeCharacter, setActiveCharacter] = useState('hanuman');
  
  const mythologicalCharacters = [
    {
      id: 'hanuman',
      name: 'Hanuman',
      description: 'The mighty devotee known for strength, wisdom, and loyalty',
      subjects: ['Science', 'Math', 'Physical Education'],
      power: 'Strength & Problem-Solving',
      image: '/placeholder.svg',
      color: 'from-orange-500 to-red-500',
      quests: [
        {
          title: 'Hanuman\'s Bridge Challenge',
          subject: 'Math',
          description: 'Help Hanuman build a bridge to Lanka by solving fraction problems',
          skills: ['Fractions', 'Measurement', 'Geometry'],
          level: 'Class 3-5',
          rewards: '+100 XP, Hanuman Badge'
        },
        {
          title: 'Mighty Leap Science',
          subject: 'Science',
          description: 'Learn about force, motion, and gravity through Hanuman\'s legendary leap',
          skills: ['Physics', 'Gravity', 'Force & Motion'],
          level: 'Class 4-5',
          rewards: '+120 XP, Science Explorer Badge'
        }
      ]
    },
    {
      id: 'saraswati',
      name: 'Saraswati',
      description: 'Goddess of knowledge, music, arts, and learning',
      subjects: ['Language', 'Arts', 'Music'],
      power: 'Knowledge & Creative Expression',
      image: '/placeholder.svg',
      color: 'from-blue-400 to-purple-500',
      quests: [
        {
          title: 'Saraswati\'s Poetry Workshop',
          subject: 'Language',
          description: 'Learn to write beautiful poems with the guidance of Goddess Saraswati',
          skills: ['Poetry', 'Vocabulary', 'Creative Writing'],
          level: 'Class 2-4',
          rewards: '+90 XP, Poet Badge'
        },
        {
          title: 'Divine Music Theory',
          subject: 'Music',
          description: 'Explore the basics of music through stories of Saraswati\'s veena',
          skills: ['Rhythm', 'Musical Notes', 'Instruments'],
          level: 'Class 1-3',
          rewards: '+80 XP, Music Explorer Badge'
        }
      ]
    },
    {
      id: 'ganesha',
      name: 'Ganesha',
      description: 'The elephant-headed god of wisdom, new beginnings, and remover of obstacles',
      subjects: ['Math', 'Problem Solving', 'Critical Thinking'],
      power: 'Wisdom & Obstacle Removal',
      image: '/placeholder.svg',
      color: 'from-yellow-500 to-red-400',
      quests: [
        {
          title: 'Ganesha\'s Puzzle Palace',
          subject: 'Math',
          description: 'Solve puzzles and riddles with Lord Ganesha to sharpen your mind',
          skills: ['Logical Reasoning', 'Pattern Recognition', 'Puzzles'],
          level: 'Class 1-3',
          rewards: '+85 XP, Puzzle Master Badge'
        },
        {
          title: 'Obstacle Course Challenge',
          subject: 'Problem Solving',
          description: 'Learn to overcome obstacles in learning through Ganesha\'s wisdom',
          skills: ['Problem Solving', 'Strategy', 'Planning'],
          level: 'Class 2-5',
          rewards: '+110 XP, Obstacle Breaker Badge'
        }
      ]
    },
    {
      id: 'krishna',
      name: 'Krishna',
      description: 'The divine strategist known for wisdom, leadership, and playfulness',
      subjects: ['Social Studies', 'Ethics', 'Leadership'],
      power: 'Strategy & Interpersonal Skills',
      image: '/placeholder.svg',
      color: 'from-blue-500 to-blue-700',
      quests: [
        {
          title: 'Krishna\'s Ethical Dilemmas',
          subject: 'Ethics',
          description: 'Learn about making good choices through Krishna\'s stories from the Bhagavad Gita',
          skills: ['Moral Reasoning', 'Decision Making', 'Ethics'],
          level: 'Class 3-5',
          rewards: '+100 XP, Ethical Leader Badge'
        },
        {
          title: 'Flute Mathematics',
          subject: 'Math',
          description: 'Learn patterns and sequences through Krishna\'s musical patterns',
          skills: ['Patterns', 'Sequences', 'Musical Math'],
          level: 'Class 2-4',
          rewards: '+90 XP, Pattern Master Badge'
        }
      ]
    },
    {
      id: 'lakshmi',
      name: 'Lakshmi',
      description: 'Goddess of wealth, prosperity, and abundance',
      subjects: ['Financial Literacy', 'Economics', 'Resource Management'],
      power: 'Prosperity & Resource Planning',
      image: '/placeholder.svg',
      color: 'from-yellow-400 to-red-300',
      quests: [
        {
          title: 'Lakshmi\'s Money Management',
          subject: 'Financial Literacy',
          description: 'Learn basic money concepts through engaging stories about Goddess Lakshmi',
          skills: ['Counting Money', 'Saving', 'Basic Economics'],
          level: 'Class 1-3',
          rewards: '+80 XP, Money Manager Badge'
        },
        {
          title: 'Prosperity Garden',
          subject: 'Science',
          description: 'Learn about plants, growth, and abundance through Lakshmi\'s garden',
          skills: ['Plant Science', 'Growth Cycles', 'Ecosystems'],
          level: 'Class 2-4',
          rewards: '+95 XP, Green Thumb Badge'
        }
      ]
    },
    {
      id: 'arjuna',
      name: 'Arjuna',
      description: 'The skilled archer known for focus, precision, and determination',
      subjects: ['Physical Education', 'Math', 'Focus Skills'],
      power: 'Precision & Concentration',
      image: '/placeholder.svg',
      color: 'from-green-500 to-blue-500',
      quests: [
        {
          title: 'Arjuna\'s Archery Angles',
          subject: 'Math',
          description: 'Master angles and trajectories through Arjuna\'s legendary archery',
          skills: ['Angles', 'Measurement', 'Geometry'],
          level: 'Class 3-5',
          rewards: '+110 XP, Precision Master Badge'
        },
        {
          title: 'Focus Challenge',
          subject: 'Mindfulness',
          description: 'Improve concentration through exercises inspired by Arjuna\'s focus',
          skills: ['Concentration', 'Mindfulness', 'Goal Setting'],
          level: 'Class 1-5',
          rewards: '+90 XP, Focus Master Badge'
        }
      ]
    }
  ];
  
  const selectedCharacter = mythologicalCharacters.find(char => char.id === activeCharacter) || mythologicalCharacters[0];
  
  const getSubjectIcon = (subject: string) => {
    switch(subject.toLowerCase()) {
      case 'math':
        return <Calculator className="h-4 w-4" />;
      case 'science':
        return <Brain className="h-4 w-4" />;
      case 'language':
        return <BookOpen className="h-4 w-4" />;
      case 'social studies':
        return <Globe className="h-4 w-4" />;
      case 'music':
        return <Music className="h-4 w-4" />;
      case 'arts':
        return <Palette className="h-4 w-4" />;
      case 'ethics':
        return <BookOpen className="h-4 w-4" />;
      case 'financial literacy':
        return <Calculator className="h-4 w-4" />;
      case 'problem solving':
        return <Brain className="h-4 w-4" />;
      case 'physical education':
        return <Zap className="h-4 w-4" />;
      case 'mindfulness':
        return <Brain className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  return (
    <section className="py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Sparkles className="h-16 w-16 text-yellow-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Mythological Learning Universe</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore academic subjects through engaging adventures featuring characters from
          Indian mythology, making learning culturally relevant and exciting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-1 flex flex-col gap-2">
          {mythologicalCharacters.map(character => (
            <Card 
              key={character.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                character.id === activeCharacter 
                  ? 'border-2 border-blue-500 shadow-md' 
                  : 'border border-gray-200'
              }`}
              onClick={() => setActiveCharacter(character.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${character.color} flex items-center justify-center text-white`}>
                  {character.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{character.name}</h3>
                  <div className="text-xs text-gray-500">{character.power}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedCharacter.color} text-white p-6`}>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="text-5xl font-bold">{selectedCharacter.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedCharacter.name}</h2>
                  <p className="text-white/90 mb-3">{selectedCharacter.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCharacter.subjects.map((subject, index) => (
                      <Badge key={index} className="bg-white/20 hover:bg-white/30">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Learning Quests with {selectedCharacter.name}</h3>
              
              <div className="space-y-4">
                {selectedCharacter.quests.map((quest, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getSubjectIcon(quest.subject)}
                        <span className="font-medium">{quest.subject}</span>
                      </div>
                      <Badge variant="outline">{quest.level}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-bold mb-2">{quest.title}</h4>
                      <p className="text-gray-600 mb-3">{quest.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {quest.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-purple-600">
                          <Trophy className="h-4 w-4" />
                          <span>{quest.rewards}</span>
                        </div>
                        <Button size="sm">Start Quest</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-xl p-8 border border-yellow-100">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Collect All Mythological Characters</h3>
          <p className="text-lg text-gray-700 mb-6">
            Each character unlocks unique quests and powers. Complete their challenges to build 
            your mythological pantheon and master different academic subjects.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {mythologicalCharacters.map((char, index) => (
              <div key={index} className="relative">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${char.color} 
                  flex items-center justify-center text-white text-xl font-bold
                  ${char.id === activeCharacter ? 'ring-4 ring-yellow-400' : ''}
                `}>
                  {char.name.charAt(0)}
                </div>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 
                    flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600">
            Explore All Characters
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MythologicalLearning;
