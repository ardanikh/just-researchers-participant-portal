import { Clock, ShieldCheck, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Study } from "@/data/mockData";

export default function StudyCard({ study }: { study: Study }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/study/${study.id}`)}
      className="w-full rounded-lg border border-border bg-card p-4 text-left transition-colors active:bg-muted"
    >
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-foreground leading-snug">
          {study.title}
        </h3>
        {study.trustLevel === "verified" ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-trust/20 bg-background px-2 py-0.5 text-xs font-medium text-trust">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-pending/20 bg-background px-2 py-0.5 text-xs font-medium text-foreground">
            <ShieldAlert className="h-3.5 w-3.5 text-pending" />
            New
          </span>
        )}
      </div>

      <p className="mb-3 text-sm text-muted-foreground">{study.researcherName}</p>

      <div className="mb-3 flex items-center gap-3 text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          {study.duration}
        </span>
        <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
          {study.method}
        </span>
      </div>

      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-bold text-success">${study.incentive}</span>
      </div>
    </button>
  );
}
