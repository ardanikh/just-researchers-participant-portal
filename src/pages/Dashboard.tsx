import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, Circle, AlertCircle, LayoutGrid, CheckCircle2, XCircle, Loader2, CreditCard } from "lucide-react";
import { userStudies } from "@/data/mockData";
import { Button } from "@/components/ui/button";

type FilterTab = "all" | "eligible" | "not_eligible" | "in_progress" | "completed" | "paid";

const tabs: { key: FilterTab; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All Studies", icon: LayoutGrid },
  { key: "eligible", label: "Eligible", icon: CheckCircle2 },
  { key: "not_eligible", label: "Not Eligible", icon: XCircle },
  { key: "in_progress", label: "In Progress", icon: Loader2 },
  { key: "completed", label: "Completed", icon: Check },
  { key: "paid", label: "Paid", icon: CreditCard },
];

function getStatusBadges(study: typeof userStudies[0]) {
  const badges: { label: string; color: string }[] = [];

  if (study.status === "in_progress") {
    badges.push({ label: "IN PROGRESS", color: "bg-foreground text-background" });
  }
  if (study.status === "upcoming") {
    badges.push({ label: "APPLIED", color: "bg-muted text-foreground" });
  }
  if (study.status === "completed" && study.paymentStatus === "paid") {
    badges.push({ label: "PAID", color: "bg-success text-success-foreground" });
  }
  if (study.status === "completed" && study.paymentStatus === "awaiting") {
    badges.push({ label: "AWAITING", color: "bg-pending text-pending-foreground" });
  }
  if (study.status === "completed" && study.paymentStatus === "pending") {
    badges.push({ label: "COMPLETED", color: "bg-secondary text-secondary-foreground" });
  }

  if (study.selectionStatus === "matched") {
    badges.push({ label: "ELIGIBLE", color: "border border-success text-success bg-transparent" });
  }
  if (study.selectionStatus === "not_matched") {
    badges.push({ label: "NOT ELIGIBLE", color: "bg-foreground text-background" });
  }

  return badges;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filtered = userStudies.filter((s) => {
    if (activeTab === "all") return true;
    if (activeTab === "eligible") return s.selectionStatus === "matched";
    if (activeTab === "not_eligible") return s.selectionStatus === "not_matched";
    if (activeTab === "in_progress") return s.status === "in_progress";
    if (activeTab === "completed") return s.status === "completed";
    if (activeTab === "paid") return s.paymentStatus === "paid";
    return true;
  });

  const activeCount = userStudies.filter(
    (s) => s.status === "upcoming" || s.status === "in_progress"
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-56">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Study Filters
          </p>
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-trust text-trust-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Participant Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your research contributions and track your progress.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-trust" />
              <span className="text-sm font-medium text-foreground">{activeCount} Active Applications</span>
            </div>
          </div>

          {/* Study cards */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">No studies found.</p>
            ) : (
              filtered.map((study) => {
                const badges = getStatusBadges(study);
                return (
                  <div
                    key={study.id}
                    onClick={() =>
                      study.status === "completed"
                        ? navigate(`/feedback/${study.id}`)
                        : navigate(`/study/${study.id}`)
                    }
                    className="cursor-pointer rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                  >
                    {/* Status badges */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {badges.map((badge, i) => (
                        <span
                          key={i}
                          className={`inline-block rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-bold text-foreground">{study.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {study.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        💰 ${study.incentive}.00
                      </span>
                      <span className="text-xs">
                        POSTED: {study.scheduledDate || study.completedDate || "—"} | STARTED: {study.status !== "upcoming" ? (study.completedDate || study.scheduledDate || "—") : "—"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {filtered.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="h-11 gap-2 rounded-full border-border px-8 text-sm font-medium text-foreground"
              >
                View More Studies ↓
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
