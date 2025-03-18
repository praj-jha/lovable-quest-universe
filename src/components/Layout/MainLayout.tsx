
import React from 'react';
import Navbar from '../Navigation/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-8 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Lovable Quest Universe</h3>
              <p className="text-sm text-gray-600">
                Where learning becomes a magical adventure for kids and families.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Learn</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">For Students</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">For Parents</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">For Teachers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-lovable-blue transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Lovable Quest Universe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
