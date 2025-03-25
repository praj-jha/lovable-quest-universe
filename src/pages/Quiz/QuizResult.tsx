
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowLeft,
  Zap
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import api from '@/lib/api';

// Quiz attempt API
const quizAttemptApi = {
  getAttemptResult: async (attemptId: string) => {
    const response = await api.get(`/quizzes/attempts/${attemptId}`);
    return response.data.data;
  }
};

const QuizResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Fetch quiz attempt result
  const { 
    data: result,
    isLoading,
    error
  } = useQuery({
    queryKey: ['quiz-result', id],
    queryFn: () => quizAttemptApi.getAttemptResult(id as string),
    enabled: !!id
  });

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <Skeleton className="h-64 w-full rounded-lg mb-6" />
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <HelpCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not load quiz results. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const isPassed = result.score >= result.quizId.passingScore;
  const xpGained = Math.ceil(result.score / 10) * result.quizId.xpReward;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Button variant="ghost" size="sm" className="mb-2" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>
          <Badge variant={isPassed ? 'success' : 'destructive'} className="text-lg py-1.5 px-3 mt-4 md:mt-0">
            {isPassed ? 'PASSED' : 'FAILED'}
          </Badge>
        </div>

        {/* Score Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{result.quizId.title}</CardTitle>
            <CardDescription>
              Completed on {new Date(result.completedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted-foreground stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={`${isPassed ? 'text-green-500' : 'text-orange-500'} stroke-current`}
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{result.score}%</span>
                  <span className="text-sm text-muted-foreground">Your Score</span>
                </div>
              </div>
              
              <div className="flex items-center text-green-600">
                <Zap className="mr-1 h-5 w-5" />
                <span className="font-bold">+{xpGained} XP</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full">
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Correct</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {result.correctAnswers}/{result.totalQuestions}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">Time</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {formatTime(result.timeSpent)}
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Award className="h-4 w-4 mr-1" />
                    <span className="text-sm">Passing</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {result.quizId.passingScore}%
                  </span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Questions</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {result.totalQuestions}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center space-x-4">
            <Button asChild>
              <Link to="/quizzes">Take Another Quiz</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/analytics">View Performance</Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Answer Review */}
        <h2 className="text-xl font-semibold mb-4">Question Review</h2>
        
        {result.responses.map((response: any, index: number) => {
          const question = result.quizId.questions[response.questionId];
          
          return (
            <Card key={index} className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    Question {response.questionId + 1}
                  </CardTitle>
                  {response.isCorrect ? (
                    <Badge variant="success" className="ml-auto">Correct</Badge>
                  ) : (
                    <Badge variant="destructive" className="ml-auto">Incorrect</Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <p className="mb-4">{question.question}</p>
                
                <div className="space-y-2">
                  {question.options.map((option: string, optionIndex: number) => (
                    <div 
                      key={optionIndex}
                      className={`
                        p-3 border rounded-md
                        ${optionIndex === question.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                        ${optionIndex === response.selectedAnswer && !response.isCorrect ? 'border-red-500 bg-red-50' : ''}
                      `}
                    >
                      <div className="flex items-start">
                        <span className="flex items-center justify-center rounded-full bg-muted w-6 h-6 text-sm mr-3">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        
                        <div className="flex-1">
                          <span>{option}</span>
                          
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-2 text-green-600 text-sm">
                              (Correct Answer)
                            </span>
                          )}
                          
                          {optionIndex === response.selectedAnswer && !response.isCorrect && (
                            <span className="ml-2 text-red-600 text-sm">
                              (Your Answer)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <span>Time taken: {formatTime(response.timeTaken)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResult;
