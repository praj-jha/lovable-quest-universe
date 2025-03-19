
import React from 'react';
import ForEducatorsSection from '@/components/Educators/ForEducatorsSection';
import EducatorFeatures from '@/components/Educators/EducatorFeatures';
import EducatorTools from '@/components/Educators/EducatorTools';
import EducatorTestimonials from '@/components/Educators/EducatorTestimonials';
import EducatorCTA from '@/components/Educators/EducatorCTA';
import IndianEducatorResources from '@/components/Educators/IndianEducatorResources';
import BoardAlignmentSection from '@/components/Educators/BoardAlignmentSection';
import RegionalLanguageSupport from '@/components/India/RegionalLanguageSupport';

const ForEducators: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12 space-y-20">
        <ForEducatorsSection />
        <BoardAlignmentSection />
        <RegionalLanguageSupport />
        <EducatorFeatures />
        <IndianEducatorResources />
        <EducatorTools />
        <EducatorTestimonials />
        <EducatorCTA />
      </div>
    </div>
  );
};

export default ForEducators;
