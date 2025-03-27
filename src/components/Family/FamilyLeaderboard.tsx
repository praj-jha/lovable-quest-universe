
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Search, 
  MapPin, 
  Share2, 
  ChevronUp, 
  ChevronDown, 
  Users,
  Medal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FamilyRankingProps {
  id: string;
  rank: number;
  familyName: string;
  members: number;
  location: string;
  xp: number;
  change?: 'up' | 'down' | 'same';
  isCurrentFamily?: boolean;
}

const FamilyLeaderboard: React.FC = () => {
  const { toast } = useToast();
  const [locationFilter, setLocationFilter] = useState('your-city');
  
  const handleShare = () => {
    toast({
      title: "Sharing leaderboard",
      description: "Share your family's achievement with friends and family!",
      variant: "default",
    });
  };
  
  const cityRankings: FamilyRankingProps[] = [
    {
      id: '1',
      rank: 1,
      familyName: 'Sharma Family',
      members: 4,
      location: 'Mumbai',
      xp: 1250,
      change: 'up',
    },
    {
      id: '2',
      rank: 2,
      familyName: 'Patel Family',
      members: 5,
      location: 'Mumbai',
      xp: 1180,
      change: 'same',
    },
    {
      id: '3',
      rank: 3,
      familyName: 'Singh Family',
      members: 3,
      location: 'Mumbai',
      xp: 1050,
      change: 'down',
    },
    {
      id: '4',
      rank: 4,
      familyName: 'Your Family',
      members: 4,
      location: 'Mumbai',
      xp: 980,
      change: 'up',
      isCurrentFamily: true,
    },
    {
      id: '5',
      rank: 5,
      familyName: 'Gupta Family',
      members: 6,
      location: 'Mumbai',
      xp: 920,
      change: 'down',
    },
  ];
  
  const stateRankings: FamilyRankingProps[] = [
    {
      id: '1',
      rank: 1,
      familyName: 'Reddy Family',
      members: 5,
      location: 'Hyderabad',
      xp: 1520,
      change: 'up',
    },
    {
      id: '2',
      rank: 2,
      familyName: 'Kumar Family',
      members: 4,
      location: 'Pune',
      xp: 1380,
      change: 'same',
    },
    {
      id: '3',
      rank: 3,
      familyName: 'Sharma Family',
      members: 4,
      location: 'Mumbai',
      xp: 1250,
      change: 'up',
    },
    {
      id: '4',
      rank: 24,
      familyName: 'Your Family',
      members: 4,
      location: 'Mumbai',
      xp: 980,
      change: 'up',
      isCurrentFamily: true,
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Family Leaderboard</h2>
          <p className="text-gray-500 text-sm">Compete with other families and win prizes!</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg overflow-hidden border">
            <button 
              className={`px-3 py-1.5 text-sm font-medium ${locationFilter === 'your-city' ? 'bg-lovable-blue text-white' : 'bg-white'}`}
              onClick={() => setLocationFilter('your-city')}
            >
              City
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium ${locationFilter === 'your-state' ? 'bg-lovable-blue text-white' : 'bg-white'}`}
              onClick={() => setLocationFilter('your-state')}
            >
              State
            </button>
          </div>
          
          <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
            <Share2 size={14} />
            Share
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle>{locationFilter === 'your-city' ? 'Mumbai' : 'Maharashtra'} Rankings</CardTitle>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-sm text-gray-500">Updated today</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 space-y-2">
            {(locationFilter === 'your-city' ? cityRankings : stateRankings).map((family) => (
              <div 
                key={family.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  family.isCurrentFamily 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    family.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                    family.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    family.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-50 text-blue-500'
                  }`}>
                    {family.rank <= 3 ? (
                      <Trophy size={16} />
                    ) : (
                      <span className="text-sm font-medium">{family.rank}</span>
                    )}
                  </div>
                  
                  <div>
                    <div className="font-semibold">{family.familyName}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users size={12} className="mr-1" />
                      {family.members} members
                      <span className="mx-2">•</span>
                      <MapPin size={12} className="mr-1" />
                      {family.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <div className="font-semibold">{family.xp.toLocaleString()} XP</div>
                    <div className="flex items-center justify-end text-xs">
                      {family.change === 'up' && (
                        <span className="text-green-500 flex items-center">
                          <ChevronUp size={14} />
                          Up
                        </span>
                      )}
                      {family.change === 'down' && (
                        <span className="text-red-500 flex items-center">
                          <ChevronDown size={14} />
                          Down
                        </span>
                      )}
                      {family.change === 'same' && (
                        <span className="text-gray-500">No change</span>
                      )}
                    </div>
                  </div>
                  
                  {family.rank <= 3 && (
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      family.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                      family.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <Medal size={16} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-lovable-blue flex items-center justify-center text-white">
                <Trophy size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Monthly Prizes</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Top 3 families in each city win Amazon vouchers worth ₹2000, ₹1500, and ₹1000 respectively.
                </p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyLeaderboard;
