
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const EducatorTestimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Elementary School Teacher, 15 years experience",
      image: "/placeholder.svg",
      quote: "Lovable Quest has transformed my classroom. Students who once struggled with math concepts are now excited to learn through the interactive games and challenges.",
      stars: 5
    },
    {
      name: "Prof. David Chen",
      role: "Middle School Science Educator",
      image: "/placeholder.svg",
      quote: "The Science Adventure zone provides perfect visualizations for complex concepts. My students' test scores have improved by 27% since implementing Lovable Quest.",
      stars: 5
    },
    {
      name: "Ms. Rebecca Taylor",
      role: "Special Education Specialist",
      image: "/placeholder.svg",
      quote: "I appreciate how customizable the platform is for different learning needs. It's been wonderful to finally have digital resources that work for ALL my students.",
      stars: 4
    }
  ];

  return (
    <div className="space-y-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border border-gray-200">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{testimonial.role}</p>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EducatorTestimonials;
