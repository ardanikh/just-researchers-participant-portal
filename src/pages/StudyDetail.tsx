import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, FileText, Globe, MapPin, User, CheckCircle2, Briefcase } from "lucide-react";
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
    <div className="mx-auto max-w-3xl px-6 py-8 lg:py-12">
      {/* Back link */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Available Studies
      </button>

      {/* Title */}
      <h1 className="mb-8 text-3xl font-bold leading-tight text-foreground md:text-4xl">
        {study.title}
      </h1>

      {/* Compensation card */}
      <div className="mb-10 rounded-xl bg-muted/50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-trust/10">
            <Briefcase className="h-5 w-5 text-trust" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Participant Compensation</p>
            <p className="text-2xl font-bold text-success">${study.incentive}.00 Voucher</p>
            <p className="mt-1 text-sm text-muted-foreground">{study.incentiveBreakdown}</p>
          </div>
        </div>
      </div>

      {/* Target Criteria */}
      {study.targetCriteria && (
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-trust">👥</span>
            <h2 className="text-lg font-bold text-foreground">Target Criteria</h2>
          </div>
          <div className="rounded-xl border border-border">
            {study.targetCriteria.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-4 ${
                  i < study.targetCriteria.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Description */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-trust">📋</span>
          <h2 className="text-lg font-bold text-foreground">Task Description</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{study.description}</p>
        <ul className="mb-6 space-y-2">
          {study.whatYouWillDo.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              {item}
            </li>
          ))}
        </ul>

        {/* Blockquote */}
        <div className="border-l-4 border-trust bg-trust/5 py-3 pl-4 pr-4 rounded-r-lg">
          <p className="text-sm italic text-muted-foreground">
            "This session takes approximately {study.duration.toLowerCase()} and is conducted via a secure, encrypted environment."
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button
          onClick={handleJoin}
          className="h-12 rounded-full bg-trust px-12 text-base font-semibold text-trust-foreground hover:bg-trust/90"
        >
          Apply for this Study
        </Button>
      </div>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
