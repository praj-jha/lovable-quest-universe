
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  PlusCircle, 
  BarChart, 
  Clock, 
  FileQuestion 
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
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import CreateQuizModal from '@/components/Quiz/CreateQuizModal';
import RecentQuizAttempts from '@/components/Quiz/RecentQuizAttempts';
import ClassPerformanceChart from '@/components/Quiz/ClassPerformanceChart';
import api from '@/lib/api';

// Create Quiz API service
const quizApi = {
  getTeacherQuizzes: async () => {
    const response = await api.get('/quizzes/teacher');
    return response.data.data;
  },
  getClassAnalytics: async () => {
    const response = await api.get('/analytics/class');
    return response.data.data;
  }
};

const TeacherDashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  // Fetch teacher's quizzes
  const { 
    data: quizzes = [], 
    isLoading: quizzesLoading,
    refetch: refetchQuizzes
  } = useQuery({
    queryKey: ['teacher-quizzes'],
    queryFn: quizApi.getTeacherQuizzes
  });

  // Fetch class analytics
  const {
    data: analytics,
    isLoading: analyticsLoading
  } = useQuery({
    queryKey: ['class-analytics'],
    queryFn: quizApi.getClassAnalytics
  });

  const handleQuizCreated = () => {
    refetchQuizzes();
    toast({
      title: "Quiz Created",
      description: "Your new quiz has been created successfully.",
      variant: "success"
    });
    setShowCreateModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your quizzes and track student progress
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      <Separator className="my-6" />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <FileQuestion className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">
                  {analytics?.summary?.totalQuizzes || 0}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-indigo-500" />
                <span className="text-2xl font-bold">
                  {analytics?.summary?.totalAttempts || 0}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">
                  {analytics?.summary?.averageClassScore?.toFixed(1) || 0}%
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-orange-500" />
                <span className="text-2xl font-bold">
                  {analytics?.studentPerformance?.length || 0}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - My Quizzes */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>My Quizzes</CardTitle>
              <CardDescription>
                Quizzes you've created for your students
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              {quizzesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : quizzes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't created any quizzes yet
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Your First Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {quizzes.map((quiz: any) => (
                    <div 
                      key={quiz._id} 
                      className="p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Link 
                          to={`/quiz/${quiz._id}`}
                          className="text-lg font-medium hover:underline"
                        >
                          {quiz.title}
                        </Link>
                        <Badge variant={
                          quiz.difficulty === 'beginner' ? 'default' :
                          quiz.difficulty === 'intermediate' ? 'secondary' :
                          'destructive'
                        }>
                          {quiz.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <BookOpen className="mr-1 h-4 w-4" />
                        <span>{quiz.subject}</span>
                        <span className="mx-2">•</span>
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{quiz.timeLimit} mins</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <Link 
                          to={`/quiz/${quiz._id}/analytics`}
                          className="text-sm text-blue-500 hover:underline flex items-center"
                        >
                          <BarChart className="mr-1 h-4 w-4" />
                          View Analytics
                        </Link>
                        <span className="text-sm text-muted-foreground">
                          {new Date(quiz.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowCreateModal(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-8">
            {/* Class Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
                <CardDescription>
                  Average scores by subject
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {analyticsLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ClassPerformanceChart analytics={analytics} />
                )}
              </CardContent>
            </Card>

            {/* Recent Attempts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Attempts</CardTitle>
                <CardDescription>
                  Latest student activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-3 w-[150px]" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <RecentQuizAttempts analytics={analytics} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Quiz Modal */}
      <CreateQuizModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        onQuizCreated={handleQuizCreated}
      />
    </div>
  );
};

export default TeacherDashboard;
