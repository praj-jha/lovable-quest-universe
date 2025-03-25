
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Heart, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import api from '@/lib/api';

interface FamilySubmissionGalleryProps {
  currentFamilyId?: string;
  onVoteSuccess?: () => void;
  challengeId?: string;
}

// API service
const submissionApi = {
  getChallengeSubmissions: async (challengeId?: string) => {
    if (challengeId) {
      const response = await api.get(`/challenges/${challengeId}/submissions`);
      return response.data.data;
    } else {
      // Get submissions from all active challenges
      const challengesResponse = await api.get('/challenges/active');
      const challenges = challengesResponse.data.data;
      
      // Get submissions for each challenge
      const submissionsPromises = challenges.map((challenge: any) => 
        api.get(`/challenges/${challenge._id}/submissions`)
      );
      
      const submissionsResponses = await Promise.all(submissionsPromises);
      
      // Flatten and return all submissions
      const allSubmissions = submissionsResponses.flatMap(
        (response: any) => response.data.data || []
      );
      
      return allSubmissions;
    }
  },
  voteForSubmission: async (submissionId: string) => {
    const response = await api.post(`/challenges/submissions/${submissionId}/vote`);
    return response.data;
  }
};

const FamilySubmissionGallery: React.FC<FamilySubmissionGalleryProps> = ({ 
  currentFamilyId,
  onVoteSuccess,
  challengeId
}) => {
  const { toast } = useToast();
  
  // Fetch submissions
  const { 
    data: submissions = [], 
    isLoading,
    refetch: refetchSubmissions
  } = useQuery({
    queryKey: ['gallery-submissions', challengeId],
    queryFn: () => submissionApi.getChallengeSubmissions(challengeId)
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: (submissionId: string) => submissionApi.voteForSubmission(submissionId),
    onSuccess: () => {
      toast({
        title: "Vote registered",
        description: "Your vote has been registered successfully",
        variant: "success"
      });
      refetchSubmissions();
      if (onVoteSuccess) onVoteSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Vote failed",
        description: error.response?.data?.message || "Failed to register vote",
        variant: "destructive"
      });
    }
  });

  const handleVote = (submissionId: string) => {
    voteMutation.mutate(submissionId);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <Skeleton className="h-48 w-full" />
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-2/3 mt-1" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <Alert>
        <ImageOff className="h-4 w-4" />
        <AlertTitle>No submissions yet</AlertTitle>
        <AlertDescription>
          There are no submissions to display in the gallery yet.
        </AlertDescription>
      </Alert>
    );
  }

  // Sort by votes (highest first)
  const sortedSubmissions = [...submissions].sort((a, b) => b.votes - a.votes);
  
  // Take only top 6 submissions for preview
  const topSubmissions = sortedSubmissions.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {topSubmissions.map((submission: any) => {
        const isOwnSubmission = submission.familyId._id === currentFamilyId;
        const challengeTitle = submission.challengeId?.title || 'Challenge';
        
        return (
          <Card key={submission._id} className="overflow-hidden">
            {submission.images && submission.images.length > 0 ? (
              <div className="aspect-video bg-muted relative">
                <img
                  src={submission.images[0]}
                  alt={`${submission.familyId.name}'s submission`}
                  className="object-cover w-full h-full"
                />
                <Badge
                  className="absolute top-2 left-2"
                  variant="secondary"
                >
                  {challengeTitle}
                </Badge>
              </div>
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No image</p>
              </div>
            )}
            
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>
                      {submission.familyId.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{submission.familyId.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  <span>{submission.votes || 0}</span>
                </div>
              </div>
              
              <p className="text-sm mt-2 line-clamp-2">
                {submission.description || 'No description provided'}
              </p>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleVote(submission._id)}
                disabled={isOwnSubmission || voteMutation.isPending}
              >
                {isOwnSubmission ? (
                  "Can't vote for your own submission"
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Vote
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default FamilySubmissionGallery;
