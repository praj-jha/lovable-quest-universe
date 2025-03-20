import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, BookOpen, Calculator, Atom, Globe, Music, PenTool } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarOption {
  id: string;
  src: string;
  name: string;
}

interface SubjectOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface GradeOption {
  id: string;
  name: string;
}

const OnboardingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm();
  const { updateProfile } = useAuth();

  // For simplicity, we're using placeholder image URLs
  // In a real implementation, you would use actual avatar images
  const placeholderAvatars = [
    { id: 'avatar1', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=fox', name: 'Fox' },
    { id: 'avatar2', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bear', name: 'Bear' },
    { id: 'avatar3', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=penguin', name: 'Penguin' },
    { id: 'avatar4', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=rabbit', name: 'Rabbit' },
    { id: 'avatar5', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=lion', name: 'Lion' },
    { id: 'avatar6', src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=tiger', name: 'Tiger' },
  ];

  // Subject options
  const subjectOptions: SubjectOption[] = [
    { id: 'math', name: 'Math', icon: <Calculator />, color: 'bg-blue-100 text-blue-600' },
    { id: 'english', name: 'English', icon: <BookOpen />, color: 'bg-green-100 text-green-600' },
    { id: 'science', name: 'Science', icon: <Atom />, color: 'bg-purple-100 text-purple-600' },
    { id: 'socialStudies', name: 'Social Studies', icon: <Globe />, color: 'bg-orange-100 text-orange-600' },
    { id: 'art', name: 'Art', icon: <PenTool />, color: 'bg-pink-100 text-pink-600' },
    { id: 'music', name: 'Music', icon: <Music />, color: 'bg-yellow-100 text-yellow-600' },
  ];

  // Grade options
  const gradeOptions: GradeOption[] = [
    { id: 'grade1', name: 'Grade 1' },
    { id: 'grade2', name: 'Grade 2' },
    { id: 'grade3', name: 'Grade 3' },
    { id: 'grade4', name: 'Grade 4' },
    { id: 'grade5', name: 'Grade 5' },
  ];

  const handleSubjectToggle = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedAvatar) {
      toast({
        title: "Please select an avatar",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && !selectedGrade) {
      toast({
        title: "Please select your grade",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 3 && selectedSubjects.length === 0) {
      toast({
        title: "Please select at least one subject",
        variant: "destructive"
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    
    try {
      // Find the selected avatar object
      const avatar = placeholderAvatars.find(a => a.id === selectedAvatar)?.src || '';
      
      // Update user profile using the AuthContext
      const success = await updateProfile({
        avatar,
        preferences: {
          grade: selectedGrade,
          subjects: selectedSubjects
        }
      });
      
      if (success) {
        toast({
          title: "Setup complete!",
          description: "Your learning adventure is about to begin!",
          variant: "default"
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        throw new Error("Failed to complete setup");
      }
    } catch (error: any) {
      toast({
        title: "Setup failed",
        description: error.message || "There was a problem setting up your profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Let's Personalize Your Journey!</CardTitle>
        <CardDescription className="text-center">Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Choose your adventure buddy</h3>
                <div className="grid grid-cols-3 gap-4">
                  {placeholderAvatars.map((avatar) => (
                    <div 
                      key={avatar.id}
                      className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                        selectedAvatar === avatar.id ? 'ring-4 ring-lovable-blue rounded-xl scale-105' : ''
                      }`}
                      onClick={() => setSelectedAvatar(avatar.id)}
                    >
                      <div className="rounded-xl overflow-hidden bg-gray-50 aspect-square flex items-center justify-center">
                        <img 
                          src={avatar.src} 
                          alt={avatar.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center mt-2 font-medium text-sm">{avatar.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">What grade are you in?</h3>
                <div className="grid grid-cols-3 gap-4">
                  {gradeOptions.map((grade) => (
                    <div 
                      key={grade.id}
                      className={`relative cursor-pointer transition-all p-4 rounded-xl border-2 ${
                        selectedGrade === grade.id 
                          ? 'border-lovable-blue bg-blue-50' 
                          : 'border-gray-200 hover:border-lovable-blue/50'
                      }`}
                      onClick={() => setSelectedGrade(grade.id)}
                    >
                      <p className="text-center font-medium">{grade.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">What subjects are you interested in?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {subjectOptions.map((subject) => (
                    <div 
                      key={subject.id}
                      className={`relative cursor-pointer transition-all p-4 rounded-xl border-2 ${
                        selectedSubjects.includes(subject.id) 
                          ? 'border-lovable-blue bg-blue-50' 
                          : 'border-gray-200 hover:border-lovable-blue/50'
                      }`}
                      onClick={() => handleSubjectToggle(subject.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${subject.color} flex items-center justify-center`}>
                          {subject.icon}
                        </div>
                        <p className="font-medium">{subject.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={step === 1 || isLoading}
        >
          Back
        </Button>
        <Button 
          onClick={nextStep}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : step === 3 ? "Complete Setup" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingForm;
