
import React, { useState } from 'react';
import Card, { CardContent } from '../UI/Card';
import Badge from '../UI/Badge';
import { cn } from '@/lib/utils';

interface KingdomZone {
  id: string;
  name: string;
  description: string;
  color: string;
  position: {
    top: string;
    left: string;
  };
  locked?: boolean;
  status?: 'beginner' | 'intermediate' | 'advanced';
  subject: 'math' | 'science' | 'language' | 'arts' | 'social';
}

const KingdomMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<KingdomZone | null>(null);
  
  const zones: KingdomZone[] = [
    {
      id: 'fractions-forest',
      name: 'Fractions Forest',
      description: 'Master fractions and decimals in this magical woodland filled with math puzzles.',
      color: 'bg-green-500',
      position: { top: '20%', left: '15%' },
      status: 'beginner',
      subject: 'math'
    },
    {
      id: 'grammar-galaxy',
      name: 'Grammar Galaxy',
      description: 'Explore the stars and planets while learning about nouns, verbs, and sentences.',
      color: 'bg-purple-500',
      position: { top: '35%', left: '65%' },
      status: 'beginner',
      subject: 'language'
    },
    {
      id: 'science-savannah',
      name: 'Science Savannah',
      description: 'Discover plants, animals, and natural phenomena in this wild landscape.',
      color: 'bg-yellow-500',
      position: { top: '60%', left: '35%' },
      status: 'beginner',
      subject: 'science'
    },
    {
      id: 'algebra-archipelago',
      name: 'Algebra Archipelago',
      description: 'Navigate through islands of equations and variables in this tropical paradise.',
      color: 'bg-blue-500',
      position: { top: '30%', left: '30%' },
      status: 'intermediate',
      subject: 'math',
      locked: true
    },
    {
      id: 'history-highlands',
      name: 'History Highlands',
      description: 'Climb mountains of knowledge about ancient civilizations and important events.',
      color: 'bg-orange-500',
      position: { top: '70%', left: '75%' },
      status: 'intermediate',
      subject: 'social',
      locked: true
    },
  ];
  
  const handleZoneClick = (zone: KingdomZone) => {
    if (!zone.locked) {
      setSelectedZone(zone);
    }
  };
  
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math':
        return '🧮';
      case 'language':
        return '📝';
      case 'science':
        return '🔬';
      case 'arts':
        return '🎨';
      case 'social':
        return '🌍';
      default:
        return '📚';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'beginner':
        return <Badge variant="success">Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="warning">Intermediate</Badge>;
      case 'advanced':
        return <Badge variant="primary">Advanced</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full">
      <div className="relative w-full h-[500px] rounded-3xl bg-blue-50 overflow-hidden shadow-inner">
        {/* Map background with grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAzMzA4IiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]">
          {/* Map decoration elements */}
          <div className="absolute top-[15%] left-[45%] w-16 h-16 bg-blue-200 rounded-full opacity-50 transform rotate-45"></div>
          <div className="absolute top-[65%] left-[25%] w-24 h-8 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-[45%] left-[85%] w-8 h-24 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-[85%] left-[50%] w-32 h-10 bg-blue-200 rounded-full opacity-50"></div>
          
          {/* Zone markers */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className={cn(
                "absolute w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110",
                zone.locked ? 'bg-gray-400 opacity-60' : zone.color,
                !zone.locked && 'shadow-lg'
              )}
              style={{
                top: zone.position.top,
                left: zone.position.left,
              }}
              onClick={() => handleZoneClick(zone)}
            >
              <div className="relative">
                <div className="absolute -top-3 -right-3">
                  {zone.locked ? (
                    <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs">
                      🔒
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
          
          {/* Zone connections (paths) */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 145,130 L 280,160" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 280,160 L 330,310" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 330,310 L 620,370" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 145,130 L 330,310" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
            <path d="M 620,180 L 330,310" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="8 4" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* Selected zone info overlay */}
        {selectedZone && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 animate-slide-up">
            <div className="flex items-start">
              <div 
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white mr-4",
                  selectedZone.color
                )}
              >
                <span className="text-xl">{getSubjectIcon(selectedZone.subject)}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold">{selectedZone.name}</h3>
                  {selectedZone.status && getStatusBadge(selectedZone.status)}
                </div>
                <p className="text-sm text-gray-600 mt-1">{selectedZone.description}</p>
              </div>
              <button 
                className="flex-shrink-0 bg-lovable-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-lovable-purple transition-colors"
                onClick={() => {}}
              >
                Explore Zone
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KingdomMap;
