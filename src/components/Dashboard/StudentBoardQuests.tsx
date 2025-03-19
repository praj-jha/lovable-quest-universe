
import React from 'react';
import BoardAlignedQuests from './BoardAlignedQuests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Star, Download, CalendarDays } from 'lucide-react';

// This component integrates the board-aligned quests with other useful dashboard elements for students
const StudentBoardQuests: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Current Chapter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Addition & Subtraction</div>
            <p className="text-sm text-gray-500">CBSE Mathematics • Chapter 2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-green-500" />
              Next Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Friday</div>
            <p className="text-sm text-gray-500">Unit Test: Plants & Animals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Curriculum Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37%</div>
            <p className="text-sm text-gray-500">Term 1 • Class 3 CBSE</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="quests">
        <TabsList>
          <TabsTrigger value="quests">
            <BookOpen className="h-4 w-4 mr-2" />
            Board Quests
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Download className="h-4 w-4 mr-2" />
            Learning Resources
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quests" className="mt-6">
          <BoardAlignedQuests />
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <Download className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">Learning Resources</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Downloadable worksheets, practice papers, and study materials will appear here
              as you progress through your curriculum.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentBoardQuests;
