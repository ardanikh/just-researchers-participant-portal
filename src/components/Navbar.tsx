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
    <nav className="sticky top-0 z-50 bg-nav text-nav-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            JR
          </span>
          JustResearchers
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("studies")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="text-sm font-medium text-nav-foreground/80 transition-colors hover:text-nav-foreground"
          >
            Explore Studies
          </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={`text-sm font-medium transition-colors hover:text-nav-foreground ${
                  location.pathname === "/dashboard" ? "text-nav-foreground" : "text-nav-foreground/80"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/profile")}
                className={`text-sm font-medium transition-colors hover:text-nav-foreground ${
                  location.pathname === "/profile" ? "text-nav-foreground" : "text-nav-foreground/80"
                }`}
              >
                Profile
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-nav-foreground/80 hover:bg-nav-foreground/10 hover:text-nav-foreground"
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="text-nav-foreground/80 hover:bg-nav-foreground/10 hover:text-nav-foreground"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/signup")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-nav-foreground/10 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate("/");
                setTimeout(() => {
                  document.getElementById("studies")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-nav-foreground/80 hover:bg-nav-foreground/10"
            >
              Explore Studies
            </button>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { setMobileOpen(false); navigate("/dashboard"); }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-nav-foreground/80 hover:bg-nav-foreground/10"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate("/profile"); }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-nav-foreground/80 hover:bg-nav-foreground/10"
                >
                  Profile
                </button>
                <button
                  onClick={() => { setMobileOpen(false); logout(); }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-nav-foreground/80 hover:bg-nav-foreground/10"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setMobileOpen(false); navigate("/login"); }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-nav-foreground/80 hover:bg-nav-foreground/10"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate("/signup"); }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-primary hover:bg-nav-foreground/10"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
