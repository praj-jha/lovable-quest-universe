
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  BookOpen, 
  MapPin, 
  GraduationCap, 
  Clock 
} from 'lucide-react';

const TutorSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subject, setSubject] = useState(searchParams.get('subject') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [experience, setExperience] = useState([parseInt(searchParams.get('expMin') || '0'), parseInt(searchParams.get('expMax') || '20')]);
  const [grade, setGrade] = useState(searchParams.get('grade') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newParams = new URLSearchParams();
    if (subject) newParams.set('subject', subject);
    if (location) newParams.set('location', location);
    newParams.set('expMin', experience[0].toString());
    newParams.set('expMax', experience[1].toString());
    if (grade) newParams.set('grade', grade);
    
    setSearchParams(newParams);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Search className="mr-2 h-5 w-5 text-lovable-blue" />
          Find Tutors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-lovable-purple" />
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Math, Science, English..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-red-500" />
              Area in Delhi
            </Label>
            <Input
              id="location"
              placeholder="South Delhi, Dwarka..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grade" className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-green-600" />
              Grade/Class
            </Label>
            <Input
              id="grade"
              placeholder="6th, 10th, 12th..."
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-yellow-600" />
              Experience (years)
            </Label>
            <div className="pt-2 px-1">
              <Slider
                defaultValue={experience}
                min={0}
                max={20}
                step={1}
                onValueChange={(value) => setExperience(value as number[])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{experience[0]} years</span>
                <span>{experience[1]} years</span>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-lovable-blue hover:bg-lovable-purple">
            Search Tutors
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TutorSearch;
