
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { BookOpen, MapPin, Star, Clock, GraduationCap, Video, Calendar } from 'lucide-react';
import BookingForm from './BookingForm';

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

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {/* Tutor intro section */}
          <div className="p-6 md:col-span-2 lg:col-span-3">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16 border-2 border-lovable-blue">
                <AvatarImage src={tutor.profileImage} />
                <AvatarFallback>{getInitials(tutor.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{tutor.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="#f59e0b" />
                      <span className="font-medium">{tutor.rating.toFixed(1)}</span>
                      <span className="text-gray-500 mx-2">•</span>
                      <MapPin className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-gray-600">{tutor.location}</span>
                      <span className="text-gray-500 mx-2">•</span>
                      <Clock className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-gray-600">{tutor.experience} years exp.</span>
                    </div>
                  </div>

                  {tutor.videoUrl && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <Video className="h-4 w-4 text-lovable-purple" />
                          <span>Watch Intro</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Introduction by {tutor.name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <AspectRatio ratio={16 / 9}>
                            <video
                              src={tutor.videoUrl}
                              controls
                              className="rounded-md object-cover w-full h-full"
                            />
                          </AspectRatio>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {subject}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Tabs defaultValue="about">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                      <TabsTrigger value="results">Results</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="mt-3">
                      <p className="text-gray-700">
                        Experienced tutor specializing in {tutor.subjects.join(', ')} with {tutor.experience} years of teaching experience. 
                        Available in {tutor.location} for home tutoring.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="qualifications" className="mt-3">
                      <ul className="space-y-1">
                        {tutor.qualifications.map((qual, idx) => (
                          <li key={idx} className="flex items-start">
                            <GraduationCap className="h-4 w-4 text-lovable-blue mt-1 mr-2 flex-shrink-0" />
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="results" className="mt-3">
                      <p className="text-gray-700">{tutor.successStories}</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking section */}
          <div className="bg-blue-50 p-6 flex flex-col">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-lovable-blue">₹{tutor.hourlyRate}/hr</div>
              <div className="text-sm text-gray-600">Available {tutor.availability.length} days/week</div>
            </div>
            
            <Button 
              onClick={() => setIsBookingOpen(true)} 
              className="bg-lovable-blue hover:bg-lovable-purple mb-3"
            >
              Book Now
            </Button>
            
            <Link to={`/book-tutors/${tutor.id}`}>
              <Button variant="outline" className="w-full">
                View Full Profile
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
      
      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Session with {tutor.name}</DialogTitle>
          </DialogHeader>
          <Separator />
          <BookingForm tutor={tutor} onSuccess={() => setIsBookingOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TutorCard;
