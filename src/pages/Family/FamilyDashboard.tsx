
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Trophy, 
  ImagePlus, 
  Vote, 
  Clock, 
  Plus,
  ArrowUpRight,
  Heart,
  Star
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CreateFamilyModal from '@/components/Family/CreateFamilyModal';
import FamilyChallengeCard from '@/components/Family/FamilyChallengeCard';
import FamilyLeaderboard from '@/components/Family/FamilyLeaderboard';
import FamilySubmissionGallery from '@/components/Family/FamilySubmissionGallery';
import api from '@/lib/api';

// Family API service
const familyApi = {
  getUserFamily: async () => {
    const response = await api.get('/families/user/me');
    return response.data.data;
  },
  getActiveChallenges: async () => {
    const response = await api.get('/challenges/active');
    return response.data.data;
  },
  getFamilyLeaderboard: async () => {
    const response = await api.get('/families/leaderboard');
    return response.data.data;
  }
};

const FamilyDashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Fetch user's family
  const { 
    data: familyData,
    isLoading: familyLoading,
    error: familyError,
    refetch: refetchFamily
  } = useQuery({
    queryKey: ['user-family'],
    queryFn: familyApi.getUserFamily
  });

  // Fetch active challenges
  const {
    data: challenges = [],
    isLoading: challengesLoading
  } = useQuery({
    queryKey: ['active-challenges'],
    queryFn: familyApi.getActiveChallenges
  });

  // Fetch family leaderboard
  const {
    data: leaderboard = [],
    isLoading: leaderboardLoading
  } = useQuery({
    queryKey: ['family-leaderboard'],
    queryFn: familyApi.getFamilyLeaderboard
  });

  const handleFamilyCreated = () => {
    refetchFamily();
    setShowCreateModal(false);
  };

  // Check if user has a family
  const hasFamily = !familyError && familyData && familyData.family;
  
  // No family view
  if (!hasFamily && !familyLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Family Learning Mode</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join or create a family to participate in fun learning challenges together!
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>You're not part of a family yet</CardTitle>
              <CardDescription>
                Create a family or ask someone to add you to their family
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
                <Users className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="space-y-2 text-center mb-6">
                <h3 className="text-lg font-medium">Why join a family?</h3>
                <ul className="text-muted-foreground list-disc list-inside text-left">
                  <li>Participate in fun learning challenges together</li>
                  <li>Upload progress photos and videos</li>
                  <li>Earn points and climb the leaderboard</li>
                  <li>Track your family's performance</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Family
              </Button>
            </CardFooter>
          </Card>
          
          <CreateFamilyModal 
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onFamilyCreated={handleFamilyCreated}
          />
        </div>
      </div>
    );
  }

  // Family dashboard view
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Family Dashboard</h1>
          <p className="text-muted-foreground">
            Participate in challenges and track your family's progress
          </p>
        </div>
        
        {familyLoading ? (
          <Skeleton className="h-10 w-32 mt-4 lg:mt-0" />
        ) : (
          <div className="mt-4 lg:mt-0 flex items-center">
            <Badge variant="outline" className="mr-3">
              Level {familyData?.family?.level || 1}
            </Badge>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold">
                {familyData?.family?.points || 0} points
              </span>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Family Info & Leaderboard */}
        <div className="space-y-8">
          {/* Family Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Family Information</CardTitle>
            </CardHeader>
            <CardContent>
              {familyLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    {familyData?.family?.name}
                  </h3>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Family Members</h4>
                    <div className="space-y-3">
                      {familyData?.family?.members.map((member: any) => (
                        <div key={member._id} className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {member.username}
                            {member._id === familyData?.family?.admin && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Admin
                              </Badge>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Family Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Submissions</p>
                        <p className="text-xl font-semibold">
                          {familyData?.submissions?.length || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Votes</p>
                        <p className="text-xl font-semibold">
                          {familyData?.submissions?.reduce((sum: number, sub: any) => 
                            sum + (sub.votes || 0), 0) || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Leaderboard Card */}
          <Card>
            <CardHeader>
              <CardTitle>Family Leaderboard</CardTitle>
              <CardDescription>
                Top performing families
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamilyLeaderboard 
                leaderboard={leaderboard} 
                isLoading={leaderboardLoading}
                currentFamilyId={familyData?.family?._id}
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/family/leaderboard">
                  View Full Leaderboard
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Middle & Right Columns */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="challenges" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
              <TabsTrigger value="submissions">Our Submissions</TabsTrigger>
              <TabsTrigger value="gallery">Community Gallery</TabsTrigger>
            </TabsList>
            
            {/* Active Challenges Tab */}
            <TabsContent value="challenges" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Challenges</h2>
                <Button size="sm" asChild>
                  <Link to="/family/challenges">View All</Link>
                </Button>
              </div>
              
              {challengesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-64">
                      <CardHeader className="pb-2">
                        <Skeleton className="h-5 w-3/4" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : challenges.length === 0 ? (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>No active challenges</AlertTitle>
                  <AlertDescription>
                    There are no active challenges at the moment. Check back later!
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {challenges.map((challenge: any) => (
                    <FamilyChallengeCard
                      key={challenge._id}
                      challenge={challenge}
                      familyId={familyData?.family?._id}
                      submissions={familyData?.submissions || []}
                      onSubmissionComplete={refetchFamily}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Our Submissions Tab */}
            <TabsContent value="submissions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Our Submissions</h2>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/family/submissions">View All</Link>
                </Button>
              </div>
              
              {familyLoading ? (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <Skeleton className="h-5 w-2/3" />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : !familyData?.submissions || familyData.submissions.length === 0 ? (
                <Alert>
                  <ImagePlus className="h-4 w-4" />
                  <AlertTitle>No submissions yet</AlertTitle>
                  <AlertDescription>
                    Your family hasn't submitted to any challenges yet. Participate in a challenge to see your submissions here.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {familyData.submissions.slice(0, 3).map((submission: any) => (
                    <Card key={submission._id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {submission.challengeId.title}
                        </CardTitle>
                        <CardDescription>
                          Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {submission.images && submission.images.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {submission.images.map((image: string, index: number) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Submission ${index + 1}`}
                                className="rounded-md object-cover w-full h-48"
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="bg-muted h-48 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">No images uploaded</p>
                          </div>
                        )}
                        
                        <p>{submission.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant={
                            submission.status === 'approved' ? 'success' :
                            submission.status === 'rejected' ? 'destructive' :
                            'default'
                          }>
                            {submission.status}
                          </Badge>
                          
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 text-red-500 mr-1" />
                            <span>{submission.votes || 0} votes</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {familyData.submissions.length > 3 && (
                    <div className="flex justify-center">
                      <Button variant="outline" asChild>
                        <Link to="/family/submissions">
                          View All Submissions
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            {/* Community Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Community Gallery</h2>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/family/gallery">View Gallery</Link>
                </Button>
              </div>
              
              <FamilySubmissionGallery
                currentFamilyId={familyData?.family?._id}
                onVoteSuccess={refetchFamily}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;
