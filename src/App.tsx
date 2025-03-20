
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./components/Layout/MainLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const FamilyMode = lazy(() => import("./pages/FamilyMode"));
const ParentAnalytics = lazy(() => import("./pages/ParentAnalytics"));
const ForEducators = lazy(() => import("./pages/ForEducators"));
const IndianSpecificFeatures = lazy(() => import("./pages/IndianSpecificFeatures"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">Loading...</div>
);

// Auth guard component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Redirect if already authenticated
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingFallback />;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public landing page */}
    <Route path="/" element={<Index />} />
    
    {/* Auth routes - redirect to dashboard if already logged in */}
    <Route path="/login" element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    } />
    <Route path="/register" element={
      <PublicRoute>
        <Register />
      </PublicRoute>
    } />
    
    {/* Onboarding requires auth but is outside MainLayout */}
    <Route path="/onboarding" element={
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    } />
    
    {/* Protected routes with MainLayout */}
    <Route element={
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    }>
      <Route path="/dashboard" element={
        <Suspense fallback={<LoadingFallback />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="/family" element={
        <Suspense fallback={<LoadingFallback />}>
          <FamilyMode />
        </Suspense>
      } />
      <Route path="/parent-analytics" element={
        <Suspense fallback={<LoadingFallback />}>
          <ParentAnalytics />
        </Suspense>
      } />
      <Route path="/for-educators" element={
        <Suspense fallback={<LoadingFallback />}>
          <ForEducators />
        </Suspense>
      } />
      <Route path="/indian-features" element={
        <Suspense fallback={<LoadingFallback />}>
          <IndianSpecificFeatures />
        </Suspense>
      } />
    </Route>
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
