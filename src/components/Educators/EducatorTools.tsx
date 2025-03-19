
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Clipboard, BarChart, Users, Settings } from 'lucide-react';

const EducatorTools = () => {
  const tools = [
    {
      id: "lesson-planner",
      name: "Lesson Planner",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Create, customize, and schedule engaging lessons aligned with curriculum standards.",
      features: [
        "Drag-and-drop lesson builder",
        "Interactive templates for different subjects",
        "Resource library with 10,000+ assets",
        "Automatic curriculum alignment"
      ],
      image: "/placeholder.svg"
    },
    {
      id: "classroom-manager",
      name: "Classroom Manager",
      icon: <Users className="w-5 h-5" />,
      description: "Manage student groups, track participation, and organize classroom activities efficiently.",
      features: [
        "Student grouping tools",
        "Behavior tracking system",
        "Attendance monitoring",
        "Parent communication portal"
      ],
      image: "/placeholder.svg"
    },
    {
      id: "assessment-tools",
      name: "Assessment Tools",
      icon: <Clipboard className="w-5 h-5" />,
      description: "Create quizzes, tests, and assignments with automatic grading and detailed feedback.",
      features: [
        "Custom quiz builder",
        "Auto-grading system",
        "Question bank with 50,000+ items",
        "Detailed feedback generation"
      ],
      image: "/placeholder.svg"
    },
    {
      id: "analytics-dashboard",
      name: "Analytics Dashboard",
      icon: <BarChart className="w-5 h-5" />,
      description: "Monitor student progress, identify learning gaps, and track classroom performance.",
      features: [
        "Individual student reports",
        "Class-wide performance trends",
        "Subject mastery visualization",
        "Custom report generation"
      ],
      image: "/placeholder.svg"
    }
  ];

  return (
    <Tabs defaultValue="lesson-planner" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
        {tools.map(tool => (
          <TabsTrigger 
            key={tool.id} 
            value={tool.id}
            className="flex items-center gap-2 py-3"
          >
            {tool.icon}
            <span className="hidden md:inline">{tool.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tools.map(tool => (
        <TabsContent key={tool.id} value={tool.id} className="border-none p-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">{tool.name}</h3>
              <p className="text-gray-600 mb-6">{tool.description}</p>
              
              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      {index + 1}
                    </Badge>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4 mt-6">
                <Button>Try It Now</Button>
                <Button variant="outline">Watch Demo</Button>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-xl aspect-video overflow-hidden order-1 md:order-2">
              <img
                src={tool.image}
                alt={`${tool.name} preview`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default EducatorTools;
