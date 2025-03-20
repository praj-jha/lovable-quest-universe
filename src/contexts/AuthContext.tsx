
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  level?: number;
  xp?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Set up axios defaults
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set default Authorization header
          axios.defaults.headers.common['x-auth-token'] = token;
          
          // Validate token and get user data
          const response = await axios.get('/api/users/profile');
          if (response.data.success) {
            setUser(response.data.data);
            setIsAuthenticated(true);
          } else {
            // Invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['x-auth-token'];
          }
        } catch (error) {
          console.error('Auth validation error:', error);
          // Token validation failed
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['x-auth-token'];
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set Authorization header
        axios.defaults.headers.common['x-auth-token'] = token;
        
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive"
      });
      return false;
    }
  };

  // Register function
  const register = async (userData: any): Promise<boolean> => {
    try {
      const response = await axios.post('/api/users/register', userData);
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set Authorization header
        axios.defaults.headers.common['x-auth-token'] = token;
        
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Could not create account",
        variant: "destructive"
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update profile
  const updateProfile = async (data: any): Promise<boolean> => {
    try {
      const response = await axios.put('/api/users/profile', data);
      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Profile update error:', error.response?.data || error.message);
      toast({
        title: "Profile update failed",
        description: error.response?.data?.message || "Could not update profile",
        variant: "destructive"
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login, 
      register, 
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
