import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import Footer from "@/components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Mini navbar */}
      <nav className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 text-base font-bold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-trust text-xs font-bold text-trust-foreground">JR</span>
            JustResearchers
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/signup")}
            className="h-9 rounded-full border-border px-5 text-sm font-medium text-foreground"
          >
            Register
          </Button>
        </div>
      </nav>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Access your research dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="h-12 rounded-lg bg-muted/50 pl-10 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <button type="button" className="text-xs font-medium text-trust hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 rounded-lg bg-muted/50 pl-10 text-sm"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="h-12 w-full rounded-lg bg-trust text-base font-semibold text-trust-foreground hover:bg-trust/90">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-trust hover:underline">Register</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
