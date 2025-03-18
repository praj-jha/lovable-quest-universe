
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Image, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BuddyBot from '@/components/Buddy/BuddyBot';

const FamilyActivityUploader: React.FC = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<{id: string, name: string, preview: string}[]>([]);
  const [description, setDescription] = useState('');
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        preview: URL.createObjectURL(file)
      }));
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      
      toast({
        title: "Files uploaded",
        description: `${newFiles.length} file${newFiles.length > 1 ? 's' : ''} added`,
        variant: "default",
      });
    }
  };
  
  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };
  
  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload photos or videos of your family activity",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Activity submitted!",
      description: "Our AI is validating your submission to award Family XP",
      variant: "default",
    });
    
    // Reset form
    setTimeout(() => {
      setUploadedFiles([]);
      setDescription('');
      
      toast({
        title: "Validation complete!",
        description: "Congratulations! You've earned 25 Family XP points!",
        variant: "default",
      });
    }, 2500);
  };
  
  const recentActivities = [
    {
      id: '1',
      title: 'Kitchen Science Experiment',
      date: '2 days ago',
      xp: 30,
      image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: '2',
      title: 'Family Math Game Night',
      date: 'Last week',
      xp: 25,
      image: 'https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Family Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 mb-6">
                <BuddyBot size="md" expression="happy" />
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    Upload photos or videos of your family completing educational activities together! 
                    Our AI will validate your submission and reward you with Family XP.
                  </p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                {uploadedFiles.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="relative group">
                        <img 
                          src={file.preview} 
                          alt={file.name}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <button
                          onClick={() => removeFile(file.id)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-24 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                      <Plus size={24} className="text-gray-400 mb-1" />
                      <span className="text-sm text-gray-500">Add More</span>
                      <input type="file" className="hidden" multiple onChange={handleUpload} accept="image/*,video/*" />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload size={48} className="text-gray-300 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag and drop files or click to upload</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Image size={14} />
                      Choose Files
                    </Button>
                    <input type="file" className="hidden" multiple onChange={handleUpload} accept="image/*,video/*" />
                  </label>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe your family activity and what everyone learned..."
                  className="w-full p-2 border border-gray-200 rounded-md text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSubmit} className="gap-2">
                  <CheckCircle size={16} />
                  Submit Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex space-x-3">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">+{activity.xp} XP</Badge>
                      <span className="text-xs text-gray-500">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentActivities.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">No recent activities</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Plus = (props: React.ComponentProps<typeof Camera>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export default FamilyActivityUploader;
