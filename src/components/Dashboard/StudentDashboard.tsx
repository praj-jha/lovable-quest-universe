import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BuddyBot from '@/components/Buddy/BuddyBot';
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  BarChart,
  MessageCircle,
  Camera
} from 'lucide-react';

interface LessonProps {
  id: string;
  title: string;
  subject: string;
  progress: number;
  duration: string;
  image: string;
}

interface AchievementProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  isNew: boolean;
}

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const recentLessons: LessonProps[] = [
    {
      id: '1',
      title: 'Fractions & Decimals',
      subject: 'Math',
      progress: 75,
      duration: '15 min',
      image: 'https://images.unsplash.com/photo-1569360531163-28fd00ba1e14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: '2',
      title: 'Nouns & Pronouns',
      subject: 'Language',
      progress: 45,
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1548343361-02248be15911?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: '3',
      title: 'Animal Habitats',
      subject: 'Science',
      progress: 90,
      duration: '25 min',
      image: 'https://images.unsplash.com/photo-1557533305-a6c0ae0e54a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
  ];
  
  const achievements: AchievementProps[] = [
    {
      id: '1',
      title: 'Math Explorer',
      description: 'Completed 5 math lessons in Fractions Forest',
      icon: <Trophy className="text-lovable-yellow" />,
      date: '2 days ago',
      isNew: true,
    },
    {
      id: '2',
      title: 'Vocabulary Master',
      description: 'Learned 50 new words in Grammar Galaxy',
      icon: <BookOpen className="text-lovable-blue" />,
      date: '1 week ago',
      isNew: false,
    },
    {
      id: '3',
      title: 'Science Observer',
      description: 'Completed 3 experiments in Science Savannah',
      icon: <Star className="text-lovable-orange" />,
      date: '2 weeks ago',
      isNew: false,
    },
  ];
  
  const upcomingEvents = [
    {
      id: '1',
      title: 'Math Group Session',
      time: 'Today, 4:00 PM',
      icon: <Calendar className="text-lovable-purple" />,
    },
    {
      id: '2',
      title: 'Story Time with Ms. Sarah',
      time: 'Tomorrow, 5:30 PM',
      icon: <BookOpen className="text-lovable-green" />,
    },
  ];
  
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="bg-blue-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Adventurer!</h1>
                <p className="text-gray-600">Ready to continue your learning journey today?</p>
                
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Trophy size={18} className="text-lovable-yellow" />
                    <span className="text-sm text-gray-600">Level 5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={18} className="text-lovable-yellow" />
                    <span className="text-sm text-gray-600">240 Points</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={18} className="text-lovable-green" />
                    <span className="text-sm text-gray-600">12 Quests Completed</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <BuddyBot size="lg" expression="excited" />
                <div className="bg-white rounded-lg p-3 shadow-md max-w-xs">
                  <p className="text-sm text-gray-700">
                    You're doing great! Ready to finish your Math quest today?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {['overview', 'lessons', 'achievements', 'family', 'tutors'].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab 
                      ? 'border-lovable-blue text-lovable-blue' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Continue Learning</h2>
                    <Button variant="ghost" size="sm" className="gap-2">
                      View All
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentLessons.map((lesson) => (
                      <Card key={lesson.id} className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
                          <img 
                            src={lesson.image} 
                            alt={lesson.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge 
                            variant={
                              lesson.subject === 'Math' ? "default" : 
                              lesson.subject === 'Language' ? "secondary" : 
                              "outline"
                            }
                            className="mb-2"
                          >
                            {lesson.subject}
                          </Badge>
                          <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock size={14} className="mr-1" /> {lesson.duration}
                              </span>
                              <span>{lesson.progress}% complete</span>
                            </div>
                            
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-lovable-blue rounded-full"
                                style={{ width: `${lesson.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full mt-4 rounded-lg" 
                            size="sm"
                          >
                            Continue
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-4">Quick Tools</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: <Camera size={24} />, title: 'Homework Scanner', color: 'bg-lovable-purple text-white' },
                      { icon: <MessageCircle size={24} />, title: 'Ask Buddy', color: 'bg-lovable-blue text-white' },
                      { icon: <BarChart size={24} />, title: 'Progress Report', color: 'bg-lovable-green text-white' },
                      { icon: <Calendar size={24} />, title: 'Schedule Session', color: 'bg-lovable-orange text-white' },
                    ].map((tool, index) => (
                      <Card key={index} className="h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-3`}>
                            {tool.icon}
                          </div>
                          <h3 className="font-medium text-sm">{tool.title}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Recent Achievements</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-bold text-sm">{achievement.title}</h3>
                              {achievement.isNew && (
                                <Badge className="ml-2">New</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Upcoming Events</h2>
                    <Button variant="ghost" size="sm">View Calendar</Button>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            {event.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-sm">{event.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                          </div>
                          <Button size="sm" variant="outline" className="rounded-full">
                            Join
                          </Button>
                        </div>
                      ))}
                      
                      {upcomingEvents.length === 0 && (
                        <div className="text-center py-4">
                          <p className="text-gray-500">No upcoming events</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold">Family Activity</h2>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h3 className="font-bold text-lg mb-2">Weekend Challenge</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Cook with Mom or Dad and practice measurement math!
                      </p>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab !== 'overview' && (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
              <p className="text-gray-600">
                The {activeTab} section is under development. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
