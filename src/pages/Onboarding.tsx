
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingForm from '@/components/Auth/OnboardingForm';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lovable-blue/10 to-white flex flex-col items-center justify-center p-4">
      <OnboardingForm />
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Already set up? <button onClick={() => navigate('/dashboard')} className="text-lovable-blue hover:underline">Go to Dashboard</button></p>
      </div>
    </div>
  );
};

export default Onboarding;
