
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import KingdomMap from './KingdomMap';

interface InteractiveKingdomMapProps {
  demoMode?: boolean;
}

const InteractiveKingdomMap: React.FC<InteractiveKingdomMapProps> = ({ demoMode = false }) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="w-full">
      <Card className="border border-blue-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="p-4 md:p-8">
          <KingdomMap />
        </div>
      </Card>
    </div>
  );
};

export default InteractiveKingdomMap;
