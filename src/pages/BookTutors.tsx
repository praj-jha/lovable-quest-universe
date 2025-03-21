
import React from 'react';
import TutorSearch from '@/components/Tutors/TutorSearch';
import TutorsList from '@/components/Tutors/TutorsList';
import { Separator } from '@/components/ui/separator';

const BookTutors = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Book Delhi's Best Home Tutors</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find and book qualified tutors for personalized learning experiences at your home. All tutors are background-verified and have proven track records.
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TutorSearch />
        </div>
        <div className="lg:col-span-3">
          <TutorsList />
        </div>
      </div>
    </div>
  );
};

export default BookTutors;
