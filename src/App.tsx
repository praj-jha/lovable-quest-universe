
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./components/Layout/MainLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const FamilyMode = lazy(() => import("./pages/FamilyMode"));
const ParentAnalytics = lazy(() => import("./pages/ParentAnalytics"));
const ForEducators = lazy(() => import("./pages/ForEducators"));
const IndianSpecificFeatures = lazy(() => import("./pages/IndianSpecificFeatures"));
const BookTutors = lazy(() => import("./pages/BookTutors"));
const TutorProfile = lazy(() => import("./pages/TutorProfile"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">Loading...</div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
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
            <Route path="/book-tutors" element={
              <Suspense fallback={<LoadingFallback />}>
                <BookTutors />
              </Suspense>
            } />
            <Route path="/book-tutors/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <TutorProfile />
              </Suspense>
            } />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
