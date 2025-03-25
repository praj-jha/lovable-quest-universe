
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ClassPerformanceChartProps {
  analytics: any;
}

const ClassPerformanceChart: React.FC<ClassPerformanceChartProps> = ({ analytics }) => {
  if (!analytics || !analytics.quizPerformance || analytics.quizPerformance.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No performance data available</p>
      </div>
    );
  }

  // Prepare data for subject performance
  const subjectData: any[] = [];
  
  if (analytics.studentPerformance && analytics.studentPerformance.length > 0) {
    // Group performance by subject
    const subjectPerformance: Record<string, { total: number, count: number }> = {};
    
    analytics.studentPerformance.forEach((student: any) => {
      student.quizzes.forEach((quizAttempt: any) => {
        if (quizAttempt.quiz && quizAttempt.quiz.subject) {
          const subject = quizAttempt.quiz.subject;
          if (!subjectPerformance[subject]) {
            subjectPerformance[subject] = { total: 0, count: 0 };
          }
          subjectPerformance[subject].total += quizAttempt.score;
          subjectPerformance[subject].count += 1;
        }
      });
    });
    
    // Convert to chart data
    Object.entries(subjectPerformance).forEach(([subject, data]) => {
      subjectData.push({
        subject,
        average: data.count > 0 ? Math.round(data.total / data.count) : 0,
      });
    });
  } else if (analytics.quizPerformance.length > 0) {
    // Group performance by subject if no student data
    const subjectPerformance: Record<string, { total: number, count: number }> = {};
    
    analytics.quizPerformance.forEach((quizPerf: any) => {
      if (quizPerf.quiz && quizPerf.quiz.subject) {
        const subject = quizPerf.quiz.subject;
        if (!subjectPerformance[subject]) {
          subjectPerformance[subject] = { total: 0, count: 0 };
        }
        subjectPerformance[subject].total += quizPerf.averageScore;
        subjectPerformance[subject].count += 1;
      }
    });
    
    // Convert to chart data
    Object.entries(subjectPerformance).forEach(([subject, data]) => {
      subjectData.push({
        subject,
        average: data.count > 0 ? Math.round(data.total / data.count) : 0,
      });
    });
  }

  const chartConfig = {
    'average': {
      label: 'Average Score',
      theme: {
        light: 'hsl(215, 100%, 50%)',
        dark: 'hsl(215, 100%, 60%)',
      }
    }
  };

  // Sort by average score
  subjectData.sort((a, b) => b.average - a.average);

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={subjectData}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="subject" 
            tick={{ fontSize: 12 }}
            tickMargin={10} 
          />
          <YAxis 
            domain={[0, 100]} 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                labelFormatter={(label) => `Subject: ${label}`}
                formatter={(value) => [`${value}%`, 'Average Score']}
              />
            }
          />
          <Bar 
            dataKey="average" 
            name="average"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ClassPerformanceChart;
