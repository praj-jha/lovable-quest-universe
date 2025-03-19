
import React from 'react';
import StudentDashboard from '@/components/Dashboard/StudentDashboard';
import StudentBoardQuests from '@/components/Dashboard/StudentBoardQuests';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Trophy, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Aanya!</h1>
          <p className="text-gray-600">Let's continue your learning journey</p>
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
