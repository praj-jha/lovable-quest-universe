
import React from 'react';
import HeroSection from '@/components/Hero/HeroSection';
import FeaturesSection from '@/components/Features/FeaturesSection';
import KingdomMap from '@/components/Kingdom/KingdomMap';
import Card, { CardContent } from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Badge from '@/components/UI/Badge';
import BuddyBot from '@/components/Buddy/BuddyBot';
import { Users, Video, Shield, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Kingdom Map Section */}
      <section id="kingdom-map" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">Interactive Universe</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore the <span className="text-gradient-blue-green">Lovable Kingdom Map</span>
            </h2>
            <p className="text-lg text-gray-600">
              Navigate through themed zones like Fractions Forest, Grammar Galaxy, and Science Savannah. Complete missions, unlock new areas, and build your knowledge empire!
            </p>
          </div>
          
          <KingdomMap />
        </div>
      </section>
      
      {/* For Parents Section */}
      <section id="for-parents" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">For Parents</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform learning into family <span className="text-gradient-orange-yellow">bonding time</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join your child on their educational journey with custom-designed activities that make learning a shared adventure.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Users size={20} />, title: "Parent-Child Quests", description: "Weekly challenges like cooking (measurement math) or budgeting (pocket money math)." },
                  { icon: <Shield size={20} />, title: "Progress Tracking", description: "Weekly reports with actionable insights about your child's strengths and areas for growth." },
                  { icon: <CheckCircle size={20} />, title: "Safe Environment", description: "All content is age-appropriate and reviewed by educational experts." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lovable-orange">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="mt-8" size="lg" rounded="full">
                Learn More For Parents
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <BuddyBot size="md" expression="happy" />
                    <div className="flex-1 bg-blue-50 rounded-xl p-4">
                      <p className="text-gray-700">
                        Riya mastered fractions this week! Here are 3 activities you can do together to reinforce what she learned.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: "Pizza Fraction Game", time: "15 min", difficulty: "Easy" },
                      { title: "Grocery Shopping Challenge", time: "30 min", difficulty: "Medium" },
                      { title: "Recipe Halving Activity", time: "20 min", difficulty: "Medium" }
                    ].map((activity, index) => (
                      <Card key={index} className="border border-gray-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold">{activity.title}</h4>
                            <Badge variant={
                              activity.difficulty === "Easy" ? "success" : 
                              activity.difficulty === "Medium" ? "warning" : 
                              "primary"
                            }>
                              {activity.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Time: {activity.time}</p>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            View Activity
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Educators Section */}
      <section id="for-educators" className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-100 rounded-3xl transform -rotate-2"></div>
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-8">
                    <h3 className="font-bold text-xl mb-4">Teacher Dashboard Preview</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-purple-50 rounded-xl p-4">
                        <h4 className="font-bold text-lg mb-2">Class Progress</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Math</span>
                              <span className="text-xs text-gray-500">85%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-lovable-purple" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Language</span>
                              <span className="text-xs text-gray-500">72%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-lovable-blue" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Science</span>
                              <span className="text-xs text-gray-500">68%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-lovable-green" style={{ width: '68%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-lg mb-3">Lesson Plans</h4>
                        <div className="space-y-3">
                          {[
                            { title: "Fractions Fun", subject: "Math", status: "Ready" },
                            { title: "Story Structure", subject: "Language", status: "Draft" },
                            { title: "Earth's Layers", subject: "Science", status: "Ready" }
                          ].map((plan, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                              <div>
                                <h5 className="font-medium">{plan.title}</h5>
                                <p className="text-xs text-gray-500">{plan.subject}</p>
                              </div>
                              <Badge variant={plan.status === "Ready" ? "success" : "warning"}>
                                {plan.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4 border-lovable-purple text-lovable-purple">For Educators</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Powerful tools to enhance your <span className="text-gradient-pink-purple">classroom</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Integrate our platform with your curriculum to boost engagement and provide personalized learning experiences for every student.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Video size={20} />, title: "Ready-to-Use Lessons", description: "Access hundreds of standards-aligned interactive lessons across all subjects." },
                  { icon: <Users size={20} />, title: "Student Insights", description: "Get detailed analytics on each student's progress, strengths, and areas for improvement." },
                  { icon: <Shield size={20} />, title: "School Partnership", description: "Special programs for schools with custom content and premium features." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lovable-purple">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="mt-8" variant="outline" size="lg" rounded="full">
                Discover Educator Tools
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing & CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">Pricing Plans</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Find the perfect plan for your <span className="text-gradient-blue-green">child's journey</span>
            </h2>
            <p className="text-lg text-gray-600">
              Affordable options designed to fit every family's needs and budget. Start with our free trial today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "₹1,299",
                period: "/month",
                description: "Perfect for getting started with essential features",
                features: [
                  "Access to all learning zones",
                  "Progress tracking",
                  "Basic AI assistance",
                  "Limited family activities",
                ],
                buttonText: "Get Started",
                popular: false,
              },
              {
                name: "Premium",
                price: "₹1,799",
                period: "/month",
                description: "Our most popular plan for serious learners",
                features: [
                  "All Basic features",
                  "1 live tutoring session weekly",
                  "Advanced AI tutoring",
                  "Unlimited family activities",
                  "Priority support",
                ],
                buttonText: "Try Premium",
                popular: true,
              },
              {
                name: "Family",
                price: "₹2,999",
                period: "/month",
                description: "Best value for families with multiple children",
                features: [
                  "All Premium features",
                  "Support for up to 3 children",
                  "2 live tutoring sessions weekly",
                  "Custom learning paths",
                  "Parent workshop access",
                ],
                buttonText: "Choose Family",
                popular: false,
              },
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`border ${plan.popular ? 'border-lovable-blue shadow-xl' : 'border-gray-100'} relative`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge variant="primary" className="shadow-lg">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-lovable-green mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'primary' : 'outline'}
                    rounded="full"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 mb-2">All plans include a 7-day free trial. No credit card required.</p>
            <a href="#" className="text-lovable-blue hover:underline text-sm">View full comparison chart</a>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-lovable-blue to-lovable-purple text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform how your child learns?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families already experiencing the joy of learning with Lovable Quest.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-lovable-purple"
              rounded="full"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-lovable-purple hover:bg-gray-100"
              rounded="full"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
