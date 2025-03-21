import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookMarked, FileText, Zap, Users, BookOpenCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const navItems = [
    {
      name: 'Home',
      path: '/'
    }, 
    {
      name: 'Kingdom Map',
      path: '/#kingdom-map'
    }, 
    {
      name: 'For Parents',
      path: '/parent-analytics'
    }, 
    {
      name: 'For Educators',
      path: '/#for-educators'
    }, 
    {
      name: 'Dashboard',
      path: '/dashboard'
    }
  ];

  const learningFeatures = [
    {
      name: 'Board Quests',
      path: '/dashboard?tab=curriculum',
      icon: <BookOpenCheck className="mr-2 h-4 w-4 text-lovable-blue" />
    }, 
    {
      name: 'Mythology Quests',
      path: '/indian-features?feature=mythological',
      icon: <BookMarked className="mr-2 h-4 w-4 text-lovable-purple" />
    }, 
    {
      name: 'Worksheets',
      path: '/indian-features?feature=physical-digital',
      icon: <FileText className="mr-2 h-4 w-4 text-green-600" />
    }, 
    {
      name: 'Lite Mode',
      path: '/indian-features?feature=lite-mode',
      icon: <Zap className="mr-2 h-4 w-4 text-yellow-600" />
    }, 
    {
      name: 'Learn with Parents',
      path: '/indian-features?feature=parent-co-learning',
      icon: <Users className="mr-2 h-4 w-4 text-red-600" />
    }
  ];

  return (
    <header className={cn("fixed w-full z-50 transition-all duration-300 py-4", isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent")}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="relative w-10 h-10 rounded-full bg-blue-green-gradient animate-pulse-subtle shadow-lg">
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gradient-blue-green">CJ</span>
              </div>
            </div>
            <span className={`text-xl font-bold text-gradient-blue-green ${isMobile ? 'hidden sm:inline' : ''}`}>Cogno Junior</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={cn(
                  "relative px-2 py-1 font-medium text-sm transition-colors", 
                  (location.pathname === item.path || 
                   (location.hash === item.path.substring(1) && location.pathname === '/') ||
                   (item.path === '/parent-analytics' && location.pathname === '/parent-analytics')
                  ) 
                    ? "text-lovable-blue after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-lovable-blue after:rounded-full" 
                    : "text-gray-600 hover:text-lovable-blue"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Learning Features Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent focus:bg-blue-50 data-[state=open]:bg-blue-50 px-2 py-1 text-sm font-medium">
                    Learning Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {learningFeatures.map(feature => <li key={feature.name} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link to={feature.path} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50">
                              <div className="flex items-center">
                                {feature.icon}
                                <div className="text-sm font-medium">{feature.name}</div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>)}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Login/Register buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-lovable-blue hover:text-lovable-purple transition-colors">
              Login
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-lovable-blue hover:bg-lovable-purple transition-colors rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
              Register for Free
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden glassmorphism mt-4 mx-4 rounded-xl animate-scale-in shadow-xl border border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={cn(
                  "block px-4 py-2 rounded-lg font-medium transition-colors", 
                  (location.pathname === item.path || 
                   (location.hash === item.path.substring(1) && location.pathname === '/') ||
                   (item.path === '/parent-analytics' && location.pathname === '/parent-analytics')
                  )
                    ? "text-white bg-lovable-blue shadow-md" 
                    : "text-gray-700 hover:bg-gray-100"
                )} 
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="px-4 py-2 text-sm font-semibold text-gray-500">Learning Features</p>
              {learningFeatures.map(feature => <Link key={feature.name} to={feature.path} className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  {feature.icon}
                  <span>{feature.name}</span>
                </Link>)}
            </div>
            
            <div className="pt-4 mt-6 border-t border-gray-200 flex flex-col space-y-3">
              <button className="px-4 py-2 text-sm font-medium w-full text-center text-lovable-blue hover:bg-gray-100 rounded-lg transition-colors">
                Login
              </button>
              <button className="px-4 py-2 text-sm font-medium w-full text-center text-white bg-lovable-blue hover:bg-lovable-purple rounded-full shadow-md transition-colors">
                Register for Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
