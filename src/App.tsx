import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudyDetail from "./pages/StudyDetail";
import Consent from "./pages/Consent";
import ResearcherProfile from "./pages/ResearcherProfile";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const authPages = ["/login", "/signup"];
  const showNav = isAuthenticated && !authPages.includes(location.pathname);

  if (!isAuthenticated && !authPages.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-lg min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Index />} />
        <Route path="/study/:id" element={<StudyDetail />} />
        <Route path="/consent/:id" element={<Consent />} />
        <Route path="/researcher/:id" element={<ResearcherProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback/:id" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNav && <BottomNav />}
    </div>
  );
}

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
