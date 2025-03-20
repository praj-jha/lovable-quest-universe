import React from 'react';

interface InteractiveKingdomMapProps {
  demoMode?: boolean;
}

const InteractiveKingdomMap: React.FC<InteractiveKingdomMapProps> = ({ demoMode = false }) => {
  // The existing implementation can remain the same, and now it accepts demoMode prop
  
  return (
    <div className="relative w-full h-[600px] bg-blue-50 rounded-2xl overflow-hidden shadow-lg border-2 border-blue-100">
      {/* Map visualization would go here */}
      <div className="absolute inset-0 p-6 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">
            {demoMode ? "Kingdom Map Preview" : "Your Learning Kingdom"}
          </h3>
          <p className="text-gray-600 mb-4">
            {demoMode 
              ? "Sign up to access the full interactive kingdom map!" 
              : "Click on any region to start your learning adventure"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveKingdomMap;
