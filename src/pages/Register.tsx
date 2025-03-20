
import React from 'react';
import RegisterForm from '@/components/Auth/RegisterForm';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lovable-blue/10 to-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-block">
          <div className="flex items-center space-x-2">
            <div className="relative w-12 h-12 rounded-full bg-blue-green-gradient animate-pulse-subtle shadow-lg">
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gradient-blue-green">LQ</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-gradient-blue-green">Lovable Quest</span>
          </div>
        </Link>
      </div>
      
      <RegisterForm />
      
      <div className="w-full max-w-md mt-8">
        <div className="flex items-center my-4">
          <div className="flex-grow bg-gray-200 h-px"></div>
          <div className="mx-4 text-gray-500 text-sm">OR</div>
          <div className="flex-grow bg-gray-200 h-px"></div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>
          
          <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-black text-white rounded-md shadow-sm hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-3.405 1.86-2.867 6.69.572 9.65z" />
            </svg>
            <span>Sign up with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
