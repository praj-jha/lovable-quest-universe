
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SubjectBreakdownProps {
  analytics: any;
}

const SubjectBreakdown: React.FC<SubjectBreakdownProps> = ({ analytics }) => {
  if (!analytics || !analytics.summary || !analytics.summary.subjectPerformance) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No subject performance data available</p>
      </div>
    );
  }

  const subjectPerformance = Object.entries(analytics.summary.subjectPerformance);
  
  if (subjectPerformance.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No subject performance data available</p>
      </div>
    );
  }

  // Sort by average score (highest first)
  subjectPerformance.sort((a, b) => (b[1] as any).averageScore - (a[1] as any).averageScore);

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {subjectPerformance.map(([subject, data]) => (
        <div key={subject}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{subject}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm font-semibold">
                    {(data as any).averageScore.toFixed(1)}%
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on {(data as any).count} quizzes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Progress 
            value={(data as any).averageScore} 
            className={`h-2 ${getProgressColor((data as any).averageScore)}`}
          />
        </div>
      ))}
    </div>
  );
};

export default SubjectBreakdown;
