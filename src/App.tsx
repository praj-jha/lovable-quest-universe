
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
          <Route path="/dashboard" element={
            <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
              <MainLayout><Dashboard /></MainLayout>
            </Suspense>
          } />
          <Route path="/family" element={
            <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
              <MainLayout><FamilyMode /></MainLayout>
            </Suspense>
          } />
          <Route path="/parent-analytics" element={
            <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
              <MainLayout><ParentAnalytics /></MainLayout>
            </Suspense>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
