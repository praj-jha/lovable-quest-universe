
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tutorApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import TutorCard from './TutorCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Tutor {
  id: string;
  name: string;
  profileImage: string;
  videoUrl?: string;
  qualifications: string[];
  subjects: string[];
  experience: number;
  location: string;
  rating: number;
  hourlyRate: number;
  successStories: string;
  availability: string[];
}

const TutorsList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  
  // Get search parameters
  const subject = searchParams.get('subject') || '';
  const location = searchParams.get('location') || '';
  const expMin = parseInt(searchParams.get('expMin') || '0');
  const expMax = parseInt(searchParams.get('expMax') || '20');
  const grade = searchParams.get('grade') || '';
  
  // Fetch tutors based on search params
  const { data, isLoading, error } = useQuery({
    queryKey: ['tutors', subject, location, expMin, expMax, grade, page],
    queryFn: () => tutorApi.searchTutors({
      subject,
      location,
      experienceMin: expMin,
      experienceMax: expMax,
      grade,
      page,
      limit: 6
    })
  });
  
  const tutors = data?.tutors || [];
  const totalPages = data?.totalPages || 1;
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-32 w-full rounded-md mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Failed to load tutors</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }
  
  if (tutors.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">No tutors found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your search filters to find more tutors.</p>
      </div>
    );
  }
  
  return (
    <div>
      <p className="text-gray-600 mb-4">
        Showing {tutors.length} tutors {subject && `for ${subject}`} {location && `in ${location}`}
      </p>
      
      <div className="space-y-6">
        {tutors.map((tutor: Tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <Button 
            variant="outline" 
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center px-4">
            Page {page} of {totalPages}
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default TutorsList;
