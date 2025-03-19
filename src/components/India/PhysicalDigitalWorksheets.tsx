
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Printer, 
  QrCode, 
  Download, 
  BookOpen, 
  Calculator, 
  Flask, 
  Languages, 
  FileText,
  Map
} from 'lucide-react';
import PhysicalDigitalActions from './PhysicalDigitalActions';
import { useToast } from '@/hooks/use-toast';

interface Worksheet {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  type: 'Activity' | 'Practice' | 'Assessment';
  pages: number;
  digitalComponent: string;
}

const PhysicalDigitalWorksheets: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  
  // Complete worksheet data model
  const worksheets: Worksheet[] = [
    {
      id: 'ws1',
      title: 'Addition with Regrouping',
      subject: 'Mathematics',
      grade: '2',
      description: 'Practice adding two-digit numbers with regrouping (carrying) using concrete visual aids',
      type: 'Practice',
      pages: 2,
      digitalComponent: 'Interactive number line simulation after completion'
    },
    {
      id: 'ws2',
      title: 'States of Matter Experiment',
      subject: 'Science',
      grade: '3',
      description: 'Hands-on experiment worksheet with observation tables for studying solids, liquids and gases',
      type: 'Activity',
      pages: 4,
      digitalComponent: 'Video explanation of molecular structure'
    },
    {
      id: 'ws3',
      title: 'Hindi Vocabulary Builder',
      subject: 'Hindi',
      grade: '1',
      description: 'Cut and paste activity to match Hindi words with corresponding pictures',
      type: 'Activity',
      pages: 2,
      digitalComponent: 'Audio pronunciation guide accessed via QR code'
    },
    {
      id: 'ws4',
      title: 'Multiplication Tables Practice',
      subject: 'Mathematics',
      grade: '3',
      description: 'Structured practice for multiplication tables from 2 to 10 with visual aids',
      type: 'Practice',
      pages: 3,
      digitalComponent: 'Multiplication game unlocked after completion'
    },
    {
      id: 'ws5',
      title: 'My Neighborhood Map',
      subject: 'Environmental Studies',
      grade: '2',
      description: 'Draw and label important places in your neighborhood with compass directions',
      type: 'Activity',
      pages: 1,
      digitalComponent: 'Interactive community mapping tool'
    },
    {
      id: 'ws6',
      title: 'English Phonics Patterns',
      subject: 'English',
      grade: '1',
      description: 'Practice identifying and writing common phonics patterns with cut-out letter tiles',
      type: 'Practice',
      pages: 2,
      digitalComponent: 'Audio pronunciation feedback'
    },
    {
      id: 'ws7',
      title: 'Plant Life Cycle',
      subject: 'Science',
      grade: '2',
      description: 'Observe and document plant growth with seed planting activity and observation journal',
      type: 'Activity',
      pages: 3,
      digitalComponent: 'Time-lapse plant growth visualization'
    },
    {
      id: 'ws8',
      title: 'Quarter Assessment - Maths',
      subject: 'Mathematics',
      grade: '3',
      description: 'Comprehensive assessment covering addition, subtraction, and basic multiplication',
      type: 'Assessment',
      pages: 4,
      digitalComponent: 'Immediate scoring and concept remediation'
    },
    {
      id: 'ws9',
      title: 'Hindi Letter Tracing',
      subject: 'Hindi',
      grade: '1',
      description: 'Practice writing Hindi consonants and vowels with proper stroke order',
      type: 'Practice',
      pages: 5,
      digitalComponent: 'Animated stroke order demonstrations'
    }
  ];
  
  // Filter worksheets based on selected subject and grade
  const filteredWorksheets = worksheets.filter(worksheet => {
    const subjectMatch = selectedSubject === 'all' || worksheet.subject === selectedSubject;
    const gradeMatch = selectedGrade === 'all' || worksheet.grade === selectedGrade;
    return subjectMatch && gradeMatch;
  });
  
  // Group worksheets by type
  const groupedWorksheets = {
    Activity: filteredWorksheets.filter(w => w.type === 'Activity'),
    Practice: filteredWorksheets.filter(w => w.type === 'Practice'),
    Assessment: filteredWorksheets.filter(w => w.type === 'Assessment')
  };
  
  const subjects = ['Mathematics', 'Science', 'Hindi', 'English', 'Environmental Studies'];
  const grades = ['1', '2', '3', '4', '5'];
  
  const getSubjectIcon = (subject: string) => {
    switch(subject) {
      case 'Mathematics':
        return <Calculator className="h-5 w-5" />;
      case 'Science':
        return <Flask className="h-5 w-5" />;
      case 'Hindi':
      case 'English':
        return <Languages className="h-5 w-5" />;
      case 'Environmental Studies':
        return <Map className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  return (
    <section className="py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Printer className="h-16 w-16 text-blue-500" />
            <div className="absolute -right-2 -bottom-2 bg-green-500 text-white p-1 rounded-full">
              <QrCode className="h-6 w-6" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Physical-Digital Worksheet Hybrid</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bridging the gap between traditional hands-on learning and digital education with
          printable worksheets that connect to interactive digital experiences.
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Filter by Subject</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className={`cursor-pointer ${selectedSubject === 'all' ? 'bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={() => setSelectedSubject('all')}
                >
                  All Subjects
                </Badge>
                {subjects.map(subject => (
                  <Badge 
                    key={subject}
                    className={`cursor-pointer ${selectedSubject === subject ? 'bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Filter by Grade</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className={`cursor-pointer ${selectedGrade === 'all' ? 'bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={() => setSelectedGrade('all')}
                >
                  All Grades
                </Badge>
                {grades.map(grade => (
                  <Badge 
                    key={grade}
                    className={`cursor-pointer ${selectedGrade === grade ? 'bg-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    onClick={() => setSelectedGrade(grade)}
                  >
                    Class {grade}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="Activity">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Activity">Activities</TabsTrigger>
          <TabsTrigger value="Practice">Practice Sheets</TabsTrigger>
          <TabsTrigger value="Assessment">Assessments</TabsTrigger>
        </TabsList>
        
        {Object.entries(groupedWorksheets).map(([type, worksheets]) => (
          <TabsContent key={type} value={type} className="mt-6">
            {worksheets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worksheets.map(worksheet => (
                  <Card key={worksheet.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{worksheet.title}</CardTitle>
                        {getSubjectIcon(worksheet.subject)}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{worksheet.subject}</Badge>
                        <Badge variant="outline">Class {worksheet.grade}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{worksheet.description}</p>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{worksheet.pages} pages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <QrCode className="h-4 w-4" />
                          <span>QR-enabled</span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1">Digital Component:</h4>
                        <p className="text-xs text-gray-600">{worksheet.digitalComponent}</p>
                      </div>
                      
                      <PhysicalDigitalActions 
                        worksheetName={worksheet.title}
                        worksheetType={worksheet.type}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Printer className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600">No Worksheets Found</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2">
                  No {type.toLowerCase()} worksheets match your current filters. 
                  Try selecting different subject or grade options.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">How Physical-Digital Hybrid Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
                <Printer className="h-8 w-8 text-blue-500" />
              </div>
              <h4 className="font-bold mb-2">1. Print</h4>
              <p className="text-sm">Print the worksheet from home or download it to print at a local shop</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
                <FileText className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="font-bold mb-2">2. Complete</h4>
              <p className="text-sm">Child works on the physical worksheet using pencils, crayons or scissors</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
                <QrCode className="h-8 w-8 text-purple-500" />
              </div>
              <h4 className="font-bold mb-2">3. Scan</h4>
              <p className="text-sm">Scan the QR code to unlock digital rewards and track progress</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicalDigitalWorksheets;
