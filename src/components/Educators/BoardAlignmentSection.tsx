
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, CheckSquare, Award, FileText, BookOpen, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Define the data structure for curriculum content
interface CurriculumTopic {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  chapter: string;
  progress: number;
  materials: Array<{
    type: string;
    title: string;
    downloadable: boolean;
  }>;
  activities: Array<{
    title: string;
    type: string;
    duration: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>;
}

interface BoardData {
  id: string;
  name: string;
  description: string;
  color: string;
  subjects: string[];
  features: string[];
  curriculum: CurriculumTopic[];
}

const BoardAlignmentSection: React.FC = () => {
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<string>("3");
  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");
  
  // Comprehensive curriculum data for different boards
  const boards: BoardData[] = [
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
      ],
      curriculum: [
        {
          id: 'cbse-math-3-1',
          title: 'Numbers and Number Names',
          description: 'Learn to read, write and compare numbers up to 999',
          subject: 'Mathematics',
          grade: '3',
          chapter: 'Chapter 1: Numbers',
          progress: 85,
          materials: [
            { type: 'Worksheet', title: 'Place Value Chart Practice', downloadable: true },
            { type: 'Interactive', title: 'Counting Game', downloadable: false },
            { type: 'Video', title: 'Understanding 3-Digit Numbers', downloadable: true }
          ],
          activities: [
            { title: 'Number Card Sorting', type: 'Hands-on', duration: '15 min', difficulty: 'Easy' },
            { title: 'Place Value Challenge', type: 'Quiz', duration: '10 min', difficulty: 'Medium' }
          ]
        },
        {
          id: 'cbse-math-3-2',
          title: 'Addition and Subtraction',
          description: 'Addition and subtraction of 3-digit numbers with and without regrouping',
          subject: 'Mathematics',
          grade: '3',
          chapter: 'Chapter 2: Addition and Subtraction',
          progress: 60,
          materials: [
            { type: 'Worksheet', title: 'Addition with Regrouping', downloadable: true },
            { type: 'Interactive', title: 'Subtraction Puzzle', downloadable: false },
            { type: 'Printable', title: 'Math Facts Flashcards', downloadable: true }
          ],
          activities: [
            { title: 'Shop & Calculate', type: 'Role-play', duration: '20 min', difficulty: 'Medium' },
            { title: 'Missing Numbers', type: 'Worksheet', duration: '15 min', difficulty: 'Easy' }
          ]
        },
        {
          id: 'cbse-science-3-1',
          title: 'Plants and Animals',
          description: 'Exploring the characteristics and habitats of plants and animals',
          subject: 'Science',
          grade: '3',
          chapter: 'Chapter 1: Living Things',
          progress: 40,
          materials: [
            { type: 'Worksheet', title: 'Plant Parts Labeling', downloadable: true },
            { type: 'Interactive', title: 'Animal Habitat Explorer', downloadable: false }
          ],
          activities: [
            { title: 'Seed Germination Experiment', type: 'Experiment', duration: '1 week', difficulty: 'Medium' },
            { title: 'Animal Classification', type: 'Sorting Activity', duration: '20 min', difficulty: 'Easy' }
          ]
        }
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
      ],
      curriculum: [
        {
          id: 'icse-math-3-1',
          title: 'Numbers up to 10,000',
          description: 'Understanding place value and operations with 4-digit numbers',
          subject: 'Mathematics',
          grade: '3',
          chapter: 'Chapter 1: Numbers',
          progress: 70,
          materials: [
            { type: 'Worksheet', title: 'Place Value in Thousands', downloadable: true },
            { type: 'Interactive', title: 'Number Formation Game', downloadable: false }
          ],
          activities: [
            { title: 'Abacus Practice', type: 'Hands-on', duration: '15 min', difficulty: 'Medium' },
            { title: 'Number Word Conversion', type: 'Writing', duration: '10 min', difficulty: 'Easy' }
          ]
        },
        {
          id: 'icse-science-3-1',
          title: 'Living and Non-living Things',
          description: 'Distinguishing between living and non-living things based on characteristics',
          subject: 'Science',
          grade: '3',
          chapter: 'Chapter 1: Our Environment',
          progress: 55,
          materials: [
            { type: 'Worksheet', title: 'Classifying Objects', downloadable: true },
            { type: 'Video', title: 'Characteristics of Living Things', downloadable: true }
          ],
          activities: [
            { title: 'Nature Walk Classification', type: 'Outdoor Activity', duration: '30 min', difficulty: 'Easy' },
            { title: 'Life Processes Observation', type: 'Experiment', duration: '2 days', difficulty: 'Medium' }
          ]
        }
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
      ],
      curriculum: [
        {
          id: 'tn-math-3-1',
          title: 'Numbers and Operations',
          description: 'Understanding numbers up to 1000 and basic operations',
          subject: 'Mathematics',
          grade: '3',
          chapter: 'Unit 1: Numbers',
          progress: 65,
          materials: [
            { type: 'Worksheet', title: 'Tamil Nadu Textbook Problems', downloadable: true },
            { type: 'Interactive', title: 'Regional Math Game', downloadable: false }
          ],
          activities: [
            { title: 'Local Market Math', type: 'Real-world', duration: '20 min', difficulty: 'Medium' },
            { title: 'Tamil Number Names', type: 'Language Integration', duration: '15 min', difficulty: 'Easy' }
          ]
        },
        {
          id: 'mh-science-3-1',
          title: 'Our Surroundings',
          description: 'Learning about local plants, animals and environment',
          subject: 'Science',
          grade: '3',
          chapter: 'Chapter 1: Living World',
          progress: 45,
          materials: [
            { type: 'Worksheet', title: 'Maharashtra Flora and Fauna', downloadable: true },
            { type: 'Interactive', title: 'Western Ghats Explorer', downloadable: false }
          ],
          activities: [
            { title: 'Local Plant Collection', type: 'Field Work', duration: '1 week', difficulty: 'Medium' },
            { title: 'Marathi Names of Animals', type: 'Language Integration', duration: '15 min', difficulty: 'Easy' }
          ]
        }
      ]
    }
  ];

  // Filter topics based on selected grade and subject
  const getFilteredTopics = (boardId: string) => {
    const board = boards.find(b => b.id === boardId);
    if (!board) return [];
    
    return board.curriculum.filter(
      topic => topic.grade === selectedGrade && topic.subject === selectedSubject
    );
  };

  const handleStartTopic = (topic: CurriculumTopic) => {
    toast({
      title: "Topic Started",
      description: `You've begun '${topic.title}' from ${topic.chapter}`,
    });
  };

  const handleDownloadMaterial = (material: { type: string; title: string }) => {
    toast({
      title: "Material Downloaded",
      description: `${material.type}: ${material.title} has been downloaded`,
    });
  };

  const handleAssignToClass = (topic: CurriculumTopic) => {
    toast({
      title: "Topic Assigned",
      description: `${topic.title} has been assigned to your class`,
    });
  };

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
                          <Badge 
                            key={index} 
                            variant={selectedSubject === subject ? "default" : "outline"} 
                            className={selectedSubject === subject ? "" : "bg-gray-100 cursor-pointer"}
                            onClick={() => setSelectedSubject(subject)}
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Grade Level:</h4>
                      <div className="flex flex-wrap gap-2">
                        {["1", "2", "3", "4", "5"].map(grade => (
                          <Badge 
                            key={grade} 
                            variant={selectedGrade === grade ? "default" : "outline"} 
                            className={selectedGrade === grade ? "" : "bg-gray-100 cursor-pointer"}
                            onClick={() => setSelectedGrade(grade)}
                          >
                            Class {grade}
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
              <div className="flex gap-4 items-start mb-6">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {selectedSubject} Curriculum for Class {selectedGrade}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore curriculum-aligned topics for {board.name} {selectedSubject} Class {selectedGrade} below.
                    Each topic includes teaching materials and activities aligned with the official syllabus.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {getFilteredTopics(board.id).length > 0 ? (
                  getFilteredTopics(board.id).map(topic => (
                    <Card key={topic.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">{topic.title}</CardTitle>
                            <p className="text-gray-500 text-sm">{topic.chapter}</p>
                          </div>
                          <Badge variant="outline">{topic.subject} • Class {topic.grade}</Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4">
                        <p className="mb-4">{topic.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm">{topic.progress}%</span>
                          </div>
                          <Progress value={topic.progress} className="h-2" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Teaching Materials</h4>
                            <ul className="space-y-2">
                              {topic.materials.map((material, idx) => (
                                <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span>{material.title}</span>
                                  </div>
                                  {material.downloadable && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8"
                                      onClick={() => handleDownloadMaterial(material)}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Activities</h4>
                            <ul className="space-y-2">
                              {topic.activities.map((activity, idx) => (
                                <li key={idx} className="bg-gray-50 p-2 rounded">
                                  <div className="flex justify-between">
                                    <span>{activity.title}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {activity.difficulty}
                                    </Badge>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {activity.type} • {activity.duration}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 p-4 flex gap-2 justify-end">
                        <Button 
                          variant="outline"
                          onClick={() => handleAssignToClass(topic)}
                        >
                          Assign to Class
                        </Button>
                        <Button
                          onClick={() => handleStartTopic(topic)}
                        >
                          Start Topic
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-500">No topics available</h4>
                    <p className="text-gray-400">
                      There are no {selectedSubject} topics for Class {selectedGrade} in the {board.name} curriculum yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default BoardAlignmentSection;
