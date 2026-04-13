import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  signup: (email: string) => void;
  continueAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setUserEmail(email);
  };

  const signup = (email: string) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setUserEmail(email);
  };

  const continueAsGuest = () => {
    setIsAuthenticated(true);
    setIsGuest(true);
    setUserEmail(null);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, userEmail, login, signup, continueAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
