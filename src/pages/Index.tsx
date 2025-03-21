
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/Hero/HeroSection';
import FeaturesSection from '@/components/Features/FeaturesSection';
import ForEducatorsSection from '@/components/Educators/ForEducatorsSection';
import InteractiveKingdomMap from '@/components/Kingdom/InteractiveKingdomMap';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div id="hero">
        <HeroSection />
      </div>
      
      <div className="container px-4 mx-auto py-16">
        <div id="kingdom-map" className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Interactive Learning Kingdom</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive into an exciting world of knowledge where each zone offers unique learning adventures tailored to different subjects and skills.
            </p>
          </div>
          <InteractiveKingdomMap demoMode={true} />
        </div>
      </div>
      
      <div id="features">
        <FeaturesSection />
      </div>
      
      <div id="for-educators">
        <ForEducatorsSection />
      </div>
      
      <div id="for-parents" className="bg-gray-50 py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Parents</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help your child thrive with our guided learning paths and parent-friendly tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Follow your child's learning journey with detailed progress reports and insights.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Family Activities</h3>
              <p className="text-gray-600">Engage in fun learning activities together with family-friendly quests and challenges.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Safe Learning Environment</h3>
              <p className="text-gray-600">Rest easy knowing your child is learning in a secure, age-appropriate digital space.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/parent-analytics" className="inline-block bg-lovable-blue text-white px-6 py-3 rounded-full font-medium hover:bg-lovable-purple transition-colors">
              Explore Family Features
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Cogno Junior</h3>
              <p className="text-gray-400">Making learning an exciting adventure for children everywhere.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#kingdom-map" className="text-gray-400 hover:text-white transition-colors">Kingdom Map</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Learning Zones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Rewards System</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/parent-analytics" className="text-gray-400 hover:text-white transition-colors">For Parents</Link></li>
                <li><Link to="/for-educators" className="text-gray-400 hover:text-white transition-colors">For Educators</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Lovable Quest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
