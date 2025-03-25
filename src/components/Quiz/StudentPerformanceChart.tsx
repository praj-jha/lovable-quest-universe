
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface StudentPerformanceChartProps {
  analytics: any;
}

const StudentPerformanceChart: React.FC<StudentPerformanceChartProps> = ({ analytics }) => {
  if (!analytics || !analytics.recentAttempts || analytics.recentAttempts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No performance data available</p>
      </div>
    );
  }

  // Prepare data for the chart
  const performanceData = analytics.recentAttempts.map((attempt: any) => ({
    date: new Date(attempt.completedAt).toLocaleDateString(),
    score: attempt.score,
    quiz: attempt.quizId?.title || 'Quiz',
    timestamp: new Date(attempt.completedAt).getTime()
  }));

  // Sort by date (oldest to newest)
  performanceData.sort((a: any, b: any) => a.timestamp - b.timestamp);

  const chartConfig = {
    'score': {
      label: 'Score',
      theme: {
        light: 'hsl(215, 100%, 50%)',
        dark: 'hsl(215, 100%, 60%)',
      }
    }
  };

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={performanceData}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="date" 
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
                labelFormatter={(label) => `Date: ${label}`}
                nameKey="quiz"
              />
            }
          />
          <Line
            type="monotone"
            dataKey="score"
            name="score"
            stroke="var(--color-score)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StudentPerformanceChart;
