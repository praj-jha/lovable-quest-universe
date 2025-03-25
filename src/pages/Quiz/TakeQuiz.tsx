
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  Clock, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

// Quiz API service
const quizApi = {
  getQuiz: async (id: string) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data.data;
  },
  startQuizAttempt: async (id: string) => {
    const response = await api.post(`/quizzes/${id}/start`);
    return response.data.data;
  },
  submitAnswer: async ({ attemptId, questionIndex, selectedAnswer, timeTaken }: any) => {
    const response = await api.post(`/quizzes/attempts/${attemptId}/answer`, {
      questionIndex,
      selectedAnswer,
      timeTaken
    });
    return response.data.data;
  },
  completeQuizAttempt: async (attemptId: string) => {
    const response = await api.post(`/quizzes/attempts/${attemptId}/complete`);
    return response.data.data;
  }
};

const TakeQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [questionTimeElapsed, setQuestionTimeElapsed] = useState(0);
  const [answerResult, setAnswerResult] = useState<{ isCorrect: boolean } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(0);

  // Fetch quiz details
  const { 
    data: quizData,
    isLoading: quizLoading,
    error: quizError
  } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => quizApi.getQuiz(id as string),
    enabled: !!id
  });

  // Start quiz attempt mutation
  const startQuizMutation = useMutation({
    mutationFn: () => quizApi.startQuizAttempt(id as string),
    onSuccess: (data) => {
      setAttemptId(data.attempt._id);
      setQuizStarted(true);
      questionStartTimeRef.current = Date.now();
      setTimeRemaining(data.quiz.timeLimit * 60); // Convert minutes to seconds
      startTimers();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to start quiz",
        variant: "destructive"
      });
    }
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: (data: any) => quizApi.submitAnswer(data),
    onSuccess: (data) => {
      setAnswerResult(data);
      setIsSubmitting(false);
      
      if (data.nextQuestion === null) {
        // Quiz is complete
        completeQuizMutation.mutate(attemptId as string);
      }
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit answer",
        variant: "destructive"
      });
    }
  });

  // Complete quiz mutation
  const completeQuizMutation = useMutation({
    mutationFn: (attemptId: string) => quizApi.completeQuizAttempt(attemptId),
    onSuccess: (data) => {
      stopTimers();
      navigate(`/quiz/result/${data._id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to complete quiz",
        variant: "destructive"
      });
    }
  });

  // Start quiz and question timers
  const startTimers = () => {
    // Main quiz timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up, complete quiz
          stopTimers();
          completeQuizMutation.mutate(attemptId as string);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Question timer
    questionTimerRef.current = setInterval(() => {
      setQuestionTimeElapsed(Date.now() - questionStartTimeRef.current);
    }, 100);
  };

  // Stop all timers
  const stopTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
  };

  // Start quiz
  const handleStartQuiz = () => {
    startQuizMutation.mutate();
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (answerResult || isSubmitting) return; // Prevent selection after submission
    setSelectedOption(optionIndex);
  };

  // Submit answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !attemptId || answerResult) return;
    
    setIsSubmitting(true);
    const timeTaken = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    
    submitAnswerMutation.mutate({
      attemptId,
      questionIndex: currentQuestionIndex,
      selectedAnswer: selectedOption,
      timeTaken
    });
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (!quizData || currentQuestionIndex >= quizData.questions.length - 1) {
      // End of quiz
      return;
    }
    
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOption(null);
    setAnswerResult(null);
    questionStartTimeRef.current = Date.now();
  };

  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      stopTimers();
    };
  }, []);

  if (quizLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <Skeleton className="h-64 w-full rounded-lg mb-6" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (quizError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load quiz. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The requested quiz could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Quiz intro screen
  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{quizData.title}</CardTitle>
              <Badge variant={
                quizData.difficulty === 'beginner' ? 'default' :
                quizData.difficulty === 'intermediate' ? 'secondary' :
                'destructive'
              }>
                {quizData.difficulty}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">
                {quizData.description || "Test your knowledge with this quiz."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Subject</h3>
                <p>{quizData.subject}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Grade Level</h3>
                <p>Grade {quizData.gradeLevel}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Time Limit</h3>
                <p>{quizData.timeLimit} minutes</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Questions</h3>
                <p>{quizData.questions.length} questions</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Passing Score</h3>
                <p>{quizData.passingScore}%</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">XP Reward</h3>
                <p>{quizData.xpReward} XP</p>
              </div>
            </div>
            
            <Alert>
              <HelpCircle className="h-4 w-4" />
              <AlertTitle>Instructions</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  <li>Read each question carefully and select the best answer.</li>
                  <li>You have {quizData.timeLimit} minutes to complete the quiz.</li>
                  <li>You cannot go back to previous questions.</li>
                  <li>Click "Submit Answer" after selecting your answer.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button onClick={handleStartQuiz} disabled={startQuizMutation.isPending}>
              {startQuizMutation.isPending ? 'Starting...' : 'Start Quiz'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Quiz in progress
  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (answerResult ? 1 : 0)) / quizData.questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Quiz Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{quizData.title}</h1>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </p>
          </div>
          
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-orange-500" />
            <span className="text-lg font-medium">
              {formatTimeRemaining(timeRemaining)}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <Progress value={progress} className="mb-8 h-2" />
        
        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-colors
                    ${selectedOption === index ? 'border-primary bg-primary/10' : 'hover:bg-accent'}
                    ${answerResult && selectedOption === index ? (answerResult.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}
                  `}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="flex items-start">
                    <span className="flex items-center justify-center rounded-full bg-muted w-6 h-6 text-sm mr-3 mt-0.5">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {!answerResult ? (
                <span>Select an answer and submit</span>
              ) : answerResult.isCorrect ? (
                <span className="flex items-center text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Correct!
                </span>
              ) : (
                <span className="flex items-center text-red-600">
                  <XCircle className="mr-1 h-4 w-4" />
                  Incorrect
                </span>
              )}
            </div>
            
            {answerResult ? (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < quizData.questions.length - 1 ? (
                  <>Next Question <ArrowRight className="ml-1 h-4 w-4" /></>
                ) : (
                  'Finish Quiz'
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Answer'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TakeQuiz;
