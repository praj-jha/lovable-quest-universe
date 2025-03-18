
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart2,
  Users,
  Star,
  Clock,
  Award,
  Calendar,
  BookOpen,
  Brain,
  Share2,
  Download,
  ChevronRight
} from 'lucide-react';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

const colors = {
  math: '#8884d8',
  language: '#82ca9d',
  science: '#ffc658',
  social: '#ff8042',
};

const FamilyInsights: React.FC = () => {
  const { toast } = useToast();
  
  const handleShareReport = () => {
    toast({
      title: "Report shared",
      description: "The family report has been shared via email",
      variant: "default",
    });
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "The family report has been downloaded",
      variant: "default",
    });
  };
  
  const weeklyActivity = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 25 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 75 },
  ];
  
  const subjectDistribution = [
    { name: 'Math', value: 40, color: colors.math },
    { name: 'Language', value: 25, color: colors.language },
    { name: 'Science', value: 20, color: colors.science },
    { name: 'Social Studies', value: 15, color: colors.social },
  ];
  
  const familyMembers = [
    { 
      id: '1',
      name: 'Mom',
      role: 'Parent',
      contribution: 35,
      strengths: ['Math', 'Science'],
      completedActivities: 12,
    },
    { 
      id: '2',
      name: 'Dad',
      role: 'Parent',
      contribution: 25,
      strengths: ['Social Studies', 'Language'],
      completedActivities: 8,
    },
    { 
      id: '3',
      name: 'Rohan',
      role: 'Child',
      contribution: 25,
      strengths: ['Math', 'Science'],
      completedActivities: 15,
    },
    { 
      id: '4',
      name: 'Priya',
      role: 'Child',
      contribution: 15,
      strengths: ['Language', 'Art'],
      completedActivities: 10,
    },
  ];
  
  const weeklyTips = [
    "Try our new 'Kitchen Science' activity to reinforce measurement concepts.",
    "Rohan is excelling in fractions. Challenge him with our advanced fraction games.",
    "Priya could use more practice with grammar. Check out our 'Grammar Galaxy' activities.",
    "Family reading time can boost everyone's vocabulary. Try our 15-minute evening reading challenge."
  ];
  
  const upcomingActivities = [
    {
      title: "Math Group Challenge",
      date: "Saturday, 5:00 PM",
      type: "Live Session"
    },
    {
      title: "Science Experiment Day",
      date: "Sunday, 11:00 AM",
      type: "Family Quest"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Family Insights</h2>
          <p className="text-gray-500 text-sm">Weekly report and personalized recommendations</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleShareReport}>
            <Share2 size={14} />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleDownloadReport}>
            <Download size={14} />
            Download
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lovable-purple">
                <Clock size={24} />
              </div>
              <Badge variant="outline">This Week</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">6.25 hrs</h3>
            <p className="text-sm text-gray-500">Total learning time</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <ChevronRight size={14} className="rotate-90" />
              <span>15% increase from last week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lovable-blue">
                <Award size={24} />
              </div>
              <Badge variant="outline">Level 3</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">340 XP</h3>
            <p className="text-sm text-gray-500">Family experience points</p>
            <div className="mt-2">
              <div className="text-xs flex justify-between">
                <span>Next level</span>
                <span>160 XP needed</span>
              </div>
              <Progress value={68} className="h-1.5 mt-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <BookOpen size={24} />
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">8 quests</h3>
            <p className="text-sm text-gray-500">Family activities completed</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <ChevronRight size={14} className="rotate-90" />
              <span>3 more than last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <Star size={24} />
              </div>
              <Badge variant="outline">Rank</Badge>
            </div>
            <h3 className="text-2xl font-bold mt-2">#4 in city</h3>
            <p className="text-sm text-gray-500">Family leaderboard ranking</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <ChevronRight size={14} className="rotate-90" />
              <span>Up 2 positions this week</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer 
                config={{
                  minutes: {
                    label: 'Minutes',
                    theme: {
                      light: '#8884d8',
                      dark: '#8884d8',
                    },
                  },
                }}
              >
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        labelFormatter={(value) => `${value}: `} 
                        formatter={(value) => [`${value} mins`, 'Time Spent']}
                      />
                    } 
                  />
                  <Bar dataKey="minutes" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col justify-between">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={subjectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex justify-center gap-4 mt-4">
                {subjectDistribution.map((subject) => (
                  <div key={subject.name} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                    <span className="text-xs text-gray-600">{subject.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Family Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lovable-blue">
                        <Users size={16} />
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{member.contribution}%</div>
                      <div className="text-xs text-gray-500">{member.completedActivities} activities</div>
                    </div>
                  </div>
                  <Progress value={member.contribution} className="h-1.5" />
                  <div className="flex flex-wrap gap-1">
                    {member.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Weekly Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                    <Brain size={14} />
                  </div>
                  <p className="text-sm text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lovable-blue flex-shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyInsights;
