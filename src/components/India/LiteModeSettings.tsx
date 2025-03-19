
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Wifi, 
  Download, 
  BarChart, 
  Image,
  Video,
  Smartphone,
  Clock,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LiteModeSettings: React.FC = () => {
  const { toast } = useToast();
  const [isLiteModeEnabled, setIsLiteModeEnabled] = useState(false);
  const [dataLimit, setDataLimit] = useState(10);
  const [autoDownload, setAutoDownload] = useState(true);
  const [contentPreference, setContentPreference] = useState({
    images: true,
    videos: false,
    animations: false,
    interactives: true
  });
  
  const handleToggleLiteMode = (value: boolean) => {
    setIsLiteModeEnabled(value);
    toast({
      title: value ? "Lite Mode Enabled" : "Lite Mode Disabled",
      description: value 
        ? "Content will now be optimized for low data usage" 
        : "Standard data usage mode is now active",
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your Lite Mode settings have been updated",
    });
  };
  
  const handleResetDefaults = () => {
    setDataLimit(10);
    setAutoDownload(true);
    setContentPreference({
      images: true,
      videos: false,
      animations: false,
      interactives: true
    });
    
    toast({
      title: "Settings Reset",
      description: "Lite Mode settings have been reset to defaults",
    });
  };
  
  const calculateDailySavings = () => {
    const standardUsage = 50; // in MB
    const liteUsage = isLiteModeEnabled ? 2 : standardUsage;
    const savingsPercentage = ((standardUsage - liteUsage) / standardUsage) * 100;
    return {
      standard: standardUsage,
      lite: liteUsage,
      savingsPercentage: savingsPercentage
    };
  };
  
  const savings = calculateDailySavings();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Wifi className="h-4 w-4" />
            Configure Lite Mode
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Lite Mode Settings</DialogTitle>
            <DialogDescription>
              Configure how Lovable Quest manages data usage for an optimal experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="lite-mode">Lite Mode</Label>
                <p className="text-sm text-gray-500">Reduce data usage by up to 95%</p>
              </div>
              <Switch 
                id="lite-mode" 
                checked={isLiteModeEnabled}
                onCheckedChange={handleToggleLiteMode}
              />
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium">Daily Data Limit</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="data-limit">Maximum daily usage: {dataLimit}MB</Label>
                </div>
                <Slider 
                  id="data-limit"
                  disabled={!isLiteModeEnabled}
                  value={[dataLimit]} 
                  min={2} 
                  max={50} 
                  step={1}
                  onValueChange={(value) => setDataLimit(value[0])}
                  className={!isLiteModeEnabled ? "opacity-50" : ""}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>2MB</span>
                  <span>50MB</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium">Content Preferences</h4>
              <p className="text-sm text-gray-500">Choose what content to load when in Lite Mode</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="images">Basic Images</Label>
                  </div>
                  <Switch 
                    id="images" 
                    disabled={!isLiteModeEnabled}
                    checked={contentPreference.images}
                    onCheckedChange={(value) => setContentPreference({...contentPreference, images: value})}
                    className={!isLiteModeEnabled ? "opacity-50" : ""}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="videos">Instructional Videos</Label>
                  </div>
                  <Switch 
                    id="videos" 
                    disabled={!isLiteModeEnabled}
                    checked={contentPreference.videos}
                    onCheckedChange={(value) => setContentPreference({...contentPreference, videos: value})}
                    className={!isLiteModeEnabled ? "opacity-50" : ""}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <Label htmlFor="interactives">Interactive Elements</Label>
                  </div>
                  <Switch 
                    id="interactives" 
                    disabled={!isLiteModeEnabled}
                    checked={contentPreference.interactives}
                    onCheckedChange={(value) => setContentPreference({...contentPreference, interactives: value})}
                    className={!isLiteModeEnabled ? "opacity-50" : ""}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium">Download Schedule</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label htmlFor="auto-download">Auto-download at night</Label>
                    <p className="text-xs text-gray-500">Download content when device is charging and on Wi-Fi</p>
                  </div>
                </div>
                <Switch 
                  id="auto-download" 
                  disabled={!isLiteModeEnabled}
                  checked={autoDownload}
                  onCheckedChange={setAutoDownload}
                  className={!isLiteModeEnabled ? "opacity-50" : ""}
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estimated Daily Savings:</span>
                <span className="font-medium text-blue-700">{savings.savingsPercentage.toFixed(0)}%</span>
              </div>
              
              <div className="text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Standard Usage:</span>
                  <span>{savings.standard}MB/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Lite Mode Usage:</span>
                  <span>{savings.lite}MB/day</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={handleResetDefaults}
              disabled={!isLiteModeEnabled}
            >
              Reset Defaults
            </Button>
            <Button 
              onClick={handleSaveSettings}
              disabled={!isLiteModeEnabled}
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {isLiteModeEnabled && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 text-blue-700 text-sm flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          <span>Lite Mode is active - current data usage: {savings.lite}MB/day</span>
        </div>
      )}
    </div>
  );
};

export default LiteModeSettings;
