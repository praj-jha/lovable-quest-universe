
import React from 'react';
import { Book, Clock, Users, Award, BadgeCheck, BarChart3, Globe, Smartphone, Download, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EducatorFeatures = () => {
  const features = [
    {
      icon: <Book className="text-lovable-purple" size={24} />,
      title: "Indian Curriculum-Aligned Content",
      description: "Access thousands of ready-to-use lessons aligned with NCERT, CBSE, ICSE, and state board standards across all subjects."
    },
    {
      icon: <Languages className="text-lovable-green" size={24} />,
      title: "Multilingual Support",
      description: "Content available in 12+ Indian languages including Hindi, Tamil, Telugu, Bengali, Marathi, and more for inclusive teaching."
    },
    {
      icon: <Clock className="text-lovable-blue" size={24} />,
      title: "Time-Saving Tools",
      description: "Automated grading, progress tracking, and lesson planning tools that save you valuable time in busy Indian classrooms."
    },
    {
      icon: <Users className="text-lovable-orange" size={24} />,
      title: "Collaborative Learning",
      description: "Foster teamwork with culturally relevant group activities and interactive challenges for diverse learning environments."
    },
    {
      icon: <Download className="text-lovable-teal" size={24} />,
      title: "Offline Teaching Mode",
      description: "Download teaching materials in advance to use without internet - perfect for schools with connectivity challenges."
    },
    {
      icon: <Award className="text-lovable-pink" size={24} />,
      title: "Personalized Learning Paths",
      description: "Customize learning journeys for each student based on their unique needs, abilities, and regional learning context."
    },
    {
      icon: <BadgeCheck className="text-lovable-green" size={24} />,
      title: "Professional Development",
      description: "Access workshops, webinars, and resources in multiple languages to enhance your teaching skills and methodology."
    },
    {
      icon: <BarChart3 className="text-lovable-blue" size={24} />,
      title: "Comprehensive Analytics",
      description: "Get detailed insights into student performance, engagement, and progress over time with easy-to-understand visualizations."
    },
    {
      icon: <Smartphone className="text-lovable-purple" size={24} />,
      title: "Parent Communication System",
      description: "Send updates to parents via WhatsApp in their preferred language - no app installation required for busy parents."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Features for Indian Educators</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tools designed specifically for Indian teaching contexts, from urban private schools to rural government institutions.
        </p>
      </div>
      
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
      
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <Globe className="h-16 w-16 text-lovable-purple mx-auto md:mx-0 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-center md:text-left">Education for Bharat</h3>
            <p className="text-center md:text-left text-gray-600">
              Our platform bridges the digital divide by working effectively across India's diverse educational landscape.
            </p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Urban Excellence</span>
              </h4>
              <p className="text-gray-600 text-sm">
                Advanced features for well-equipped urban schools with reliable internet and device access.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Download className="h-5 w-5 text-green-500" />
                <span>Rural Resilience</span>
              </h4>
              <p className="text-gray-600 text-sm">
                Low-data, offline-first functionality designed for schools in remote areas with limited connectivity.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Languages className="h-5 w-5 text-blue-500" />
                <span>Language Inclusive</span>
              </h4>
              <p className="text-gray-600 text-sm">
                Full support for regional language medium schools with native language content and interfaces.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <BadgeCheck className="h-5 w-5 text-purple-500" />
                <span>Government Aligned</span>
              </h4>
              <p className="text-gray-600 text-sm">
                Special features for government schools, aligned with Sarva Shiksha Abhiyan and NEP 2020 guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorFeatures;
