import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, Circle, AlertCircle } from "lucide-react";
import { userStudies } from "@/data/mockData";
import { Button } from "@/components/ui/button";

type FilterTab = "all" | "newest" | "passed" | "completed";

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "newest", label: "Newest" },
  { key: "passed", label: "Passed Selection" },
  { key: "completed", label: "Completed" },
];

function getStatusConfig(study: typeof userStudies[0]) {
  if (study.status === "completed" && study.paymentStatus === "paid") {
    return { label: "Paid", color: "bg-success/10 text-success", icon: Check };
  }
  if (study.status === "completed" && study.paymentStatus === "awaiting") {
    return { label: "Awaiting Incentive", color: "bg-pending/10 text-foreground", icon: AlertCircle };
  }
  if (study.status === "completed" && study.paymentStatus === "pending") {
    return { label: "Pending", color: "bg-muted text-muted-foreground", icon: Clock };
  }
  if (study.status === "in_progress") {
    return { label: "In Progress", color: "bg-trust/10 text-trust", icon: Clock };
  }
  if (study.status === "upcoming") {
    return { label: "Applied", color: "bg-muted text-muted-foreground", icon: Circle };
  }
  return { label: "Applied", color: "bg-muted text-muted-foreground", icon: Circle };
}

function getSelectionBadge(status?: string) {
  if (status === "matched") return { label: "Matches Your Profile", color: "bg-success/10 text-success" };
  if (status === "not_matched") return { label: "Not a Match", color: "bg-muted text-foreground" };
  return null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = userStudies.filter((s) => {
    if (activeTab === "all") return true;
    if (activeTab === "newest") return true;
    if (activeTab === "passed") return s.selectionStatus === "matched";
    if (activeTab === "completed") return s.status === "completed";
    return true;
  });

  const sorted = activeTab === "newest"
    ? [...filtered].reverse()
    : filtered;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 lg:py-12">
      <h1 className="mb-1 text-2xl font-bold text-foreground">My Studies</h1>
      <p className="mb-6 text-sm text-muted-foreground">Track your research participation and payments.</p>

      {/* Info banner */}
      <div className="mb-6 rounded-xl border border-trust/20 bg-trust/5 px-5 py-3">
        <p className="text-sm text-foreground">
          <span className="font-medium">Note:</span> Verification takes max 3 business days after application.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.key)}
            className={`h-9 rounded-full px-4 text-sm font-medium ${
              activeTab === tab.key
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Study list */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No studies found.</p>
        ) : (
          sorted.map((study) => {
            const statusCfg = getStatusConfig(study);
            const selectionBadge = getSelectionBadge(study.selectionStatus);
            const StatusIcon = statusCfg.icon;

            return (
              <div
                key={study.id}
                onClick={() =>
                  study.status === "completed"
                    ? navigate(`/feedback/${study.id}`)
                    : navigate(`/study/${study.id}`)
                }
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-muted"
              >
                {/* Org icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                  {study.organization.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{study.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {study.organization} · {study.scheduledDate || study.completedDate}
                  </p>
                  {selectionBadge && (
                    <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${selectionBadge.color}`}>
                      {selectionBadge.label}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusCfg.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {statusCfg.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
