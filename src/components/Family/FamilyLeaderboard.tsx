
import React from 'react';
import { Trophy, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface FamilyLeaderboardProps {
  leaderboard: any[];
  isLoading: boolean;
  currentFamilyId?: string;
}

const FamilyLeaderboard: React.FC<FamilyLeaderboardProps> = ({ 
  leaderboard, 
  isLoading,
  currentFamilyId
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="h-8 w-8 rounded-full mr-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="py-8 text-center">
        <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No families on leaderboard yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leaderboard.slice(0, 5).map((family, index) => {
        const isCurrentFamily = currentFamilyId === family._id;
        
        return (
          <div 
            key={family._id}
            className={`flex items-center justify-between p-2 rounded-md ${
              isCurrentFamily ? 'bg-primary/10' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2">
                {index === 0 ? (
                  <Trophy className="h-5 w-5 text-yellow-500" />
                ) : index === 1 ? (
                  <Trophy className="h-5 w-5 text-gray-400" />
                ) : index === 2 ? (
                  <Trophy className="h-5 w-5 text-amber-600" />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>
                    {family.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={`font-medium ${isCurrentFamily ? 'text-primary' : ''}`}>
                  {family.name}
                </span>
              </div>
            </div>
            
            <span className="font-semibold">{family.points} pts</span>
          </div>
        );
      })}
    </div>
  );
};

export default FamilyLeaderboard;
