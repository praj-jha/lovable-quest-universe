
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  Award, 
  Star, 
  Calendar,
  CheckCircle,
  SmartphoneCharging,
  Timer,
  Sparkles
} from 'lucide-react';

const ParentCoLearning: React.FC = () => {
  const familyActivities = [
    {
      title: "Kitchen Science Lab",
      category: "Science",
      description: "Turn your kitchen into a science lab with simple experiments using everyday ingredients.",
      duration: "30 mins",
      difficulty: "Easy",
      materials: ["Baking soda", "Vinegar", "Food coloring", "Common kitchen items"],
      benefits: ["Applied science", "Observation skills", "Cause & effect"],
      digitalRewards: "Science Explorer Badge + 100 XP",
      offline: true
    },
    {
      title: "Market Math Challenge",
      category: "Mathematics",
      description: "Practice math skills during your next trip to the local market or grocery store.",
      duration: "45 mins",
      difficulty: "Medium",
      materials: ["Shopping list", "Calculator (optional)", "Notebook"],
      benefits: ["Real-world math", "Budgeting skills", "Mental calculation"],
      digitalRewards: "Math Whiz Badge + 120 XP",
      offline: true
    },
    {
      title: "Family Story Relay",
      category: "Language",
      description: "Create a story together where each family member adds a part, practicing narrative skills.",
      duration: "20 mins",
      difficulty: "Easy",
      materials: ["Imagination", "Paper & pencil (optional)"],
      benefits: ["Creativity", "Listening skills", "Narrative development"],
      digitalRewards: "Storyteller Badge + 90 XP", 
      offline: true
    },
    {
      title: "Heritage Photo Project",
      category: "Social Studies",
      description: "Document family heritage and local history through photos and interviews.",
      duration: "60 mins",
      difficulty: "Medium",
      materials: ["Camera/smartphone", "Family photos", "Interview questions"],
      benefits: ["Cultural awareness", "Interview skills", "Digital organization"],
      digitalRewards: "Heritage Keeper Badge + 150 XP",
      offline: false
    },
    {
      title: "Weekend Nature Journal",
      category: "Environmental Studies",
      description: "Observe and document plants and animals in your neighborhood or nearby park.",
      duration: "40 mins",
      difficulty: "Easy",
      materials: ["Notebook", "Pencils/colors", "Magnifying glass (optional)"],
      benefits: ["Observation skills", "Classification", "Environmental awareness"],
      digitalRewards: "Nature Explorer Badge + 110 XP",
      offline: true
    },
    {
      title: "Family Fitness Challenge",
      category: "Physical Education",
      description: "Complete a series of fun physical activities together as a family team.",
      duration: "30 mins",
      difficulty: "Medium",
      materials: ["Open space", "Basic household items"],
      benefits: ["Physical activity", "Teamwork", "Motor skills"],
      digitalRewards: "Active Family Badge + 100 XP",
      offline: true
    }
  ];

  return (
    <section className="py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Users className="h-16 w-16 text-lovable-green" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Parent Co-Learning Mode</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Strengthen family bonds while boosting learning outcomes with activities designed 
          for parents and children to enjoy together.
        </p>
      </div>

      <Tabs defaultValue="activities" className="w-full mb-10">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="activities">Family Activities</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="weekend">Weekend Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {familyActivities.map((activity, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className={`p-4 ${
                  activity.category === 'Science' ? 'bg-blue-500' :
                  activity.category === 'Mathematics' ? 'bg-purple-500' :
                  activity.category === 'Language' ? 'bg-yellow-500' :
                  activity.category === 'Social Studies' ? 'bg-green-500' :
                  activity.category === 'Environmental Studies' ? 'bg-teal-500' :
                  'bg-red-500'
                } text-white`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{activity.title}</h3>
                    {activity.offline && (
                      <Badge className="bg-white/20 hover:bg-white/30">
                        Offline
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm opacity-90">{activity.category}</div>
                </div>
                
                <CardContent className="p-4">
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4 text-gray-500" />
                      <span>{activity.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Materials Needed:</h4>
                    <div className="flex flex-wrap gap-1">
                      {activity.materials.map((material, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Educational Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {activity.benefits.map((benefit, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50 text-xs text-blue-700">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 bg-purple-50 p-2 rounded">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-purple-700">{activity.digitalRewards}</span>
                  </div>
                  
                  <Button className="w-full">Start Family Activity</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="benefits" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Benefits for Children
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Deeper Learning</h4>
                      <p className="text-gray-600">
                        When parents participate, children retain concepts better and develop deeper understanding
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Increased Confidence</h4>
                      <p className="text-gray-600">
                        Learning alongside parents in a safe space builds academic confidence
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Cultural Connection</h4>
                      <p className="text-gray-600">
                        Activities integrate Indian cultural elements, strengthening identity and heritage
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Reduced Screen Time</h4>
                      <p className="text-gray-600">
                        Offline activities provide educational benefits without excessive device usage
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  Benefits for Parents
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Insight Into Learning</h4>
                      <p className="text-gray-600">
                        Direct involvement gives parents visibility into what and how their child is learning
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Quality Family Time</h4>
                      <p className="text-gray-600">
                        Educational activities create meaningful bonding opportunities beyond entertainment
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Progress Tracking</h4>
                      <p className="text-gray-600">
                        Parents receive detailed insights about their child's strengths and growth areas
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Guidance & Support</h4>
                      <p className="text-gray-600">
                        Activities include clear instructions so parents can confidently guide learning
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 text-center">
                    <div className="relative inline-block">
                      <SmartphoneCharging className="h-24 w-24 text-lovable-purple mx-auto" />
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">+</div>
                      <div className="absolute -bottom-2 -right-2 bg-green-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">+</div>
                      <div className="absolute -bottom-2 -left-2 bg-blue-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">+</div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-3">Research-Backed Approach</h3>
                    <p className="text-gray-600 mb-4">
                      Our parent-child co-learning approach is based on extensive educational research 
                      showing that parental involvement is one of the strongest predictors of academic success, 
                      especially in the Indian educational context.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold mb-2">Key Indian Educational Research Findings:</div>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span> 
                          <span>83% of high-performing Indian students report regular parent involvement in studies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span> 
                          <span>ASER studies show 2x improvement in reading levels when parents regularly engage with learning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span> 
                          <span>NCERT recommends at least 30 minutes of daily parent-child co-learning for primary students</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="weekend" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-r from-lovable-purple to-lovable-blue text-white p-6 rounded-xl">
                    <Calendar className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Weekend Family Quests</h3>
                    <p>
                      Special weekend activities designed for the whole family to enjoy and learn together.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Sparkles className="h-5 w-5" />
                      <span className="font-bold">Double XP Rewards!</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-4">How Weekend Quests Work</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-lovable-purple text-white flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold">Quest Notification</h4>
                        <p className="text-gray-600">
                          Every Friday, a special Weekend Family Quest is released with details sent via WhatsApp and app notification
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-lovable-purple text-white flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold">Gather Materials</h4>
                        <p className="text-gray-600">
                          Simple household materials are all you need - each quest is designed to use common items found in Indian homes
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-lovable-purple text-white flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold">Complete Together</h4>
                        <p className="text-gray-600">
                          Follow the step-by-step guide to complete the activity with the whole family participating
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-lovable-purple text-white flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-bold">Document & Share</h4>
                        <p className="text-gray-600">
                          Take photos/videos of your family activity and upload them to earn Double XP and special badges
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-start gap-3">
                      <Star className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold">Family Leaderboard</h4>
                        <p className="text-gray-600 mb-2">
                          Families who complete Weekend Quests earn points on the nationwide Family Leaderboard.
                          Top families each month win special educational prizes!
                        </p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Trophy className="h-4 w-4" />
                          View Leaderboard
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">Upcoming Weekend Quests</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-green-500 text-white p-3">
                      <div className="font-bold">This Weekend</div>
                      <div className="text-sm opacity-90">Environmental Science</div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">Rainwater Harvester</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Build a simple rainwater harvesting model to learn about water conservation.
                      </p>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Available Friday
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-blue-500 text-white p-3">
                      <div className="font-bold">Next Weekend</div>
                      <div className="text-sm opacity-90">Physics</div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">Marble Run Challenge</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Create the ultimate marble run to explore gravity, momentum, and energy.
                      </p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-purple-500 text-white p-3">
                      <div className="font-bold">In Two Weeks</div>
                      <div className="text-sm opacity-90">Art & Culture</div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2">Folk Art Workshop</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Learn and create traditional Indian folk art with simple materials.
                      </p>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

// Add CheckCircle component if not already defined elsewhere
const CheckCircle = (props: React.ComponentProps<typeof Users>) => {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

export default ParentCoLearning;
