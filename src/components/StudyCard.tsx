import { Clock, DollarSign, ShieldCheck, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Study } from "@/data/mockData";

export default function StudyCard({ study }: { study: Study }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/study/${study.id}`)}
      className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/30"
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground leading-tight pr-2">
          {study.title}
        </h3>
        {study.trustLevel === "verified" ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-trust/10 px-2 py-0.5 text-xs font-medium text-trust">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-pending/10 px-2 py-0.5 text-xs font-medium text-pending-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-pending" />
            New
          </span>
        )}
      </div>

      <p className="mb-3 text-sm text-muted-foreground">{study.researcherName}</p>

      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          {study.duration}
        </span>
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {study.method}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1">
        <DollarSign className="h-5 w-5 text-success" />
        <span className="text-lg font-bold text-success">${study.incentive}</span>
      </div>
    </button>
  );
}
