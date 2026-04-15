import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, FileText, Globe, MapPin, User, CheckCircle2 } from "lucide-react";
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
    <div className="mx-auto max-w-2xl px-6 py-8 lg:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex h-11 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Organization */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
          {study.organization.charAt(0)}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{study.organization}</span>
      </div>

      <h1 className="mb-3 text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {study.title}
      </h1>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{study.description}</p>

      {/* Metadata */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {study.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" /> {study.method}
        </span>
        <span className="flex items-center gap-1.5">
          {study.methodType === "Remote" ? <Globe className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
          {study.methodType}
        </span>
      </div>

      {/* Target Criteria */}
      {study.targetCriteria && (
        <div className="mb-6 rounded-xl border border-border p-5">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Who can join</h2>
          <ul className="space-y-2">
            {study.targetCriteria.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Compensation */}
      <div className="mb-6 rounded-xl border border-border p-5">
        <h2 className="mb-1 text-sm font-semibold text-foreground">Compensation</h2>
        <p className="text-2xl font-bold text-success">${study.incentive}</p>
        <p className="mt-1 text-sm text-muted-foreground">{study.incentiveBreakdown}</p>
      </div>

      {/* What you'll do */}
      <div className="mb-6 rounded-xl border border-border p-5">
        <h2 className="mb-3 text-sm font-semibold text-foreground">What you'll do</h2>
        <ul className="space-y-2">
          {study.whatYouWillDo.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-trust" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Researcher */}
      {researcher && (
        <button
          onClick={() => navigate(`/researcher/${researcher.id}`)}
          className="mb-8 flex w-full items-center gap-3 rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{researcher.name}</p>
            <p className="text-xs text-muted-foreground">{researcher.organization}</p>
          </div>
        </button>
      )}

      <Button
        onClick={handleJoin}
        className="h-12 w-full rounded-lg bg-trust text-base font-semibold text-trust-foreground hover:bg-trust/90"
      >
        Apply for this Study
      </Button>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
