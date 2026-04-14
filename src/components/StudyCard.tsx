import { useNavigate } from "react-router-dom";
import { Clock, ShieldCheck, ShieldAlert } from "lucide-react";
import { Study } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";

interface StudyCardProps {
  study: Study;
}

export default function StudyCard({ study }: StudyCardProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(`/consent/${study.id}`);
    }
  };

  return (
    <>
      <div className="flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-sm">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-foreground leading-snug">{study.title}</h3>
          {study.trustLevel === "verified" ? (
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-trust/20 bg-trust/5 px-2 py-0.5 text-xs font-medium text-trust">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-pending/10 px-2 py-0.5 text-xs font-medium text-foreground">
              <ShieldAlert className="h-3.5 w-3.5 text-pending" /> New
            </span>
          )}
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{study.description}</p>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" /> {study.duration}
          </span>
          <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
            {study.method}
          </span>
          <span className="text-xs text-muted-foreground">by {study.researcherName}</span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xl font-bold text-success">${study.incentive}</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/study/${study.id}`)}
              className="h-9 text-sm"
            >
              View Details
            </Button>
            <Button
              size="sm"
              onClick={handleJoin}
              className="h-9 bg-primary text-sm text-primary-foreground hover:bg-primary/90"
            >
              Join Study
            </Button>
          </div>
        </div>
      </div>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
