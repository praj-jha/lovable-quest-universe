
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Video, 
  FileText, 
  Clock, 
  Star, 
  ArrowRight,
  BookOpen,
  Award,
  Smartphone,
  CheckCircle,
  PlusCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { familyQuestsData } from '../Family/QuestData';

const ParentCoLearning: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('today');
  
  // Sample parent schedule for the co-learning feature
  const schedule = {
    today: [
      {
        id: 'act1',
        time: '4:00 PM',
        title: 'Math Practice: Fractions',
        description: 'Help your child understand fractions using everyday objects',
        duration: '15 min',
        materials: ['Paper plate', 'Scissors'],
        completed: false,
        xp: 20
      },
      {
        id: 'act2',
        time: '7:30 PM',
        title: 'Bedtime Story Discussion',
        description: 'Read "The Lion and the Mouse" and discuss the moral of helping others',
        duration: '10 min',
        materials: ['Storybook or mobile app'],
        completed: true,
        xp: 15
      }
    ],
    thisWeek: [
      {
        id: 'act3',
        day: 'Wednesday',
        time: '5:30 PM',
        title: 'Science Observation: Weather',
        description: 'Record temperature, cloud patterns, and rainfall predictions together',
        duration: '20 min',
        materials: ['Notebook', 'Thermometer (optional)'],
        completed: false,
        xp: 25
      },
      {
        id: 'act4',
        day: 'Thursday',
        time: 'Any time',
        title: 'Kitchen Math: Double the Recipe',
        description: 'Practice doubling ingredient measurements while making a simple recipe',
        duration: '30 min',
        materials: ['Kitchen ingredients', 'Measuring cups'],
        completed: false,
        xp: 35
      },
      {
        id: 'act5',
        day: 'Saturday',
        time: 'Morning',
        title: 'Family Quest: "Art from Waste"',
        description: 'Create art projects using recyclable materials while learning about sustainability',
        duration: '60 min',
        materials: ['Used bottles', 'Old newspapers', 'Colors'],
        completed: false,
        xp: 70
      }
    ],
    parentTips: [
      {
        id: 'tip1',
        title: 'The Magic of "I Wonder..."',
        description: 'Start questions with "I wonder..." to encourage curiosity rather than testing knowledge',
        category: 'Communication Strategy'
      },
      {
        id: 'tip2',
        title: 'Praise the Process, Not Just Results',
        description: 'Say "I noticed how hard you worked on that" instead of just "Good job"',
        category: 'Positive Reinforcement'
      },
      {
        id: 'tip3',
        title: 'Learning While Commuting',
        description: 'Turn travel time into learning time with simple conversation games about surroundings',
        category: 'Everyday Learning'
      }
    ]
  };
  
  const handleCompleteActivity = (activityId: string) => {
    toast({
      title: "Activity Completed!",
      description: "Great work! You've earned parent co-learning XP",
    });
  };
  
  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: "A WhatsApp notification has been sent to remind you about the scheduled activities",
    });
  };
  
  const handleScheduleCustom = () => {
    toast({
      title: "Schedule Your Own Activity",
      description: "Create a custom co-learning activity based on your child's interests",
    });
  };
  
  const featuredQuest = familyQuestsData.find(quest => quest.id === '6'); // Art from Waste
  
  return (
    <section className="py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Users className="h-16 w-16 text-lovable-purple" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Parent Co-Learning Mode</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform everyday moments into powerful learning opportunities with bite-sized
          activities that parents and children can enjoy together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-bold">Your Co-Learning Schedule</h3>
              <p className="text-gray-600">Quick activities to boost your child's learning</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleSendReminder}
              >
                <Smartphone className="h-4 w-4" />
                Send Reminder
              </Button>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={handleScheduleCustom}
              >
                <PlusCircle className="h-4 w-4" />
                Create Custom
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="today" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
              <TabsTrigger value="parentTips">Parent Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-4 pt-4">
              {schedule.today.map(activity => (
                <Card key={activity.id} className={activity.completed ? 'border-green-200 bg-green-50/50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3 items-center">
                        <div className={`p-2 rounded-full ${activity.completed ? 'bg-green-100 text-green-700' : 'bg-lovable-purple/10 text-lovable-purple'}`}>
                          {activity.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">{activity.time}</div>
                          <h4 className="font-bold">{activity.title}</h4>
                        </div>
                      </div>
                      <Badge>{activity.duration}</Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                      <div>
                        <div className="text-sm font-medium mb-1">Materials Needed:</div>
                        <div className="flex flex-wrap gap-2">
                          {activity.materials.map((material, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {!activity.completed ? (
                        <Button 
                          className="sm:self-end gap-2"
                          onClick={() => handleCompleteActivity(activity.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark Complete
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          <Star className="h-4 w-4" />
                          <span>Earned {activity.xp} XP</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {schedule.today.every(act => act.completed) && (
                <div className="text-center py-6 bg-green-50 rounded-lg border border-green-100">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-green-700">All Done for Today!</h3>
                  <p className="text-green-600 mb-4">You've completed all scheduled co-learning activities for today</p>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-green-200 text-green-700 hover:bg-green-100"
                    onClick={() => setActiveTab('thisWeek')}
                  >
                    <Calendar className="h-4 w-4" />
                    View Upcoming Activities
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="thisWeek" className="space-y-4 pt-4">
              {schedule.thisWeek.map(activity => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3 items-center">
                        <div className="p-2 rounded-full bg-lovable-purple/10 text-lovable-purple">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">{activity.day} • {activity.time}</div>
                          <h4 className="font-bold">{activity.title}</h4>
                        </div>
                      </div>
                      <Badge>{activity.duration}</Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                      <div>
                        <div className="text-sm font-medium mb-1">Materials Needed:</div>
                        <div className="flex flex-wrap gap-2">
                          {activity.materials.map((material, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="sm:self-end flex gap-2">
                        <Button variant="outline" className="gap-2">
                          <Calendar className="h-4 w-4" />
                          Reschedule
                        </Button>
                        
                        <Button variant="default" className="gap-2">
                          <BookOpen className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="parentTips" className="space-y-4 pt-4">
              {schedule.parentTips.map(tip => (
                <Card key={tip.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-3 items-start mb-3">
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-700">
                        <Star className="h-5 w-5" />
                      </div>
                      <div>
                        <Badge className="mb-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          {tip.category}
                        </Badge>
                        <h4 className="font-bold text-lg">{tip.title}</h4>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 pl-12">{tip.description}</p>
                    
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" className="gap-2 text-lovable-purple">
                        Read More Tips
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="text-center bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                <h3 className="text-lg font-bold mb-2">Parent Learning Resources</h3>
                <p className="text-gray-600 mb-4">
                  Access our library of guides, videos, and workshops designed to help you 
                  become an effective co-learning partner.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-md mx-auto mb-4">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Video className="h-3 w-3" />
                    Videos
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-3 w-3" />
                    Guides
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Workshops
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Co-Learning Progress</h3>
                <Badge className="bg-lovable-purple">Level 3</Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly XP Goal</span>
                    <span>125/200 XP</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-lovable-purple rounded-full h-2" style={{ width: '62.5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Activities Completed</span>
                    <span>5 this week</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Current Streak:</span>
                    <span className="font-bold">12 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Activities:</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Co-Learning Time:</span>
                    <span className="font-bold">9.5 hours</span>
                  </div>
                </div>
                
                <Button className="w-full gap-2">
                  <Award className="h-4 w-4" />
                  View Parent Achievements
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {featuredQuest && (
            <Card className="border-2 border-purple-200">
              <CardContent className="p-6">
                <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium inline-block mb-2">
                  FEATURED FAMILY QUEST
                </div>
                
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  {featuredQuest.icon}
                  {featuredQuest.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">{featuredQuest.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredQuest.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline">
                      {subject}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredQuest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{featuredQuest.xp} XP</span>
                  </div>
                </div>
                
                <Button className="w-full">Start Family Quest</Button>
              </CardContent>
            </Card>
          )}
          
          <div className="bg-lovable-purple/10 p-4 rounded-xl">
            <h3 className="font-bold text-lovable-purple mb-2">Parent Tip of the Day</h3>
            <p className="text-gray-700 text-sm mb-3">
              Learning happens everywhere! Find opportunities to count objects, read signs, 
              and discuss observations during routine activities like shopping or commuting.
            </p>
            <Button variant="link" className="p-0 h-auto text-lovable-purple text-sm">
              More Tips
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Benefits of Parent Co-Learning</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="bg-lovable-green/10 p-2 rounded-full">
                  <Award className="h-6 w-6 text-lovable-green" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">For Children</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Stronger concept understanding with parental guidance</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Higher engagement through personalized attention</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Building positive associations with learning</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Applying concepts to real-world scenarios</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="bg-lovable-blue/10 p-2 rounded-full">
                  <Award className="h-6 w-6 text-lovable-blue" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">For Parents</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Better understanding of child's curriculum</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Stronger parent-child bonds through shared activities</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Insight into child's learning strengths and challenges</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Satisfaction from direct involvement in education</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentCoLearning;
