
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/Hero/HeroSection';
import FeaturesSection from '@/components/Features/FeaturesSection';
import EnhancedKingdomMap from '@/components/Kingdom/EnhancedKingdomMap';
import ForEducatorsSection from '@/components/Educators/ForEducatorsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BuddyBot from '@/components/Buddy/BuddyBot';
import { Users, Video, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Experience Components Section */}
      <section className="py-10 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Your <span className="text-gradient-orange-yellow">Learning Adventure</span> Today
            </h2>
            <p className="text-lg text-gray-600">
              Explore our key features and see what makes Lovable Quest special for students, families, and educators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Link to="/dashboard" className="block">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-lovable-blue">
                    <BookOpen size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Student Dashboard</h3>
                  <p className="text-gray-600 flex-grow">
                    Interactive lessons, achievements, and personalized learning journeys for students.
                  </p>
                  
                  <Button className="mt-4 w-full gap-2">
                    Explore Dashboard
                    <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/family" className="block">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-lovable-purple">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <Badge className="bg-lovable-purple shadow-lg">New!</Badge>
                </div>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 text-lovable-purple">
                    <Users size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Family Learning Mode</h3>
                  <p className="text-gray-600 flex-grow">
                    Collaborative quests, family activities, and exciting challenges to learn together.
                  </p>
                  
                  <Button className="mt-4 w-full gap-2">
                    Join Family Mode
                    <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/parent-analytics" className="block">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 text-green-600">
                    <ChartBar size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Parent Analytics</h3>
                  <p className="text-gray-600 flex-grow">
                    Detailed insights, progress tracking and personalized recommendations for parents.
                  </p>
                  
                  <Button className="mt-4 w-full gap-2">
                    View Analytics
                    <ArrowRight size={16} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Kingdom Map Section */}
      <section id="kingdom-map" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Interactive Universe</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore the <span className="text-gradient-blue-green">Lovable Kingdom Map</span>
            </h2>
            <p className="text-lg text-gray-600">
              Navigate through themed zones like Fractions Forest, Grammar Galaxy, and Science Savannah. Complete missions, unlock new areas, and build your knowledge empire!
            </p>
          </div>
          
          <EnhancedKingdomMap />
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
              
              <Link to="/family">
                <Button className="mt-8 rounded-full" size="lg">
                  Try Family Mode
                </Button>
              </Link>
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
                              activity.difficulty === "Easy" ? "secondary" : 
                              activity.difficulty === "Medium" ? "outline" : 
                              "default"
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
      <ForEducatorsSection />
      
      {/* Pricing & CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Pricing Plans</Badge>
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
                    <Badge className="shadow-lg">Most Popular</Badge>
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
                    className="w-full rounded-full" 
                    variant={plan.popular ? 'default' : 'outline'}
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
              className="border-white text-white hover:bg-white hover:text-lovable-purple rounded-full"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-lovable-purple hover:bg-gray-100 rounded-full"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const BookOpen = (props: React.ComponentProps<typeof Users>) => {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
};

const ChartBar = (props: React.ComponentProps<typeof Users>) => {
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
      <rect x="3" y="12" width="6" height="8" rx="1"></rect>
      <rect x="9" y="8" width="6" height="12" rx="1"></rect>
      <rect x="15" y="4" width="6" height="16" rx="1"></rect>
      <path d="M4 20h16"></path>
    </svg>
  );
};

export default Index;
