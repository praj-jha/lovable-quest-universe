
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  BarChart, 
  DownloadCloud,
  ArrowDownCircle,
  CheckCircle,
  Smartphone,
  Gem
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LiteModeSettings from './LiteModeSettings';

const LiteMode: React.FC = () => {
  const { toast } = useToast(); 
  const [isLiteModeEnabled, setIsLiteModeEnabled] = useState(false);
  
  const handleToggleLiteMode = () => {
    const newState = !isLiteModeEnabled;
    setIsLiteModeEnabled(newState);
    
    toast({
      title: newState ? "Lite Mode Activated" : "Lite Mode Deactivated",
      description: newState 
        ? "Your app will now use significantly less data" 
        : "Full data mode is now active",
    });
  };
  
  const handleDownloadLessons = () => {
    toast({
      title: "Downloading Daily Lessons",
      description: "Your 2MB lesson pack is being downloaded for offline use",
    });
  };
  
  const liteFeatures = [
    {
      title: "2MB Daily Lesson Packs",
      description: "Entire day's lessons in a tiny package - 95% smaller than standard EdTech apps",
      icon: <ArrowDownCircle className="h-8 w-8 text-blue-500" />,
      highlight: true
    },
    {
      title: "Offline Studying",
      description: "Download at night, learn all day without internet - perfect for inconsistent connectivity",
      icon: <WifiOff className="h-8 w-8 text-purple-500" />
    },
    {
      title: "WhatsApp Integration",
      description: "Receive progress reports and assignment reminders via WhatsApp - uses minimal data",
      icon: <Smartphone className="h-8 w-8 text-green-500" />
    },
    {
      title: "Text-First Content",
      description: "Optimized content that doesn't rely on heavy videos or animations to teach effectively",
      icon: <Download className="h-8 w-8 text-red-500" />
    },
    {
      title: "Progressive Loading",
      description: "Only download what you need, when you need it - prioritizing current lessons",
      icon: <DownloadCloud className="h-8 w-8 text-teal-500" />
    },
    {
      title: "Data Usage Analytics",
      description: "Monitor exactly how much data the app uses and set custom limits for your budget",
      icon: <BarChart className="h-8 w-8 text-yellow-500" />
    }
  ];

  return (
    <section className="py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Wifi className="h-16 w-16 text-lovable-green" />
            <div className="absolute -right-2 -bottom-2 bg-lovable-orange text-white p-1 rounded-full">
              <ArrowDownCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Low-Data "Lite Mode"</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Making quality education accessible everywhere in India - even with limited data plans
          or unreliable internet connections.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            size="lg" 
            className={`gap-2 ${isLiteModeEnabled ? 'bg-green-500 hover:bg-green-600' : ''}`}
            onClick={handleToggleLiteMode}
          >
            {isLiteModeEnabled ? <CheckCircle className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
            {isLiteModeEnabled ? 'Lite Mode Active' : 'Enable Lite Mode'}
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="gap-2"
            onClick={handleDownloadLessons}
          >
            <Download className="h-5 w-5" />
            Download Today's Lessons
          </Button>
        </div>
        
        {isLiteModeEnabled && (
          <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Lite Mode is saving you approximately 48MB per day</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liteFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-md transition-shadow ${
                  feature.highlight ? 'border-blue-200 bg-blue-50/50' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                      
                      {feature.highlight && (
                        <Badge className="mt-3 bg-blue-100 text-blue-700 hover:bg-blue-200">
                          Most Popular Feature
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-lovable-blue to-lovable-purple rounded-xl text-white p-6">
          <div className="mb-6">
            <Gem className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Data Savings</h3>
            <p className="opacity-90 mb-6">
              Our Lite Mode uses up to 95% less data than standard EdTech apps, saving you money while providing quality education.
            </p>
            
            <div className="space-y-3 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Standard EdTech App</span>
                  <span>~50MB/day</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-white rounded-full h-3 w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lovable Quest Lite Mode</span>
                  <span>~2MB/day</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-white rounded-full h-3 w-[5%]"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <h4 className="font-bold mb-2">Monthly Data Savings</h4>
              <div className="text-3xl font-bold">~1.4 GB</div>
              <div className="text-sm opacity-90">Enough for a typical Indian family's basic monthly data budget</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button size="lg" className="w-full bg-white text-lovable-purple hover:bg-gray-100" onClick={handleToggleLiteMode}>
              {isLiteModeEnabled ? 'Disable Lite Mode' : 'Enable Lite Mode'}
            </Button>
            <LiteModeSettings />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">How Lite Mode Benefits Indian Students</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Affordable for All</h4>
                <p className="text-gray-600">
                  Works with even the most basic data plans, making education accessible to economically disadvantaged families
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Rural Access</h4>
                <p className="text-gray-600">
                  Functions reliably in areas with 2G/3G networks that are common in rural and semi-urban areas across India
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Battery Efficient</h4>
                <p className="text-gray-600">
                  Uses significantly less battery power, perfect for regions with intermittent electricity supply
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Basic Device Support</h4>
                <p className="text-gray-600">
                  Works smoothly on entry-level smartphones that are common among budget-conscious Indian families
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Shared Device Friendly</h4>
                <p className="text-gray-600">
                  Perfect for families where multiple children share a single device for their studies
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold">No Feature Compromise</h4>
                <p className="text-gray-600">
                  Includes all educational content and features of the full version - just optimized for low data usage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiteMode;
