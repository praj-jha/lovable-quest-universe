
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import KingdomMap from './KingdomMap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InteractiveKingdomMapProps {
  demoMode?: boolean;
}

const InteractiveKingdomMap: React.FC<InteractiveKingdomMapProps> = ({ demoMode = false }) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleZoneSelect = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  return (
    <div className="w-full">
      <Card className="border border-blue-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="p-4 md:p-8">
          <KingdomMap 
            selectedZone={selectedZone} 
            onZoneSelect={handleZoneSelect} 
            demoMode={demoMode} 
          />
          
          {demoMode && (
            <div className="mt-6 flex justify-center">
              <Link to="/dashboard">
                <Button className="bg-lovable-blue hover:bg-lovable-purple transition-colors flex items-center gap-2">
                  Explore Full Kingdom Map
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InteractiveKingdomMap;
