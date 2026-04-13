import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, DollarSign, ShieldCheck, ShieldAlert, User } from "lucide-react";
import { studies, researchers } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export default function StudyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = studies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Study not found.</p>
      </div>
    );
  }

  const researcher = researchers.find((r) => r.id === study.researcherId);

  return (
    <div className="px-4 pb-24 pt-4">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-4 flex items-start justify-between">
        <h1 className="text-xl font-bold text-foreground leading-tight pr-2">{study.title}</h1>
        {study.trustLevel === "verified" ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-trust/10 px-2 py-0.5 text-xs font-medium text-trust">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-pending/10 px-2 py-0.5 text-xs font-medium text-pending-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-pending" /> New
          </span>
        )}
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{study.description}</p>

      <div className="mb-4 flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" /> {study.duration}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {study.method}
        </span>
      </div>

      <div className="mb-6 rounded-lg border border-border p-4">
        <div className="flex items-center gap-1 mb-1">
          <DollarSign className="h-5 w-5 text-success" />
          <span className="text-2xl font-bold text-success">${study.incentive}</span>
        </div>
        <p className="text-sm text-muted-foreground">{study.incentiveBreakdown}</p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-foreground">What you'll do</h2>
        <ul className="space-y-1.5">
          {study.whatYouWillDo.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {researcher && (
        <button
          onClick={() => navigate(`/researcher/${researcher.id}`)}
          className="mb-6 flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{researcher.name}</p>
            <p className="text-xs text-muted-foreground">{researcher.organization}</p>
          </div>
        </button>
      )}

      <Button
        onClick={() => navigate(`/consent/${study.id}`)}
        className="w-full"
        size="lg"
      >
        Join Study
      </Button>
    </div>
  );
}
