
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookMarked, FileText, Zap, Users, BookOpenCheck, LogOut, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Different nav items based on auth status
  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Kingdom Map', path: '/#kingdom-map' },
    { name: 'For Parents', path: '/#for-parents' },
    { name: 'For Educators', path: '/#for-educators' },
  ];

  const privateNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Kingdom Map', path: '/dashboard?tab=map' },
    { name: 'Family Mode', path: '/family' },
    { name: 'Analytics', path: '/parent-analytics', showForRoles: ['parent', 'educator', 'admin'] },
  ];

  const navItems = isAuthenticated ? privateNavItems.filter(item => 
    !item.showForRoles || (user && item.showForRoles.includes(user.role))
  ) : publicNavItems;

  const learningFeatures = [
    { name: 'Board Quests', path: '/dashboard?tab=curriculum', icon: <BookOpenCheck className="mr-2 h-4 w-4 text-lovable-blue" /> },
    { name: 'Mythology Quests', path: '/indian-features?feature=mythological', icon: <BookMarked className="mr-2 h-4 w-4 text-lovable-purple" /> },
    { name: 'Worksheets', path: '/indian-features?feature=physical-digital', icon: <FileText className="mr-2 h-4 w-4 text-green-600" /> },
    { name: 'Lite Mode', path: '/indian-features?feature=lite-mode', icon: <Zap className="mr-2 h-4 w-4 text-yellow-600" /> },
    { name: 'Learn with Parents', path: '/indian-features?feature=parent-co-learning', icon: <Users className="mr-2 h-4 w-4 text-red-600" /> },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative w-10 h-10 rounded-full bg-blue-green-gradient animate-pulse-subtle shadow-lg">
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gradient-blue-green">LQ</span>
              </div>
            </div>
            <span className={`text-xl font-bold text-gradient-blue-green ${isMobile ? 'hidden sm:inline' : ''}`}>Lovable Quest</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative px-2 py-1 font-medium text-sm transition-colors",
                  location.pathname === item.path || (location.hash === item.path.substring(1) && location.pathname === '/')
                    ? "text-lovable-blue after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-lovable-blue after:rounded-full"
                    : "text-gray-600 hover:text-lovable-blue"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Learning Features Dropdown */}
            {isAuthenticated && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent focus:bg-blue-50 data-[state=open]:bg-blue-50 px-2 py-1 text-sm font-medium">
                      Learning Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {learningFeatures.map((feature) => (
                          <li key={feature.name} className="row-span-1">
                            <NavigationMenuLink asChild>
                              <Link
                                to={feature.path}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                              >
                                <div className="flex items-center">
                                  {feature.icon}
                                  <div className="text-sm font-medium">{feature.name}</div>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </nav>

          {/* User menu or Login/Register buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-white shadow">
                      <AvatarImage src={user?.avatar} alt={user?.username} />
                      <AvatarFallback className="bg-lovable-blue text-white">
                        {user?.username ? getInitials(user.username) : '?'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.username}</p>
                      <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="px-4 py-2 text-sm font-medium text-lovable-blue hover:text-lovable-purple transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="px-4 py-2 text-sm font-medium text-white bg-lovable-blue hover:bg-lovable-purple transition-colors rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                  onClick={() => navigate('/register')}
                >
                  Register for Free
                </Button>
              </>
            )}
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
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-4 py-2 rounded-lg font-medium transition-colors",
                  location.pathname === item.path || (location.hash === item.path.substring(1) && location.pathname === '/')
                    ? "text-white bg-lovable-blue shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="px-4 py-2 text-sm font-semibold text-gray-500">Learning Features</p>
                {learningFeatures.map((feature) => (
                  <Link
                    key={feature.name}
                    to={feature.path}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {feature.icon}
                    <span>{feature.name}</span>
                  </Link>
                ))}
              </div>
            )}
            
            <div className="pt-4 mt-6 border-t border-gray-200 flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <Avatar className="h-10 w-10 border-2 border-white shadow">
                      <AvatarImage src={user?.avatar} alt={user?.username} />
                      <AvatarFallback className="bg-lovable-blue text-white">
                        {user?.username ? getInitials(user.username) : '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-sm font-medium w-full text-center text-lovable-blue hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium w-full text-center text-white bg-lovable-blue hover:bg-lovable-purple rounded-full shadow-md transition-colors"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-sm font-medium w-full text-center text-lovable-blue hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/login');
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="px-4 py-2 text-sm font-medium w-full text-center text-white bg-lovable-blue hover:bg-lovable-purple rounded-full shadow-md transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/register');
                    }}
                  >
                    Register for Free
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
