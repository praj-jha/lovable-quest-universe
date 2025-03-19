
import React from 'react';
import RegionalLanguageSupport from '@/components/India/RegionalLanguageSupport';
import PhysicalDigitalWorksheets from '@/components/India/PhysicalDigitalWorksheets';
import MythologicalLearning from '@/components/India/MythologicalLearning';
import ParentCoLearning from '@/components/India/ParentCoLearning';
import LiteMode from '@/components/India/LiteMode';

const IndianSpecificFeatures: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gradient-to-b from-lovable-purple/10 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">EdTech for Indian Learners</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specially designed features to address the unique needs of Indian students,
              parents, and educators across diverse learning environments.
            </p>
          </div>
          
          <div className="space-y-24">
            <LiteMode />
            <RegionalLanguageSupport />
            <PhysicalDigitalWorksheets />
            <MythologicalLearning />
            <ParentCoLearning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianSpecificFeatures;
