
import React from 'react';
import { Book, Clock, Users, Award, BadgeCheck, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EducatorFeatures = () => {
  const features = [
    {
      icon: <Book className="text-lovable-purple" size={24} />,
      title: "Curriculum-Aligned Content",
      description: "Access thousands of ready-to-use lessons and activities aligned with national educational standards."
    },
    {
      icon: <Clock className="text-lovable-green" size={24} />,
      title: "Time-Saving Tools",
      description: "Automated grading, progress tracking, and lesson planning tools that save you valuable time."
    },
    {
      icon: <Users className="text-lovable-blue" size={24} />,
      title: "Collaborative Learning",
      description: "Foster teamwork with group activities, projects, and interactive classroom challenges."
    },
    {
      icon: <Award className="text-lovable-orange" size={24} />,
      title: "Personalized Learning Paths",
      description: "Customize learning journeys for each student based on their unique needs and abilities."
    },
    {
      icon: <BadgeCheck className="text-lovable-teal" size={24} />,
      title: "Professional Development",
      description: "Access workshops, webinars, and resources to enhance your teaching skills."
    },
    {
      icon: <BarChart3 className="text-lovable-pink" size={24} />,
      title: "Comprehensive Analytics",
      description: "Get detailed insights into student performance, engagement, and progress over time."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EducatorFeatures;
