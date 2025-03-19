
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, CheckSquare, Award, FileText, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BoardAlignmentSection: React.FC = () => {
  const boards = [
    {
      id: 'cbse',
      name: 'CBSE',
      description: 'Central Board of Secondary Education curriculum alignment',
      color: 'bg-blue-500',
      subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Environmental Studies'],
      features: [
        'Chapter-by-chapter alignment with NCERT textbooks',
        'CBSE assessment pattern practice questions',
        'Learning outcomes mapped to CBSE guidelines',
        'Supplementary activities that enhance NCERT topics'
      ]
    },
    {
      id: 'icse',
      name: 'ICSE',
      description: 'Indian Certificate of Secondary Education curriculum alignment',
      color: 'bg-green-500',
      subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Environmental Science'],
      features: [
        'Comprehensive coverage of ICSE curriculum objectives',
        'CISCE-style question formats and practice tests',
        'Extended learning activities for deeper understanding',
        'Supplementary resources for project work'
      ]
    },
    {
      id: 'state',
      name: 'State Boards',
      description: 'Major state board curriculum alignment including Maharashtra, Tamil Nadu, Karnataka',
      color: 'bg-purple-500',
      subjects: ['Mathematics', 'Science', 'Language', 'Environmental Studies'],
      features: [
        'State-specific textbook alignment for major boards',
        'Regional language support for instructions',
        'Local context examples and applications',
        'State board examination pattern practice'
      ]
    }
  ];

  return (
    <section id="board-alignment" className="py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Curriculum Alignment</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our platform is carefully aligned with all major Indian education boards,
          ensuring students learn exactly what they need for school success.
        </p>
      </div>

      <Tabs defaultValue="cbse" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
          {boards.map(board => (
            <TabsTrigger key={board.id} value={board.id} className="text-center">
              {board.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {boards.map(board => (
          <TabsContent key={board.id} value={board.id} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className={`${board.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    {board.name} Curriculum Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-4 text-gray-600">{board.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Subjects Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {board.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className={`${board.color} text-white rounded-t-lg`}>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-6 w-6" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {board.features.map((feature, index) => (
                      <li key={index} className="flex gap-2">
                        <CheckSquare className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex gap-4 items-start">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    Complete {board.name} Examination Preparation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our platform provides comprehensive preparation for {board.name} assessments
                    with practice tests, model question papers, and performance analytics.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                      Chapter Tests
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Term Assessments
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Mock Exams
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      Performance Analytics
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default BoardAlignmentSection;
