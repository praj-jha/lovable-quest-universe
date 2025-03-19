
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, QrCode, Printer, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhysicalDigitalActionsProps {
  worksheetName: string;
  worksheetType: string;
}

const PhysicalDigitalActions: React.FC<PhysicalDigitalActionsProps> = ({
  worksheetName,
  worksheetType
}) => {
  const { toast } = useToast();
  
  const handlePrintWorksheet = () => {
    toast({
      title: "Preparing for Print",
      description: `${worksheetName} is ready to print`,
    });
  };
  
  const handleDownloadWorksheet = () => {
    toast({
      title: "Worksheet Downloaded",
      description: `${worksheetName} has been saved to your device`,
    });
  };
  
  const handleScanCompleted = () => {
    toast({
      title: "Scan Worksheet",
      description: "Use your camera to scan the completed worksheet",
    });
  };
  
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          className="flex-1 gap-2"
          variant="default"
          onClick={handlePrintWorksheet}
        >
          <Printer className="h-4 w-4" />
          Print Worksheet
        </Button>
        <Button
          className="flex-1 gap-2"
          variant="outline"
          onClick={handleDownloadWorksheet}
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <Button
        className="w-full gap-2"
        variant="secondary"
        onClick={handleScanCompleted}
      >
        <Camera className="h-4 w-4" />
        Scan Completed Worksheet
      </Button>
      
      <div className="bg-purple-50 p-3 rounded-md flex items-start gap-2 text-sm text-purple-700">
        <QrCode className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>Each worksheet includes a QR code that links to digital rewards when scanned after completion</p>
      </div>
    </div>
  );
};

export default PhysicalDigitalActions;
