import { useNavigate } from "react-router-dom";
import { Clock, FileText, Globe, MapPin } from "lucide-react";
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

  const orgInitial = study.organization.charAt(0);

  return (
    <>
      <div
        onClick={() => navigate(`/study/${study.id}`)}
        className="flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
      >
        {/* Organization header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
            {orgInitial}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{study.organization}</span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold leading-snug text-foreground">
          {study.title}
        </h3>

        {/* Description */}
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {study.description}
        </p>

        {/* Metadata */}
        <div className="mb-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {study.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" /> {study.method}
          </span>
          <span className="flex items-center gap-1.5">
            {study.methodType === "Remote" ? (
              <Globe className="h-3.5 w-3.5" />
            ) : (
              <MapPin className="h-3.5 w-3.5" />
            )}
            {study.methodType}
          </span>
        </div>

        {/* CTA */}
        <Button
          onClick={handleJoin}
          className="mt-auto h-11 w-full rounded-lg bg-trust text-sm font-semibold uppercase tracking-wide text-trust-foreground hover:bg-trust/90"
        >
          Join Study
        </Button>
      </div>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
