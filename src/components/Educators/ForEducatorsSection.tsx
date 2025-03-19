
import React from 'react';
import { Badge } from '@/components/ui/badge';
import EducatorFeatures from './EducatorFeatures';
import EducatorTools from './EducatorTools';
import EducatorTestimonials from './EducatorTestimonials';
import EducatorCTA from './EducatorCTA';

const ForEducatorsSection = () => {
  return (
    <section id="for-educators" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">For Educators</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empower your teaching with <span className="text-gradient-pink-purple">powerful tools</span>
          </h2>
          <p className="text-lg text-gray-600">
            Lovable Quest helps educators create engaging learning experiences, 
            save time with automated tasks, and gain valuable insights into student progress.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="mb-20">
          <EducatorFeatures />
        </div>
        
        {/* Tools Tabs Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore our Educator Tools
            </h2>
            <p className="text-gray-600">
              Our comprehensive suite of teaching tools designed to make your classroom more engaging and effective.
            </p>
          </div>
          <EducatorTools />
        </div>
        
        {/* Testimonials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Trusted by educators worldwide
            </h2>
            <p className="text-gray-600 mb-6">
              Hear what other teachers and educational professionals say about their experience with Lovable Quest.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 px-4 py-2 rounded-full">
                <span className="font-bold text-lovable-blue">4.8/5</span>
                <span className="text-sm text-gray-500 ml-2">Average rating</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-full">
                <span className="font-bold text-lovable-blue">50,000+</span>
                <span className="text-sm text-gray-500 ml-2">Teachers</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <EducatorTestimonials />
          </div>
        </div>
        
        {/* Resources Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Free Educational Resources
            </h2>
            <p className="text-gray-600">
              Browse our library of lesson plans, worksheets, and teaching guides designed by expert educators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Digital Literacy Lesson Pack",
                type: "Lesson Plan",
                grades: "3-5",
                downloads: "4.2k"
              },
              {
                title: "STEM Project Ideas for Middle School",
                type: "Activity Guide",
                grades: "6-8",
                downloads: "3.8k"
              },
              {
                title: "Inclusive Teaching Strategies",
                type: "Teacher Guide",
                grades: "All",
                downloads: "5.6k"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <Badge variant="outline" className="mb-4">{resource.type}</Badge>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                  <span>Grades: {resource.grades}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                <button className="text-lovable-blue font-medium hover:underline text-sm">
                  Download Resource →
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <EducatorCTA />
      </div>
    </section>
  );
};

export default ForEducatorsSection;
