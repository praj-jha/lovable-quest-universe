
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Trophy, AlertCircle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ChallengeSubmissionModal from './ChallengeSubmissionModal';

interface FamilyChallengeCardProps {
  challenge: any;
  familyId: string;
  submissions: any[];
  onSubmissionComplete: () => void;
}

const FamilyChallengeCard: React.FC<FamilyChallengeCardProps> = ({ 
  challenge, 
  familyId,
  submissions,
  onSubmissionComplete
}) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  const getTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(challenge.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    
    if (diffTime <= 0) return "Ended";
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
    } else {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} left`;
    }
  };
  
  const getCategoryColor = () => {
    switch (challenge.category) {
      case 'cooking':
        return 'bg-orange-100 text-orange-800';
      case 'science':
        return 'bg-blue-100 text-blue-800';
      case 'art':
        return 'bg-purple-100 text-purple-800';
      case 'reading':
        return 'bg-green-100 text-green-800';
      case 'writing':
        return 'bg-indigo-100 text-indigo-800';
      case 'outdoor':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const hasSubmitted = submissions.some(sub => 
    sub.challengeId._id === challenge._id || sub.challengeId === challenge._id
  );

  const getDifficultyLabel = () => {
    switch (challenge.difficulty) {
      case 1: return 'Easy';
      case 2: return 'Beginner';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Beginner';
    }
  };
  
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
              <div className="flex mt-2 space-x-2">
                <Badge variant="outline" className={getCategoryColor()}>
                  {challenge.category}
                </Badge>
                <Badge variant="outline">
                  {getDifficultyLabel()}
                </Badge>
              </div>
            </div>
            <Badge variant="outline" className="ml-2 font-normal">
              {getTimeRemaining()}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {challenge.description}
          </p>
          
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                Ends on {new Date(challenge.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{challenge.pointsReward} points reward</span>
            </div>
          </div>
          
          {hasSubmitted && (
            <Alert className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Already Submitted</AlertTitle>
              <AlertDescription>
                Your family has already submitted an entry for this challenge.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          {!familyId ? (
            <Button variant="outline" className="w-full" disabled>
              Join a family to participate
            </Button>
          ) : hasSubmitted ? (
            <Button variant="outline" className="w-full" asChild>
              <Link to={`/family/challenge/${challenge._id}`}>
                View Challenge
              </Link>
            </Button>
          ) : (
            <Button 
              className="w-full" 
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Entry
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <ChallengeSubmissionModal 
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        challenge={challenge}
        onSubmissionComplete={onSubmissionComplete}
      />
    </>
  );
};

export default FamilyChallengeCard;
