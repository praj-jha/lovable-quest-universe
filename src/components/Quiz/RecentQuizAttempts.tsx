
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RecentQuizAttemptsProps {
  analytics: any;
}

interface StudentAttempt {
  student: {
    _id: string;
    username: string;
  };
  quiz: {
    _id: string;
    title: string;
    subject: string;
  };
  score: number;
  completedAt: string;
}

const RecentQuizAttempts: React.FC<RecentQuizAttemptsProps> = ({ analytics }) => {
  if (!analytics || !analytics.studentPerformance || analytics.studentPerformance.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No recent quiz attempts</p>
      </div>
    );
  }

  // Collect all quiz attempts from all students
  const allAttempts: StudentAttempt[] = [];
  
  analytics.studentPerformance.forEach((student: any) => {
    student.quizzes.forEach((quizAttempt: any) => {
      if (quizAttempt.quiz) {
        allAttempts.push({
          student: student.student,
          quiz: quizAttempt.quiz,
          score: quizAttempt.score,
          completedAt: quizAttempt.completedAt
        });
      }
    });
  });
  
  // Sort by completion date (most recent first)
  allAttempts.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  
  // Take the 5 most recent attempts
  const recentAttempts = allAttempts.slice(0, 5);

  return (
    <div className="space-y-4">
      {recentAttempts.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No recent quiz attempts</p>
        </div>
      ) : (
        recentAttempts.map((attempt, index) => (
          <div 
            key={index}
            className="flex items-start space-x-4 border-b last:border-0 pb-4 last:pb-0"
          >
            <Avatar>
              <AvatarFallback>
                {attempt.student.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{attempt.student.username}</p>
                  <Link 
                    to={`/quiz/${attempt.quiz._id}`}
                    className="text-sm text-muted-foreground hover:text-blue-500"
                  >
                    {attempt.quiz.title}
                  </Link>
                </div>
                <Badge
                  variant={
                    attempt.score >= 90 ? "success" :
                    attempt.score >= 70 ? "default" :
                    attempt.score >= 60 ? "secondary" :
                    "destructive"
                  }
                  className="ml-2"
                >
                  {attempt.score}%
                </Badge>
              </div>
              
              <div className="w-full">
                <Progress
                  value={attempt.score}
                  className="h-1.5"
                />
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>
                  {new Date(attempt.completedAt).toLocaleDateString()}
                </span>
                <span className="mx-1">•</span>
                <Clock className="mr-1 h-3 w-3" />
                <span>
                  {new Date(attempt.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentQuizAttempts;
