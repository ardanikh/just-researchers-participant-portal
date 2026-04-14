import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ShieldCheck, ShieldAlert, User, ChevronRight } from "lucide-react";
import { studies, researchers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";

export default function StudyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const study = studies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Study not found.</p>
      </div>
    );
  }

  const researcher = researchers.find((r) => r.id === study.researcherId);

  const handleJoin = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate(`/consent/${study.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex h-11 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-3 flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground leading-tight">{study.title}</h1>
        {study.trustLevel === "verified" ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-trust/20 bg-trust/5 px-2.5 py-1 text-xs font-medium text-trust">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-pending/10 px-2.5 py-1 text-xs font-medium text-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-pending" /> New
          </span>
        )}
      </div>

      <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{study.description}</p>

      <div className="mb-6 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-4 w-4" /> {study.duration}
        </span>
        <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
          {study.method}
        </span>
      </div>

      {/* Incentive */}
      <div className="mb-6 rounded-lg border border-border p-5">
        <p className="mb-0.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">Incentive</p>
        <p className="text-2xl font-bold text-success">${study.incentive}</p>
        <p className="mt-1 text-sm text-muted-foreground">{study.incentiveBreakdown}</p>
      </div>

      {/* What you'll do */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold text-foreground">What you'll do</h2>
        <ul className="space-y-2">
          {study.whatYouWillDo.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Researcher */}
      {researcher && (
        <button
          onClick={() => navigate(`/researcher/${researcher.id}`)}
          className="mb-8 flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-muted"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{researcher.name}</p>
            <p className="text-xs text-muted-foreground">{researcher.organization}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}

      <Button
        onClick={handleJoin}
        className="h-12 w-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Join Study
      </Button>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
