import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      signup(email);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            JR
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join to participate in research studies</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 h-11"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="mt-1.5 h-11"
              required
            />
          </div>

          <Button type="submit" className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-trust hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
