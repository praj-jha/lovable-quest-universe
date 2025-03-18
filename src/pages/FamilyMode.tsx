
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BuddyBot from '@/components/Buddy/BuddyBot';
import FamilyQuestList from '@/components/Family/FamilyQuestList';
import FamilyLeaderboard from '@/components/Family/FamilyLeaderboard';
import FamilyInsights from '@/components/Family/FamilyInsights';
import FamilyActivityUploader from '@/components/Family/FamilyActivityUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  Trophy, 
  Camera, 
  BarChart, 
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';

const FamilyMode: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quests');

  return (
    <div className="min-h-screen pt-16">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-lovable-purple to-lovable-blue py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Family Learning Mode</h1>
                  <p className="text-blue-100">Learn, play, and grow together as a family!</p>
                  
                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Trophy size={18} className="text-lovable-yellow" />
                      <span className="text-sm text-blue-100">Family Level 3</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award size={18} className="text-lovable-yellow" />
                      <span className="text-sm text-blue-100">340 Family XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={18} className="text-lovable-yellow" />
                      <span className="text-sm text-blue-100">4 Members</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <BuddyBot size="lg" expression="excited" />
                  <div className="bg-white rounded-lg p-3 shadow-md max-w-xs">
                    <p className="text-sm text-gray-700">
                      Ready for today's family challenge? Complete it together and earn 50 Family XP!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="quests" className="flex items-center justify-center gap-2">
                  <BookOpen size={16} />
                  <span className="hidden sm:inline">Quests</span>
                </TabsTrigger>
                <TabsTrigger value="activities" className="flex items-center justify-center gap-2">
                  <Camera size={16} />
                  <span className="hidden sm:inline">Activities</span>
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex items-center justify-center gap-2">
                  <Trophy size={16} />
                  <span className="hidden sm:inline">Leaderboard</span>
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center justify-center gap-2">
                  <BarChart size={16} />
                  <span className="hidden sm:inline">Insights</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="quests" className="mt-2">
                <FamilyQuestList />
              </TabsContent>
              
              <TabsContent value="activities" className="mt-2">
                <FamilyActivityUploader />
              </TabsContent>
              
              <TabsContent value="leaderboard" className="mt-2">
                <FamilyLeaderboard />
              </TabsContent>
              
              <TabsContent value="insights" className="mt-2">
                <FamilyInsights />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyMode;
