
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tutorApi } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import BookingForm from '@/components/Tutors/BookingForm';
import { Tutor } from '@/components/Tutors/TutorsList';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  GraduationCap, 
  Video, 
  BookOpen, 
  Award, 
  Users,
  ArrowLeft
} from 'lucide-react';

const TutorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  
  const { data: tutor, isLoading, error } = useQuery<Tutor>({
    queryKey: ['tutor', id],
    queryFn: () => tutorApi.getTutorById(id || ''),
    enabled: !!id
  });
  
  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'T';
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">Loading tutor profile...</div>
      </div>
    );
  }
  
  if (error || !tutor) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-4">
            Error loading tutor profile
          </h2>
          <Link to="/book-tutors">
            <Button>Back to Tutors</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <Link to="/book-tutors" className="inline-flex items-center text-lovable-blue hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Tutors
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tutor Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-lovable-blue">
                  <AvatarImage src={tutor.profileImage} />
                  <AvatarFallback>{getInitials(tutor.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{tutor.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="#f59e0b" />
                      <span className="font-medium">{tutor.rating.toFixed(1)}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-gray-600">{tutor.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-gray-600">{tutor.experience} years experience</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {tutor.videoUrl && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Watch Intro Video</span>
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
            </CardContent>
          </Card>
          
          {/* Tutor Details */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">About {tutor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Experienced tutor specializing in {tutor.subjects.join(', ')} with {tutor.experience} years of teaching experience. 
                    Available in {tutor.location} for home tutoring.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 text-lovable-purple mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Teaching Subjects</h4>
                        <p className="text-gray-600">{tutor.subjects.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-gray-600">{tutor.location}, Delhi</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Availability</h4>
                        <p className="text-gray-600">{tutor.availability.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Student Age Groups</h4>
                        <p className="text-gray-600">Classes 6-12</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="qualifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Qualifications & Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {tutor.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-start">
                        <GraduationCap className="h-5 w-5 text-lovable-blue mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{qual}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teaching" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Teaching Approach & Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      Student Success Stories
                    </h3>
                    <p className="text-gray-700">{tutor.successStories}</p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Teaching Methods</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-lovable-blue flex items-center justify-center text-white text-xs mr-3">
                          1
                        </div>
                        <p>Personalized learning plan for each student</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-lovable-blue flex items-center justify-center text-white text-xs mr-3">
                          2
                        </div>
                        <p>Focus on building strong fundamentals</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-lovable-blue flex items-center justify-center text-white text-xs mr-3">
                          3
                        </div>
                        <p>Regular practice tests and assessments</p>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-lovable-blue flex items-center justify-center text-white text-xs mr-3">
                          4
                        </div>
                        <p>Homework help and exam preparation</p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Parent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        name: "Deepa Sharma",
                        rating: 5,
                        comment: "Excellent teacher! My son's grades improved significantly after just a few sessions."
                      },
                      {
                        name: "Rahul Kapoor",
                        rating: 4,
                        comment: "Very knowledgeable and patient. Makes complex topics easy to understand."
                      },
                      {
                        name: "Priya Mehta",
                        rating: 5,
                        comment: "Highly recommended! Very professional and really connects with the students."
                      }
                    ].map((review, idx) => (
                      <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Book a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-lovable-blue mb-1">₹{tutor.hourlyRate}/hr</div>
                <p className="text-gray-600">Professional home tutoring</p>
              </div>
              
              <Button 
                onClick={() => setIsBookingOpen(true)} 
                className="w-full bg-lovable-blue hover:bg-lovable-purple mb-4"
              >
                Book Now
              </Button>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-lovable-blue" />
                  Available Days
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.availability.map((day, idx) => (
                    <Badge key={idx} variant="outline" className="bg-white">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Need help with booking or have questions about our tutors?
              </p>
              <Button variant="outline" className="w-full">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
    </div>
  );
};

export default TutorProfile;
