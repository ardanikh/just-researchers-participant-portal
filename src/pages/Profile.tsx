import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Profile() {
  const { userEmail, isGuest, logout } = useAuth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Profile</h1>

      <div className="rounded-lg border border-border p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <User className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="text-base font-medium text-foreground">
              {isGuest ? "Guest User" : userEmail}
            </p>
            <p className="text-sm text-muted-foreground">
              {isGuest ? "Limited access" : "Participant"}
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={logout} className="h-11">
          Log out
        </Button>
      </div>
    </div>
  );
}
