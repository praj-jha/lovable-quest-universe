
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Brain,
  Clock,
  Calendar,
  BookOpen,
  BarChart2,
  Users,
  Trophy,
  Star,
  Eye,
  ThumbsUp,
  Download,
  ArrowRight,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BuddyBot from '@/components/Buddy/BuddyBot';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ParentAnalytics: React.FC = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState('week');
  const [childFilter, setChildFilter] = useState('all');
  
  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "The analytics report has been downloaded",
      variant: "default",
    });
  };
  
  const screenTimeData = [
    { day: 'Mon', minutes: 45, lessons: 3 },
    { day: 'Tue', minutes: 30, lessons: 2 },
    { day: 'Wed', minutes: 60, lessons: 4 },
    { day: 'Thu', minutes: 25, lessons: 2 },
    { day: 'Fri', minutes: 50, lessons: 3 },
    { day: 'Sat', minutes: 90, lessons: 5 },
    { day: 'Sun', minutes: 75, lessons: 4 },
  ];
  
  const monthlyData = [
    { name: 'Week 1', math: 85, language: 70, science: 60 },
    { name: 'Week 2', math: 75, language: 80, science: 65 },
    { name: 'Week 3', math: 90, language: 85, science: 75 },
    { name: 'Week 4', math: 95, language: 90, science: 80 },
  ];
  
  const subjectPerformance = [
    { subject: 'Math', score: 85, average: 75 },
    { subject: 'Language', score: 78, average: 72 },
    { subject: 'Science', score: 90, average: 70 },
    { subject: 'Social Studies', score: 82, average: 68 },
    { subject: 'Art', score: 95, average: 80 },
  ];
  
  const learningPaceData = [
    { name: 'Apr', fastTrack: 10, onTrack: 15, needsHelp: 5 },
    { name: 'May', fastTrack: 15, onTrack: 12, needsHelp: 3 },
    { name: 'Jun', fastTrack: 20, onTrack: 10, needsHelp: 2 },
    { name: 'Jul', fastTrack: 25, onTrack: 8, needsHelp: 1 },
  ];
  
  const emotionalEngagementData = [
    { name: 'Math', excited: 70, focused: 20, frustrated: 10 },
    { name: 'Language', excited: 60, focused: 30, frustrated: 10 },
    { name: 'Science', excited: 80, focused: 15, frustrated: 5 },
    { name: 'Social', excited: 50, focused: 40, frustrated: 10 },
  ];
  
  const timeSpentData = [
    { name: 'Math', value: 35 },
    { name: 'Language', value: 25 },
    { name: 'Science', value: 20 },
    { name: 'Social Studies', value: 15 },
    { name: 'Art', value: 5 },
  ];
  
  const childrenProfiles = [
    {
      id: 'all',
      name: 'All Children',
    },
    {
      id: 'rohan',
      name: 'Rohan',
      age: 10,
      grade: '5th',
      avatar: '👦',
      strengths: ['Math', 'Science'],
      areasToImprove: ['Language'],
    },
    {
      id: 'priya',
      name: 'Priya',
      age: 8,
      grade: '3rd',
      avatar: '👧',
      strengths: ['Language', 'Art'],
      areasToImprove: ['Math'],
    },
  ];
  
  const upcomingActivities = [
    {
      title: "Math Group Challenge",
      date: "Tomorrow, 5:00 PM",
      type: "Live Session",
      reminder: true,
    },
    {
      title: "Science Experiment Day",
      date: "Saturday, 11:00 AM",
      type: "Family Quest",
      reminder: false,
    },
    {
      title: "Reading Adventure",
      date: "Next Week",
      type: "Weekly Challenge",
      reminder: false,
    },
  ];
  
  const selectedChild = childFilter === 'all' 
    ? null 
    : childrenProfiles.find(child => child.id === childFilter) || null;
  
  return (
    <div className="min-h-screen pt-16">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-lovable-purple py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Parent Analytics Dashboard</h1>
                  <p className="text-blue-100">Detailed insights into your child's learning journey</p>
                  
                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={18} className="text-blue-100" />
                      <span className="text-sm text-blue-100">Last updated: Today, 2:15 PM</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="bg-white gap-2" onClick={handleDownloadReport}>
                    <Download size={16} />
                    Download Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-1 border rounded-lg overflow-hidden">
                  <Button 
                    variant={period === 'week' ? 'default' : 'ghost'} 
                    className="rounded-none h-9" 
                    onClick={() => setPeriod('week')}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={period === 'month' ? 'default' : 'ghost'} 
                    className="rounded-none h-9" 
                    onClick={() => setPeriod('month')}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={period === 'year' ? 'default' : 'ghost'} 
                    className="rounded-none h-9" 
                    onClick={() => setPeriod('year')}
                  >
                    Year
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      className="pl-8 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={childFilter}
                      onChange={(e) => setChildFilter(e.target.value)}
                    >
                      {childrenProfiles.map(child => (
                        <option key={child.id} value={child.id}>{child.name}</option>
                      ))}
                    </select>
                    <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
              
              {selectedChild && (
                <div className="flex items-center gap-3 bg-blue-50 p-2 px-4 rounded-lg">
                  <div className="text-2xl">{selectedChild.avatar}</div>
                  <div>
                    <div className="font-medium">{selectedChild.name}</div>
                    <div className="text-xs text-gray-500">
                      {selectedChild.age} years • Grade {selectedChild.grade}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lovable-blue">
                      <Clock size={24} />
                    </div>
                    <Badge variant="outline">This Week</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mt-2">6.25 hrs</h3>
                  <p className="text-sm text-gray-500">Screen time</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <ArrowRight size={14} className="rotate-90" />
                    <span>15% increase from last week</span>
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
                  <h3 className="text-2xl font-bold mt-2">23 lessons</h3>
                  <p className="text-sm text-gray-500">Lessons completed</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <ArrowRight size={14} className="rotate-90" />
                    <span>5 more than last week</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-lovable-purple">
                      <Brain size={24} />
                    </div>
                    <Badge variant="outline">Score</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mt-2">85%</h3>
                  <p className="text-sm text-gray-500">Average mastery score</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <ArrowRight size={14} className="rotate-90" />
                    <span>7% improvement</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                      <Star size={24} />
                    </div>
                    <Badge variant="outline">Engagement</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mt-2">Highly engaged</h3>
                  <p className="text-sm text-gray-500">Emotional engagement</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <ThumbsUp size={14} className="mr-1" />
                    <span>Positive learning sentiment</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="progress" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
                <TabsTrigger value="progress">
                  <BarChart2 size={16} className="mr-2" />
                  Progress
                </TabsTrigger>
                <TabsTrigger value="screentime">
                  <Clock size={16} className="mr-2" />
                  Screen Time
                </TabsTrigger>
                <TabsTrigger value="emotions">
                  <Eye size={16} className="mr-2" />
                  Engagement
                </TabsTrigger>
                <TabsTrigger value="recommendations">
                  <Brain size={16} className="mr-2" />
                  Recommendations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subject Performance</CardTitle>
                      <CardDescription>Comparing your child's scores with class average</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={subjectPerformance}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" name="Your Child" fill="#8884d8" />
                            <Bar dataKey="average" name="Class Average" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Progress</CardTitle>
                      <CardDescription>Progress over time across key subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={monthlyData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="math" name="Math" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="language" name="Language" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="science" name="Science" stroke="#ffc658" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Pace</CardTitle>
                      <CardDescription>Number of lessons by learning pace</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={learningPaceData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="fastTrack" name="Fast Track" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="onTrack" name="On Track" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="needsHelp" name="Needs Help" stackId="1" stroke="#ffc658" fill="#ffc658" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Time Distribution</CardTitle>
                      <CardDescription>Time spent across subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={timeSpentData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {timeSpentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Development</CardTitle>
                      <CardDescription>Key skills progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { name: 'Critical Thinking', value: 85 },
                          { name: 'Problem Solving', value: 75 },
                          { name: 'Reading Comprehension', value: 90 },
                          { name: 'Creativity', value: 80 },
                          { name: 'Collaboration', value: 65 }
                        ].map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-sm text-gray-500">{skill.value}%</span>
                            </div>
                            <Progress value={skill.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="screentime" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Screen Time</CardTitle>
                      <CardDescription>Daily learning time in minutes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
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
                          <BarChart data={screenTimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <ChartTooltip 
                              content={
                                <ChartTooltipContent 
                                  labelFormatter={(value) => `${value}: `} 
                                  formatter={(value, name) => [`${value} mins`, name === 'minutes' ? 'Screen Time' : 'Lessons']}
                                />
                              } 
                            />
                            <Bar dataKey="minutes" name="Minutes" fill="#8884d8" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Time of Day Usage</CardTitle>
                      <CardDescription>When your child typically uses the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { time: '6 AM', minutes: 0 },
                              { time: '9 AM', minutes: 15 },
                              { time: '12 PM', minutes: 10 },
                              { time: '3 PM', minutes: 35 },
                              { time: '6 PM', minutes: 25 },
                              { time: '9 PM', minutes: 5 },
                            ]}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="minutes" stroke="#8884d8" fillOpacity={1} fill="url(#colorMinutes)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Screen Time Breakdown</CardTitle>
                      <CardDescription>How time is spent on the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { category: 'Interactive Lessons', percent: 45, color: 'bg-blue-500' },
                          { category: 'Practice Exercises', percent: 25, color: 'bg-green-500' },
                          { category: 'Quizzes & Tests', percent: 15, color: 'bg-yellow-500' },
                          { category: 'Educational Games', percent: 10, color: 'bg-purple-500' },
                          { category: 'Live Sessions', percent: 5, color: 'bg-pink-500' },
                        ].map((item) => (
                          <div key={item.category} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{item.category}</span>
                              <span className="text-sm text-gray-500">{item.percent}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${item.color} rounded-full`} 
                                style={{ width: `${item.percent}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Device Usage</CardTitle>
                      <CardDescription>Platforms used for learning</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Mobile', value: 50 },
                                { name: 'Tablet', value: 30 },
                                { name: 'Laptop', value: 20 },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {COLORS.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Average session duration:</span>
                          <span className="font-medium">22 minutes</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Most active day:</span>
                          <span className="font-medium">Saturday</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Comparison</CardTitle>
                      <CardDescription>How your child compares to peers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center p-4">
                        <div className="relative w-48 h-48">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-blue-500">+15%</div>
                              <div className="text-sm text-gray-500">Above average</div>
                            </div>
                          </div>
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="#e6e6e6" 
                              strokeWidth="10" 
                            />
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="#3b82f6" 
                              strokeWidth="10" 
                              strokeDasharray="283" 
                              strokeDashoffset="70" 
                              transform="rotate(-90 50 50)" 
                            />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Your child:</span>
                          <span className="font-medium">45 min/day</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Average user:</span>
                          <span className="font-medium">39 min/day</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="emotions" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Emotional Engagement</CardTitle>
                      <CardDescription>How your child feels during different subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={emotionalEngagementData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            stackOffset="expand"
                            layout="vertical"
                            barSize={30}
                          >
                            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                            <YAxis dataKey="name" type="category" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value) => [`${value}%`, '']} />
                            <Legend />
                            <Bar dataKey="excited" name="Excited" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="focused" name="Focused" stackId="a" fill="#8884d8" />
                            <Bar dataKey="frustrated" name="Frustrated" stackId="a" fill="#ff8042" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Patterns</CardTitle>
                      <CardDescription>How engagement fluctuates over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { day: 'Week 1', engagement: 75, retention: 80 },
                              { day: 'Week 2', engagement: 85, retention: 85 },
                              { day: 'Week 3', engagement: 70, retention: 75 },
                              { day: 'Week 4', engagement: 90, retention: 90 },
                              { day: 'Week 5', engagement: 85, retention: 95 },
                              { day: 'Week 6', engagement: 95, retention: 90 },
                            ]}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="engagement" name="Engagement Score" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="retention" name="Knowledge Retention" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Challenges</CardTitle>
                      <CardDescription>Areas where your child faces difficulty</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { challenge: 'Fractions & Decimals', frequency: 'Often', level: 'High', action: 'Needs attention' },
                          { challenge: 'Grammar Rules', frequency: 'Sometimes', level: 'Medium', action: 'Making progress' },
                          { challenge: 'Scientific Terms', frequency: 'Rarely', level: 'Low', action: 'Handled well' },
                        ].map((item, index) => (
                          <div key={index} className="p-3 rounded-lg border flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              item.level === 'High' ? 'bg-red-500' : 
                              item.level === 'Medium' ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}></div>
                            <div className="flex-1">
                              <div className="font-medium">{item.challenge}</div>
                              <div className="flex items-center mt-1">
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{item.frequency}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{item.action}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="outline" className="w-full text-sm gap-1">
                          <AlertCircle size={14} />
                          Get Support for These Areas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Interaction Patterns</CardTitle>
                      <CardDescription>How your child interacts with the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { metric: 'Average response time', value: '8 seconds', trend: 'improving' },
                          { metric: 'Questions asked to Buddy', value: '35 this week', trend: 'stable' },
                          { metric: 'Retry attempts', value: '2.3 average', trend: 'improving' },
                          { metric: 'Game completion rate', value: '95%', trend: 'stable' },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{item.metric}</span>
                            <div className="text-right">
                              <div className="font-medium">{item.value}</div>
                              <div className={`text-xs ${
                                item.trend === 'improving' ? 'text-green-500' : 
                                item.trend === 'declining' ? 'text-red-500' : 
                                'text-gray-500'
                              }`}>
                                {item.trend === 'improving' && '↑ '}
                                {item.trend === 'declining' && '↓ '}
                                {item.trend.charAt(0).toUpperCase() + item.trend.slice(1)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Feedback from Buddy</CardTitle>
                      <CardDescription>AI observations about learning style</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3 mb-4">
                        <BuddyBot size="sm" expression="happy" />
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700">
                            Rohan learns best through visual examples and interactive challenges!
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border">
                          <div className="font-medium text-sm">Learning Style</div>
                          <div className="text-sm text-gray-600 mt-1">Visual & Kinesthetic</div>
                        </div>
                        
                        <div className="p-3 rounded-lg border">
                          <div className="font-medium text-sm">Best Time to Learn</div>
                          <div className="text-sm text-gray-600 mt-1">Afternoons (3-6 PM)</div>
                        </div>
                        
                        <div className="p-3 rounded-lg border">
                          <div className="font-medium text-sm">Motivation Triggers</div>
                          <div className="text-sm text-gray-600 mt-1">Competition & Rewards</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Learning Paths</CardTitle>
                        <CardDescription>Personalized recommendations based on your child's progress</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {[
                            {
                              title: "Advanced Fractions Mastery",
                              description: "Help Rohan tackle complex fraction problems through interactive lessons and real-world applications.",
                              reason: "Based on high math performance (85%) and interest in challenging problems",
                              duration: "3 weeks",
                              recommended: true,
                              subject: "Math",
                              icon: <Calculator size={18} />
                            },
                            {
                              title: "Reading Comprehension Booster",
                              description: "A series of engaging stories with comprehension activities to strengthen language skills.",
                              reason: "Will help improve current language skills (78%) to match math proficiency",
                              duration: "2 weeks",
                              recommended: true,
                              subject: "Language",
                              icon: <BookOpen size={18} />
                            },
                            {
                              title: "Science Explorer",
                              description: "Hands-on experiments and virtual labs to build on excellent science foundation.",
                              reason: "Builds on strong science interest (90%) with more advanced concepts",
                              duration: "4 weeks",
                              recommended: false,
                              subject: "Science",
                              icon: <Microscope size={18} />
                            },
                          ].map((path, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    path.subject === 'Math' ? 'bg-blue-100 text-lovable-blue' :
                                    path.subject === 'Language' ? 'bg-green-100 text-green-600' :
                                    'bg-yellow-100 text-yellow-600'
                                  }`}>
                                    {path.icon}
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{path.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                                    
                                    <div className="mt-3 bg-gray-50 p-2 rounded-md">
                                      <div className="text-xs text-gray-500 flex items-center">
                                        <Brain size={12} className="mr-1" />
                                        Reason for recommendation:
                                      </div>
                                      <div className="text-sm mt-1">{path.reason}</div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mt-3">
                                      <Badge variant="outline">{path.duration}</Badge>
                                      <Badge variant="outline">{path.subject}</Badge>
                                      {path.recommended && (
                                        <Badge className="bg-green-500">Highly Recommended</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex justify-end">
                                <Button size="sm">Start Learning Path</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="mb-6">
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
                                <div className="flex items-center mt-1 gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {activity.type}
                                  </Badge>
                                  <Button 
                                    variant={activity.reminder ? "default" : "outline"} 
                                    size="sm" 
                                    className="h-7 text-xs"
                                  >
                                    {activity.reminder ? "Reminder Set" : "Set Reminder"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Expert Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <BuddyBot size="sm" expression="thinking" />
                            <div className="bg-blue-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700">
                                Based on your child's progress, I recommend focusing on these areas:
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {[
                              { tip: "Schedule 15-minute math practice sessions 3 times a week", priority: "High" },
                              { tip: "Use kitchen activities to reinforce measurement concepts", priority: "Medium" },
                              { tip: "Practice reading comprehension with interactive stories", priority: "High" },
                            ].map((rec, index) => (
                              <div key={index} className="p-3 rounded-lg border">
                                <div className="flex items-start">
                                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                    rec.priority === 'High' ? 'bg-red-500' : 
                                    rec.priority === 'Medium' ? 'bg-yellow-500' : 
                                    'bg-green-500'
                                  }`}></div>
                                  <div className="ml-2">
                                    <div className="text-sm">{rec.tip}</div>
                                    <div className="text-xs text-gray-500 mt-1">Priority: {rec.priority}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <Button className="w-full mt-2" variant="outline">
                            Book a Call with a Learning Expert
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

const Calculator = (props: React.ComponentProps<typeof Brain>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="8" x2="8" y1="12" y2="12" />
      <line x1="8" x2="8" y1="18" y2="18" />
      <line x1="12" x2="12" y1="12" y2="12" />
      <line x1="12" x2="12" y1="18" y2="18" />
      <line x1="16" x2="16" y1="12" y2="12" />
      <line x1="16" x2="16" y1="18" y2="18" />
    </svg>
  );
};

const Microscope = (props: React.ComponentProps<typeof Brain>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="14" width="14" height="1" />
      <path d="M6 11h2a2 2 0 0 0 2-2V6h1a2 2 0 0 0 2-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h1v3a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-2" />
    </svg>
  );
};

export default ParentAnalytics;
