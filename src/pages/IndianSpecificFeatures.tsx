
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'react-router-dom';
import MythologicalLearning from '@/components/India/MythologicalLearning';
import LiteMode from '@/components/India/LiteMode';
import PhysicalDigitalWorksheets from '@/components/India/PhysicalDigitalWorksheets';
import ParentCoLearning from '@/components/India/ParentCoLearning';
import RegionalLanguageSupport from '@/components/India/RegionalLanguageSupport';
import { BookMarked, FileText, Zap, Users, Globe } from 'lucide-react';

const IndianSpecificFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mythological');
  const location = useLocation();
  
  useEffect(() => {
    // Get feature from URL parameters
    const params = new URLSearchParams(location.search);
    const feature = params.get('feature');
    
    if (feature && ['mythological', 'lite-mode', 'physical-digital', 'parent-co-learning', 'regional-language'].includes(feature)) {
      setActiveTab(feature);
    }
  }, [location]);
  
  const getTabTitle = (tab: string) => {
    switch(tab) {
      case 'mythological': return 'Mythology Quests';
      case 'lite-mode': return 'Lite Mode';
      case 'physical-digital': return 'Digital Worksheets';
      case 'parent-co-learning': return 'Parent Co-Learning';
      case 'regional-language': return 'Regional Languages';
      default: return '';
    }
  };
  
  const getTabIcon = (tab: string) => {
    switch(tab) {
      case 'mythological': return <BookMarked className="h-5 w-5" />;
      case 'lite-mode': return <Zap className="h-5 w-5" />;
      case 'physical-digital': return <FileText className="h-5 w-5" />;
      case 'parent-co-learning': return <Users className="h-5 w-5" />;
      case 'regional-language': return <Globe className="h-5 w-5" />;
      default: return null;
    }
  };
  
  const tabs = [
    { id: 'mythological', label: 'Mythology Quests' },
    { id: 'lite-mode', label: 'Lite Mode' },
    { id: 'physical-digital', label: 'Digital Worksheets' },
    { id: 'parent-co-learning', label: 'Parent Co-Learning' },
    { id: 'regional-language', label: 'Regional Languages' }
  ];
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {getTabTitle(activeTab)}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Specially designed features for Indian students
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full grid grid-cols-3 md:grid-cols-5 h-auto p-1">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex flex-col items-center py-3 gap-1 data-[state=active]:text-lovable-blue"
              >
                {getTabIcon(tab.id)}
                <span className="text-xs font-medium">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="mythological" className="focus:outline-none">
            <MythologicalLearning />
          </TabsContent>
          
          <TabsContent value="lite-mode" className="focus:outline-none">
            <LiteMode />
          </TabsContent>
          
          <TabsContent value="physical-digital" className="focus:outline-none">
            <PhysicalDigitalWorksheets />
          </TabsContent>
          
          <TabsContent value="parent-co-learning" className="focus:outline-none">
            <ParentCoLearning />
          </TabsContent>
          
          <TabsContent value="regional-language" className="focus:outline-none">
            <RegionalLanguageSupport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndianSpecificFeatures;
