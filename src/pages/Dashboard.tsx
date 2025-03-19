
import React from 'react';
import StudentDashboard from '@/components/Dashboard/StudentDashboard';
import StudentBoardQuests from '@/components/Dashboard/StudentBoardQuests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Sparkles, 
  BookMarked, 
  FileText, 
  Zap,
  Wind,
  BookOpenCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Aanya!</h1>
          <p className="text-gray-600">Let's continue your learning journey</p>
        </div>
        
        {/* Quick Access Feature Cards - NEW SECTION */}
        <div className="mb-10 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-lovable-blue">Magic Learning Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <Link to="/dashboard?tab=curriculum" className="block">
              <Card className="border-2 border-blue-200 hover:border-lovable-blue transition-all h-full">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <BookOpenCheck className="h-8 w-8 text-lovable-blue mb-2" />
                  <span className="text-sm font-medium">Board Quests</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/indian-features?feature=mythological" className="block">
              <Card className="border-2 border-purple-200 hover:border-lovable-purple transition-all h-full">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <BookMarked className="h-8 w-8 text-lovable-purple mb-2" />
                  <span className="text-sm font-medium">Mythology Quests</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/indian-features?feature=physical-digital" className="block">
              <Card className="border-2 border-green-200 hover:border-green-500 transition-all h-full">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <FileText className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">Worksheets</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/indian-features?feature=lite-mode" className="block">
              <Card className="border-2 border-yellow-200 hover:border-yellow-500 transition-all h-full">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium">Lite Mode</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/indian-features?feature=parent-co-learning" className="block">
              <Card className="border-2 border-red-200 hover:border-red-500 transition-all h-full">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <Users className="h-8 w-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium">Learn with Parents</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Curriculum</span>
              <span className="sm:hidden">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Friends</span>
              <span className="sm:hidden">Friends</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="sm:hidden">Badges</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <StudentDashboard />
          </TabsContent>
          
          <TabsContent value="curriculum">
            <StudentBoardQuests />
          </TabsContent>
          
          <TabsContent value="social">
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Connect with Classmates</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                This feature will be coming soon! You'll be able to collaborate on assignments
                and compete in educational challenges with friends.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Your Achievements</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Complete curriculum-aligned quests to earn badges and certificates
                that showcase your learning progress.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
