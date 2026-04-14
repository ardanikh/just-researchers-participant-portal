import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const authPages = ["/login", "/signup"];
  const hideChrome = authPages.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/study/:id" element={<StudyDetail />} />
          <Route path="/researcher/:id" element={<ResearcherProfile />} />
          {/* Protected routes */}
          <Route path="/consent/:id" element={<ProtectedRoute><Consent /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/feedback/:id" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
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
