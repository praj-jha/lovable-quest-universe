
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Printer, 
  Download, 
  QrCode, 
  FileText, 
  Sparkles, 
  BarChart3,
  Scan,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const PhysicalDigitalWorksheets: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('class3');
  const [selectedSubject, setSelectedSubject] = useState('math');

  const worksheets = [
    {
      title: "Fractions Basics",
      subject: "math",
      class: "class3",
      preview: "/placeholder.svg",
      pages: 2,
      difficulty: "Easy",
      skills: ["Basic Fractions", "Visual Representation", "Comparison"],
      digitalRewards: ["Fraction Explorer Game", "+50 XP", "Bronze Badge"]
    },
    {
      title: "Multiplication Tables 1-10",
      subject: "math",
      class: "class3",
      preview: "/placeholder.svg",
      pages: 3,
      difficulty: "Medium",
      skills: ["Multiplication", "Pattern Recognition", "Memory"],
      digitalRewards: ["Times Table Challenge", "+75 XP", "Silver Badge"]
    },
    {
      title: "Hindi Vowels & Matras",
      subject: "hindi",
      class: "class3",
      preview: "/placeholder.svg",
      pages: 4,
      difficulty: "Medium",
      skills: ["Hindi Vowels", "Matras Usage", "Word Formation"],
      digitalRewards: ["Vowel Sound Game", "+60 XP", "Language Badge"]
    },
    {
      title: "Plants & Their Parts",
      subject: "science",
      class: "class3",
      preview: "/placeholder.svg",
      pages: 2,
      difficulty: "Easy",
      skills: ["Plant Anatomy", "Labeling", "Functions"],
      digitalRewards: ["Virtual Plant Growth", "+50 XP", "Nature Badge"]
    },
    {
      title: "Addition & Subtraction",
      subject: "math",
      class: "class1",
      preview: "/placeholder.svg",
      pages: 2,
      difficulty: "Easy",
      skills: ["Basic Addition", "Basic Subtraction", "Number Sense"],
      digitalRewards: ["Number Adventure Game", "+40 XP", "Math Badge"]
    },
    {
      title: "States of India",
      subject: "social",
      class: "class5",
      preview: "/placeholder.svg",
      pages: 3,
      difficulty: "Medium",
      skills: ["Geography", "Map Reading", "States & Capitals"],
      digitalRewards: ["India Explorer Game", "+70 XP", "Geography Badge"]
    },
  ];

  const filteredWorksheets = worksheets.filter(
    ws => (selectedClass === 'all' || ws.class === selectedClass) && 
         (selectedSubject === 'all' || ws.subject === selectedSubject)
  );

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'class1', label: 'Class 1' },
    { value: 'class2', label: 'Class 2' },
    { value: 'class3', label: 'Class 3' },
    { value: 'class4', label: 'Class 4' },
    { value: 'class5', label: 'Class 5' },
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'social', label: 'Social Studies' },
  ];

  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Printer className="h-16 w-16 text-lovable-blue" />
            <div className="absolute -right-2 -bottom-2 bg-lovable-purple text-white p-1 rounded-full">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Physical-Digital Worksheets</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Blend traditional pen-and-paper learning with digital rewards and tracking.
          Print low-ink worksheets, complete them offline, and scan to unlock digital experiences.
        </p>
      </div>

      <Tabs defaultValue="browse" className="w-full mb-10">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="browse">Browse Worksheets</TabsTrigger>
          <TabsTrigger value="how">How It Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Class</label>
                  <select 
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    {classOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                  <select 
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjectOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorksheets.length > 0 ? (
                  filteredWorksheets.map((worksheet, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[4/5] bg-gray-100 relative">
                        <img 
                          src={worksheet.preview} 
                          alt={worksheet.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge 
                            className={`
                              ${worksheet.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                                worksheet.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}
                            `}
                          >
                            {worksheet.difficulty}
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="text-white font-bold">{worksheet.title}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm">
                              {
                                worksheet.class === 'class1' ? 'Class 1' :
                                worksheet.class === 'class2' ? 'Class 2' :
                                worksheet.class === 'class3' ? 'Class 3' :
                                worksheet.class === 'class4' ? 'Class 4' :
                                'Class 5'
                              }
                            </span>
                            <span className="text-white/80 text-sm">
                              {worksheet.pages} page{worksheet.pages > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium">Skills Covered:</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {worksheet.skills.map((skill, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Digital Rewards:</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {worksheet.digitalRewards.map((reward, i) => (
                                <Badge key={i} variant="outline" className="bg-purple-50 text-xs">
                                  {reward}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
                        <Button size="sm" variant="outline" className="text-xs flex gap-1">
                          <QrCode className="h-3 w-3" />
                          Preview
                        </Button>
                        <Button size="sm" className="text-xs flex gap-1">
                          <Printer className="h-3 w-3" />
                          Print
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p>No worksheets found with the selected filters.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSelectedClass('all');
                        setSelectedSubject('all');
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="how" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
            <h3 className="text-2xl font-bold mb-6 text-center">How Physical-Digital Worksheets Work</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Printer className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold mb-2">1. Print</h4>
                <p className="text-gray-600">
                  Download and print low-ink worksheets directly from our platform.
                  Each worksheet includes a unique QR code.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold mb-2">2. Complete</h4>
                <p className="text-gray-600">
                  Students complete the worksheet with pen or pencil,
                  reducing screen time while maintaining engagement.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Scan className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-2">3. Scan & Unlock</h4>
                <p className="text-gray-600">
                  Scan the completed worksheet to automatically grade it,
                  track progress, and unlock digital rewards and games.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Benefits for Indian Students & Parents</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold">Reduced Screen Time</h5>
                    <p className="text-gray-600">
                      Limits digital device usage while maintaining educational engagement
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold">Works Offline</h5>
                    <p className="text-gray-600">
                      Perfect for areas with limited internet connectivity or device access
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold">NCERT & Board Aligned</h5>
                    <p className="text-gray-600">
                      Content follows CBSE, ICSE, and state board curriculum guidelines
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold">Progress Tracking</h5>
                    <p className="text-gray-600">
                      Parents receive detailed analytics on child's performance areas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold">Low Resource Requirement</h5>
                    <p className="text-gray-600">
                      Low-ink designs minimize printing costs for budget-conscious families
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold">Gamification Benefits</h5>
                    <p className="text-gray-600">
                      Combines traditional practice with motivating digital rewards
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Try Sample Worksheet Bundle
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

// Add missing CheckCircle component if not already defined elsewhere
const CheckCircle = (props: React.ComponentProps<typeof Printer>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

export default PhysicalDigitalWorksheets;
