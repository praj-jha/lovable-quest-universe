
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Clock, 
  FileCheck, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight
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
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import StudentPerformanceChart from '@/components/Quiz/StudentPerformanceChart';
import SubjectBreakdown from '@/components/Quiz/SubjectBreakdown';
import api from '@/lib/api';

// Student Quiz API service
const quizApi = {
  getStudentQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data.data;
  },
  getStudentAttempts: async () => {
    const response = await api.get('/quizzes/attempts/student');
    return response.data.data;
  },
  getUserAnalytics: async () => {
    const response = await api.get('/analytics/user');
    return response.data.data;
  }
};

const StudentDashboard: React.FC = () => {
  // Fetch available quizzes
  const { 
    data: quizzes = [], 
    isLoading: quizzesLoading 
  } = useQuery({
    queryKey: ['student-quizzes'],
    queryFn: quizApi.getStudentQuizzes
  });

  // Fetch student's quiz attempts
  const {
    data: attempts = [],
    isLoading: attemptsLoading
  } = useQuery({
    queryKey: ['student-attempts'],
    queryFn: quizApi.getStudentAttempts
  });

  // Fetch user analytics
  const {
    data: analytics,
    isLoading: analyticsLoading
  } = useQuery({
    queryKey: ['student-analytics'],
    queryFn: quizApi.getUserAnalytics
  });

  const chartConfig = {
    'score': {
      label: 'Score',
      theme: {
        light: 'hsl(215, 100%, 50%)',
        dark: 'hsl(215, 100%, 60%)',
      }
    }
  };

  // Calculate completion rate
  const completedQuizzes = attempts.filter((attempt: any) => attempt.status === 'completed');
  const completionRate = quizzes.length > 0 ? (completedQuizzes.length / quizzes.length) * 100 : 0;

  // Get recent quizzes (not attempted)
  const attemptedQuizIds = attempts.map((attempt: any) => attempt.quizId._id);
  const unattemptedQuizzes = quizzes.filter((quiz: any) => !attemptedQuizIds.includes(quiz._id));
  const recentQuizzes = unattemptedQuizzes.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and take new quizzes
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          {analyticsLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <>
              <Zap className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-lg font-semibold">
                {analytics?.user?.xp || 0} XP
              </span>
              <Badge variant="outline" className="ml-3">
                Level {analytics?.user?.level || 1}
              </Badge>
            </>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {attemptsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <FileCheck className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">
                  {completedQuizzes.length}
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
                <Award className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">
                  {analytics?.summary?.averageScore?.toFixed(1) || 0}%
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quizzesLoading || attemptsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-500" />
                <span className="text-2xl font-bold">
                  {completionRate.toFixed(0)}%
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Time per Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-500" />
                <span className="text-2xl font-bold">
                  {analytics?.summary?.averageTimeSpent
                    ? Math.floor(analytics.summary.averageTimeSpent / 60)
                    : 0}m
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Available Quizzes */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Available Quizzes</CardTitle>
              <CardDescription>
                Quizzes you can take to test your knowledge
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
              ) : recentQuizzes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You've completed all available quizzes!
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/quizzes">View All Quizzes</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentQuizzes.map((quiz: any) => (
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
                        <span className="mx-2">•</span>
                        <Award className="mr-1 h-4 w-4" />
                        <span>{quiz.xpReward} XP</span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" asChild>
                          <Link to={`/quiz/${quiz._id}/take`}>
                            Start Quiz
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" asChild>
                      <Link to="/quizzes">
                        View All Quizzes
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-8">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
                <CardDescription>
                  Recent quiz scores over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {analyticsLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <StudentPerformanceChart analytics={analytics} />
                )}
              </CardContent>
            </Card>

            {/* Subject Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
                <CardDescription>
                  Your performance by subject
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-6 w-full mb-6" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <SubjectBreakdown analytics={analytics} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
