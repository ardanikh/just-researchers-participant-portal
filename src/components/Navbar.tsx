import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 text-base font-bold text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-trust text-xs font-bold text-trust-foreground">
            JR
          </span>
          JustResearchers
        </button>

        {/* Desktop center nav */}
        <div className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => navigate("/")}
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Discover Studies
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/dashboard"
                  ? "text-trust underline underline-offset-[20px] decoration-2"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              My Dashboard
            </button>
          )}
        </div>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { logout(); navigate("/"); }}
              className="h-9 gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="h-9 rounded-full border-border px-5 text-sm font-medium text-foreground"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/signup")}
                className="h-9 rounded-full bg-trust px-5 text-sm font-medium text-trust-foreground hover:bg-trust/90"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border px-6 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            <button onClick={() => { setMobileOpen(false); navigate("/"); }} className="rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">Discover Studies</button>
            {isAuthenticated && (
              <>
                <button onClick={() => { setMobileOpen(false); navigate("/dashboard"); }} className="rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">My Dashboard</button>
                <button onClick={() => { setMobileOpen(false); navigate("/profile"); }} className="rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">Profile</button>
                <button onClick={() => { setMobileOpen(false); logout(); navigate("/"); }} className="rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">Sign Out</button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <button onClick={() => { setMobileOpen(false); navigate("/login"); }} className="rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">Sign In</button>
                <button onClick={() => { setMobileOpen(false); navigate("/signup"); }} className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-trust hover:bg-muted">Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
