
import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';

const EducatorCTA = () => {
  const benefits = [
    "Free 30-day trial for teachers",
    "Special pricing for schools and districts",
    "Professional development resources included",
    "Dedicated support team for educators"
  ];

  return (
    <div className="bg-gradient-to-br from-lovable-purple/90 to-lovable-blue/90 rounded-3xl p-8 md:p-12 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your classroom?</h3>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of educators who are already using Lovable Quest to engage students and boost learning outcomes.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-xl mx-auto mb-10 text-left">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <BadgeCheck className="text-white/90 flex-shrink-0" size={20} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-lovable-purple hover:bg-gray-100">
            Request School Demo
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            View Educator Plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducatorCTA;
