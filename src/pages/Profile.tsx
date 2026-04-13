import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export default function Profile() {
  const { isAuthenticated, isGuest, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="px-4 pb-24 pt-6">
      <h1 className="mb-6 text-xl font-bold text-foreground">Profile</h1>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <User className="h-7 w-7 text-muted-foreground" />
        </div>
        <div>
          {isGuest ? (
            <>
              <p className="text-base font-semibold text-foreground">Guest</p>
              <p className="text-sm text-muted-foreground">Limited access</p>
            </>
          ) : (
            <>
              <p className="text-base font-semibold text-foreground">{userEmail}</p>
              <p className="text-sm text-muted-foreground">Participant</p>
            </>
          )}
        </div>
      </div>

      {isGuest && (
        <div className="mb-6 rounded-lg border border-border p-4">
          <p className="mb-3 text-sm text-muted-foreground">
            Create an account to join studies and get paid.
          </p>
          <Button onClick={() => navigate("/signup")} variant="outline" className="h-11">
            Sign up
          </Button>
        </div>
      )}

      {isAuthenticated && (
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex h-11 items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      )}
    </div>
  );
}
